
import React from 'react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TicketProps {
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  date: string;
  time: string;
  id: string;
  price?: number;
  isPriceFluctuating?: boolean;
}

const TicketCard: React.FC<TicketProps> = ({
  homeTeam,
  awayTeam,
  city,
  stadium,
  date,
  time,
  id,
  price = 0,
  isPriceFluctuating = false
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
          <div className="flex items-center gap-2 rtl">
            <Tag size={18} className="text-tazkara-green" />
            <div className="flex items-center">
              {isPriceFluctuating ? (
                <Badge 
                  variant="destructive"
                  className={cn(
                    "font-bold animate-pulse",
                    isPriceFluctuating && "bg-red-500"
                  )}
                >
                  {price} ر.س
                </Badge>
              ) : (
                <Badge className="bg-tazkara-green font-bold">
                  {price} ر.س
                </Badge>
              )}
              {isPriceFluctuating && (
                <span className="mr-2 text-xs text-red-500 font-medium">
                  *سعر متغير
                </span>
              )}
            </div>
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
