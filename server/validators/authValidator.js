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

export const registerOperatorStaffSchema = Joi.object({
  full_name:    Joi.string().max(100).required(),
  email:        Joi.string().email().max(100).required(),
  password:     Joi.string().min(6).max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  operator_id:  Joi.number().integer().positive().required(),
  staff_role:   Joi.string().valid('operator_admin', 'trip_manager', 'ticket_staff').required(),
});

export const loginOperatorStaffSchema = Joi.object({
  email:       Joi.string().email().max(100).required(),
  password:    Joi.string().required(),
  operator_id: Joi.number().integer().positive().optional(),
});
