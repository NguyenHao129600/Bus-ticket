import db from '../config/db';

const BookingModel = {
  getAll: async ({ page = 1, limit = 10, user_id, trip_id, status, operator_id } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (user_id) { where += ' AND b.user_id = ?'; params.push(user_id); }
    if (trip_id) { where += ' AND b.trip_id = ?'; params.push(trip_id); }
    if (status)  { where += ' AND b.status = ?';  params.push(status); }
    if (operator_id) { where += ' AND bt.operator_id = ?'; params.push(operator_id); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM bookings b ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT b.id, b.total_amount, b.status, b.booked_at, b.created_at, b.updated_at,
              b.user_id, u.full_name AS user_name, u.email AS user_email,
              b.trip_id, bt.operator_id, bt.departure_time, bt.arrival_time,
              dep.name AS departure_station, arr.name AS arrival_station
       FROM bookings b
       JOIN users u      ON u.id = b.user_id AND u.deleted_at IS NULL
       JOIN bus_trips bt ON bt.id = b.trip_id AND bt.deleted_at IS NULL
       JOIN routes r     ON r.id = bt.route_id
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       ${where} ORDER BY b.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [bookingRows] = await db.query(
      `SELECT b.id, b.total_amount, b.status, b.booked_at, b.created_at, b.updated_at,
              b.user_id, u.full_name AS user_name, u.email AS user_email,
              b.trip_id, bt.operator_id, bt.departure_time, bt.arrival_time, bt.ticket_price,
              dep.name AS departure_station, arr.name AS arrival_station
       FROM bookings b
       JOIN users u      ON u.id = b.user_id AND u.deleted_at IS NULL
       JOIN bus_trips bt ON bt.id = b.trip_id AND bt.deleted_at IS NULL
       JOIN routes r     ON r.id = bt.route_id
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       WHERE b.id = ?`, [id]
    );
    if (!bookingRows[0]) return null;
    const [items] = await db.query(
      `SELECT bi.id, bi.trip_seat_id, bs.seat_number, bs.seat_type,
              t.id AS ticket_id, t.ticket_code, t.status AS ticket_status,
              p.full_name AS passenger_name, p.phone_number AS passenger_phone
       FROM booking_items bi
       JOIN trip_seats ts  ON ts.id = bi.trip_seat_id
       JOIN bus_seats bs   ON bs.id = ts.bus_seat_id
       LEFT JOIN tickets t ON t.booking_item_id = bi.id
       LEFT JOIN passengers p ON p.id = t.passenger_id
       WHERE bi.booking_id = ?`, [id]
    );
    return { ...bookingRows[0], items };
  },

  create: async ({ user_id, trip_id, total_amount, status = 'pending_payment' }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, trip_id, total_amount, status, booked_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, trip_id, total_amount, status, now, now, now]
    );
    return result.insertId;
  },

  updateStatus: async (id, status) => {
    const [result] = await db.query('UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?', [status, new Date(), id]);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default BookingModel;
