import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MOBILE_BREAKPOINT = 768;

export const useMobileRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
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

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate, location.pathname]);
};
