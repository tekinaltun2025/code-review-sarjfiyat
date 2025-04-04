
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

const Survey = () => {
  const [surveyStats, setSurveyStats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSurveyStats();
  }, []);

  const fetchSurveyStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get-survey-stats.php?db_name=sarjfiya_sarjanketdb&db_user=sarjfiya_sarjanketdb&db_pass=Dallama11!`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch survey statistics');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSurveyStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch survey statistics');
      }
    } catch (error) {
      console.error("Error fetching survey stats:", error);
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
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Anket verileri yükleniyor...</p>
            </div>
          ) : surveyStats.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Henüz değerlendirme bulunmamaktadır.</p>
            </div>
          ) : (
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
          )}
        </div>
        
        <SurveyForm onSubmitted={fetchSurveyStats} />
      </main>
      <Footer />
    </div>
  );
};

export default Survey;
