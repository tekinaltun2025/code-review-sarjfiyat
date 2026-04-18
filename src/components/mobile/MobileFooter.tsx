import { memo } from "react";
import { Link } from "react-router-dom";
import { BatteryCharging } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileFooter = memo(() => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--foreground))] text-white/60 px-4 py-8 mt-6">
      <div className="flex items-center gap-1.5 mb-4">
        <BatteryCharging className="h-5 w-5 text-teal-400" />
        <span className="text-base font-bold text-white">ŞarjFiyat</span>
      </div>
      <p className="text-xs leading-relaxed mb-6">
        {t("footer.description")}
      </p>
      <div className="grid grid-cols-2 gap-3 text-xs mb-6">
        <Link to="/m/sarj-aglari" className="hover:text-white transition-colors">{t("common.chargingNetworks")}</Link>
        <Link to="/m/kampanyalar" className="hover:text-white transition-colors">{t("common.campaigns")}</Link>
        <Link to="/m/ev-sarj-cihazlari" className="hover:text-white transition-colors">{t("common.homeChargers")}</Link>
        <Link to="/m/hakkimizda" className="hover:text-white transition-colors">{t("common.about")}</Link>
        <Link to="/m/gizlilik-politikasi" className="hover:text-white transition-colors">{t("common.privacyPolicy")}</Link>
      </div>
      <div className="border-t border-white/10 pt-4 text-xs text-center">
        © {currentYear} ŞarjFiyat. {t("footer.rights")}
      </div>
    </footer>
  );
});

MobileFooter.displayName = 'MobileFooter';

export default MobileFooter;
