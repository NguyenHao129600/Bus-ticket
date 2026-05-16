import RouteModel from '../models/routeModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, departure_station_id, arrival_station_id } = req.query;
    const result = await RouteModel.getAll({ page, limit, operator_id, departure_station_id, arrival_station_id });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const route = await RouteModel.getById(req.params.id);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.json({ success: true, data: route });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes } = req.body;

    if (departure_station_id === arrival_station_id) {
      return res.status(400).json({ success: false, message: 'Departure and arrival station must be different' });
    }

    const id = await RouteModel.create({ operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes });
    const route = await RouteModel.getById(id);
    return res.status(201).json({ success: true, data: route });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { departure_station_id, arrival_station_id, estimated_duration_minutes } = req.body;

    const existing = await RouteModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Route not found' });

    const depId = departure_station_id ?? existing.departure_station_id;
    const arrId = arrival_station_id ?? existing.arrival_station_id;
    if (depId === arrId) {
      return res.status(400).json({ success: false, message: 'Departure and arrival station must be different' });
    }

    await RouteModel.update(req.params.id, { departure_station_id, arrival_station_id, estimated_duration_minutes });
    const route = await RouteModel.getById(req.params.id);
    return res.json({ success: true, data: route });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await RouteModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Route not found' });
    return res.json({ success: true, message: 'Route deleted successfully' });
  } catch (err) { next(err); }
};