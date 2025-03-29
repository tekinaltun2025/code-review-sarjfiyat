
import { Provider } from "@/data/types/provider.types";

const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1KLBQYxRzeesboC038qEyLK_Y8J1Uhs2TPh3lkCMoD-Q/edit?gid=0";
const SHEET_ID = "1KLBQYxRzeesboC038qEyLK_Y8J1Uhs2TPh3lkCMoD-Q";
const API_KEY = "AIzaSyBwMVSRKmKZVZLHlwKKjlULk9VBpSOc9Ko"; // This is a public API key meant for client-side use

export async function fetchProviderData(): Promise<Provider[]> {
  try {
    // Google Sheets API v4 endpoint for public sheets
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:K100?key=${API_KEY}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    const rows = data.values || [];
    
    // Map the rows to provider objects
    const providers: Provider[] = rows.map((row: any) => {
      // Make sure to handle potential missing values
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
