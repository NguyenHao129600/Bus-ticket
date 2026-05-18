import Joi from 'joi';

const BOOKING_STATUSES = ['pending_payment', 'paid', 'confirmed', 'cancelled', 'completed', 'refunded', 'expired'];

export const createBookingSchema = Joi.object({
  user_id:       Joi.number().integer().positive().required(),
  trip_id:       Joi.number().integer().positive().required(),
  trip_seat_ids: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
});

export const updateBookingStatusSchema = Joi.object({
  status: Joi.string().valid(...BOOKING_STATUSES).required(),
});

export const listBookingSchema = Joi.object({
  page:    Joi.number().integer().min(1).optional(),
  limit:   Joi.number().integer().min(1).max(100).optional(),
  user_id: Joi.number().integer().positive().optional(),
  trip_id: Joi.number().integer().positive().optional(),
  status:  Joi.string().valid(...BOOKING_STATUSES).optional(),
});
