
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Gift } from 'lucide-react';
import { Match } from '@/components/dashboard/matches/types';
import { useToast } from '@/hooks/use-toast';

interface MatchesListProps {
  matches: Match[];
  onDeleteMatch?: (matchId: number) => void;
  showGiftColumn?: boolean;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, onDeleteMatch, showGiftColumn = false }) => {
  const { toast } = useToast();
  
  const handleDelete = (match: Match) => {
    if (onDeleteMatch) {
      onDeleteMatch(match.id);
      toast({
        title: "تم حذف المباراة بنجاح",
        description: `تم حذف المباراة ضد ${match.opponent}`
      });
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الفريق المنافس</TableHead>
          <TableHead>المدينة</TableHead>
          <TableHead>الملعب</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead>الوقت</TableHead>
          <TableHead>التذاكر المتاحة</TableHead>
          <TableHead>سعر التذكرة</TableHead>
          {showGiftColumn && <TableHead>تذاكر الهدايا</TableHead>}
          <TableHead>إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map(match => (
          <TableRow key={match.id}>
            <TableCell>{match.opponent}</TableCell>
            <TableCell>{match.city}</TableCell>
            <TableCell>{match.stadium}</TableCell>
            <TableCell>{match.date}</TableCell>
            <TableCell>{match.time}</TableCell>
            <TableCell>{match.availableTickets}</TableCell>
            <TableCell>{match.ticketPrice} ر.س</TableCell>
            {showGiftColumn && (
              <TableCell>
                {match.giftTickets && match.giftTickets > 0 ? (
                  <span className="flex items-center">
                    {match.giftTickets}
                    {match.giftDistributed && <span className="ml-2 text-green-500 text-xs">تم التوزيع</span>}
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
            )}
            <TableCell>
              {match.isFuture && (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(match)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MatchesList;
