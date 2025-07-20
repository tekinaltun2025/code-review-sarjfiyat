
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
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
          Şarj Operatörü
        </th>
        <th 
          className="px-6 py-4 text-center text-sm font-semibold text-gray-800 cursor-pointer hover:text-teal-600"
          onClick={() => handleSort('acPrice')}
        >
          AC Şarj Fiyatı (₺/kWh)
          {getSortIcon('acPrice')}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center"
                  aria-label="AC şarj fiyatı hakkında bilgi"
                  title="AC şarj fiyatı hakkında bilgi"
                >
                  <Info className="inline h-4 w-4 ml-1 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">AC şarj, 3.7-22kW güçlerindeki yavaş şarj istasyonlarıdır.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th 
          className="px-6 py-4 text-center text-sm font-semibold text-gray-800 cursor-pointer hover:text-teal-600"
          onClick={() => handleSort('dcPrice')}
        >
          DC Şarj Fiyatı (₺/kWh)
          {getSortIcon('dcPrice')}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center"
                  aria-label="DC şarj fiyatı hakkında bilgi"
                  title="DC şarj fiyatı hakkında bilgi"
                >
                  <Info className="inline h-4 w-4 ml-1 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">DC şarj, 50kW güçlerindeki hızlı şarj istasyonlarıdır.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
          İstasyon Sayısı
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center"
                  aria-label="İstasyon sayısı hakkında bilgi"
                  title="İstasyon sayısı hakkında bilgi"
                >
                  <Info className="inline h-4 w-4 ml-1 text-gray-400" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">Lokasyon/Soket formatında gösterilmektedir.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
          Destek Hattı
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
          Websitesi
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
          Notlar
        </th>
      </tr>
    </thead>
  );
};

export default PriceTableHeader;
