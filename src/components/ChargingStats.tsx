
import React from "react";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderData } from "@/services/googleSheetsService";
import { sortProvidersByPrice } from "@/data/providers";
import { useTranslation } from "react-i18next";

const ChargingStats = () => {
  const { t } = useTranslation();
  const { data: providers = [] } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviderData,
  });

  const topByStations = [...providers]
    .filter(p => p.stationCount && p.stationCount > 0)
    .sort((a, b) => (b.stationCount || 0) - (a.stationCount || 0))
    .slice(0, 3);

  const topByAcPrice = sortProvidersByPrice("acPrice", true).slice(0, 3);
  const topByDcPrice = sortProvidersByPrice("dcPrice", true).slice(0, 3);

  return (
    <section className="py-12 bg-background" aria-labelledby="charging-stats-heading">
      <div className="container mx-auto px-4">
        <h2 id="charging-stats-heading" className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          {t("stats.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-border p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b border-border pb-2 mb-4">{t("stats.mostStations")}</h3>
            <div className="space-y-4">
              {topByStations.map((provider) => (
                <div key={provider.id} className="flex justify-between items-center">
                  <span className="font-medium">{provider.name}</span>
                  <span className="font-bold">{provider.stationCount || 0}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-2 border-border p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b border-border pb-2 mb-4">{t("stats.cheapestAc")}</h3>
            <div className="space-y-4">
              {topByAcPrice.map((provider) => (
                <div key={provider.id} className="flex justify-between items-center">
                  <span className="font-medium">{provider.name}</span>
                  <span className="font-bold">{provider.acPrice} ₺</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-2 border-border p-6">
            <h3 className="text-base md:text-lg font-bold text-center border-b border-border pb-2 mb-4">{t("stats.cheapestDc")}</h3>
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
