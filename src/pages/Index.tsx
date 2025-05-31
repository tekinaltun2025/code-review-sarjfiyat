
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChargingStats from '../components/ChargingStats';
import PriceTable from '../components/PriceTable';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const Index = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <div className="flex min-h-screen justify-center max-w-[1400px] mx-auto">
      {/* Ana İçerik - Ortalanmış */}
      <main className="flex-grow max-w-5xl px-6">
        {!isInPanel && <HeroSection />}
        <ChargingStats />
        <PriceTable />
        <MapSection />
      </main>
    </div>
  );
  
  // Panel içinde gösteriliyorsa, sadece ana içeriği döndür
  if (isInPanel) {
    return (
      <main className="flex-grow">
        {!isInPanel && <HeroSection />}
        <ChargingStats />
        <PriceTable />
        <MapSection />
      </main>
    );
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
