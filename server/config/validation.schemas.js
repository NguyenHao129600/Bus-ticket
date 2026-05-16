import Joi from 'joi';

// ─── USERS ───────────────────────────────────────────────────────────────────

export const createUserSchema = Joi.object({
  full_name:    Joi.string().max(100).required(),
  email:        Joi.string().email().max(100).required(),
  password:     Joi.string().min(6).max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  role:         Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
});

export const updateUserSchema = Joi.object({
  full_name:    Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  role:         Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
}).min(1);

export const updatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(6).max(100).required(),
});

export const listUserSchema = Joi.object({
  page:   Joi.number().integer().min(1).optional(),
  limit:  Joi.number().integer().min(1).max(100).optional(),
  role:   Joi.string().valid('customer', 'operator_staff', 'admin').optional(),
  search: Joi.string().max(100).optional(),
});

// ─── OPERATOR STAFFS ─────────────────────────────────────────────────────────

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

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

export const createReviewSchema = Joi.object({
  user_id:     Joi.number().integer().positive().required(),
  operator_id: Joi.number().integer().positive().required(),
  rating:      Joi.number().integer().min(1).max(5).required(),
  comment:     Joi.string().max(1000).allow(null, '').optional(),
});

export const updateReviewSchema = Joi.object({
  rating:  Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().max(1000).allow(null, '').optional(),
}).min(1);

export const listReviewSchema = Joi.object({
  page:        Joi.number().integer().min(1).optional(),
  limit:       Joi.number().integer().min(1).max(100).optional(),
  operator_id: Joi.number().integer().positive().optional(),
  user_id:     Joi.number().integer().positive().optional(),
  min_rating:  Joi.number().integer().min(1).max(5).optional(),
  max_rating:  Joi.number().integer().min(1).max(5).optional(),
});

// ─── BUS TRIPS ───────────────────────────────────────────────────────────────

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
  status:      Joi.string().valid(...TRIP_STATUSES).optional(),
  from_date:   Joi.date().iso().optional(),
  to_date:     Joi.date().iso().optional(),
});

// ─── TRIP SEATS ──────────────────────────────────────────────────────────────

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

// ─── TRIP EVENTS ─────────────────────────────────────────────────────────────

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

// ─── BOOKINGS ────────────────────────────────────────────────────────────────

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

// ─── OPERATORS ───────────────────────────────────────────────────────────────

export const createOperatorSchema = Joi.object({
  name:         Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  address:      Joi.string().max(255).allow(null, '').optional(),
});

export const updateOperatorSchema = Joi.object({
  name:         Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).allow(null, '').optional(),
  address:      Joi.string().max(255).allow(null, '').optional(),
}).min(1);

export const listOperatorSchema = Joi.object({
  page:   Joi.number().integer().min(1).optional(),
  limit:  Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().max(100).optional(),
});

// ─── STATIONS ────────────────────────────────────────────────────────────────

export const createStationSchema = Joi.object({
  name:     Joi.string().max(100).required(),
  address:  Joi.string().max(255).allow(null, '').optional(),
  province: Joi.string().max(100).allow(null, '').optional(),
});

export const updateStationSchema = Joi.object({
  name:     Joi.string().max(100).optional(),
  address:  Joi.string().max(255).allow(null, '').optional(),
  province: Joi.string().max(100).allow(null, '').optional(),
}).min(1);

export const listStationSchema = Joi.object({
  page:     Joi.number().integer().min(1).optional(),
  limit:    Joi.number().integer().min(1).max(100).optional(),
  province: Joi.string().max(100).optional(),
  search:   Joi.string().max(100).optional(),
});

// ─── ROUTES ──────────────────────────────────────────────────────────────────

export const createRouteSchema = Joi.object({
  operator_id:              Joi.number().integer().positive().required(),
  departure_station_id:     Joi.number().integer().positive().required(),
  arrival_station_id:       Joi.number().integer().positive().required(),
  estimated_duration_minutes: Joi.number().integer().positive().allow(null).optional(),
});

export const updateRouteSchema = Joi.object({
  departure_station_id:     Joi.number().integer().positive().optional(),
  arrival_station_id:       Joi.number().integer().positive().optional(),
  estimated_duration_minutes: Joi.number().integer().positive().allow(null).optional(),
}).min(1);

export const listRouteSchema = Joi.object({
  page:                 Joi.number().integer().min(1).optional(),
  limit:                Joi.number().integer().min(1).max(100).optional(),
  operator_id:          Joi.number().integer().positive().optional(),
  departure_station_id: Joi.number().integer().positive().optional(),
  arrival_station_id:   Joi.number().integer().positive().optional(),
});

// ─── BUSES ───────────────────────────────────────────────────────────────────

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

// ─── BUS SEATS ───────────────────────────────────────────────────────────────

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