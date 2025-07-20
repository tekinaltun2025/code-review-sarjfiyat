
import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SortKey = 'acPrice' | 'dcPrice';

interface PriceTableHeaderProps {
  sortBy: SortKey;
  handleSort: (key: SortKey) => void;
  getSortIcon: (key: SortKey) => React.ReactNode;
}

const PriceTableHeader: React.FC<PriceTableHeaderProps> = ({ 
  sortBy, 
  handleSort, 
  getSortIcon 
}) => {
  return (
    <thead>
      <tr className="bg-teal-50">
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800 w-48">
          Şarj Operatörü
        </th>
        <th 
          className="px-3 py-3 text-center text-xs font-semibold text-gray-800 cursor-pointer hover:text-teal-600 w-24"
          onClick={() => handleSort('acPrice')}
        >
          <div className="flex flex-col items-center">
            <span>AC Şarj</span>
            <span className="text-xs">(₺/kWh)</span>
            {getSortIcon('acPrice')}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center mt-1"
                  aria-label="AC şarj fiyatı hakkında bilgi"
                  title="AC şarj fiyatı hakkında bilgi"
                >
                  <Info className="h-3 w-3 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">AC şarj, 3.7-22kW güçlerindeki yavaş şarj istasyonlarıdır.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th 
          className="px-3 py-3 text-center text-xs font-semibold text-gray-800 cursor-pointer hover:text-teal-600 w-24"
          onClick={() => handleSort('dcPrice')}
        >
          <div className="flex flex-col items-center">
            <span>DC Şarj</span>
            <span className="text-xs">(₺/kWh)</span>
            {getSortIcon('dcPrice')}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center mt-1"
                  aria-label="DC şarj fiyatı hakkında bilgi"
                  title="DC şarj fiyatı hakkında bilgi"
                >
                  <Info className="h-3 w-3 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">DC şarj, 50kW+ güçlerindeki hızlı şarj istasyonlarıdır.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800 w-32">
          <div className="flex flex-col items-center">
            <span>İstasyon Sayısı</span>
            <span className="text-xs">(Lokasyon/Soket)</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center mt-1"
                  aria-label="İstasyon sayısı hakkında bilgi"
                  title="İstasyon sayısı hakkında bilgi"
                >
                  <Info className="h-3 w-3 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">Lokasyon sayısı / Toplam soket sayısı formatında gösterilmektedir.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800 w-28">
          Destek Hattı
        </th>
        <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800 w-20">
          Website
        </th>
        <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800 w-32">
          Notlar
        </th>
      </tr>
    </thead>
  );
};

export default PriceTableHeader;
