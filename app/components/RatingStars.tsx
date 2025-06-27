'use client';

import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export const RatingStars = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = false,
  className = ''
}: RatingStarsProps) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingVariant = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={`${sizes[size]} ${
              i < Math.floor(rating) 
                ? 'fill-current text-yellow-400' 
                : i < rating 
                  ? 'fill-current text-yellow-400 opacity-50'
                  : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`text-sm font-medium ${getRatingColor(rating)}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}; 