import db from '../config/db';

const RefundModel = {
  getAll: async ({ page = 1, limit = 10, payment_id, status } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (payment_id) { where += ' AND r.payment_id = ?'; params.push(payment_id); }
    if (status)     { where += ' AND r.status = ?';     params.push(status); }

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM refunds r ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT
        r.id, r.amount, r.reason, r.status, r.refunded_at, r.created_at, r.updated_at,
        r.payment_id, p.method AS payment_method, p.amount AS payment_amount,
        b.id AS booking_id, u.full_name AS user_name
       FROM refunds r
       JOIN payments p ON p.id = r.payment_id
       JOIN bookings b ON b.id = p.booking_id
       JOIN users u    ON u.id = b.user_id AND u.deleted_at IS NULL
       ${where}
       ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT
        r.id, r.amount, r.reason, r.status, r.refunded_at, r.created_at, r.updated_at,
        r.payment_id, p.method AS payment_method, p.amount AS payment_amount,
        b.id AS booking_id, u.full_name AS user_name
       FROM refunds r
       JOIN payments p ON p.id = r.payment_id
       JOIN bookings b ON b.id = p.booking_id
       JOIN users u    ON u.id = b.user_id AND u.deleted_at IS NULL
       WHERE r.id = ?`, [id]
    );
    return rows[0] || null;
  },

  create: async ({ payment_id, amount, reason }) => {
    const now = new Date();
    const [result] = await db.query(
      `INSERT INTO refunds (payment_id, amount, reason, status, created_at, updated_at)
       VALUES (?, ?, ?, 'pending', ?, ?)`,
      [payment_id, amount, reason || null, now, now]
    );
    return result.insertId;
  },

  updateStatus: async (id, status) => {
    const refunded_at = status === 'approved' ? new Date() : null;
    const [result] = await db.query(
      'UPDATE refunds SET status = ?, refunded_at = ?, updated_at = ? WHERE id = ?',
      [status, refunded_at, new Date(), id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM refunds WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default RefundModel;