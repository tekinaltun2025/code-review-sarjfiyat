
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
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Öne Çıkan Ürün - Khons Şarj Cihazı */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Öne Çıkan Ürün: KHONS Tip 2 Şarj Cihazı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/b9b1761f-720e-4a94-9519-7fc17998b6b0.png" 
                alt="KHONS 22kW 32A Type 2 Ev Şarj Cihazı" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">22kW Güç</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">32A Akım</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">Tip 2 Konnektör</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">IP65 Koruma</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">CE Sertifikalı</Badge>
                </div>
                <p className="text-gray-700 text-lg">
                  6A-32A ayarlanabilir akım, 3 fazlı 22kW yüksek güçlü şarj imkanı sunan bu cihaz, tüm elektrikli araçlarla uyumludur. 
                  5 metre TPU kablo, depolama çantası ile birlikte gelir. LCD ekranı ile kullanım kolaylığı sağlar.
                </p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-700 mr-4">27.900 ₺</span>
                  <Button className="bg-blue-600 hover:bg-blue-700">Detayları Gör</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
