import db from '../config/db';

const OperatorStaffModel = {
  getAll: async ({ page = 1, limit = 10, operator_id, role } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (operator_id) { where += ' AND os.operator_id = ?'; params.push(operator_id); }
    if (role)        { where += ' AND os.role = ?';        params.push(role); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM operator_staffs os ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT os.id, os.user_id, os.operator_id, os.role, os.created_at, os.updated_at,
              u.full_name, u.email, u.phone_number, o.name AS operator_name
       FROM operator_staffs os
       JOIN users u ON u.id = os.user_id AND u.deleted_at IS NULL
       JOIN operators o ON o.id = os.operator_id AND o.deleted_at IS NULL
       ${where} ORDER BY os.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT os.id, os.user_id, os.operator_id, os.role, os.created_at, os.updated_at,
              u.full_name, u.email, u.phone_number, o.name AS operator_name
       FROM operator_staffs os
       JOIN users u ON u.id = os.user_id AND u.deleted_at IS NULL
       JOIN operators o ON o.id = os.operator_id AND o.deleted_at IS NULL
       WHERE os.id = ?`, [id]
    );
    return rows[0] || null;
  },

  getByUserAndOperator: async (user_id, operator_id) => {
    const [rows] = await db.query('SELECT * FROM operator_staffs WHERE user_id = ? AND operator_id = ?', [user_id, operator_id]);
    return rows[0] || null;
  },

  getByUserId: async (user_id) => {
    const [rows] = await db.query(
      `SELECT os.*, o.name AS operator_name FROM operator_staffs os
       JOIN operators o ON o.id = os.operator_id AND o.deleted_at IS NULL
       WHERE os.user_id = ?`, [user_id]
    );
    return rows;
  },

  create: async ({ user_id, operator_id, role }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO operator_staffs (user_id, operator_id, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [user_id, operator_id, role, now, now]
    );
    return result.insertId;
  },

  update: async (id, { role }) => {
    const [result] = await db.query('UPDATE operator_staffs SET role = ?, updated_at = ? WHERE id = ?', [role, new Date(), id]);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM operator_staffs WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default OperatorStaffModel;