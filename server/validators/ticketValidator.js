import Joi from 'joi';

export const createTicketSchema = Joi.object({
  booking_item_id: Joi.number().integer().positive().required(),
  passenger_id:    Joi.number().integer().positive().required(),
});

export const listTicketSchema = Joi.object({
  booking_id: Joi.number().integer().positive().optional(),
  status:     Joi.string().valid('active', 'used', 'cancelled', 'expired').optional(),
});
