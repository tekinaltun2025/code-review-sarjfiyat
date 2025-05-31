
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Reklam Alanı - En üstte */}
      <section className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-3 text-center">
            <div 
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-dashed border-blue-200 relative bg-cover bg-center min-h-[60px] flex items-center justify-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
              }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold mb-1">Reklam Alanı</h3>
                <p className="mb-1 text-xs">Bu alan reklam içeriği için ayrılmıştır</p>
                <div className="text-xs opacity-90">
                  Banner / Video / İçerik Reklamı
                </div>
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
