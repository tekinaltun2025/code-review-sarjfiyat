
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  
  const content = (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Hakkımızda</h1>
          <p className="text-white text-center mt-4 max-w-3xl mx-auto">
            ŞarjFiyat, elektrikli araç kullanıcılarına Türkiye'deki şarj istasyonu operatörlerinin fiyatlarını
            karşılaştırma imkanı sunan bağımsız bir platformdur.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6">Misyonumuz</h2>
            <p className="text-gray-700 mb-4">
              ŞarjFiyat olarak misyonumuz, elektrikli araç kullanıcılarına şeffaf ve güncel fiyat bilgisi sunarak, 
              en uygun şarj çözümünü bulmalarına yardımcı olmaktır. Türkiye'deki elektrikli araç ekosisteminin 
              gelişmesine katkıda bulunmayı ve elektrikli araç kullanımını yaygınlaştırmayı hedefliyoruz.
            </p>
            <p className="text-gray-700">
              Bağımsız bir platform olarak, tüm şarj istasyonu operatörlerinin güncel fiyatlarını tarafsız bir şekilde 
              karşılaştırarak, kullanıcıların bilinçli tercihler yapmasını sağlıyoruz.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">İletişim</h2>
            <p className="text-gray-700 mb-6">
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-teal-500">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  E-posta ile iletişim
                </h3>
                <p className="text-gray-600">
                  <a href="mailto:info@sarjfiyat.com" className="text-teal-600 hover:underline">info@sarjfiyat.com</a>
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-teal-500">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Telefon ile iletişim
                </h3>
                <p className="text-gray-600">
                  <a href="tel:05443883888" className="text-teal-600 hover:underline">0544 388 38 88</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
  // Panel içinde gösteriliyorsa, sadece içeriği döndür
  if (isInPanel) {
    return content;
  }
  
  // Normal sayfada gösteriliyorsa, header ve footer ile birlikte göster
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {content}
      <Footer />
    </div>
  );
};

export default AboutPage;
