import db from '../config/db';

const OperatorModel = {
  getAll: async ({ page = 1, limit = 10, search } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE deleted_at IS NULL';
    if (search) { where += ' AND name LIKE ?'; params.push(`%${search}%`); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM operators ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT id, name, phone_number, address, created_at, updated_at FROM operators ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT id, name, phone_number, address, created_at, updated_at FROM operators WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0] || null;
  },

  create: async ({ name, phone_number, address }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO operators (name, phone_number, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [name, phone_number || null, address || null, now, now]
    );
    return result.insertId;
  },

  update: async (id, { name, phone_number, address }) => {
    const fields = [], params = [];
    if (name !== undefined)         { fields.push('name = ?');         params.push(name); }
    if (phone_number !== undefined) { fields.push('phone_number = ?'); params.push(phone_number); }
    if (address !== undefined)      { fields.push('address = ?');      params.push(address); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(
      `UPDATE operators SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`, params
    );
    return result.affectedRows;
  },

  softDelete: async (id) => {
    const [result] = await db.query(
      'UPDATE operators SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL',
      [new Date(), id]
    );
    return result.affectedRows;
  },
};

export default OperatorModel;