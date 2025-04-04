
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import HomeChargers from "./pages/HomeChargers";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import Panel from "./components/Panel";
import AboutPage from "./pages/AboutPage";
import SarjAglari from "./pages/SarjAglari";
import "./App.css";

function App() {
  // Doğru basename yapılandırması
  // Site kök dizinde çalışıyorsa bu "/" olmalı
  // Alt dizinde çalışıyorsa "/alt-dizin" şeklinde olmalı
  const basename = '/'; 
  
  console.log("App bileşeni yükleniyor, basename:", basename);
  
  return (
    <Router basename={basename}>
      <Routes>
        {/* Normal site routes */}
        <Route path="/" element={<Index />} />
        <Route path="/kampanyalar" element={<Campaigns />} />
        <Route path="/ev-sarj-cihazlari" element={<HomeChargers />} />
        <Route path="/sarj-aglari" element={<SarjAglari />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        
        {/* Panel routes */}
        <Route path="/panel" element={<Panel />}>
          <Route index element={<Index />} />
          <Route path="kampanyalar" element={<Campaigns />} />
          <Route path="ev-sarj-cihazlari" element={<HomeChargers />} />
          <Route path="sarj-aglari" element={<SarjAglari />} />
          <Route path="hakkimizda" element={<AboutPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
