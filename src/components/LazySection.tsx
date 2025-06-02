
import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  fallback = <div className="h-20 bg-gray-100 animate-pulse rounded" />,
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  );
};

export default React.memo(LazySection);
