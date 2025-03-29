import { useState, useEffect } from "react";
import { providers } from "@/data/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Zap, PlugZap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ChargingStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Set up loading state that resolves after providers are loaded
  useEffect(() => {
    // Check if providers are loaded
    if (providers.length > 0) {
      setIsLoading(false);
    } else {
      // Set a timeout to check again in 2 seconds
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Function to get providers with real station counts based on 2025 data
  const getTopProvidersByStationCount = () => {
    // Updated 2025 station counts based on latest research
    const stationCounts = {
      trugo: 600,
      zes: 1726,
      esarj: 505,
      beefull: 125,
      sharz: 230,
      voltrun: 190,
      petrolofisi: 320,
      tesla: 150,
      otowatt: 95,
      aksasarj: 45,
      astor: 70,
      multiforce: 85,
      onlife: 40,
      obisarj: 25,
      borenco: 35,
      vale: 30,
      nevasarj: 20,
      magicline: 15,
      rhg: 12,
      dcharge: 28,
      echarge: 18,
      powersarj: 22
    };
    
    // Create a fallback list of providers if the real data isn't loaded yet
    if (providers.length === 0) {
      return [
        { id: "zes", name: "ZES", stationCount: 1726 },
        { id: "trugo", name: "Trugo", stationCount: 600 },
        { id: "esarj", name: "Eşarj", stationCount: 505 }
      ];
    }
    
    // Map the providers with their real station counts
    const providersWithCounts = providers.map(provider => ({
      ...provider,
      stationCount: stationCounts[provider.id] || 0
    }));
    
    // Sort by station count (highest first) and take top 3
    return providersWithCounts
      .sort((a, b) => b.stationCount - a.stationCount)
      .slice(0, 3);
  };

  const getCheapestACProviders = () => {
    // Create a fallback list if the real data isn't loaded yet
    if (providers.length === 0) {
      return [
        { id: "multiforce", name: "Multiforce", acPrice: 4.2 },
        { id: "rhg", name: "RHG", acPrice: 4.7 },
        { id: "onlife", name: "Onlife", acPrice: 5.79 }
      ];
    }
    
    return [...providers]
      .sort((a, b) => a.acPrice - b.acPrice)
      .slice(0, 3);
  };

  const getCheapestDCProviders = () => {
    // Create a fallback list if the real data isn't loaded yet
    if (providers.length === 0) {
      return [
        { id: "magicline", name: "Magicline", dcPrice: 7.8 },
        { id: "petrolofisi", name: "Petrol Ofisi", dcPrice: 8.5 },
        { id: "rhg", name: "RHG", dcPrice: 8.8 }
      ];
    }
    
    return [...providers]
      .sort((a, b) => a.dcPrice - b.dcPrice)
      .slice(0, 3);
  };

  // Get data for each card
  const topProviders = getTopProvidersByStationCount();
  const cheapestACProviders = getCheapestACProviders();
  const cheapestDCProviders = getCheapestDCProviders();

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-r from-teal-500 to-blue-500">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-0 rounded-lg shadow-lg bg-white">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex justify-between items-center border-b pb-2">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Most Stations Card */}
            <Card className="border-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Battery className="mr-2 h-5 w-5 text-teal-500" />
                  <span className="text-gray-800">En çok istasyonu olan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topProviders.map((provider) => (
                    <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span className="font-medium text-gray-800">{provider.name}</span>
                      <span className="text-gray-700 font-semibold">
                        {provider.stationCount} istasyon
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cheapest AC Stations Card */}
            <Card className="border-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-gray-800">En ucuz AC istasyonlar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {cheapestACProviders.map((provider) => (
                    <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span className="font-medium text-gray-800">{provider.name}</span>
                      <span className="text-gray-700 font-semibold">{provider.acPrice.toFixed(2)} ₺/kWh</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cheapest DC Stations Card */}
            <Card className="border-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <PlugZap className="mr-2 h-5 w-5 text-purple-500" />
                  <span className="text-gray-800">En ucuz DC istasyonlar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {cheapestDCProviders.map((provider) => (
                    <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span className="font-medium text-gray-800">{provider.name}</span>
                      <span className="text-gray-700 font-semibold">{provider.dcPrice.toFixed(2)} ₺/kWh</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingStats;
