import BusTripModel from '../models/busTripModel';
import TripSeatModel from '../models/tripSeatModel';
import TripEventModel from '../models/tripEventModel';
import db from '../config/db';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, route_id, bus_id, status, from_date, to_date } = req.query;
    const result = await BusTripModel.getAll({ page, limit, operator_id, route_id, bus_id, status, from_date, to_date });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const trip = await BusTripModel.getById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by } = req.body;
    const tripId = await BusTripModel.create({ operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by });
    const [busSeats] = await db.query('SELECT id FROM bus_seats WHERE bus_id = ?', [bus_id]);
    if (busSeats.length > 0) await TripSeatModel.bulkCreate(tripId, busSeats.map(s => s.id));
    await TripEventModel.create({ trip_id: tripId, event_type: 'created', note: 'Trip created', created_by });
    const trip = await BusTripModel.getById(tripId);
    return res.status(201).json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { route_id, bus_id, departure_time, arrival_time, ticket_price, status } = req.body;
    const existing = await BusTripModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });
    await BusTripModel.update(req.params.id, { route_id, bus_id, departure_time, arrival_time, ticket_price, status });
    const trip = await BusTripModel.getById(req.params.id);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status, note, updated_by } = req.body;
    const existing = await BusTripModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });
    await BusTripModel.updateStatus(req.params.id, status);
    const validEventTypes = ['delayed', 'boarding', 'departed', 'arrived', 'completed', 'cancelled'];
    if (validEventTypes.includes(status)) {
      await TripEventModel.create({ trip_id: req.params.id, event_type: status, note, created_by: updated_by });
    }
    const trip = await BusTripModel.getById(req.params.id);
    return res.json({ success: true, data: trip });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await BusTripModel.softDelete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Trip not found' });
    return res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (err) { next(err); }
};