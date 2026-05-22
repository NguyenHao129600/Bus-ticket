import Joi from 'joi';

export const createPaymentSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  method: Joi.string().valid('momo', 'zalopay', 'cash', 'bank_transfer').required(),
  provider: Joi.string().max(50).allow(null, '').optional(),
  transaction_id: Joi.string().max(100).allow(null, '').optional(),
});

export const updatePaymentStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'success', 'failed', 'refunded').required(),
});

export const listPaymentSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  booking_id: Joi.number().integer().positive().optional(),
  trip_id: Joi.number().integer().positive().optional(),
  status: Joi.string().valid('pending', 'success', 'failed', 'refunded').optional(),
  method: Joi.string().valid('momo', 'zalopay', 'cash', 'bank_transfer').optional(),
});
