import { memo } from "react";
import { Link } from "react-router-dom";
import { BatteryCharging } from "lucide-react";

const MobileFooter = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--foreground))] text-white/60 px-4 py-8 mt-6">
      <div className="flex items-center gap-1.5 mb-4">
        <BatteryCharging className="h-5 w-5 text-teal-400" />
        <span className="text-base font-bold text-white">ŞarjFiyat</span>
      </div>
      <p className="text-xs leading-relaxed mb-6">
        Türkiye'deki elektrikli araç şarj operatörlerinin fiyatlarını karşılaştırmanıza yardımcı olan bağımsız bir platformdur.
      </p>
      <div className="grid grid-cols-2 gap-3 text-xs mb-6">
        <Link to="/m/sarj-aglari" className="hover:text-white transition-colors">Şarj Ağları</Link>
        <Link to="/m/kampanyalar" className="hover:text-white transition-colors">Kampanyalar</Link>
        <Link to="/m/ev-sarj-cihazlari" className="hover:text-white transition-colors">Ev Şarj Cihazları</Link>
        <Link to="/m/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
      </div>
      <div className="border-t border-white/10 pt-4 text-xs text-center">
        © {currentYear} ŞarjFiyat. Tüm hakları saklıdır.
      </div>
    </footer>
  );
});

MobileFooter.displayName = 'MobileFooter';

export default MobileFooter;
