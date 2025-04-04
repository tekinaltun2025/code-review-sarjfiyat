
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MapSection from '../components/MapSection';
import ChargingProviders from '../components/ChargingProviders';
import Footer from '../components/Footer';
import { Map, MapPin } from "lucide-react";

const SarjAglari = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center">
            <Map className="mr-2 text-teal-500" /> Şarj Ağları
          </h1>
          <p className="text-lg text-gray-600">
            Türkiye genelindeki elektrikli araç şarj istasyonlarını keşfedin.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="mr-2 text-teal-500" /> Şarj İstasyonları Haritası
          </h2>
          <MapSection />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Şarj Ağları Karşılaştırması</h2>
          <ChargingProviders />
        </div>
      </div>
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

export default SarjAglari;
