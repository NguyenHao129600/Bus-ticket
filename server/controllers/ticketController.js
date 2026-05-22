import TicketModel from '../models/ticketModel';
import PassengerModel from '../models/passengerModel';
import BookingItemModel from '../models/bookingItemModel';
import TripSeatModel from '../models/tripSeatModel';
import db from '../config/db';
import AppError from '../utils/AppError';

const canManageTickets = (user) => {
  return user && ['admin', 'operator_staff'].includes(user.role);
};

const assertCanAccessTicket = (user, ticket) => {
  if (!ticket) {
    throw new AppError('Ticket not found', 404);
  }

  if (user && user.role === 'admin') {
    return;
  }

  if (user && user.role === 'operator_staff' && Number(ticket.operator_id) === Number(user.operator_id)) {
    return;
  }

  if (Number(ticket.user_id) === Number(user.id)) {
    return;
  }

  throw new AppError('Forbidden', 403);
};

export const getAll = async (req, res, next) => {
  try {
    const { booking_id, status, trip_id } = req.query;
    const filters = { booking_id, status, trip_id };
    if (req.user && req.user.role === 'operator_staff') {
      filters.operator_id = req.user.operator_id;
    }

    const rows = await TicketModel.getAll(filters);
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
    assertCanAccessTicket(req.user, ticket);
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
    if (ticket.status === 'used') {
      return res.status(400).json({ success: false, message: 'Used ticket cannot be cancelled' });
    }
    if (ticket.status === 'cancelled') {
      return res.json({ success: true, data: ticket });
    }

    await TicketModel.updateStatus(req.params.code, 'cancelled');
    await TripSeatModel.releaseSeat(ticket.trip_seat_id);
    const updated = await TicketModel.getByCode(req.params.code);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

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
