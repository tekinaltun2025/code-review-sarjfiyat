
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
    <header className="sticky top-0 z-50 bg-white shadow-sm relative">
      {/* Version number - positioned absolutely in top right */}
      <div className="absolute top-2 right-2 text-xs text-gray-400 font-medium z-60">
        V5.0
      </div>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 ml-4 md:ml-20">
          <BatteryCharging className="h-12 w-12 md:h-16 md:w-16 text-teal-500" />
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            ŞarjFiyat
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-4 md:mr-20">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="text-gray-800 hover:text-teal-500 transition-colors text-sm xl:text-base"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-800 focus:outline-none p-2"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-2 shadow-lg border-t">
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-gray-800 hover:text-teal-500 transition-colors py-2 text-base"
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
