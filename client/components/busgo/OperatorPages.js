import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import {
  ConfirmDialog,
  DashboardMetricCard,
  DataTable,
  PageHeader,
  SeatMap,
  StatusBadge,
} from './AppComponents';
import { OperatorLayout } from './AppLayouts';
import {
  bookings,
  buses,
  busSeats,
  busTrips,
  findById,
  formatCurrency,
  formatDateTime,
  formatTime,
  getOperatorName,
  getRouteLabel,
  getTripSeats,
  getTripView,
  operators,
  passengers,
  payments,
  refunds,
  reviews,
  routes,
  stations,
  tickets,
  tripEvents,
} from './domainMockData';
import { enumLabels, getEnumLabel } from './statusConfig';

const ActionButtons = ({ onDanger }) => (
  <div className="busgo-inline-actions">
    <button className="busgo-btn busgo-btn-soft" type="button">
      Sửa
    </button>
    <button className="busgo-btn busgo-btn-outline" onClick={onDanger} type="button">
      Xóa
    </button>
  </div>
);

ActionButtons.propTypes = {
  onDanger: PropTypes.func,
};

export const OperatorDashboardPage = () => (
  <OperatorLayout>
    <PageHeader
      description="Tổng quan vận hành theo đặt vé, thanh toán, hoàn tiền, đánh giá và chuyến xe."
      title="Tổng quan nhà xe"
    />
    <div className="busgo-stack">
      <div className="busgo-grid-3">
        <DashboardMetricCard hint="+12% so với hôm qua" label="Doanh thu hôm nay" value="18.4tr" />
        <DashboardMetricCard label="Vé đã bán" value="126" />
        <DashboardMetricCard label="Chuyến đang mở" value="24" />
        <DashboardMetricCard label="Chuyến bị trễ" value="3" />
        <DashboardMetricCard label="Hoàn tiền đang chờ" value="2" />
        <DashboardMetricCard label="Điểm đánh giá trung bình" value="4.7" />
      </div>
      <DataTable
        columns={[
          { key: 'route', label: 'Chuyến', render: (row) => getRouteLabel(row.route_id) },
          { key: 'departure_time', label: 'Giờ đi', render: (row) => formatDateTime(row.departure_time) },
          { key: 'bus_id', label: 'Xe', render: (row) => findById(buses, row.bus_id).license_plate },
          { key: 'trip_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="trip_status" value={row.trip_status} /> },
          { key: 'action', label: 'Thao tác', render: (row) => <Link className="busgo-link-action" to={`/operator/trips/${row.id}`}>Chi tiết</Link> },
        ]}
        rows={busTrips.slice(0, 3)}
      />
    </div>
  </OperatorLayout>
);

export const OperatorRoutesPage = () => {
  const [dialog, setDialog] = useState(false);
  return (
    <OperatorLayout>
      <PageHeader
        actions={<button className="busgo-btn busgo-btn-accent" type="button">Tạo tuyến</button>}
        description="Giao diện thêm, sửa, xóa dựa trên tuyến đường, nhà xe và địa điểm."
        title="Quản lý tuyến đường"
      />
      <div className="busgo-grid-2">
        <DataTable
          columns={[
            { key: 'operator_id', label: 'Nhà xe', render: (row) => getOperatorName(row.operator_id) },
            { key: 'departure_station_id', label: 'Điểm đi', render: (row) => findById(stations, row.departure_station_id).name },
            { key: 'arrival_station_id', label: 'Điểm đến', render: (row) => findById(stations, row.arrival_station_id).name },
            { key: 'estimated_duration_minutes', label: 'Thời gian', render: (row) => `${row.estimated_duration_minutes} phút` },
            { key: 'actions', label: 'Thao tác', render: () => <ActionButtons onDanger={() => setDialog(true)} /> },
          ]}
          rows={routes}
        />
        <CrudForm
          fields={[
            ['operator_id', 'Nhà xe', operators[0].name],
            ['departure_station_id', 'Điểm đi', stations[0].name],
            ['arrival_station_id', 'Điểm đến', stations[1].name],
            ['estimated_duration_minutes', 'Thời gian dự kiến', '390'],
          ]}
          title="Tạo/sửa tuyến"
        />
      </div>
      <ConfirmDialog
        description="Thao tác xóa tuyến chỉ là mock, dữ liệu sẽ không thay đổi."
        onCancel={() => setDialog(false)}
        onConfirm={() => setDialog(false)}
        open={dialog}
        title="Xác nhận xóa tuyến"
      />
    </OperatorLayout>
  );
};

export const OperatorStationsPage = () => (
  <OperatorLayout>
    <PageHeader
      actions={<button className="busgo-btn busgo-btn-accent" type="button">Thêm địa điểm</button>}
      description="Giao diện thêm, sửa, xóa dựa trên địa điểm và loại địa điểm."
      title="Quản lý địa điểm"
    />
    <div className="busgo-grid-2">
      <DataTable
        columns={[
          { key: 'name', label: 'Tên địa điểm' },
          { key: 'province', label: 'Tỉnh thành' },
          { key: 'station_type', label: 'Loại', render: (row) => <StatusBadge domain="station_type" value={row.station_type} /> },
          { key: 'address', label: 'Địa chỉ' },
          { key: 'actions', label: 'Thao tác', render: () => <ActionButtons /> },
        ]}
        rows={stations}
      />
      <CrudForm
        fields={[
          ['name', 'Tên địa điểm', 'Bến xe mới'],
          ['address', 'Địa chỉ', 'Nhập địa chỉ'],
          ['province', 'Tỉnh thành', 'TP.HCM'],
          ['station_type', 'Loại địa điểm', getEnumLabel('station_type', 'bus_station')],
        ]}
        title="Tạo/sửa địa điểm"
      />
    </div>
  </OperatorLayout>
);

export const OperatorBusesPage = () => (
  <OperatorLayout>
    <PageHeader
      actions={<button className="busgo-btn busgo-btn-accent" type="button">Thêm xe</button>}
      description="Giao diện thêm, sửa, xóa dựa trên xe, loại xe và trạng thái xe."
      title="Quản lý xe"
    />
    <div className="busgo-grid-2">
      <DataTable
        columns={[
          { key: 'license_plate', label: 'Biển số' },
          { key: 'total_seats', label: 'Số ghế' },
          { key: 'bus_type', label: 'Loại xe', render: (row) => <StatusBadge domain="bus_type" value={row.bus_type} /> },
          { key: 'bus_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="bus_status" value={row.bus_status} /> },
          { key: 'actions', label: 'Thao tác', render: (row) => <Link className="busgo-link-action" to={`/operator/buses/${row.id}/seats`}>Sơ đồ ghế</Link> },
        ]}
        rows={buses}
      />
      <CrudForm
        fields={[
          ['license_plate', 'Biển số xe', '51B-000.00'],
          ['total_seats', 'Tổng số ghế', '22'],
          ['bus_type', 'Loại xe', getEnumLabel('bus_type', 'limousine')],
          ['bus_status', 'Trạng thái xe', getEnumLabel('bus_status', 'active')],
        ]}
        title="Tạo/sửa xe"
      />
    </div>
  </OperatorLayout>
);

export const OperatorBusSeatsPage = () => {
  const { id } = useParams();
  const bus = findById(buses, id) || buses[0];
  const seats = busSeats.filter((seat) => seat.bus_id === bus.id);
  return (
    <OperatorLayout>
      <PageHeader
        description="Tạo/sửa ghế theo sơ đồ ghế và loại ghế."
        title={`Sơ đồ ghế xe ${bus.license_plate}`}
      />
      <div className="busgo-grid-2">
        <section className="busgo-card">
          <div className="busgo-card-head">
            <h2>{seats.length} ghế</h2>
            <button className="busgo-btn busgo-btn-accent" type="button">Thêm ghế</button>
          </div>
          <div className="busgo-card-pad">
            <div className="busgo-schema-seat-map">
              {seats.map((seat) => (
                <button className={`busgo-schema-seat available ${seat.seat_type}`} key={seat.id} type="button">
                  {seat.seat_number}
                </button>
              ))}
            </div>
          </div>
        </section>
        <CrudForm
          fields={[
            ['seat_number', 'Số ghế', 'A23'],
            ['seat_type', 'Loại ghế', getEnumLabel('seat_type', 'normal')],
          ]}
          title="Tạo/sửa ghế"
        />
      </div>
    </OperatorLayout>
  );
};

export const OperatorTripsPage = () => (
  <OperatorLayout>
    <PageHeader
      actions={<button className="busgo-btn busgo-btn-accent" type="button">Tạo chuyến</button>}
      description="Giao diện thêm, sửa, xóa dựa trên chuyến xe và trạng thái chuyến."
      title="Quản lý chuyến xe"
    />
    <div className="busgo-grid-2">
      <DataTable
        columns={[
          { key: 'route_id', label: 'Tuyến', render: (row) => getRouteLabel(row.route_id) },
          { key: 'departure_time', label: 'Giờ đi', render: (row) => formatDateTime(row.departure_time) },
          { key: 'ticket_price', label: 'Giá vé', render: (row) => formatCurrency(row.ticket_price) },
          { key: 'trip_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="trip_status" value={row.trip_status} /> },
          { key: 'actions', label: 'Thao tác', render: (row) => <Link className="busgo-link-action" to={`/operator/trips/${row.id}`}>Chi tiết</Link> },
        ]}
        rows={busTrips}
      />
      <CrudForm
        fields={[
          ['route_id', 'Tuyến đường', getRouteLabel(1)],
          ['bus_id', 'Xe', buses[0].license_plate],
          ['departure_time', 'Giờ khởi hành', '2026-05-29 22:30'],
          ['arrival_time', 'Giờ đến', '2026-05-30 05:00'],
          ['ticket_price', 'Giá vé', '280000'],
          ['trip_status', 'Trạng thái', getEnumLabel('trip_status', 'scheduled')],
        ]}
        title="Tạo/sửa chuyến"
      />
    </div>
  </OperatorLayout>
);

const tripTabs = ['Tổng quan', 'Sơ đồ ghế', 'Danh sách hành khách', 'Vé', 'Thanh toán', 'Lịch sử chuyến'];

export const OperatorTripDetailPage = () => {
  const { id } = useParams();
  const trip = findById(busTrips, id) || busTrips[0];
  const [tab, setTab] = useState('Tổng quan');
  const [status, setStatus] = useState(trip.trip_status);
  const view = getTripView({ ...trip, trip_status: status });
  const tripSeatList = getTripSeats(trip.id);

  return (
    <OperatorLayout>
      <PageHeader
        actions={
          <div className="busgo-inline-actions">
            <select className="busgo-control" onChange={(event) => setStatus(event.target.value)} value={status}>
              {Object.keys(enumLabels.trip_status).map((value) => (
                <option key={value} value={value}>{getEnumLabel('trip_status', value)}</option>
              ))}
            </select>
            <StatusBadge domain="trip_status" value={status} />
          </div>
        }
        description={`${view.operator.name} · ${formatDateTime(view.departure_time)}`}
        title={getRouteLabel(view.route_id)}
      />
      <div className="busgo-tabs-line">
        {tripTabs.map((item) => (
          <button
            className={`busgo-tab-btn ${tab === item ? 'active' : ''}`}
            key={item}
            onClick={() => setTab(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <TripTabContent tab={tab} trip={trip} tripSeatList={tripSeatList} />
    </OperatorLayout>
  );
};

const TripTabContent = ({ tab, trip, tripSeatList }) => {
  if (tab === 'Sơ đồ ghế') {
    return (
      <section className="busgo-card busgo-card-pad">
        <SeatMap onToggleSeat={() => {}} selectedSeatIds={[]} tripId={trip.id} />
      </section>
    );
  }
  if (tab === 'Danh sách hành khách') {
    return (
      <DataTable
        columns={[
          { key: 'full_name', label: 'Hành khách' },
          { key: 'phone_number', label: 'Số điện thoại' },
          { key: 'booking_id', label: 'Mã đặt vé' },
        ]}
        rows={passengers}
      />
    );
  }
  if (tab === 'Vé') {
    return (
      <DataTable
        columns={[
          { key: 'ticket_code', label: 'Mã vé' },
          { key: 'ticket_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="ticket_status" value={row.ticket_status} /> },
          { key: 'issued_at', label: 'Xuất vé', render: (row) => formatDateTime(row.issued_at) },
        ]}
        rows={tickets}
      />
    );
  }
  if (tab === 'Thanh toán') {
    return (
      <DataTable
        columns={[
          { key: 'booking_id', label: 'Mã đặt vé' },
          { key: 'amount', label: 'Số tiền', render: (row) => formatCurrency(row.amount) },
          { key: 'method', label: 'Phương thức', render: (row) => getEnumLabel('payment_method', row.method) },
          { key: 'payment_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="payment_status" value={row.payment_status} /> },
        ]}
        rows={payments}
      />
    );
  }
  if (tab === 'Lịch sử chuyến') {
    return (
      <section className="busgo-card busgo-card-pad busgo-timeline-list">
        {tripEvents
          .filter((event) => event.trip_id === trip.id)
          .map((event) => (
            <div className="busgo-timeline-item" key={event.id}>
              <span className="busgo-timeline-dot" />
              <div>
                <strong>{getEnumLabel('trip_event_type', event.event_type)}</strong>
                <p className="busgo-muted">{event.note} · {formatDateTime(event.created_at)}</p>
              </div>
            </div>
          ))}
      </section>
    );
  }

  return (
    <div className="busgo-grid-3">
      <DashboardMetricCard label="Ghế trống" value={tripSeatList.filter((seat) => seat.seat_status === 'available').length} />
      <DashboardMetricCard label="Ghế đã đặt" value={tripSeatList.filter((seat) => seat.seat_status === 'booked').length} />
      <DashboardMetricCard label="Giờ khởi hành" value={formatTime(trip.departure_time)} />
    </div>
  );
};

TripTabContent.propTypes = {
  tab: PropTypes.string.isRequired,
  trip: PropTypes.object.isRequired,
  tripSeatList: PropTypes.array.isRequired,
};

export const OperatorBookingsPage = () => (
  <OperatorLayout>
    <PageHeader description="Danh sách đặt vé theo trạng thái đặt vé." title="Danh sách đặt vé" />
    <DataTable
      columns={[
        { key: 'id', label: 'Mã booking' },
        { key: 'trip_id', label: 'Tuyến', render: (row) => getRouteLabel(findById(busTrips, row.trip_id).route_id) },
        { key: 'total_amount', label: 'Tổng tiền', render: (row) => formatCurrency(row.total_amount) },
        { key: 'booking_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="booking_status" value={row.booking_status} /> },
        { key: 'booked_at', label: 'Thời gian', render: (row) => formatDateTime(row.booked_at) },
      ]}
      rows={bookings}
    />
  </OperatorLayout>
);

export const OperatorRefundsPage = () => {
  const [localRefunds, setLocalRefunds] = useState(refunds);
  const updateStatus = (id, refundStatus) => {
    setLocalRefunds((current) =>
      current.map((refund) =>
        refund.id === id ? { ...refund, refund_status: refundStatus, updated_at: '2026-05-18T16:00:00' } : refund
      )
    );
  };

  return (
    <OperatorLayout>
      <PageHeader description="Duyệt hoặc từ chối thử theo trạng thái hoàn tiền." title="Yêu cầu hoàn tiền" />
      <DataTable
        columns={[
          { key: 'id', label: 'Mã yêu cầu' },
          { key: 'amount', label: 'Số tiền', render: (row) => formatCurrency(row.amount) },
          { key: 'reason', label: 'Lý do' },
          { key: 'refund_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="refund_status" value={row.refund_status} /> },
          {
            key: 'actions',
            label: 'Thao tác',
            render: (row) => (
              <div className="busgo-inline-actions">
                <button className="busgo-btn busgo-btn-soft" onClick={() => updateStatus(row.id, 'approved')} type="button">Duyệt</button>
                <button className="busgo-btn busgo-btn-outline" onClick={() => updateStatus(row.id, 'rejected')} type="button">Từ chối</button>
              </div>
            ),
          },
        ]}
        rows={localRefunds}
      />
    </OperatorLayout>
  );
};

export const OperatorReviewsPage = () => {
  const [rating, setRating] = useState('all');
  const filtered = reviews.filter((review) => rating === 'all' || String(review.rating) === rating);
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <OperatorLayout>
      <PageHeader description="Danh sách đánh giá, có thể lọc theo số sao." title="Đánh giá nhà xe" />
      <div className="busgo-stack">
        <div className="busgo-grid-3">
          <DashboardMetricCard label="Điểm đánh giá trung bình" value={average.toFixed(1)} />
          <DashboardMetricCard label="Tổng đánh giá" value={reviews.length} />
          <div className="busgo-card busgo-card-pad busgo-form-control">
            <label>Lọc theo sao</label>
            <select onChange={(event) => setRating(event.target.value)} value={rating}>
              <option value="all">Tất cả</option>
              {[5, 4, 3, 2, 1].map((star) => <option key={star} value={star}>{star} sao</option>)}
            </select>
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'user_id', label: 'Người dùng', render: (row) => `#${row.user_id}` },
            { key: 'operator_id', label: 'Nhà xe', render: (row) => getOperatorName(row.operator_id) },
            { key: 'rating', label: 'Số sao', render: (row) => `${row.rating} sao` },
            { key: 'comment', label: 'Bình luận' },
          ]}
          rows={filtered}
        />
      </div>
    </OperatorLayout>
  );
};

const CrudForm = ({ fields, title }) => (
  <section className="busgo-card">
    <div className="busgo-card-head">
      <h2>{title}</h2>
    </div>
    <div className="busgo-card-pad busgo-stack">
      {fields.map(([name, label, value]) => (
        <div className="busgo-form-control" key={name}>
          <label>{label}</label>
          <input defaultValue={value} />
        </div>
      ))}
      <div className="busgo-inline-actions">
        <button className="busgo-btn busgo-btn-accent" type="button">Lưu thử</button>
        <button className="busgo-btn busgo-btn-soft" type="button">Làm mới</button>
      </div>
    </div>
  </section>
);

CrudForm.propTypes = {
  fields: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
