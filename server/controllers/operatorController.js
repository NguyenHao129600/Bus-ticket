import OperatorModel from '../models/operatorModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;
    const result = await OperatorModel.getAll({ page, limit, search });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const operator = await OperatorModel.getById(req.params.id);
    if (!operator) return res.status(404).json({ success: false, message: 'Operator not found' });
    return res.json({ success: true, data: operator });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { name, phone_number, address } = req.body;
    const id = await OperatorModel.create({ name, phone_number, address });
    const operator = await OperatorModel.getById(id);
    return res.status(201).json({ success: true, data: operator });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { name, phone_number, address } = req.body;
    const affected = await OperatorModel.update(req.params.id, { name, phone_number, address });
    if (!affected) return res.status(404).json({ success: false, message: 'Operator not found' });
    const operator = await OperatorModel.getById(req.params.id);
    return res.json({ success: true, data: operator });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await OperatorModel.softDelete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Operator not found' });
    return res.json({ success: true, message: 'Operator deleted successfully' });
  } catch (err) { next(err); }
};