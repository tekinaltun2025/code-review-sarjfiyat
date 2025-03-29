
import { Card } from "@/components/ui/card";

const MapSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Şarj İstasyonları Haritası
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Türkiye genelindeki elektrikli araç şarj istasyonlarının konumlarını haritada görüntüleyebilirsiniz.
          </p>
        </div>
        
        <Card className="border-0 rounded-xl overflow-hidden shadow-lg">
          <div className="h-[360px] w-full">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1lBaxe2y6AUWzrXmXBX7apjvo8ZTKz90&femb=1&ll=38.64664278573175%2C35.050516500000015&z=7" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Türkiye Elektrikli Araç Şarj İstasyonları Haritası"
              className="w-full h-full"
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
