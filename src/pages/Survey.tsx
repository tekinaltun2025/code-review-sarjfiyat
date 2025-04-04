
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SurveyForm from "../components/SurveyForm";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Star, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

// Simulated survey stats data
const MOCK_SURVEY_STATS = [
  {
    provider_name: "Trugo",
    average_rating: 4.5,
    response_count: 12,
    comments: [
      "İstasyonları her zaman temiz ve bakımlı.",
      "Fiyatları biraz yüksek ama hizmet kalitesi iyi."
    ]
  },
  {
    provider_name: "ZES",
    average_rating: 4.2,
    response_count: 18,
    comments: [
      "Uygulaması kullanışlı ve konum bilgileri doğru.",
      "Bazen istasyonlarda ufak teknik sorunlar yaşanıyor."
    ]
  },
  {
    provider_name: "Eşarj",
    average_rating: 3.8,
    response_count: 15,
    comments: [
      "Genelde sorunsuz ama bazen şarj hızı beklenenden düşük.",
      "Müşteri hizmetleri çok yardımcı oluyor."
    ]
  },
  {
    provider_name: "Sharz",
    average_rating: 4.0,
    response_count: 10,
    comments: [
      "Şarj istasyonları kolay bulunabilir konumlarda.",
      "Uygulama arayüzü basit ve kullanışlı."
    ]
  },
  {
    provider_name: "Voltrun",
    average_rating: 3.9,
    response_count: 8,
    comments: [
      "Şarj hızı tatmin edici seviyede.",
      "İstasyonların bakımı düzenli yapılıyor."
    ]
  }
];

const Survey = () => {
  const [surveyStats, setSurveyStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSurveyStats();
  }, []);

  const fetchSurveyStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of API call
      setSurveyStats(MOCK_SURVEY_STATS);
      
    } catch (error) {
      console.error("Error fetching survey stats:", error);
      setError("Anket verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      toast({
        title: "Hata",
        description: "Anket verileri yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        )}
        {Array(5 - fullStars - (hasHalfStar ? 1 : 0)).fill(0).map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-5 w-5 text-gray-300" />
        ))}
        <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Survey Results Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Şarj Operatörü Değerlendirme Sonuçları</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Hata</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {loading ? (
            <div className="bg-white shadow rounded-lg overflow-hidden mb-10">
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          ) : surveyStats.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Henüz değerlendirme bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              {/* Değerlendirme Kartları */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {surveyStats.map((stat, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-bold text-xl">{stat.provider_name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{stat.provider_name}</h3>
                          <div className="flex items-center">
                            {renderStarRating(stat.average_rating)}
                            <span className="text-sm text-gray-500 ml-2">({stat.response_count} değerlendirme)</span>
                          </div>
                        </div>
                      </div>
                      {stat.comments && stat.comments.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <p className="text-sm text-gray-500 font-medium mb-2">Son Yorumlar:</p>
                          <div className="max-h-24 overflow-y-auto">
                            {stat.comments.slice(0, 2).map((comment: string, i: number) => (
                              <p key={i} className="text-sm text-gray-600 mb-2 italic">
                                "{comment}"
                              </p>
                            ))}
                            {stat.comments.length > 2 && (
                              <p className="text-xs text-gray-500">
                                +{stat.comments.length - 2} daha fazla yorum
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Değerlendirme Tablosu */}
              <div className="bg-white shadow rounded-lg overflow-hidden mb-10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Operatör</TableHead>
                      <TableHead>Değerlendirme</TableHead>
                      <TableHead>Değerlendirme Sayısı</TableHead>
                      <TableHead>Son Yorumlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surveyStats.map((stat, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <TableCell className="font-medium">{stat.provider_name}</TableCell>
                        <TableCell>{renderStarRating(stat.average_rating)}</TableCell>
                        <TableCell>{stat.response_count}</TableCell>
                        <TableCell>
                          {stat.comments && stat.comments.length > 0 ? (
                            <div className="max-h-32 overflow-y-auto">
                              {stat.comments.slice(0, 2).map((comment: string, i: number) => (
                                <p key={i} className="text-sm text-gray-600 mb-2">
                                  "{comment.substring(0, 100)}{comment.length > 100 ? '...' : ''}"
                                </p>
                              ))}
                              {stat.comments.length > 2 && (
                                <p className="text-xs text-gray-500">
                                  +{stat.comments.length - 2} daha fazla yorum
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Yorum yok</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
        
        <SurveyForm onSubmitted={fetchSurveyStats} />
      </main>
      <Footer />
    </div>
  );
};

export default Survey;
