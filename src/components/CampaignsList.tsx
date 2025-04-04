
import React from 'react';

const CampaignsList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
        <div className="bg-red-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mobilden Akbanklı olanlara şarj ödemelerinde 7.500 TL'ye varan chip-para
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-4">
              1050TRUMORE75
            </p>
            <p className="text-lg">
              davet koduyla mobilden Akbanklı olun, 3 ay boyunca elektrikli araç şarj ödemelerinizde aylık 2.500 TL'ye kadar chip-para kazanın.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-full overflow-hidden border-4 border-white w-64 h-64 md:w-80 md:h-80">
              <img 
                src="/lovable-uploads/69dcf742-321c-4bd1-ba3a-dc90801201c7.png" 
                alt="Akbank elektrikli araç şarj kampanyası" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsList;
