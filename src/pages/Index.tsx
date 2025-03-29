
import ChargingProviders from "@/components/ChargingProviders";
import ChargingStats from "@/components/ChargingStats";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import PriceTable from "@/components/PriceTable";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ChargingStats />
        <MapSection />
        <PriceTable />
        <ChargingProviders />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
