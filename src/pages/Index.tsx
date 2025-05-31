
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
      {/* Sol Reklam Alanı - Ana içeriğe yakın */}
      <div className="hidden xl:block w-32 flex-shrink-0">
        <div className="sticky top-4 space-y-4 p-2">
          <div className="bg-white rounded-lg shadow-md p-2 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200 relative overflow-hidden">
            <img 
              src="/lovable-uploads/f115850b-eabd-46be-b611-c662fe0da189.png" 
              alt="ZES - Yolların Yeni, Temiz, Hızlı Enerjisi" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div 
            className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div className="transform -rotate-90 whitespace-nowrap relative z-10">
              <span className="text-lg text-white font-bold">Reklam Alanı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik - Ortalanmış */}
      <main className="flex-grow max-w-5xl px-6">
        {!isInPanel && <HeroSection />}
        <ChargingStats />
        <PriceTable />
        <MapSection />
      </main>

      {/* Sağ Reklam Alanı - Ana içeriğe yakın */}
      <div className="hidden xl:block w-32 flex-shrink-0">
        <div className="sticky top-4 space-y-4 p-2">
          <div 
            className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div className="transform -rotate-90 whitespace-nowrap relative z-10">
              <span className="text-lg text-white font-bold">Reklam Alanı</span>
            </div>
          </div>
          <div 
            className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div className="transform -rotate-90 whitespace-nowrap relative z-10">
              <span className="text-lg text-white font-bold">Reklam Alanı</span>
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
