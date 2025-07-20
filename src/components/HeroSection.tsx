
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import React from "react";

const HeroSection = React.memo(() => {
  return (
    <>
      {/* Reklam Alanı - Header'dan sonra sabit pozisyon */}
      <section className="sticky top-16 z-30 bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-1 text-center">
            <div className="bg-black rounded-lg p-0 border-2 border-dashed border-blue-200 relative overflow-hidden min-h-[150px] md:min-h-[200px] flex items-center justify-center">
              <div className="relative z-10 w-full max-w-4xl">
                <OptimizedImage
                  src="/lovable-uploads/6b168525-a204-45c7-bd83-29952eb5000e.png" 
                  alt="Togg Trugo - Türkiye'nin en geniş elektrikli araç şarj ağı. Yüksek performanslı DC hızlı şarj istasyonları ile elektrikli aracınızı hızla şarj edin." 
                  className="rounded-lg w-full h-auto object-contain"
                  priority={true}
                  width={932}
                  height={191}
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ana Hero Section - SEO Optimized */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Türkiye'deki Elektrikli Araç Şarj Fiyatlarını Karşılaştırın
              </h1>
              <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed">
                ZES, Eşarj, Trugo, Beefull ve diğer tüm şarj istasyonu operatörlerinin güncel AC ve DC şarj fiyatlarını karşılaştırın. 
                Elektrikli aracınız için en ekonomik şarj noktasını bulun ve tasarruf edin.
              </p>
              <div className="pt-2">
                <a 
                  href="#price-comparison" 
                  className="inline-flex items-center bg-white text-teal-600 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-lg text-sm md:text-base"
                  aria-label="Elektrikli araç şarj fiyatlarını karşılaştır"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Fiyatları Karşılaştır
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 space-y-4">
                <FeatureItem
                  icon={<BatteryCharging className="h-5 w-5 text-white" />}
                  title="Güncel Şarj Tarifeleri"
                  description="Tüm elektrikli araç şarj operatörlerinin en güncel AC ve DC şarj fiyatları"
                />
                
                <FeatureItem
                  icon={<MapPin className="h-5 w-5 text-white" />}
                  title="Şarj İstasyonu Haritası"
                  description="Türkiye genelindeki 5000+ elektrikli araç şarj noktası lokasyonları"
                />
                
                <FeatureItem
                  icon={<Car className="h-5 w-5 text-white" />}
                  title="15+ Şarj Operatörü"
                  description="ZES, Eşarj, Trugo, Beefull dahil tüm şarj ağları karşılaştırması"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = React.memo<FeatureItemProps>(({ icon, title, description }) => (
  <div className="flex items-start space-x-3">
    <div className="bg-teal-400 p-2 rounded-lg flex-shrink-0">
      {icon}
    </div>
    <div>
      <h2 className="font-semibold text-base lg:text-lg">{title}</h2>
      <p className="opacity-80 text-xs lg:text-sm">{description}</p>
    </div>
  </div>
));

HeroSection.displayName = 'HeroSection';
FeatureItem.displayName = 'FeatureItem';

export default HeroSection;
