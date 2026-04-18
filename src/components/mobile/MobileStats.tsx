import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderData } from "@/services/googleSheetsService";
import { sortProvidersByPrice } from "@/data/providers";
import { Zap, BatteryCharging, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileStats = memo(() => {
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
    <section className="px-3 mt-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
        {t("mobileStats.highlights")}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        <StatCard
          icon={<MapPin className="h-4 w-4 text-teal-500" />}
          title={t("mobileStats.mostStations")}
          items={topByStations.map(p => ({ name: p.name, value: `${p.stationCount}` }))}
          accentColor="bg-teal-500/10"
        />
        <StatCard
          icon={<BatteryCharging className="h-4 w-4 text-green-500" />}
          title={t("mobileStats.cheapestAc")}
          items={topByAcPrice.map(p => ({ name: p.name, value: `${p.acPrice}₺` }))}
          accentColor="bg-green-500/10"
        />
        <StatCard
          icon={<Zap className="h-4 w-4 text-blue-500" />}
          title={t("mobileStats.cheapestDc")}
          items={topByDcPrice.map(p => ({ name: p.name, value: `${p.dcPrice}₺` }))}
          accentColor="bg-blue-500/10"
        />
      </div>
    </section>
  );
});

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  items: { name: string; value: string }[];
  accentColor: string;
}

const StatCard = memo<StatCardProps>(({ icon, title, items, accentColor }) => (
  <div className="min-w-[200px] snap-start bg-card border border-border rounded-xl p-3.5 flex-shrink-0">
    <div className="flex items-center gap-2 mb-3">
      <div className={`p-1.5 rounded-lg ${accentColor}`}>{icon}</div>
      <h3 className="text-xs font-semibold text-foreground">{title}</h3>
    </div>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{item.name}</span>
          <span className="text-xs font-bold text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
));

StatCard.displayName = 'StatCard';
MobileStats.displayName = 'MobileStats';

export default MobileStats;
