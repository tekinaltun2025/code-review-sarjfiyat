
import { useState } from "react";
import { providers } from "@/data/providers";
import { Provider } from "@/data/types/provider.types";
import { ArrowDown, ArrowUp, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PriceTableHeader from "./price-table/PriceTableHeader";
import PriceTableRow from "./price-table/PriceTableRow";
import PriceTableInfoFooter from "./price-table/PriceTableInfoFooter";

type SortKey = 'acPrice' | 'dcPrice' | 'fastDcPrice';
type SortOrder = 'asc' | 'desc';

const PriceTable = () => {
  const [sortBy, setSortBy] = useState<SortKey>('acPrice');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  
  // Split providers into two categories - with custom logos and with the generic charging station logo
  const providersWithCustomLogos = providers.filter(p => p.logo !== "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png");
  const providersWithoutCustomLogos = providers.filter(p => p.logo === "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png");
  
  // Sort each category separately
  const sortProviders = (providerList: Provider[]) => {
    return [...providerList].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  };
  
  const sortedProvidersWithCustomLogos = sortProviders(providersWithCustomLogos);
  const sortedProvidersWithoutCustomLogos = sortProviders(providersWithoutCustomLogos);
  
  // Combine the two sorted arrays
  const sortedProviders = [...sortedProvidersWithCustomLogos, ...sortedProvidersWithoutCustomLogos];

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
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
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
                    dividerIndex={sortedProvidersWithCustomLogos.length}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <PriceTableInfoFooter />
      </div>
    </section>
  );
};

export default PriceTable;
