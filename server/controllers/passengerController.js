import PassengerModel from '../models/passengerModel';
import BookingModel from '../models/bookingModel';

export const getAll = async (req, res, next) => {
  try {
    const { booking_id } = req.query;
    const rows = await PassengerModel.getAll({ booking_id });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const passenger = await PassengerModel.getById(req.params.id);
    if (!passenger) return res.status(404).json({ success: false, message: 'Passenger not found' });
    return res.json({ success: true, data: passenger });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { booking_id, full_name, phone_number } = req.body;

    const booking = await BookingModel.getById(booking_id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const id = await PassengerModel.create({ booking_id, full_name, phone_number });
    const passenger = await PassengerModel.getById(id);
    return res.status(201).json({ success: true, data: passenger });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { full_name, phone_number } = req.body;
    const affected = await PassengerModel.update(req.params.id, { full_name, phone_number });
    if (!affected) return res.status(404).json({ success: false, message: 'Passenger not found' });
    const passenger = await PassengerModel.getById(req.params.id);
    return res.json({ success: true, data: passenger });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await PassengerModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Passenger not found' });
    return res.json({ success: true, message: 'Passenger deleted successfully' });
  } catch (err) { next(err); }
};