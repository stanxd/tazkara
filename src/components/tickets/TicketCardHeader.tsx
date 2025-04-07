
import React from 'react';
import { Ticket, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isPopularTeam } from '@/services/teams/teamPopularity';
import { cn } from '@/lib/utils';

interface TicketCardHeaderProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  isPriceFluctuating?: boolean;
  isHovered: boolean;
}

const TicketCardHeader: React.FC<TicketCardHeaderProps> = ({
  id,
  homeTeam,
  awayTeam,
  isPriceFluctuating = false,
  isHovered
}) => {
  return (
    <div className="pb-2 pt-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
      
      <div className="flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Ticket className="h-5 w-5 text-purple-400 mr-1" />
                <span className="text-xs font-medium text-purple-300">#{id.substring(0, 6)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="rtl text-xs">رمز التذكرة: {id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {isPriceFluctuating && (
          <Badge variant="destructive" className="text-xs animate-pulse bg-gradient-to-r from-pink-500 to-purple-500 border-none">
            سعر متغير
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-3 rtl">
        <div className="text-lg font-bold text-white flex items-center">
          {homeTeam}
          {isPopularTeam(homeTeam) && (
            <Flame className="h-4 w-4 text-orange-500 mr-1" />
          )}
        </div>
        <div className="flex flex-col items-center mx-2">
          <span className="text-xs font-bold text-purple-300">ضد</span>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">VS</span>
        </div>
        <div className="text-lg font-bold text-white flex items-center">
          {awayTeam}
          {isPopularTeam(awayTeam) && (
            <Flame className="h-4 w-4 text-orange-500 mr-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCardHeader;
