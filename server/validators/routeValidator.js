import Joi from 'joi';

export const createRouteSchema = Joi.object({
  operator_id:                Joi.number().integer().positive().required(),
  departure_station_id:       Joi.number().integer().positive().required(),
  arrival_station_id:         Joi.number().integer().positive().required(),
  estimated_duration_minutes: Joi.number().integer().positive().allow(null).optional(),
});

export const updateRouteSchema = Joi.object({
  departure_station_id:       Joi.number().integer().positive().optional(),
  arrival_station_id:         Joi.number().integer().positive().optional(),
  estimated_duration_minutes: Joi.number().integer().positive().allow(null).optional(),
}).min(1);

export const listRouteSchema = Joi.object({
  page:                 Joi.number().integer().min(1).optional(),
  limit:                Joi.number().integer().min(1).max(100).optional(),
  operator_id:          Joi.number().integer().positive().optional(),
  departure_station_id: Joi.number().integer().positive().optional(),
  arrival_station_id:   Joi.number().integer().positive().optional(),
});
