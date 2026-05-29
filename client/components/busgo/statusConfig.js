export const enumLabels = {
  user_role: {
    customer: 'Khách hàng',
    operator_staff: 'Nhà xe/Nhân viên',
    admin: 'Quản trị viên',
  },
  user_status: {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    banned: 'Bị cấm',
  },
  staff_role: {
    operator_admin: 'Quản trị nhà xe',
    trip_manager: 'Quản lý chuyến',
    ticket_staff: 'Nhân viên vé',
  },
  operator_status: {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    suspended: 'Tạm ngưng',
  },
  bus_status: {
    active: 'Đang hoạt động',
    maintenance: 'Bảo trì',
    inactive: 'Ngưng hoạt động',
  },
  bus_type: {
    seater: 'Ghế ngồi',
    sleeper: 'Giường nằm',
    limousine: 'Limousine',
  },
  station_type: {
    bus_station: 'Bến xe',
    office: 'Văn phòng',
    pickup_point: 'Điểm đón',
    dropoff_point: 'Điểm trả',
  },
  seat_type: {
    normal: 'Ghế thường',
    vip: 'VIP',
    sleeper: 'Giường nằm',
  },
  trip_status: {
    scheduled: 'Đã lên lịch',
    boarding: 'Đang lên xe',
    departed: 'Đã khởi hành',
    delayed: 'Bị trễ',
    arrived: 'Đã đến',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  },
  seat_status: {
    available: 'Còn trống',
    locked: 'Đang giữ',
    booked: 'Đã đặt',
  },
  booking_status: {
    pending_payment: 'Chờ thanh toán',
    paid: 'Đã thanh toán',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Hoàn thành',
    refunded: 'Đã hoàn tiền',
    expired: 'Hết hạn',
  },
  payment_method: {
    momo: 'Ví MoMo',
    zalopay: 'ZaloPay',
    cash: 'Tiền mặt',
    bank_transfer: 'Chuyển khoản ngân hàng',
  },
  payment_status: {
    pending: 'Chờ thanh toán',
    success: 'Thành công',
    failed: 'Thất bại',
    refunded: 'Đã hoàn tiền',
  },
  refund_status: {
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
  },
  ticket_status: {
    active: 'Còn hiệu lực',
    used: 'Đã sử dụng',
    cancelled: 'Đã hủy',
    expired: 'Hết hạn',
  },
  trip_event_type: {
    created: 'Tạo chuyến',
    delayed: 'Báo trễ',
    boarding: 'Lên xe',
    departed: 'Khởi hành',
    arrived: 'Đã đến',
    completed: 'Hoàn thành',
    cancelled: 'Hủy chuyến',
  },
};

const colorByStatus = {
  active: 'green',
  success: 'green',
  paid: 'green',
  confirmed: 'green',
  completed: 'green',
  approved: 'green',
  available: 'green',
  scheduled: 'blue',
  boarding: 'teal',
  departed: 'blue',
  arrived: 'green',
  pending: 'amber',
  pending_payment: 'amber',
  locked: 'amber',
  delayed: 'orange',
  maintenance: 'amber',
  inactive: 'gray',
  used: 'gray',
  expired: 'gray',
  booked: 'gray',
  failed: 'red',
  cancelled: 'red',
  rejected: 'red',
  banned: 'red',
  suspended: 'red',
  refunded: 'purple',
};

export const getEnumLabel = (domain, value) =>
  (enumLabels[domain] && enumLabels[domain][value]) || value;

export const getStatusMeta = (domain, value) => ({
  label: getEnumLabel(domain, value),
  color: colorByStatus[value] || 'gray',
});
