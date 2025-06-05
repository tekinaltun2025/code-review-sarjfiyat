
import React, { memo } from 'react';
import LazySection from '../LazySection';
import OptimizedImage from '../OptimizedImage';

const AdBanner = memo<{ src: string; alt: string; className?: string }>(({ src, alt, className }) => (
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

const RotatedAdBanner = memo<{ backgroundImage: string }>(({ backgroundImage }) => (
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

export const LeftSidebar = memo(() => (
  <div className="hidden xl:block w-28 2xl:w-32 flex-shrink-0">
    <div className="sticky top-4 space-y-4 p-2">
      <LazySection rootMargin="400px">
        <AdBanner
          src="/lovable-uploads/af5ad040-f40a-4aa8-81c4-dbfa55a8ea72.png"
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
));

export const RightSidebar = memo(() => (
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
));

LeftSidebar.displayName = 'LeftSidebar';
RightSidebar.displayName = 'RightSidebar';
