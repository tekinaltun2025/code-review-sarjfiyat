import React, { memo } from 'react';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileHero from '../../components/mobile/MobileHero';
import MobileFooter from '../../components/mobile/MobileFooter';

const MobilePriceTable = React.lazy(() => import('../../components/mobile/MobilePriceTable'));

const LoadingFallback = memo<{ height: string }>(({ height }) => (
  <div className={`${height} bg-muted animate-pulse rounded-xl mx-3 mb-3`} />
));
LoadingFallback.displayName = 'LoadingFallback';

const MobileIndex = memo(() => {
  return (
    <div className="min-h-screen flex flex-col bg-background w-full overflow-x-hidden">
      <MobileHeader />
      <main className="flex-grow w-full">
        <MobileHero />

        <div className="px-3 mt-4" id="price-comparison">
          <React.Suspense fallback={<LoadingFallback height="h-64" />}>
            <MobilePriceTable />
          </React.Suspense>
        </div>
      </main>
      <MobileFooter />
    </div>
  );
});

MobileIndex.displayName = 'MobileIndex';

export default MobileIndex;
