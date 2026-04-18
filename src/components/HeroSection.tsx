
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
  <div className="flex items-start space-x-3">
    <div className="bg-teal-400 p-2 rounded-lg flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-base lg:text-lg">{title}</h3>
      <p className="opacity-80 text-xs lg:text-sm">{description}</p>
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

      <section className="bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-900 dark:via-slate-900 dark:to-slate-950 text-white py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {t("hero.h1")}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 leading-relaxed">
                <Trans i18nKey="hero.description" components={{ strong: <strong /> }} />
              </p>
              <div className="pt-1 sm:pt-2">
                <a
                  href="#price-comparison"
                  className="inline-flex items-center bg-white text-teal-600 px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-lg text-xs sm:text-sm md:text-base"
                  aria-label={t("hero.ctaCompareAria")}
                >
                  <Zap className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {t("hero.ctaCompare")}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 space-y-4">
                <h2 className="sr-only">{t("hero.platformFeatures")}</h2>
                <FeatureItem
                  icon={<BatteryCharging className="h-5 w-5 text-white" />}
                  title={t("hero.feature1Title")}
                  description={t("hero.feature1Desc")}
                />
                <FeatureItem
                  icon={<MapPin className="h-5 w-5 text-white" />}
                  title={t("hero.feature2Title")}
                  description={t("hero.feature2Desc")}
                />
                <FeatureItem
                  icon={<Car className="h-5 w-5 text-white" />}
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
