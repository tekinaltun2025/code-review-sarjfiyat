
import React from "react";
import { ExternalLink } from "lucide-react";
import { Provider } from "@/data/types/provider.types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type SortKey = 'acPrice' | 'dcPrice';

interface PriceTableRowProps {
  provider: Provider;
  index: number;
  sortBy: SortKey;
  dividerIndex: number;
}

const PriceTableRow: React.FC<PriceTableRowProps> = ({ 
  provider, 
  index, 
  sortBy, 
  dividerIndex 
}) => {
  // Extract first letter of provider name for fallback
  const providerInitial = provider.name.charAt(0);
  
  return (
    <tr 
      className={`hover:bg-gray-50 ${
        index === dividerIndex 
          ? "border-t-2 border-t-gray-300" 
          : ""
      }`}
    >
      <td className="px-2 sm:px-4 py-2 sm:py-3 w-32 sm:w-48">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-100 rounded-md flex-shrink-0">
            <AvatarImage 
              src={provider.logo} 
              alt={`${provider.name} logo`}
              className="object-contain p-0.5 sm:p-1"
            />
            <AvatarFallback className="bg-gray-200 text-gray-700 rounded-md text-[10px] sm:text-xs">
              {providerInitial}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-900 min-w-0 flex-1 leading-tight text-[11px] sm:text-sm truncate">
            {provider.name}
          </div>
        </div>
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 text-center w-16 sm:w-24">
        <span className={`text-[11px] sm:text-sm font-medium ${sortBy === 'acPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.acPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 text-center w-16 sm:w-24">
        <span className={`text-[11px] sm:text-sm font-medium ${sortBy === 'dcPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.dcPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 text-center w-20 sm:w-32 hidden sm:table-cell">
        <span className="text-[10px] sm:text-xs text-gray-700 leading-tight">
          {provider.stationInfo || (provider.stationCount ? provider.stationCount.toString() : '-')}
        </span>
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 text-center w-20 sm:w-28 hidden sm:table-cell">
        <span className="text-[10px] sm:text-xs text-gray-600 leading-tight">
          {provider.supportLine || '-'}
        </span>
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 text-center w-12 sm:w-20">
        {provider.websiteUrl && provider.websiteUrl !== '-' ? (
          <a 
            href={provider.websiteUrl.startsWith('http') ? provider.websiteUrl : `https://${provider.websiteUrl}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            aria-label={`${provider.name} web sitesini ziyaret et`}
            title={`${provider.name} web sitesini ziyaret et`}
          >
            <span className="sr-only">{provider.name} web sitesi</span>
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="px-1 sm:px-3 py-2 sm:py-3 w-24 sm:w-32 hidden md:table-cell">
        <div className="text-[10px] sm:text-xs text-gray-700 leading-tight break-words">
          {provider.notes || '-'}
        </div>
      </td>
    </tr>
  );
};

export default PriceTableRow;
