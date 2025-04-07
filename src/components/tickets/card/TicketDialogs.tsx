
import React from 'react';
import LoginDialog from '../dialogs/LoginDialog';
import TeamSelectionDialog from '../TeamSelectionDialog';
import PaymentDialog from '../PaymentDialog';
import WaitlistDialog from '../WaitlistDialog';

interface TicketDialogsProps {
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
  showTeamSelectionDialog: boolean;
  setShowTeamSelectionDialog: (show: boolean) => void;
  showPaymentDialog: boolean;
  setShowPaymentDialog: (show: boolean) => void;
  showWaitlistDialog: boolean;
  setShowWaitlistDialog: (show: boolean) => void;
  selectedTeam: string;
  adjustedPrice: number;
  matchDetails: {
    homeTeam: string;
    awayTeam: string;
    city: string;
    stadium: string;
    date: string;
    time: string;
  };
  onTeamSelect: (team: string) => void;
  onJoinWaitlist: () => void;
  onProcessPayment: (method: 'card' | 'applepay') => void;
}

const TicketDialogs: React.FC<TicketDialogsProps> = ({
  showLoginDialog,
  setShowLoginDialog,
  showTeamSelectionDialog,
  setShowTeamSelectionDialog,
  showPaymentDialog,
  setShowPaymentDialog,
  showWaitlistDialog,
  setShowWaitlistDialog,
  selectedTeam,
  adjustedPrice,
  matchDetails,
  onTeamSelect,
  onJoinWaitlist,
  onProcessPayment
}) => {
  return (
    <>
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
      
      <TeamSelectionDialog
        open={showTeamSelectionDialog}
        onOpenChange={setShowTeamSelectionDialog}
        homeTeam={matchDetails.homeTeam}
        awayTeam={matchDetails.awayTeam}
        onTeamSelect={(team) => onTeamSelect(team)}
        price={adjustedPrice}
        city={matchDetails.city}
      />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        teamName={selectedTeam}
        matchDetails={{
          homeTeam: matchDetails.homeTeam,
          awayTeam: matchDetails.awayTeam,
          date: matchDetails.date,
          time: matchDetails.time,
          stadium: matchDetails.stadium,
          city: matchDetails.city
        }}
        price={adjustedPrice}
        onProcessPayment={onProcessPayment}
      />
      
      <WaitlistDialog
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
        teamName={selectedTeam}
        onJoinWaitlist={onJoinWaitlist}
      />
    </>
  );
};

export default TicketDialogs;
