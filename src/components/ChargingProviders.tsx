
import { providers } from "@/data/providers";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ChargingProviders = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Şarj Operatörleri
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Türkiye'deki tüm elektrikli araç şarj ağları hakkında detaylı bilgi alın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div 
              key={provider.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gradient-to-r from-teal-500/10 to-blue-500/10 flex items-center justify-center p-6">
                <div className="h-24 max-w-full">
                  <img 
                    src={provider.logo} 
                    alt={`${provider.name} logo`}
                    className="h-full max-w-full object-contain"
                  />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AC Şarj:</span>
                    <span className="font-medium text-gray-900">{provider.acPrice.toFixed(2)} ₺/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DC Şarj:</span>
                    <span className="font-medium text-gray-900">{provider.dcPrice.toFixed(2)} ₺/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hızlı DC Şarj:</span>
                    <span className="font-medium text-gray-900">{provider.fastDcPrice.toFixed(2)} ₺/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Üyelik:</span>
                    <span className="font-medium text-gray-900">
                      {provider.membershipFee === null ? 'Ücretsiz' : `${provider.membershipFee.toFixed(2)} ₺`}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <Link to={`/`} className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                    Detaylı Bilgi
                  </Link>
                  <a
                    href={provider.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <span className="mr-1">Websitesi</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChargingProviders;
