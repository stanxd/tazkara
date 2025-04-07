
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { MatchFormData } from './formTypes';
import PricingRecommendationModal from '../PricingRecommendationModal';
import { PricingModelInput } from '../pricing';
import { Brain, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [showGiftField, setShowGiftField] = useState(false);

  return (
    <>
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

      <div className="mt-2">
        {!showGiftField ? (
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowGiftField(true)}
            className="w-full"
          >
            <Gift className="ml-2 h-4 w-4 text-tazkara-green" />
            إضافة تذاكر كهدايا
          </Button>
        ) : (
          <FormField
            control={form.control}
            name="giftTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد تذاكر الهدايا</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max={form.getValues('availableTickets')} 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
};

export default TicketFields;
