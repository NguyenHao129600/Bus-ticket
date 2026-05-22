import db from '../config/db';

const BusSeatModel = {
  getAll: async ({ bus_id, seat_type } = {}) => {
    const params = [];
    let where = 'WHERE 1=1';
    if (bus_id)    { where += ' AND bus_id = ?';    params.push(bus_id); }
    if (seat_type) { where += ' AND seat_type = ?'; params.push(seat_type); }
    const [rows] = await db.query(
      `SELECT id, bus_id, seat_number, seat_type FROM bus_seats ${where} ORDER BY seat_number ASC`, params
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT id, bus_id, seat_number, seat_type FROM bus_seats WHERE id = ?', [id]);
    return rows[0] || null;
  },

  getByBusAndSeatNumber: async (bus_id, seat_number) => {
    const [rows] = await db.query(
      'SELECT * FROM bus_seats WHERE bus_id = ? AND seat_number = ?', [bus_id, seat_number]
    );
    return rows[0] || null;
  },

  // Tạo 1 ghế
  create: async ({ bus_id, seat_number, seat_type = 'normal' }) => {
    const [result] = await db.query(
      'INSERT INTO bus_seats (bus_id, seat_number, seat_type) VALUES (?, ?, ?)',
      [bus_id, seat_number, seat_type]
    );
    return result.insertId;
  },

  // Tạo nhiều ghế cùng lúc
  bulkCreate: async (bus_id, seats) => {
    if (!seats.length) return 0;
    const values = seats.map(s => [bus_id, s.seat_number, s.seat_type || 'normal']);
    const [result] = await db.query(
      'INSERT INTO bus_seats (bus_id, seat_number, seat_type) VALUES ?', [values]
    );
    return result.affectedRows;
  },

  update: async (id, { seat_number, seat_type }) => {
    const fields = [], params = [];
    if (seat_number !== undefined) { fields.push('seat_number = ?'); params.push(seat_number); }
    if (seat_type !== undefined)   { fields.push('seat_type = ?');   params.push(seat_type); }
    if (!fields.length) return 0;
    params.push(id);
    const [result] = await db.query(`UPDATE bus_seats SET ${fields.join(', ')} WHERE id = ?`, params);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM bus_seats WHERE id = ?', [id]);
    return result.affectedRows;
  },

  deleteByBus: async (bus_id) => {
    const [result] = await db.query('DELETE FROM bus_seats WHERE bus_id = ?', [bus_id]);
    return result.affectedRows;
  },
};

export default BusSeatModel;