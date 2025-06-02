
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

const MapSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            // Harita görünür alana geldiğinde 500ms gecikme ile yükle
            setTimeout(() => {
              setShouldLoad(true);
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px' // Harita görünür alana gelmeden 100px önce başlat
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, [shouldLoad]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <Card className="border-0 rounded-xl overflow-hidden shadow-lg">
          <div 
            ref={mapRef}
            className="h-[400px] md:h-[600px] lg:h-[810px] w-full relative"
          >
            {!shouldLoad && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Harita yükleniyor...</p>
                </div>
              </div>
            )}
            
            {shouldLoad && !isLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-500 mx-auto mb-2" />
                  <p className="text-gray-500">Harita yükleniyor...</p>
                </div>
              </div>
            )}
            
            {shouldLoad && (
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
                onLoad={handleIframeLoad}
              />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
