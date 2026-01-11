import React, { useState, useMemo, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Zap, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { providers } from '../../data/providers';
import { Provider } from '../../data/types/provider.types';

interface MobileProviderCardProps {
  provider: Provider;
  rank: number;
}

const MobileProviderCard = memo<MobileProviderCardProps>(({ provider, rank }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriceColor = (price: number | null) => {
    if (price === null) return 'text-muted-foreground';
    if (price <= 5) return 'text-green-600';
    if (price <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent className="p-0">
        {/* Ana bilgiler */}
        <div 
          className="p-3 flex items-center gap-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Sıra */}
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            {rank}
          </div>
          
          {/* Logo */}
          <img 
            src={provider.logo} 
            alt={provider.name}
            className="w-10 h-10 rounded-lg object-contain bg-white border"
            loading="lazy"
          />
          
          {/* İsim ve fiyatlar */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{provider.name}</h3>
            <div className="flex gap-2 text-xs mt-1">
              <span className={`flex items-center gap-1 ${getPriceColor(provider.acPrice)}`}>
                <span className="text-muted-foreground">AC:</span>
                {provider.acPrice ? `${provider.acPrice}₺` : '-'}
              </span>
              <span className={`flex items-center gap-1 ${getPriceColor(provider.dcPrice)}`}>
                <span className="text-muted-foreground">DC:</span>
                {provider.dcPrice ? `${provider.dcPrice}₺` : '-'}
              </span>
            </div>
          </div>
          
          {/* Expand butonu */}
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
        
        {/* Genişletilmiş detaylar */}
        {isExpanded && (
          <div className="px-3 pb-3 pt-0 border-t bg-muted/30">
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div>
                <span className="text-muted-foreground">İstasyon:</span>
                <span className="ml-1 font-medium">{provider.stationInfo || '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hızlı DC:</span>
                <span className="ml-1 font-medium">{provider.fastDcPrice ? `${provider.fastDcPrice}₺` : '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Üyelik:</span>
                <span className="ml-1 font-medium">{provider.membershipFee || 'Ücretsiz'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Destek:</span>
                <span className="ml-1 font-medium">{provider.supportLine ? '✓' : '✗'}</span>
              </div>
            </div>
            
            {provider.notes && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700 flex items-start gap-1">
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
  const [sortBy, setSortBy] = useState<'acPrice' | 'dcPrice' | 'stationCount'>('acPrice');
  
  const sortedProviders = useMemo(() => {
    return [...providers].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      return (aVal as number) - (bVal as number);
    });
  }, [sortBy]);

  return (
    <div className="mt-4">
      <Card className="mb-4">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Şarj Ağları Karşılaştırması
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          {/* Sıralama seçenekleri */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <Badge 
              variant={sortBy === 'acPrice' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap text-xs"
              onClick={() => setSortBy('acPrice')}
            >
              AC Fiyat
            </Badge>
            <Badge 
              variant={sortBy === 'dcPrice' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap text-xs"
              onClick={() => setSortBy('dcPrice')}
            >
              DC Fiyat
            </Badge>
            <Badge 
              variant={sortBy === 'stationCount' ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap text-xs"
              onClick={() => setSortBy('stationCount')}
            >
              İstasyon Sayısı
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            {sortedProviders.length} şarj ağı listeleniyor. Detaylar için karta tıklayın.
          </p>
        </CardContent>
      </Card>
      
      {/* Provider kartları */}
      {sortedProviders.map((provider, index) => (
        <MobileProviderCard 
          key={provider.id} 
          provider={provider} 
          rank={index + 1}
        />
      ))}
    </div>
  );
});

MobilePriceTable.displayName = 'MobilePriceTable';

export default MobilePriceTable;
