import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  formatCurrency,
  formatDateTime,
  formatTime,
  getRouteLabel,
  getTripSeats,
  getTripView,
} from './domainMockData';
import { getEnumLabel, getStatusMeta } from './statusConfig';

export const StatusBadge = ({ domain, value }) => {
  const meta = getStatusMeta(domain, value);
  return <span className={`busgo-status-badge ${meta.color}`}>{meta.label}</span>;
};

export const PageHeader = ({ title, description, actions }) => (
  <div className="busgo-page-head">
    <div>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
    {actions ? <div className="busgo-inline-actions">{actions}</div> : null}
  </div>
);

export const DataTable = ({ columns, rows, emptyText }) => (
  <div className="busgo-card busgo-data-table-wrap">
    <table className="busgo-data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((row) => (
            <tr key={row.id || row.key}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>
              <EmptyState title={emptyText || 'Chưa có dữ liệu'} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const DashboardMetricCard = ({ label, value, hint }) => (
  <div className="busgo-metric">
    <span>{label}</span>
    <strong>{value}</strong>
    {hint ? <small>{hint}</small> : null}
  </div>
);

export const EmptyState = ({ title, description }) => (
  <div className="busgo-empty">
    <strong>{title}</strong>
    {description ? <p>{description}</p> : null}
  </div>
);

export const ConfirmDialog = ({ open, title, description, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="busgo-dialog-backdrop">
      <div className="busgo-dialog">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="busgo-inline-actions">
          <button className="busgo-btn busgo-btn-soft" onClick={onCancel} type="button">
            Hủy
          </button>
          <button className="busgo-btn busgo-btn-accent" onClick={onConfirm} type="button">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export const SearchBox = () => (
  <div className="busgo-card busgo-card-pad">
    <div className="busgo-app-search">
      <div className="busgo-form-control">
        <label>Điểm đi</label>
        <select defaultValue="TP.HCM">
          <option>TP.HCM</option>
          <option>Lâm Đồng</option>
          <option>Khánh Hòa</option>
        </select>
      </div>
      <div className="busgo-form-control">
        <label>Điểm đến</label>
        <select defaultValue="Lâm Đồng">
          <option>Lâm Đồng</option>
          <option>TP.HCM</option>
          <option>Cần Thơ</option>
        </select>
      </div>
      <div className="busgo-form-control">
        <label>Ngày đi</label>
        <input defaultValue="2026-05-29" type="date" />
      </div>
      <Link className="busgo-btn busgo-btn-accent" to="/trips">
        Tìm vé
      </Link>
    </div>
  </div>
);

export const TripCard = ({ trip }) => {
  const view = getTripView(trip);
  return (
    <article className="busgo-card busgo-card-pad">
      <div className="busgo-trip-top">
        <div className="busgo-operator">
          <div className="busgo-operator-logo">{view.operator.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h3>{view.operator.name}</h3>
            <div className="busgo-meta">
              <span>{getEnumLabel('bus_type', view.bus.bus_type)}</span>
              <span>•</span>
              <span>{view.bus.license_plate}</span>
              <span>•</span>
              <span>Còn {view.availableSeats} ghế</span>
            </div>
          </div>
        </div>
        <div className="busgo-price">
          <strong>{formatCurrency(view.ticket_price)}</strong>
          <small>/ khách</small>
        </div>
      </div>
      <div className="busgo-timeline">
        <div className="busgo-time">
          <strong>{formatTime(view.departure_time)}</strong>
          <small>{view.departure_station.province}</small>
        </div>
        <div className="busgo-line">
          <span>{Math.round(view.route.estimated_duration_minutes / 60)} giờ</span>
        </div>
        <div className="busgo-time end">
          <strong>{formatTime(view.arrival_time)}</strong>
          <small>{view.arrival_station.province}</small>
        </div>
      </div>
      <div className="busgo-trip-actions">
        <div className="busgo-meta">
          <span className="busgo-rating">4.8 sao</span>
          <StatusBadge domain="trip_status" value={view.trip_status} />
        </div>
        <Link className="busgo-btn busgo-btn-primary" to={`/trips/${view.id}`}>
          Chọn chuyến
        </Link>
      </div>
    </article>
  );
};

export const SeatMap = ({ tripId, selectedSeatIds, onToggleSeat }) => {
  const seats = getTripSeats(tripId);
  return (
    <div className="busgo-schema-seat-map">
      {seats.map((seat) => {
        const selected = selectedSeatIds.includes(seat.id);
        return (
          <button
            className={[
              'busgo-schema-seat',
              seat.seat_status,
              seat.seat_type,
              selected ? 'selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={seat.seat_status !== 'available'}
            key={seat.id}
            onClick={() => onToggleSeat(seat.id)}
            type="button"
          >
            {seat.seat_number}
          </button>
        );
      })}
    </div>
  );
};

export const BookingSummary = ({ trip, selectedSeats }) => {
  const view = getTripView(trip);
  const total = selectedSeats.length * view.ticket_price;
  return (
    <aside className="busgo-card">
      <div className="busgo-card-head">
        <h3>Tóm tắt đặt vé</h3>
        <span className="busgo-chip active">{selectedSeats.length} ghế</span>
      </div>
      <div className="busgo-card-pad">
        <div className="busgo-summary-row">
          <span>Tuyến</span>
          <strong>{getRouteLabel(view.route_id)}</strong>
        </div>
        <div className="busgo-summary-row">
          <span>Nhà xe</span>
          <strong>{view.operator.name}</strong>
        </div>
        <div className="busgo-summary-row">
          <span>Khởi hành</span>
          <strong>{formatDateTime(view.departure_time)}</strong>
        </div>
        <div className="busgo-summary-row">
          <span>Ghế</span>
          <strong>{selectedSeats.map((seat) => seat.seat_number).join(', ') || 'Chưa chọn'}</strong>
        </div>
        <div className="busgo-summary-row total">
          <span>Tổng tiền</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>
    </aside>
  );
};

export const PaymentMethodCard = ({ method, active, onSelect }) => (
  <button
    className={`busgo-payment ${active ? 'active' : ''}`}
    onClick={() => onSelect(method)}
    type="button"
  >
    <div className="busgo-payment-left">
      <div className="busgo-pay-icon">{method.slice(0, 2).toUpperCase()}</div>
      <div>
        <strong>{getEnumLabel('payment_method', method)}</strong>
        <br />
        <small>Xử lý mock theo phương thức {method}</small>
      </div>
    </div>
    <span>{active ? '✓' : ''}</span>
  </button>
);

export const TicketCard = ({ ticket, detail }) => (
  <article className="busgo-ticket-card">
    <div className="busgo-qr-box" />
    <div>
      <h3>{ticket.ticket_code}</h3>
      <p>
        {getRouteLabel(detail.trip.route_id)} · {formatDateTime(detail.trip.departure_time)}
      </p>
      <p>
        Ghế {detail.busSeat.seat_number} · {detail.passenger.full_name}
      </p>
    </div>
    <div className="busgo-inline-actions">
      <StatusBadge domain="ticket_status" value={ticket.ticket_status} />
      <Link className="busgo-btn busgo-btn-soft" to={`/tickets/${ticket.ticket_code}`}>
        Xem chi tiết
      </Link>
    </div>
  </article>
);

export const TicketPreview = ({ code }) => (
  <div className="busgo-ticket-preview">
    <h3>Vé điện tử</h3>
    <div className="busgo-qr" />
    <div className="busgo-ticket-info">
      <div>
        <span>Mã vé</span>
        <strong>{code}</strong>
      </div>
      <div>
        <span>Trạng thái</span>
        <strong>Sẵn sàng sử dụng</strong>
      </div>
    </div>
  </div>
);

StatusBadge.propTypes = {
  domain: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
PageHeader.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};
DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  emptyText: PropTypes.string,
  rows: PropTypes.array.isRequired,
};
DashboardMetricCard.propTypes = {
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EmptyState.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};
ConfirmDialog.propTypes = {
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
TripCard.propTypes = {
  trip: PropTypes.object.isRequired,
};
SeatMap.propTypes = {
  onToggleSeat: PropTypes.func.isRequired,
  selectedSeatIds: PropTypes.array.isRequired,
  tripId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
BookingSummary.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  trip: PropTypes.object.isRequired,
};
PaymentMethodCard.propTypes = {
  active: PropTypes.bool.isRequired,
  method: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
TicketCard.propTypes = {
  detail: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
};
TicketPreview.propTypes = {
  code: PropTypes.string.isRequired,
};
