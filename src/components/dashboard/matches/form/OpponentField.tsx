
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormData } from './formTypes';

interface OpponentFieldProps {
  form: UseFormReturn<MatchFormData>;
  opponentTeams: string[];
  onOpponentChange: (value: string) => void;
}

const OpponentField: React.FC<OpponentFieldProps> = ({
  form,
  opponentTeams,
  onOpponentChange
}) => {
  return (
    <FormField
      control={form.control}
      name="opponent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الفريق المنافس</FormLabel>
          <Select 
            onValueChange={(value) => onOpponentChange(value)}
            defaultValue="فريق الأهلي" // Default to Al-Ahli
            value={field.value}
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
  );
};

export default OpponentField;
