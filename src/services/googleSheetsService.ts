import { Provider } from "@/data/types/provider.types";

// Direct URL to the published Google Sheet as CSV
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR28VqZAXDGApycSFAqZ7lZGBnlp3cAwZxJaJqsLNy5ImubsKdVf-hVNgysIs8F-ZE6yHe6b7R8D4Ls/pub?output=csv";

// Provider ID to logo mapping - updated with more logos
const providerLogos: Record<string, string> = {
  trugo: "/lovable-uploads/9c4dd2d3-7787-4798-83a5-c72f0e6b15a1.png",
  zes: "/lovable-uploads/ba1d435b-9f77-4746-a06c-2418d2fc09a7.png",
  beefull: "/lovable-uploads/cc0015aa-72d6-4e18-bc05-8c7486d57eb7.png",
  esarj: "/lovable-uploads/9c5da173-d35f-4ee5-af1e-ade7186754c1.png",
  sharz: "/lovable-uploads/92c3c249-8f40-4cc6-9c8c-15f6891a5e5e.png",
  voltrun: "/lovable-uploads/fb66fe81-1208-4c6d-a276-363ee14ce4b9.png",
  astor: "/lovable-uploads/eb86de15-9042-4788-88e3-57c2ebc2a451.png",
  otowatt: "/lovable-uploads/4d178d3c-d0c2-4960-a707-c4f0230e9885.png",
  petrolofisi: "/lovable-uploads/6e47365f-9335-4024-9da3-18b00c4ce94b.png",
  tesla: "/lovable-uploads/ee7cd67b-4d0f-482c-ade0-f02ed83fb68a.png",
  aksasarj: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  multiforce: "/lovable-uploads/4e883d70-0fb2-41c7-9bc4-f51d94c026ef.png", // Updated to new Multiforce logo
  onlife: "/lovable-uploads/cd2aee25-6669-44b4-b350-00d0b28175c3.png", // Updated to new OnLife logo
  obisarj: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  borenco: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  vale: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  nevasarj: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  magicline: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  rhg: "/lovable-uploads/e7ac1293-6e03-43a4-9d54-840d01f3dcc4.png", // Updated to new RHG Enertürk logo
  dcharge: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  echarge: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  powersarj: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
  voltgo: "/lovable-uploads/2648e919-dca0-4764-ba85-3bdd8540116c.png"
};

// Default logo for providers without custom logos
const DEFAULT_LOGO = "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png";

// Provider website URL mapping - updated with correct URLs
const providerWebsites: Record<string, string> = {
  trugo: "https://trugo.com.tr",
  zes: "https://zes.net/tr",
  beefull: "https://beefull.com",
  esarj: "https://esarj.com",
  sharz: "https://sharz.com.tr",
  voltrun: "https://voltrun.com",
  astor: "https://astorsarj.com",
  otowatt: "https://otowatt.com.tr",
  petrolofisi: "https://epower.petrolofisi.com.tr",
  tesla: "https://www.tesla.com/tr_tr/supercharger",
  aksasarj: "https://aksasarj.com",
  multiforce: "https://bp.com/tr/turkey/home/products-and-services/elektrikli-arac-sarj-istasyonlari.html", 
  onlife: "https://onlife.io",
  obisarj: "https://obisarj.com",
  borenco: "https://borenco.com.tr",
  vale: "https://vale.com.tr",
  nevasarj: "https://nevasarj.com",
  magicline: "https://magicline.com.tr",
  rhg: "https://rhg.com.tr/ev-sarj-cihazlari",
  dcharge: "https://dcharge.com.tr",
  echarge: "https://echarge.com.tr",
  powersarj: "https://powersarj.com",
  voltgo: "https://voltgo.com.tr"
};

// 2025 station counts based on latest research - keeping existing counts and adding new ones
const stationCounts: Record<string, number> = {
  trugo: 600,
  zes: 1726,
  esarj: 505,
  beefull: 125,
  sharz: 230,
  voltrun: 190,
  petrolofisi: 320,
  tesla: 150,
  otowatt: 95,
  aksasarj: 45,
  astor: 70,
  
  multiforce: 85,
  onlife: 40,
  obisarj: 25,
  borenco: 35,
  vale: 30,
  nevasarj: 20,
  magicline: 15,
  rhg: 12,
  dcharge: 28,
  echarge: 18,
  powersarj: 22,
  voltgo: 40
};

export async function fetchProviderData(): Promise<Provider[]> {
  try {
    // Fetch the CSV data directly from the published URL
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    // Parse CSV data
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row and map the rows to provider objects
    const providers: Provider[] = rows.slice(1).map((row: string[]) => {
      // Create ID from provider name (lowercase, no spaces)
      const providerName = row[0] || "Unnamed Provider";
      // Generate a provider ID by converting the name to lowercase and removing spaces
      const providerId = providerName.toLowerCase().replace(/\s+/g, '').replace(/[üşğıçöĞÜŞİÇÖ]/g, c => {
        const turkishToEnglish: Record<string, string> = {
          'ü': 'u', 'ş': 's', 'ğ': 'g', 'ı': 'i', 'ç': 'c', 'ö': 'o',
          'Ü': 'U', 'Ş': 'S', 'Ğ': 'G', 'İ': 'I', 'Ç': 'C', 'Ö': 'O'
        };
        return turkishToEnglish[c] || c;
      });
      
      // Parse prices, handling comma as decimal separator
      const acPriceStr = row[1] ? row[1].replace(',', '.') : "0";
      const dcPriceStr = row[2] ? row[2].replace(',', '.') : "0";
      const fastDcPriceStr = row[3] ? row[3].replace(',', '.') : dcPriceStr; // Default to DC price if not specified
      
      // Special handling for Multiforce - update with new pricing
      if (providerId === 'multiforce') {
        return {
          id: providerId,
          name: providerName,
          logo: providerLogos[providerId] || DEFAULT_LOGO,
          acPrice: 5.50, // Updated AC price: 5.50 TL/kWh for AC 22 kW
          dcPrice: 9.90, // Updated DC price: 9.90 TL/kWh for DC up to 60 kW
          fastDcPrice: 11.50, // Updated fast DC price: 11.50 TL/kWh for DC 60 kW and above
          membershipFee: null,
          hasApp: false,
          websiteUrl: providerWebsites[providerId] || "#",
          stationCount: stationCounts[providerId] || null,
          notes: "AC: 22 kW (5.50 TL), DC: 60 kW'a kadar (9.90 TL), DC: 60 kW ve üzeri (11.50 TL)"
        };
      }
      
      // Special handling for Beefull - update AC price
      if (providerId === 'beefull') {
        return {
          id: providerId,
          name: providerName,
          logo: providerLogos[providerId] || DEFAULT_LOGO,
          acPrice: 8.99, // Updated AC price: 8.99 TL/kWh
          dcPrice: parseFloat(dcPriceStr) || 0,
          fastDcPrice: parseFloat(fastDcPriceStr) || 0,
          membershipFee: null,
          hasApp: false,
          websiteUrl: providerWebsites[providerId] || "#",
          stationCount: stationCounts[providerId] || null,
          notes: row[3] || ""
        };
      }
      
      // Special handling for RHG Enertürk - update with official website prices
      if (providerId === 'rhg') {
        return {
          id: providerId,
          name: providerName,
          logo: providerLogos[providerId] || DEFAULT_LOGO,
          acPrice: 6.60, // Updated AC price: 6.60 TL/kWh (official website price)
          dcPrice: 10.60, // Updated DC price: 10.60 TL/kWh (official website price)
          fastDcPrice: 10.60, // Same as DC price
          membershipFee: null,
          hasApp: false,
          websiteUrl: providerWebsites[providerId] || "#",
          stationCount: stationCounts[providerId] || null,
          notes: "DC: 60 kWh ve üzeri"
        };
      }
      
      return {
        id: providerId,
        name: providerName,
        logo: providerLogos[providerId] || DEFAULT_LOGO, // Use mapped logo or default
        acPrice: parseFloat(acPriceStr) || 0,
        dcPrice: parseFloat(dcPriceStr) || 0,
        fastDcPrice: parseFloat(fastDcPriceStr) || 0,
        membershipFee: null, // Not used in current data
        hasApp: false, // Not used in current data
        websiteUrl: providerWebsites[providerId] || "#", // Use mapped website URL or default "#"
        stationCount: stationCounts[providerId] || null,
        notes: row[3] || ""
      };
    }).filter(provider => provider.name && provider.acPrice > 0 && provider.id !== 'swapp'); // Added filter to exclude swapp
    
    // Add Voltgo manually to ensure it appears in the list
    const voltgoProvider: Provider = {
      id: "voltgo",
      name: "Voltgo",
      logo: providerLogos["voltgo"] || DEFAULT_LOGO,
      acPrice: 6.99,
      dcPrice: 9.75,
      fastDcPrice: 9.75,
      membershipFee: null,
      hasApp: false,
      websiteUrl: "https://voltgo.com.tr",
      stationCount: 40,
      notes: "DC:40 kWH-160 kWh , Genelde 120kWh"
    };
    
    // Check if Voltgo already exists in the data, if not add it
    const voltgoExists = providers.some(p => p.id === 'voltgo');
    if (!voltgoExists) {
      providers.push(voltgoProvider);
    } else {
      // Update existing Voltgo entry with the notes
      const voltgoIndex = providers.findIndex(p => p.id === 'voltgo');
      if (voltgoIndex !== -1) {
        providers[voltgoIndex].notes = "DC:40 kWH-160 kWh , Genelde 120kWh";
      }
    }
    
    // Ensure the priority providers are at the top
    const priorityProviderIds = ["trugo", "zes", "beefull", "esarj"];
    
    // Filter priority providers
    const priorityProviders = providers.filter(p => 
      priorityProviderIds.includes(p.id)
    );
    
    // Sort priority providers according to the priorityProviderIds order
    priorityProviders.sort((a, b) => {
      return priorityProviderIds.indexOf(a.id) - priorityProviderIds.indexOf(b.id);
    });
    
    // Filter out regular providers (not priority, not Voltgo, not Obişarj, not Voltrun)
    const regularProviders = providers.filter(p => 
      !priorityProviderIds.includes(p.id) && p.id !== 'voltgo' && p.id !== 'obisarj' && p.id !== 'voltrun'
    );
    
    // Find specific providers
    const voltrunProvider = providers.find(p => p.id === 'voltrun');
    const voltgoProvider_final = providers.find(p => p.id === 'voltgo');
    const obisarjProvider = providers.find(p => p.id === 'obisarj');
    
    // Build the final array: priority providers, then regular providers, then Voltrun, then Voltgo, then Obişarj
    const finalProviders = [...priorityProviders, ...regularProviders];
    
    // Add Voltrun
    if (voltrunProvider) {
      finalProviders.push(voltrunProvider);
    }
    
    // Add Voltgo right after Voltrun
    if (voltgoProvider_final) {
      finalProviders.push(voltgoProvider_final);
    }
    
    // Add Obişarj at the very end
    if (obisarjProvider) {
      finalProviders.push(obisarjProvider);
    }
    
    return finalProviders;
  } catch (error) {
    console.error("Failed to fetch provider data:", error);
    throw error;
  }
}

// Simple CSV parser function
function parseCSV(text: string): string[][] {
  const lines = text.split('\n');
  return lines.map(line => {
    // Handle quoted fields with commas inside
    const result = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    // Add the last field
    result.push(currentField);
    return result;
  });
}
