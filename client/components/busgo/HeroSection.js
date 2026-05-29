import React from 'react';

import { stats } from './mockData';

const HeroSection = () => (
  <section className="busgo-hero" id="top">
    <div>
      <div className="busgo-eyebrow">Nền tảng đặt vé xe khách trực tuyến</div>
      <h1>Đặt vé xe nhanh, chọn ghế rõ, thanh toán an tâm.</h1>
      <p>
        BusGo giúp hành khách tìm chuyến phù hợp, so sánh nhà xe, chọn ghế theo
        sơ đồ trực quan và nhận vé điện tử ngay sau khi thanh toán.
      </p>
      <div className="busgo-hero-actions">
        <a className="busgo-btn busgo-btn-accent" href="#search">
          Tìm chuyến xe
        </a>
        <a className="busgo-btn busgo-btn-outline" href="#operator">
          Dành cho nhà xe
        </a>
      </div>
      <div className="busgo-hero-stats">
        {stats.map((item) => (
          <div className="busgo-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="busgo-hero-card" aria-label="Minh họa đặt vé">
      <div className="busgo-phone">
        <div className="busgo-map-lines" />
        <div className="busgo-route-card">
          <div className="busgo-route-row">
            <div className="busgo-location">
              <h3>TP.HCM</h3>
              <p>Bến xe Miền Đông mới</p>
            </div>
            <div className="busgo-swap">↔</div>
            <div className="busgo-location">
              <h3>Đà Lạt</h3>
              <p>Trung tâm thành phố</p>
            </div>
          </div>
        </div>

        <div className="busgo-bus-visual">
          <div className="busgo-bus-head">
            <div>
              <h4>Limousine 22 phòng</h4>
              <span>Khởi hành 22:30 · Còn 7 ghế</span>
            </div>
            <strong>4.8</strong>
          </div>
          <div className="busgo-seat-mini">
            {Array.from({ length: 16 }).map((_, index) => {
              const className =
                index === 2 || index === 9
                  ? 'busgo-seat-dot active'
                  : index === 4 || index === 12
                    ? 'busgo-seat-dot busy'
                    : 'busgo-seat-dot';
              return <div className={className} key={index} />;
            })}
          </div>
        </div>

        <div className="busgo-floating-ticket">
          <div>
            <small>Tạm tính 2 ghế</small>
            <strong>560.000đ</strong>
          </div>
          <a className="busgo-btn busgo-btn-primary" href="#checkout">
            Xem vé
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
