
import React, { useState } from 'react';
import { Star } from "lucide-react";

interface RatingPickerProps {
  userRating: number;
  onRatingChange: (rating: number) => void;
  required?: boolean;
  error?: string | null;
}

const RatingPicker = ({ 
  userRating, 
  onRatingChange, 
  required = false,
  error = null
}: RatingPickerProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRatingClick = (rating: number) => {
    onRatingChange(rating);
  };
  
  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };
  
  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Puanınız {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        className="flex gap-1"
        onMouseLeave={handleRatingLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => handleRatingHover(star)}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Rate ${star} out of 5`}
          >
            <Star 
              className={`h-8 w-8 ${
                (hoveredRating || userRating) >= star 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              } ${error ? "animate-wiggle" : ""}`} 
            />
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {!error && userRating > 0 && (
        <p className="text-sm text-gray-500">
          {userRating === 5 ? "Mükemmel!" : 
           userRating === 4 ? "Çok iyi!" :
           userRating === 3 ? "Ortalama" :
           userRating === 2 ? "Vasat" : "Kötü"}
        </p>
      )}
    </div>
  );
};

export default RatingPicker;
