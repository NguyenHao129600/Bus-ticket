import Joi from 'joi';

export const listBookingItemSchema = Joi.object({
  booking_id: Joi.number().integer().positive().optional(),
});
