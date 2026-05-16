import db from '../config/db';

const BusModel = {
  getAll: async ({ page = 1, limit = 10, operator_id, search } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE b.deleted_at IS NULL';
    if (operator_id) { where += ' AND b.operator_id = ?';      params.push(operator_id); }
    if (search)      { where += ' AND b.license_plate LIKE ?'; params.push(`%${search}%`); }

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM buses b ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT b.id, b.license_plate, b.total_seats, b.created_at, b.updated_at,
              b.operator_id, o.name AS operator_name
       FROM buses b
       JOIN operators o ON o.id = b.operator_id AND o.deleted_at IS NULL
       ${where} ORDER BY b.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT b.id, b.license_plate, b.total_seats, b.created_at, b.updated_at,
              b.operator_id, o.name AS operator_name
       FROM buses b
       JOIN operators o ON o.id = b.operator_id AND o.deleted_at IS NULL
       WHERE b.id = ? AND b.deleted_at IS NULL`, [id]
    );
    return rows[0] || null;
  },

  getByLicensePlate: async (license_plate) => {
    const [rows] = await db.query(
      'SELECT * FROM buses WHERE license_plate = ? AND deleted_at IS NULL', [license_plate]
    );
    return rows[0] || null;
  },

  create: async ({ operator_id, license_plate, total_seats }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO buses (operator_id, license_plate, total_seats, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [operator_id, license_plate, total_seats, now, now]
    );
    return result.insertId;
  },

  update: async (id, { license_plate, total_seats }) => {
    const fields = [], params = [];
    if (license_plate !== undefined) { fields.push('license_plate = ?'); params.push(license_plate); }
    if (total_seats !== undefined)   { fields.push('total_seats = ?');   params.push(total_seats); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(`UPDATE buses SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`, params);
    return result.affectedRows;
  },

  softDelete: async (id) => {
    const [result] = await db.query(
      'UPDATE buses SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL', [new Date(), id]
    );
    return result.affectedRows;
  },
};

export default BusModel;