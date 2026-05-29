import db from '../config/db';

const RouteModel = {
  getAll: async ({
    page = 1,
    limit = 10,
    operator_id,
    departure_station_id,
    arrival_station_id,
    departure_keyword,
    arrival_keyword,
    operator_keyword,
  } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (operator_id)           { where += ' AND r.operator_id = ?';           params.push(operator_id); }
    if (departure_station_id)  { where += ' AND r.departure_station_id = ?';  params.push(departure_station_id); }
    if (arrival_station_id)    { where += ' AND r.arrival_station_id = ?';    params.push(arrival_station_id); }
    if (departure_keyword) {
      where += ' AND (dep.name LIKE ? OR dep.province LIKE ? OR dep.address LIKE ?)';
      params.push(`%${departure_keyword}%`, `%${departure_keyword}%`, `%${departure_keyword}%`);
    }
    if (arrival_keyword) {
      where += ' AND (arr.name LIKE ? OR arr.province LIKE ? OR arr.address LIKE ?)';
      params.push(`%${arrival_keyword}%`, `%${arrival_keyword}%`, `%${arrival_keyword}%`);
    }
    if (operator_keyword) {
      where += ' AND (o.name LIKE ? OR o.phone_number LIKE ? OR o.address LIKE ?)';
      params.push(`%${operator_keyword}%`, `%${operator_keyword}%`, `%${operator_keyword}%`);
    }

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total
       FROM routes r
       JOIN operators o  ON o.id = r.operator_id AND o.deleted_at IS NULL
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       ${where}`,
      params
    );
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT
        r.id, r.estimated_duration_minutes, r.created_at, r.updated_at,
        r.operator_id, o.name AS operator_name,
        r.departure_station_id, dep.name AS departure_station, dep.province AS departure_province,
        r.arrival_station_id, arr.name AS arrival_station, arr.province AS arrival_province
       FROM routes r
       JOIN operators o  ON o.id = r.operator_id AND o.deleted_at IS NULL
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       ${where} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT
        r.id, r.estimated_duration_minutes, r.created_at, r.updated_at,
        r.operator_id, o.name AS operator_name,
        r.departure_station_id, dep.name AS departure_station, dep.province AS departure_province,
        r.arrival_station_id, arr.name AS arrival_station, arr.province AS arrival_province
       FROM routes r
       JOIN operators o  ON o.id = r.operator_id AND o.deleted_at IS NULL
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       WHERE r.id = ?`, [id]
    );
    return rows[0] || null;
  },

  create: async ({ operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO routes (operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes || null, now, now]
    );
    return result.insertId;
  },

  update: async (id, { departure_station_id, arrival_station_id, estimated_duration_minutes }) => {
    const fields = [], params = [];
    if (departure_station_id !== undefined)   { fields.push('departure_station_id = ?');   params.push(departure_station_id); }
    if (arrival_station_id !== undefined)     { fields.push('arrival_station_id = ?');     params.push(arrival_station_id); }
    if (estimated_duration_minutes !== undefined) { fields.push('estimated_duration_minutes = ?'); params.push(estimated_duration_minutes); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(`UPDATE routes SET ${fields.join(', ')} WHERE id = ?`, params);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM routes WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default RouteModel;
