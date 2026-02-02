
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import HomeChargers from "./pages/HomeChargers";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import Panel from "./components/Panel";
import AboutPage from "./pages/AboutPage";
import SarjAglari from "./pages/SarjAglari";
import Survey from "./pages/Survey";
import MobileIndex from "./pages/mobile/MobileIndex";
import { useMobileRedirect } from "./hooks/useMobileRedirect";
import CookieBanner from "./components/CookieBanner";
import "./App.css";

// Mobil yönlendirme wrapper
const MobileRedirectWrapper = ({ children }: { children: React.ReactNode }) => {
  useMobileRedirect();
  return <>{children}</>;
};

function App() {
  // Doğru basename yapılandırması
  // Site kök dizinde çalışıyorsa bu "/" olmalı
  // Alt dizinde çalışıyorsa "/alt-dizin" şeklinde olmalı
  const basename = '/'; 
  
  console.log("App bileşeni yükleniyor, basename:", basename);
  
  return (
    <Router basename={basename}>
      <MobileRedirectWrapper>
        <Routes>
          {/* Normal site routes */}
          <Route path="/" element={<Index />} />
          <Route path="/kampanyalar" element={<Campaigns />} />
          <Route path="/ev-sarj-cihazlari" element={<HomeChargers />} />
          <Route path="/sarj-aglari" element={<SarjAglari />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/anket" element={<Survey />} />
          
          {/* Mobil routes */}
          <Route path="/m" element={<MobileIndex />} />
          <Route path="/m/kampanyalar" element={<Campaigns />} />
          <Route path="/m/ev-sarj-cihazlari" element={<HomeChargers />} />
          <Route path="/m/sarj-aglari" element={<SarjAglari />} />
          <Route path="/m/hakkimizda" element={<AboutPage />} />
          <Route path="/m/anket" element={<Survey />} />
          
          {/* Panel routes */}
          <Route path="/panel" element={<Panel />}>
            <Route index element={<Navigate to="/panel/anasayfa" replace />} />
            <Route path="anasayfa" element={<Index />} />
            <Route path="kampanyalar" element={<Campaigns />} />
            <Route path="ev-sarj-cihazlari" element={<HomeChargers />} />
            <Route path="sarj-aglari" element={<SarjAglari />} />
            <Route path="hakkimizda" element={<AboutPage />} />
            <Route path="anket" element={<Survey />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <CookieBanner />
      </MobileRedirectWrapper>
    </Router>
  );
}

export default App;
