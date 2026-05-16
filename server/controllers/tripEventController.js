import TripEventModel from '../models/tripEventModel';
import BusTripModel from '../models/busTripModel';

export const getAll = async (req, res, next) => {
  try {
    const { trip_id, event_type } = req.query;
    const rows = await TripEventModel.getAll({ trip_id, event_type });
    return res.json({ success: true, data: rows, total: rows.length });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const event = await TripEventModel.getById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Trip event not found' });
    return res.json({ success: true, data: event });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { trip_id, event_type, note, created_by } = req.body;
    const trip = await BusTripModel.getById(trip_id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    const id = await TripEventModel.create({ trip_id, event_type, note, created_by });
    const event = await TripEventModel.getById(id);
    return res.status(201).json({ success: true, data: event });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await TripEventModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Trip event not found' });
    return res.json({ success: true, message: 'Trip event deleted' });
  } catch (err) { next(err); }
};