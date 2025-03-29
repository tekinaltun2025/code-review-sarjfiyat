
import { Provider } from "../types/provider.types";
import { fetchProviderData } from "@/services/googleSheetsService";

// The actual providers will be fetched from Google Sheets
let providers: Provider[] = [];

// Initialize with an empty array, will be populated later
export { providers };

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

// This function will be called to update the providers array
export const updateProviders = (newProviders: Provider[]) => {
  providers = newProviders;
};

// Load the providers on initial import
fetchProviderData()
  .then(data => {
    updateProviders(data);
  })
  .catch(error => {
    console.error("Failed to initialize providers data:", error);
  });
