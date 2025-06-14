
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const FeatureItem = memo<{ title: string; description: string }>(({ title, description }) => (
  <div className="flex items-center gap-4 p-4 bg-white/20 rounded-lg">
    <div className="bg-teal-400 p-2 rounded-full">
      <Star className="h-5 w-5 text-white" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
));

FeatureItem.displayName = 'FeatureItem';

// Feature listesini sabit olarak tanımlayalım
const FEATURES = [
  { title: "Güncel Tarifeler", description: "Tüm operatörlerin en güncel şarj fiyatları" },
  { title: "Şeffaf Fiyatlandırma", description: "Üyelik ücretleri ve tarifeler hakkında tam bilgi" },
  { title: "Tüm Şarj Ağları", description: "Türkiye'deki tüm şarj operatörleri karşılaştırması" }
] as const;

const SurveyHero = memo(() => {
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
            {FEATURES.map((feature) => (
              <FeatureItem 
                key={feature.title}
                title={feature.title} 
                description={feature.description} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

SurveyHero.displayName = 'SurveyHero';

export default SurveyHero;
