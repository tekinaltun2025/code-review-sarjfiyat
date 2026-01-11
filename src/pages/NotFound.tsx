
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Hatası: Kullanıcı mevcut olmayan bir sayfaya erişmeye çalıştı:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    // Mobil sayfadaysa mobil ana sayfaya, değilse normal ana sayfaya yönlendir
    const isMobilePath = location.pathname.startsWith('/m');
    navigate(isMobilePath ? '/m' : '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Üzgünüz! Sayfa bulunamadı</p>
        <p className="text-gray-500 mb-6">
          Aradığınız sayfa taşınmış, kaldırılmış veya geçici olarak kullanılamıyor olabilir.
        </p>
        <Button 
          onClick={handleGoHome} 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
