
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Tag, 
  Zap, 
  Info, 
  Map,
  Star,
  ChevronRight 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Ana Sayfa", path: "/panel", icon: <Home className="w-5 h-5" /> },
    { name: "Şarj Ağları", path: "/panel/sarj-aglari", icon: <Map className="w-5 h-5" /> },
    { name: "Kampanyalar", path: "/panel/kampanyalar", icon: <Tag className="w-5 h-5" /> },
    { name: "Ev Şarj Cihazları", path: "/panel/ev-sarj-cihazlari", icon: <Zap className="w-5 h-5" /> },
    { name: "Anket", path: "/panel/anket", icon: <Star className="w-5 h-5" /> },
    { name: "Hakkımızda", path: "/panel/hakkimizda", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
            <path d="M7 7h10v10H7z"></path>
            <path d="M10 3v4"></path>
            <path d="M14 3v4"></path>
            <path d="M10 17v4"></path>
            <path d="M14 17v4"></path>
            <path d="m5 7-2 2 2 2"></path>
            <path d="m19 7 2 2-2 2"></path>
            <path d="m5 15-2 2 2 2"></path>
            <path d="m19 15 2 2-2 2"></path>
          </svg>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            ŞarjFiyat
          </h1>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-all ${
                  location.pathname === item.path ? "bg-teal-50 text-teal-600" : "text-gray-700"
                }`}
              >
                <span className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.name}</span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
