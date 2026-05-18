import Joi from 'joi';

export const registerSchema = Joi.object({
  full_name:    Joi.string().max(100).required(),
  email:        Joi.string().email().max(100).required(),
  password:     Joi.string().min(6).max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
});

export const loginSchema = Joi.object({
  email:    Joi.string().email().max(100).required(),
  password: Joi.string().required(),
});
