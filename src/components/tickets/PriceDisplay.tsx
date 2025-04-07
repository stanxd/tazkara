
import React from 'react';

interface PriceDisplayProps {
  teamName: string;
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ teamName, price }) => {
  return (
    <div className="text-center">
      <p className="text-purple-200 mt-1">
        السعر: <span className="font-bold text-white">{price} ر.س</span>
      </p>
      {price >= 130 && (
        <p className="text-xs text-pink-400 animate-pulse-glow">
          *مباراة قمة
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;
