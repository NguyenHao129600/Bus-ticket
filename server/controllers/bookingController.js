import BookingModel from '../models/bookingModel';
import TripSeatModel from '../models/tripSeatModel';
import BusTripModel from '../models/busTripModel';
import db from '../config/db';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, user_id, trip_id, status } = req.query;
    const result = await BookingModel.getAll({ page, limit, user_id, trip_id, status });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const booking = await BookingModel.getById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    return res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { user_id, trip_id, trip_seat_ids } = req.body;
    const trip = await BusTripModel.getById(trip_id);
    if (!trip) { await conn.rollback(); return res.status(404).json({ success: false, message: 'Trip not found' }); }
    await TripSeatModel.releaseExpiredLocks();
    for (const seat_id of trip_seat_ids) {
      const [rows] = await conn.query('SELECT * FROM trip_seats WHERE id = ? AND status = ? AND locked_by_user_id = ?', [seat_id, 'locked', user_id]);
      if (!rows[0]) { await conn.rollback(); return res.status(409).json({ success: false, message: `Seat ${seat_id} is not locked by this user` }); }
    }
    const total_amount = trip.ticket_price * trip_seat_ids.length;
    const now = new Date();
    const [bookingResult] = await conn.query(
      `INSERT INTO bookings (user_id, trip_id, total_amount, status, booked_at, created_at, updated_at) VALUES (?, ?, ?, 'pending_payment', ?, ?, ?)`,
      [user_id, trip_id, total_amount, now, now, now]
    );
    const bookingId = bookingResult.insertId;
    for (const seat_id of trip_seat_ids) {
      await conn.query('INSERT INTO booking_items (booking_id, trip_seat_id, created_at) VALUES (?, ?, ?)', [bookingId, seat_id, now]);
      await conn.query(`UPDATE trip_seats SET status = 'booked', locked_by_user_id = NULL, locked_until = NULL WHERE id = ?`, [seat_id]);
    }
    await conn.commit();
    const booking = await BookingModel.getById(bookingId);
    return res.status(201).json({ success: true, data: booking });
  } catch (err) { await conn.rollback(); next(err); }
  finally { conn.release(); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const existing = await BookingModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Booking not found' });
    await BookingModel.updateStatus(req.params.id, status);
    if (['cancelled', 'refunded', 'expired'].includes(status)) {
      for (const item of existing.items) await TripSeatModel.releaseSeat(item.trip_seat_id);
    }
    const booking = await BookingModel.getById(req.params.id);
    return res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const existing = await BookingModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Booking not found' });
    for (const item of existing.items) await TripSeatModel.releaseSeat(item.trip_seat_id);
    await BookingModel.delete(req.params.id);
    return res.json({ success: true, message: 'Booking deleted' });
  } catch (err) { next(err); }
};