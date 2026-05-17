import BookingItemModel from '../models/bookingItemModel';

export const getAll = async (req, res, next) => {
  try {
    const { booking_id } = req.query;
    const rows = await BookingItemModel.getAll({ booking_id });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await BookingItemModel.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Booking item not found' });
    return res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await BookingItemModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Booking item not found' });
    return res.json({ success: true, message: 'Booking item deleted' });
  } catch (err) { next(err); }
};