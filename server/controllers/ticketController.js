import TicketModel from '../models/ticketModel';
import PassengerModel from '../models/passengerModel';
import BookingItemModel from '../models/bookingItemModel';
import db from '../config/db';

export const getAll = async (req, res, next) => {
  try {
    const { booking_id, status } = req.query;
    const rows = await TicketModel.getAll({ booking_id, status });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    return res.json({ success: true, data: ticket });
  } catch (err) { next(err); }
};

export const getByCode = async (req, res, next) => {
  try {
    const ticket = await TicketModel.getByCode(req.params.code);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    return res.json({ success: true, data: ticket });
  } catch (err) { next(err); }
};

// Tạo ticket: gắn passenger vào booking_item
// POST /api/tickets  body: { booking_item_id, passenger_id }
export const create = async (req, res, next) => {
  try {
    const { booking_item_id, passenger_id } = req.body;

    const item = await BookingItemModel.getById(booking_item_id);
    if (!item) return res.status(404).json({ success: false, message: 'Booking item not found' });

    const passenger = await PassengerModel.getById(passenger_id);
    if (!passenger) return res.status(404).json({ success: false, message: 'Passenger not found' });

    // Kiểm tra booking_item đã có ticket chưa
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
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
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
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });
    await TicketModel.updateStatus(req.params.code, 'cancelled');
    const updated = await TicketModel.getByCode(req.params.code);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};