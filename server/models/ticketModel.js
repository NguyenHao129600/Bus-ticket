import db from '../config/db';
import crypto from 'crypto';

const TicketModel = {
<<<<<<< HEAD
  getAll: async ({ booking_id, status, trip_id, operator_id } = {}) => {
=======
  getAll: async ({ booking_id, status } = {}) => {
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
    const params = [];
    let where = 'WHERE 1=1';
    if (status) { where += ' AND t.status = ?'; params.push(status); }
    if (booking_id) { where += ' AND bi.booking_id = ?'; params.push(booking_id); }
<<<<<<< HEAD
    if (trip_id) { where += ' AND ts.trip_id = ?'; params.push(trip_id); }
    if (operator_id) { where += ' AND bt.operator_id = ?'; params.push(operator_id); }
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a

    const [rows] = await db.query(
      `SELECT
        t.id, t.ticket_code, t.qr_code, t.status, t.issued_at,
        t.booking_item_id, t.passenger_id,
        p.full_name AS passenger_name, p.phone_number AS passenger_phone,
        bs.seat_number, bs.seat_type,
        bi.booking_id,
<<<<<<< HEAD
        bi.trip_seat_id,
        b.user_id,
        ts.trip_id,
        bt.operator_id
=======
        b.user_id
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
       FROM tickets t
       JOIN booking_items bi ON bi.id = t.booking_item_id
       JOIN bookings b      ON b.id = bi.booking_id
       JOIN trip_seats ts    ON ts.id = bi.trip_seat_id
<<<<<<< HEAD
       JOIN bus_trips bt     ON bt.id = ts.trip_id
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
       JOIN bus_seats bs     ON bs.id = ts.bus_seat_id
       JOIN passengers p     ON p.id = t.passenger_id
       ${where} ORDER BY t.issued_at DESC`, params
    );
    return rows;
  },

  getByCode: async (ticket_code) => {
    const [rows] = await db.query(
      `SELECT
        t.id, t.ticket_code, t.qr_code, t.status, t.issued_at,
        t.booking_item_id, t.passenger_id,
        p.full_name AS passenger_name, p.phone_number AS passenger_phone,
        bs.seat_number, bs.seat_type,
        bi.booking_id,
<<<<<<< HEAD
        bi.trip_seat_id,
        b.user_id,
        ts.trip_id,
        bt.operator_id,
=======
        b.user_id,
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
        bt.departure_time, bt.arrival_time,
        dep.name AS departure_station,
        arr.name AS arrival_station
       FROM tickets t
       JOIN booking_items bi ON bi.id = t.booking_item_id
       JOIN bookings b      ON b.id = bi.booking_id
       JOIN trip_seats ts    ON ts.id = bi.trip_seat_id
       JOIN bus_seats bs     ON bs.id = ts.bus_seat_id
       JOIN passengers p     ON p.id = t.passenger_id
       JOIN bus_trips bt     ON bt.id = ts.trip_id
       JOIN routes r         ON r.id = bt.route_id
       JOIN stations dep     ON dep.id = r.departure_station_id
       JOIN stations arr     ON arr.id = r.arrival_station_id
       WHERE t.ticket_code = ?`, [ticket_code]
    );
    return rows[0] || null;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT t.id, t.ticket_code, t.qr_code, t.status, t.issued_at,
              t.booking_item_id, t.passenger_id,
              p.full_name AS passenger_name, bs.seat_number, bs.seat_type,
<<<<<<< HEAD
              bi.booking_id, bi.trip_seat_id, b.user_id, ts.trip_id, bt.operator_id
       FROM tickets t
       JOIN booking_items bi ON bi.id = t.booking_item_id
       JOIN bookings b      ON b.id = bi.booking_id
        JOIN trip_seats ts    ON ts.id = bi.trip_seat_id
       JOIN bus_trips bt     ON bt.id = ts.trip_id
=======
              bi.booking_id, b.user_id
       FROM tickets t
       JOIN booking_items bi ON bi.id = t.booking_item_id
       JOIN bookings b      ON b.id = bi.booking_id
       JOIN trip_seats ts    ON ts.id = bi.trip_seat_id
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
       JOIN bus_seats bs     ON bs.id = ts.bus_seat_id
       JOIN passengers p     ON p.id = t.passenger_id
       WHERE t.id = ?`, [id]
    );
    return rows[0] || null;
  },

  generateCode: () => {
    return 'TK-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  },

  create: async ({ booking_item_id, passenger_id }) => {
    const ticket_code = TicketModel.generateCode();
    const now = new Date();
    const [result] = await db.query(
      `INSERT INTO tickets (booking_item_id, passenger_id, ticket_code, status, issued_at)
       VALUES (?, ?, ?, 'active', ?)`,
      [booking_item_id, passenger_id, ticket_code, now]
    );
    return result.insertId;
  },

  updateStatus: async (ticket_code, status) => {
    const [result] = await db.query(
      'UPDATE tickets SET status = ? WHERE ticket_code = ?',
      [status, ticket_code]
    );
    return result.affectedRows;
  },

  // Check-in: active → used
  checkIn: async (ticket_code) => {
    const [result] = await db.query(
      `UPDATE tickets SET status = 'used' WHERE ticket_code = ? AND status = 'active'`,
      [ticket_code]
    );
    return result.affectedRows;
  },
};

export default TicketModel;
