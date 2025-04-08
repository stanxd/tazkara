
import React, { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
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
  
  // توليد بيانات للرسم البياني بناء على التوصية والبيانات الأخرى
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
      // تقليل عدد النقاط لتبسيط المخطط
      const steps = 10; 
      
      for (let i = 0; i <= steps; i++) {
        const priceRatio = 0.4 + (i * priceRange) / steps;
        const price = Math.round(basePrice * priceRatio);
        
        // صيغة معدلة لحساب الطلب بناءً على السعر
        const demandRatio = Math.pow(priceRatio, -elasticityFactor);
        const demand = Math.round(baseDemand * demandRatio);
        
        // حساب الإيرادات كحاصل ضرب السعر في الطلب
        const revenue = price * demand;
        
        dataPoints.push({
          price,
          demand,
          revenue: Math.round(revenue / 100),
          isRecommended: price === Math.round(basePrice)
        });
      }
      
      return dataPoints;
    };
    
    setChartData(generateChartData());
  }, [recommendedPrice, matchData]);
  
  return (
    <div className="mb-3">
      <h3 className="text-sm font-medium mb-2">تحليل العلاقة بين السعر والطلب</h3>
      <div className="h-[200px] w-full overflow-x-auto pb-1"> {/* تقليص ارتفاع المخطط */}
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
            theme: {
              light: "#f59e0b",
              dark: "#f59e0b"
            }
          }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 5, right: 20, left: 0, bottom: 20 }} {/* تقليل الهوامش */}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="price" 
                tick={{ fontSize: 9 }} {/* خفض حجم الخط */}
                label={{ 
                  value: 'السعر (ر.س)', 
                  position: 'insideBottom', 
                  fontSize: 9, {/* خفض حجم الخط */}
                  offset: -10
                }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 9 }} {/* خفض حجم الخط */}
                orientation="left"
                label={{ 
                  value: 'الطلب', 
                  angle: -90, 
                  position: 'insideLeft',
                  fontSize: 9, {/* خفض حجم الخط */}
                  offset: -5
                }}
              />
              <YAxis 
                yAxisId="right"
                tick={{ fontSize: 9 }} {/* خفض حجم الخط */}
                orientation="right"
                label={{ 
                  value: 'الإيرادات', 
                  angle: 90, 
                  position: 'insideRight', 
                  fontSize: 9, {/* خفض حجم الخط */}
                  offset: 0
                }}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ paddingTop: 2, fontSize: 9 }} layout="horizontal" verticalAlign="bottom" height={20} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="demand" 
                stroke="var(--color-demand, #3b82f6)" 
                strokeWidth={1.5} {/* خفض سمك الخط */}
                dot={{ r: 0 }} {/* إزالة النقاط */}
                activeDot={{ r: 4 }}
                name="الطلب المتوقع"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-revenue, #f59e0b)" 
                strokeWidth={1.5} {/* خفض سمك الخط */}
                dot={{ r: 0 }} {/* إزالة النقاط */}
                activeDot={{ r: 4 }}
                name="الإيرادات"
              />
              <ReferenceLine 
                x={recommendedPrice} 
                stroke="#16a34a" 
                strokeDasharray="3 3"
                yAxisId="left"
                label={{ 
                  value: 'السعر الموصى به', 
                  position: 'top',
                  fill: '#16a34a',
                  fontSize: 9 {/* خفض حجم الخط */}
                }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="text-xs text-gray-500 text-center">
        ملاحظة: تحليل تقديري يعتمد على نموذج مبسط للعلاقة بين السعر والطلب
      </div>
    </div>
  );
};

export default PriceOptimizationChart;
