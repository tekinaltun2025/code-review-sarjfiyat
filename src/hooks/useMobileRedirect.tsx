import { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MOBILE_BREAKPOINT = 768;

// Mobil cihaz kontrolü - userAgent ve ekran genişliği birlikte
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
  const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
  
  return isMobileUserAgent || isMobileWidth;
};

export const useMobileRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useLayoutEffect kullanarak render öncesi yönlendirme
  useLayoutEffect(() => {
    const checkAndRedirect = () => {
      const isMobile = isMobileDevice();
      const isOnMobilePage = location.pathname.startsWith('/m');
      const isOnDesktopPage = !location.pathname.startsWith('/m');

      if (isMobile && isOnDesktopPage) {
        // Mobil cihazda ve masaüstü sayfasındaysa, mobil sayfaya yönlendir
        const mobilePath = '/m' + (location.pathname === '/' ? '' : location.pathname);
        navigate(mobilePath, { replace: true });
      } else if (!isMobile && isOnMobilePage) {
        // Masaüstünde ve mobil sayfasındaysa, masaüstü sayfasına yönlendir
        const desktopPath = location.pathname.replace('/m', '') || '/';
        navigate(desktopPath, { replace: true });
      }
    };

    checkAndRedirect();
  }, [navigate, location.pathname]);

  // Resize event için ayrı useEffect
  useEffect(() => {
    const handleResize = () => {
      const isMobile = isMobileDevice();
      const isOnMobilePage = location.pathname.startsWith('/m');
      const isOnDesktopPage = !location.pathname.startsWith('/m');

      if (isMobile && isOnDesktopPage) {
        const mobilePath = '/m' + (location.pathname === '/' ? '' : location.pathname);
        navigate(mobilePath, { replace: true });
      } else if (!isMobile && isOnMobilePage) {
        const desktopPath = location.pathname.replace('/m', '') || '/';
        navigate(desktopPath, { replace: true });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, location.pathname]);
};
