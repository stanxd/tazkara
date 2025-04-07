
import React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  
  const handleLoginRedirect = () => {
    onOpenChange(false);
    navigate('/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#13002A] text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl rtl">تسجيل الدخول مطلوب</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 text-center rtl">
          <p className="text-purple-200">
            يجب تسجيل الدخول بحساب مشجع لتتمكن من حجز هذه التذكرة
          </p>
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
            onClick={handleLoginRedirect}
          >
            تسجيل الدخول
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
