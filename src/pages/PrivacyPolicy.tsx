import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  const lastUpdated = '18 Nisan 2026';

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Gizlilik Politikası | ŞarjFiyat';

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      const prev = el.content;
      el.content = content;
      return () => { el!.content = prev; };
    };

    const setCanonical = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const created = !el;
      if (!el) {
        el = document.createElement('link');
        el.rel = 'canonical';
        document.head.appendChild(el);
      }
      const prev = el.href;
      el.href = href;
      return () => {
        if (created) el!.remove();
        else el!.href = prev;
      };
    };

    const restoreDesc = setMeta(
      'description',
      'ŞarjFiyat gizlilik politikası: kişisel verilerin işlenmesi, çerezler, üçüncü taraf hizmetler ve KVKK kapsamındaki haklarınız.'
    );
    const restoreCanonical = setCanonical('https://sarjfiyat.com.tr/gizlilik-politikasi');

    return () => {
      document.title = prevTitle;
      restoreDesc();
      restoreCanonical();
    };
  }, []);

  const content = (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Gizlilik Politikası
          </h1>
          <p className="text-white/90 text-center mt-3 text-sm">
            Son güncelleme: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">1. Giriş</h2>
            <p>
              ŞarjFiyat ("biz", "site") olarak, <a href="https://sarjfiyat.com.tr" className="text-teal-600 hover:underline">sarjfiyat.com.tr</a> adresini ziyaret eden kullanıcılarımızın gizliliğine önem veriyoruz. Bu Gizlilik Politikası, sitemizi kullandığınızda hangi bilgilerin toplandığını, nasıl kullanıldığını, kimlerle paylaşıldığını ve sahip olduğunuz hakları açıklamaktadır.
            </p>
            <p className="mt-3">
              Sitemizi kullanarak bu politikada belirtilen uygulamaları kabul etmiş sayılırsınız. Politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak hazırlanmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">2. Veri Sorumlusu</h2>
            <p>
              KVKK kapsamında veri sorumlusu ŞarjFiyat'tır. İletişim bilgileri:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>E-posta: <a href="mailto:info@sarjfiyat.com.tr" className="text-teal-600 hover:underline">info@sarjfiyat.com.tr</a></li>
              <li>Telefon: <a href="tel:+905443883888" className="text-teal-600 hover:underline">0544 388 38 88</a></li>
              <li>Adres: Adapazarı, Sakarya / Türkiye</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">3. Toplanan Bilgiler</h2>
            <p>Sitemizi kullanırken aşağıdaki bilgiler toplanabilir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Otomatik olarak toplanan veriler:</strong> IP adresi, tarayıcı türü ve sürümü, işletim sistemi, ziyaret edilen sayfalar, ziyaret tarihi/saati, yönlendiren URL ve cihaz bilgileri.
              </li>
              <li>
                <strong>Çerezler aracılığıyla toplanan veriler:</strong> Oturum bilgileri, tercihler, anonim analitik veriler.
              </li>
              <li>
                <strong>Sizin sağladığınız veriler:</strong> Anket formları üzerinden ilettiğiniz değerlendirmeler, yorumlar ve iletişim için verdiğiniz e-posta adresi gibi bilgiler.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">4. Verilerin Kullanım Amaçları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Site içeriğini ve şarj fiyatları karşılaştırmasını sunmak</li>
              <li>Kullanıcı deneyimini iyileştirmek ve site performansını ölçmek</li>
              <li>Anonim istatistikler oluşturmak (ziyaretçi sayıları, popüler sayfalar vb.)</li>
              <li>Kullanıcı geri bildirimlerini ve anket sonuçlarını değerlendirmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
              <li>Reklam gösterimi ve içerik kişiselleştirmesi (Google AdSense aracılığıyla)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">5. Çerezler (Cookies)</h2>
            <p>
              Sitemiz; oturumun düzgün çalışması, tercihlerin hatırlanması ve trafik analizi için çerez kullanmaktadır. Kullandığımız çerez türleri:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir.</li>
              <li><strong>Analitik çerezler:</strong> Ziyaretçi davranışını anlamak için (ör. Google Analytics).</li>
              <li><strong>Reklam çerezleri:</strong> İlginizi çekebilecek reklamların gösterilmesi için (ör. Google AdSense).</li>
            </ul>
            <p className="mt-3">
              Tarayıcınızın ayarlarından çerezleri her zaman silebilir veya engelleyebilirsiniz. Ancak bazı özellikler düzgün çalışmayabilir. Site ilk ziyaretinizde gösterilen çerez bildirimi üzerinden tercihinizi belirtebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">6. Üçüncü Taraf Hizmetler</h2>
            <p>Sitemizde aşağıdaki üçüncü taraf hizmetler kullanılmaktadır:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Google AdSense</strong> – reklam gösterimi</li>
              <li><strong>Google Analytics</strong> – ziyaretçi analizi</li>
              <li><strong>Google Fonts</strong> – yazı tipi sunumu</li>
              <li><strong>Google Sheets</strong> – fiyat verilerinin alınması</li>
            </ul>
            <p className="mt-3">
              Bu hizmetler, kendi gizlilik politikaları çerçevesinde veri işleyebilir. Google'ın gizlilik politikasına <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">buradan</a> ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">7. Verilerin Paylaşımı</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle pazarlama amacıyla paylaşılmaz, satılmaz veya kiralanmaz. Yalnızca yukarıda belirtilen hizmet sağlayıcılar ile sınırlı amaçlarla paylaşılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">8. Veri Saklama Süresi</h2>
            <p>
              Toplanan veriler, işleme amacının gerektirdiği süre boyunca veya yasal saklama yükümlülükleri çerçevesinde saklanır. Bu sürenin sonunda veriler silinir, yok edilir veya anonim hale getirilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">9. Veri Güvenliği</h2>
            <p>
              Verilerinizi yetkisiz erişim, değiştirme, ifşa veya imhaya karşı korumak için makul teknik ve idari güvenlik önlemleri alıyoruz. Ancak internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olmadığını hatırlatmak isteriz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">10. KVKK Kapsamındaki Haklarınız</h2>
            <p>KVKK madde 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Aktarıldığı üçüncü kişileri öğrenme</li>
              <li>Otomatik sistemlerle analiz sonucu aleyhe çıkan sonuca itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme</li>
            </ul>
            <p className="mt-3">
              Bu haklarınızı kullanmak için <a href="mailto:info@sarjfiyat.com.tr" className="text-teal-600 hover:underline">info@sarjfiyat.com.tr</a> adresine başvurabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">11. Çocukların Gizliliği</h2>
            <p>
              Sitemiz 13 yaşın altındaki çocuklara yönelik değildir ve bilerek bu yaş grubundan veri toplamaz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">12. Politikadaki Değişiklikler</h2>
            <p>
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında bu sayfada yayımlanır ve "son güncelleme" tarihi yenilenir. Sayfayı düzenli olarak gözden geçirmenizi öneririz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">13. İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için bizimle <a href="mailto:info@sarjfiyat.com.tr" className="text-teal-600 hover:underline">info@sarjfiyat.com.tr</a> adresinden iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );

  if (isInPanel) return content;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {content}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
