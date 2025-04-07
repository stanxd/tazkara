
import React from 'react';
import { isPopularTeam } from '@/services/teams/teamPopularity';

interface PriceDisplayProps {
  teamName: string;
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ teamName, price }) => {
  const isMajorTeam = isPopularTeam(teamName);

  return (
    <div className="text-center">
      <p className="text-purple-200 mt-1">
        السعر: <span className="font-bold text-white">{price} ر.س</span>
      </p>
      {isMajorTeam && (
        <p className="text-xs text-pink-400 animate-pulse-glow">
          *فريق رئيسي
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;
