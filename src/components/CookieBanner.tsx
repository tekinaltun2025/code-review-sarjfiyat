import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay to not block initial render
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            Bu site, deneyiminizi iyileştirmek için çerezler kullanmaktadır. 
            Siteyi kullanmaya devam ederek{' '}
            <a href="/gizlilik-politikasi" className="text-primary underline hover:no-underline">
              Gizlilik Politikamızı
            </a>{' '}
            kabul etmiş olursunuz.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
            className="text-xs"
          >
            Reddet
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
            className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Kabul Et
          </Button>
          <button 
            onClick={handleDecline}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
