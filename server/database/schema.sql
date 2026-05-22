CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NULL,
  role ENUM('customer', 'operator_staff', 'admin') NOT NULL DEFAULT 'customer',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL
);

CREATE TABLE IF NOT EXISTS operators (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NULL,
  address VARCHAR(255) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL
);

CREATE TABLE IF NOT EXISTS operator_staffs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  operator_id INT UNSIGNED NOT NULL,
  role ENUM('operator_admin', 'trip_manager', 'ticket_staff') NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  UNIQUE KEY unique_operator_staff (user_id, operator_id),
  CONSTRAINT fk_operator_staff_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_operator_staff_operator FOREIGN KEY (operator_id) REFERENCES operators(id)
);

CREATE TABLE IF NOT EXISTS stations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NULL,
  province VARCHAR(100) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  operator_id INT UNSIGNED NOT NULL,
  departure_station_id INT UNSIGNED NOT NULL,
  arrival_station_id INT UNSIGNED NOT NULL,
  estimated_duration_minutes INT UNSIGNED NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  CONSTRAINT fk_route_operator FOREIGN KEY (operator_id) REFERENCES operators(id),
  CONSTRAINT fk_route_departure_station FOREIGN KEY (departure_station_id) REFERENCES stations(id),
  CONSTRAINT fk_route_arrival_station FOREIGN KEY (arrival_station_id) REFERENCES stations(id)
);

CREATE TABLE IF NOT EXISTS buses (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  operator_id INT UNSIGNED NOT NULL,
  license_plate VARCHAR(20) NOT NULL,
  total_seats INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY unique_bus_plate (license_plate),
  CONSTRAINT fk_bus_operator FOREIGN KEY (operator_id) REFERENCES operators(id)
);

CREATE TABLE IF NOT EXISTS bus_seats (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bus_id INT UNSIGNED NOT NULL,
  seat_number VARCHAR(10) NOT NULL,
  seat_type ENUM('normal', 'vip', 'sleeper') NOT NULL DEFAULT 'normal',
  UNIQUE KEY unique_bus_seat (bus_id, seat_number),
  CONSTRAINT fk_bus_seat_bus FOREIGN KEY (bus_id) REFERENCES buses(id)
);

CREATE TABLE IF NOT EXISTS bus_trips (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  operator_id INT UNSIGNED NOT NULL,
  route_id INT UNSIGNED NOT NULL,
  bus_id INT UNSIGNED NOT NULL,
  departure_time DATETIME NOT NULL,
  arrival_time DATETIME NOT NULL,
  ticket_price DECIMAL(12,2) NOT NULL,
  status ENUM('scheduled', 'boarding', 'departed', 'delayed', 'arrived', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  created_by INT UNSIGNED NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_trip_operator FOREIGN KEY (operator_id) REFERENCES operators(id),
  CONSTRAINT fk_trip_route FOREIGN KEY (route_id) REFERENCES routes(id),
  CONSTRAINT fk_trip_bus FOREIGN KEY (bus_id) REFERENCES buses(id),
  CONSTRAINT fk_trip_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS trip_seats (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  trip_id INT UNSIGNED NOT NULL,
  bus_seat_id INT UNSIGNED NOT NULL,
  status ENUM('available', 'locked', 'booked') NOT NULL DEFAULT 'available',
  locked_by_user_id INT UNSIGNED NULL,
  locked_until DATETIME NULL,
  UNIQUE KEY unique_trip_seat (trip_id, bus_seat_id),
  CONSTRAINT fk_trip_seat_trip FOREIGN KEY (trip_id) REFERENCES bus_trips(id),
  CONSTRAINT fk_trip_seat_bus_seat FOREIGN KEY (bus_seat_id) REFERENCES bus_seats(id),
  CONSTRAINT fk_trip_seat_locked_by FOREIGN KEY (locked_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS trip_events (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  trip_id INT UNSIGNED NOT NULL,
  event_type ENUM('created', 'delayed', 'boarding', 'departed', 'arrived', 'completed', 'cancelled') NOT NULL,
  note VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at DATETIME NOT NULL,
  CONSTRAINT fk_trip_event_trip FOREIGN KEY (trip_id) REFERENCES bus_trips(id),
  CONSTRAINT fk_trip_event_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  trip_id INT UNSIGNED NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status ENUM('pending_payment', 'paid', 'confirmed', 'cancelled', 'completed', 'refunded', 'expired') NOT NULL DEFAULT 'pending_payment',
  booked_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_booking_trip FOREIGN KEY (trip_id) REFERENCES bus_trips(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id INT UNSIGNED NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  method ENUM('momo', 'zalopay', 'cash', 'bank_transfer') NOT NULL,
  provider VARCHAR(50) NULL,
  transaction_id VARCHAR(100) NULL,
  status ENUM('pending', 'success', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  paid_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE IF NOT EXISTS refunds (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  payment_id INT UNSIGNED NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  reason VARCHAR(255) NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  refunded_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  CONSTRAINT fk_refund_payment FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE TABLE IF NOT EXISTS booking_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id INT UNSIGNED NOT NULL,
  trip_seat_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL,
  UNIQUE KEY unique_booking_item_seat (booking_id, trip_seat_id),
  CONSTRAINT fk_booking_item_booking FOREIGN KEY (booking_id) REFERENCES bookings(id),
  CONSTRAINT fk_booking_item_trip_seat FOREIGN KEY (trip_seat_id) REFERENCES trip_seats(id)
);

CREATE TABLE IF NOT EXISTS passengers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id INT UNSIGNED NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  CONSTRAINT fk_passenger_booking FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE IF NOT EXISTS tickets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_item_id INT UNSIGNED NOT NULL UNIQUE,
  passenger_id INT UNSIGNED NOT NULL,
  ticket_code VARCHAR(50) NOT NULL UNIQUE,
  qr_code TEXT NULL,
  status ENUM('active', 'used', 'cancelled', 'expired') NOT NULL DEFAULT 'active',
  issued_at DATETIME NOT NULL,
  CONSTRAINT fk_ticket_booking_item FOREIGN KEY (booking_item_id) REFERENCES booking_items(id),
  CONSTRAINT fk_ticket_passenger FOREIGN KEY (passenger_id) REFERENCES passengers(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  operator_id INT UNSIGNED NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  comment VARCHAR(1000) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  UNIQUE KEY unique_user_operator_review (user_id, operator_id),
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_review_operator FOREIGN KEY (operator_id) REFERENCES operators(id),
  CONSTRAINT chk_review_rating CHECK (rating BETWEEN 1 AND 5)
);
