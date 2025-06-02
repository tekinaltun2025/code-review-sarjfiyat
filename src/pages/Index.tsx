
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LazySection from '../components/LazySection';
import OptimizedImage from '../components/OptimizedImage';
import Footer from '../components/Footer';

// Lazy load heavy components with better chunking
const ChargingStats = React.lazy(() => 
  import('../components/ChargingStats').then(module => ({
    default: module.default
  }))
);

const PriceTable = React.lazy(() => 
  import('../components/PriceTable').then(module => ({
    default: module.default
  }))
);

const MapSection = React.lazy(() => 
  import('../components/MapSection').then(module => ({
    default: module.default
  }))
);

const AdBanner = React.memo<{ src: string; alt: string; className?: string }>(({ src, alt, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden min-h-[300px] border-2 border-dashed border-gray-200 ${className}`}>
    <OptimizedImage 
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      width={150}
      height={300}
      quality={80}
    />
  </div>
));

const RotatedAdBanner = React.memo<{ backgroundImage: string }>(({ backgroundImage }) => (
  <div 
    className="bg-white rounded-lg shadow-md p-4 text-center min-h-[300px] flex flex-col justify-center border-2 border-dashed border-gray-200 relative bg-cover bg-center"
    style={{ backgroundImage }}
  >
    <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
    <div className="transform -rotate-90 whitespace-nowrap relative z-10">
      <span className="text-lg text-white font-bold">Reklam Alanı</span>
    </div>
  </div>
));

AdBanner.displayName = 'AdBanner';
RotatedAdBanner.displayName = 'RotatedAdBanner';

const Index = React.memo(() => {
  const location = useLocation();
  const isInPanel = useMemo(() => location.pathname.startsWith('/panel'), [location.pathname]);
  
  const leftSidebar = useMemo(() => (
    <div className="hidden xl:block w-28 2xl:w-32 flex-shrink-0">
      <div className="sticky top-4 space-y-4 p-2">
        <LazySection rootMargin="400px">
          <AdBanner
            src="/lovable-uploads/f115850b-eabd-46be-b611-c662fe0da189.png"
            alt="ZES - Yolların Yeni, Temiz, Hızlı Enerjisi"
          />
        </LazySection>
        <LazySection rootMargin="400px">
          <RotatedAdBanner 
            backgroundImage="url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
          />
        </LazySection>
      </div>
    </div>
  ), []);

  const rightSidebar = useMemo(() => (
    <div className="hidden xl:block w-28 2xl:w-32 flex-shrink-0">
      <div className="sticky top-4 space-y-4 p-2">
        <LazySection rootMargin="400px">
          <RotatedAdBanner 
            backgroundImage="url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
          />
        </LazySection>
        <LazySection rootMargin="400px">
          <RotatedAdBanner 
            backgroundImage="url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')"
          />
        </LazySection>
      </div>
    </div>
  ), []);

  const mainContent = useMemo(() => (
    <main className="flex-grow w-full max-w-5xl px-2 sm:px-4 md:px-6">
      {!isInPanel && <HeroSection />}
      
      <LazySection skipLazyLoading={true}>
        <React.Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg mb-6" />}>
          <ChargingStats />
        </React.Suspense>
      </LazySection>
      
      <LazySection rootMargin="300px">
        <React.Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg mb-6" />}>
          <PriceTable />
        </React.Suspense>
      </LazySection>
      
      <LazySection rootMargin="500px">
        <React.Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
          <MapSection />
        </React.Suspense>
      </LazySection>
    </main>
  ), [isInPanel]);

  const content = useMemo(() => (
    <div className="flex min-h-screen justify-center max-w-[1400px] mx-auto">
      {leftSidebar}
      {mainContent}
      {rightSidebar}
    </div>
  ), [leftSidebar, mainContent, rightSidebar]);
  
  // Panel içinde gösteriliyorsa, sadece ana içeriği döndür
  if (isInPanel) {
    return (
      <main className="flex-grow px-2 sm:px-4 md:px-6">
        <LazySection skipLazyLoading={true}>
          <React.Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg mb-6" />}>
            <ChargingStats />
          </React.Suspense>
        </LazySection>
        
        <LazySection rootMargin="300px">
          <React.Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg mb-6" />}>
            <PriceTable />
          </React.Suspense>
        </LazySection>
        
        <LazySection rootMargin="500px">
          <React.Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
            <MapSection />
          </React.Suspense>
        </LazySection>
      </main>
    );
  }
  
  // Normal sayfada gösteriliyorsa, header ve footer ile birlikte göster
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {content}
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
