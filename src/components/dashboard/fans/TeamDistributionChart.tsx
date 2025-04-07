
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';
import { TeamDistribution } from './types';

interface TeamDistributionChartProps {
  isLoading: boolean;
  teamDistribution: TeamDistribution[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TeamDistributionChart: React.FC<TeamDistributionChartProps> = ({ isLoading, teamDistribution }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>توزيع المشجعين حسب الفريق المفضل</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
            <span className="mr-2">جاري تحميل البيانات...</span>
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
              <div style={{ width: '100%', height: '100%' }}>
                <PieChart width={400} height={300} style={{ margin: 'auto' }}>
                  <Pie
                    data={teamDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {teamDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </div>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamDistributionChart;
