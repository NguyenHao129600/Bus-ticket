import db from '../config/db';

const PaymentModel = {
  getAll: async ({ page = 1, limit = 10, booking_id, status, method } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (booking_id) { where += ' AND p.booking_id = ?'; params.push(booking_id); }
    if (status)     { where += ' AND p.status = ?';     params.push(status); }
    if (method)     { where += ' AND p.method = ?';     params.push(method); }

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM payments p ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT
        p.id, p.amount, p.method, p.provider, p.transaction_id,
        p.status, p.paid_at, p.created_at, p.updated_at,
        p.booking_id, b.total_amount AS booking_amount,
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN users u    ON u.id = b.user_id AND u.deleted_at IS NULL
       ${where}
       ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT
        p.id, p.amount, p.method, p.provider, p.transaction_id,
        p.status, p.paid_at, p.created_at, p.updated_at,
        p.booking_id, b.total_amount AS booking_amount,
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN users u    ON u.id = b.user_id AND u.deleted_at IS NULL
       WHERE p.id = ?`, [id]
    );
    return rows[0] || null;
  },

  getByBooking: async (booking_id) => {
    const [rows] = await db.query(
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC',
      [booking_id]
    );
    return rows;
  },

  create: async ({ booking_id, amount, method, provider, transaction_id }) => {
    const now = new Date();
    const [result] = await db.query(
      `INSERT INTO payments (booking_id, amount, method, provider, transaction_id, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`,
      [booking_id, amount, method, provider || null, transaction_id || null, now, now]
    );
    return result.insertId;
  },

  updateStatus: async (id, status) => {
    const paid_at = status === 'success' ? new Date() : null;
    const [result] = await db.query(
      'UPDATE payments SET status = ?, paid_at = ?, updated_at = ? WHERE id = ?',
      [status, paid_at, new Date(), id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM payments WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default PaymentModel;