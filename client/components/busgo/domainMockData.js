import { getEnumLabel } from './statusConfig';

export const users = [
  {
    id: 1,
    full_name: 'Nguyễn Văn An',
    email: 'an.nguyen@example.com',
    password_hash: 'mock_hash',
    phone_number: '0901234567',
    user_role: 'customer',
    user_status: 'active',
    created_at: '2026-05-01T08:00:00',
    updated_at: '2026-05-10T08:00:00',
    deleted_at: null,
  },
  {
    id: 2,
    full_name: 'Trần Minh Quân',
    email: 'quan.tran@phuongtrang.vn',
    password_hash: 'mock_hash',
    phone_number: '0912222333',
    user_role: 'operator_staff',
    user_status: 'active',
    created_at: '2026-05-01T09:00:00',
    updated_at: '2026-05-10T09:00:00',
    deleted_at: null,
  },
  {
    id: 3,
    full_name: 'Lê Admin',
    email: 'admin@busgo.vn',
    password_hash: 'mock_hash',
    phone_number: '0988888888',
    user_role: 'admin',
    user_status: 'active',
    created_at: '2026-05-01T10:00:00',
    updated_at: '2026-05-10T10:00:00',
    deleted_at: null,
  },
  {
    id: 4,
    full_name: 'Phạm Gia Hân',
    email: 'han.pham@example.com',
    password_hash: 'mock_hash',
    phone_number: '0977666555',
    user_role: 'customer',
    user_status: 'inactive',
    created_at: '2026-05-03T10:00:00',
    updated_at: '2026-05-12T10:00:00',
    deleted_at: null,
  },
  {
    id: 5,
    full_name: 'Võ Thanh Bình',
    email: 'binh.vo@example.com',
    password_hash: 'mock_hash',
    phone_number: '0933444555',
    user_role: 'operator_staff',
    user_status: 'banned',
    created_at: '2026-05-04T10:00:00',
    updated_at: '2026-05-12T10:00:00',
    deleted_at: null,
  },
];

export const operators = [
  {
    id: 1,
    name: 'Phương Trang Express',
    phone_number: '19006067',
    address: '272 Đề Thám, Quận 1, TP.HCM',
    operator_status: 'active',
    created_at: '2026-01-10T08:00:00',
    updated_at: '2026-05-12T08:00:00',
    deleted_at: null,
  },
  {
    id: 2,
    name: 'Lâm Đồng Luxury',
    phone_number: '19008888',
    address: '12 Trần Phú, Đà Lạt',
    operator_status: 'active',
    created_at: '2026-02-12T08:00:00',
    updated_at: '2026-05-12T08:00:00',
    deleted_at: null,
  },
  {
    id: 3,
    name: 'Sài Gòn Tourist Bus',
    phone_number: '19001122',
    address: '45 Nguyễn Huệ, TP.HCM',
    operator_status: 'suspended',
    created_at: '2026-03-14T08:00:00',
    updated_at: '2026-05-12T08:00:00',
    deleted_at: null,
  },
];

export const operatorStaffs = [
  {
    id: 1,
    user_id: 2,
    operator_id: 1,
    staff_role: 'operator_admin',
    created_at: '2026-05-01T09:00:00',
    updated_at: '2026-05-01T09:00:00',
  },
  {
    id: 2,
    user_id: 5,
    operator_id: 2,
    staff_role: 'trip_manager',
    created_at: '2026-05-04T10:00:00',
    updated_at: '2026-05-04T10:00:00',
  },
];

export const stations = [
  {
    id: 1,
    name: 'Bến xe Miền Đông mới',
    address: '501 Hoàng Hữu Nam, TP. Thủ Đức',
    province: 'TP.HCM',
    station_type: 'bus_station',
    created_at: '2026-01-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 2,
    name: 'Đà Lạt Center',
    address: '01 Lê Đại Hành, Đà Lạt',
    province: 'Lâm Đồng',
    station_type: 'dropoff_point',
    created_at: '2026-01-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 3,
    name: 'Văn phòng Phương Trang Quận 1',
    address: '272 Đề Thám, Quận 1',
    province: 'TP.HCM',
    station_type: 'office',
    created_at: '2026-01-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 4,
    name: 'Bến xe Nha Trang',
    address: '23 Tháng 10, Nha Trang',
    province: 'Khánh Hòa',
    station_type: 'bus_station',
    created_at: '2026-01-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 5,
    name: 'Điểm đón Cần Thơ',
    address: '91B Nguyễn Văn Linh, Cần Thơ',
    province: 'Cần Thơ',
    station_type: 'pickup_point',
    created_at: '2026-01-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
];

export const routes = [
  {
    id: 1,
    operator_id: 1,
    departure_station_id: 1,
    arrival_station_id: 2,
    estimated_duration_minutes: 390,
    created_at: '2026-02-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 2,
    operator_id: 2,
    departure_station_id: 1,
    arrival_station_id: 2,
    estimated_duration_minutes: 430,
    created_at: '2026-02-02T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 3,
    operator_id: 1,
    departure_station_id: 1,
    arrival_station_id: 4,
    estimated_duration_minutes: 510,
    created_at: '2026-02-03T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
  {
    id: 4,
    operator_id: 3,
    departure_station_id: 1,
    arrival_station_id: 5,
    estimated_duration_minutes: 210,
    created_at: '2026-02-04T08:00:00',
    updated_at: '2026-05-01T08:00:00',
  },
];

export const buses = [
  {
    id: 1,
    operator_id: 1,
    license_plate: '51B-123.45',
    total_seats: 22,
    bus_type: 'limousine',
    bus_status: 'active',
    created_at: '2026-02-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
    deleted_at: null,
  },
  {
    id: 2,
    operator_id: 2,
    license_plate: '49B-888.88',
    total_seats: 34,
    bus_type: 'sleeper',
    bus_status: 'active',
    created_at: '2026-02-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
    deleted_at: null,
  },
  {
    id: 3,
    operator_id: 3,
    license_plate: '51F-456.78',
    total_seats: 28,
    bus_type: 'seater',
    bus_status: 'maintenance',
    created_at: '2026-02-01T08:00:00',
    updated_at: '2026-05-01T08:00:00',
    deleted_at: null,
  },
];

const createSeats = (busId, total, prefix, sleeper = false) =>
  Array.from({ length: total }).map((_, index) => ({
    id: busId * 100 + index + 1,
    bus_id: busId,
    seat_number: `${prefix}${index + 1}`,
    seat_type: index % 7 === 0 ? 'vip' : sleeper ? 'sleeper' : 'normal',
  }));

export const busSeats = [
  ...createSeats(1, 22, 'A'),
  ...createSeats(2, 34, 'B', true),
  ...createSeats(3, 28, 'C'),
];

export const busTrips = [
  {
    id: 101,
    operator_id: 1,
    route_id: 1,
    bus_id: 1,
    departure_time: '2026-05-29T22:30:00',
    arrival_time: '2026-05-30T05:00:00',
    ticket_price: 280000,
    trip_status: 'scheduled',
    created_by: 2,
    created_at: '2026-05-10T08:00:00',
    updated_at: '2026-05-17T08:00:00',
    deleted_at: null,
  },
  {
    id: 102,
    operator_id: 2,
    route_id: 2,
    bus_id: 2,
    departure_time: '2026-05-29T23:15:00',
    arrival_time: '2026-05-30T06:25:00',
    ticket_price: 240000,
    trip_status: 'boarding',
    created_by: 2,
    created_at: '2026-05-10T08:00:00',
    updated_at: '2026-05-17T08:00:00',
    deleted_at: null,
  },
  {
    id: 103,
    operator_id: 1,
    route_id: 3,
    bus_id: 1,
    departure_time: '2026-05-30T21:00:00',
    arrival_time: '2026-05-31T05:30:00',
    ticket_price: 320000,
    trip_status: 'delayed',
    created_by: 2,
    created_at: '2026-05-10T08:00:00',
    updated_at: '2026-05-17T08:00:00',
    deleted_at: null,
  },
  {
    id: 104,
    operator_id: 3,
    route_id: 4,
    bus_id: 3,
    departure_time: '2026-05-28T14:30:00',
    arrival_time: '2026-05-28T18:00:00',
    ticket_price: 160000,
    trip_status: 'cancelled',
    created_by: 2,
    created_at: '2026-05-10T08:00:00',
    updated_at: '2026-05-17T08:00:00',
    deleted_at: null,
  },
];

const tripSeatStatus = (index) => {
  if ([0, 4, 11, 18].includes(index)) return 'booked';
  if ([2, 9].includes(index)) return 'locked';
  return 'available';
};

export const tripSeats = busTrips.flatMap((trip) =>
  busSeats
    .filter((seat) => seat.bus_id === trip.bus_id)
    .map((seat, index) => ({
      id: trip.id * 1000 + index + 1,
      trip_id: trip.id,
      bus_seat_id: seat.id,
      seat_status: tripSeatStatus(index),
      locked_by_user_id: tripSeatStatus(index) === 'locked' ? 1 : null,
      locked_until: tripSeatStatus(index) === 'locked' ? '2026-05-18T16:30:00' : null,
    }))
);

export const bookings = [
  {
    id: 501,
    user_id: 1,
    trip_id: 101,
    total_amount: 560000,
    booking_status: 'confirmed',
    booked_at: '2026-05-18T09:20:00',
    created_at: '2026-05-18T09:20:00',
    updated_at: '2026-05-18T09:23:00',
  },
  {
    id: 502,
    user_id: 1,
    trip_id: 102,
    total_amount: 240000,
    booking_status: 'pending_payment',
    booked_at: '2026-05-18T11:00:00',
    created_at: '2026-05-18T11:00:00',
    updated_at: '2026-05-18T11:00:00',
  },
  {
    id: 503,
    user_id: 1,
    trip_id: 103,
    total_amount: 320000,
    booking_status: 'refunded',
    booked_at: '2026-05-01T11:00:00',
    created_at: '2026-05-01T11:00:00',
    updated_at: '2026-05-02T11:00:00',
  },
];

export const passengers = [
  {
    id: 701,
    booking_id: 501,
    full_name: 'Nguyễn Văn An',
    phone_number: '0901234567',
    created_at: '2026-05-18T09:20:00',
    updated_at: '2026-05-18T09:20:00',
  },
  {
    id: 702,
    booking_id: 501,
    full_name: 'Nguyễn Minh Anh',
    phone_number: '0901234568',
    created_at: '2026-05-18T09:20:00',
    updated_at: '2026-05-18T09:20:00',
  },
  {
    id: 703,
    booking_id: 502,
    full_name: 'Nguyễn Văn An',
    phone_number: '0901234567',
    created_at: '2026-05-18T11:00:00',
    updated_at: '2026-05-18T11:00:00',
  },
];

export const bookingItems = [
  {
    id: 801,
    booking_id: 501,
    trip_seat_id: 1010002,
    passenger_id: 701,
    created_at: '2026-05-18T09:20:00',
  },
  {
    id: 802,
    booking_id: 501,
    trip_seat_id: 1010008,
    passenger_id: 702,
    created_at: '2026-05-18T09:20:00',
  },
  {
    id: 803,
    booking_id: 502,
    trip_seat_id: 1020005,
    passenger_id: 703,
    created_at: '2026-05-18T11:00:00',
  },
];

export const tickets = [
  {
    id: 901,
    booking_item_id: 801,
    ticket_code: 'BG-260529-A2',
    qr_code: 'mock:BG-260529-A2',
    ticket_status: 'active',
    issued_at: '2026-05-18T09:23:00',
  },
  {
    id: 902,
    booking_item_id: 802,
    ticket_code: 'BG-260529-A8',
    qr_code: 'mock:BG-260529-A8',
    ticket_status: 'active',
    issued_at: '2026-05-18T09:23:00',
  },
  {
    id: 903,
    booking_item_id: 803,
    ticket_code: 'BG-260529-B5',
    qr_code: 'mock:BG-260529-B5',
    ticket_status: 'expired',
    issued_at: '2026-05-18T11:00:00',
  },
];

export const payments = [
  {
    id: 1001,
    booking_id: 501,
    amount: 560000,
    method: 'momo',
    provider: 'MoMo',
    transaction_id: 'MOMO-260518-501',
    payment_status: 'success',
    paid_at: '2026-05-18T09:23:00',
    created_at: '2026-05-18T09:20:00',
    updated_at: '2026-05-18T09:23:00',
  },
  {
    id: 1002,
    booking_id: 502,
    amount: 240000,
    method: 'bank_transfer',
    provider: 'VCB',
    transaction_id: null,
    payment_status: 'pending',
    paid_at: null,
    created_at: '2026-05-18T11:00:00',
    updated_at: '2026-05-18T11:00:00',
  },
  {
    id: 1003,
    booking_id: 503,
    amount: 320000,
    method: 'zalopay',
    provider: 'ZaloPay',
    transaction_id: 'ZLP-260501-503',
    payment_status: 'refunded',
    paid_at: '2026-05-01T11:03:00',
    created_at: '2026-05-01T11:00:00',
    updated_at: '2026-05-02T11:00:00',
  },
];

export const refunds = [
  {
    id: 1101,
    payment_id: 1003,
    amount: 320000,
    reason: 'Khách đổi lịch trình',
    refund_status: 'approved',
    refunded_at: '2026-05-02T11:00:00',
    created_at: '2026-05-02T09:00:00',
    updated_at: '2026-05-02T11:00:00',
  },
  {
    id: 1102,
    payment_id: 1001,
    amount: 280000,
    reason: 'Yêu cầu hủy 1 ghế',
    refund_status: 'pending',
    refunded_at: null,
    created_at: '2026-05-18T15:00:00',
    updated_at: '2026-05-18T15:00:00',
  },
];

export const reviews = [
  {
    id: 1201,
    user_id: 1,
    operator_id: 1,
    rating: 5,
    comment: 'Xe sạch, nhân viên hỗ trợ tốt, đúng giờ.',
    created_at: '2026-05-10T08:00:00',
  },
  {
    id: 1202,
    user_id: 4,
    operator_id: 1,
    rating: 4,
    comment: 'Dịch vụ ổn, cần cải thiện điểm đón.',
    created_at: '2026-05-11T08:00:00',
  },
  {
    id: 1203,
    user_id: 1,
    operator_id: 2,
    rating: 4,
    comment: 'Giường nằm thoải mái.',
    created_at: '2026-05-12T08:00:00',
  },
];

export const tripEvents = [
  {
    id: 1301,
    trip_id: 101,
    event_type: 'created',
    note: 'Tạo chuyến và mở bán vé',
    created_by: 2,
    created_at: '2026-05-10T08:00:00',
  },
  {
    id: 1302,
    trip_id: 101,
    event_type: 'boarding',
    note: 'Dự kiến mở cửa lên xe trước 30 phút',
    created_by: 2,
    created_at: '2026-05-29T22:00:00',
  },
  {
    id: 1303,
    trip_id: 103,
    event_type: 'delayed',
    note: 'Trễ 20 phút do điều phối xe',
    created_by: 2,
    created_at: '2026-05-30T20:30:00',
  },
];

export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + 'đ';

export const formatDateTime = (value) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const formatTime = (value) =>
  new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const findById = (items, id) => items.find((item) => String(item.id) === String(id));

export const getStationName = (id) => (findById(stations, id) || {}).name || 'Chưa rõ';

export const getOperatorName = (id) => (findById(operators, id) || {}).name || 'Chưa rõ';

export const getRouteLabel = (routeId) => {
  const route = findById(routes, routeId);
  if (!route) return 'Chưa rõ tuyến';
  return `${getStationName(route.departure_station_id)} → ${getStationName(route.arrival_station_id)}`;
};

export const getTripSeats = (tripId) =>
  tripSeats
    .filter((tripSeat) => String(tripSeat.trip_id) === String(tripId))
    .map((tripSeat) => {
      const seat = findById(busSeats, tripSeat.bus_seat_id);
      return {
        ...tripSeat,
        seat_number: seat.seat_number,
        seat_type: seat.seat_type,
      };
    });

export const getTripView = (trip) => {
  const route = findById(routes, trip.route_id);
  const bus = findById(buses, trip.bus_id);
  const tripSeatList = getTripSeats(trip.id);
  const availableSeats = tripSeatList.filter((seat) => seat.seat_status === 'available').length;

  return {
    ...trip,
    operator: findById(operators, trip.operator_id),
    route,
    bus,
    departure_station: findById(stations, route.departure_station_id),
    arrival_station: findById(stations, route.arrival_station_id),
    availableSeats,
    bus_type_label: getEnumLabel('bus_type', bus.bus_type),
  };
};

export const getBookingTickets = (bookingId) => {
  const items = bookingItems.filter((item) => item.booking_id === bookingId);
  return items
    .map((item) => {
      const ticket = tickets.find((entry) => entry.booking_item_id === item.id);
      if (!ticket) return null;
      const passenger = findById(passengers, item.passenger_id);
      const tripSeat = tripSeats.find((seat) => seat.id === item.trip_seat_id);
      const busSeat = findById(busSeats, tripSeat.bus_seat_id);
      return {
        ...ticket,
        booking_item: item,
        passenger,
        trip_seat: tripSeat,
        bus_seat: busSeat,
      };
    })
    .filter(Boolean);
};

export const getTicketDetail = (ticketCode) => {
  const ticket = tickets.find((entry) => entry.ticket_code === ticketCode) || tickets[0];
  const item = findById(bookingItems, ticket.booking_item_id);
  const booking = findById(bookings, item.booking_id);
  const trip = getTripView(findById(busTrips, booking.trip_id));
  const passenger = findById(passengers, item.passenger_id);
  const payment = payments.find((entry) => entry.booking_id === booking.id);
  const tripSeat = findById(tripSeats, item.trip_seat_id);
  const busSeat = findById(busSeats, tripSeat.bus_seat_id);

  return { ticket, item, booking, trip, passenger, payment, tripSeat, busSeat };
};
