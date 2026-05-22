import TicketModel from '../models/ticketModel';
import PassengerModel from '../models/passengerModel';
import BookingItemModel from '../models/bookingItemModel';
<<<<<<< HEAD
import TripSeatModel from '../models/tripSeatModel';
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
import db from '../config/db';
import AppError from '../utils/AppError';

const canManageTickets = (user) => {
  return user && ['admin', 'operator_staff'].includes(user.role);
};

const assertCanAccessTicket = (user, ticket) => {
  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

<<<<<<< HEAD
  if (user && user.role === 'admin') {
    return;
  }

  if (user && user.role === 'operator_staff' && Number(ticket.operator_id) === Number(user.operator_id)) {
    return;
  }

  if (Number(ticket.user_id) === Number(user.id)) {
=======
  if (canManageTickets(user) || Number(ticket.user_id) === Number(user.id)) {
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return;
  }

  throw new AppError('Forbidden', 403);
};

export const getAll = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const { booking_id, status, trip_id } = req.query;
    const filters = { booking_id, status, trip_id };
    if (req.user && req.user.role === 'operator_staff') {
      filters.operator_id = req.user.operator_id;
    }

    const rows = await TicketModel.getAll(filters);
=======
    const { booking_id, status } = req.query;
    const rows = await TicketModel.getAll({ booking_id, status });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getById(req.params.id);
    assertCanAccessTicket(req.user, ticket);
    return res.json({ success: true, data: ticket });
  } catch (err) { next(err); }
};

export const getByCode = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getByCode(req.params.code);
    assertCanAccessTicket(req.user, ticket);
    return res.json({ success: true, data: ticket });
  } catch (err) { next(err); }
};

// POST /api/tickets  body: { booking_item_id, passenger_id }
export const create = async (req, res, next) => {
  try {
    const { booking_item_id, passenger_id } = req.body;

    const item = await BookingItemModel.getById(booking_item_id);
    if (!item) return res.status(404).json({ success: false, message: 'Booking item not found' });

    const passenger = await PassengerModel.getById(passenger_id);
    if (!passenger) return res.status(404).json({ success: false, message: 'Passenger not found' });

    const [existing] = await db.query(
      'SELECT id FROM tickets WHERE booking_item_id = ?', [booking_item_id]
    );
    if (existing.length) return res.status(409).json({ success: false, message: 'Ticket already issued for this booking item' });

    const id = await TicketModel.create({ booking_item_id, passenger_id });
    const ticket = await TicketModel.getById(id);
    return res.status(201).json({ success: true, data: ticket });
  } catch (err) { next(err); }
};

// Check-in: PATCH /api/tickets/:code/check-in
export const checkIn = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getByCode(req.params.code);
<<<<<<< HEAD
    assertCanAccessTicket(req.user, ticket);
=======
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    if (ticket.status !== 'active') {
      return res.status(400).json({ success: false, message: `Ticket is ${ticket.status}, cannot check in` });
    }
    await TicketModel.checkIn(req.params.code);
    const updated = await TicketModel.getByCode(req.params.code);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

// Cancel ticket
export const cancel = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getByCode(req.params.code);
    assertCanAccessTicket(req.user, ticket);
<<<<<<< HEAD
    if (ticket.status === 'used') {
      return res.status(400).json({ success: false, message: 'Used ticket cannot be cancelled' });
    }
    if (ticket.status === 'cancelled') {
      return res.json({ success: true, data: ticket });
    }

    await TicketModel.updateStatus(req.params.code, 'cancelled');
    await TripSeatModel.releaseSeat(ticket.trip_seat_id);
=======
    await TicketModel.updateStatus(req.params.code, 'cancelled');
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const updated = await TicketModel.getByCode(req.params.code);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};
<<<<<<< HEAD

export const getTripTickets = async (req, res, next) => {
  try {
    const filters = {
      trip_id: req.params.trip_id,
      status: req.query.status,
    };

    if (req.user && req.user.role === 'operator_staff') {
      filters.operator_id = req.user.operator_id;
    }

    const rows = await TicketModel.getAll(filters);
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
