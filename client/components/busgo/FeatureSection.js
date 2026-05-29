import React from 'react';

import { features } from './mockData';

const FeatureSection = () => (
  <section className="busgo-section">
    <div className="busgo-container">
      <div className="busgo-section-title">
        <div>
          <h2>Trải nghiệm đặt vé được tối ưu từ tìm chuyến đến nhận vé</h2>
          <p>
            Giao diện tập trung vào các quyết định quan trọng của hành khách:
            tuyến đường, giờ chạy, nhà xe, ghế ngồi, điểm đón/trả và tổng tiền.
          </p>
        </div>
      </div>

      <div className="busgo-features">
        {features.map((feature) => (
          <article className="busgo-feature" key={feature.title}>
            <div className="busgo-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;
