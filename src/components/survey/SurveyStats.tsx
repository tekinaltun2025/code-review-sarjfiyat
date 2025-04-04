
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import SurveyStatCards from './SurveyStatCards';
import SurveyTable from './SurveyTable';

// Yedek veri (API başarısız olursa)
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
    // Component mount edildiğinde veya key değiştiğinde istatistikleri yükle
    console.log("SurveyStats bileşeni yükleniyor, veri çekme işlemi başlıyor...");
    fetchSurveyStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSurveyStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Mock veri yükleme işlemi başlıyor...");
      // API'den veri almak yerine mock veriyi kullan
      // PHP API hataları düzelene kadar
      await new Promise(resolve => setTimeout(resolve, 1000)); // Gerçek bir API çağrısını simüle et
      
      // Mock verileri ayarla
      console.log("Mock veriler yükleniyor:", MOCK_SURVEY_STATS);
      setSurveyStats(MOCK_SURVEY_STATS);
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Anket verileri alınırken hata:", error);
      // Hata durumunda yedek veriyi kullan
      setSurveyStats(MOCK_SURVEY_STATS);
      setError("Anket verileri API'den yüklenirken bir hata oluştu. Örnek veriler gösteriliyor.");
      toast({
        title: "API Hatası",
        description: "Anket verileri yüklenirken bir hata oluştu. Örnek veriler gösteriliyor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log("Veri yükleme işlemi tamamlandı, loading:", false);
    }
  };

  if (loading) {
    console.log("Yükleniyor durumu, loading:", loading);
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

  if (error) {
    console.log("Hata durumu:", error);
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!surveyStats || surveyStats.length === 0) {
    console.log("Veri yok durumu, surveyStats:", surveyStats);
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Henüz değerlendirme bulunmamaktadır.</p>
      </div>
    );
  }

  console.log("Veriler başarıyla yüklendi, gösteriliyor:", surveyStats);
  return (
    <>
      <SurveyStatCards stats={surveyStats} />
      <SurveyTable stats={surveyStats} />
    </>
  );
};

export default SurveyStats;
