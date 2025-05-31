
import React, { useState, useCallback, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProviderData } from "@/services/googleSheetsService";
import { Provider } from "@/data/types/provider.types";
import ProviderRatingCard from "../components/survey/ProviderRatingCard";
import SatisfactionRanking from "../components/survey/SatisfactionRanking";

interface SurveyData {
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const Survey = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);

  // Load providers data
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const data = await fetchProviderData();
        setProviders(data);
      } catch (error) {
        console.error("Failed to load providers:", error);
        // Use mock data if API fails
        const mockData: Provider[] = [
          {
            id: 'zes',
            name: 'ZES',
            logo: '/lovable-uploads/ba1d435b-9f77-4746-a06c-2418d2fc09a7.png',
            acPrice: 8.99,
            dcPrice: 12.99,
            fastDcPrice: 12.99,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://zes.net/tr"
          },
          {
            id: 'esarj',
            name: 'Eşarj',
            logo: '/lovable-uploads/9c5da173-d35f-4ee5-af1e-ade7186754c1.png',
            acPrice: 8.9,
            dcPrice: 11.9,
            fastDcPrice: 11.9,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://esarj.com"
          },
          {
            id: 'trugo',
            name: 'Trugo',
            logo: '/lovable-uploads/9c4dd2d3-7787-4798-83a5-c72f0e6b15a1.png',
            acPrice: 8.49,
            dcPrice: 11.82,
            fastDcPrice: 11.82,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://trugo.com.tr"
          },
          {
            id: 'beefull',
            name: 'Beefull',
            logo: '/lovable-uploads/cc0015aa-72d6-4e18-bc05-8c7486d57eb7.png',
            acPrice: 8.99,
            dcPrice: 9.75,
            fastDcPrice: 9.75,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://beefull.com"
          },
          {
            id: 'voltrun',
            name: 'Voltrun',
            logo: '/lovable-uploads/fb66fe81-1208-4c6d-a276-363ee14ce4b9.png',
            acPrice: 9.29,
            dcPrice: 12.49,
            fastDcPrice: 12.49,
            membershipFee: null,
            hasApp: true,
            websiteUrl: "https://voltrun.com"
          }
        ];
        setProviders(mockData);
      } finally {
        setLoading(false);
      }
    };
    
    loadProviders();
  }, []);

  // Load survey data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('surveyData');
    if (savedData) {
      setSurveyData(JSON.parse(savedData));
    }
  }, []);

  // Save survey data to localStorage
  const saveSurveyData = useCallback((newData: SurveyData[]) => {
    localStorage.setItem('surveyData', JSON.stringify(newData));
    setSurveyData(newData);
  }, []);

  // Handle new survey submission
  const handleSurveySubmit = useCallback((providerId: string, providerName: string, rating: number, comment: string) => {
    const newEntry: SurveyData = {
      providerId,
      providerName,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    // Remove any existing entry for this provider by this user (simulate one rating per provider)
    const filteredData = surveyData.filter(entry => entry.providerId !== providerId);
    const updatedData = [...filteredData, newEntry];
    
    saveSurveyData(updatedData);
  }, [surveyData, saveSurveyData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Şarj Operatörü Değerlendirme Anketi</h1>
            <p className="text-white text-center mt-4 max-w-3xl mx-auto">
              Elektrikli araç şarj deneyimlerinizi paylaşın ve diğer kullanıcılara yardımcı olun. 
              Her operatörü 5 yıldız üzerinden değerlendirin ve yorumlarınızı ekleyin.
            </p>
          </div>
        </div>

        {/* Provider Rating Cards */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Şarj Operatörlerini Değerlendirin</h2>
            
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-16 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {providers.map((provider) => (
                  <ProviderRatingCard
                    key={provider.id}
                    provider={provider}
                    onSubmit={handleSurveySubmit}
                    existingRating={surveyData.find(entry => entry.providerId === provider.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Satisfaction Ranking */}
        <SatisfactionRanking surveyData={surveyData} providers={providers} />
      </main>
      <Footer />
    </div>
  );
};

export default Survey;
