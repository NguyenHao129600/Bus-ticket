import BookingModel from '../models/bookingModel';
import TripSeatModel from '../models/tripSeatModel';
import db from '../config/db';
import AppError from '../utils/AppError';

const canManageBookings = (user) => {
  return user && ['admin', 'operator_staff'].includes(user.role);
};

const assertCanAccessBooking = (user, booking) => {
  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  if (canManageBookings(user) || Number(booking.user_id) === Number(user.id)) {
    return;
  }

  throw new AppError('Forbidden', 403);
};

const BookingService = {
  getAll: async (filters) => {
    return BookingModel.getAll(filters);
  },

  getById: async (id, user) => {
    const booking = await BookingModel.getById(id);
    assertCanAccessBooking(user, booking);

    return booking;
  },

  create: async ({ user, payload }) => {
    const { user_id, trip_id, trip_seat_ids } = payload;
    if (!canManageBookings(user) && Number(user_id) !== Number(user.id)) {
      throw new AppError('Forbidden', 403);
    }

    const conn = await db.getConnection();
    let bookingId;

    try {
      await conn.beginTransaction();

      const [tripRows] = await conn.query(
        'SELECT id, ticket_price FROM bus_trips WHERE id = ? AND deleted_at IS NULL FOR UPDATE',
        [trip_id]
      );
      const trip = tripRows[0];
      if (!trip) {
        throw new AppError('Trip not found', 404);
      }

      await conn.query(
        `UPDATE trip_seats
         SET status = 'available', locked_by_user_id = NULL, locked_until = NULL
         WHERE status = 'locked' AND locked_until < NOW()`
      );

      for (const seatId of trip_seat_ids) {
        const [seatRows] = await conn.query(
          `SELECT id, status, locked_by_user_id
           FROM trip_seats
           WHERE id = ? AND trip_id = ?
           FOR UPDATE`,
          [seatId, trip_id]
        );
        const seat = seatRows[0];

        if (!seat || seat.status !== 'locked' || Number(seat.locked_by_user_id) !== Number(user_id)) {
          throw new AppError(`Seat ${seatId} is not locked by this user`, 409);
        }
      }

      const now = new Date();
      const totalAmount = Number(trip.ticket_price) * trip_seat_ids.length;
      const [bookingResult] = await conn.query(
        `INSERT INTO bookings (user_id, trip_id, total_amount, status, booked_at, created_at, updated_at)
         VALUES (?, ?, ?, 'pending_payment', ?, ?, ?)`,
        [user_id, trip_id, totalAmount, now, now, now]
      );

      bookingId = bookingResult.insertId;

      for (const seatId of trip_seat_ids) {
        await conn.query(
          'INSERT INTO booking_items (booking_id, trip_seat_id, created_at) VALUES (?, ?, ?)',
          [bookingId, seatId, now]
        );

        const [updateResult] = await conn.query(
          `UPDATE trip_seats
           SET status = 'booked', locked_by_user_id = NULL, locked_until = NULL
           WHERE id = ? AND status = 'locked' AND locked_by_user_id = ?`,
          [seatId, user_id]
        );

        if (!updateResult.affectedRows) {
          throw new AppError(`Seat ${seatId} could not be booked`, 409);
        }
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    return BookingModel.getById(bookingId);
  },

  updateStatus: async (id, status) => {
    const existing = await BookingModel.getById(id);
    if (!existing) {
      throw new AppError('Booking not found', 404);
    }

    await BookingModel.updateStatus(id, status);

    if (['cancelled', 'refunded', 'expired'].includes(status)) {
      for (const item of existing.items) {
        await TripSeatModel.releaseSeat(item.trip_seat_id);
      }
    }

    return BookingModel.getById(id);
  },

  remove: async (id) => {
    const existing = await BookingModel.getById(id);
    if (!existing) {
      throw new AppError('Booking not found', 404);
    }

    for (const item of existing.items) {
      await TripSeatModel.releaseSeat(item.trip_seat_id);
    }

    await BookingModel.delete(id);
  },
};

export default BookingService;
