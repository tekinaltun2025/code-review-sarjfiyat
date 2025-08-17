
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
      <td className="px-4 py-3 w-48">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 bg-gray-100 rounded-md flex-shrink-0">
            <AvatarImage 
              src={provider.logo} 
              alt={`${provider.name} logo`}
              className="object-contain p-1"
            />
            <AvatarFallback className="bg-gray-200 text-gray-700 rounded-md text-xs">
              {providerInitial}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-900 min-w-0 flex-1 leading-tight text-sm">
            {provider.name}
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-center w-24">
        <span className={`text-sm font-medium ${sortBy === 'acPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.acPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-3 py-3 text-center w-24">
        <span className={`text-sm font-medium ${sortBy === 'dcPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.dcPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-3 py-3 text-center w-32">
        <span className="text-xs text-gray-700 leading-tight">
          {provider.stationInfo || (provider.stationCount ? provider.stationCount.toString() : '-')}
        </span>
      </td>
      <td className="px-3 py-3 text-center w-28">
        <span className="text-xs text-gray-600 leading-tight">
          {provider.supportLine || '-'}
        </span>
      </td>
      <td className="px-3 py-3 text-center w-20">
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
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="px-3 py-3 w-32">
        <div className="text-xs text-gray-700 leading-tight break-words">
          {provider.notes || '-'}
        </div>
      </td>
    </tr>
  );
};

export default PriceTableRow;
