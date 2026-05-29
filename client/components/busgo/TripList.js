import React from 'react';
import PropTypes from 'prop-types';

import SeatMap from './SeatMap';
import TripCard from './TripCard';
import { trips } from './mockData';

const TripList = ({ selectedSeats, selectedTrip, onSeatToggle, onTripSelect }) => (
  <section className="busgo-section" id="booking">
    <div className="busgo-container">
      <div className="busgo-section-title">
        <div>
          <h2>Kết quả tìm kiếm và chọn ghế</h2>
          <p>
            Bên trái là bộ lọc, giữa là danh sách chuyến, bên phải là sơ đồ ghế
            và tóm tắt vé đang chọn.
          </p>
        </div>
      </div>

      <div className="busgo-booking-area">
        <aside className="busgo-panel">
          <div className="busgo-panel-head">
            <h3>Bộ lọc</h3>
            <span className="busgo-link-action">Xóa lọc</span>
          </div>
          <div className="busgo-panel-body">
            <div className="busgo-filter-group">
              <h4>Giờ khởi hành</h4>
              <div className="busgo-chip-row">
                <span className="busgo-chip active">18:00 - 24:00</span>
                <span className="busgo-chip">00:00 - 06:00</span>
                <span className="busgo-chip">06:00 - 12:00</span>
                <span className="busgo-chip">12:00 - 18:00</span>
              </div>
            </div>
            <div className="busgo-filter-group">
              <h4>Loại xe</h4>
              <div className="busgo-chip-row">
                <span className="busgo-chip active">Limousine</span>
                <span className="busgo-chip">Giường nằm</span>
                <span className="busgo-chip">Ghế ngồi</span>
              </div>
            </div>
            <div className="busgo-filter-group">
              <h4>Tiện ích</h4>
              <div className="busgo-chip-row">
                <span className="busgo-chip">Wifi</span>
                <span className="busgo-chip">Nước uống</span>
                <span className="busgo-chip">Rèm riêng</span>
                <span className="busgo-chip">Đón tận nơi</span>
              </div>
            </div>
            <div className="busgo-filter-group">
              <h4>Khoảng giá</h4>
              <div className="busgo-field">
                <strong>220.000đ - 450.000đ</strong>
                <small>Giá trung bình tuyến này</small>
              </div>
            </div>
          </div>
        </aside>

        <section className="busgo-panel">
          <div className="busgo-panel-head">
            <h3>32 chuyến TP.HCM → Đà Lạt</h3>
            <span className="busgo-chip active">Sắp xếp: Phù hợp nhất</span>
          </div>
          {trips.map((trip) => (
            <TripCard
              active={selectedTrip.id === trip.id}
              key={trip.id}
              onSelect={onTripSelect}
              trip={trip}
            />
          ))}
        </section>

        <SeatMap
          onSeatToggle={onSeatToggle}
          selectedSeats={selectedSeats}
          selectedTrip={selectedTrip}
        />
      </div>
    </div>
  </section>
);

TripList.propTypes = {
  onSeatToggle: PropTypes.func.isRequired,
  onTripSelect: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  selectedTrip: PropTypes.object.isRequired,
};

export default TripList;
