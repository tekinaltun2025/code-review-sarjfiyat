
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Zap, Battery, BatteryCharging } from "lucide-react";

const HomeChargersList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Öne Çıkan Ürün - Khons Şarj Cihazı */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">Öne Çıkan Ürün: KHONS Tip 2 Şarj Cihazı</h2>
          
          {/* Image first in full width */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/b9b1761f-720e-4a94-9519-7fc17998b6b0.png" 
              alt="KHONS 22kW 32A Type 2 Ev Şarj Cihazı" 
              className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-md"
            />
          </div>
          
          {/* Details below */}
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">22kW Güç</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">32A Akım</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">Tip 2 Konnektör</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">IP65 Koruma</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">CE Sertifikalı</Badge>
            </div>
            
            <div className="text-gray-700 space-y-4">
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Genel Bakış</h3>
                <p>Türkiye müşterilerinin dikkatine: AliExpress platformundaki kısıtlamalar nedeniyle, gördüğünüz nakliye yeri İtalya'dır, ancak gerçek nakliye konumu İstanbul'dur ve fiyata zaten vergi dahildir. Herhangi bir ek ücret ödemenize gerek yoktur.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Özellikler</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>32A üç fazlı 22kw</li>
                  <li>110V-450V arasında çalışabilir</li>
                  <li>Ayarlanabilir 6A-32A akım</li>
                  <li>Şarj başlatma süresi 1-9 saate ayarlanabilir</li>
                  <li>5m kablo</li>
                  <li>IP65 koruma</li>
                  <li>Gizlilik korunur</li>
                  <li>Dinamik yük dengeleme</li>
                  <li>Taşınabilir/duvara monte</li>
                  <li>RCD: A Tipi AC 30mA+DC 6mA</li>
                  <li>Standart: IEC62196</li>
                  <li>Ekran boyutu: 1,54 inç</li>
                  <li>Kablo özellikleri: 5*6mm2+1*0,75mm2/2*0,5mm2</li>
                  <li>Sertifikalar: CE, ROHS, FCC, CQC, TUV, UKCA, TSE, UL, RCM, vb.</li>
                  <li>Garanti: 2 yıl garanti</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Koruma Özellikleri</h3>
                <ul className="list-disc pl-5 grid grid-cols-2 gap-1">
                  <li>Düşük voltaj koruması</li>
                  <li>Kısa devre koruması</li>
                  <li>Aşırı sıcaklık koruması</li>
                  <li>Zemin koruması</li>
                  <li>UV direnci</li>
                  <li>Aşırı voltaj koruması</li>
                  <li>Aşırı yük koruması</li>
                  <li>Sızıntı koruması</li>
                  <li>Yıldırımdan korunma</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Uyumluluk</h3>
                <p>Ürünlerimiz TOGG, Toyota, Tesla, MG, Renault, BYD, BMW, Nissan, Audi, Mercedes Benz, Kia, Volvo, Volkswagen ve diğer araçlarla uyumludur. Aslında ürünümüz tüm saf elektrikli ve hibrit araçlarla uyumludur.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Kullanım</h3>
                <p>Fişi prize takın, gerekli şarj akımını cihazdaki "AMPS" düğmesi aracılığıyla ayarlayın, şarj başlatma süresini ayarlamak için "TIME" düğmesine basın (1 saat-9 saat olarak ayarlanabilir), ardından fişi araca takın ve şarj etmeye başlayın.</p>
              </div>
            </div>
            
            <div className="flex items-center pt-6">
              <span className="text-2xl font-bold text-blue-700 mr-4">27.900 ₺</span>
              <Button className="bg-blue-600 hover:bg-blue-700">Detayları Gör</Button>
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
