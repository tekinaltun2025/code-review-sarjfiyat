
import React, { useState } from 'react';
import { Star } from "lucide-react";

interface RatingPickerProps {
  userRating: number;
  onRatingChange: (rating: number) => void;
}

const RatingPicker = ({ userRating, onRatingChange }: RatingPickerProps) => {
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
      <label className="text-sm font-medium">Puanınız</label>
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
            className="focus:outline-none"
          >
            <Star 
              className={`h-8 w-8 ${
                (hoveredRating || userRating) >= star 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingPicker;
