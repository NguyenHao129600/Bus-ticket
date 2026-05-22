import Joi from 'joi';

export const createPassengerSchema = Joi.object({
  booking_id:   Joi.number().integer().positive().required(),
  full_name:    Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
});

export const updatePassengerSchema = Joi.object({
  full_name:    Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
}).min(1);

export const listPassengerSchema = Joi.object({
  booking_id: Joi.number().integer().positive().optional(),
});
