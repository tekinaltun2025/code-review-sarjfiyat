
import React, { useState, useCallback, useMemo } from 'react';

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

  // WebP support detection and optimized src generation
  const optimizedSrc = useMemo(() => {
    // For Unsplash images, add optimization parameters
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fm', 'webp');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    return src;
  }, [src, quality, width, height]);

  // Generate responsive sizes attribute
  const responsiveSizes = useMemo(() => {
    if (sizes) return sizes;
    if (width && width <= 400) return '(max-width: 400px) 100vw, 400px';
    if (width && width <= 800) return '(max-width: 800px) 100vw, 800px';
    return '(max-width: 1200px) 100vw, 1200px';
  }, [sizes, width]);

  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`${alt} - Image not available`}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  // Image props with proper HTML attributes - native lazy loading
  const imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: optimizedSrc,
    alt,
    width,
    height,
    sizes: responsiveSizes,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    onLoad: handleLoad,
    onError: handleError,
    className: `transition-opacity duration-300 ${
      imageLoaded ? 'opacity-100' : 'opacity-0'
    } ${className}`,
    style: {
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : 'auto',
      aspectRatio: width && height ? `${width}/${height}` : undefined,
    }
  };

  // Add fetchpriority for high priority images (HTML attribute, not React prop)
  if (priority) {
    (imageProps as any).fetchpriority = 'high';
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      <img {...imageProps} />
    </div>
  );
};

export default React.memo(OptimizedImage);
