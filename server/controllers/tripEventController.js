import TripEventModel from '../models/tripEventModel';
import BusTripModel from '../models/busTripModel';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const ensureTripAccess = (req, trip) => {
  if (isOperatorStaff(req.user) && Number(trip.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only manage events of your own operator trips', 403);
  }
};

const ensureEventAccess = async (req, event) => {
  if (!event) {
    return;
  }

  const trip = await BusTripModel.getById(event.trip_id);
  if (!trip) {
    throw new AppError('Trip not found', 404);
  }

  ensureTripAccess(req, trip);
};

export const getAll = async (req, res, next) => {
  try {
    const { trip_id, event_type } = req.query;
    if (trip_id) {
      const trip = await BusTripModel.getById(trip_id);
      if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
      ensureTripAccess(req, trip);
    }
    const rows = await TripEventModel.getAll({ trip_id, event_type });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const event = await TripEventModel.getById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Trip event not found' });
    await ensureEventAccess(req, event);
    return res.json({ success: true, data: event });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { trip_id, event_type, note, created_by } = req.body;
    const trip = await BusTripModel.getById(trip_id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    ensureTripAccess(req, trip);
    const actorId = req.user ? req.user.id : created_by;
    const id = await TripEventModel.create({ trip_id, event_type, note, created_by: actorId });
    const event = await TripEventModel.getById(id);
    return res.status(201).json({ success: true, data: event });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const event = await TripEventModel.getById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Trip event not found' });
    await ensureEventAccess(req, event);
    const affected = await TripEventModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Trip event not found' });
    return res.json({ success: true, message: 'Trip event deleted' });
  } catch (err) { next(err); }
};
