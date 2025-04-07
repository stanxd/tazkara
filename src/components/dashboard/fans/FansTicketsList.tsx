
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Gift, UserCheck, Clock } from 'lucide-react';
import { FanTicket } from './types';
import { Progress } from '@/components/ui/progress';

interface FansTicketsListProps {
  isLoading: boolean;
  tickets: FanTicket[];
}

const FansTicketsList: React.FC<FansTicketsListProps> = ({ isLoading, tickets }) => {
  // Calculate statistics for gift acceptance
  const giftTickets = tickets.filter(ticket => ticket.isGift);
  const acceptedGifts = giftTickets.filter(ticket => ticket.giftAccepted);
  const pendingGifts = giftTickets.filter(ticket => !ticket.giftAccepted);
  
  // Calculate percentages
  const acceptanceRate = giftTickets.length > 0 
    ? Math.round((acceptedGifts.length / giftTickets.length) * 100) 
    : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>إحصائيات قبول الهدايا</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
            <span className="mr-2">جاري تحميل البيانات...</span>
          </div>
        ) : giftTickets.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border text-center">
                <Gift className="h-8 w-8 mx-auto mb-2 text-tazkara-green" />
                <div className="text-2xl font-bold">{giftTickets.length}</div>
                <div className="text-sm text-muted-foreground">إجمالي الهدايا</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border text-center">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{acceptedGifts.length}</div>
                <div className="text-sm text-muted-foreground">الهدايا المقبولة</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <div className="text-2xl font-bold">{pendingGifts.length}</div>
                <div className="text-sm text-muted-foreground">الهدايا المعلقة</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>نسبة القبول</span>
                <span className="font-medium">{acceptanceRate}%</span>
              </div>
              <Progress value={acceptanceRate} className="h-2" />
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-right">الفريق المنافس</th>
                    <th className="p-3 text-right">عدد الهدايا</th>
                    <th className="p-3 text-right">المقبولة</th>
                    <th className="p-3 text-right">نسبة القبول</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(new Set(giftTickets.map(ticket => `${ticket.home_team} vs ${ticket.away_team}`))).map((matchName, index) => {
                    const matchTickets = giftTickets.filter(ticket => 
                      `${ticket.home_team} vs ${ticket.away_team}` === matchName
                    );
                    const matchAccepted = matchTickets.filter(ticket => ticket.giftAccepted);
                    const acceptRate = matchTickets.length > 0 
                      ? Math.round((matchAccepted.length / matchTickets.length) * 100) 
                      : 0;
                    
                    return (
                      <tr key={index} className="border-t">
                        <td className="p-3">{matchName}</td>
                        <td className="p-3">{matchTickets.length}</td>
                        <td className="p-3">{matchAccepted.length}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className="ml-2">{acceptRate}%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-tazkara-green h-2 rounded-full" 
                                style={{ width: `${acceptRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>لا توجد هدايا تذاكر مسجلة حتى الآن</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FansTicketsList;
