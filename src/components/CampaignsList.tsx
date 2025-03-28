
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Tag, TicketCheck } from "lucide-react";
import { providers } from "@/data/providers";

// Kampanya verilerini oluşturalım (gerçek bir API'dan gelebilir)
const campaignsData = [
  {
    id: 1,
    title: "ZES Hafta Sonu İndirimi",
    provider: providers[0],
    description: "Hafta sonu şarj istasyonlarımızda %15 indirim! Cumartesi ve Pazar günleri geçerlidir.",
    validUntil: "28 Aralık 2023",
    discount: "15%",
    category: "İndirim",
    isNew: true,
  },
  {
    id: 2,
    title: "Sharz.net İlk Şarj Kampanyası",
    provider: providers[1],
    description: "Yeni üyelere özel, ilk şarj işleminde 50 TL değerinde bonus şarj hediye!",
    validUntil: "Süresiz",
    discount: "50 TL",
    category: "Bonus",
    isNew: true,
  },
  {
    id: 3,
    title: "Eşarj Sadakat Programı",
    provider: providers[2],
    description: "Her 10 şarj işleminde 1 şarj bedava! Sadakat programına katılmak için uygulamamızı indirin.",
    validUntil: "31 Aralık 2023",
    discount: "1 Şarj Bedava",
    category: "Sadakat",
    isNew: false,
  },
  {
    id: 4,
    title: "Voltrun Gece Şarj İndirimi",
    provider: providers[3],
    description: "Gece 22:00 - Sabah 06:00 arası yapılan tüm şarj işlemlerinde %20 indirim!",
    validUntil: "Süresiz",
    discount: "20%",
    category: "İndirim",
    isNew: false,
  },
  {
    id: 5,
    title: "Powersarj Hafta İçi Avantajı",
    provider: providers[4],
    description: "Hafta içi 09:00-17:00 arası tüm şarj istasyonlarımızda %10 indirim fırsatı.",
    validUntil: "1 Şubat 2024",
    discount: "10%",
    category: "İndirim",
    isNew: true,
  },
  {
    id: 6,
    title: "Trugo Mobil Uygulama Bonusu",
    provider: providers[5],
    description: "Trugo mobil uygulamasını indirin, 100 TL değerinde şarj bonusu kazanın!",
    validUntil: "15 Ocak 2024",
    discount: "100 TL",
    category: "Bonus",
    isNew: false,
  },
];

const CampaignsList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignsData.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-6 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {campaign.provider.logo ? (
                    <img 
                      src={campaign.provider.logo} 
                      alt={campaign.provider.name} 
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {campaign.provider.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm text-gray-600">{campaign.provider.name}</span>
                </div>
                {campaign.isNew && (
                  <Badge variant="destructive" className="uppercase">Yeni</Badge>
                )}
              </div>
              <CardTitle className="mt-3 text-xl">{campaign.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {campaign.category}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TicketCheck className="h-3 w-3" />
                  {campaign.discount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <CardDescription className="text-gray-600 mt-2">
                {campaign.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarCheck className="h-4 w-4 mr-1" />
                <span>Geçerlilik: {campaign.validUntil}</span>
              </div>
              <Button size="sm">Detaylar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;
