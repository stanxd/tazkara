
import React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TeamButton from './TeamButton';
import PriceDisplay from './PriceDisplay';
import { useTeamSelection } from '@/hooks/useTeamSelection';

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
  const {
    selectedTeam,
    calculatedPrice,
    handleTeamSelect,
    handleSubmit
  } = useTeamSelection({ price, city, onOpenChange });

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
              <TeamButton 
                teamName={homeTeam}
                isSelected={selectedTeam === homeTeam}
                onSelect={handleTeamSelect}
              />
              {selectedTeam === homeTeam && (
                <PriceDisplay teamName={homeTeam} price={calculatedPrice} />
              )}
            </div>
            
            <div className="flex flex-col">
              <TeamButton 
                teamName={awayTeam}
                isSelected={selectedTeam === awayTeam}
                onSelect={handleTeamSelect}
              />
              {selectedTeam === awayTeam && (
                <PriceDisplay teamName={awayTeam} price={calculatedPrice} />
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-purple-500/20 flex justify-between items-center">
            {selectedTeam ? (
              <Button 
                onClick={() => handleSubmit(onTeamSelect)}
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
