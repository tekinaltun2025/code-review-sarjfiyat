import { memo } from "react";
import { Zap, TrendingDown, MapPin } from "lucide-react";

const MobileHero = memo(() => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 text-white px-4 py-4 rounded-xl mx-3 mt-3">
      <div className="relative z-10">
        <h1 className="text-base font-bold leading-snug mb-1">
          Elektrikli Araç Şarj Fiyatları
        </h1>
        <p className="text-xs text-white/80 leading-relaxed mb-3">
          45+ şarj ağının güncel AC ve DC fiyatlarını karşılaştırın, en uygun istasyonu bulun.
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="#price-comparison"
            className="inline-flex items-center gap-1 bg-white text-teal-700 px-2.5 py-1.5 rounded-full text-[11px] font-semibold shadow active:scale-95 transition-transform"
          >
            <Zap className="h-3 w-3" />
            Fiyat Karşılaştır
          </a>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-1.5 rounded-full text-[11px] font-medium">
            <TrendingDown className="h-3 w-3" />
            En Ucuz Bul
          </span>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-1.5 rounded-full text-[11px] font-medium">
            <MapPin className="h-3 w-3" />
            5000+ İstasyon
          </span>
        </div>
      </div>
    </section>
  );
});

MobileHero.displayName = 'MobileHero';

export default MobileHero;
