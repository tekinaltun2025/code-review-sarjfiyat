
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SurveyForm from "../components/survey/SurveyForm";
import SurveyStats from "../components/survey/SurveyStats";

const Survey = () => {
  const refreshStats = () => {
    console.log("Yeni gönderim sonrası anket istatistikleri yenileniyor");
    // Bu fonksiyon SurveyStats'a iletilir ve gerektiğinde çağrılır
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Anket Sonuçları Bölümü */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Şarj Operatörü Değerlendirme Sonuçları</h2>
          <SurveyStats onRefresh={refreshStats} />
        </div>
        
        <SurveyForm onSubmitted={refreshStats} />
      </main>
      <Footer />
    </div>
  );
};

export default Survey;
