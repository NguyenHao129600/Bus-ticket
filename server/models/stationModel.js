import db from '../config/db';

const StationModel = {
  getAll: async ({ page = 1, limit = 10, province, search } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (province) { where += ' AND province = ?';    params.push(province); }
    if (search)   { where += ' AND name LIKE ?';     params.push(`%${search}%`); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM stations ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT id, name, address, province, created_at, updated_at FROM stations ${where} ORDER BY province ASC, name ASC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT id, name, address, province, created_at, updated_at FROM stations WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  getProvinces: async () => {
    const [rows] = await db.query(
      'SELECT DISTINCT province FROM stations WHERE province IS NOT NULL ORDER BY province ASC'
    );
    return rows.map(r => r.province);
  },

  create: async ({ name, address, province }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO stations (name, address, province, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [name, address || null, province || null, now, now]
    );
    return result.insertId;
  },

  update: async (id, { name, address, province }) => {
    const fields = [], params = [];
    if (name !== undefined)     { fields.push('name = ?');     params.push(name); }
    if (address !== undefined)  { fields.push('address = ?');  params.push(address); }
    if (province !== undefined) { fields.push('province = ?'); params.push(province); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(
      `UPDATE stations SET ${fields.join(', ')} WHERE id = ?`, params
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM stations WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default StationModel;