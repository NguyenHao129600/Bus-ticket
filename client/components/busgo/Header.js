import React from 'react';

const Header = () => (
  <header className="busgo-nav">
    <a className="busgo-brand" href="#top">
      <span className="busgo-brand-mark">BG</span>
      BusGo
    </a>

    <nav className="busgo-nav-links" aria-label="Điều hướng chính">
      <a href="#search">Tìm vé</a>
      <a href="#booking">Chọn ghế</a>
      <a href="#checkout">Thanh toán</a>
      <a href="#operator">Nhà xe</a>
      <a href="#support">Hỗ trợ</a>
    </nav>

    <div className="busgo-nav-actions">
      <a className="busgo-btn busgo-btn-outline" href="/login">
        Đăng nhập
      </a>
      <a className="busgo-btn busgo-btn-white" href="#search">
        Đặt vé ngay
      </a>
    </div>
  </header>
);

export default Header;
