
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface PenaltyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchesRemaining: number;
  onClose: () => void;
}

const PenaltyDialog: React.FC<PenaltyDialogProps> = ({
  open,
  onOpenChange,
  matchesRemaining,
  onClose
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#13002A] text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl rtl">حساب محظور مؤقتاً</DialogTitle>
          <DialogDescription className="text-center text-purple-200">
            تم تقييد حسابك مؤقتاً بسبب عدم الحضور
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-6 rtl text-center">
          <div className="flex justify-center">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          
          <h3 className="text-lg font-bold text-white">
            تم تقييد حسابك لمدة {matchesRemaining} مباريات
          </h3>
          
          <p className="text-purple-200">
            نظراً لعدم حضورك لـ3 مباريات متتالية لفريقك المفضل بعد حجز التذاكر، تم تقييد حسابك مؤقتاً.
            سيتم رفع القيود بعد انتهاء فترة العقوبة.
          </p>
          
          <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30 mt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-purple-400" />
              <p className="text-sm text-purple-300 text-right">
                يمكنك متابعة الحجز ولكن سيتم وضعك في قائمة الانتظار حتى للفريق المفضل.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button type="button" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 border-none" onClick={onClose}>
            فهمت
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PenaltyDialog;
