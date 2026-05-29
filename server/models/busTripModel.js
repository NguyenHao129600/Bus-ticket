import db from '../config/db';

const buildTripFilters = ({
  operator_id,
  route_id,
  bus_id,
  status,
  from_date,
  to_date,
  departure_station_id,
  arrival_station_id,
  departure_keyword,
  arrival_keyword,
  operator_keyword,
} = {}) => {
  const params = [];
  let where = 'WHERE bt.deleted_at IS NULL';

  if (operator_id) { where += ' AND bt.operator_id = ?'; params.push(operator_id); }
  if (route_id) { where += ' AND bt.route_id = ?'; params.push(route_id); }
  if (bus_id) { where += ' AND bt.bus_id = ?'; params.push(bus_id); }
  if (status) { where += ' AND bt.status = ?'; params.push(status); }
  if (from_date) { where += ' AND bt.departure_time >= ?'; params.push(from_date); }
  if (to_date) { where += ' AND bt.departure_time <= ?'; params.push(to_date); }
  if (departure_station_id) { where += ' AND r.departure_station_id = ?'; params.push(departure_station_id); }
  if (arrival_station_id) { where += ' AND r.arrival_station_id = ?'; params.push(arrival_station_id); }
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

  return { where, params };
};

const BusTripModel = {
  getAll: async ({
    page = 1,
    limit = 10,
    operator_id,
    route_id,
    bus_id,
    status,
    from_date,
    to_date,
    departure_station_id,
    arrival_station_id,
    departure_keyword,
    arrival_keyword,
    operator_keyword,
  } = {}) => {
    const offset = (page - 1) * limit;
    const { where, params } = buildTripFilters({
      operator_id,
      route_id,
      bus_id,
      status,
      from_date,
      to_date,
      departure_station_id,
      arrival_station_id,
      departure_keyword,
      arrival_keyword,
      operator_keyword,
    });
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total
       FROM bus_trips bt
       JOIN operators o  ON o.id = bt.operator_id AND o.deleted_at IS NULL
       JOIN routes r     ON r.id = bt.route_id
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       JOIN buses b      ON b.id = bt.bus_id AND b.deleted_at IS NULL
       ${where}`,
      params
    );
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT bt.id, bt.departure_time, bt.arrival_time, bt.ticket_price, bt.status,
              bt.created_at, bt.updated_at, bt.operator_id, o.name AS operator_name,
              bt.route_id,
              dep.id AS departure_station_id, dep.name AS departure_station, dep.province AS departure_province,
              arr.id AS arrival_station_id, arr.name AS arrival_station, arr.province AS arrival_province,
              bt.bus_id, b.license_plate, b.total_seats, bt.created_by, u.full_name AS created_by_name
       FROM bus_trips bt
       JOIN operators o  ON o.id = bt.operator_id AND o.deleted_at IS NULL
       JOIN routes r     ON r.id = bt.route_id
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       JOIN buses b      ON b.id = bt.bus_id AND b.deleted_at IS NULL
       LEFT JOIN users u ON u.id = bt.created_by AND u.deleted_at IS NULL
       ${where} ORDER BY bt.departure_time DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  searchRoundTrip: async ({
    page = 1,
    limit = 10,
    operator_id,
    route_id,
    bus_id,
    status,
    departure_station_id,
    arrival_station_id,
    departure_keyword,
    arrival_keyword,
    operator_keyword,
    outbound_from_date,
    outbound_to_date,
    return_from_date,
    return_to_date,
  } = {}) => {
    const commonFilters = {
      page,
      limit,
      operator_id,
      route_id,
      bus_id,
      status,
      operator_keyword,
    };

    const outbound = await BusTripModel.getAll({
      ...commonFilters,
      departure_station_id,
      arrival_station_id,
      departure_keyword,
      arrival_keyword,
      from_date: outbound_from_date,
      to_date: outbound_to_date,
    });

    const inbound = await BusTripModel.getAll({
      ...commonFilters,
      departure_station_id: arrival_station_id,
      arrival_station_id: departure_station_id,
      departure_keyword: arrival_keyword,
      arrival_keyword: departure_keyword,
      from_date: return_from_date,
      to_date: return_to_date,
    });

    return {
      trip_type: 'round_trip',
      outbound_trips: outbound.data,
      outbound_total: outbound.total,
      return_trips: inbound.data,
      return_total: inbound.total,
      page: Number(page),
      limit: Number(limit),
    };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT bt.id, bt.departure_time, bt.arrival_time, bt.ticket_price, bt.status,
              bt.created_at, bt.updated_at, bt.operator_id, o.name AS operator_name,
              bt.route_id, dep.name AS departure_station, arr.name AS arrival_station,
              bt.bus_id, b.license_plate, b.total_seats, bt.created_by, u.full_name AS created_by_name
       FROM bus_trips bt
       JOIN operators o  ON o.id = bt.operator_id AND o.deleted_at IS NULL
       JOIN routes r     ON r.id = bt.route_id
       JOIN stations dep ON dep.id = r.departure_station_id
       JOIN stations arr ON arr.id = r.arrival_station_id
       JOIN buses b      ON b.id = bt.bus_id AND b.deleted_at IS NULL
       LEFT JOIN users u ON u.id = bt.created_by AND u.deleted_at IS NULL
       WHERE bt.id = ? AND bt.deleted_at IS NULL`, [id]
    );
    return rows[0] || null;
  },

  create: async ({ operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status = 'scheduled', created_by }) => {
    const now = new Date();
    const [result] = await db.query(
      'INSERT INTO bus_trips (operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by || null, now, now]
    );
    return result.insertId;
  },

  update: async (id, { route_id, bus_id, departure_time, arrival_time, ticket_price, status }) => {
    const fields = [], params = [];
    if (route_id !== undefined)       { fields.push('route_id = ?');       params.push(route_id); }
    if (bus_id !== undefined)         { fields.push('bus_id = ?');         params.push(bus_id); }
    if (departure_time !== undefined) { fields.push('departure_time = ?'); params.push(departure_time); }
    if (arrival_time !== undefined)   { fields.push('arrival_time = ?');   params.push(arrival_time); }
    if (ticket_price !== undefined)   { fields.push('ticket_price = ?');   params.push(ticket_price); }
    if (status !== undefined)         { fields.push('status = ?');         params.push(status); }
    if (!fields.length) return 0;
    fields.push('updated_at = ?'); params.push(new Date(), id);
    const [result] = await db.query(`UPDATE bus_trips SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`, params);
    return result.affectedRows;
  },

  updateStatus: async (id, status) => {
    const [result] = await db.query(
      'UPDATE bus_trips SET status = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL',
      [status, new Date(), id]
    );
    return result.affectedRows;
  },

  softDelete: async (id) => {
    const [result] = await db.query('UPDATE bus_trips SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL', [new Date(), id]);
    return result.affectedRows;
  },
};

export default BusTripModel;
