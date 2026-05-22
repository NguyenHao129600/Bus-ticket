import TripSeatModel from '../models/tripSeatModel';
import BusTripModel from '../models/busTripModel';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const ensureTripAccess = async (req, tripId) => {
  const trip = await BusTripModel.getById(tripId);
  if (!trip) {
    throw new AppError('Trip not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(trip.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access seats of your own operator trips', 403);
  }

  return trip;
};

const ensureSeatAccess = async (req, seatId) => {
  const seat = await TripSeatModel.getById(seatId);
  if (!seat) {
    throw new AppError('Trip seat not found', 404);
  }

  await ensureTripAccess(req, seat.trip_id);
  return seat;
};

export const getAll = async (req, res, next) => {
  try {
    const { trip_id, status } = req.query;
    const rows = await TripSeatModel.getAll({ trip_id, status });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const seat = await TripSeatModel.getById(req.params.id);
    if (!seat) return res.status(404).json({ success: false, message: 'Trip seat not found' });
    return res.json({ success: true, data: seat });
  } catch (err) { next(err); }
};

export const getAvailableSeatsByTrip = async (req, res, next) => {
  try {
    await TripSeatModel.releaseExpiredLocks();
    await ensureTripAccess(req, req.params.trip_id);

    const rows = await TripSeatModel.getAll({
      trip_id: req.params.trip_id,
      status: 'available',
    });

    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getBookedSeatsByTrip = async (req, res, next) => {
  try {
    await ensureTripAccess(req, req.params.trip_id);

    const rows = await TripSeatModel.getAll({
      trip_id: req.params.trip_id,
      status: 'booked',
    });

    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const lockSeat = async (req, res, next) => {
  try {
    const { trip_seat_id, user_id, lock_minutes } = req.body;
    await TripSeatModel.releaseExpiredLocks();
    const seat = await TripSeatModel.getById(trip_seat_id);
    if (!seat) return res.status(404).json({ success: false, message: 'Seat not found' });
    if (seat.status !== 'available') return res.status(409).json({ success: false, message: `Seat is currently ${seat.status}` });
    const affected = await TripSeatModel.lockSeat(trip_seat_id, user_id, lock_minutes || 10);
    if (!affected) return res.status(409).json({ success: false, message: 'Failed to lock seat' });
    const updated = await TripSeatModel.getById(trip_seat_id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const releaseSeat = async (req, res, next) => {
  try {
    const { trip_seat_id } = req.body;
    const seat = await TripSeatModel.getById(trip_seat_id);
    if (!seat) return res.status(404).json({ success: false, message: 'Seat not found' });
    await TripSeatModel.releaseSeat(trip_seat_id);
    const updated = await TripSeatModel.getById(trip_seat_id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const seat = await ensureSeatAccess(req, req.params.id);
    await TripSeatModel.updateStatus(req.params.id, status);
    const updated = await TripSeatModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const operatorLockSeat = async (req, res, next) => {
  try {
    await TripSeatModel.releaseExpiredLocks();

    const seat = await ensureSeatAccess(req, req.params.id);
    if (seat.status !== 'available') {
      return res.status(409).json({ success: false, message: `Seat is currently ${seat.status}` });
    }

    const lockMinutes = Number(req.body.lock_minutes) || 10;
    const affected = await TripSeatModel.lockSeat(req.params.id, req.user.id, lockMinutes);
    if (!affected) {
      return res.status(409).json({ success: false, message: 'Failed to lock seat' });
    }

    const updated = await TripSeatModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const operatorReleaseSeat = async (req, res, next) => {
  try {
    const seat = await ensureSeatAccess(req, req.params.id);
    if (seat.status === 'booked') {
      return res.status(409).json({ success: false, message: 'Booked seat cannot be released manually' });
    }
    if (seat.status === 'available') {
      return res.json({ success: true, data: seat });
    }

    await TripSeatModel.releaseSeat(req.params.id);
    const updated = await TripSeatModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};
