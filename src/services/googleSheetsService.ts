
import { Provider } from "@/data/types/provider.types";

// We'll use the sheets API v4 to fetch data from a public Google Sheet
// Note: This sheet must be publicly accessible with "Anyone with the link can view"
const SHEET_ID = "1KLBQYxRzeesboC038qEyLK_Y8J1Uhs2TPh3lkCMoD-Q";

export async function fetchProviderData(): Promise<Provider[]> {
  try {
    // For public Google Sheets, we can use the export as CSV feature
    // which doesn't require an API key
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    // Parse CSV data
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row and map the rows to provider objects
    const providers: Provider[] = rows.slice(1).map((row: string[]) => {
      return {
        id: row[0]?.toLowerCase()?.replace(/\s+/g, '') || `provider-${Math.random().toString(36).substring(2, 9)}`,
        name: row[0] || "Unnamed Provider",
        logo: row[1] || "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png", // Default logo
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
