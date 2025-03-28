
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Zap, Battery, BatteryCharging } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Ev şarj cihazları için örnek veri
const chargersData = [
  {
    id: 1,
    title: "EcoCharge Home Basic",
    brand: "EcoCharge",
    power: "7.4 kW",
    price: "12.500 ₺",
    description: "Temel ihtiyaçlar için uygun, güvenilir, kompakt tasarımlı ev şarj cihazı. Tüm elektrikli araçlarla uyumlu.",
    features: ["7.4 kW Güç", "Duvar Montajlı", "LED Durum Göstergesi", "IP54 Koruma"],
    installation: "Kolay Kurulum",
    stockStatus: "Stokta",
    isPopular: true,
  },
  {
    id: 2,
    title: "PowerFlow Pro WiFi",
    brand: "PowerFlow",
    power: "11 kW",
    price: "18.750 ₺",
    description: "WiFi bağlantısı ile uzaktan kontrol edilebilen, akıllı şarj özelliklerine sahip ev şarj istasyonu.",
    features: ["11 kW Güç", "WiFi Bağlantı", "Mobil Uygulama", "Zamanlayıcı", "RFID Kart Desteği"],
    installation: "Profesyonel Kurulum Gerekli",
    stockStatus: "Stokta",
    isPopular: true,
  },
  {
    id: 3,
    title: "SmartCharge Home",
    brand: "SmartCharge",
    power: "22 kW",
    price: "24.990 ₺",
    description: "Yüksek güçte şarj imkanı sunan, entegre enerji ölçümü yapabilen premium ev şarj istasyonu.",
    features: ["22 kW Güç (3 Fazlı)", "Enerji Ölçümü", "Dinamik Yük Dengeleme", "4G Bağlantı", "Uzaktan Yazılım Güncelleme"],
    installation: "Profesyonel Kurulum Gerekli",
    stockStatus: "Ön Sipariş",
    isPopular: false,
  },
  {
    id: 4,
    title: "HomeCharger Mini",
    brand: "ChargeTech",
    power: "3.7 kW",
    price: "8.990 ₺",
    description: "Kompakt boyutlu, tek fazlı elektrik bağlantısı ile çalışan ekonomik ev şarj çözümü.",
    features: ["3.7 kW Güç", "Taşınabilir", "Hafif Tasarım", "Temel Güvenlik Koruması"],
    installation: "Kurulum Gerektirmez",
    stockStatus: "Stokta",
    isPopular: false,
  },
  {
    id: 5,
    title: "ElectroDrive Home+",
    brand: "ElectroDrive",
    power: "11 kW",
    price: "16.500 ₺",
    description: "Güç optimizasyonu ve akıllı şarj zamanlama özellikleri ile solar sistemler ile uyumlu çalışabilen şarj istasyonu.",
    features: ["11 kW Güç", "Solar Uyumlu", "Akıllı Zamanlama", "Enerji Yönetimi", "Dokunmatik Ekran"],
    installation: "Profesyonel Kurulum Gerekli",
    stockStatus: "Sınırlı Stok",
    isPopular: true,
  },
  {
    id: 6,
    title: "VoltHome Essential",
    brand: "VoltHome",
    power: "7.4 kW",
    price: "11.990 ₺",
    description: "Dayanıklı dış yüzey, hava koşullarına dirençli, garaj veya açık alanlarda kullanılabilen güvenilir şarj istasyonu.",
    features: ["7.4 kW Güç", "IP65 Koruma", "Hava Koşullarına Dayanıklı", "Kablo Yönetim Sistemi"],
    installation: "Basit Kurulum",
    stockStatus: "Stokta",
    isPopular: false,
  },
];

const HomeChargersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [powerFilter, setPowerFilter] = useState<string>('all');
  
  // Filtreleme işlevi
  const filteredChargers = chargersData.filter(charger => {
    const matchesSearch = charger.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        charger.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        charger.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPower = powerFilter === 'all' || 
                        (powerFilter === 'low' && parseFloat(charger.power) < 7.5) ||
                        (powerFilter === 'medium' && parseFloat(charger.power) >= 7.5 && parseFloat(charger.power) < 15) ||
                        (powerFilter === 'high' && parseFloat(charger.power) >= 15);
    
    return matchesSearch && matchesPower;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="search" className="mb-2 block">Ara</Label>
            <Input
              id="search"
              type="text"
              placeholder="Cihaz adı veya marka ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="powerFilter" className="mb-2 block">Güç Kapasitesi</Label>
            <select
              id="powerFilter"
              value={powerFilter}
              onChange={(e) => setPowerFilter(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="all">Tüm Cihazlar</option>
              <option value="low">7.5 kW Altı</option>
              <option value="medium">7.5 - 15 kW Arası</option>
              <option value="high">15 kW ve Üzeri</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm('');
                setPowerFilter('all');
              }}
              variant="outline"
              className="w-full"
            >
              Filtreleri Temizle
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChargers.map((charger) => (
          <Card key={charger.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="p-6 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-600 font-medium">{charger.brand}</span>
                  {charger.isPopular && (
                    <Badge variant="secondary" className="ml-2">Popüler</Badge>
                  )}
                </div>
                <Badge 
                  variant={
                    charger.stockStatus === "Stokta" ? "default" : 
                    charger.stockStatus === "Sınırlı Stok" ? "secondary" : 
                    "outline"
                  }
                  className="uppercase"
                >
                  {charger.stockStatus}
                </Badge>
              </div>
              <CardTitle className="mt-3 text-xl">{charger.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <BatteryCharging className="h-3 w-3" />
                  {charger.power}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  {charger.installation}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2 flex-grow">
              <CardDescription className="text-gray-600 mt-2">
                {charger.description}
              </CardDescription>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Özellikler:</h4>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  {charger.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-4 border-t flex items-center justify-between">
              <div className="text-xl font-bold text-teal-600">
                {charger.price}
              </div>
              <Button>Detaylar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredChargers.length === 0 && (
        <div className="text-center py-12">
          <BatteryCharging className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Aramanızla eşleşen cihaz bulunamadı</h3>
          <p className="text-gray-500">Lütfen farklı arama kriterleri deneyin veya filtreleri temizleyin.</p>
        </div>
      )}
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ev Şarj Cihazları Hakkında</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-teal-500" />
              Doğru Ev Şarj Cihazını Seçmek
            </h3>
            <p className="text-gray-600">
              Elektrikli aracınız için doğru ev şarj cihazını seçerken, aracınızın şarj kapasitesi, evinizin elektrik altyapısı ve günlük şarj ihtiyaçlarınızı göz önünde bulundurmalısınız. Daha yüksek güçlü cihazlar daha hızlı şarj sağlarken, evinizin elektrik sistemi bu gücü desteklemelidir.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
              <Battery className="mr-2 h-5 w-5 text-teal-500" />
              Kurulum Gereksinimleri
            </h3>
            <p className="text-gray-600">
              Ev şarj cihazları genellikle profesyonel bir elektrikçi tarafından kurulmalıdır. Bazı temel modeller standart prizler ile çalışabilirken, yüksek güçlü cihazlar özel kablolama ve sigortalar gerektirebilir. Kurulum öncesi elektrik altyapınızın uygunluğu kontrol edilmelidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeChargersList;
