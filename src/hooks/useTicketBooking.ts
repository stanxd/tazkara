
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isPopularTeam } from '@/services/teams/teamPopularity';

export const useTicketBooking = (price: number = 0) => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTeamSelectionDialog, setShowTeamSelectionDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [adjustedPrice, setAdjustedPrice] = useState<number>(price);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // الحصول على الفريق المفضل للمستخدم من بيانات التعريف
  const userFavoriteTeam = user?.user_metadata?.favorite_team;
  
  // حساب تعديلات السعر للفريق المحدد والموقع
  const calculateAdjustedPrice = (team: string, city: string): number => {
    let calculatedPrice = price;
    
    // زيادة سعر الفرق الشهيرة بنسبة 60%
    if (isPopularTeam(team)) {
      calculatedPrice = Math.round(price * 1.6);
    }
    
    // مباريات الرياض أكثر تكلفة
    if (city === "الرياض") {
      calculatedPrice = Math.round(calculatedPrice * 1.15);
    }
    
    return calculatedPrice;
  };
  
  const handleBookTicket = () => {
    if (!user) {
      // المستخدم غير مسجل الدخول
      setShowLoginDialog(true);
    } else {
      // التحقق مما إذا كان المستخدم مشجعًا أم فريقًا
      const userType = user.user_metadata?.user_type;
      
      if (userType === 'fan') {
        // المستخدم مشجع، المتابعة مع اختيار الفريق
        setShowTeamSelectionDialog(true);
      } else {
        // المستخدم مسجل الدخول ولكن ليس كمشجع
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
    
    console.log("Selected team:", team);
    console.log("User favorite team:", userFavoriteTeam);
    
    // التحقق مما إذا كان الفريق المحدد هو الفريق المفضل للمستخدم
    // تأكدنا من أن المقارنة تتم بشكل صحيح وبنفس التنسيق
    const isUserFavoriteTeam = team.trim().toLowerCase() === userFavoriteTeam?.trim().toLowerCase();
    
    console.log("Is user favorite team?", isUserFavoriteTeam);
    
    if (isUserFavoriteTeam) {
      // الحالة 1: إذا كان الفريق المحدد هو الفريق المفضل للمستخدم، عرض مربع حوار الدفع مباشرة
      setShowPaymentDialog(true);
    } else {
      // الحالة 2: إذا لم يكن الفريق المفضل، عرض مربع حوار قائمة الانتظار
      setShowWaitlistDialog(true);
    }
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
    toast({
      title: "تم إكمال عملية الدفع بنجاح",
      description: `تم حجز تذكرة لمباراة`,
    });
    
    // معالجة الدفع الفعلية ستحدث هنا
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
    selectedTeam,
    adjustedPrice,
    handleBookTicket,
    handleTeamSelection,
    handleJoinWaitlist,
    handleProcessPayment,
  };
};
