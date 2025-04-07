
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
import MatchCountdown from './MatchCountdown';

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

  // بيانات المباراة الافتراضية للعرض الرئيسي
  const featuredMatch = {
    homeTeam: "الهلال",
    awayTeam: "النصر",
    stadium: "ملعب مدينة أرينا",
    location: "الرياض",
    date: "2025-04-15",
    time: "20:00",
    isSelling: true
  };

  // التنقل إلى قسم التذاكر
  const scrollToTickets = () => {
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      ticketsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="py-20 relative bg-[#13002A] overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/stadium-bg.jpg')] bg-center bg-cover opacity-5 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16 px-0 my-[29px]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">احجز تذكرتك الآن</span>
          </h1>
          <p className="text-xl text-purple-200 mb-14 max-w-2xl mx-auto rtl text-center">
            منصة تذكرة+ توفر لك أسهل طريقة لحجز تذاكر مباريات كرة القدم بأسعار مناسبة وتجربة فريدة
          </p>
        </div>
        
        {/* Featured Match Card */}
        <div className="w-full max-w-2xl mx-auto bg-[#1A0033]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-12">
          {featuredMatch.isSelling && <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm py-1 px-4 rounded-full inline-block mb-4 rtl">
              نفاذ سريع
            </div>}
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 rtl text-center">
            الديربي الكبير: {featuredMatch.homeTeam} ضد {featuredMatch.awayTeam}
          </h2>
          <p className="text-gray-300 mb-6 rtl text-center">
            {featuredMatch.stadium} - {featuredMatch.location}
          </p>
          
          {/* Countdown Timer */}
          <MatchCountdown />
          
          {/* Book Button */}
          <div className="mt-8 flex justify-center">
            <Button onClick={handleBookTicket} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-lg px-8 py-6 rounded-full rtl text-center">
              <Ticket className="ml-2 h-5 w-5" /> احجز تذكرتك الآن
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl mx-auto mt-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">+40</p>
            <p className="text-gray-300 mt-2 rtl">مباراة شهريا</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">+100K</p>
            <p className="text-gray-300 mt-2 rtl">مشجع مسجل</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">16</p>
            <p className="text-gray-300 mt-2 rtl">فريق مشارك</p>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      
      <TeamSelectionDialog open={showTeamSelectionDialog} onOpenChange={setShowTeamSelectionDialog} homeTeam={featuredMatch.homeTeam} awayTeam={featuredMatch.awayTeam} onTeamSelect={team => handleTeamSelection(team, featuredMatch.location)} price={150} city={featuredMatch.location} />
      
      <PaymentDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog} teamName={selectedTeam} matchDetails={{
      homeTeam: featuredMatch.homeTeam,
      awayTeam: featuredMatch.awayTeam,
      city: featuredMatch.location,
      stadium: featuredMatch.stadium,
      date: featuredMatch.date,
      time: featuredMatch.time
    }} price={adjustedPrice} onProcessPayment={handleProcessPayment} />
      
      <WaitlistDialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog} teamName={selectedTeam} onJoinWaitlist={handleJoinWaitlist} />

      <PenaltyDialog open={showPenaltyDialog} onOpenChange={setShowPenaltyDialog} matchesRemaining={penaltyMatches} onClose={handlePenaltyAcknowledged} />
    </div>;
};

export default Hero;
