
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PricingRecommendationModal from './PricingRecommendationModal';
import { PricingModelInput } from './pricingModel';

// Define the form schema
const formSchema = z.object({
  opponent: z.string().min(1, { message: 'يجب اختيار الفريق المنافس' }),
  city: z.string().min(1, { message: 'يجب اختيار المدينة' }),
  stadium: z.string().min(1, { message: 'يجب اختيار الملعب' }),
  date: z.string().min(1, { message: 'يجب إدخال التاريخ' }),
  time: z.string().min(1, { message: 'يجب إدخال الوقت' }),
  availableTickets: z.coerce.number().positive({ message: 'يجب أن يكون عدد التذاكر أكبر من 0' }),
  ticketPrice: z.coerce.number().positive({ message: 'يجب أن يكون سعر التذكرة أكبر من 0' }),
});

// Type for the form data
export type MatchFormData = z.infer<typeof formSchema>;

interface MatchFormProps {
  opponentTeams: string[];
  cities: string[];
  stadiums: Record<string, string[]>;
  onSubmit: (data: MatchFormData) => void;
  onOpenChange: (open: boolean) => void;
  currentTeam?: string;
}

const MatchForm: React.FC<MatchFormProps> = ({ 
  opponentTeams, 
  cities, 
  stadiums, 
  onSubmit, 
  onOpenChange,
  currentTeam = ''
}) => {
  const [citySelection, setCitySelection] = useState('الرياض');
  const [filteredStadiums, setFilteredStadiums] = useState(stadiums['الرياض']);
  const [pricingData, setPricingData] = useState<Partial<PricingModelInput>>({});

  const form = useForm<MatchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opponent: '',
      city: 'الرياض',
      stadium: '',
      date: '',
      time: '20:00',
      availableTickets: undefined,
      ticketPrice: undefined,
    },
  });

  const handleCityChange = (value: string) => {
    setCitySelection(value);
    form.setValue('city', value);
    form.setValue('stadium', '');
    setFilteredStadiums(stadiums[value as keyof typeof stadiums]);
    
    // Update pricing data
    updatePricingData({ city: value });
  };
  
  const handleOpponentChange = (value: string) => {
    form.setValue('opponent', value);
    
    // Update pricing data with opponent team
    updatePricingData({ awayTeam: value });
  };
  
  const handleStadiumChange = (value: string) => {
    form.setValue('stadium', value);
    
    // Update pricing data with stadium
    updatePricingData({ stadium: value });
  };
  
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('time', event.target.value);
    
    // Update pricing data with time
    updatePricingData({ time: event.target.value });
  };

  // Update pricing data helper
  const updatePricingData = (newData: Partial<PricingModelInput>) => {
    setPricingData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  // Set home team when component mounts
  useEffect(() => {
    if (currentTeam) {
      updatePricingData({ homeTeam: currentTeam });
    }
  }, [currentTeam]);

  const handleFormSubmit = (data: MatchFormData) => {
    onSubmit(data);
    form.reset();
  };
  
  const handleSetRecommendedPrice = (price: number) => {
    form.setValue('ticketPrice', price);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="opponent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الفريق المنافس</FormLabel>
              <Select 
                onValueChange={(value) => handleOpponentChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفريق المنافس" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {opponentTeams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدينة</FormLabel>
              <Select 
                onValueChange={(value) => handleCityChange(value)} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="stadium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الملعب</FormLabel>
              <Select 
                onValueChange={(value) => handleStadiumChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الملعب" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredStadiums.map(stadium => (
                    <SelectItem key={stadium} value={stadium}>{stadium}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التاريخ</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوقت</FormLabel>
                <FormControl>
                  <Input type="time" min="20:00" max="23:00" {...field} onChange={(e) => handleTimeChange(e)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="availableTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد التذاكر المتاحة</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ticketPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سعر التذكرة (ر.س)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
                <PricingRecommendationModal
                  matchData={pricingData}
                  onSelectPrice={handleSetRecommendedPrice}
                  disabled={!form.getValues('opponent') || !form.getValues('stadium')}
                />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-tazkara-green hover:bg-tazkara-green/90">
            حفظ المباراة
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MatchForm;
