
import { providers } from "@/data/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Zap, PlugZap } from "lucide-react";

const ChargingStats = () => {
  // Function to sort and slice providers
  const getTopProvidersByStationCount = () => {
    // In a real app, this would be actual data
    // For now, we'll just use the first 3 providers and make up station counts
    return providers.slice(0, 3).map((provider, index) => ({
      ...provider,
      stationCount: 625 - index * 100 // Made up decreasing values
    }));
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Most Stations Card */}
          <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Battery className="mr-2 h-5 w-5 text-teal-500" />
                En çok istasyonu olan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topProviders.map((provider) => (
                  <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <span className="font-medium">{provider.name}</span>
                    <span className="text-gray-700">{provider.stationCount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cheapest AC Stations Card */}
          <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Zap className="mr-2 h-5 w-5 text-teal-500" />
                En ucuz AC istasyonlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cheapestACProviders.map((provider) => (
                  <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <span className="font-medium">{provider.name}</span>
                    <span className="text-gray-700">{provider.acPrice.toFixed(2)} ₺</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cheapest DC Stations Card */}
          <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <PlugZap className="mr-2 h-5 w-5 text-teal-500" />
                En ucuz DC istasyonlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cheapestDCProviders.map((provider) => (
                  <li key={provider.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <span className="font-medium">{provider.name}</span>
                    <span className="text-gray-700">{provider.dcPrice.toFixed(2)} ₺</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChargingStats;
