import TripSeatModel from '../models/tripSeatModel';

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
    const seat = await TripSeatModel.getById(req.params.id);
    if (!seat) return res.status(404).json({ success: false, message: 'Trip seat not found' });
    await TripSeatModel.updateStatus(req.params.id, status);
    const updated = await TripSeatModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};