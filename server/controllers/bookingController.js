import BookingService from '../services/bookingService';
import BusTripModel from '../models/busTripModel';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const ensureTripAccess = async (req, tripId) => {
  const trip = await BusTripModel.getById(tripId);
  if (!trip) {
    throw new AppError('Trip not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(trip.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access bookings of your own operator trips', 403);
  }

  return trip;
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, user_id, trip_id, status } = req.query;
    const result = await BookingService.getAll({ page, limit, user_id, trip_id, status }, req.user);
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const booking = await BookingService.getById(req.params.id, req.user);
    return res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

export const getByTripId = async (req, res, next) => {
  try {
    await ensureTripAccess(req, req.params.trip_id);
    const { page, limit, user_id, status } = req.query;
    const result = await BookingService.getAll(
      { page, limit, user_id, trip_id: req.params.trip_id, status },
      req.user
    );
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const booking = await BookingService.create({ user: req.user, payload: req.body });
    return res.status(201).json({ success: true, data: booking });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await BookingService.updateStatus(req.params.id, status);
    return res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    await BookingService.remove(req.params.id);
    return res.json({ success: true, message: 'Booking deleted' });
  } catch (err) { next(err); }
};
