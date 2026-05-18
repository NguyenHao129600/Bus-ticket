import Joi from 'joi';

export const createBusSchema = Joi.object({
  operator_id:   Joi.number().integer().positive().required(),
  license_plate: Joi.string().max(20).required(),
  total_seats:   Joi.number().integer().positive().required(),
});

export const updateBusSchema = Joi.object({
  license_plate: Joi.string().max(20).optional(),
  total_seats:   Joi.number().integer().positive().optional(),
}).min(1);

export const listBusSchema = Joi.object({
  page:        Joi.number().integer().min(1).optional(),
  limit:       Joi.number().integer().min(1).max(100).optional(),
  operator_id: Joi.number().integer().positive().optional(),
  search:      Joi.string().max(50).optional(),
});

export const createBusSeatSchema = Joi.object({
  seat_number: Joi.string().max(10).required(),
  seat_type:   Joi.string().valid('normal', 'vip', 'sleeper').optional(),
});

export const updateBusSeatSchema = Joi.object({
  seat_number: Joi.string().max(10).optional(),
  seat_type:   Joi.string().valid('normal', 'vip', 'sleeper').optional(),
}).min(1);

export const bulkCreateBusSeatSchema = Joi.object({
  seats: Joi.array().items(
    Joi.object({
      seat_number: Joi.string().max(10).required(),
      seat_type:   Joi.string().valid('normal', 'vip', 'sleeper').optional(),
    })
  ).min(1).required(),
});
