import db from '../config/db';

const PassengerModel = {
  getAll: async ({ booking_id } = {}) => {
    const params = [];
    let where = 'WHERE 1=1';
    if (booking_id) { where += ' AND p.booking_id = ?'; params.push(booking_id); }

    const [rows] = await db.query(
      `SELECT p.id, p.booking_id, p.full_name, p.phone_number, p.created_at, p.updated_at
       FROM passengers p
       ${where} ORDER BY p.id ASC`, params
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT id, booking_id, full_name, phone_number, created_at, updated_at
       FROM passengers WHERE id = ?`, [id]
    );
    return rows[0] || null;
  },

  getByTripId: async (trip_id) => {
    const [rows] = await db.query(
      `SELECT
        p.id, p.booking_id, p.full_name, p.phone_number, p.created_at, p.updated_at,
        b.trip_id, b.status AS booking_status,
        bi.id AS booking_item_id,
        bs.seat_number, bs.seat_type,
        t.id AS ticket_id, t.ticket_code, t.status AS ticket_status
       FROM passengers p
       JOIN bookings b       ON b.id = p.booking_id
       LEFT JOIN tickets t   ON t.passenger_id = p.id
       LEFT JOIN booking_items bi ON bi.id = t.booking_item_id
       LEFT JOIN trip_seats ts    ON ts.id = bi.trip_seat_id
       LEFT JOIN bus_seats bs     ON bs.id = ts.bus_seat_id
       WHERE b.trip_id = ?
       ORDER BY p.id ASC`,
      [trip_id]
    );
    return rows;
  },

  create: async ({ booking_id, full_name, phone_number }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO passengers (booking_id, full_name, phone_number, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [booking_id, full_name, phone_number || null, now, now]
    );
    return result.insertId;
  },

  update: async (id, { full_name, phone_number }) => {
    const fields = [], params = [];
    if (full_name !== undefined)    { fields.push('full_name = ?');    params.push(full_name); }
    if (phone_number !== undefined) { fields.push('phone_number = ?'); params.push(phone_number); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(`UPDATE passengers SET ${fields.join(', ')} WHERE id = ?`, params);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM passengers WHERE id = ?', [id]);
    return result.affectedRows;
  },

  deleteByBooking: async (booking_id) => {
    const [result] = await db.query('DELETE FROM passengers WHERE booking_id = ?', [booking_id]);
    return result.affectedRows;
  },
};

export default PassengerModel;
