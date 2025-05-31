
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, TrendingDown, Medal } from "lucide-react";
import { Provider } from "@/data/types/provider.types";

interface SurveyData {
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface SatisfactionRankingProps {
  surveyData: SurveyData[];
  providers: Provider[];
}

interface RankingData {
  providerId: string;
  providerName: string;
  averageRating: number;
  totalRatings: number;
  logo?: string;
}

const SatisfactionRanking = ({ surveyData, providers }: SatisfactionRankingProps) => {
  const rankingData = useMemo(() => {
    if (surveyData.length === 0) return [];

    // Group ratings by provider
    const providerRatings: Record<string, number[]> = {};
    
    surveyData.forEach(entry => {
      if (!providerRatings[entry.providerId]) {
        providerRatings[entry.providerId] = [];
      }
      providerRatings[entry.providerId].push(entry.rating);
    });

    // Calculate average ratings
    const rankings: RankingData[] = Object.entries(providerRatings).map(([providerId, ratings]) => {
      const provider = providers.find(p => p.id === providerId);
      const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      
      return {
        providerId,
        providerName: provider?.name || 'Bilinmeyen Operatör',
        averageRating,
        totalRatings: ratings.length,
        logo: provider?.logo
      };
    });

    // Sort by average rating (descending)
    return rankings.sort((a, b) => b.averageRating - a.averageRating);
  }, [surveyData, providers]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-50" />
        )}
        {Array(5 - fullStars - (hasHalfStar ? 1 : 0)).fill(0).map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Medal className="h-6 w-6 text-yellow-500" />;
      case 1: return <Medal className="h-6 w-6 text-gray-400" />;
      case 2: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="h-6 w-6 flex items-center justify-center text-lg font-bold text-gray-500">{index + 1}</span>;
    }
  };

  if (rankingData.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Memnuniyet Sıralaması</h2>
            <p className="text-gray-600">
              Henüz değerlendirme yapılmamış. İlk değerlendirmeyi siz yapın!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-teal-500" />
            Şarj Operatörü Memnuniyet Sıralaması
          </h2>
          
          <div className="grid gap-4">
            {rankingData.map((item, index) => (
              <Card key={item.providerId} className={`transition-all hover:shadow-md ${
                index === 0 ? 'ring-2 ring-yellow-400 bg-yellow-50' : 
                index === 1 ? 'ring-2 ring-gray-300 bg-gray-50' :
                index === 2 ? 'ring-2 ring-amber-500 bg-amber-50' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index)}
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center gap-3 flex-grow">
                      {item.logo && (
                        <img 
                          src={item.logo} 
                          alt={item.providerName} 
                          className="h-10 w-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{item.providerName}</h3>
                        <p className="text-sm text-gray-600">
                          {item.totalRatings} değerlendirme
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      {renderStars(item.averageRating)}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {item.averageRating.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">5 üzerinden</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Sıralama, kullanıcı değerlendirmelerinin ortalamasına göre yapılmaktadır.
              Toplam {surveyData.length} değerlendirme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionRanking;
