import Joi from 'joi';

export const createUserSchema = Joi.object({
  full_name:    Joi.string().max(100).required(),
  email:        Joi.string().email().max(100).required(),
  password:     Joi.string().min(6).max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  role:         Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
});

export const updateUserSchema = Joi.object({
  full_name:    Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  role:         Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
}).min(1);

export const updatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(6).max(100).required(),
});

export const listUserSchema = Joi.object({
  page:   Joi.number().integer().min(1).optional(),
  limit:  Joi.number().integer().min(1).max(100).optional(),
  role:   Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
  search: Joi.string().max(100).optional(),
});
