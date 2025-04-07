
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, X } from 'lucide-react';

interface AttendanceHistoryProps {
  userId: string;
}

// Mock data for demonstration
const MOCK_ATTENDANCE = [
  {
    id: 'at1',
    match: 'الهلال ضد النصر',
    date: '2025-03-15',
    attended: true
  },
  {
    id: 'at2',
    match: 'الاتحاد ضد الهلال',
    date: '2025-03-08',
    attended: true
  },
  {
    id: 'at3',
    match: 'الهلال ضد الفتح',
    date: '2025-02-28',
    attended: false
  },
  {
    id: 'at4',
    match: 'الأهلي ضد الهلال',
    date: '2025-02-20',
    attended: true
  }
];

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ userId }) => {
  const [attendanceHistory, setAttendanceHistory] = useState(MOCK_ATTENDANCE);
  
  // Calculate stats
  const totalMatches = attendanceHistory.length;
  const attendedMatches = attendanceHistory.filter(match => match.attended).length;
  const missedMatches = totalMatches - attendedMatches;
  const attendanceRate = totalMatches > 0 ? Math.round((attendedMatches / totalMatches) * 100) : 0;
  
  // Check for consecutive misses (in a real app, the order would come from DB)
  const checkConsecutiveMisses = () => {
    // Sort by date in descending order (most recent first)
    const sortedHistory = [...attendanceHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let consecutiveMisses = 0;
    for (const match of sortedHistory) {
      if (!match.attended) {
        consecutiveMisses++;
      } else {
        break; // Break the streak if an attended match is found
      }
    }
    
    return consecutiveMisses;
  };
  
  const consecutiveMisses = checkConsecutiveMisses();
  const isWarningNeeded = consecutiveMisses >= 2; // Warning if 2+ consecutive misses
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="rtl">سجل الحضور</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground mb-1 text-sm rtl">نسبة الحضور</p>
            <p className="text-xl font-bold rtl">{attendanceRate}%</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground mb-1 text-sm rtl">المباريات المحضورة</p>
            <p className="text-xl font-bold text-green-500 rtl">{attendedMatches}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-muted-foreground mb-1 text-sm rtl">المباريات المتغيب عنها</p>
            <p className="text-xl font-bold text-red-500 rtl">{missedMatches}</p>
          </div>
        </div>
        
        {isWarningNeeded && (
          <div className="mb-4 bg-red-50 p-3 rounded-md border border-red-200 flex rtl">
            <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />
            <div>
              <p className="text-sm text-red-700 font-semibold">تحذير: لديك {consecutiveMisses} غيابات متتالية</p>
              <p className="text-sm text-red-600">في حال الغياب عن مباراة أخرى سيتم تحويل حسابك إلى قائمة الانتظار لمدة 3 مباريات.</p>
            </div>
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rtl">المباراة</TableHead>
              <TableHead className="rtl">التاريخ</TableHead>
              <TableHead className="rtl">الحضور</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="rtl">{record.match}</TableCell>
                <TableCell className="rtl">{new Date(record.date).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell>
                  {record.attended ? (
                    <Badge className="bg-green-500 flex items-center w-20 justify-center rtl">
                      <Check className="h-4 w-4 mr-1" /> حضور
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 flex items-center w-20 justify-center rtl">
                      <X className="h-4 w-4 mr-1" /> غياب
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-200 flex rtl">
          <AlertTriangle className="h-5 w-5 text-blue-500 ml-2" />
          <p className="text-sm text-blue-700">تنبيه هام: في حال الغياب عن 3 مباريات متتالية سيتم تحويل الحساب من نشط إلى قائمة الانتظار لمدة 3 مباريات قادمة.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
