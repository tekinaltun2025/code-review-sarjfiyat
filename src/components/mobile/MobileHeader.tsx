import { BatteryCharging, Menu, X } from "lucide-react";
import { useState, useCallback, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";

const useNavItems = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      { name: t("common.home"), path: "/m" },
      { name: t("common.chargingNetworks"), path: "/m/sarj-aglari" },
      { name: t("common.campaigns"), path: "/m/kampanyalar" },
      { name: t("common.homeChargers"), path: "/m/ev-sarj-cihazlari" },
      { name: t("common.survey"), path: "/m/anket" },
      { name: t("common.about"), path: "/m/hakkimizda" },
    ],
    [t]
  );
};

const MobileHeader = memo(() => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const items = useNavItems();

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-background border-b border-border"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between px-3 h-14">
          <Link to="/m" className="flex items-center gap-1.5">
            <BatteryCharging className="h-6 w-6 text-teal-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              ŞarjFiyat
            </span>
          </Link>

          <div className="flex items-center gap-0.5">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && createPortal(
        <div
          className="fixed inset-0 top-14 bg-background"
          style={{ zIndex: 9999 }}
        >
          <nav className="flex flex-col p-6 gap-1">
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-teal-500/10 text-teal-600"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>,
        document.body
      )}
    </>
  );
});
MobileHeader.displayName = 'MobileHeader';

export default MobileHeader;
