import Joi from 'joi';

const TRIP_STATUSES = ['scheduled', 'boarding', 'departed', 'delayed', 'arrived', 'completed', 'cancelled'];

export const createBusTripSchema = Joi.object({
  operator_id:    Joi.number().integer().positive().required(),
  route_id:       Joi.number().integer().positive().required(),
  bus_id:         Joi.number().integer().positive().required(),
  departure_time: Joi.date().iso().required(),
  arrival_time:   Joi.date().iso().greater(Joi.ref('departure_time')).required(),
  ticket_price:   Joi.number().positive().required(),
  status:         Joi.string().valid(...TRIP_STATUSES).optional(),
  created_by:     Joi.number().integer().positive().optional(),
});

export const updateBusTripSchema = Joi.object({
  route_id:       Joi.number().integer().positive().optional(),
  bus_id:         Joi.number().integer().positive().optional(),
  departure_time: Joi.date().iso().optional(),
  arrival_time:   Joi.date().iso().optional(),
  ticket_price:   Joi.number().positive().optional(),
  status:         Joi.string().valid(...TRIP_STATUSES).optional(),
}).min(1);

export const updateTripStatusSchema = Joi.object({
  status:     Joi.string().valid(...TRIP_STATUSES).required(),
  note:       Joi.string().max(255).allow(null, '').optional(),
  updated_by: Joi.number().integer().positive().optional(),
});

export const listBusTripSchema = Joi.object({
  page:        Joi.number().integer().min(1).optional(),
  limit:       Joi.number().integer().min(1).max(100).optional(),
  operator_id: Joi.number().integer().positive().optional(),
  route_id:    Joi.number().integer().positive().optional(),
  bus_id:      Joi.number().integer().positive().optional(),
  trip_type:   Joi.string().valid('one_way', 'round_trip').optional(),
  departure_date: Joi.date().iso().optional(),
  return_date: Joi.date().iso().optional(),
  departure_station_id: Joi.number().integer().positive().optional(),
  arrival_station_id:   Joi.number().integer().positive().optional(),
  status:      Joi.string().valid(...TRIP_STATUSES).optional(),
  from_date:   Joi.date().iso().optional(),
  to_date:     Joi.date().iso().optional(),
  departure_keyword: Joi.string().max(100).optional(),
  arrival_keyword:   Joi.string().max(100).optional(),
  operator_keyword:  Joi.string().max(100).optional(),
}).custom((value, helpers) => {
  if (value.trip_type === 'round_trip' && !value.return_date) {
    return helpers.message('return_date is required when trip_type is round_trip');
  }

  return value;
});
