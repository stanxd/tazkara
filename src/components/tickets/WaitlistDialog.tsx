
import React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, AlertCircle, Heart } from 'lucide-react';

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  onJoinWaitlist: () => void;
}

const WaitlistDialog: React.FC<WaitlistDialogProps> = ({
  open,
  onOpenChange,
  teamName,
  onJoinWaitlist
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#13002A] text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl rtl">قائمة الانتظار</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-6 rtl text-center">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          
          <h3 className="text-lg font-bold text-white">
            {teamName} ليس فريقك المفضل
          </h3>
          
          <p className="text-purple-200">
            نظراً لأنك اخترت فريقاً ليس هو فريقك المفضل، يجب عليك الانضمام لقائمة الانتظار للحصول على فرصة حجز التذكرة.
          </p>
          
          <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30 mt-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-400" />
              <p className="text-sm text-purple-300 text-right">
                سيتم إشعارك عند توفر التذاكر عبر البريد الإلكتروني المسجل في حسابك
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center gap-2 rtl">
          <Button
            type="button"
            variant="ghost"
            className="border border-purple-500/20 text-purple-200"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
          <Button 
            type="button" 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none"
            onClick={onJoinWaitlist}
          >
            انضمام لقائمة الانتظار
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
