import { BatteryCharging, Menu, X } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Ana Sayfa", path: "/m" },
  { name: "Şarj Ağları", path: "/m/sarj-aglari" },
  { name: "Kampanyalar", path: "/m/kampanyalar" },
  { name: "Ev Şarj Cihazları", path: "/m/ev-sarj-cihazlari" },
  { name: "Anket", path: "/m/anket" },
  { name: "Hakkımızda", path: "/m/hakkimizda" },
] as const;

const MobileHeader = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/m" className="flex items-center gap-1.5">
          <BatteryCharging className="h-6 w-6 text-teal-500" />
          <span className="text-lg font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            ŞarjFiyat
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Full screen mobile menu - portal-style overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 top-14 z-[100]"
          style={{ backgroundColor: 'hsl(var(--background))' }}
        >
          <nav className="flex flex-col p-6 gap-1">
            {NAV_ITEMS.map((item) => {
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
        </div>
      )}
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';

export default MobileHeader;
