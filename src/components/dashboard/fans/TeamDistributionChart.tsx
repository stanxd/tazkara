
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, Users } from 'lucide-react';
import { TeamDistribution } from './types';

interface TeamDistributionChartProps {
  isLoading: boolean;
  teamDistribution: TeamDistribution[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8884d8'];

const TeamDistributionChart: React.FC<TeamDistributionChartProps> = ({ isLoading, teamDistribution }) => {
  // Calculate total fans count
  const totalFans = teamDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle>توزيع المشجعين حسب الفريق المفضل</CardTitle>
          <p className="text-sm text-muted-foreground">
            {!isLoading && totalFans > 0 && `إجمالي المشجعين: ${totalFans}`}
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
          <Users className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
            <span className="mr-2">جاري تحميل البيانات...</span>
          </div>
        ) : teamDistribution.length === 0 || totalFans === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center text-muted-foreground">
            <Users className="h-16 w-16 mb-4 opacity-20" />
            <p>لا توجد بيانات كافية لعرض التوزيع</p>
          </div>
        ) : (
          <div className="h-80">
            <ChartContainer
              config={{
                fans: {
                  label: "المشجعين",
                  theme: { light: "#10b981", dark: "#10b981" }
                }
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={teamDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {teamDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {teamDistribution.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{team.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-medium">{team.value}</span>
                    <span className="text-xs text-muted-foreground">
                      ({((team.value / totalFans) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamDistributionChart;
