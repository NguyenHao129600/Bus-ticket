import React from 'react';

const SearchBox = () => (
  <section className="busgo-search-panel" id="search">
    <div className="busgo-container">
      <div className="busgo-search-card">
        <div className="busgo-tabs">
          <span className="busgo-tab active">Một chiều</span>
          <span className="busgo-tab">Khứ hồi</span>
          <span className="busgo-tab">Theo tháng</span>
        </div>

        <div className="busgo-search-grid">
          <div className="busgo-field">
            <label>Điểm đi</label>
            <strong>TP. Hồ Chí Minh</strong>
            <small>Bến xe Miền Đông mới</small>
          </div>
          <div className="busgo-field">
            <label>Điểm đến</label>
            <strong>Đà Lạt</strong>
            <small>Đà Lạt Center</small>
          </div>
          <div className="busgo-field">
            <label>Ngày đi</label>
            <strong>29/05/2026</strong>
            <small>Thứ sáu</small>
          </div>
          <div className="busgo-field">
            <label>Hành khách</label>
            <strong>2 người</strong>
            <small>Người lớn</small>
          </div>
          <a className="busgo-btn busgo-btn-accent" href="#booking">
            Tìm vé
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default SearchBox;
