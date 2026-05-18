import Joi from 'joi';

const SEAT_STATUSES = ['available', 'locked', 'booked'];

export const lockSeatSchema = Joi.object({
  trip_seat_id: Joi.number().integer().positive().required(),
  user_id:      Joi.number().integer().positive().required(),
  lock_minutes: Joi.number().integer().min(1).max(30).optional(),
});

export const releaseSeatSchema = Joi.object({
  trip_seat_id: Joi.number().integer().positive().required(),
});

export const updateTripSeatStatusSchema = Joi.object({
  status: Joi.string().valid(...SEAT_STATUSES).required(),
});

export const listTripSeatSchema = Joi.object({
  trip_id: Joi.number().integer().positive().optional(),
  status:  Joi.string().valid(...SEAT_STATUSES).optional(),
});
