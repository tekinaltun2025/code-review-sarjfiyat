import { useEffect, useRef, memo } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AdSense = memo<AdSenseProps>(({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '',
  style 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isLoaded.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client="ca-pub-5965663978373204"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
});

AdSense.displayName = 'AdSense';

export default AdSense;
