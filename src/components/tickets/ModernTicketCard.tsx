
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
          "overflow-hidden h-full transition-all duration-300 bg-[#13002A]/90 backdrop-blur-sm border border-purple-500/20 shadow-lg",
          isHovered ? "shadow-purple-500/30" : "shadow-purple-500/10"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2 pt-4 relative overflow-hidden">
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
            <div className="text-lg font-bold text-white">{homeTeam}</div>
            <div className="flex flex-col items-center mx-2">
              <span className="text-xs font-bold text-purple-300">ضد</span>
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">VS</span>
            </div>
            <div className="text-lg font-bold text-white">{awayTeam}</div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
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
            
            <div className="flex items-center justify-between rtl">
              <div className="flex items-center gap-2">
                <Tag size={16} className={cn(
                  "transition-colors",
                  isHovered ? "text-pink-400" : "text-purple-400"
                )} />
                <span className="font-bold text-lg text-white">
                  {price} ر.س
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users size={14} className="text-purple-400" />
                <span className="text-xs text-purple-300">محدود</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            className={cn(
              "w-full font-bold rtl transition-colors",
              isHovered 
              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none" 
              : "bg-purple-600 hover:bg-purple-700"
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
