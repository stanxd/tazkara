
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';

interface TicketDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
    stadium: string;
    price: number;
  };
}

const TicketDetailsDialog: React.FC<TicketDetailsDialogProps> = ({
  open,
  onOpenChange,
  ticket
}) => {
  const { user } = useAuth();
  const userMetadata = user?.user_metadata || {};
  
  // Generate a simple barcode pattern (in a real app, you'd use a barcode library)
  const generateBarcodePattern = (id: string) => {
    const barcodeId = id.replace(/[^0-9a-zA-Z]/g, '').substring(0, 12);
    return barcodeId;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center rtl">تفاصيل التذكرة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-xl font-bold rtl">
                  {ticket.homeTeam} ضد {ticket.awayTeam}
                </h3>
                
                <div className="text-sm text-muted-foreground rtl">
                  {ticket.date} | {ticket.time}
                </div>
                
                <div className="text-sm rtl">
                  {ticket.stadium}
                </div>
                
                <Separator className="my-2" />
                
                <div className="grid grid-cols-2 gap-4 w-full text-start rtl">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">الاسم</p>
                    <p>{userMetadata.name || "غير متوفر"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">رقم الهوية</p>
                    <p>{userMetadata.id_number || "غير متوفر"}</p>
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <div className="w-full mt-4">
                  <p className="text-sm font-medium text-muted-foreground text-center mb-2 rtl">باركود التذكرة</p>
                  <div className="flex items-center justify-center">
                    <div className="bg-black text-white text-xs p-1 font-mono tracking-wider">
                      {generateBarcodePattern(ticket.id)}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mt-4 rtl">
                  المبلغ: {ticket.price} ريال
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsDialog;
