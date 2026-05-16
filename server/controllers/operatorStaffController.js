import OperatorStaffModel from '../models/operatorStaffModel';
import UserModel from '../models/userModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, role } = req.query;
    const result = await OperatorStaffModel.getAll({ page, limit, operator_id, role });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const staff = await OperatorStaffModel.getById(req.params.id);
    if (!staff) return res.status(404).json({ success: false, message: 'Operator staff not found' });
    return res.json({ success: true, data: staff });
  } catch (err) { next(err); }
};

export const getByUserId = async (req, res, next) => {
  try {
    const staffs = await OperatorStaffModel.getByUserId(req.params.user_id);
    return res.json({ success: true, data: staffs });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { user_id, operator_id, role } = req.body;
    const user = await UserModel.getById(user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const existing = await OperatorStaffModel.getByUserAndOperator(user_id, operator_id);
    if (existing) return res.status(409).json({ success: false, message: 'This user is already a staff of this operator' });
    const id = await OperatorStaffModel.create({ user_id, operator_id, role });
    const staff = await OperatorStaffModel.getById(id);
    return res.status(201).json({ success: true, data: staff });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { role } = req.body;
    const existing = await OperatorStaffModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Operator staff not found' });
    await OperatorStaffModel.update(req.params.id, { role });
    const staff = await OperatorStaffModel.getById(req.params.id);
    return res.json({ success: true, data: staff });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await OperatorStaffModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Operator staff not found' });
    return res.json({ success: true, message: 'Operator staff removed successfully' });
  } catch (err) { next(err); }
};