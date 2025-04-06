
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
}

const MatchForm: React.FC<MatchFormProps> = ({ 
  opponentTeams, 
  cities, 
  stadiums, 
  onSubmit, 
  onOpenChange 
}) => {
  const [citySelection, setCitySelection] = useState('الرياض');
  const [filteredStadiums, setFilteredStadiums] = useState(stadiums['الرياض']);

  const form = useForm<MatchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      opponent: '',
      city: 'الرياض',
      stadium: '',
      date: '',
      time: '',
      availableTickets: undefined,
      ticketPrice: undefined,
    },
  });

  const handleCityChange = (value: string) => {
    setCitySelection(value);
    form.setValue('city', value);
    form.setValue('stadium', '');
    setFilteredStadiums(stadiums[value as keyof typeof stadiums]);
  };

  const handleFormSubmit = (data: MatchFormData) => {
    onSubmit(data);
    form.reset();
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
                onValueChange={field.onChange} 
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
                onValueChange={field.onChange} 
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
                  <Input type="time" min="20:00" max="23:00" {...field} />
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
