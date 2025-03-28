
import { useState } from "react";
import { Provider, providers } from "@/data/providers";
import { ArrowDown, ArrowUp, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  
  const sortedProviders = [...providers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
  
  const getSortIcon = (key: SortKey) => {
    if (sortBy !== key) return null;
    return sortOrder === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

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
                        <TooltipTrigger>
                          <Info className="inline h-4 w-4 ml-1 text-gray-400" />
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
                        <TooltipTrigger>
                          <Info className="inline h-4 w-4 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48">DC şarj, 50kW güçlerindeki hızlı şarj istasyonlarıdır.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                  <th 
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-800 cursor-pointer hover:text-teal-600"
                    onClick={() => handleSort('fastDcPrice')}
                  >
                    Hızlı DC Şarj (₺/kWh)
                    {getSortIcon('fastDcPrice')}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="inline h-4 w-4 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-48">Hızlı DC şarj, 90kW ve üzeri güçlerdeki ultra hızlı şarj istasyonlarıdır.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                    Üyelik Ücreti (₺)
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                    Uygulama
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                    Websitesi
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                    Notlar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedProviders.map((provider: Provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={provider.logo} 
                            alt={`${provider.name} logo`}
                            className="h-full w-full object-contain object-center p-1"
                          />
                        </div>
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
                      <span className={`text-sm font-medium ${sortBy === 'fastDcPrice' ? 'text-teal-600' : 'text-gray-700'}`}>
                        {provider.fastDcPrice.toFixed(2)} ₺
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700">
                        {provider.membershipFee === null ? 'Ücretsiz' : `${provider.membershipFee.toFixed(2)} ₺`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700">
                        {provider.hasApp ? 'Var' : 'Yok'}
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
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700">
                        {provider.notes || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 text-sm text-teal-700">
          <p className="flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>
              Fiyatlar 26 Temmuz 2023 tarihinde güncellenmiştir. Geçerli fiyatlar için lütfen 
              ilgili operatörün resmi websitesini ziyaret ediniz. Tüm fiyatlar TL/kWh cinsindendir 
              ve KDV dahildir.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceTable;
