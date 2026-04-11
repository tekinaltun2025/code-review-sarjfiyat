import { memo } from "react";
import { Zap, TrendingDown, MapPin } from "lucide-react";

const MobileHero = memo(() => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 text-white px-4 py-6 rounded-2xl mx-3 mt-3">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <h1 className="text-xl font-bold leading-tight mb-2">
          Elektrikli Araç Şarj Fiyatları
        </h1>
        <p className="text-sm text-white/80 leading-relaxed mb-4">
          45+ şarj ağının güncel AC ve DC fiyatlarını karşılaştırın, en uygun istasyonu bulun.
        </p>

        {/* Quick action chips */}
        <div className="flex flex-wrap gap-2">
          <a
            href="#price-comparison"
            className="inline-flex items-center gap-1.5 bg-white text-teal-700 px-3 py-2 rounded-full text-xs font-semibold shadow-lg active:scale-95 transition-transform"
          >
            <Zap className="h-3.5 w-3.5" />
            Fiyat Karşılaştır
          </a>
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-medium">
            <TrendingDown className="h-3.5 w-3.5" />
            En Ucuz Bul
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-medium">
            <MapPin className="h-3.5 w-3.5" />
            5000+ İstasyon
          </div>
        </div>
      </div>
    </section>
  );
});

MobileHero.displayName = 'MobileHero';

export default MobileHero;
