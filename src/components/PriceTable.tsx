import { useEffect, useState } from "react";
import { providers, updateProviders } from "@/data/providers";
import { Provider } from "@/data/types/provider.types";
import { ArrowDown, ArrowUp, ExternalLink, Info, AlertTriangle } from "lucide-react";
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
import PriceTableFilters from "./price-table/PriceTableFilters";
import { fetchProviderData } from "@/services/googleSheetsService";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type SortKey = 'acPrice' | 'dcPrice';
type SortOrder = 'asc' | 'desc';

const PriceTable = () => {
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [localProviders, setLocalProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [acPriceFilter, setAcPriceFilter] = useState("all");
  const [dcPriceFilter, setDcPriceFilter] = useState("all");
  
  const { toast } = useToast();
  
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchProviderData();
      updateProviders(data);
      setLocalProviders(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching provider data:", error);
      setError("Şarj operatörleri bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      toast({
        title: "Veri yüklenemedi",
        description: "Şarj operatörleri bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount and on every page refresh
  useEffect(() => {
    loadData();
    
    // Set up auto refresh every 5 minutes (300000 ms) for real-time updates
    const refreshInterval = setInterval(() => {
      loadData();
    }, 300000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  // Filter providers based on the current filter settings
  const getFilteredProviders = () => {
    return localProviders.filter(provider => {
      // Name filter
      const nameMatch = provider.name.toLowerCase().includes(nameFilter.toLowerCase());
      
      // AC Price filter
      let acPriceMatch = true;
      if (acPriceFilter !== "all") {
        const [minAc, maxAc] = acPriceFilter.split("-");
        if (maxAc) {
          acPriceMatch = provider.acPrice >= parseFloat(minAc) && provider.acPrice < parseFloat(maxAc);
        } else {
          // Handle "15+" case
          acPriceMatch = provider.acPrice >= parseFloat(minAc.replace("+", ""));
        }
      }
      
      // DC Price filter
      let dcPriceMatch = true;
      if (dcPriceFilter !== "all") {
        const [minDc, maxDc] = dcPriceFilter.split("-");
        if (maxDc) {
          dcPriceMatch = provider.dcPrice >= parseFloat(minDc) && provider.dcPrice < parseFloat(maxDc);
        } else {
          // Handle "15+" case
          dcPriceMatch = provider.dcPrice >= parseFloat(minDc.replace("+", ""));
        }
      }
      
      return nameMatch && acPriceMatch && dcPriceMatch;
    });
  };
  
  // Sort the providers based on current sort settings - preserving Google Sheets order when no sorting is applied
  const getSortedProviders = () => {
    const filteredProviders = getFilteredProviders();
    
    // Only sort if user has specifically clicked on a sort column
    // Otherwise preserve the original Google Sheets order
    if (!sortBy) {
      return filteredProviders; // Return in original Google Sheets order
    }
    
    return filteredProviders.sort((a, b) => {
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
          {lastUpdated && (
            <div className="mt-4">
              <span className="text-sm text-gray-500">
                Son güncelleme: {lastUpdated.toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Veri yüklenemedi</AlertTitle>
            <AlertDescription>
              Şarj operatörleri bilgileri yüklenirken bir hata oluştu. 
              Lütfen daha sonra tekrar deneyin.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Veriler yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
              <p>Veri yüklenemedi</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-gray-100">
                <PriceTableFilters 
                  onNameFilterChange={setNameFilter}
                  onAcPriceFilterChange={setAcPriceFilter}
                  onDcPriceFilterChange={setDcPriceFilter}
                />
              </div>
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
                    {sortedProviders.length > 0 ? (
                      sortedProviders.map((provider: Provider, index: number) => (
                        <PriceTableRow
                          key={provider.id}
                          provider={provider}
                          index={index}
                          sortBy={sortBy}
                          dividerIndex={-1}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          Arama kriterlerinize uygun operatör bulunamadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <PriceTableInfoFooter lastUpdated={lastUpdated} />
      </div>
    </section>
  );
};

export default PriceTable;
