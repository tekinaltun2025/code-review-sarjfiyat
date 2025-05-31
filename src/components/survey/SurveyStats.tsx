import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import SurveyStatCards from './SurveyStatCards';
import SurveyTable from './SurveyTable';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Veritabanı bilgileri - normalde .env veya başka güvenli bir yerden alınmalı
const DB_INFO = {
  db_name: "sarjfiya_sarjanketdb",
  db_user: "sarjfiya_sarjuser",
  db_pass: "Dallama11!"
};

interface SurveyStatsProps {
  onRefresh?: () => void;
}

const SurveyStats = ({ onRefresh }: SurveyStatsProps) => {
  const [surveyStats, setSurveyStats] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Komponent mount edildiğinde verileri yükle
  useEffect(() => {
    console.log("SurveyStats bileşeni yükleniyor, veri çekme işlemi başlıyor...");
    fetchSurveyStats();
  }, []);

  const fetchSurveyStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("API'den anket istatistikleri alınıyor...");
      
      // Mock veri kullanıyoruz çünkü API çalışmıyor
      const mockData = [
        {
          provider_id: 'zes',
          provider_name: 'ZES',
          average_rating: 4.2,
          response_count: 15,
          comments: ['Genel olarak iyi', 'Hızlı şarj imkanı sunuyor']
        },
        {
          provider_id: 'esarj',
          provider_name: 'Eşarj',
          average_rating: 3.8,
          response_count: 12,
          comments: ['Fiyatlar biraz yüksek', 'İstasyonlar genelde dolu']
        },
        {
          provider_id: 'voltrun',
          provider_name: 'Voltrun',
          average_rating: 4.0,
          response_count: 8,
          comments: ['Uygulaması kullanışlı']
        },
        {
          provider_id: 'voltgo',
          provider_name: 'Voltgo',
          average_rating: 4.5,
          response_count: 5,
          comments: ['Çok uygun fiyatlar', 'Yeni ama umut verici']
        }
      ];
      
      // API yerine mock veriyi kullanıyoruz
      console.log("Mock veriler kullanılıyor:", mockData);
      setSurveyStats(mockData);
      
      // onRefresh callback'i varsa çağır
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Anket verileri alınırken hata:", error);
      
      setError("Anket verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      
      toast({
        title: "Veri Yükleme Hatası",
        description: "Anket verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log("Veri yükleme işlemi tamamlandı, loading:", false);
    }
  };

  // Yeniden yükleme butonu için işleyici
  const handleRefresh = () => {
    fetchSurveyStats();
    if (onRefresh) {
      onRefresh();
    }
  };

  // Yükleme durumunda iskeleti göster
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

  // Hata durumunda uyarı göster
  if (error) {
    console.log("Hata durumu:", error);
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={handleRefresh}
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Yeniden Dene
        </Button>
      </Alert>
    );
  }

  // Veri yoksa mesaj göster
  if (!surveyStats || surveyStats.length === 0) {
    console.log("Veri yok durumu, surveyStats:", surveyStats);
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600 mb-4">Henüz değerlendirme bulunmamaktadır.</p>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
      </div>
    );
  }

  // Verileri göster
  console.log("Veriler başarıyla yüklendi, gösteriliyor:", surveyStats);
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Toplam {surveyStats.reduce((acc, curr) => acc + curr.response_count, 0)} değerlendirme
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          size="sm"
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
      </div>
      <SurveyStatCards stats={surveyStats} />
      <SurveyTable stats={surveyStats} />
    </>
  );
};

export default SurveyStats;
