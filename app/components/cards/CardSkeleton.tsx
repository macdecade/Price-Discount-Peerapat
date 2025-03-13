import React from "react";

interface CardSkeletonProps {
  rows?: number; // Number of skeleton rows in the card
  withImage?: boolean; // Whether to include an image placeholder
  className?: string; // Additional class names for the card container
  minHeight?: string; // Minimum height for the skeleton card
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  rows = 2,
  withImage = true,
  className = "",
  minHeight = "min-h-[361px]",
}) => {
  return (
    <div
      className={`animate-pulse col-span-1 rounded-md shadow-lg p-4 h-full bg-gray-200 ${minHeight} ${className}`}
    >
      <div className="flex flex-col gap-2">
        {/* Image Section */}
        {withImage && (
          <div className="flex flex-row gap-4 items-center">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        )}

        {/* Divider */}
        {withImage && <div className="h-[1px] w-full bg-gray-300 my-4"></div>}

        {/* Dynamic Rows */}
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-3 w-full bg-gray-300 rounded mb-2"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
