
import React, { useState, useCallback } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SurveyForm from "../components/survey/SurveyForm";
import SurveyStats from "../components/survey/SurveyStats";

const Survey = () => {
  const [statsKey, setStatsKey] = useState<number>(0);

  const refreshStats = useCallback(() => {
    console.log("Yeni gönderim sonrası anket istatistikleri yenileniyor");
    setStatsKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Anket Formu Bölümü */}
        <SurveyForm onSubmitted={refreshStats} />
        
        {/* Anket Sonuçları Bölümü */}
        <div className="container mx-auto px-4 py-8 mb-6">
          <h2 className="text-3xl font-bold mb-6">Şarj Operatörü Değerlendirme Sonuçları</h2>
          <SurveyStats key={statsKey} onRefresh={refreshStats} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Survey;
