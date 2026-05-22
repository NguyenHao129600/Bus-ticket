import RefundModel from '../models/refundModel';
import PaymentModel from '../models/paymentModel';
import BookingModel from '../models/bookingModel';
<<<<<<< HEAD
import BusTripModel from '../models/busTripModel';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const ensureTripAccess = async (req, tripId) => {
  const trip = await BusTripModel.getById(tripId);
  if (!trip) {
    throw new AppError('Trip not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(trip.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access refunds of your own operator trips', 403);
  }

  return trip;
};

const ensureRefundAccess = (req, refund) => {
  if (!refund) {
    throw new AppError('Refund not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(refund.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access refunds of your own operator trips', 403);
  }
};

const ensurePaymentAccess = (req, payment) => {
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(payment.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access refunds of your own operator trips', 403);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, payment_id, status, trip_id } = req.query;
    const filters = { page, limit, payment_id, status, trip_id };
    if (isOperatorStaff(req.user)) {
      filters.operator_id = req.user.operator_id;
    }

    const result = await RefundModel.getAll(filters);
=======

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, payment_id, status } = req.query;
    const result = await RefundModel.getAll({ page, limit, payment_id, status });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const refund = await RefundModel.getById(req.params.id);
<<<<<<< HEAD
    ensureRefundAccess(req, refund);
=======
    if (!refund) return res.status(404).json({ success: false, message: 'Refund not found' });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return res.json({ success: true, data: refund });
  } catch (err) { next(err); }
};

<<<<<<< HEAD
export const getByTrip = async (req, res, next) => {
  try {
    await ensureTripAccess(req, req.params.trip_id);
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      trip_id: req.params.trip_id,
      status: req.query.status,
    };
    if (isOperatorStaff(req.user)) {
      filters.operator_id = req.user.operator_id;
    }

    const result = await RefundModel.getAll(filters);
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
export const create = async (req, res, next) => {
  try {
    const { payment_id, amount, reason } = req.body;

    const payment = await PaymentModel.getById(payment_id);
<<<<<<< HEAD
    ensurePaymentAccess(req, payment);

=======
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    // Chỉ refund được khi payment success
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    if (payment.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Can only refund successful payments' });
    }

<<<<<<< HEAD
    if (Number(amount) > Number(payment.amount)) {
=======
    // Số tiền refund không được vượt quá số tiền đã thanh toán
    if (amount > payment.payment_amount) {
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
      return res.status(400).json({ success: false, message: 'Refund amount exceeds payment amount' });
    }

    const id = await RefundModel.create({ payment_id, amount, reason });
    const refund = await RefundModel.getById(id);
    return res.status(201).json({ success: true, data: refund });
  } catch (err) { next(err); }
};

<<<<<<< HEAD
=======
// PATCH /api/refunds/:id/status
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const refund = await RefundModel.getById(req.params.id);
<<<<<<< HEAD
    ensureRefundAccess(req, refund);

    await RefundModel.updateStatus(req.params.id, status);

=======
    if (!refund) return res.status(404).json({ success: false, message: 'Refund not found' });

    await RefundModel.updateStatus(req.params.id, status);

    // Nếu refund approved → cập nhật payment sang refunded + booking sang refunded
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
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
<<<<<<< HEAD
    const refund = await RefundModel.getById(req.params.id);
    ensureRefundAccess(req, refund);

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const affected = await RefundModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Refund not found' });
    return res.json({ success: true, message: 'Refund deleted' });
  } catch (err) { next(err); }
<<<<<<< HEAD
};
=======
};
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
