
import React from "react";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderData } from "@/services/googleSheetsService";
import { sortProvidersByPrice } from "@/data/providers";

const ChargingStats = () => {
  const { data: providers = [] } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviderData,
  });

  // Get top 3 providers with most stations - filter out those without station counts
  const topByStations = [...providers]
    .filter(p => p.stationCount && p.stationCount > 0)
    .sort((a, b) => (b.stationCount || 0) - (a.stationCount || 0))
    .slice(0, 3);
  
  console.log('Top providers by station count:', topByStations.map(p => ({ name: p.name, count: p.stationCount })));

  // Get top 3 providers with cheapest AC prices
  const topByAcPrice = sortProvidersByPrice("acPrice", true).slice(0, 3);

  // Get top 3 providers with cheapest DC prices
  const topByDcPrice = sortProvidersByPrice("dcPrice", true).slice(0, 3);

  return (
    <section className="py-12 bg-white" aria-labelledby="charging-stats-heading">
      <div className="container mx-auto px-4">
        <h2 id="charging-stats-heading" className="text-2xl md:text-3xl font-bold text-center mb-8">Türkiye'de Elektrikli Araç Şarj İstatistikleri</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Most Stations */}
          <Card className="border-2 border-gray-200 p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b pb-2 mb-4">En çok istasyonu olan</h3>
            <div className="space-y-4">
              {topByStations.map((provider) => (
                <div key={provider.id} className="flex justify-between items-center">
                  <span className="font-medium">{provider.name}</span>
                  <span className="font-bold">{provider.stationCount || 0}</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Cheapest AC */}
          <Card className="border-2 border-gray-200 p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b pb-2 mb-4">En ucuz AC istasyonlar</h3>
            <div className="space-y-4">
              {topByAcPrice.map((provider) => (
                <div key={provider.id} className="flex justify-between items-center">
                  <span className="font-medium">{provider.name}</span>
                  <span className="font-bold">{provider.acPrice} ₺</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Cheapest DC */}
          <Card className="border-2 border-gray-200 p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b pb-2 mb-4">En ucuz DC istasyonlar</h3>
            <div className="space-y-4">
              {topByDcPrice.map((provider) => (
                <div key={provider.id} className="flex justify-between items-center">
                  <span className="font-medium">{provider.name}</span>
                  <span className="font-bold">{provider.dcPrice} ₺</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChargingStats;
