
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
        <div className="flex items-center space-x-2">
          <BatteryCharging className="h-8 w-8 text-teal-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            ŞarjFiyat
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="text-gray-800 hover:text-teal-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
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
        <div className="md:hidden bg-white px-4 py-2 shadow-lg">
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="text-gray-800 hover:text-teal-500 transition-colors"
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
