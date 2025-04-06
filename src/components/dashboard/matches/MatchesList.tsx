
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Match } from '@/components/dashboard/matches/types';

interface MatchesListProps {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
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
            <TableCell>
              {match.isFuture && (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
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
