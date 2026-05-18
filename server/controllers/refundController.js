import RefundModel from '../models/refundModel';
import PaymentModel from '../models/paymentModel';
import BookingModel from '../models/bookingModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, payment_id, status } = req.query;
    const result = await RefundModel.getAll({ page, limit, payment_id, status });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const refund = await RefundModel.getById(req.params.id);
    if (!refund) return res.status(404).json({ success: false, message: 'Refund not found' });
    return res.json({ success: true, data: refund });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { payment_id, amount, reason } = req.body;

    const payment = await PaymentModel.getById(payment_id);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    // Chỉ refund được khi payment success
    if (payment.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Can only refund successful payments' });
    }

    // Số tiền refund không được vượt quá số tiền đã thanh toán
    if (amount > payment.payment_amount) {
      return res.status(400).json({ success: false, message: 'Refund amount exceeds payment amount' });
    }

    const id = await RefundModel.create({ payment_id, amount, reason });
    const refund = await RefundModel.getById(id);
    return res.status(201).json({ success: true, data: refund });
  } catch (err) { next(err); }
};

// PATCH /api/refunds/:id/status
export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const refund = await RefundModel.getById(req.params.id);
    if (!refund) return res.status(404).json({ success: false, message: 'Refund not found' });

    await RefundModel.updateStatus(req.params.id, status);

    // Nếu refund approved → cập nhật payment sang refunded + booking sang refunded
    if (status === 'approved') {
      await PaymentModel.updateStatus(refund.payment_id, 'refunded');
      await BookingModel.updateStatus(refund.booking_id, 'refunded');
    }

    const updated = await RefundModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await RefundModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Refund not found' });
    return res.json({ success: true, message: 'Refund deleted' });
  } catch (err) { next(err); }
};