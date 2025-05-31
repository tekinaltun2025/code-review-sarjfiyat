
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
    <div className="flex min-h-screen">
      {/* Sol Reklam Alanı */}
      <div className="hidden xl:block w-32 flex-shrink-0">
        <div className="sticky top-4 space-y-4 p-2">
          <div className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200">
            <div className="transform -rotate-90 whitespace-nowrap">
              <span className="text-sm text-gray-600 font-medium">Reklam Alanı</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200">
            <div className="transform -rotate-90 whitespace-nowrap">
              <span className="text-sm text-gray-600 font-medium">Reklam Alanı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <main className="flex-grow">
        {!isInPanel && <HeroSection />}
        <ChargingStats />
        <PriceTable />
        <MapSection />
        <ChargingProviders />
      </main>

      {/* Sağ Reklam Alanı */}
      <div className="hidden xl:block w-32 flex-shrink-0">
        <div className="sticky top-4 space-y-4 p-2">
          <div className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200">
            <div className="transform -rotate-90 whitespace-nowrap">
              <span className="text-sm text-gray-600 font-medium">Reklam Alanı</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200">
            <div className="transform -rotate-90 whitespace-nowrap">
              <span className="text-sm text-gray-600 font-medium">Reklam Alanı</span>
            </div>
          </div>
        </div>
      </div>
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
        <ChargingProviders />
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
