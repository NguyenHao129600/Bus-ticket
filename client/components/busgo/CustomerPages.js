import React, { useMemo, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import {
  BookingSummary,
  PageHeader,
  PaymentMethodCard,
  SearchBox,
  SeatMap,
  StatusBadge,
  TicketCard,
  TicketPreview,
  TripCard,
} from './AppComponents';
import { AppLayout, AuthLayout, CustomerLayout } from './AppLayouts';
import {
  busTrips,
  findById,
  formatCurrency,
  formatDateTime,
  getRouteLabel,
  getTicketDetail,
  getTripSeats,
  getTripView,
  operators,
  passengers,
  tickets,
} from './domainMockData';
import { enumLabels, getEnumLabel } from './statusConfig';

const defaultCheckoutTrip = busTrips[0];
const defaultCheckoutSeats = getTripSeats(defaultCheckoutTrip.id).filter((seat) =>
  ['A2', 'A8'].includes(seat.seat_number)
);

export const LoginPage = () => {
  const history = useHistory();
  const [role, setRole] = useState('customer');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === 'operator_staff') history.push('/operator/dashboard');
    else if (role === 'admin') history.push('/admin/dashboard');
    else history.push('/trips');
  };

  return (
    <AuthLayout
      description="Đăng nhập mock theo vai trò để đi tới đúng khu vực khách hàng, nhà xe hoặc quản trị."
      title="Đăng nhập BusGo"
    >
      <form className="busgo-auth-card busgo-stack" onSubmit={handleSubmit}>
        <div>
          <h2>Chào mừng trở lại</h2>
          <p>Nhập thông tin tài khoản và chọn loại tài khoản để tiếp tục.</p>
        </div>
        <div className="busgo-form-control">
          <label>Email hoặc số điện thoại</label>
          <input defaultValue="an.nguyen@example.com" />
        </div>
        <div className="busgo-form-control">
          <label>Mật khẩu</label>
          <input defaultValue="12345678" type="password" />
        </div>
        <div className="busgo-form-control">
          <label>Loại tài khoản</label>
          <select onChange={(event) => setRole(event.target.value)} value={role}>
            <option value="customer">Khách hàng</option>
            <option value="operator_staff">Nhà xe/Nhân viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <button className="busgo-btn busgo-btn-accent busgo-full" type="submit">
          Đăng nhập
        </button>
        <Link className="busgo-link-action" to="/register">
          Chưa có tài khoản? Đăng ký khách hàng
        </Link>
      </form>
    </AuthLayout>
  );
};

export const RegisterPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});

  const setValue = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const validate = () => {
    const nextErrors = {};
    if (!form.full_name.trim()) nextErrors.full_name = 'Vui lòng nhập họ tên.';
    if (!form.email.includes('@')) nextErrors.email = 'Email chưa hợp lệ.';
    if (form.phone_number.length < 9) nextErrors.phone_number = 'Số điện thoại chưa hợp lệ.';
    if (form.password.length < 6) nextErrors.password = 'Mật khẩu cần ít nhất 6 ký tự.';
    if (form.password !== form.confirm_password) {
      nextErrors.confirm_password = 'Mật khẩu nhập lại không khớp.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) history.push('/trips');
  };

  return (
    <AuthLayout
      description="Tạo tài khoản khách hàng để đặt vé, giữ ghế và quản lý vé điện tử."
      title="Đăng ký khách hàng"
    >
      <form className="busgo-auth-card busgo-stack" onSubmit={handleSubmit}>
        <div>
          <h2>Tạo tài khoản</h2>
          <p>Tài khoản mới mặc định là khách hàng và đang hoạt động.</p>
        </div>
        <div className="busgo-form-control">
          <label>Họ tên</label>
          <input onChange={(event) => setValue('full_name', event.target.value)} value={form.full_name} />
          {errors.full_name ? <span className="busgo-error">{errors.full_name}</span> : null}
        </div>
        <div className="busgo-form-row">
          <div className="busgo-form-control">
            <label>Email</label>
            <input onChange={(event) => setValue('email', event.target.value)} value={form.email} />
            {errors.email ? <span className="busgo-error">{errors.email}</span> : null}
          </div>
          <div className="busgo-form-control">
            <label>Số điện thoại</label>
            <input
              onChange={(event) => setValue('phone_number', event.target.value)}
              value={form.phone_number}
            />
            {errors.phone_number ? <span className="busgo-error">{errors.phone_number}</span> : null}
          </div>
        </div>
        <div className="busgo-form-row">
          <div className="busgo-form-control">
            <label>Mật khẩu</label>
            <input
              onChange={(event) => setValue('password', event.target.value)}
              type="password"
              value={form.password}
            />
            {errors.password ? <span className="busgo-error">{errors.password}</span> : null}
          </div>
          <div className="busgo-form-control">
            <label>Nhập lại mật khẩu</label>
            <input
              onChange={(event) => setValue('confirm_password', event.target.value)}
              type="password"
              value={form.confirm_password}
            />
            {errors.confirm_password ? (
              <span className="busgo-error">{errors.confirm_password}</span>
            ) : null}
          </div>
        </div>
        <button className="busgo-btn busgo-btn-accent busgo-full" type="submit">
          Đăng ký
        </button>
      </form>
    </AuthLayout>
  );
};

export const TripsPage = () => {
  const [operatorId, setOperatorId] = useState('all');
  const [busType, setBusType] = useState('all');
  const [tripStatus, setTripStatus] = useState('all');

  const filteredTrips = busTrips.filter((trip) => {
    const view = getTripView(trip);
    return (
      (operatorId === 'all' || String(trip.operator_id) === operatorId) &&
      (busType === 'all' || view.bus.bus_type === busType) &&
      (tripStatus === 'all' || trip.trip_status === tripStatus)
    );
  });

  return (
    <CustomerLayout>
      <PageHeader
        description="Kết quả dùng dữ liệu mẫu theo cấu trúc backend, sẵn sàng nối API."
        title="Kết quả tìm chuyến"
      />
      <div className="busgo-stack">
        <SearchBox />
        <div className="busgo-grid-2">
          <aside className="busgo-card">
            <div className="busgo-card-head">
              <h3>Bộ lọc</h3>
              <button
                className="busgo-btn busgo-btn-soft"
                onClick={() => {
                  setOperatorId('all');
                  setBusType('all');
                  setTripStatus('all');
                }}
                type="button"
              >
                Xóa lọc
              </button>
            </div>
            <div className="busgo-card-pad busgo-stack">
              <div className="busgo-form-control">
                <label>Nhà xe</label>
                <select onChange={(event) => setOperatorId(event.target.value)} value={operatorId}>
                  <option value="all">Tất cả nhà xe</option>
                  {operators.map((operator) => (
                    <option key={operator.id} value={operator.id}>
                      {operator.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="busgo-form-control">
                <label>Loại xe</label>
                <select onChange={(event) => setBusType(event.target.value)} value={busType}>
                  <option value="all">Tất cả loại xe</option>
                  {Object.keys(enumLabels.bus_type).map((value) => (
                    <option key={value} value={value}>
                      {getEnumLabel('bus_type', value)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="busgo-form-control">
                <label>Giờ khởi hành</label>
                <select defaultValue="evening">
                  <option value="evening">18:00 - 24:00</option>
                  <option value="morning">06:00 - 12:00</option>
                  <option value="afternoon">12:00 - 18:00</option>
                </select>
              </div>
              <div className="busgo-form-control">
                <label>Khoảng giá</label>
                <input defaultValue="160.000đ - 450.000đ" />
              </div>
              <div className="busgo-form-control">
                <label>Trạng thái chuyến</label>
                <select onChange={(event) => setTripStatus(event.target.value)} value={tripStatus}>
                  <option value="all">Tất cả trạng thái</option>
                  {Object.keys(enumLabels.trip_status).map((value) => (
                    <option key={value} value={value}>
                      {getEnumLabel('trip_status', value)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>
          <div className="busgo-stack">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export const TripDetailPage = () => {
  const { id } = useParams();
  const trip = findById(busTrips, id) || defaultCheckoutTrip;
  const view = getTripView(trip);
  const [selectedSeatIds, setSelectedSeatIds] = useState([1010002, 1010008]);
  const selectedSeats = getTripSeats(trip.id).filter((seat) => selectedSeatIds.includes(seat.id));

  const handleToggleSeat = (seatId) => {
    setSelectedSeatIds((current) =>
      current.includes(seatId) ? current.filter((idValue) => idValue !== seatId) : [...current, seatId]
    );
  };

  return (
    <CustomerLayout>
      <PageHeader
        actions={<StatusBadge domain="trip_status" value={view.trip_status} />}
        description={`${view.operator.name} · ${getEnumLabel('bus_type', view.bus.bus_type)} · ${view.bus.license_plate}`}
        title={getRouteLabel(view.route_id)}
      />
      <div className="busgo-grid-2">
        <div className="busgo-stack">
          <section className="busgo-card">
            <div className="busgo-card-head">
              <h2>Thông tin chuyến</h2>
              <span className="busgo-chip active">Giữ ghế còn 09:42</span>
            </div>
            <div className="busgo-card-pad busgo-stack">
              <div className="busgo-grid-3">
                <div>
                  <span className="busgo-muted">Nhà xe</span>
                  <h3>{view.operator.name}</h3>
                </div>
                <div>
                  <span className="busgo-muted">Giờ đi</span>
                  <h3>{formatDateTime(view.departure_time)}</h3>
                </div>
                <div>
                  <span className="busgo-muted">Giá vé</span>
                  <h3>{formatCurrency(view.ticket_price)}</h3>
                </div>
              </div>
              <div className="busgo-timeline-list">
                <div className="busgo-timeline-item">
                  <span className="busgo-timeline-dot" />
                  <div>
                    <strong>{view.departure_station.name}</strong>
                    <p className="busgo-muted">{view.departure_station.address}</p>
                  </div>
                </div>
                <div className="busgo-timeline-item">
                  <span className="busgo-timeline-dot" />
                  <div>
                    <strong>{view.arrival_station.name}</strong>
                    <p className="busgo-muted">{view.arrival_station.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="busgo-card">
            <div className="busgo-card-head">
              <h2>Sơ đồ ghế</h2>
              <div className="busgo-inline-actions">
                <StatusBadge domain="seat_status" value="available" />
                <StatusBadge domain="seat_status" value="locked" />
                <StatusBadge domain="seat_status" value="booked" />
              </div>
            </div>
            <div className="busgo-card-pad">
              <SeatMap
                onToggleSeat={handleToggleSeat}
                selectedSeatIds={selectedSeatIds}
                tripId={trip.id}
              />
            </div>
          </section>
        </div>
        <div className="busgo-stack">
          <BookingSummary selectedSeats={selectedSeats} trip={trip} />
          <Link className="busgo-btn busgo-btn-accent busgo-full" to="/checkout/passengers">
            Tiếp tục nhập hành khách
          </Link>
        </div>
      </div>
    </CustomerLayout>
  );
};

export const CheckoutPassengersPage = () => (
  <CustomerLayout>
    <PageHeader
      description="Mỗi ghế tương ứng một hành khách, sau đó hệ thống nối hành khách với ghế đã chọn."
      title="Thông tin hành khách"
    />
    <div className="busgo-grid-2">
      <section className="busgo-card">
        <div className="busgo-card-head">
          <h2>Hành khách theo ghế</h2>
        </div>
        <div className="busgo-card-pad busgo-stack">
          {defaultCheckoutSeats.map((seat, index) => (
            <div className="busgo-card busgo-card-pad busgo-stack" key={seat.id}>
              <h3>Ghế {seat.seat_number}</h3>
              <div className="busgo-form-row">
                <div className="busgo-form-control">
                  <label>Họ tên hành khách</label>
                  <input defaultValue={passengers[index] ? passengers[index].full_name : ''} />
                </div>
                <div className="busgo-form-control">
                  <label>Số điện thoại</label>
                  <input defaultValue={passengers[index] ? passengers[index].phone_number : ''} />
                </div>
              </div>
            </div>
          ))}
          <Link className="busgo-btn busgo-btn-accent" to="/checkout/payment">
            Tiếp tục thanh toán
          </Link>
        </div>
      </section>
      <BookingSummary selectedSeats={defaultCheckoutSeats} trip={defaultCheckoutTrip} />
    </div>
  </CustomerLayout>
);

export const CheckoutPaymentPage = () => {
  const [method, setMethod] = useState('momo');
  const [success, setSuccess] = useState(false);
  const total = defaultCheckoutSeats.length * defaultCheckoutTrip.ticket_price;

  return (
    <CustomerLayout>
      <PageHeader
        description="Gửi thử thanh toán sẽ tạo trạng thái thành công và phát hành vé điện tử."
        title="Thanh toán"
      />
      <div className="busgo-grid-2">
        <section className="busgo-card">
          <div className="busgo-card-head">
            <h2>Phương thức thanh toán</h2>
          </div>
          <div className="busgo-card-pad busgo-stack">
            {Object.keys(enumLabels.payment_method).map((value) => (
              <PaymentMethodCard
                active={method === value}
                key={value}
                method={value}
                onSelect={setMethod}
              />
            ))}
            <button
              className="busgo-btn busgo-btn-accent busgo-full"
              onClick={() => setSuccess(true)}
              type="button"
            >
              Thanh toán {formatCurrency(total)}
            </button>
            {success ? (
              <div className="busgo-card busgo-card-pad">
                <StatusBadge domain="payment_status" value="success" /> Thanh toán mock thành công.
              </div>
            ) : null}
          </div>
        </section>
        <div className="busgo-stack">
          <BookingSummary selectedSeats={defaultCheckoutSeats} trip={defaultCheckoutTrip} />
          <TicketPreview code="BG-260529-A2" />
        </div>
      </div>
    </CustomerLayout>
  );
};

const ticketTabs = [
  { key: 'upcoming', label: 'Sắp đi', statuses: ['active'] },
  { key: 'completed', label: 'Đã hoàn thành', statuses: ['used'] },
  { key: 'cancelled', label: 'Đã hủy', statuses: ['cancelled'] },
  { key: 'refunded', label: 'Đã hoàn tiền', bookingStatuses: ['refunded'] },
  { key: 'expired', label: 'Hết hạn', statuses: ['expired'] },
];

export const MyTicketsPage = () => {
  const [tab, setTab] = useState('upcoming');
  const selectedTab = ticketTabs.find((item) => item.key === tab);

  const ticketRows = useMemo(
    () =>
      tickets
        .map((ticket) => ({ ticket, detail: getTicketDetail(ticket.ticket_code) }))
        .filter(({ ticket, detail }) => {
          if (selectedTab.statuses) return selectedTab.statuses.includes(ticket.ticket_status);
          return selectedTab.bookingStatuses.includes(detail.booking.booking_status);
        }),
    [selectedTab]
  );

  return (
    <CustomerLayout>
      <PageHeader description="Danh sách vé theo trạng thái vé và trạng thái đặt vé." title="Vé của tôi" />
      <div className="busgo-tabs-line">
        {ticketTabs.map((item) => (
          <button
            className={`busgo-tab-btn ${tab === item.key ? 'active' : ''}`}
            key={item.key}
            onClick={() => setTab(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <section className="busgo-card">
        {ticketRows.map(({ ticket, detail }) => (
          <TicketCard detail={detail} key={ticket.id} ticket={ticket} />
        ))}
      </section>
    </CustomerLayout>
  );
};

export const TicketDetailPage = () => {
  const { code } = useParams();
  const detail = getTicketDetail(code);

  return (
    <CustomerLayout>
      <PageHeader
        actions={<StatusBadge domain="ticket_status" value={detail.ticket.ticket_status} />}
        description="Chi tiết một vé được phát hành cho một ghế đã đặt."
        title={`Vé ${detail.ticket.ticket_code}`}
      />
      <div className="busgo-grid-2">
        <section className="busgo-card">
          <div className="busgo-card-head">
            <h2>Thông tin vé</h2>
            <StatusBadge domain="payment_status" value={detail.payment.payment_status} />
          </div>
          <div className="busgo-card-pad">
            <div className="busgo-grid-3">
              <div className="busgo-qr-large" />
              <div className="busgo-stack">
                <div>
                  <span className="busgo-muted">Mã vé</span>
                  <h3>{detail.ticket.ticket_code}</h3>
                </div>
                <div>
                  <span className="busgo-muted">Hành khách</span>
                  <h3>{detail.passenger.full_name}</h3>
                  <p className="busgo-muted">{detail.passenger.phone_number}</p>
                </div>
              </div>
              <div className="busgo-stack">
                <div>
                  <span className="busgo-muted">Tuyến</span>
                  <h3>{getRouteLabel(detail.trip.route_id)}</h3>
                </div>
                <div>
                  <span className="busgo-muted">Ghế</span>
                  <h3>{detail.busSeat.seat_number}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BookingSummary selectedSeats={[detail.busSeat]} trip={detail.trip} />
      </div>
    </CustomerLayout>
  );
};

export const CustomerHomeRedirect = () => (
  <AppLayout>
    <div className="busgo-container">
      <PageHeader title="BusGo" description="Chọn khu vực thao tác để tiếp tục." />
      <div className="busgo-grid-3">
        <Link className="busgo-card busgo-card-pad" to="/trips">
          Tìm chuyến
        </Link>
        <Link className="busgo-card busgo-card-pad" to="/my-tickets">
          Vé của tôi
        </Link>
        <Link className="busgo-card busgo-card-pad" to="/operator/dashboard">
          Nhà xe
        </Link>
      </div>
    </div>
  </AppLayout>
);

LoginPage.propTypes = {};
RegisterPage.propTypes = {};
TripsPage.propTypes = {};
TripDetailPage.propTypes = {};
CheckoutPassengersPage.propTypes = {};
CheckoutPaymentPage.propTypes = {};
MyTicketsPage.propTypes = {};
TicketDetailPage.propTypes = {};
CustomerHomeRedirect.propTypes = {};
