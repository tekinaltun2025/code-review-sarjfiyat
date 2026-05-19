
import React, { useEffect, useRef } from "react";
import { BatteryCharging, Zap, MapPin, Car } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

const AdBlock = React.memo(() => {
  const adRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      loaded.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5965663978373204"
        data-ad-slot="6056870631"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
});
AdBlock.displayName = 'AdBlock';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem = React.memo<FeatureItemProps>(({ icon, title, description }) => (
  <div className="flex items-start space-x-2">
    <div className="bg-teal-400 p-1.5 rounded-md flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-xs lg:text-sm leading-tight">{title}</h3>
      <p className="opacity-80 text-[10px] lg:text-xs leading-snug">{description}</p>
    </div>
  </div>
));
FeatureItem.displayName = 'FeatureItem';

const HeroSection = React.memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <section className="sticky top-14 sm:top-16 z-30 bg-muted py-1 sm:py-2">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-center">
            <AdBlock />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-900 dark:via-slate-900 dark:to-slate-950 text-white py-3 sm:py-4 md:py-5">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 items-center">
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-lg md:text-xl font-bold leading-tight">
                {t("hero.h1")}
              </h1>
              <p className="text-[11px] sm:text-xs md:text-sm opacity-90 leading-snug">
                <Trans i18nKey="hero.description" components={{ strong: <strong /> }} />
              </p>
              <div className="pt-0.5">
                <a
                  href="#price-comparison"
                  className="inline-flex items-center bg-white text-teal-600 px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-md font-medium hover:bg-teal-50 transition-colors shadow text-[11px] sm:text-xs md:text-sm"
                  aria-label={t("hero.ctaCompareAria")}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  {t("hero.ctaCompare")}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 lg:p-3 space-y-1.5">
                <h2 className="sr-only">{t("hero.platformFeatures")}</h2>
                <FeatureItem
                  icon={<BatteryCharging className="h-3.5 w-3.5 text-white" />}
                  title={t("hero.feature1Title")}
                  description={t("hero.feature1Desc")}
                />
                <FeatureItem
                  icon={<MapPin className="h-3.5 w-3.5 text-white" />}
                  title={t("hero.feature2Title")}
                  description={t("hero.feature2Desc")}
                />
                <FeatureItem
                  icon={<Car className="h-3.5 w-3.5 text-white" />}
                  title={t("hero.feature3Title")}
                  description={t("hero.feature3Desc")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
HeroSection.displayName = 'HeroSection';

export default HeroSection;
