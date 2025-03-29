
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
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-gray-100 rounded-md">
            <AvatarImage 
              src={provider.logo} 
              alt={`${provider.name} logo`}
              className="object-contain p-1"
            />
            <AvatarFallback className="bg-gray-200 text-gray-700 rounded-md">
              {providerInitial}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-gray-900">{provider.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`text-sm font-medium ${sortBy === 'acPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.acPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`text-sm font-medium ${sortBy === 'dcPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
          {provider.dcPrice.toFixed(2)} ₺
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <a 
          href={provider.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </td>
    </tr>
  );
};

export default PriceTableRow;
