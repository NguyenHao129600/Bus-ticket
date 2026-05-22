import BusTripModel from '../models/busTripModel';
import BusModel from '../models/busModel';
import RouteModel from '../models/routeModel';
import TripSeatModel from '../models/tripSeatModel';
import TripEventModel from '../models/tripEventModel';
import db from '../config/db';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const getScopedOperatorId = (req, requestedOperatorId, fallbackOperatorId = null) => {
  if (isOperatorStaff(req.user)) {
    const tokenOperatorId = Number(req.user.operator_id);
    if (requestedOperatorId && Number(requestedOperatorId) !== tokenOperatorId) {
      throw new AppError('You can only manage trips of your own operator', 403);
    }
    if (fallbackOperatorId && Number(fallbackOperatorId) !== tokenOperatorId) {
      throw new AppError('You can only manage trips of your own operator', 403);
    }
    return tokenOperatorId;
  }

  return requestedOperatorId || fallbackOperatorId || null;
};

const ensureTripAccess = (req, trip) => {
  if (isOperatorStaff(req.user) && Number(trip.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access trips of your own operator', 403);
  }
};

const ensureRouteBelongsToOperator = async (routeId, operatorId) => {
  const route = await RouteModel.getById(routeId);
  if (!route) {
    throw new AppError('Route not found', 404);
  }
  if (Number(route.operator_id) !== Number(operatorId)) {
    throw new AppError('Route does not belong to this operator', 400);
  }
};

const ensureBusBelongsToOperator = async (busId, operatorId) => {
  const bus = await BusModel.getById(busId);
  if (!bus) {
    throw new AppError('Bus not found', 404);
  }
  if (Number(bus.operator_id) !== Number(operatorId)) {
    throw new AppError('Bus does not belong to this operator', 400);
  }
};

const syncTripSeatsIfBusChanged = async (tripId, nextBusId, previousBusId) => {
  if (!nextBusId || Number(nextBusId) === Number(previousBusId)) {
    return;
  }

  const [statusRows] = await db.query(
    'SELECT COUNT(*) AS unavailable_count FROM trip_seats WHERE trip_id = ? AND status <> ?',
    [Number(tripId), 'available']
  );

  if (statusRows[0].unavailable_count > 0) {
    throw new AppError('Cannot change bus because this trip already has locked or booked seats', 400);
  }

  await TripSeatModel.deleteByTripId(Number(tripId));
  const [busSeats] = await db.query('SELECT id FROM bus_seats WHERE bus_id = ?', [Number(nextBusId)]);
  if (busSeats.length > 0) {
    await TripSeatModel.bulkCreate(Number(tripId), busSeats.map((seat) => seat.id));
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, route_id, bus_id, status, from_date, to_date } = req.query;
    const scopedOperatorId = isOperatorStaff(req.user) ? req.user.operator_id : operator_id;
    const result = await BusTripModel.getAll({
      page,
      limit,
      operator_id: scopedOperatorId,
      route_id,
      bus_id,
      status,
      from_date,
      to_date,
    });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const trip = await BusTripModel.getById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, trip);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const getMyTrips = async (req, res, next) => {
  try {
    const { page, limit, route_id, bus_id, status, from_date, to_date } = req.query;
    const result = await BusTripModel.getAll({
      page,
      limit,
      operator_id: req.user.operator_id,
      route_id,
      bus_id,
      status,
      from_date,
      to_date,
    });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getMyTripById = async (req, res, next) => {
  try {
    const trip = await BusTripModel.getById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, trip);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by } = req.body;
    const scopedOperatorId = getScopedOperatorId(req, operator_id);
    const actorId = req.user ? req.user.id : created_by;

    await ensureRouteBelongsToOperator(route_id, scopedOperatorId);
    await ensureBusBelongsToOperator(bus_id, scopedOperatorId);

    const tripId = await BusTripModel.create({
      operator_id: scopedOperatorId,
      route_id,
      bus_id,
      departure_time,
      arrival_time,
      ticket_price,
      status,
      created_by: actorId,
    });
    const [busSeats] = await db.query('SELECT id FROM bus_seats WHERE bus_id = ?', [Number(bus_id)]);
    if (busSeats.length > 0) await TripSeatModel.bulkCreate(tripId, busSeats.map((s) => s.id));
    await TripEventModel.create({ trip_id: tripId, event_type: 'created', note: 'Trip created', created_by: actorId });
    const trip = await BusTripModel.getById(tripId);
    return res.status(201).json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { route_id, bus_id, departure_time, arrival_time, ticket_price, status } = req.body;
    const existing = await BusTripModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, existing);

    if (route_id !== undefined) {
      await ensureRouteBelongsToOperator(route_id, existing.operator_id);
    }
    if (bus_id !== undefined) {
      await ensureBusBelongsToOperator(bus_id, existing.operator_id);
    }

    await BusTripModel.update(req.params.id, { route_id, bus_id, departure_time, arrival_time, ticket_price, status });
    await syncTripSeatsIfBusChanged(req.params.id, bus_id, existing.bus_id);
    const trip = await BusTripModel.getById(req.params.id);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status, note, updated_by } = req.body;
    const existing = await BusTripModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, existing);

    const actorId = req.user ? req.user.id : updated_by;
    await BusTripModel.updateStatus(req.params.id, status);
    const validEventTypes = ['delayed', 'boarding', 'departed', 'arrived', 'completed', 'cancelled'];
    if (validEventTypes.includes(status)) {
      await TripEventModel.create({ trip_id: req.params.id, event_type: status, note, created_by: actorId });
    }
    const trip = await BusTripModel.getById(req.params.id);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const existing = await BusTripModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, existing);

    const affected = await BusTripModel.softDelete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Trip not found' });
    return res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (err) { next(err); }
};
