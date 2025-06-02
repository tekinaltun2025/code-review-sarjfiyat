
import React, { useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LazySection from '../components/LazySection';
import Footer from '../components/Footer';
import { LeftSidebar, RightSidebar } from '../components/layout/Sidebar';

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

// Suspense fallback bileşenlerini optimize edelim
const LoadingFallback = memo<{ height: string }>(({ height }) => (
  <div className={`${height} bg-gray-100 animate-pulse rounded-lg mb-6`} />
));

LoadingFallback.displayName = 'LoadingFallback';

// Main content bileşenini ayrı bir component yapalım
const MainContent = memo<{ isInPanel: boolean }>(({ isInPanel }) => (
  <main className="flex-grow w-full max-w-5xl px-2 sm:px-4 md:px-6">
    {!isInPanel && <HeroSection />}
    
    <LazySection skipLazyLoading={true}>
      <React.Suspense fallback={<LoadingFallback height="h-32" />}>
        <ChargingStats />
      </React.Suspense>
    </LazySection>
    
    <LazySection rootMargin="300px">
      <React.Suspense fallback={<LoadingFallback height="h-96" />}>
        <PriceTable />
      </React.Suspense>
    </LazySection>
    
    <LazySection rootMargin="500px">
      <React.Suspense fallback={<LoadingFallback height="h-96" />}>
        <MapSection />
      </React.Suspense>
    </LazySection>
  </main>
));

MainContent.displayName = 'MainContent';

// Panel içeriği için ayrı bir component
const PanelContent = memo(() => (
  <main className="flex-grow px-2 sm:px-4 md:px-6">
    <LazySection skipLazyLoading={true}>
      <React.Suspense fallback={<LoadingFallback height="h-32" />}>
        <ChargingStats />
      </React.Suspense>
    </LazySection>
    
    <LazySection rootMargin="300px">
      <React.Suspense fallback={<LoadingFallback height="h-96" />}>
        <PriceTable />
      </React.Suspense>
    </LazySection>
    
    <LazySection rootMargin="500px">
      <React.Suspense fallback={<LoadingFallback height="h-96" />}>
        <MapSection />
      </React.Suspense>
    </LazySection>
  </main>
));

PanelContent.displayName = 'PanelContent';

const Index = memo(() => {
  const location = useLocation();
  const isInPanel = useMemo(() => location.pathname.startsWith('/panel'), [location.pathname]);
  
  // Panel içinde gösteriliyorsa, sadana içeriği döndür
  if (isInPanel) {
    return <PanelContent />;
  }
  
  // Normal sayfada gösteriliyorsa, header ve footer ile birlikte göster
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex min-h-screen justify-center max-w-[1400px] mx-auto">
        <LeftSidebar />
        <MainContent isInPanel={isInPanel} />
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
