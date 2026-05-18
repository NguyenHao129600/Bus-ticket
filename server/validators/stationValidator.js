import Joi from 'joi';

export const createStationSchema = Joi.object({
  name:     Joi.string().max(100).required(),
  address:  Joi.string().max(255).allow(null, '').optional(),
  province: Joi.string().max(100).allow(null, '').optional(),
});

export const updateStationSchema = Joi.object({
  name:     Joi.string().max(100).optional(),
  address:  Joi.string().max(255).allow(null, '').optional(),
  province: Joi.string().max(100).allow(null, '').optional(),
}).min(1);

export const listStationSchema = Joi.object({
  page:     Joi.number().integer().min(1).optional(),
  limit:    Joi.number().integer().min(1).max(100).optional(),
  province: Joi.string().max(100).optional(),
  search:   Joi.string().max(100).optional(),
});
