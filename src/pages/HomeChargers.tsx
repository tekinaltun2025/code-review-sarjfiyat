
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HomeChargersList from '../components/HomeChargersList';
import Footer from '../components/Footer';

const HomeChargers = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Ev Şarj Cihazları</h1>
          <p className="text-white text-center mt-4 max-w-3xl mx-auto">
            Elektrikli aracınızı evinizde şarj etmek için en iyi çözümler
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <HomeChargersList />
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

export default HomeChargers;
