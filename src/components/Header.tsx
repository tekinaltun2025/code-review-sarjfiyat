import { BatteryCharging, Menu, X } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const useNavItems = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      { name: t("common.home"), path: "/" },
      { name: t("common.chargingNetworks"), path: "/sarj-aglari" },
      { name: t("common.campaigns"), path: "/kampanyalar" },
      { name: t("common.homeChargers"), path: "/ev-sarj-cihazlari" },
      { name: t("common.survey"), path: "/anket" },
      { name: t("common.about"), path: "/hakkimizda" },
    ],
    [t]
  );
};

const DesktopNavigation = memo(() => {
  const items = useNavItems();
  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-foreground/80 hover:text-teal-500 transition-colors text-sm xl:text-base"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
});
DesktopNavigation.displayName = 'DesktopNavigation';

const MobileNavigation = memo<{ isOpen: boolean; onClose: () => void }>(({ isOpen, onClose }) => {
  const items = useNavItems();
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-background px-2 sm:px-4 py-2 shadow-lg border-t border-border">
      <nav className="flex flex-col space-y-3 sm:space-y-4 py-3 sm:py-4">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-foreground/80 hover:text-teal-500 transition-colors py-1 sm:py-2 text-sm sm:text-base"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
});
MobileNavigation.displayName = 'MobileNavigation';

const Logo = memo(() => (
  <Link to="/" className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 md:ml-20">
    <BatteryCharging className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-teal-500" aria-hidden="true" />
    <span className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
      ŞarjFiyat
    </span>
  </Link>
));
Logo.displayName = 'Logo';

const Header = memo(() => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const menuIcon = useMemo(
    () => (menuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />),
    [menuOpen]
  );

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <Logo />

        <DesktopNavigation />

        <div className="flex items-center gap-1 mr-2 sm:mr-4">
          <LanguageToggle />
          <ThemeToggle />

          <button
            className="lg:hidden text-foreground focus:outline-none p-1 sm:p-2"
            onClick={toggleMenu}
            aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
          >
            {menuIcon}
          </button>
        </div>
      </div>

      <MobileNavigation isOpen={menuOpen} onClose={closeMenu} />
    </header>
  );
});
Header.displayName = 'Header';

export default Header;
