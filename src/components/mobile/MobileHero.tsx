import { memo } from "react";
import { Zap, TrendingDown, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileHero = memo(() => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 text-white px-3 py-3 rounded-xl mx-3 mt-3">
      <div className="relative z-10">
        <h1 className="text-sm font-bold leading-snug mb-0.5">
          {t("mobileHero.title")}
        </h1>
        <p className="text-[11px] text-white/80 leading-relaxed mb-2">
          {t("mobileHero.subtitle")}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap">
          <a
            href="#price-comparison"
            className="inline-flex items-center gap-1 bg-white text-teal-700 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow active:scale-95 transition-transform"
          >
            <Zap className="h-2.5 w-2.5" />
            {t("mobileHero.comparePrices")}
          </a>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-medium">
            <TrendingDown className="h-2.5 w-2.5" />
            {t("mobileHero.findCheapest")}
          </span>
          <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-medium">
            <MapPin className="h-2.5 w-2.5" />
            {t("mobileHero.stations")}
          </span>
        </div>
      </div>
    </section>
  );
});

MobileHero.displayName = 'MobileHero';

export default MobileHero;
