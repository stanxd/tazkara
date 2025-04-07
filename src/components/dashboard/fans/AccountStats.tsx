
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountStatsProps {
  userId: string;
}

// Mock data for demonstration
const stats = {
  totalMatches: 12,
  attendedMatches: 10,
  missedMatches: 2,
  favoriteTeamMatches: 8,
  otherTeamsMatches: 4,
  totalSpent: 2400
};

const AccountStats: React.FC<AccountStatsProps> = ({ userId }) => {
  // In a real application, we would fetch these stats from a backend service
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="rtl">إحصاءات الحساب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground mb-2 rtl">عدد المباريات</p>
            <p className="text-2xl font-bold rtl">{stats.totalMatches}</p>
            <div className="flex justify-between mt-2 rtl">
              <div>
                <p className="text-xs text-muted-foreground">حضور</p>
                <p className="font-medium text-green-500">{stats.attendedMatches}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">غياب</p>
                <p className="font-medium text-red-500">{stats.missedMatches}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground mb-2 rtl">حسب الفريق</p>
            <p className="text-2xl font-bold rtl">{stats.totalMatches}</p>
            <div className="flex justify-between mt-2 rtl">
              <div>
                <p className="text-xs text-muted-foreground">الفريق المفضل</p>
                <p className="font-medium">{stats.favoriteTeamMatches}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">فرق أخرى</p>
                <p className="font-medium">{stats.otherTeamsMatches}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground mb-2 rtl">إجمالي الإنفاق</p>
            <p className="text-2xl font-bold rtl">{stats.totalSpent} ريال</p>
            <div className="mt-2 rtl">
              <p className="text-xs text-muted-foreground">متوسط سعر التذكرة</p>
              <p className="font-medium">{Math.round(stats.totalSpent / stats.totalMatches)} ريال</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountStats;
