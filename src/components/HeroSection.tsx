
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Elektrikli Araç Şarj Fiyatlarını Karşılaştırın
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Türkiye'deki tüm şarj istasyonu operatörlerinin güncel fiyatlarını karşılaştırın, 
              sizin için en ekonomik şarj noktasını bulun.
            </p>
            <div className="pt-4">
              <a 
                href="#price-comparison" 
                className="inline-flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Fiyatları Karşılaştır
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-400 p-3 rounded-lg">
                  <BatteryCharging className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Güncel Tarifeler</h3>
                  <p className="opacity-80">Tüm operatörlerin en güncel şarj fiyatları</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-400 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Şarj İstasyon Lokasyonları</h3>
                  <p className="opacity-80">Türkiye genelindeki tüm şarj noktaları</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal-400 p-3 rounded-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Tüm Şarj Ağları</h3>
                  <p className="opacity-80">Türkiye'deki tüm şarj operatörleri karşılaştırması</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
