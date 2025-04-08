
import React, { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from 'recharts';
import { PricingModelInput } from '../types';

interface PricePoint {
  price: number;
  demand: number;
  revenue: number;
  isRecommended: boolean;
}

interface PriceOptimizationChartProps {
  recommendedPrice: number;
  matchData: Partial<PricingModelInput>;
}

const PriceOptimizationChart: React.FC<PriceOptimizationChartProps> = ({
  recommendedPrice,
  matchData
}) => {
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  
  // جيل بيانات للرسم البياني بناء على التوصية والبيانات الأخرى
  useEffect(() => {
    // إنشاء منحنى يحاكي العلاقة بين السعر والطلب
    const generateChartData = () => {
      const basePrice = recommendedPrice;
      const baseDemand = 1000; // الطلب الأساسي
      
      // حساب معامل المرونة للطلب حسب نوع المباراة والفرق
      let elasticityFactor = 1.5; // معامل مرونة الطلب الافتراضي
      
      if (matchData.awayTeam?.includes('الهلال') || matchData.awayTeam?.includes('النصر')) {
        elasticityFactor = 0.8; // طلب أقل مرونة (حساسية أقل للسعر) للمباريات الكبيرة
      } else if (matchData.awayTeam?.includes('الاتحاد') || matchData.awayTeam?.includes('الأهلي')) {
        elasticityFactor = 1.0;
      }
      
      // إنشاء نقاط بيانية من 40% الى 160% من السعر الموصى به
      const dataPoints: PricePoint[] = [];
      const priceRange = 0.6;
      const steps = 20;
      
      for (let i = 0; i <= steps; i++) {
        const priceRatio = 0.4 + (i * priceRange) / steps;
        const price = Math.round(basePrice * priceRatio);
        
        // صيغة معدلة لحساب الطلب بناءً على السعر
        // نستخدم دالة أسية سالبة تمثل العلاقة العكسية بين السعر والطلب
        const demandRatio = Math.pow(priceRatio, -elasticityFactor);
        const demand = Math.round(baseDemand * demandRatio);
        
        // حساب الإيرادات كحاصل ضرب السعر في الطلب
        const revenue = price * demand;
        
        dataPoints.push({
          price,
          demand,
          revenue: Math.round(revenue / 100), // تقسيم القيمة للحصول على مقياس أفضل للرسم
          isRecommended: price === Math.round(basePrice)
        });
      }
      
      return dataPoints;
    };
    
    setChartData(generateChartData());
  }, [recommendedPrice, matchData]);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">تحليل العلاقة بين السعر والطلب</h3>
      <div className="h-[280px] w-full overflow-x-auto pb-2">
        <ChartContainer config={{
          price: {
            label: "السعر",
            color: "#10b981"
          },
          demand: {
            label: "الطلب المتوقع",
            color: "#3b82f6"
          },
          revenue: {
            label: "الإيرادات المتوقعة",
            color: "#f59e0b",
            theme: {
              light: "#f59e0b",
              dark: "#f59e0b"
            }
          }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="price" 
                tick={{ fontSize: 10 }} 
                label={{ 
                  value: 'السعر (ر.س)', 
                  position: 'insideBottom', 
                  fontSize: 12,
                  offset: -15
                }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 10 }} 
                orientation="left"
                label={{ 
                  value: 'الطلب المتوقع', 
                  angle: -90, 
                  position: 'insideLeft',
                  fontSize: 12
                }}
              />
              <YAxis 
                yAxisId="right"
                tick={{ fontSize: 10 }} 
                orientation="right"
                label={{ 
                  value: 'الإيرادات (آلاف)', 
                  angle: 90, 
                  position: 'insideRight', 
                  fontSize: 12
                }}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ paddingTop: 5, fontSize: 12 }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="demand" 
                stroke="var(--color-demand, #3b82f6)" 
                strokeWidth={2} 
                dot={{ r: 1 }} 
                activeDot={{ r: 5 }}
                name="الطلب المتوقع"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-revenue, #f59e0b)" 
                strokeWidth={2} 
                dot={{ r: 1 }} 
                activeDot={{ r: 5 }}
                name="الإيرادات (آلاف)"
              />
              <ReferenceLine 
                x={recommendedPrice} 
                stroke="#16a34a" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'السعر الموصى به', 
                  position: 'top',
                  fill: '#16a34a',
                  fontSize: 10 
                }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-center">
        ملاحظة: هذا التحليل تقديري ويعتمد على نموذج اقتصادي مبسط للعلاقة بين السعر والطلب
      </div>
    </div>
  );
};

export default PriceOptimizationChart;
