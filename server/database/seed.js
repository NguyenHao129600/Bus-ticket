import bcrypt from 'bcrypt';
import db from '../config/db';

const DEFAULT_PASSWORD = '123456';

const stations = [
  { name: 'Ben xe Mien Dong moi', address: '292 Dinh Bo Linh, Binh Thanh', province: 'TP. Ho Chi Minh' },
  { name: 'Ben xe Mien Tay', address: '395 Kinh Duong Vuong, Binh Tan', province: 'TP. Ho Chi Minh' },
  { name: 'Ben xe Mien Dong - Sai Gon', address: '292 Dinh Bo Linh, Binh Thanh', province: 'Sai Gon' },
  { name: 'Ben xe Trung tam Can Tho', address: 'QL1A, Hung Thanh, Cai Rang', province: 'Can Tho' },
  { name: 'Ben xe Trung tam Da Nang', address: '201 Ton Duc Thang, Lien Chieu', province: 'Da Nang' },
  { name: 'Ben xe phia Nam Hue', address: '97 An Duong Vuong, An Dong', province: 'Thua Thien Hue' },
  { name: 'Ben xe Nuoc Ngam', address: '1 Ngoc Hoi, Hoang Mai', province: 'Ha Noi' },
  { name: 'Ben xe Gia Lam', address: '9 Ngo Gia Kham, Long Bien', province: 'Ha Noi' },
  { name: 'Ben xe Quy Nhon', address: '71 Tay Son, Quy Nhon', province: 'Binh Dinh' },
];

const operators = [
  {
    name: 'Phuong Trang FUTA',
    phone_number: '19006067',
    address: 'TP. Ho Chi Minh',
    staff: {
      full_name: 'FUTA Trip Manager',
      email: 'futa.staff@example.com',
      phone_number: '0901000001',
      role: 'trip_manager',
    },
    buses: [
      { license_plate: '51B-325.68', total_seats: 34 },
      { license_plate: '51B-318.24', total_seats: 34 },
      { license_plate: '51B-290.11', total_seats: 40 },
    ],
    routes: [
      {
        departure_station: 'Ben xe Mien Tay',
        arrival_station: 'Ben xe Trung tam Can Tho',
        estimated_duration_minutes: 210,
        price: 165000,
        departures: ['06:00', '09:30', '13:00', '18:30'],
      },
      {
        departure_station: 'Ben xe Trung tam Can Tho',
        arrival_station: 'Ben xe Mien Tay',
        estimated_duration_minutes: 210,
        price: 165000,
        departures: ['05:30', '09:00', '14:00', '19:30'],
      },
      {
        departure_station: 'Ben xe Mien Dong moi',
        arrival_station: 'Ben xe Trung tam Da Nang',
        estimated_duration_minutes: 1020,
        price: 520000,
        departures: ['07:00', '20:00'],
      },
      {
        departure_station: 'Ben xe Trung tam Da Nang',
        arrival_station: 'Ben xe Mien Dong moi',
        estimated_duration_minutes: 1020,
        price: 520000,
        departures: ['08:30', '19:00'],
      },
    ],
  },
  {
    name: 'Hoang Long',
    phone_number: '1900988681',
    address: 'Ha Noi',
    staff: {
      full_name: 'Hoang Long Operator',
      email: 'hoanglong.staff@example.com',
      phone_number: '0901000002',
      role: 'operator_admin',
    },
    buses: [
      { license_plate: '29B-612.45', total_seats: 36 },
      { license_plate: '29B-645.72', total_seats: 36 },
      { license_plate: '29B-699.90', total_seats: 40 },
    ],
    routes: [
      {
        departure_station: 'Ben xe Nuoc Ngam',
        arrival_station: 'Ben xe Trung tam Da Nang',
        estimated_duration_minutes: 900,
        price: 480000,
        departures: ['07:30', '21:00'],
      },
      {
        departure_station: 'Ben xe Trung tam Da Nang',
        arrival_station: 'Ben xe Nuoc Ngam',
        estimated_duration_minutes: 900,
        price: 480000,
        departures: ['08:00', '20:30'],
      },
      {
        departure_station: 'Ben xe Gia Lam',
        arrival_station: 'Ben xe phia Nam Hue',
        estimated_duration_minutes: 780,
        price: 420000,
        departures: ['19:30'],
      },
      {
        departure_station: 'Ben xe phia Nam Hue',
        arrival_station: 'Ben xe Gia Lam',
        estimated_duration_minutes: 780,
        price: 420000,
        departures: ['18:45'],
      },
    ],
  },
  {
    name: 'Mai Linh Express',
    phone_number: '19006789',
    address: 'Quy Nhon, Binh Dinh',
    staff: {
      full_name: 'Mai Linh Coordinator',
      email: 'mailinh.staff@example.com',
      phone_number: '0901000003',
      role: 'trip_manager',
    },
    buses: [
      { license_plate: '77B-245.19', total_seats: 34 },
      { license_plate: '77B-260.88', total_seats: 34 },
      { license_plate: '77B-278.45', total_seats: 40 },
    ],
    routes: [
      {
        departure_station: 'Ben xe Quy Nhon',
        arrival_station: 'Ben xe Mien Dong - Sai Gon',
        estimated_duration_minutes: 720,
        price: 360000,
        departures: ['07:00', '18:00', '21:30'],
      },
      {
        departure_station: 'Ben xe Mien Dong - Sai Gon',
        arrival_station: 'Ben xe Quy Nhon',
        estimated_duration_minutes: 720,
        price: 360000,
        departures: ['06:30', '17:30', '22:00'],
      },
    ],
  },
];

const toDateTime = (dayOffset, timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60 * 1000);

const makeSeatNumber = (index) => {
  const floor = index <= 20 ? 'A' : 'B';
  const position = index <= 20 ? index : index - 20;
  return `${floor}${String(position).padStart(2, '0')}`;
};

const makeSeatType = (index, totalSeats) => {
  if (totalSeats >= 34) {
    return 'sleeper';
  }
  if (index <= 4) {
    return 'vip';
  }
  return 'normal';
};

const findOne = async (sql, params) => {
  const [rows] = await db.query(sql, params);
  return rows[0] || null;
};

const createUserIfMissing = async ({ full_name, email, phone_number, role, password_hash }) => {
  const existing = await findOne(
    'SELECT id FROM users WHERE email = ? AND deleted_at IS NULL',
    [email]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO users (full_name, email, password_hash, phone_number, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, password_hash, phone_number || null, role, now, now]
  );
  return result.insertId;
};

const createOperatorIfMissing = async ({ name, phone_number, address }) => {
  const existing = await findOne(
    'SELECT id FROM operators WHERE name = ? AND deleted_at IS NULL',
    [name]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO operators (name, phone_number, address, created_at, updated_at, deleted_at)
     VALUES (?, ?, ?, ?, ?, NULL)`,
    [name, phone_number || null, address || null, now, now]
  );
  return result.insertId;
};

const createOperatorStaffIfMissing = async ({ user_id, operator_id, role }) => {
  const existing = await findOne(
    'SELECT id FROM operator_staffs WHERE user_id = ? AND operator_id = ?',
    [user_id, operator_id]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO operator_staffs (user_id, operator_id, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, operator_id, role, now, now]
  );
  return result.insertId;
};

const createStationIfMissing = async ({ name, address, province }) => {
  const existing = await findOne(
    'SELECT id FROM stations WHERE name = ? AND province <=> ?',
    [name, province || null]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO stations (name, address, province, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
    [name, address || null, province || null, now, now]
  );
  return result.insertId;
};

const createRouteIfMissing = async ({
  operator_id,
  departure_station_id,
  arrival_station_id,
  estimated_duration_minutes,
}) => {
  const existing = await findOne(
    `SELECT id
     FROM routes
     WHERE operator_id = ? AND departure_station_id = ? AND arrival_station_id = ?`,
    [operator_id, departure_station_id, arrival_station_id]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO routes (operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [operator_id, departure_station_id, arrival_station_id, estimated_duration_minutes, now, now]
  );
  return result.insertId;
};

const createBusIfMissing = async ({ operator_id, license_plate, total_seats }) => {
  const existing = await findOne(
    'SELECT id FROM buses WHERE license_plate = ? AND deleted_at IS NULL',
    [license_plate]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO buses (operator_id, license_plate, total_seats, created_at, updated_at, deleted_at)
     VALUES (?, ?, ?, ?, ?, NULL)`,
    [operator_id, license_plate, total_seats, now, now]
  );
  return result.insertId;
};

const createBusSeatsIfMissing = async (busId, totalSeats) => {
  const [countRows] = await db.query('SELECT COUNT(*) AS total FROM bus_seats WHERE bus_id = ?', [busId]);
  if (countRows[0].total >= totalSeats) {
    return;
  }

  for (let index = 1; index <= totalSeats; index += 1) {
    const seatNumber = makeSeatNumber(index);
    const existing = await findOne(
      'SELECT id FROM bus_seats WHERE bus_id = ? AND seat_number = ?',
      [busId, seatNumber]
    );

    if (!existing) {
      await db.query(
        'INSERT INTO bus_seats (bus_id, seat_number, seat_type) VALUES (?, ?, ?)',
        [busId, seatNumber, makeSeatType(index, totalSeats)]
      );
    }
  }
};

const createTripIfMissing = async ({
  operator_id,
  route_id,
  bus_id,
  departure_time,
  arrival_time,
  ticket_price,
  created_by,
}) => {
  const existing = await findOne(
    `SELECT id
     FROM bus_trips
     WHERE operator_id = ?
       AND route_id = ?
       AND bus_id = ?
       AND departure_time = ?
       AND deleted_at IS NULL`,
    [operator_id, route_id, bus_id, departure_time]
  );

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const [result] = await db.query(
    `INSERT INTO bus_trips
      (operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, status, created_by, created_at, updated_at, deleted_at)
     VALUES (?, ?, ?, ?, ?, ?, 'scheduled', ?, ?, ?, NULL)`,
    [operator_id, route_id, bus_id, departure_time, arrival_time, ticket_price, created_by || null, now, now]
  );
  return result.insertId;
};

const createTripSeatsIfMissing = async (tripId, busId) => {
  const [countRows] = await db.query('SELECT COUNT(*) AS total FROM trip_seats WHERE trip_id = ?', [tripId]);
  if (countRows[0].total > 0) {
    return;
  }

  const [busSeats] = await db.query('SELECT id FROM bus_seats WHERE bus_id = ? ORDER BY id ASC', [busId]);
  for (const seat of busSeats) {
    await db.query(
      'INSERT INTO trip_seats (trip_id, bus_seat_id, status, locked_by_user_id, locked_until) VALUES (?, ?, ?, NULL, NULL)',
      [tripId, seat.id, 'available']
    );
  }
};

const createTripEventIfMissing = async (tripId, createdBy) => {
  const existing = await findOne(
    'SELECT id FROM trip_events WHERE trip_id = ? AND event_type = ?',
    [tripId, 'created']
  );

  if (existing) {
    return;
  }

  await db.query(
    'INSERT INTO trip_events (trip_id, event_type, note, created_by, created_at) VALUES (?, ?, ?, ?, ?)',
    [tripId, 'created', 'Seeded trip created', createdBy || null, new Date()]
  );
};

const seed = async () => {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  const adminUserId = await createUserIfMissing({
    full_name: 'System Admin',
    email: 'admin@example.com',
    phone_number: '0901000000',
    role: 'admin',
    password_hash: passwordHash,
  });

  const stationMap = new Map();
  for (const station of stations) {
    const stationId = await createStationIfMissing(station);
    stationMap.set(station.name, stationId);
  }

  let tripCount = 0;
  for (const operator of operators) {
    const operatorId = await createOperatorIfMissing(operator);
    const staffUserId = await createUserIfMissing({
      ...operator.staff,
      role: 'operator_staff',
      password_hash: passwordHash,
    });

    await createOperatorStaffIfMissing({
      user_id: staffUserId,
      operator_id: operatorId,
      role: operator.staff.role,
    });

    const busIds = [];
    for (const bus of operator.buses) {
      const busId = await createBusIfMissing({ ...bus, operator_id: operatorId });
      await createBusSeatsIfMissing(busId, bus.total_seats);
      busIds.push(busId);
    }

    for (const route of operator.routes) {
      const routeId = await createRouteIfMissing({
        operator_id: operatorId,
        departure_station_id: stationMap.get(route.departure_station),
        arrival_station_id: stationMap.get(route.arrival_station),
        estimated_duration_minutes: route.estimated_duration_minutes,
      });

      for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
        for (let departureIndex = 0; departureIndex < route.departures.length; departureIndex += 1) {
          const departure_time = toDateTime(dayOffset, route.departures[departureIndex]);
          const arrival_time = addMinutes(departure_time, route.estimated_duration_minutes);
          const busId = busIds[(dayOffset + departureIndex) % busIds.length];
          const tripId = await createTripIfMissing({
            operator_id: operatorId,
            route_id: routeId,
            bus_id: busId,
            departure_time,
            arrival_time,
            ticket_price: route.price,
            created_by: adminUserId,
          });

          await createTripSeatsIfMissing(tripId, busId);
          await createTripEventIfMissing(tripId, adminUserId);
          tripCount += 1;
        }
      }
    }
  }

  console.log(`Seed completed. Upcoming trips prepared: ${tripCount}.`);
  console.log(`Admin login: admin@example.com / ${DEFAULT_PASSWORD}`);
  console.log(`Operator login: futa.staff@example.com / ${DEFAULT_PASSWORD}`);
  console.log(`Operator login: hoanglong.staff@example.com / ${DEFAULT_PASSWORD}`);
  console.log(`Operator login: mailinh.staff@example.com / ${DEFAULT_PASSWORD}`);
};

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.end();
  });
