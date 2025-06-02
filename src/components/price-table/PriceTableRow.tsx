
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
      <td className="px-6 py-4 w-64">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0">
            <AvatarImage 
              src={provider.logo} 
              alt={`${provider.name} logo`}
              className="object-contain p-1"
            />
            <AvatarFallback className="bg-gray-200 text-gray-700 rounded-md">
              {providerInitial}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-900 min-w-0 flex-1 leading-tight">
            {provider.name}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-center whitespace-nowrap w-24">
        <span className={`text-sm font-medium ${sortBy === 'acPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.acPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-4 py-4 text-center whitespace-nowrap w-24">
        <span className={`text-sm font-medium ${sortBy === 'dcPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.dcPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-4 py-4 text-center whitespace-nowrap w-20">
        <span className="text-sm font-medium text-gray-700">
          {provider.stationCount ? (
            provider.id === 'trugo' ? '600+' : provider.stationCount
          ) : '-'}
        </span>
      </td>
      <td className="px-4 py-4 text-center whitespace-nowrap w-16">
        <a 
          href={provider.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
          aria-label={`${provider.name} web sitesini ziyaret et`}
          title={`${provider.name} web sitesini ziyaret et`}
        >
          <span className="sr-only">{provider.name} web sitesi</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </td>
      <td className="px-4 py-4 text-left">
        <div className="text-sm text-gray-700 max-w-xs break-words">
          {provider.notes || '-'}
        </div>
      </td>
    </tr>
  );
};

export default PriceTableRow;
