
import React from 'react';

interface PriceDisplayProps {
  teamName: string;
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ teamName, price }) => {
  return (
    <p className="text-center text-purple-200 mt-1">
      السعر: <span className="font-bold text-white">{price} ر.س</span>
    </p>
  );
};

export default PriceDisplay;
