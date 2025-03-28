
import { Provider } from "@/data/types/provider.types";

export type SortKey = 'acPrice' | 'dcPrice' | 'fastDcPrice';
export type SortOrder = 'asc' | 'desc';

export const sortProviders = (
  providerList: Provider[],
  sortBy: SortKey,
  sortOrder: SortOrder
): Provider[] => {
  return [...providerList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
};

export const splitProvidersByLogo = (providers: Provider[], genericLogoPath: string) => {
  const providersWithCustomLogos = providers.filter(p => p.logo !== genericLogoPath);
  const providersWithoutCustomLogos = providers.filter(p => p.logo === genericLogoPath);
  
  return {
    providersWithCustomLogos,
    providersWithoutCustomLogos
  };
};
