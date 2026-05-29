import React from 'react';

import { DashboardMetricCard, DataTable, PageHeader, StatusBadge } from './AppComponents';
import { AdminLayout } from './AppLayouts';
import {
  bookings,
  busTrips,
  formatCurrency,
  operators,
  payments,
  refunds,
  users,
} from './domainMockData';
import { getEnumLabel } from './statusConfig';

export const AdminDashboardPage = () => {
  const paidRevenue = payments
    .filter((payment) => payment.payment_status === 'success')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <AdminLayout>
      <PageHeader
        description="Tổng quan toàn hệ thống theo người dùng, nhà xe, chuyến xe, thanh toán và hoàn tiền."
        title="Tổng quan hệ thống"
      />
      <div className="busgo-grid-3">
        <DashboardMetricCard label="Doanh thu đã thanh toán" value={formatCurrency(paidRevenue)} />
        <DashboardMetricCard label="Người dùng" value={users.length} />
        <DashboardMetricCard label="Nhà xe" value={operators.length} />
        <DashboardMetricCard label="Chuyến xe" value={busTrips.length} />
        <DashboardMetricCard label="Đặt vé" value={bookings.length} />
        <DashboardMetricCard label="Hoàn tiền" value={refunds.length} />
      </div>
    </AdminLayout>
  );
};

export const AdminUsersPage = () => (
  <AdminLayout>
    <PageHeader
      actions={<button className="busgo-btn busgo-btn-accent" type="button">Tạo người dùng</button>}
      description="Quản lý người dùng theo vai trò và trạng thái."
      title="Quản lý người dùng"
    />
    <DataTable
      columns={[
        { key: 'full_name', label: 'Họ tên' },
        { key: 'email', label: 'Email' },
        { key: 'phone_number', label: 'Số điện thoại' },
        { key: 'user_role', label: 'Vai trò', render: (row) => getEnumLabel('user_role', row.user_role) },
        { key: 'user_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="user_status" value={row.user_status} /> },
        {
          key: 'actions',
          label: 'Thao tác',
          render: () => (
            <div className="busgo-inline-actions">
              <button className="busgo-btn busgo-btn-soft" type="button">Sửa</button>
              <button className="busgo-btn busgo-btn-outline" type="button">Khóa</button>
            </div>
          ),
        },
      ]}
      rows={users}
    />
  </AdminLayout>
);

export const AdminOperatorsPage = () => (
  <AdminLayout>
    <PageHeader
      actions={<button className="busgo-btn busgo-btn-accent" type="button">Thêm nhà xe</button>}
      description="Quản lý nhà xe theo trạng thái nhà xe."
      title="Quản lý nhà xe"
    />
    <DataTable
      columns={[
        { key: 'name', label: 'Tên nhà xe' },
        { key: 'phone_number', label: 'Số điện thoại' },
        { key: 'address', label: 'Địa chỉ' },
        { key: 'operator_status', label: 'Trạng thái', render: (row) => <StatusBadge domain="operator_status" value={row.operator_status} /> },
        {
          key: 'actions',
          label: 'Thao tác',
          render: () => (
            <div className="busgo-inline-actions">
              <button className="busgo-btn busgo-btn-soft" type="button">Sửa</button>
              <button className="busgo-btn busgo-btn-outline" type="button">Tạm ngưng</button>
            </div>
          ),
        },
      ]}
      rows={operators}
    />
  </AdminLayout>
);
