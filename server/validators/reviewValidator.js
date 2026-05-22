import Joi from 'joi';

export const createReviewSchema = Joi.object({
  user_id:     Joi.number().integer().positive().required(),
  operator_id: Joi.number().integer().positive().required(),
  rating:      Joi.number().integer().min(1).max(5).required(),
  comment:     Joi.string().max(1000).allow(null, '').optional(),
});

export const updateReviewSchema = Joi.object({
  rating:  Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().max(1000).allow(null, '').optional(),
}).min(1);

export const listReviewSchema = Joi.object({
  page:        Joi.number().integer().min(1).optional(),
  limit:       Joi.number().integer().min(1).max(100).optional(),
  operator_id: Joi.number().integer().positive().optional(),
  user_id:     Joi.number().integer().positive().optional(),
  min_rating:  Joi.number().integer().min(1).max(5).optional(),
  max_rating:  Joi.number().integer().min(1).max(5).optional(),
});
