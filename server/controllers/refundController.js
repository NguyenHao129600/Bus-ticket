import RefundModel from '../models/refundModel';
import PaymentModel from '../models/paymentModel';
import BookingModel from '../models/bookingModel';
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
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const refund = await RefundModel.getById(req.params.id);
    ensureRefundAccess(req, refund);
    return res.json({ success: true, data: refund });
  } catch (err) { next(err); }
};

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

export const create = async (req, res, next) => {
  try {
    const { payment_id, amount, reason } = req.body;

    const payment = await PaymentModel.getById(payment_id);
    ensurePaymentAccess(req, payment);

    if (payment.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Can only refund successful payments' });
    }

    if (Number(amount) > Number(payment.amount)) {
      return res.status(400).json({ success: false, message: 'Refund amount exceeds payment amount' });
    }

    const id = await RefundModel.create({ payment_id, amount, reason });
    const refund = await RefundModel.getById(id);
    return res.status(201).json({ success: true, data: refund });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const refund = await RefundModel.getById(req.params.id);
    ensureRefundAccess(req, refund);

    await RefundModel.updateStatus(req.params.id, status);

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
    const refund = await RefundModel.getById(req.params.id);
    ensureRefundAccess(req, refund);

    const affected = await RefundModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Refund not found' });
    return res.json({ success: true, message: 'Refund deleted' });
  } catch (err) { next(err); }
};
