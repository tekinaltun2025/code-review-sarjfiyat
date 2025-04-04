
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const SurveyHero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl p-8 mb-10 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Elektrikli Araç Şarj Fiyatlarını Karşılaştırın</h1>
          <p className="text-lg mb-6">
            Türkiye'deki tüm şarj istasyonu operatörlerinin güncel fiyatlarını karşılaştırın,
            sizin için en ekonomik şarj noktasını bulun.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Fiyatları Karşılaştır
          </Button>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="grid gap-4">
            <FeatureItem title="Güncel Tarifeler" description="Tüm operatörlerin en güncel şarj fiyatları" />
            <FeatureItem title="Şeffaf Fiyatlandırma" description="Üyelik ücretleri ve tarifeler hakkında tam bilgi" />
            <FeatureItem title="Tüm Şarj Ağları" description="Türkiye'deki tüm şarj operatörleri karşılaştırması" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/20 rounded-lg">
      <div className="bg-teal-400 p-2 rounded-full">
        <Star className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SurveyHero;
