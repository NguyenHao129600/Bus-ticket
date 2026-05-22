import db from '../config/db';

const PaymentModel = {
<<<<<<< HEAD
  getAll: async ({ page = 1, limit = 10, booking_id, status, method, trip_id, operator_id } = {}) => {
=======
  getAll: async ({ page = 1, limit = 10, booking_id, status, method } = {}) => {
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (booking_id) { where += ' AND p.booking_id = ?'; params.push(booking_id); }
    if (status)     { where += ' AND p.status = ?';     params.push(status); }
    if (method)     { where += ' AND p.method = ?';     params.push(method); }
<<<<<<< HEAD
    if (trip_id)    { where += ' AND b.trip_id = ?';    params.push(trip_id); }
    if (operator_id) { where += ' AND bt.operator_id = ?'; params.push(operator_id); }
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM payments p ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT
        p.id, p.amount, p.method, p.provider, p.transaction_id,
        p.status, p.paid_at, p.created_at, p.updated_at,
        p.booking_id, b.total_amount AS booking_amount,
<<<<<<< HEAD
        b.trip_id, bt.operator_id,
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN bus_trips bt ON bt.id = b.trip_id AND bt.deleted_at IS NULL
=======
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
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
<<<<<<< HEAD
        b.trip_id, bt.operator_id,
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN bus_trips bt ON bt.id = b.trip_id AND bt.deleted_at IS NULL
=======
        u.full_name AS user_name, u.email AS user_email
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
       JOIN users u    ON u.id = b.user_id AND u.deleted_at IS NULL
       WHERE p.id = ?`, [id]
    );
    return rows[0] || null;
  },

  getByBooking: async (booking_id) => {
    const [rows] = await db.query(
<<<<<<< HEAD
      `SELECT
        p.*,
        b.trip_id,
        bt.operator_id
       FROM payments p
       JOIN bookings b ON b.id = p.booking_id
       JOIN bus_trips bt ON bt.id = b.trip_id AND bt.deleted_at IS NULL
       WHERE p.booking_id = ?
       ORDER BY p.created_at DESC`,
=======
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC',
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
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

<<<<<<< HEAD
export default PaymentModel;
=======
export default PaymentModel;
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
