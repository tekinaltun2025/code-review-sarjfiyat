
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Reklam Alanı - Header'dan sonra sabit pozisyon */}
      <section className="sticky top-16 z-30 bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-2 border-2 border-dashed border-blue-200 relative overflow-hidden min-h-[150px] flex items-center justify-center">
              <div className="relative z-10 w-full h-full">
                <img 
                  src="/lovable-uploads/2378dcfc-a04a-4497-a230-8566ecdd0521.png" 
                  alt="Togg Trugo - Yüksek Performanslı ve Geniş Kapsamlı Şarj Ağı" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ana Hero Section - Daha ince yapıldı */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Elektrikli Araç Şarj Fiyatlarını Karşılaştırın
              </h1>
              <p className="text-base md:text-lg opacity-90">
                Türkiye'deki tüm şarj istasyonu operatörlerinin güncel fiyatlarını karşılaştırın, 
                sizin için en ekonomik şarj noktasını bulun.
              </p>
              <div className="pt-2">
                <a 
                  href="#price-comparison" 
                  className="inline-flex items-center bg-white text-teal-600 px-5 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-lg"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Fiyatları Karşılaştır
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-teal-400 p-2 rounded-lg">
                    <BatteryCharging className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Güncel Tarifeler</h3>
                    <p className="opacity-80 text-sm">Tüm operatörlerin en güncel şarj fiyatları</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-400 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Şarj İstasyon Lokasyonları</h3>
                    <p className="opacity-80 text-sm">Türkiye genelindeki tüm şarj noktaları</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-teal-400 p-2 rounded-lg">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Tüm Şarj Ağları</h3>
                    <p className="opacity-80 text-sm">Türkiye'deki tüm şarj operatörleri karşılaştırması</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
