import Joi from 'joi';

export const createOperatorStaffSchema = Joi.object({
  user_id:     Joi.number().integer().positive().required(),
  operator_id: Joi.number().integer().positive().required(),
  role:        Joi.string().valid('operator_admin', 'trip_manager', 'ticket_staff').required(),
});

export const updateOperatorStaffSchema = Joi.object({
  role: Joi.string().valid('operator_admin', 'trip_manager', 'ticket_staff').required(),
});

export const listOperatorStaffSchema = Joi.object({
  page:        Joi.number().integer().min(1).optional(),
  limit:       Joi.number().integer().min(1).max(100).optional(),
  operator_id: Joi.number().integer().positive().optional(),
  role:        Joi.string().valid('operator_admin', 'trip_manager', 'ticket_staff').optional(),
});
