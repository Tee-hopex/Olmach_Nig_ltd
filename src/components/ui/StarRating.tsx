import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}: StarRatingProps) {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= Math.round(rating)
                ? 'text-gold-500 fill-gold-500'
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${textSizes[size]} text-gray-500`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
