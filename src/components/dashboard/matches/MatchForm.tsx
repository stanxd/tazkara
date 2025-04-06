
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { MatchFormData } from './form/formTypes';
import OpponentField from './form/OpponentField';
import LocationFields from './form/LocationFields';
import DateTimeFields from './form/DateTimeFields';
import TicketFields from './form/TicketFields';
import { useMatchForm } from '@/hooks/useMatchForm';

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
  const {
    form,
    filteredStadiums,
    pricingData,
    handleCityChange,
    handleOpponentChange,
    handleStadiumChange,
    handleTimeChange,
    handleSetRecommendedPrice,
    handleFormSubmit
  } = useMatchForm({
    onSubmit,
    currentTeam,
    stadiums
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <OpponentField 
          form={form} 
          opponentTeams={opponentTeams} 
          onOpponentChange={handleOpponentChange} 
        />
        
        <LocationFields 
          form={form} 
          cities={cities}
          stadiums={stadiums}
          filteredStadiums={filteredStadiums}
          onCityChange={handleCityChange}
          onStadiumChange={handleStadiumChange}
        />
        
        <DateTimeFields 
          form={form}
          onTimeChange={handleTimeChange}
        />
        
        <TicketFields 
          form={form}
          pricingData={pricingData}
          onSelectPrice={handleSetRecommendedPrice}
        />
        
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
