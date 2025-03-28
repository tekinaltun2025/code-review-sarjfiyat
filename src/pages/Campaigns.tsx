
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampaignsList from "@/components/CampaignsList";

const Campaigns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Kampanyalar</h1>
            <p className="text-white text-center mt-4 max-w-3xl mx-auto">
              Elektrikli araç şarj istasyonu işletmecilerinin güncel kampanyaları ve özel teklifleri burada. 
              Avantajlı fırsatları kaçırmayın!
            </p>
          </div>
        </div>
        <CampaignsList />
      </main>
      <Footer />
    </div>
  );
};

export default Campaigns;
