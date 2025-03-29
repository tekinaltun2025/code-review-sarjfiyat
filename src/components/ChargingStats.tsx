import { providers } from "@/data/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Zap, PlugZap } from "lucide-react";

const ChargingStats = () => {
  // Function to get providers with real station counts based on 2025 data
  const getTopProvidersByStationCount = () => {
    // Updated 2025 station counts based on latest research
    const stationCounts = {
      trugo: 600, // Updated Trugo station count to 600+
      zes: 950,
      esarj: 510,
      beefull: 125,
      sharz: 230,
      voltrun: 190,
      petrolofisi: 320,
      tesla: 150,
      otowatt: 95,
      aksasarj: 45,
      astor: 70
    };
    
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
    return [...providers]
      .sort((a, b) => a.acPrice - b.acPrice)
      .slice(0, 3);
  };

  const getCheapestDCProviders = () => {
    return [...providers]
      .sort((a, b) => a.dcPrice - b.dcPrice)
      .slice(0, 3);
  };

  // Get data for each card
  const topProviders = getTopProvidersByStationCount();
  const cheapestACProviders = getCheapestACProviders();
  const cheapestDCProviders = getCheapestDCProviders();

  return (
    <section className="py-8 bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
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
                        {provider.id === 'trugo' ? '600+ istasyon' : `${provider.stationCount} istasyon`}
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
