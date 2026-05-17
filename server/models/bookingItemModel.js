import db from '../config/db';

const BookingItemModel = {
  getAll: async ({ booking_id } = {}) => {
    const params = [];
    let where = 'WHERE 1=1';
    if (booking_id) { where += ' AND bi.booking_id = ?'; params.push(booking_id); }

    const [rows] = await db.query(
      `SELECT
        bi.id, bi.booking_id, bi.trip_seat_id, bi.created_at,
        bs.seat_number, bs.seat_type,
        ts.status AS seat_status,
        t.id AS ticket_id, t.ticket_code, t.status AS ticket_status,
        p.full_name AS passenger_name, p.phone_number AS passenger_phone
       FROM booking_items bi
       JOIN trip_seats ts  ON ts.id = bi.trip_seat_id
       JOIN bus_seats bs   ON bs.id = ts.bus_seat_id
       LEFT JOIN tickets t ON t.booking_item_id = bi.id
       LEFT JOIN passengers p ON p.id = t.passenger_id
       ${where} ORDER BY bi.id ASC`, params
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT
        bi.id, bi.booking_id, bi.trip_seat_id, bi.created_at,
        bs.seat_number, bs.seat_type,
        ts.status AS seat_status,
        t.id AS ticket_id, t.ticket_code, t.status AS ticket_status,
        p.full_name AS passenger_name, p.phone_number AS passenger_phone
       FROM booking_items bi
       JOIN trip_seats ts  ON ts.id = bi.trip_seat_id
       JOIN bus_seats bs   ON bs.id = ts.bus_seat_id
       LEFT JOIN tickets t ON t.booking_item_id = bi.id
       LEFT JOIN passengers p ON p.id = t.passenger_id
       WHERE bi.id = ?`, [id]
    );
    return rows[0] || null;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM booking_items WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default BookingItemModel;