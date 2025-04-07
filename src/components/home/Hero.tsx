
import React from 'react';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTicketBooking } from '@/hooks/useTicketBooking';
import LoginDialog from '../tickets/dialogs/LoginDialog';
import TeamSelectionDialog from '../tickets/TeamSelectionDialog';
import PaymentDialog from '../tickets/PaymentDialog';
import WaitlistDialog from '../tickets/WaitlistDialog';
import PenaltyDialog from '../tickets/PenaltyDialog';

const Hero = () => {
  const navigate = useNavigate();
  
  // استخدام نفس hook المستخدم في بطاقات التذاكر
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
  } = useTicketBooking(150); // سعر افتراضي للتذكرة
  
  // بيانات المباراة الافتراضية
  const matchDetails = {
    homeTeam: "الهلال",
    awayTeam: "النصر",
    city: "الرياض",
    stadium: "الملك فهد",
    date: "2025-04-15",
    time: "20:00"
  };
  
  // التنقل إلى قسم التذاكر
  const scrollToTickets = () => {
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-24 lg:py-32 relative bg-gradient-to-b from-[#520082] to-[#190038] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stadium-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#520082] via-[#190038]/80 to-[#190038]/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 rtl">
            تذكرتي - منصة التذاكر الرياضية الأولى
          </h1>
          <p className="text-xl text-purple-200 mb-10 rtl">
            احجز تذاكر مبارياتك المفضلة من أي مكان وفي أي وقت
          </p>
          
          <div className="flex justify-center items-center space-x-4 flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none rtl text-lg px-8 py-6" 
              onClick={() => handleBookTicket()}
            >
              <Ticket className="ml-2" />
              احجز تذكرتك الآن
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 text-white rtl text-lg px-8 py-6" 
              onClick={scrollToTickets}
            >
              استعرض المباريات
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
      
      <TeamSelectionDialog
        open={showTeamSelectionDialog}
        onOpenChange={setShowTeamSelectionDialog}
        homeTeam={matchDetails.homeTeam}
        awayTeam={matchDetails.awayTeam}
        onTeamSelect={(team) => handleTeamSelection(team, matchDetails.city)}
        price={150}
        city={matchDetails.city}
      />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        teamName={selectedTeam}
        matchDetails={matchDetails}
        price={adjustedPrice}
        onProcessPayment={handleProcessPayment}
      />
      
      <WaitlistDialog
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
        teamName={selectedTeam}
        onJoinWaitlist={handleJoinWaitlist}
      />

      <PenaltyDialog
        open={showPenaltyDialog}
        onOpenChange={setShowPenaltyDialog}
        matchesRemaining={penaltyMatches}
        onClose={handlePenaltyAcknowledged}
      />
    </div>
  );
};

export default Hero;
