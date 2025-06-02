
import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes,
  quality = 75
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    console.warn(`Failed to load image: ${src}`);
  }, [src]);

  // WebP support detection and fallback
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    // For Unsplash images, add optimization parameters
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', quality.toString());
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    return originalSrc;
  }, [quality, width, height]);

  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <img
        src={getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
        }}
      />
    </div>
  );
};

export default React.memo(OptimizedImage);
