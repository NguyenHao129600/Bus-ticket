import Joi from 'joi';

export const createRefundSchema = Joi.object({
  payment_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  reason: Joi.string().max(255).allow(null, '').optional(),
});

export const updateRefundStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'rejected').required(),
});

export const listRefundSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  payment_id: Joi.number().integer().positive().optional(),
  trip_id: Joi.number().integer().positive().optional(),
  status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
});
