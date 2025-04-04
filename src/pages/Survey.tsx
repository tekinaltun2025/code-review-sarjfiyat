
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
      
      // Use a direct URL to the PHP file on the server
      // const response = await fetch(`/api/get-survey-stats.php?db_name=sarjfiya_sarjanketdb&db_user=sarjfiya_sarjanketdb&db_pass=Dallama11!`);
      
      // Simulate a successful response for development purposes until PHP works
      const mockResponse = {
        success: true,
        data: []
      };
      
      setSurveyStats(mockResponse.data);
      
      // Once the PHP endpoint is properly set up on the server, you can uncomment the fetch code
      // and remove the mock response
      
      /* Uncomment this when PHP is working
      if (!response.ok) {
        throw new Error('Failed to fetch survey statistics');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSurveyStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch survey statistics');
      }
      */
      
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
