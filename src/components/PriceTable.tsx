
import { useEffect, useState } from "react";
import { providers, updateProviders } from "@/data/providers";
import { Provider } from "@/data/types/provider.types";
import { ArrowDown, ArrowUp, ExternalLink, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import PriceTableHeader from "./price-table/PriceTableHeader";
import PriceTableRow from "./price-table/PriceTableRow";
import PriceTableInfoFooter from "./price-table/PriceTableInfoFooter";
import { fetchProviderData } from "@/services/googleSheetsService";

type SortKey = 'acPrice' | 'dcPrice' | 'fastDcPrice';
type SortOrder = 'asc' | 'desc';

// IDs of providers to be prioritized in order
const priorityProviderIds = ["trugo", "zes", "beefull", "esarj"];

const PriceTable = () => {
  const [sortBy, setSortBy] = useState<SortKey>('acPrice');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [localProviders, setLocalProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProviderData();
      updateProviders(data);
      setLocalProviders(data);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching provider data:", error);
      toast({
        title: "Veri yüklenemedi",
        description: "Şarj operatörleri bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);
  
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  const handleRefresh = () => {
    loadData();
    toast({
      title: "Veri yenileniyor",
      description: "Şarj operatörleri bilgileri güncelleniyor...",
    });
  };
  
  // Sort the providers based on current sort settings
  const getSortedProviders = () => {
    // Start with a copy of the providers to avoid mutating the original
    const allSortedProviders = [...localProviders];
    
    // Sort by the selected price (only non-priority providers)
    return allSortedProviders.sort((a, b) => {
      // Check if both providers are priority providers
      const aIsPriority = priorityProviderIds.includes(a.id);
      const bIsPriority = priorityProviderIds.includes(b.id);
      
      // If both are priority, sort by priorityProviderIds order
      if (aIsPriority && bIsPriority) {
        return priorityProviderIds.indexOf(a.id) - priorityProviderIds.indexOf(b.id);
      }
      
      // If only a is priority, a comes first
      if (aIsPriority) return -1;
      
      // If only b is priority, b comes first
      if (bIsPriority) return 1;
      
      // If neither is priority, sort by price
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  };

  const sortedProviders = getSortedProviders();

  return (
    <section id="price-comparison" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Şarj Fiyatları Karşılaştırması
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aşağıdaki tabloda Türkiye'deki elektrikli araç şarj istasyonu operatörlerinin 
            güncel fiyatlarını karşılaştırabilirsiniz.
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Verileri Güncelle</span>
            </Button>
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Son güncelleme: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Veriler yükleniyor...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <PriceTableHeader 
                  sortBy={sortBy} 
                  handleSort={handleSort} 
                  getSortIcon={(key) => {
                    if (sortBy !== key) return null;
                    return sortOrder === 'asc' ? 
                      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
                      <ArrowDown className="inline h-4 w-4 ml-1" />;
                  }}
                />
                <tbody className="divide-y divide-gray-200">
                  {sortedProviders.map((provider: Provider, index: number) => (
                    <PriceTableRow
                      key={provider.id}
                      provider={provider}
                      index={index}
                      sortBy={sortBy}
                      dividerIndex={priorityProviderIds.length}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <PriceTableInfoFooter lastUpdated={lastUpdated} />
      </div>
    </section>
  );
};

export default PriceTable;
