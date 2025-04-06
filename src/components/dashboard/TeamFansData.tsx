
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { MessageSquare } from 'lucide-react';

interface TeamFansDataProps {
  teamProfile: any;
}

const TeamFansData: React.FC<TeamFansDataProps> = ({ teamProfile }) => {
  // Placeholder data - in a real application this would come from the database
  const fans = [
    { id: 1, name: 'أحمد محمد', mobile: '05xxxxxxxx', email: 'ahmed@example.com', match: 'ضد الهلال', favoriteTeam: 'الاتحاد' },
    { id: 2, name: 'محمد علي', mobile: '05xxxxxxxx', email: 'mohammed@example.com', match: 'ضد النصر', favoriteTeam: 'الهلال' },
    { id: 3, name: 'خالد أحمد', mobile: '05xxxxxxxx', email: 'khalid@example.com', match: 'ضد الهلال', favoriteTeam: 'النصر' },
    { id: 4, name: 'عبدالله محمد', mobile: '05xxxxxxxx', email: 'abdullah@example.com', match: 'ضد الأهلي', favoriteTeam: 'الأهلي' },
    { id: 5, name: 'سعد علي', mobile: '05xxxxxxxx', email: 'saad@example.com', match: 'ضد الهلال', favoriteTeam: 'الشباب' },
  ];

  const favoriteTeamsData = [
    { name: 'الهلال', value: 35 },
    { name: 'النصر', value: 25 },
    { name: 'الأهلي', value: 20 },
    { name: 'الاتحاد', value: 15 },
    { name: 'الشباب', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">بيانات الجمهور</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>توزيع المشجعين حسب الفريق المفضل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                fans: {
                  label: "المشجعين",
                  theme: { light: "#10b981", dark: "#10b981" }
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={favoriteTeamsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {favoriteTeamsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المشجعين الذين اشتروا التذاكر</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>رقم الجوال</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>المباراة</TableHead>
                <TableHead>الفريق المفضل</TableHead>
                <TableHead>التواصل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fans.map(fan => (
                <TableRow key={fan.id}>
                  <TableCell>{fan.name}</TableCell>
                  <TableCell>{fan.mobile}</TableCell>
                  <TableCell>{fan.email}</TableCell>
                  <TableCell>{fan.match}</TableCell>
                  <TableCell>{fan.favoriteTeam}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      إرسال رسالة
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamFansData;
