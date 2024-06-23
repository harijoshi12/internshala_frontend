// src/components/common/LoadingSpinner.tsx

import React from "react";

// Define the props for the LoadingSpinner component
interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

/**
 * LoadingSpinner component for displaying a loading spinner with different sizes.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  // Define the size classes for different spinner sizes
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      {/* Render the loading spinner with the appropriate size class */}
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
