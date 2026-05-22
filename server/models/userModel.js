import db from '../config/db';

const UserModel = {
  getAll: async ({ page = 1, limit = 10, role, search } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE deleted_at IS NULL';
    if (role)   { where += ' AND role = ?'; params.push(role); }
    if (search) { where += ' AND (full_name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM users ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT id, full_name, email, phone_number, role, created_at, updated_at FROM users ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT id, full_name, email, phone_number, role, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL', [id]
    );
    return rows[0] || null;
  },

  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [email]);
    return rows[0] || null;
  },

  create: async ({ full_name, email, password_hash, phone_number, role = 'customer' }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password_hash, phone_number, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [full_name, email, password_hash, phone_number || null, role, now, now]
    );
    return result.insertId;
  },

  update: async (id, { full_name, phone_number, role }) => {
    const fields = [], params = [];
    if (full_name !== undefined)    { fields.push('full_name = ?');    params.push(full_name); }
    if (phone_number !== undefined) { fields.push('phone_number = ?'); params.push(phone_number); }
    if (role !== undefined)         { fields.push('role = ?');         params.push(role); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`, params);
    return result.affectedRows;
  },

  updatePassword: async (id, password_hash) => {
    const [result] = await db.query(
      'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL',
      [password_hash, new Date(), id]
    );
    return result.affectedRows;
  },

  softDelete: async (id) => {
    const [result] = await db.query('UPDATE users SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL', [new Date(), id]);
    return result.affectedRows;
  },
};

export default UserModel;