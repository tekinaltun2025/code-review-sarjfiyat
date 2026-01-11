import React, { memo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';

// Lazy load components
const ChargingStats = React.lazy(() => import('../../components/ChargingStats'));
const MobilePriceTable = React.lazy(() => import('../../components/mobile/MobilePriceTable'));

const LoadingFallback = memo<{ height: string }>(({ height }) => (
  <div className={`${height} bg-gray-100 animate-pulse rounded-lg mx-4 mb-4`} />
));

LoadingFallback.displayName = 'LoadingFallback';

const MobileIndex = memo(() => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow px-3 py-2">
        <HeroSection />
        
        <React.Suspense fallback={<LoadingFallback height="h-24" />}>
          <ChargingStats />
        </React.Suspense>
        
        <React.Suspense fallback={<LoadingFallback height="h-64" />}>
          <MobilePriceTable />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
});

MobileIndex.displayName = 'MobileIndex';

export default MobileIndex;
