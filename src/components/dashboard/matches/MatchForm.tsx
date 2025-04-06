
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PricingModelInput } from './pricingModel';

import { matchFormSchema, MatchFormData } from './form/formTypes';
import OpponentField from './form/OpponentField';
import LocationFields from './form/LocationFields';
import DateTimeFields from './form/DateTimeFields';
import TicketFields from './form/TicketFields';

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
    resolver: zodResolver(matchFormSchema),
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
