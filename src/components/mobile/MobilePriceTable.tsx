import React, { useState, useMemo, memo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Zap, ChevronDown, ChevronUp, Info, Search } from 'lucide-react';
import { providers, updateProviders } from '../../data/providers';
import { Provider } from '../../data/types/provider.types';
import { fetchProviderData } from '../../services/googleSheetsService';
import { useTranslation } from 'react-i18next';

interface MobileProviderCardProps {
  provider: Provider;
  rank: number;
  sortBy: 'acPrice' | 'dcPrice';
}

const MobileProviderCard = memo<MobileProviderCardProps>(({ provider, rank, sortBy }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const activePrice = sortBy === 'dcPrice' ? provider.dcPrice : provider.acPrice;

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent className="p-0">
        <div
          className="p-3 flex items-center gap-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            {rank}
          </div>

          <img
            src={provider.logo}
            alt={provider.name}
            className="w-10 h-10 rounded-lg object-contain bg-white border"
            loading="lazy"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{provider.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">
              {activePrice ? `${activePrice}₺` : '-'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-3 pb-3 pt-0 border-t bg-muted/30">
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div>
                <span className="text-muted-foreground">{t("mobileTable.acCharge")}:</span>
                <span className="ml-1 font-medium">{provider.acPrice ? `${provider.acPrice} ₺/kWh` : '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("mobileTable.dcCharge")}:</span>
                <span className="ml-1 font-medium">{provider.dcPrice ? `${provider.dcPrice} ₺/kWh` : '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("mobileTable.totalSockets")}:</span>
                <span className="ml-1 font-medium">{provider.stationInfo || '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("mobileTable.supportLine")}:</span>
                <span className="ml-1 font-medium">{provider.supportLine || '-'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">{t("mobileTable.website")}:</span>
                <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer" className="ml-1 font-medium text-primary underline truncate">
                  {provider.websiteUrl !== '#' ? provider.websiteUrl.replace(/^https?:\/\//, '') : '-'}
                </a>
              </div>
            </div>

            {provider.notes && (
              <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{provider.notes}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

MobileProviderCard.displayName = 'MobileProviderCard';

const MobilePriceTable = memo(() => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<'acPrice' | 'dcPrice'>('dcPrice');
  const [localProviders, setLocalProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProviderData();
        updateProviders(data);
        setLocalProviders(data);
      } catch (error) {
        console.error('Error fetching provider data:', error);
        setLocalProviders(providers);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProviders = useMemo(() => {
    return localProviders.filter(provider =>
      provider.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [localProviders, nameFilter]);

  return (
    <div className="mt-4">
      <Card className="mb-4">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            {t("mobileTable.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("mobileTable.searchPlaceholder")}
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <Badge
              variant={sortBy === 'dcPrice' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 justify-center"
              onClick={() => setSortBy('dcPrice')}
            >
              {t("mobileTable.dcPrice")}
            </Badge>
            <Badge
              variant={sortBy === 'acPrice' ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-2 justify-center"
              onClick={() => setSortBy('acPrice')}
            >
              {t("mobileTable.acPrice")}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground">
            {t("mobileTable.listingCount", { count: filteredProviders.length })}
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="p-6 text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
        </div>
      ) : filteredProviders.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground text-sm">
          {t("mobileTable.noResults")}
        </Card>
      ) : (
        filteredProviders.map((provider, index) => (
          <MobileProviderCard
            key={provider.id}
            provider={provider}
            rank={index + 1}
            sortBy={sortBy}
          />
        ))
      )}
    </div>
  );
});

MobilePriceTable.displayName = 'MobilePriceTable';

export default MobilePriceTable;
