
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TicketProps } from './TicketCard';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TeamSelectionDialog from './TeamSelectionDialog';
import PaymentDialog from './PaymentDialog';
import WaitlistDialog from './WaitlistDialog';
import { isPopularTeam } from '@/services/teams/teamPopularity';
import TicketCardHeader from './TicketCardHeader';
import TicketCardContent from './TicketCardContent';
import LoginDialog from './dialogs/LoginDialog';

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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTeamSelectionDialog, setShowTeamSelectionDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [adjustedPrice, setAdjustedPrice] = useState<number>(price);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // أضفنا إخراج بيانات المستخدم للتحقق من البيانات المخزنة
  console.log("User data:", user);
  console.log("User metadata:", user?.user_metadata);
  console.log("User favorite team:", user?.user_metadata?.favorite_team);
  
  // الحصول على الفريق المفضل للمستخدم من بيانات التعريف
  const userFavoriteTeam = user?.user_metadata?.favorite_team;
  
  // حساب تعديلات السعر للفريق المحدد والموقع
  const calculateAdjustedPrice = (team: string): number => {
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
  
  const handleTeamSelection = (team: string) => {
    setSelectedTeam(team);
    setAdjustedPrice(calculateAdjustedPrice(team));
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
      description: `تم حجز تذكرة لمباراة ${homeTeam} ضد ${awayTeam}`,
    });
    
    // معالجة الدفع الفعلية ستحدث هنا
  };
  
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
            id={id}
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
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
      
      <TeamSelectionDialog
        open={showTeamSelectionDialog}
        onOpenChange={setShowTeamSelectionDialog}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        onTeamSelect={handleTeamSelection}
        price={price}
        city={city}
      />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        teamName={selectedTeam}
        matchDetails={{
          homeTeam,
          awayTeam,
          date,
          time,
          stadium,
          city
        }}
        price={adjustedPrice}
        onProcessPayment={handleProcessPayment}
      />
      
      <WaitlistDialog
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
        teamName={selectedTeam}
        onJoinWaitlist={handleJoinWaitlist}
      />
    </motion.div>
  );
};

export default ModernTicketCard;
