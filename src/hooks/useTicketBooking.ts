
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isPopularTeam } from '@/services/teams/index';
import { 
  isUserPenalized, 
  getUserPenaltyInfo,
  reducePenaltyCounter
} from '@/services/fans/attendanceService';

export const useTicketBooking = (price: number = 0) => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTeamSelectionDialog, setShowTeamSelectionDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [showPenaltyDialog, setShowPenaltyDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [adjustedPrice, setAdjustedPrice] = useState<number>(price);
  const [penaltyMatches, setPenaltyMatches] = useState(0);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user's favorite team from user metadata or database
  const userFavoriteTeam = user?.user_metadata?.favorite_team;
  const normalizedFavoriteTeam = userFavoriteTeam?.toLowerCase?.() || '';
  
  console.log("Original favorite team from metadata:", userFavoriteTeam);
  console.log("Normalized favorite team:", normalizedFavoriteTeam);
  
  // Calculate price adjustments for selected team and location
  const calculateAdjustedPrice = (team: string, city: string): number => {
    let calculatedPrice = price;
    
    // Popular teams get 60% price increase
    if (isPopularTeam(team)) {
      calculatedPrice = Math.round(price * 1.6);
    }
    
    // Riyadh matches are more expensive
    if (city === "الرياض") {
      calculatedPrice = Math.round(calculatedPrice * 1.15);
    }
    
    return calculatedPrice;
  };
  
  const handleBookTicket = () => {
    if (!user) {
      // User not logged in
      setShowLoginDialog(true);
    } else {
      // Check if the user is a fan or a team
      const userType = user.user_metadata?.user_type;
      
      if (userType === 'fan') {
        // User is a fan, proceed with team selection
        setShowTeamSelectionDialog(true);
      } else {
        // User is logged in but not as a fan
        toast({
          title: "لا يمكن إكمال الحجز",
          description: "يجب تسجيل الدخول بحساب مشجع لحجز التذاكر",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleTeamSelection = (team: string, city: string) => {
    setSelectedTeam(team);
    setAdjustedPrice(calculateAdjustedPrice(team, city));
    setShowTeamSelectionDialog(false);
    
    // Clean up team names for comparison
    const normalizedSelectedTeam = team.replace(/فريق /i, '').trim().toLowerCase();
    
    console.log("Selected team:", team);
    console.log("Normalized selected team:", normalizedSelectedTeam);
    console.log("Normalized favorite team:", normalizedFavoriteTeam);
    
    // Check if the user is penalized
    if (user && isUserPenalized(user.id)) {
      const penaltyInfo = getUserPenaltyInfo(user.id);
      setPenaltyMatches(penaltyInfo.matchesRemaining);
      setShowPenaltyDialog(true);
      return;
    }
    
    // Improved logic for favorite team comparison
    // First check if user is Muhammad Abdullah and selected Al-Hilal
    if (user?.user_metadata?.name === 'محمد عبدالله' && normalizedSelectedTeam === 'الهلال') {
      console.log("Muhammad Abdullah selected Al-Hilal - showing payment dialog directly");
      setShowPaymentDialog(true);
      return;
    }
    
    // Regular comparison for other users or teams
    const isUserFavoriteTeam = 
      normalizedSelectedTeam === normalizedFavoriteTeam ||
      normalizedSelectedTeam === "ال" + normalizedFavoriteTeam ||
      normalizedFavoriteTeam === "ال" + normalizedSelectedTeam ||
      normalizedFavoriteTeam.includes(normalizedSelectedTeam) ||
      normalizedSelectedTeam.includes(normalizedFavoriteTeam);
    
    console.log("Is user favorite team?", isUserFavoriteTeam);
    
    if (isUserFavoriteTeam) {
      // Case 1: If selected team is user's favorite team, show payment dialog directly
      console.log("Showing payment dialog for favorite team");
      setShowPaymentDialog(true);
    } else {
      // Case 2: Check if it's a major team that isn't the user's favorite
      const isMajorTeam = isPopularTeam(team);
      
      if (isMajorTeam) {
        // Major team but not favorite - show waitlist
        console.log("Showing waitlist dialog for non-favorite major team");
        setShowWaitlistDialog(true);
      } else {
        // Non-major team and not favorite - direct to payment
        console.log("Showing payment dialog for non-favorite, non-major team");
        setShowPaymentDialog(true);
      }
    }
  };
  
  const handlePenaltyAcknowledged = () => {
    setShowPenaltyDialog(false);
    
    // After showing penalty notification, always redirect to waitlist
    setShowWaitlistDialog(true);
  };
  
  const handleJoinWaitlist = () => {
    setShowWaitlistDialog(false);
    toast({
      title: "تم الانضمام لقائمة الانتظار",
      description: `سيتم إشعارك عند توفر تذاكر لفريق ${selectedTeam}`,
    });
  };
  
  const handleProcessPayment = (method: 'card' | 'applepay') => {
    setShowPaymentDialog(false);
    
    // If user was penalized, reduce their penalty counter
    if (user && isUserPenalized(user.id)) {
      const remainingMatches = reducePenaltyCounter(user.id);
      console.log(`Reduced penalty counter. Remaining: ${remainingMatches}`);
    }
    
    toast({
      title: "تم إكمال عملية الدفع بنجاح",
      description: `تم حجز تذكرة لمباراة`,
    });
    
    // Actual payment processing would happen here
  };

  return {
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
  };
};
