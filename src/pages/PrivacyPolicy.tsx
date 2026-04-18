import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PolicySection {
  title: string;
  /** array of paragraph strings or `{ list: string[] }` items rendered in order */
  blocks: Array<string | { list: string[] }>;
}

const useSections = (): PolicySection[] => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  return useMemo<PolicySection[]>(() => {
    if (lang === 'en') {
      return [
        {
          title: '1. Introduction',
          blocks: [
            'ŞarjFiyat ("we", "the site") values the privacy of users who visit sarjfiyat.com.tr. This Privacy Policy explains what information is collected when you use our site, how it is used, with whom it is shared, and what rights you have.',
            'By using our site you accept the practices described in this policy. The policy has been prepared in accordance with the Turkish Personal Data Protection Law no. 6698 (KVKK) and applicable regulations.',
          ],
        },
        {
          title: '2. Data Controller',
          blocks: [
            'Under KVKK, the data controller is ŞarjFiyat. Contact details:',
            { list: [
              'Email: info@sarjfiyat.com.tr',
              'Phone: +90 544 388 38 88',
              'Address: Adapazarı, Sakarya / Türkiye',
            ]},
          ],
        },
        {
          title: '3. Information Collected',
          blocks: [
            'When you use our site the following data may be collected:',
            { list: [
              'Automatically collected data: IP address, browser type and version, operating system, pages visited, visit date/time, referring URL and device information.',
              'Data collected via cookies: session info, preferences, anonymous analytics.',
              'Data you provide: ratings, comments, and contact details (e.g. email) submitted via survey or contact forms.',
            ]},
          ],
        },
        {
          title: '4. Purposes of Use',
          blocks: [
            { list: [
              'Provide site content and the charging price comparison',
              'Improve user experience and measure site performance',
              'Generate anonymous statistics (visitor counts, popular pages, etc.)',
              'Evaluate user feedback and survey results',
              'Comply with legal obligations',
              'Display ads and personalize content (via Google AdSense)',
            ]},
          ],
        },
        {
          title: '5. Cookies',
          blocks: [
            'Our site uses cookies for proper session handling, remembering preferences, and traffic analysis. Cookie categories:',
            { list: [
              'Essential cookies: required for core site functionality.',
              'Analytics cookies: to understand visitor behavior (e.g. Google Analytics).',
              'Advertising cookies: to display ads of interest (e.g. Google AdSense).',
            ]},
            'You can always delete or block cookies through your browser settings, but some features may not work properly. You can express your preference via the cookie notice shown on your first visit.',
          ],
        },
        {
          title: '6. Third-Party Services',
          blocks: [
            'We use the following third-party services:',
            { list: [
              'Google AdSense – ad delivery',
              'Google Analytics – visitor analytics',
              'Google Fonts – font delivery',
              'Google Sheets – pricing data sourcing',
            ]},
            "These services may process data under their own privacy policies. You can review Google's privacy policy here: https://policies.google.com/privacy",
          ],
        },
        {
          title: '7. Data Sharing',
          blocks: [
            'Your personal data is not sold, rented, or shared with third parties for marketing purposes, except as required by law. It is only shared with the service providers listed above for limited purposes.',
          ],
        },
        {
          title: '8. Retention Period',
          blocks: [
            'Collected data is retained for as long as required for processing purposes or to fulfil legal retention obligations. After that period the data is deleted, destroyed, or anonymized.',
          ],
        },
        {
          title: '9. Data Security',
          blocks: [
            'We take reasonable technical and administrative measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no transmission over the internet is 100% secure.',
          ],
        },
        {
          title: '10. Your Rights Under KVKK',
          blocks: [
            'Pursuant to KVKK Article 11 you have the following rights:',
            { list: [
              'Learn whether your personal data is processed',
              'Request information about the processing',
              'Learn the purpose of processing and whether it is used for that purpose',
              'Request correction of incomplete or incorrect data',
              'Request deletion or destruction',
              'Learn about third parties to whom data has been transferred',
              'Object to results that disadvantage you arising solely from automated analysis',
              'Claim compensation for damages from unlawful processing',
            ]},
            'To exercise these rights please contact info@sarjfiyat.com.tr.',
          ],
        },
        {
          title: '11. Children\u2019s Privacy',
          blocks: [
            'Our site is not directed to children under 13 and we do not knowingly collect data from this age group.',
          ],
        },
        {
          title: '12. Changes to this Policy',
          blocks: [
            'This Privacy Policy may be updated from time to time. Material changes will be posted on this page and the "last updated" date will be refreshed. We recommend reviewing this page periodically.',
          ],
        },
        {
          title: '13. Contact',
          blocks: [
            'For questions about our privacy policy please contact us at info@sarjfiyat.com.tr.',
          ],
        },
      ];
    }

    return [
      {
        title: '1. Giriş',
        blocks: [
          'ŞarjFiyat ("biz", "site") olarak, sarjfiyat.com.tr adresini ziyaret eden kullanıcılarımızın gizliliğine önem veriyoruz. Bu Gizlilik Politikası, sitemizi kullandığınızda hangi bilgilerin toplandığını, nasıl kullanıldığını, kimlerle paylaşıldığını ve sahip olduğunuz hakları açıklamaktadır.',
          'Sitemizi kullanarak bu politikada belirtilen uygulamaları kabul etmiş sayılırsınız. Politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak hazırlanmıştır.',
        ],
      },
      {
        title: '2. Veri Sorumlusu',
        blocks: [
          'KVKK kapsamında veri sorumlusu ŞarjFiyat\'tır. İletişim bilgileri:',
          { list: [
            'E-posta: info@sarjfiyat.com.tr',
            'Telefon: 0544 388 38 88',
            'Adres: Adapazarı, Sakarya / Türkiye',
          ]},
        ],
      },
      {
        title: '3. Toplanan Bilgiler',
        blocks: [
          'Sitemizi kullanırken aşağıdaki bilgiler toplanabilir:',
          { list: [
            'Otomatik olarak toplanan veriler: IP adresi, tarayıcı türü ve sürümü, işletim sistemi, ziyaret edilen sayfalar, ziyaret tarihi/saati, yönlendiren URL ve cihaz bilgileri.',
            'Çerezler aracılığıyla toplanan veriler: oturum bilgileri, tercihler, anonim analitik veriler.',
            'Sizin sağladığınız veriler: anket formları üzerinden ilettiğiniz değerlendirmeler, yorumlar ve iletişim için verdiğiniz e-posta adresi gibi bilgiler.',
          ]},
        ],
      },
      {
        title: '4. Verilerin Kullanım Amaçları',
        blocks: [
          { list: [
            'Site içeriğini ve şarj fiyatları karşılaştırmasını sunmak',
            'Kullanıcı deneyimini iyileştirmek ve site performansını ölçmek',
            'Anonim istatistikler oluşturmak (ziyaretçi sayıları, popüler sayfalar vb.)',
            'Kullanıcı geri bildirimlerini ve anket sonuçlarını değerlendirmek',
            'Yasal yükümlülükleri yerine getirmek',
            'Reklam gösterimi ve içerik kişiselleştirmesi (Google AdSense aracılığıyla)',
          ]},
        ],
      },
      {
        title: '5. Çerezler (Cookies)',
        blocks: [
          'Sitemiz; oturumun düzgün çalışması, tercihlerin hatırlanması ve trafik analizi için çerez kullanmaktadır. Kullandığımız çerez türleri:',
          { list: [
            'Zorunlu çerezler: sitenin temel işlevleri için gereklidir.',
            'Analitik çerezler: ziyaretçi davranışını anlamak için (ör. Google Analytics).',
            'Reklam çerezleri: ilginizi çekebilecek reklamların gösterilmesi için (ör. Google AdSense).',
          ]},
          'Tarayıcınızın ayarlarından çerezleri her zaman silebilir veya engelleyebilirsiniz. Ancak bazı özellikler düzgün çalışmayabilir. Site ilk ziyaretinizde gösterilen çerez bildirimi üzerinden tercihinizi belirtebilirsiniz.',
        ],
      },
      {
        title: '6. Üçüncü Taraf Hizmetler',
        blocks: [
          'Sitemizde aşağıdaki üçüncü taraf hizmetler kullanılmaktadır:',
          { list: [
            'Google AdSense – reklam gösterimi',
            'Google Analytics – ziyaretçi analizi',
            'Google Fonts – yazı tipi sunumu',
            'Google Sheets – fiyat verilerinin alınması',
          ]},
          "Bu hizmetler, kendi gizlilik politikaları çerçevesinde veri işleyebilir. Google'ın gizlilik politikasına https://policies.google.com/privacy adresinden ulaşabilirsiniz.",
        ],
      },
      {
        title: '7. Verilerin Paylaşımı',
        blocks: [
          'Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle pazarlama amacıyla paylaşılmaz, satılmaz veya kiralanmaz. Yalnızca yukarıda belirtilen hizmet sağlayıcılar ile sınırlı amaçlarla paylaşılabilir.',
        ],
      },
      {
        title: '8. Veri Saklama Süresi',
        blocks: [
          'Toplanan veriler, işleme amacının gerektirdiği süre boyunca veya yasal saklama yükümlülükleri çerçevesinde saklanır. Bu sürenin sonunda veriler silinir, yok edilir veya anonim hale getirilir.',
        ],
      },
      {
        title: '9. Veri Güvenliği',
        blocks: [
          'Verilerinizi yetkisiz erişim, değiştirme, ifşa veya imhaya karşı korumak için makul teknik ve idari güvenlik önlemleri alıyoruz. Ancak internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olmadığını hatırlatmak isteriz.',
        ],
      },
      {
        title: '10. KVKK Kapsamındaki Haklarınız',
        blocks: [
          'KVKK madde 11 uyarınca aşağıdaki haklara sahipsiniz:',
          { list: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
            'İşlenmişse buna ilişkin bilgi talep etme',
            'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
            'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
            'Silinmesini veya yok edilmesini isteme',
            'Aktarıldığı üçüncü kişileri öğrenme',
            'Otomatik sistemlerle analiz sonucu aleyhe çıkan sonuca itiraz etme',
            'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme',
          ]},
          'Bu haklarınızı kullanmak için info@sarjfiyat.com.tr adresine başvurabilirsiniz.',
        ],
      },
      {
        title: '11. Çocukların Gizliliği',
        blocks: [
          'Sitemiz 13 yaşın altındaki çocuklara yönelik değildir ve bilerek bu yaş grubundan veri toplamaz.',
        ],
      },
      {
        title: '12. Politikadaki Değişiklikler',
        blocks: [
          'Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında bu sayfada yayımlanır ve "son güncelleme" tarihi yenilenir. Sayfayı düzenli olarak gözden geçirmenizi öneririz.',
        ],
      },
      {
        title: '13. İletişim',
        blocks: [
          'Gizlilik politikamızla ilgili sorularınız için bizimle info@sarjfiyat.com.tr adresinden iletişime geçebilirsiniz.',
        ],
      },
    ];
  }, [lang]);
};

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isInPanel = location.pathname.startsWith('/panel');
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';
  const lastUpdated = lang === 'en' ? 'April 18, 2026' : '18 Nisan 2026';
  const sections = useSections();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = lang === 'en'
      ? 'Privacy Policy | ŞarjFiyat'
      : 'Gizlilik Politikası | ŞarjFiyat';

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

    const restoreDesc = setMeta(
      'description',
      lang === 'en'
        ? "ŞarjFiyat privacy policy: how personal data is processed, cookies, third-party services and your rights under Türkiye's KVKK."
        : 'ŞarjFiyat gizlilik politikası: kişisel verilerin işlenmesi, çerezler, üçüncü taraf hizmetler ve KVKK kapsamındaki haklarınız.'
    );

    return () => {
      document.title = prevTitle;
      restoreDesc();
    };
  }, [lang]);

  const content = (
    <main className="flex-grow">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-900 dark:via-slate-900 dark:to-slate-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            {t('privacy.title')}
          </h1>
          <p className="text-white/90 text-center mt-3 text-sm">
            {t('privacy.lastUpdated')}: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-card text-card-foreground border border-border rounded-lg shadow-md p-6 md:p-10 space-y-8 leading-relaxed">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold mb-3 text-foreground">{section.title}</h2>
              {section.blocks.map((block, i) =>
                typeof block === 'string' ? (
                  <p key={i} className={i > 0 ? 'mt-3' : ''}>{block}</p>
                ) : (
                  <ul key={i} className="list-disc pl-6 mt-2 space-y-1">
                    {block.list.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );

  if (isInPanel) return content;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {content}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
