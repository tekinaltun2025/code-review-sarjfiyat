
import { Provider } from "../types/provider.types";
import { majorProviders } from "./major-providers";
import { otherProviders } from "./other-providers";

// Combine all provider lists
export const providers: Provider[] = [...majorProviders, ...otherProviders];

// Utility functions for providers
export const getProviderById = (id: string): Provider | undefined => {
  return providers.find(provider => provider.id === id);
};

export const getProvidersByPriceRange = (minPrice: number, maxPrice: number, priceType: 'acPrice' | 'dcPrice' | 'fastDcPrice'): Provider[] => {
  return providers.filter(provider => provider[priceType] >= minPrice && provider[priceType] <= maxPrice);
};

export const sortProvidersByPrice = (priceType: 'acPrice' | 'dcPrice' | 'fastDcPrice', ascending: boolean = true): Provider[] => {
  return [...providers].sort((a, b) => {
    return ascending ? a[priceType] - b[priceType] : b[priceType] - a[priceType];
  });
};
