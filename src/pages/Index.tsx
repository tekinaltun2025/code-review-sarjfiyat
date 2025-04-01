
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
      <section id="price-comparison" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Şarj Ağı Fiyat Karşılaştırması
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Türkiye'deki tüm elektrikli araç şarj operatörlerinin güncel fiyatlarını karşılaştırın
          </p>
          <PriceTable />
        </div>
      </section>
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
