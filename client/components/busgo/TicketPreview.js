import React from 'react';
import PropTypes from 'prop-types';

const TicketPreview = ({ selectedSeats, selectedTrip }) => (
  <aside className="busgo-ticket-preview">
    <h3>Xem trước vé điện tử</h3>
    <div className="busgo-qr" />
    <div className="busgo-ticket-info">
      <div>
        <span>Mã vé</span>
        <strong>BG-260529-{selectedSeats.join('') || 'GHẾ'}</strong>
      </div>
      <div>
        <span>Tuyến</span>
        <strong>TP.HCM → Đà Lạt</strong>
      </div>
      <div>
        <span>Nhà xe</span>
        <strong>{selectedTrip.operator}</strong>
      </div>
      <div>
        <span>Khởi hành</span>
        <strong>{selectedTrip.departTime} · 29/05/2026</strong>
      </div>
      <div>
        <span>Ghế</span>
        <strong>{selectedSeats.join(', ') || 'Chưa chọn'}</strong>
      </div>
      <div>
        <span>Trạng thái</span>
        <strong>Chờ thanh toán</strong>
      </div>
    </div>
  </aside>
);

TicketPreview.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  selectedTrip: PropTypes.object.isRequired,
};

export default TicketPreview;
