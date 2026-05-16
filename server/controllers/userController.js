import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import db from '../config/db';

const SALT_ROUNDS = 10;

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, role, search } = req.query;
    const result = await UserModel.getAll({ page, limit, role, search });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const user = await UserModel.getById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { full_name, email, password, phone_number, role } = req.body;
    const existing = await UserModel.getByEmail(email);
    if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = await UserModel.create({ full_name, email, password_hash, phone_number, role });
    const user = await UserModel.getById(id);
    return res.status(201).json({ success: true, data: user });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { full_name, phone_number, role } = req.body;
    const affected = await UserModel.update(req.params.id, { full_name, phone_number, role });
    if (!affected) return res.status(404).json({ success: false, message: 'User not found' });
    const user = await UserModel.getById(req.params.id);
    return res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { old_password, new_password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [req.params.id]);
    const user = rows[0];
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const match = await bcrypt.compare(old_password, user.password_hash);
    if (!match) return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    const password_hash = await bcrypt.hash(new_password, SALT_ROUNDS);
    await UserModel.updatePassword(req.params.id, password_hash);
    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await UserModel.softDelete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) { next(err); }
};