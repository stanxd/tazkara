import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download, FileText } from 'lucide-react';
interface TeamSalesReportsProps {
  teamProfile: any;
}
const TeamSalesReports: React.FC<TeamSalesReportsProps> = ({
  teamProfile
}) => {
  // Placeholder data - in a real application this would come from the database
  const matchSales = [{
    id: 1,
    match: 'ضد الهلال',
    date: '2025-04-15',
    soldTickets: 950,
    totalTickets: 1000,
    revenue: 95000
  }, {
    id: 2,
    match: 'ضد الاتحاد',
    date: '2025-05-01',
    soldTickets: 1200,
    totalTickets: 1500,
    revenue: 144000
  }, {
    id: 3,
    match: 'ضد الأهلي',
    date: '2025-03-15',
    soldTickets: 1100,
    totalTickets: 1200,
    revenue: 88000
  }];
  const salesOverTime = [{
    name: 'قبل أسبوعين',
    'عدد التذاكر': 120
  }, {
    name: 'قبل أسبوع',
    'عدد التذاكر': 300
  }, {
    name: '5 أيام',
    'عدد التذاكر': 420
  }, {
    name: '4 أيام',
    'عدد التذاكر': 480
  }, {
    name: '3 أيام',
    'عدد التذاكر': 520
  }, {
    name: 'قبل يومين',
    'عدد التذاكر': 700
  }, {
    name: 'الأمس',
    'عدد التذاكر': 850
  }, {
    name: 'اليوم',
    'عدد التذاكر': 950
  }];
  const totalRevenue = matchSales.reduce((sum, match) => sum + match.revenue, 0);
  const totalTickets = matchSales.reduce((sum, match) => sum + match.soldTickets, 0);
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير المبيعات</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" />
            تصدير PDF
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRevenue.toLocaleString()} ر.س</div>
            <p className="text-sm text-muted-foreground">من {totalTickets} تذكرة</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>معدل حجز التذاكر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(totalTickets / matchSales.reduce((sum, match) => sum + match.totalTickets, 0) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">من إجمالي التذاكر المتاحة</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مبيعات التذاكر عبر الزمن</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] my-0 py-0 px-[156px] mx-[11px]">
            <ChartContainer config={{
            tickets: {
              label: "عدد التذاكر",
              color: "#10b981"
            }
          }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesOverTime} margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70
              }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" height={70} tick={props => {
                  const {
                    x,
                    y,
                    payload
                  } = props;
                  return <g transform={`translate(${x},${y})`}>
                          <text x={0} y={0} dy={20} textAnchor="end" fill="#666" transform="rotate(-45)">
                            {payload.value}
                          </text>
                        </g>;
                }} />
                  <YAxis width={45} tick={{
                  dx: -10
                }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{
                  paddingTop: 20
                }} />
                  <Bar dataKey="عدد التذاكر" fill="var(--color-tickets, #10b981)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>مبيعات حسب المباريات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المباراة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>التذاكر المباعة</TableHead>
                <TableHead>النسبة المئوية</TableHead>
                <TableHead>الإيرادات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchSales.map(match => <TableRow key={match.id}>
                  <TableCell>{match.match}</TableCell>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.soldTickets} / {match.totalTickets}</TableCell>
                  <TableCell>{Math.round(match.soldTickets / match.totalTickets * 100)}%</TableCell>
                  <TableCell>{match.revenue.toLocaleString()} ر.س</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default TeamSalesReports;