
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TicketProps {
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  date: string;
  time: string;
  id: string;
}

const TicketCard: React.FC<TicketProps> = ({
  homeTeam,
  awayTeam,
  city,
  stadium,
  date,
  time,
  id,
}) => {
  return (
    <div className="ticket-card animate-slide-up">
      <div className="ticket-card-banner"></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold rtl">{homeTeam}</div>
          <div className="text-sm font-bold text-gray-400">ضد</div>
          <div className="text-xl font-bold rtl">{awayTeam}</div>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2 text-gray-600 rtl">
            <MapPin size={18} className="text-tazkara-green" />
            <span>{stadium} - {city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 rtl">
            <Calendar size={18} className="text-tazkara-green" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 rtl">
            <Clock size={18} className="text-tazkara-green" />
            <span>{time}</span>
          </div>
        </div>
        
        <Button className="w-full bg-tazkara-gold hover:bg-tazkara-gold/90 font-bold rtl">
          شراء التذكرة
        </Button>
      </div>
    </div>
  );
};

export default TicketCard;
