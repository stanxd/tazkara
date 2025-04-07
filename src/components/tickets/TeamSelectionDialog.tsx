
import React from 'react';
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
}

const TeamSelectionDialog: React.FC<TeamSelectionDialogProps> = ({
  open,
  onOpenChange,
  homeTeam,
  awayTeam,
  onTeamSelect,
  price
}) => {
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
                onClick={() => onTeamSelect(homeTeam)}
                className="relative border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 mb-3 h-20"
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
            </div>
            
            <div className="flex flex-col">
              <Button 
                variant="outline"
                onClick={() => onTeamSelect(awayTeam)}
                className="relative border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 mb-3 h-20"
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
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-purple-500/20">
            <p className="text-center text-purple-200">
              سعر التذكرة: <span className="font-bold text-white">{price} ر.س</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSelectionDialog;
