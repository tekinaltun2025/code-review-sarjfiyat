
import { BatteryCharging, Menu, X } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";

// Navigation items'ı sabit bir değer olarak dışarı alalım
const NAV_ITEMS = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Şarj Ağları", path: "/sarj-aglari" },
  { name: "Kampanyalar", path: "/kampanyalar" },
  { name: "Ev Şarj Cihazları", path: "/ev-sarj-cihazlari" },
  { name: "Anket", path: "/anket" },
  { name: "Hakkımızda", path: "/hakkimizda" },
] as const;

// Navigation bileşenini ayrı bir memo component yapalım
const DesktopNavigation = memo(() => (
  <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4 md:mr-20">
    {NAV_ITEMS.map((item) => (
      <Link 
        key={item.path}
        to={item.path} 
        className="text-gray-800 hover:text-teal-500 transition-colors text-sm xl:text-base"
      >
        {item.name}
      </Link>
    ))}
  </nav>
));

DesktopNavigation.displayName = 'DesktopNavigation';

// Mobile navigation'ı da ayrı bir component yapalım
const MobileNavigation = memo<{ isOpen: boolean; onClose: () => void }>(({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="lg:hidden bg-white px-2 sm:px-4 py-2 shadow-lg border-t">
      <nav className="flex flex-col space-y-3 sm:space-y-4 py-3 sm:py-4">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className="text-gray-800 hover:text-teal-500 transition-colors py-1 sm:py-2 text-sm sm:text-base"
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

// Logo bileşenini ayrı bir component yapalım
const Logo = memo(() => (
  <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 md:ml-20">
    <BatteryCharging className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-teal-500" />
    <h1 className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
      ŞarjFiyat
    </h1>
  </div>
));

Logo.displayName = 'Logo';

const Header = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const menuIcon = useMemo(() => (
    menuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
  ), [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm relative">
      {/* Version number - positioned absolutely in top right */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs text-gray-400 font-medium z-60">
        V5.0
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <DesktopNavigation />

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-800 focus:outline-none p-1 sm:p-2 mr-2 sm:mr-4"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {menuIcon}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileNavigation isOpen={menuOpen} onClose={closeMenu} />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
