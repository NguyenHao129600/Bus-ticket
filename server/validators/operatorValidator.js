import Joi from 'joi';

export const createOperatorSchema = Joi.object({
  name:         Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  address:      Joi.string().max(255).allow(null, '').optional(),
});

export const updateOperatorSchema = Joi.object({
  name:         Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  address:      Joi.string().max(255).allow(null, '').optional(),
}).min(1);

export const listOperatorSchema = Joi.object({
  page:   Joi.number().integer().min(1).optional(),
  limit:  Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().max(100).optional(),
});
