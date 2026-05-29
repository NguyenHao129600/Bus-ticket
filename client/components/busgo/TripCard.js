import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from './mockData';

const TripCard = ({ trip, active, onSelect }) => (
  <article className="busgo-trip-card">
    <div className="busgo-trip-top">
      <div className="busgo-operator">
        <div className={`busgo-operator-logo ${trip.logoStyle}`}>{trip.logo}</div>
        <div>
          <h3>{trip.operator}</h3>
          <div className="busgo-meta">
            <span>{trip.vehicle}</span>
            <span>•</span>
            <span>Còn {trip.seatsLeft} ghế</span>
            <span>•</span>
            <span>{trip.amenity}</span>
          </div>
        </div>
      </div>
      <div className="busgo-price">
        <strong>{formatCurrency(trip.price)}</strong>
        <small>/ khách</small>
      </div>
    </div>

    <div className="busgo-timeline">
      <div className="busgo-time">
        <strong>{trip.departTime}</strong>
        <small>{trip.from}</small>
      </div>
      <div className="busgo-line">
        <span>{trip.duration}</span>
      </div>
      <div className="busgo-time end">
        <strong>{trip.arriveTime}</strong>
        <small>{trip.to}</small>
      </div>
    </div>

    <div className="busgo-trip-actions">
      <div className="busgo-meta">
        <span className="busgo-rating">{trip.rating} sao</span>
        <span>{trip.reviews}</span>
        <span>{trip.policy}</span>
      </div>
      <button
        className={`busgo-btn ${active ? 'busgo-btn-primary' : 'busgo-btn-soft'}`}
        onClick={() => onSelect(trip)}
        type="button"
      >
        {active ? 'Đang chọn' : 'Xem ghế'}
      </button>
    </div>
  </article>
);

TripCard.propTypes = {
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
};

export default TripCard;
