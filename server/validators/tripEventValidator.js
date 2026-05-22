import Joi from 'joi';

const EVENT_TYPES = ['created', 'delayed', 'boarding', 'departed', 'arrived', 'completed', 'cancelled'];

export const createTripEventSchema = Joi.object({
  trip_id:    Joi.number().integer().positive().required(),
  event_type: Joi.string().valid(...EVENT_TYPES).required(),
  note:       Joi.string().max(255).allow(null, '').optional(),
  created_by: Joi.number().integer().positive().optional(),
});

export const listTripEventSchema = Joi.object({
  trip_id:    Joi.number().integer().positive().optional(),
  event_type: Joi.string().valid(...EVENT_TYPES).optional(),
});
