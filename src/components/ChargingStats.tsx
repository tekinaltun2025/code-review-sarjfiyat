
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Zap, DollarSign, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderData } from "@/services/googleSheetsService";
import { sortProvidersByPrice } from "@/data/providers";

const ChargingStats = () => {
  const { data: providers = [] } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviderData,
  });

  // Get top 3 providers with most stations
  const topByStations = [...providers]
    .sort((a, b) => (b.stationCount || 0) - (a.stationCount || 0))
    .slice(0, 3);

  // Get top 3 providers with cheapest AC prices
  const topByAcPrice = sortProvidersByPrice("acPrice", true).slice(0, 3);

  // Get top 3 providers with cheapest DC prices
  const topByDcPrice = sortProvidersByPrice("dcPrice", true).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Elektrikli Araç Şarj Fiyatlarını Karşılaştırın
              </h1>
              <p className="text-lg">
                Türkiye'deki tüm şarj istasyonu operatörlerinin güncel fiyatlarını karşılaştırın,
                sizin için en ekonomik şarj noktasını bulun.
              </p>
              <Button className="bg-white text-teal-600 hover:bg-gray-100 font-medium">
                <Zap className="mr-2 h-4 w-4" />
                Fiyatları Karşılaştır
              </Button>
            </div>
            
            <div className="bg-blue-400/20 p-6 rounded-lg backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 hover:bg-blue-400/30 rounded-lg transition-colors">
                  <div className="bg-teal-500 p-2 rounded-md">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Güncel Tarifeler</h3>
                    <p className="text-white/80 text-sm">Tüm operatörlerin en güncel şarj fiyatları</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 hover:bg-blue-400/30 rounded-lg transition-colors">
                  <div className="bg-teal-500 p-2 rounded-md">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Şeffaf Fiyatlandırma</h3>
                    <p className="text-white/80 text-sm">Üyelik detayleri ve tarifeler hakkında tam bilgi</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 hover:bg-blue-400/30 rounded-lg transition-colors">
                  <div className="bg-teal-500 p-2 rounded-md">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Tüm Şarj Ağları</h3>
                    <p className="text-white/80 text-sm">Türkiye'deki tüm şarj operatörleri karşılaştırması</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="charging-stats" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Türkiye'de Elektrikli Araç Şarj İstatistikleri
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-teal-500 mb-2">5,000+</p>
              <p className="text-gray-600">Şarj İstasyonu</p>
            </Card>
            <Card className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-500 mb-2">15+</p>
              <p className="text-gray-600">Şarj Operatörü</p>
            </Card>
            <Card className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-teal-500 mb-2">100,000+</p>
              <p className="text-gray-600">Elektrikli Araç</p>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Most Stations */}
            <Card className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-center border-b pb-2 mb-4">En çok istasyonu olan</h3>
              <div className="space-y-4">
                {topByStations.map((provider, index) => (
                  <div key={provider.id} className="flex justify-between items-center">
                    <span className="font-medium">MARKA {index + 1}</span>
                    <span className="font-bold">{provider.stationCount || 0}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Cheapest AC */}
            <Card className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-center border-b pb-2 mb-4">En ucuz AC istasyonlar</h3>
              <div className="space-y-4">
                {topByAcPrice.map((provider, index) => (
                  <div key={provider.id} className="flex justify-between items-center">
                    <span className="font-medium">MARKA {index + 1}</span>
                    <span className="font-bold">{provider.acPrice} ₺</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Cheapest DC */}
            <Card className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-center border-b pb-2 mb-4">En ucuz DC istasyonlar</h3>
              <div className="space-y-4">
                {topByDcPrice.map((provider, index) => (
                  <div key={provider.id} className="flex justify-between items-center">
                    <span className="font-medium">MARKA {index + 1}</span>
                    <span className="font-bold">{provider.dcPrice} ₺</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChargingStats;
