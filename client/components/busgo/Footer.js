import React from 'react';

const Footer = () => (
  <footer className="busgo-footer" id="support">
    <div className="busgo-container">
      <div className="busgo-footer-grid">
        <div>
          <a className="busgo-brand" href="#top">
            <span className="busgo-brand-mark">BG</span>
            BusGo
          </a>
          <p>
            Nền tảng đặt vé xe khách trực tuyến cho hành khách và nhà xe. Tối ưu
            tìm chuyến, chọn ghế, thanh toán và quản lý vận hành.
          </p>
        </div>
        <div>
          <h4>Hành khách</h4>
          <a href="#search">Tìm vé xe</a>
          <br />
          <a href="#checkout">Tra cứu vé</a>
          <br />
          <a href="#booking">Chính sách hủy vé</a>
        </div>
        <div>
          <h4>Nhà xe</h4>
          <a href="#operator">Đăng ký đối tác</a>
          <br />
          <a href="#operator">Quản lý chuyến</a>
          <br />
          <a href="#operator">Báo cáo doanh thu</a>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <a href="#support">Tổng đài 24/7</a>
          <br />
          <a href="#support">Câu hỏi thường gặp</a>
          <br />
          <a href="#support">Liên hệ</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
