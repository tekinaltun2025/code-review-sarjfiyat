
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import SurveyStatCards from './SurveyStatCards';
import SurveyTable from './SurveyTable';

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

interface SurveyStatsProps {
  onRefresh?: () => void;
}

const SurveyStats = ({ onRefresh }: SurveyStatsProps) => {
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
      
      if (onRefresh) {
        onRefresh();
      }
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

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden mb-10">
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (surveyStats.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Henüz değerlendirme bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <>
      <SurveyStatCards stats={surveyStats} />
      <SurveyTable stats={surveyStats} />
    </>
  );
};

export default SurveyStats;
