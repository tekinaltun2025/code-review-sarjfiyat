
import { Provider } from "@/data/types/provider.types";

// Direct URL to the published Google Sheet as CSV
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR28VqZAXDGApycSFAqZ7lZGBnlp3cAwZxJaJqsLNy5ImubsKdVf-hVNgysIs8F-ZE6yHe6b7R8D4Ls/pub?output=csv";

// Provider ID to logo mapping
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
  tesla: "/lovable-uploads/ee7cd67b-4d0f-482c-ade0-f02ed83fb68a.png"
};

// Default logo for providers without custom logos
const DEFAULT_LOGO = "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png";

export async function fetchProviderData(): Promise<Provider[]> {
  try {
    // Use the direct CSV URL instead of constructing it from the sheet ID
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    // Parse CSV data
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row and map the rows to provider objects
    const providers: Provider[] = rows.slice(1).map((row: string[]) => {
      const providerId = row[0]?.toLowerCase()?.replace(/\s+/g, '') || `provider-${Math.random().toString(36).substring(2, 9)}`;
      
      return {
        id: providerId,
        name: row[0] || "Unnamed Provider",
        logo: providerLogos[providerId] || DEFAULT_LOGO, // Use mapped logo or default
        acPrice: parseFloat(row[2]) || 0,
        dcPrice: parseFloat(row[3]) || 0,
        fastDcPrice: parseFloat(row[4]) || 0,
        membershipFee: row[5] ? parseFloat(row[5]) : null,
        hasApp: row[6]?.toLowerCase() === "true" || row[6]?.toLowerCase() === "var" || row[6]?.toLowerCase() === "yes" || false,
        websiteUrl: row[7] || "#",
        notes: row[8] || ""
      };
    });
    
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
