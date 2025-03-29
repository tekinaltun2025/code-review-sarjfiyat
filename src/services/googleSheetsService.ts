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
  powersarj: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png"
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
  powersarj: "https://powersarj.com"
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
  powersarj: 22
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
    
    // Ensure the priority providers are at the top
    const priorityProviderIds = ["trugo", "zes", "beefull", "esarj"];
    
    // Filter out priority providers
    const priorityProviders = providers.filter(p => 
      priorityProviderIds.includes(p.id)
    );
    
    // Sort priority providers according to the priorityProviderIds order
    priorityProviders.sort((a, b) => {
      return priorityProviderIds.indexOf(a.id) - priorityProviderIds.indexOf(b.id);
    });
    
    // Filter out non-priority providers
    const otherProviders = providers.filter(p => 
      !priorityProviderIds.includes(p.id)
    );
    
    return [...priorityProviders, ...otherProviders];
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
