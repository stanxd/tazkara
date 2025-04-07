
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TicketProps } from '../TicketCard';
import TicketCardHeader from '../TicketCardHeader';
import TicketCardContent from '../TicketCardContent';
import TicketDialogs from './TicketDialogs';
import { useTicketBooking } from '@/hooks/useTicketBooking';

const ModernTicketCard: React.FC<TicketProps> = ({
  homeTeam,
  awayTeam,
  city,
  stadium,
  date,
  time,
  id,
  price = 0,
  isPriceFluctuating = false,
  extraIcon
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    showLoginDialog,
    setShowLoginDialog,
    showTeamSelectionDialog,
    setShowTeamSelectionDialog,
    showPaymentDialog,
    setShowPaymentDialog,
    showWaitlistDialog,
    setShowWaitlistDialog,
    showPenaltyDialog,
    setShowPenaltyDialog,
    selectedTeam,
    adjustedPrice,
    penaltyMatches,
    handleBookTicket,
    handleTeamSelection,
    handleJoinWaitlist,
    handleProcessPayment,
    handlePenaltyAcknowledged
  } = useTicketBooking(price);
  
  // Output match details for debugging
  console.log("Match details:", { homeTeam, awayTeam, city, stadium, date, time });
  
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
          <TicketCardHeader 
            id={String(id)}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            isPriceFluctuating={isPriceFluctuating}
            isHovered={isHovered}
          />
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          <TicketCardContent 
            stadium={stadium}
            city={city}
            date={date}
            time={time}
            isHovered={isHovered}
          />
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            className={cn(
              "w-full font-bold rtl transition-colors",
              isHovered 
              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none" 
              : "bg-purple-600 hover:bg-purple-700"
            )}
            onClick={handleBookTicket}
          >
            شراء التذكرة
          </Button>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <TicketDialogs
        showLoginDialog={showLoginDialog}
        setShowLoginDialog={setShowLoginDialog}
        showTeamSelectionDialog={showTeamSelectionDialog}
        setShowTeamSelectionDialog={setShowTeamSelectionDialog}
        showPaymentDialog={showPaymentDialog}
        setShowPaymentDialog={setShowPaymentDialog}
        showWaitlistDialog={showWaitlistDialog}
        setShowWaitlistDialog={setShowWaitlistDialog}
        showPenaltyDialog={showPenaltyDialog}
        setShowPenaltyDialog={setShowPenaltyDialog}
        penaltyMatches={penaltyMatches}
        selectedTeam={selectedTeam}
        adjustedPrice={adjustedPrice}
        matchDetails={{
          homeTeam,
          awayTeam,
          city,
          stadium,
          date,
          time
        }}
        onTeamSelect={(team) => handleTeamSelection(team, city)}
        onJoinWaitlist={handleJoinWaitlist}
        onProcessPayment={handleProcessPayment}
        onPenaltyAcknowledged={handlePenaltyAcknowledged}
      />
    </motion.div>
  );
};

export default ModernTicketCard;
