
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormData } from './formTypes';

interface DateTimeFieldsProps {
  form: UseFormReturn<MatchFormData>;
  onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  form,
  onTimeChange
}) => {
  return (
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
              <Input 
                type="time" 
                min="20:00" 
                max="23:00" 
                {...field} 
                onChange={(e) => onTimeChange(e)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DateTimeFields;
