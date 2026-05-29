import React from 'react';
import PropTypes from 'prop-types';

import TicketPreview from './TicketPreview';
import { formatCurrency, payments, steps } from './mockData';

const CheckoutSection = ({ selectedSeats, selectedTrip }) => {
  const total = selectedSeats.length * selectedTrip.price;

  return (
    <>
      <section className="busgo-section">
        <div className="busgo-container">
          <div className="busgo-section-title">
            <div>
              <h2>Quy trình đặt vé đề xuất</h2>
              <p>
                Các bước đủ đơn giản cho người dùng mới nhưng vẫn rõ ràng để
                tránh nhầm ghế, nhầm điểm đón hoặc thanh toán sai.
              </p>
            </div>
          </div>
          <div className="busgo-steps">
            {steps.map((step, index) => (
              <article className="busgo-step" key={step.title}>
                <div className="busgo-step-num">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="busgo-section" id="checkout">
        <div className="busgo-container">
          <div className="busgo-section-title">
            <div>
              <h2>Thanh toán và vé điện tử</h2>
              <p>
                Thiết kế tách rõ thông tin hành khách, phương thức thanh toán
                và bản xem trước vé để tăng độ tin cậy trước khi trả tiền.
              </p>
            </div>
          </div>

          <div className="busgo-checkout">
            <section className="busgo-panel">
              <div className="busgo-panel-head">
                <h3>Thông tin đặt vé</h3>
                <span className="busgo-chip active">Còn 09:42 để thanh toán</span>
              </div>
              <div className="busgo-panel-body">
                <div className="busgo-form-grid">
                  <div className="busgo-input">
                    <label>Họ và tên</label>
                    <span>Nguyễn Văn An</span>
                  </div>
                  <div className="busgo-input">
                    <label>Số điện thoại</label>
                    <span>0901 234 567</span>
                  </div>
                  <div className="busgo-input full">
                    <label>Thư điện tử nhận vé</label>
                    <span>an.nguyen@example.com</span>
                  </div>
                  <div className="busgo-input">
                    <label>Điểm đón</label>
                    <span>Bến xe Miền Đông mới</span>
                  </div>
                  <div className="busgo-input">
                    <label>Điểm trả</label>
                    <span>Đà Lạt Center</span>
                  </div>
                </div>

                <h3 className="busgo-payment-title">Phương thức thanh toán</h3>
                <div className="busgo-payment-methods">
                  {payments.map((payment) => (
                    <div
                      className={`busgo-payment ${payment.active ? 'active' : ''}`}
                      key={payment.title}
                    >
                      <div className="busgo-payment-left">
                        <div className="busgo-pay-icon">{payment.icon}</div>
                        <div>
                          <strong>{payment.title}</strong>
                          <br />
                          <small>{payment.description}</small>
                        </div>
                      </div>
                      <span>{payment.active ? '✓' : ''}</span>
                    </div>
                  ))}
                </div>

                <button className="busgo-btn busgo-btn-accent busgo-full" type="button">
                  Thanh toán {formatCurrency(total)}
                </button>
              </div>
            </section>

            <TicketPreview selectedSeats={selectedSeats} selectedTrip={selectedTrip} />
          </div>
        </div>
      </section>
    </>
  );
};

CheckoutSection.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
  selectedTrip: PropTypes.object.isRequired,
};

export default CheckoutSection;
