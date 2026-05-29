import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency, seatDecks } from './mockData';

const SeatMap = ({ selectedSeats, selectedTrip, onSeatToggle }) => {
  const total = selectedSeats.length * selectedTrip.price;

  return (
    <aside className="busgo-panel">
      <div className="busgo-panel-head">
        <h3>Chọn ghế</h3>
        <span className="busgo-chip active">{selectedSeats.length} ghế</span>
      </div>
      <div className="busgo-panel-body">
        <div className="busgo-seat-map">
          {seatDecks.map((deck) => (
            <div className="busgo-deck" key={deck.title}>
              <div className="busgo-deck-title">
                <span>{deck.title}</span>
                <span>{deck.count}</span>
              </div>
              <div className="busgo-seats">
                {deck.seats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.code);
                  const className = [
                    'busgo-seat',
                    seat.status || '',
                    isSelected ? 'selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      className={className}
                      disabled={seat.status === 'booked'}
                      key={seat.code}
                      onClick={() => onSeatToggle(seat.code)}
                      type="button"
                    >
                      {seat.code}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="busgo-legend">
          <span>
            <i />
            Trống
          </span>
          <span>
            <i className="selected" />
            Đang chọn
          </span>
          <span>
            <i className="booked" />
            Đã đặt
          </span>
          <span>
            <i className="vip" />
            VIP
          </span>
        </div>

        <div className="busgo-summary">
          <div className="busgo-summary-row">
            <span>Ghế đã chọn</span>
            <strong>{selectedSeats.join(', ') || 'Chưa chọn'}</strong>
          </div>
          <div className="busgo-summary-row">
            <span>Điểm đón</span>
            <strong>Bến xe Miền Đông mới</strong>
          </div>
          <div className="busgo-summary-row">
            <span>Điểm trả</span>
            <strong>Đà Lạt Center</strong>
          </div>
          <div className="busgo-summary-row">
            <span>Phí dịch vụ</span>
            <strong>0đ</strong>
          </div>
          <div className="busgo-summary-row total">
            <span>Tổng tiền</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>

        <a className="busgo-btn busgo-btn-accent busgo-full" href="#checkout">
          Tiếp tục thanh toán
        </a>
      </div>
    </aside>
  );
};

SeatMap.propTypes = {
  onSeatToggle: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  selectedTrip: PropTypes.object.isRequired,
};

export default SeatMap;
