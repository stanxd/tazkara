
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isUserPenalized } from '@/services/fans/attendanceService';

interface AccountStatusProps {
  userId: string;
}

const AccountStatus: React.FC<AccountStatusProps> = ({ userId }) => {
  const isPenalized = isUserPenalized(userId);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="rtl">حالة الحساب</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center">
        {isPenalized ? (
          <Badge variant="destructive" className="px-3 py-1 text-base">قيد الانتظار</Badge>
        ) : (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600 px-3 py-1 text-base">نشط</Badge>
        )}
        {isPenalized && (
          <p className="mr-3 text-sm text-muted-foreground rtl">
            حسابك قيد الانتظار بسبب عدم حضور المباريات السابقة
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountStatus;
