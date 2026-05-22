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
    throw new AppError('You can only access payments of your own operator trips', 403);
  }

  return trip;
};

const ensurePaymentAccess = (req, payment) => {
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (isOperatorStaff(req.user) && Number(payment.operator_id) !== Number(req.user.operator_id)) {
    throw new AppError('You can only access payments of your own operator trips', 403);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, booking_id, status, method, trip_id } = req.query;
    const filters = { page, limit, booking_id, status, method, trip_id };
    if (isOperatorStaff(req.user)) {
      filters.operator_id = req.user.operator_id;
    }

    const result = await PaymentModel.getAll(filters);
=======

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, booking_id, status, method } = req.query;
    const result = await PaymentModel.getAll({ page, limit, booking_id, status, method });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const payment = await PaymentModel.getById(req.params.id);
<<<<<<< HEAD
    ensurePaymentAccess(req, payment);
=======
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    return res.json({ success: true, data: payment });
  } catch (err) { next(err); }
};

export const getByBooking = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const booking = await BookingModel.getById(req.params.booking_id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    await ensureTripAccess(req, booking.trip_id);

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const payments = await PaymentModel.getByBooking(req.params.booking_id);
    return res.json({ success: true, data: payments, total: payments.length });
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
      method: req.query.method,
    };
    if (isOperatorStaff(req.user)) {
      filters.operator_id = req.user.operator_id;
    }

    const result = await PaymentModel.getAll(filters);
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
export const create = async (req, res, next) => {
  try {
    const { booking_id, amount, method, provider, transaction_id } = req.body;

    const booking = await BookingModel.getById(booking_id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
<<<<<<< HEAD
    await ensureTripAccess(req, booking.trip_id);

=======

    // Kiểm tra booking đã paid chưa
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    if (booking.status === 'paid' || booking.status === 'confirmed') {
      return res.status(409).json({ success: false, message: 'Booking already paid' });
    }

    const id = await PaymentModel.create({ booking_id, amount, method, provider, transaction_id });
    const payment = await PaymentModel.getById(id);
    return res.status(201).json({ success: true, data: payment });
  } catch (err) { next(err); }
};

<<<<<<< HEAD
=======
// PATCH /api/payments/:id/status
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const payment = await PaymentModel.getById(req.params.id);
<<<<<<< HEAD
    ensurePaymentAccess(req, payment);

    await PaymentModel.updateStatus(req.params.id, status);

=======
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    await PaymentModel.updateStatus(req.params.id, status);

    // Nếu thanh toán thành công → cập nhật booking sang paid
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    if (status === 'success') {
      await BookingModel.updateStatus(payment.booking_id, 'paid');
    }

<<<<<<< HEAD
=======
    // Nếu thanh toán thất bại → cập nhật booking sang cancelled
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    if (status === 'failed') {
      await BookingModel.updateStatus(payment.booking_id, 'cancelled');
    }

    const updated = await PaymentModel.getById(req.params.id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const payment = await PaymentModel.getById(req.params.id);
    ensurePaymentAccess(req, payment);

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const affected = await PaymentModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Payment not found' });
    return res.json({ success: true, message: 'Payment deleted' });
  } catch (err) { next(err); }
<<<<<<< HEAD
};
=======
};
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
