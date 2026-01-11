import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MOBILE_BREAKPOINT = 768;

// Mobil cihaz kontrolü - userAgent ve ekran genişliği birlikte
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
  const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
  
  return isMobileUserAgent || isMobileWidth;
};

// Route mapping - mobil ve masaüstü arasındaki ilişki
const mobileRoutes = ['/m', '/m/kampanyalar', '/m/ev-sarj-cihazlari', '/m/sarj-aglari', '/m/hakkimizda', '/m/anket'];
const desktopRoutes = ['/', '/kampanyalar', '/ev-sarj-cihazlari', '/sarj-aglari', '/hakkimizda', '/anket'];

export const useMobileRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState(false);

  // İlk yükleme için tek seferlik yönlendirme
  useLayoutEffect(() => {
    // Panel sayfalarını yönlendirme
    if (location.pathname.startsWith('/panel')) {
      return;
    }
    
    // Zaten yönlendirme yapıldıysa tekrar yapma
    if (hasRedirected) {
      return;
    }

    const isMobile = isMobileDevice();
    const isOnMobilePage = location.pathname.startsWith('/m');
    
    console.log('Mobile redirect check:', { 
      isMobile, 
      isOnMobilePage, 
      pathname: location.pathname 
    });

    if (isMobile && !isOnMobilePage) {
      // Mobil cihazda ve masaüstü sayfasındaysa, mobil sayfaya yönlendir
      const mobilePath = '/m' + (location.pathname === '/' ? '' : location.pathname);
      console.log('Redirecting to mobile:', mobilePath);
      setHasRedirected(true);
      navigate(mobilePath, { replace: true });
    } else if (!isMobile && isOnMobilePage) {
      // Masaüstünde ve mobil sayfasındaysa, masaüstü sayfasına yönlendir
      const desktopPath = location.pathname.replace('/m', '') || '/';
      console.log('Redirecting to desktop:', desktopPath);
      setHasRedirected(true);
      navigate(desktopPath, { replace: true });
    }
  }, [navigate, location.pathname, hasRedirected]);

  // Resize event için - sadece gerçek resize olaylarında yönlendir
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Panel sayfalarını yönlendirme
        if (location.pathname.startsWith('/panel')) {
          return;
        }
        
        const isMobile = isMobileDevice();
        const isOnMobilePage = location.pathname.startsWith('/m');

        if (isMobile && !isOnMobilePage) {
          const mobilePath = '/m' + (location.pathname === '/' ? '' : location.pathname);
          navigate(mobilePath, { replace: true });
        } else if (!isMobile && isOnMobilePage) {
          const desktopPath = location.pathname.replace('/m', '') || '/';
          navigate(desktopPath, { replace: true });
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate, location.pathname]);
};
