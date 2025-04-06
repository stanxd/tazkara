import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormData } from './formTypes';
import PricingRecommendationModal from '../PricingRecommendationModal';
import { PricingModelInput } from '../pricing';

interface TicketFieldsProps {
  form: UseFormReturn<MatchFormData>;
  pricingData: Partial<PricingModelInput>;
  onSelectPrice: (price: number) => void;
}

const TicketFields: React.FC<TicketFieldsProps> = ({
  form,
  pricingData,
  onSelectPrice
}) => {
  return (
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
              onSelectPrice={onSelectPrice}
              disabled={!form.getValues('opponent') || !form.getValues('stadium')}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TicketFields;
