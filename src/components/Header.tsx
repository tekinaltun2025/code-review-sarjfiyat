
import { BatteryCharging, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Centralized navigation items to maintain consistency
  const navItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Şarj Ağları", path: "/sarj-aglari" },
    { name: "Kampanyalar", path: "/kampanyalar" },
    { name: "Ev Şarj Cihazları", path: "/ev-sarj-cihazlari" },
    { name: "Anket", path: "/anket" },
    { name: "Hakkımızda", path: "/hakkimizda" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 xl:ml-20">
          <BatteryCharging className="h-12 w-12 md:h-16 md:w-16 text-teal-500" />
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            ŞarjFiyat
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 xl:mr-20">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="text-gray-800 hover:text-teal-500 transition-colors text-sm lg:text-base py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button - Touch-friendly */}
        <button 
          className="lg:hidden text-gray-800 focus:outline-none p-3 -mr-3 touch-manipulation"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Improved */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-gray-800 hover:text-teal-500 hover:bg-gray-50 transition-colors px-6 py-4 text-base border-b border-gray-50 last:border-b-0 touch-manipulation"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
