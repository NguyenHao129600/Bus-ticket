import db from '../config/db';

const TripSeatModel = {
  getAll: async ({ trip_id, status } = {}) => {
    const params = [];
    let where = 'WHERE 1=1';
    if (trip_id) { where += ' AND ts.trip_id = ?'; params.push(trip_id); }
    if (status)  { where += ' AND ts.status = ?';  params.push(status); }
    const [rows] = await db.query(
      `SELECT ts.id, ts.trip_id, ts.status, ts.locked_until,
              ts.locked_by_user_id, u.full_name AS locked_by_name,
              ts.bus_seat_id, bs.seat_number, bs.seat_type
       FROM trip_seats ts
       JOIN bus_seats bs ON bs.id = ts.bus_seat_id
       LEFT JOIN users u ON u.id = ts.locked_by_user_id AND u.deleted_at IS NULL
       ${where} ORDER BY bs.seat_number ASC`, params
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT ts.id, ts.trip_id, ts.status, ts.locked_until,
              ts.locked_by_user_id, u.full_name AS locked_by_name,
              ts.bus_seat_id, bs.seat_number, bs.seat_type
       FROM trip_seats ts
       JOIN bus_seats bs ON bs.id = ts.bus_seat_id
       LEFT JOIN users u ON u.id = ts.locked_by_user_id AND u.deleted_at IS NULL
       WHERE ts.id = ?`, [id]
    );
    return rows[0] || null;
  },

  bulkCreate: async (trip_id, bus_seat_ids) => {
    if (!bus_seat_ids.length) return 0;
    const values = bus_seat_ids.map(seat_id => [trip_id, seat_id, 'available']);
    const [result] = await db.query('INSERT INTO trip_seats (trip_id, bus_seat_id, status) VALUES ?', [values]);
    return result.affectedRows;
  },

<<<<<<< HEAD
  deleteByTripId: async (trip_id) => {
    const [result] = await db.query('DELETE FROM trip_seats WHERE trip_id = ?', [trip_id]);
    return result.affectedRows;
  },

=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
  lockSeat: async (id, user_id, lockMinutes = 10) => {
    const locked_until = new Date(Date.now() + lockMinutes * 60 * 1000);
    const [result] = await db.query(
      `UPDATE trip_seats SET status = 'locked', locked_by_user_id = ?, locked_until = ? WHERE id = ? AND status = 'available'`,
      [user_id, locked_until, id]
    );
    return result.affectedRows;
  },

  releaseExpiredLocks: async () => {
    const [result] = await db.query(
      `UPDATE trip_seats SET status = 'available', locked_by_user_id = NULL, locked_until = NULL WHERE status = 'locked' AND locked_until < NOW()`
    );
    return result.affectedRows;
  },

  bookSeat: async (id) => {
    const [result] = await db.query(
      `UPDATE trip_seats SET status = 'booked', locked_by_user_id = NULL, locked_until = NULL WHERE id = ? AND status = 'locked'`, [id]
    );
    return result.affectedRows;
  },

  releaseSeat: async (id) => {
    const [result] = await db.query(
      `UPDATE trip_seats SET status = 'available', locked_by_user_id = NULL, locked_until = NULL WHERE id = ?`, [id]
    );
    return result.affectedRows;
  },

  updateStatus: async (id, status) => {
    const [result] = await db.query('UPDATE trip_seats SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  },
};

<<<<<<< HEAD
export default TripSeatModel;
=======
export default TripSeatModel;
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
