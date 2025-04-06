
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, Users, Shield, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TicketProps } from './TicketCard';

const ModernTicketCard: React.FC<TicketProps> = ({
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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all duration-300 border-t-4 shadow-sm hover:shadow-lg",
          isHovered ? "border-t-tazkara-gold" : "border-t-tazkara-green"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="bg-gradient-to-r from-tazkara-green/10 to-tazkara-gold/10 pb-2 pt-4">
          <div className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 text-tazkara-green mr-1" />
                    <span className="text-xs font-medium text-gray-500">#{id.substring(0, 6)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="rtl text-xs">رمز التذكرة: {id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {isPriceFluctuating && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                سعر متغير
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-2 rtl">
            <div className="text-lg font-bold">{homeTeam}</div>
            <div className="flex flex-col items-center mx-2">
              <span className="text-xs font-bold text-gray-400">ضد</span>
              <span className="text-sm font-bold text-tazkara-green">VS</span>
            </div>
            <div className="text-lg font-bold">{awayTeam}</div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 rtl">
              <MapPin size={16} className={cn(
                "transition-colors",
                isHovered ? "text-tazkara-gold" : "text-tazkara-green"
              )} />
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="cursor-help">{stadium}</span>
                </HoverCardTrigger>
                <HoverCardContent className="rtl">
                  <p>المدينة: {city}</p>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            <div className="flex items-center gap-2 text-gray-700 rtl">
              <Calendar size={16} className={cn(
                "transition-colors",
                isHovered ? "text-tazkara-gold" : "text-tazkara-green"
              )} />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-700 rtl">
              <Clock size={16} className={cn(
                "transition-colors",
                isHovered ? "text-tazkara-gold" : "text-tazkara-green"
              )} />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center justify-between rtl">
              <div className="flex items-center gap-2">
                <Tag size={16} className={cn(
                  "transition-colors",
                  isHovered ? "text-tazkara-gold" : "text-tazkara-green"
                )} />
                <span className="font-bold text-lg text-tazkara-dark">
                  {price} ر.س
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">محدود</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            className={cn(
              "w-full font-bold rtl transition-colors",
              isHovered 
              ? "bg-tazkara-gold hover:bg-tazkara-gold/90" 
              : "bg-tazkara-green hover:bg-tazkara-green/90"
            )}
          >
            شراء التذكرة
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModernTicketCard;
