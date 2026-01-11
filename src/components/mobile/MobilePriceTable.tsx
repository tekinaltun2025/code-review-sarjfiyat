import React, { useState, useMemo, memo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Zap, ChevronDown, ChevronUp, Info, Search } from 'lucide-react';
import { providers, updateProviders } from '../../data/providers';
import { Provider } from '../../data/types/provider.types';
import { fetchProviderData } from '../../services/googleSheetsService';

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
  const [sortBy, setSortBy] = useState<'acPrice' | 'dcPrice' | 'stationCount' | null>(null);
  const [localProviders, setLocalProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  
  // Web ile aynı şekilde Google Sheets'den veri çek
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
  
  // Filtreleme ve sıralama - web ile aynı mantık
  const filteredAndSortedProviders = useMemo(() => {
    // Önce filtrele
    let filtered = localProviders.filter(provider => 
      provider.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    
    // sortBy null ise orijinal sırayı koru (Google Sheets sırası)
    if (!sortBy) {
      return filtered;
    }
    
    // Sıralama uygula
    return [...filtered].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      return (aVal as number) - (bVal as number);
    });
  }, [localProviders, sortBy, nameFilter]);

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
          {/* Arama kutusu */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Operatör ara..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          
          {/* Sıralama seçenekleri */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <Badge 
              variant={sortBy === null ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap text-xs"
              onClick={() => setSortBy(null)}
            >
              Varsayılan
            </Badge>
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
          
          <p className="text-xs text-muted-foreground">
            {filteredAndSortedProviders.length} şarj ağı listeleniyor
          </p>
        </CardContent>
      </Card>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="p-6 text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Yükleniyor...</p>
        </div>
      ) : filteredAndSortedProviders.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground text-sm">
          Arama kriterlerinize uygun operatör bulunamadı.
        </Card>
      ) : (
        /* Provider kartları */
        filteredAndSortedProviders.map((provider, index) => (
          <MobileProviderCard 
            key={provider.id} 
            provider={provider} 
            rank={index + 1}
          />
        ))
      )}
    </div>
  );
});

MobilePriceTable.displayName = 'MobilePriceTable';

export default MobilePriceTable;
