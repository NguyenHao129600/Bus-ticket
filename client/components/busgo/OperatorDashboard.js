import React from 'react';

import { dashboardRows } from './mockData';

const menuItems = [
  'Tổng quan',
  'Quản lý tuyến',
  'Chuyến xe',
  'Sơ đồ ghế',
  'Đơn đặt vé',
  'Hoàn / hủy vé',
  'Báo cáo doanh thu',
];

const OperatorDashboard = () => (
  <section className="busgo-section" id="operator">
    <div className="busgo-container">
      <div className="busgo-section-title">
        <div>
          <h2>Bảng điều khiển dành cho nhà xe và nhân viên</h2>
          <p>
            Website không chỉ bán vé cho khách mà còn có khu vực để nhà xe đăng
            tuyến, mở bán chuyến, quản lý ghế, kiểm vé và xử lý hoàn/hủy.
          </p>
        </div>
      </div>

      <div className="busgo-operator-dashboard">
        <aside className="busgo-side-menu">
          <h3>Đối tác BusGo</h3>
          {menuItems.map((item, index) => (
            <div className={`busgo-menu-item ${index === 0 ? 'active' : ''}`} key={item}>
              {item}
            </div>
          ))}
        </aside>

        <section>
          <div className="busgo-dashboard-grid">
            <div className="busgo-dash-card">
              <span>Doanh thu hôm nay</span>
              <strong>18.4tr</strong>
            </div>
            <div className="busgo-dash-card">
              <span>Vé đã bán</span>
              <strong>126</strong>
            </div>
            <div className="busgo-dash-card">
              <span>Chuyến đang mở</span>
              <strong>24</strong>
            </div>
          </div>

          <div className="busgo-table-wrap">
            <table className="busgo-table">
              <thead>
                <tr>
                  <th>Chuyến</th>
                  <th>Giờ đi</th>
                  <th>Ghế bán</th>
                  <th>Doanh thu</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {dashboardRows.map((row) => (
                  <tr key={`${row.route}-${row.time}`}>
                    <td>{row.route}</td>
                    <td>{row.time}</td>
                    <td>{row.seats}</td>
                    <td>{row.revenue}</td>
                    <td>
                      <span className={`busgo-status ${row.statusType}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </section>
);

export default OperatorDashboard;
