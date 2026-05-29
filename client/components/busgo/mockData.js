export const stats = [
  { value: '1.200+', label: 'Tuyến xe toàn quốc' },
  { value: '98%', label: 'Vé xác nhận tức thì' },
  { value: '24/7', label: 'Hỗ trợ hành khách' },
];

export const features = [
  {
    icon: 'LC',
    title: 'Lọc chuyến linh hoạt',
    description:
      'Lọc theo giờ đi, giá vé, loại xe, điểm đón, đánh giá và tiện ích.',
  },
  {
    icon: 'SG',
    title: 'Chọn ghế trực quan',
    description:
      'Bản đồ ghế phân biệt ghế trống, đã đặt, VIP và ghế đang chọn.',
  },
  {
    icon: 'DD',
    title: 'Điểm đón/trả rõ ràng',
    description:
      'Hiển thị điểm gần nhất, địa chỉ cụ thể và thời gian có mặt dự kiến.',
  },
  {
    icon: 'QR',
    title: 'Vé điện tử',
    description:
      'Nhận mã QR qua email/SMS, tra cứu vé và hủy vé theo chính sách.',
  },
];

export const trips = [
  {
    id: 'pt-2230',
    logo: 'PT',
    logoStyle: 'teal',
    operator: 'Phương Trang Express',
    vehicle: 'Limousine 22 phòng',
    seatsLeft: 7,
    amenity: 'Đón tận nơi',
    price: 280000,
    departTime: '22:30',
    arriveTime: '05:00',
    from: 'TP.HCM',
    to: 'Đà Lạt',
    duration: '6h 30m',
    rating: '4.8',
    reviews: '1.204 đánh giá',
    policy: 'Chính sách hủy linh hoạt',
  },
  {
    id: 'lx-2315',
    logo: 'LX',
    logoStyle: 'orange',
    operator: 'Lâm Đồng Luxury',
    vehicle: 'Giường nằm 34 chỗ',
    seatsLeft: 14,
    amenity: 'Trung chuyển',
    price: 240000,
    departTime: '23:15',
    arriveTime: '06:25',
    from: 'TP.HCM',
    to: 'Đà Lạt',
    duration: '7h 10m',
    rating: '4.6',
    reviews: '842 đánh giá',
    policy: 'Không hoàn vé sau 2h',
  },
  {
    id: 'sg-2000',
    logo: 'SG',
    logoStyle: 'blue',
    operator: 'Sài Gòn Tourist Bus',
    vehicle: 'Ghế ngồi VIP 28 chỗ',
    seatsLeft: 5,
    amenity: 'Wifi',
    price: 220000,
    departTime: '20:00',
    arriveTime: '03:45',
    from: 'TP.HCM',
    to: 'Đà Lạt',
    duration: '7h 45m',
    rating: '4.5',
    reviews: '533 đánh giá',
    policy: 'Giá tốt hôm nay',
  },
];

export const seatDecks = [
  {
    title: 'Tầng dưới',
    count: '11 ghế',
    seats: [
      { code: 'A1', status: 'booked' },
      { code: 'A2' },
      { code: 'A3' },
      { code: 'A4' },
      { code: 'A5', status: 'booked' },
      { code: 'A6', status: 'vip' },
      { code: 'A7' },
      { code: 'A8' },
      { code: 'A9' },
    ],
  },
  {
    title: 'Tầng trên',
    count: '11 ghế',
    seats: [
      { code: 'B1' },
      { code: 'B2' },
      { code: 'B3', status: 'booked' },
      { code: 'B4', status: 'vip' },
      { code: 'B5' },
      { code: 'B6' },
      { code: 'B7', status: 'booked' },
      { code: 'B8' },
      { code: 'B9' },
    ],
  },
];

export const steps = [
  {
    title: 'Tìm chuyến',
    description:
      'Chọn điểm đi, điểm đến, ngày đi, số khách và khứ hồi nếu có.',
  },
  {
    title: 'Chọn xe',
    description:
      'So sánh giá, giờ khởi hành, loại xe, đánh giá và chính sách hủy.',
  },
  {
    title: 'Chọn ghế',
    description:
      'Chọn ghế, tầng xe, điểm đón/trả và kiểm tra tổng tiền.',
  },
  {
    title: 'Thanh toán',
    description:
      'Nhập thông tin, thanh toán và nhận vé điện tử QR qua email/SMS.',
  },
];

export const payments = [
  {
    icon: 'M',
    title: 'Ví MoMo',
    description: 'Xác nhận nhanh bằng OTP',
    active: true,
  },
  {
    icon: 'NH',
    title: 'Chuyển khoản ngân hàng',
    description: 'Tự động đối soát',
  },
  {
    icon: 'ATM',
    title: 'Thẻ ATM / Visa',
    description: 'Hỗ trợ thẻ nội địa và quốc tế',
  },
  {
    icon: 'TM',
    title: 'Thanh toán tại nhà xe',
    description: 'Tùy chính sách từng chuyến',
  },
];

export const dashboardRows = [
  {
    route: 'TP.HCM → Đà Lạt',
    time: '22:30',
    seats: '15/22',
    revenue: '4.200.000đ',
    status: 'Đang bán',
    statusType: 'ok',
  },
  {
    route: 'Đà Lạt → TP.HCM',
    time: '08:00',
    seats: '22/22',
    revenue: '6.160.000đ',
    status: 'Hết ghế',
    statusType: 'wait',
  },
  {
    route: 'TP.HCM → Nha Trang',
    time: '21:00',
    seats: '9/34',
    revenue: '2.430.000đ',
    status: 'Đang bán',
    statusType: 'ok',
  },
  {
    route: 'TP.HCM → Cần Thơ',
    time: '14:30',
    seats: '0/28',
    revenue: '0đ',
    status: 'Tạm khóa',
    statusType: 'cancel',
  },
];

export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN').format(value) + 'đ';
