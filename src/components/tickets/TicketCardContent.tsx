
import React from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface TicketCardContentProps {
  stadium: string;
  city: string;
  date: string;
  time: string;
  isHovered: boolean;
}

const TicketCardContent: React.FC<TicketCardContentProps> = ({
  stadium,
  city,
  date,
  time,
  isHovered
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-purple-200 rtl">
          <MapPin size={16} className={cn(
            "transition-colors",
            isHovered ? "text-pink-400" : "text-purple-400"
          )} />
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="cursor-help">{stadium}</span>
            </HoverCardTrigger>
            <HoverCardContent className="rtl bg-[#13002A] border border-purple-500/20 text-purple-100">
              <p>المدينة: {city}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <div className="flex items-center gap-2 text-purple-200 rtl">
          <Calendar size={16} className={cn(
            "transition-colors",
            isHovered ? "text-pink-400" : "text-purple-400"
          )} />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-purple-200 rtl">
          <Clock size={16} className={cn(
            "transition-colors",
            isHovered ? "text-pink-400" : "text-purple-400"
          )} />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center justify-end rtl">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-purple-400" />
            <span className="text-xs text-purple-300">محدود</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCardContent;
