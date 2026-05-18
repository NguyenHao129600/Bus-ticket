import PaymentModel from '../models/paymentModel';
import BookingModel from '../models/bookingModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, booking_id, status, method } = req.query;
    const result = await PaymentModel.getAll({ page, limit, booking_id, status, method });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const payment = await PaymentModel.getById(req.params.id);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    return res.json({ success: true, data: payment });
  } catch (err) { next(err); }
};

export const getByBooking = async (req, res, next) => {
  try {
    const payments = await PaymentModel.getByBooking(req.params.booking_id);
    return res.json({ success: true, data: payments, total: payments.length });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { booking_id, amount, method, provider, transaction_id } = req.body;

    const booking = await BookingModel.getById(booking_id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Kiểm tra booking đã paid chưa
    if (booking.status === 'paid' || booking.status === 'confirmed') {
      return res.status(409).json({ success: false, message: 'Booking already paid' });
    }

    const id = await PaymentModel.create({ booking_id, amount, method, provider, transaction_id });
    const payment = await PaymentModel.getById(id);
    return res.status(201).json({ success: true, data: payment });
  } catch (err) { next(err); }
};

// PATCH /api/payments/:id/status
export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const payment = await PaymentModel.getById(req.params.id);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    await PaymentModel.updateStatus(req.params.id, status);

    // Nếu thanh toán thành công → cập nhật booking sang paid
    if (status === 'success') {
      await BookingModel.updateStatus(payment.booking_id, 'paid');
    }

    // Nếu thanh toán thất bại → cập nhật booking sang cancelled
    if (status === 'failed') {
      await BookingModel.updateStatus(payment.booking_id, 'cancelled');
    }

    const updated = await PaymentModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await PaymentModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Payment not found' });
    return res.json({ success: true, message: 'Payment deleted' });
  } catch (err) { next(err); }
};