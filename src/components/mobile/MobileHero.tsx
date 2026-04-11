import { memo } from "react";
import { Zap, TrendingDown, MapPin } from "lucide-react";

const MobileHero = memo(() => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 text-white px-3 py-3 rounded-xl mx-3 mt-3">
      <div className="relative z-10">
        <h1 className="text-sm font-bold leading-snug mb-0.5">
          Elektrikli Araç Şarj Fiyatları
        </h1>
        <p className="text-[11px] text-white/80 leading-relaxed mb-2">
          45+ şarj ağının güncel AC ve DC fiyatlarını karşılaştırın, en uygun istasyonu bulun.
        </p>

        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href="#price-comparison"
            className="inline-flex items-center gap-1 bg-white text-teal-700 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow active:scale-95 transition-transform"
          >
            <Zap className="h-2.5 w-2.5" />
            Fiyat Karşılaştır
          </a>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-medium">
            <TrendingDown className="h-2.5 w-2.5" />
            En Ucuz Bul
          </span>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-medium">
            <MapPin className="h-2.5 w-2.5" />
            5000+ İstasyon
          </span>
        </div>
      </div>
    </section>
  );
});

MobileHero.displayName = 'MobileHero';

export default MobileHero;
