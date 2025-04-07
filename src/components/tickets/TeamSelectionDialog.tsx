
import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { isPopularTeam } from '@/services/teams/teamPopularity';

interface TeamSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  homeTeam: string;
  awayTeam: string;
  onTeamSelect: (team: string) => void;
  price: number;
  city: string;
}

const TeamSelectionDialog: React.FC<TeamSelectionDialogProps> = ({
  open,
  onOpenChange,
  homeTeam,
  awayTeam,
  onTeamSelect,
  price,
  city
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(price);
  
  // Calculate adjusted price based on team and city
  const calculateAdjustedPrice = (team: string) => {
    let adjustedPrice = price;
    
    // Popular teams get 60% price increase
    if (isPopularTeam(team)) {
      adjustedPrice = Math.round(price * 1.6);
    }
    
    // Riyadh matches are more expensive
    if (city === "الرياض") {
      adjustedPrice = Math.round(adjustedPrice * 1.15);
    }
    
    return adjustedPrice;
  };
  
  // Update price when team is selected
  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setCalculatedPrice(calculateAdjustedPrice(team));
  };
  
  // Reset selection when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedTeam(null);
    }
  }, [open]);
  
  // Submit selection
  const handleSubmit = () => {
    if (selectedTeam) {
      onTeamSelect(selectedTeam);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#13002A] text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl rtl">اختر الفريق المفضل لديك</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 rtl">
          <p className="text-purple-200 text-center mb-5">
            اختر الفريق الذي تريد شراء التذكرة لمشاهدته
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Button 
                variant="outline" 
                onClick={() => handleTeamSelect(homeTeam)}
                className={`relative border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 mb-3 h-20 ${selectedTeam === homeTeam ? 'ring-2 ring-pink-500' : ''}`}
              >
                <span className="text-lg font-bold">{homeTeam}</span>
                {isPopularTeam(homeTeam) && (
                  <span className="absolute top-2 right-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                  </span>
                )}
              </Button>
              {isPopularTeam(homeTeam) && (
                <p className="text-xs text-orange-400 text-center">فريق ذو شعبية عالية</p>
              )}
              {selectedTeam === homeTeam && (
                <p className="text-center text-purple-200 mt-1">
                  السعر: <span className="font-bold text-white">{calculateAdjustedPrice(homeTeam)} ر.س</span>
                </p>
              )}
            </div>
            
            <div className="flex flex-col">
              <Button 
                variant="outline"
                onClick={() => handleTeamSelect(awayTeam)}
                className={`relative border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 mb-3 h-20 ${selectedTeam === awayTeam ? 'ring-2 ring-pink-500' : ''}`}
              >
                <span className="text-lg font-bold">{awayTeam}</span>
                {isPopularTeam(awayTeam) && (
                  <span className="absolute top-2 right-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                  </span>
                )}
              </Button>
              {isPopularTeam(awayTeam) && (
                <p className="text-xs text-orange-400 text-center">فريق ذو شعبية عالية</p>
              )}
              {selectedTeam === awayTeam && (
                <p className="text-center text-purple-200 mt-1">
                  السعر: <span className="font-bold text-white">{calculateAdjustedPrice(awayTeam)} ر.س</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-purple-500/20 flex justify-between items-center">
            {selectedTeam ? (
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none w-full"
              >
                متابعة بسعر {calculatedPrice} ر.س
              </Button>
            ) : (
              <p className="text-center text-purple-200 w-full">
                يرجى اختيار فريق للمتابعة
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSelectionDialog;
