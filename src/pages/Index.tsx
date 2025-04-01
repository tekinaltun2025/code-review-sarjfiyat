
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChargingStats from '../components/ChargingStats';
import PriceTable from '../components/PriceTable';
import MapSection from '../components/MapSection';
import ChargingProviders from '../components/ChargingProviders';
import Footer from '../components/Footer';

const Index = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <main className="flex-grow">
      {!isInPanel && <HeroSection />}
      <ChargingStats />
      <PriceTable />
      <MapSection />
      <ChargingProviders />
    </main>
  );
  
  // Panel içinde gösteriliyorsa, sadece içeriği döndür
  if (isInPanel) {
    return content;
  }
  
  // Normal sayfada gösteriliyorsa, header ve footer ile birlikte göster
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {content}
      <Footer />
    </div>
  );
};

export default Index;
