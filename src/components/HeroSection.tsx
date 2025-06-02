
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Reklam Alanı - Header'dan sonra sabit pozisyon */}
      <section className="sticky top-16 z-30 bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-1 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-0 border-2 border-dashed border-blue-200 relative overflow-hidden min-h-[200px] flex items-center justify-center">
              <div className="relative z-10 w-full h-full">
                <img 
                  src="/lovable-uploads/2378dcfc-a04a-4497-a230-8566ecdd0521.png" 
                  alt="Togg Trugo - Türkiye'nin en geniş elektrikli araç şarj ağı. Yüksek performanslı DC hızlı şarj istasyonları ile elektrikli aracınızı hızla şarj edin." 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ana Hero Section - SEO Optimized */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Türkiye'deki Elektrikli Araç Şarj Fiyatlarını Karşılaştırın
              </h1>
              <p className="text-base md:text-lg opacity-90">
                ZES, Eşarj, Trugo, Beefull ve diğer tüm şarj istasyonu operatörlerinin güncel AC ve DC şarj fiyatlarını karşılaştırın. 
                Elektrikli aracınız için en ekonomik şarj noktasını bulun ve tasarruf edin.
              </p>
              <div className="pt-2">
                <a 
                  href="#price-comparison" 
                  className="inline-flex items-center bg-white text-teal-600 px-5 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-lg"
                  aria-label="Elektrikli araç şarj fiyatlarını karşılaştır"
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
                    <BatteryCharging className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Güncel Şarj Tarifeleri</h2>
                    <p className="opacity-80 text-sm">Tüm elektrikli araç şarj operatörlerinin en güncel AC ve DC şarj fiyatları</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-400 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Şarj İstasyonu Haritası</h2>
                    <p className="opacity-80 text-sm">Türkiye genelindeki 5000+ elektrikli araç şarj noktası lokasyonları</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-teal-400 p-2 rounded-lg">
                    <Car className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">15+ Şarj Operatörü</h2>
                    <p className="opacity-80 text-sm">ZES, Eşarj, Trugo, Beefull dahil tüm şarj ağları karşılaştırması</p>
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
