
import React from 'react';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isPopularTeam } from '@/services/teams/teamPopularity';

interface TeamButtonProps {
  teamName: string;
  isSelected: boolean;
  onSelect: (team: string) => void;
}

const TeamButton: React.FC<TeamButtonProps> = ({ teamName, isSelected, onSelect }) => {
  const isPopular = isPopularTeam(teamName);
  
  return (
    <div className="flex flex-col">
      <Button 
        variant="outline" 
        onClick={() => onSelect(teamName)}
        className={`relative border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 mb-3 h-20 ${isSelected ? 'ring-2 ring-pink-500' : ''}`}
      >
        <span className="text-lg font-bold">{teamName}</span>
        {isPopular && (
          <span className="absolute top-2 right-2">
            <Flame className="h-5 w-5 text-orange-500" />
          </span>
        )}
      </Button>
      {isPopular && (
        <p className="text-xs text-orange-400 text-center">فريق ذو شعبية عالية</p>
      )}
    </div>
  );
};

export default TeamButton;
