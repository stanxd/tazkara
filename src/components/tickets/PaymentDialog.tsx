
import React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ticket, CreditCard, Smartphone } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  matchDetails: {
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    stadium: string;
    city: string;
  };
  price: number;
  onProcessPayment: (method: 'card' | 'applepay') => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  teamName,
  matchDetails,
  price,
  onProcessPayment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#13002A] text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl rtl">إكمال عملية الدفع</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4 rtl">
          <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30 mb-4">
            <div className="flex items-center mb-3">
              <Ticket className="h-5 w-5 text-purple-400 ml-2" />
              <h3 className="font-bold text-lg">تفاصيل التذكرة</h3>
            </div>
            <div className="space-y-2 text-sm text-purple-200">
              <div className="flex justify-between">
                <span>المباراة:</span>
                <span className="font-medium text-white">{matchDetails.homeTeam} ضد {matchDetails.awayTeam}</span>
              </div>
              <div className="flex justify-between">
                <span>الفريق المختار:</span>
                <span className="font-medium text-white">{teamName}</span>
              </div>
              <div className="flex justify-between">
                <span>التاريخ:</span>
                <span className="font-medium text-white">{matchDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span>الوقت:</span>
                <span className="font-medium text-white">{matchDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span>الملعب:</span>
                <span className="font-medium text-white">{matchDetails.stadium}، {matchDetails.city}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3 border-y border-purple-500/20">
            <span className="font-bold">إجمالي المبلغ:</span>
            <span className="text-xl font-bold text-white">{price} ر.س</span>
          </div>
          
          <p className="text-center text-sm text-purple-300 mt-2">
            الرجاء اختيار وسيلة الدفع المناسبة لاستكمال حجز التذكرة
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              variant="outline" 
              className="border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 h-16 flex flex-col items-center justify-center gap-1"
              onClick={() => onProcessPayment('card')}
            >
              <CreditCard className="h-6 w-6 text-purple-300" />
              <span>بطاقة ائتمانية</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-purple-500/40 bg-purple-900/20 hover:bg-purple-900/40 h-16 flex flex-col items-center justify-center gap-1"
              onClick={() => onProcessPayment('applepay')}
            >
              <Smartphone className="h-6 w-6 text-purple-300" />
              <span>أبل باي</span>
            </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
