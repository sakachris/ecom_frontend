import React from "react";

interface StarRatingProps {
  rating: number;
  size?: number; // default 24px
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 24 }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, i) => {
    const starNumber = i + 1;
    const fillPercentage =
      Math.min(Math.max(rating - (starNumber - 1), 0), 1) * 100;

    const uniqueId = `grad-${i}-${rating}`;

    return (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        className="text-gray-300"
      >
        <defs>
          <linearGradient id={uniqueId}>
            <stop offset={`${fillPercentage}%`} stopColor="#eab308" />
            <stop offset={`${fillPercentage}%`} stopColor="transparent" />
          </linearGradient>
        </defs>

        <path
          fill={`url(#${uniqueId})`}
          stroke="#eab308"
          strokeWidth="1"
          d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.286 3.98a1 
          1 0 00.95.69h4.184c.969 0 1.372 1.24.588 
          1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 
          3.98c.3.921-.755 1.688-1.539 
          1.118l-3.39-2.462a1 1 0 00-1.175 
          0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.98a1 
          1 0 00-.364-1.118L1.04 7.407c-.784-.57-.38-1.81.588-1.81h4.184a1 
          1 0 00.95-.69L9.049.927z"
        />
      </svg>
    );
  });

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarRating;
