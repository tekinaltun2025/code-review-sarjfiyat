
import { Card } from "@/components/ui/card";

const MapSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <Card className="border-0 rounded-xl overflow-hidden shadow-lg">
          <div className="h-[810px] w-full">
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
