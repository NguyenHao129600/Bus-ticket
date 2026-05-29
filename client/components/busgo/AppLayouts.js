import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import BusGoAppStyles from './BusGoAppStyles';
import BusGoStyles from './BusGoStyles';

export const AppLayout = ({ children }) => (
  <div className="busgo-page busgo-app-shell">
    <BusGoStyles />
    <BusGoAppStyles />
    <div className="busgo-app-top">
      <div className="busgo-container">
        <header className="busgo-nav">
          <NavLink className="busgo-brand" to="/">
            <span className="busgo-brand-mark">BG</span>
            BusGo
          </NavLink>
          <nav className="busgo-nav-links" aria-label="Điều hướng chính">
            <NavLink to="/trips">Tìm chuyến</NavLink>
            <NavLink to="/my-tickets">Vé của tôi</NavLink>
            <NavLink to="/operator/dashboard">Nhà xe</NavLink>
            <NavLink to="/admin/dashboard">Quản trị</NavLink>
          </nav>
          <div className="busgo-nav-actions">
            <NavLink className="busgo-btn busgo-btn-outline" to="/login">
              Đăng nhập
            </NavLink>
            <NavLink className="busgo-btn busgo-btn-white" to="/register">
              Đăng ký
            </NavLink>
          </div>
        </header>
      </div>
    </div>
    <main className="busgo-app-main">{children}</main>
  </div>
);

export const AuthLayout = ({ children, title, description }) => (
  <div className="busgo-page busgo-auth-layout">
    <BusGoStyles />
    <BusGoAppStyles />
    <aside className="busgo-auth-hero">
      <NavLink className="busgo-brand" to="/">
        <span className="busgo-brand-mark">BG</span>
        BusGo
      </NavLink>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <p>Giao diện thử nghiệm theo schema đặt vé xe khách, sẵn sàng nối API sau này.</p>
    </aside>
    <main className="busgo-auth-content">{children}</main>
  </div>
);

const customerLinks = [
  { to: '/trips', label: 'Tìm chuyến' },
  { to: '/checkout/passengers', label: 'Hành khách' },
  { to: '/checkout/payment', label: 'Thanh toán' },
  { to: '/my-tickets', label: 'Vé của tôi' },
];

const operatorLinks = [
  { to: '/operator/dashboard', label: 'Tổng quan' },
  { to: '/operator/routes', label: 'Tuyến đường' },
  { to: '/operator/stations', label: 'Địa điểm' },
  { to: '/operator/buses', label: 'Xe' },
  { to: '/operator/trips', label: 'Chuyến xe' },
  { to: '/operator/bookings', label: 'Đặt vé' },
  { to: '/operator/refunds', label: 'Hoàn tiền' },
  { to: '/operator/reviews', label: 'Đánh giá' },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Tổng quan' },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/operators', label: 'Nhà xe' },
];

export const Sidebar = ({ title, links }) => (
  <aside className="busgo-sidebar">
    <div className="busgo-sidebar-title">{title}</div>
    {links.map((link) => (
      <NavLink
        activeClassName="active"
        className="busgo-sidebar-link"
        key={link.to}
        to={link.to}
      >
        {link.label}
      </NavLink>
    ))}
  </aside>
);

export const CustomerLayout = ({ children }) => (
  <AppLayout>
    <div className="busgo-container busgo-layout">
      <Sidebar links={customerLinks} title="Hành khách" />
      <div>{children}</div>
    </div>
  </AppLayout>
);

export const OperatorLayout = ({ children }) => (
  <AppLayout>
    <div className="busgo-container busgo-layout">
      <Sidebar links={operatorLinks} title="Nhà xe" />
      <div>{children}</div>
    </div>
  </AppLayout>
);

export const AdminLayout = ({ children }) => (
  <AppLayout>
    <div className="busgo-container busgo-layout">
      <Sidebar links={adminLinks} title="Quản trị" />
      <div>{children}</div>
    </div>
  </AppLayout>
);

const layoutPropTypes = {
  children: PropTypes.node.isRequired,
};

AppLayout.propTypes = layoutPropTypes;
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
Sidebar.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
CustomerLayout.propTypes = layoutPropTypes;
OperatorLayout.propTypes = layoutPropTypes;
AdminLayout.propTypes = layoutPropTypes;
