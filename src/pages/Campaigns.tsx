
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CampaignsList from '../components/CampaignsList';
import Footer from '../components/Footer';

const Campaigns = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Kampanyalar</h1>
          <p className="text-white text-center mt-4 max-w-3xl mx-auto">
            Elektrikli araç şarj kampanyalarından faydalanarak tasarruf edin
          </p>
        </div>
      </div>
      
      <CampaignsList />
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

export default Campaigns;
