import React, { useState } from 'react';

import BusGoStyles from './BusGoStyles';
import CheckoutSection from './CheckoutSection';
import FeatureSection from './FeatureSection';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';
import OperatorDashboard from './OperatorDashboard';
import SearchBox from './SearchBox';
import TripList from './TripList';
import { trips } from './mockData';

const BusGoPage = () => {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [selectedSeats, setSelectedSeats] = useState(['A2', 'A8']);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleSeatToggle = (seatCode) => {
    setSelectedSeats((currentSeats) => {
      if (currentSeats.includes(seatCode)) {
        return currentSeats.filter((code) => code !== seatCode);
      }

      return [...currentSeats, seatCode];
    });
  };

  return (
    <div className="busgo-page">
      <BusGoStyles />
      <div className="busgo-topbar">
        <div className="busgo-container">
          <Header />
          <HeroSection />
        </div>
      </div>
      <main>
        <SearchBox />
        <FeatureSection />
        <TripList
          onSeatToggle={handleSeatToggle}
          onTripSelect={handleTripSelect}
          selectedSeats={selectedSeats}
          selectedTrip={selectedTrip}
        />
        <CheckoutSection selectedSeats={selectedSeats} selectedTrip={selectedTrip} />
        <OperatorDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default BusGoPage;
