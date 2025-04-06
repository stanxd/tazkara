
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormData } from './formTypes';

interface LocationFieldsProps {
  form: UseFormReturn<MatchFormData>;
  cities: string[];
  stadiums: Record<string, string[]>;
  filteredStadiums: string[];
  onCityChange: (value: string) => void;
  onStadiumChange: (value: string) => void;
}

const LocationFields: React.FC<LocationFieldsProps> = ({
  form,
  cities,
  filteredStadiums,
  onCityChange,
  onStadiumChange
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>المدينة</FormLabel>
            <Select 
              onValueChange={(value) => onCityChange(value)} 
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
              onValueChange={(value) => onStadiumChange(value)}
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
    </>
  );
};

export default LocationFields;
