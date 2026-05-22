import db from '../config/db';

const TripEventModel = {
  getAll: async ({ trip_id, event_type } = {}) => {
    const params = [];
    let where = 'WHERE 1=1';
    if (trip_id)    { where += ' AND te.trip_id = ?';    params.push(trip_id); }
    if (event_type) { where += ' AND te.event_type = ?'; params.push(event_type); }
    const [rows] = await db.query(
      `SELECT te.id, te.trip_id, te.event_type, te.note, te.created_at,
              te.created_by, u.full_name AS created_by_name
       FROM trip_events te
       LEFT JOIN users u ON u.id = te.created_by AND u.deleted_at IS NULL
       ${where} ORDER BY te.created_at DESC`, params
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT te.id, te.trip_id, te.event_type, te.note, te.created_at,
              te.created_by, u.full_name AS created_by_name
       FROM trip_events te
       LEFT JOIN users u ON u.id = te.created_by AND u.deleted_at IS NULL
       WHERE te.id = ?`, [id]
    );
    return rows[0] || null;
  },

  create: async ({ trip_id, event_type, note, created_by }) => {
    const [result] = await db.query(
      'INSERT INTO trip_events (trip_id, event_type, note, created_by, created_at) VALUES (?, ?, ?, ?, ?)',
      [trip_id, event_type, note || null, created_by || null, new Date()]
    );
    return result.insertId;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM trip_events WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default TripEventModel;