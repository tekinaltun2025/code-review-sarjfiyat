
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import HomeChargers from "./pages/HomeChargers";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import Panel from "./components/Panel";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  // URL'nin kök dizinine göre yapılandırma
  const basename = '/'; // Eğer site bir alt klasörde çalışıyorsa, burayı değiştirin (örn: '/alt-klasor')
  
  return (
    <Router basename={basename}>
      <Routes>
        {/* Normal site routes */}
        <Route path="/" element={<Index />} />
        <Route path="/kampanyalar" element={<Campaigns />} />
        <Route path="/ev-sarj-cihazlari" element={<HomeChargers />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        
        {/* Panel routes */}
        <Route path="/panel" element={<Panel />}>
          <Route index element={<Index />} />
          <Route path="kampanyalar" element={<Campaigns />} />
          <Route path="ev-sarj-cihazlari" element={<HomeChargers />} />
          <Route path="hakkimizda" element={<AboutPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
