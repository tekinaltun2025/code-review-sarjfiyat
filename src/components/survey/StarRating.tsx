
import React from 'react';
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ rating, showValue = true, size = 'md' }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Size mappings
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const starSize = sizeMap[size];
  
  return (
    <div className="flex items-center gap-1">
      {Array(fullStars).fill(0).map((_, i) => (
        <Star key={i} className={`${starSize} text-yellow-400 fill-yellow-400`} />
      ))}
      {hasHalfStar && (
        <StarHalf className={`${starSize} text-yellow-400 fill-yellow-400`} />
      )}
      {Array(5 - fullStars - (hasHalfStar ? 1 : 0)).fill(0).map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className={`${starSize} text-gray-300`} />
      ))}
      {showValue && <span className="ml-2 font-medium">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
