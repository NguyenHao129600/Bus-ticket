import StationModel from '../models/stationModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, province, search } = req.query;
    const result = await StationModel.getAll({ page, limit, province, search });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const station = await StationModel.getById(req.params.id);
    if (!station) return res.status(404).json({ success: false, message: 'Station not found' });
    return res.json({ success: true, data: station });
  } catch (err) { next(err); }
};

export const getProvinces = async (req, res, next) => {
  try {
    const provinces = await StationModel.getProvinces();
    return res.json({ success: true, data: provinces });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { name, address, province } = req.body;
    const id = await StationModel.create({ name, address, province });
    const station = await StationModel.getById(id);
    return res.status(201).json({ success: true, data: station });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { name, address, province } = req.body;
    const affected = await StationModel.update(req.params.id, { name, address, province });
    if (!affected) return res.status(404).json({ success: false, message: 'Station not found' });
    const station = await StationModel.getById(req.params.id);
    return res.json({ success: true, data: station });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await StationModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Station not found' });
    return res.json({ success: true, message: 'Station deleted successfully' });
  } catch (err) { next(err); }
};