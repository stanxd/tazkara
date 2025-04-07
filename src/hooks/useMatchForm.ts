
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MatchFormData, matchFormSchema } from '@/components/dashboard/matches/form/formTypes';
import { PricingModelInput } from '@/components/dashboard/matches/pricing';

interface UseMatchFormProps {
  onSubmit: (data: MatchFormData) => void;
  currentTeam?: string;
  stadiums: Record<string, string[]>;
}

export const useMatchForm = ({ onSubmit, currentTeam = '', stadiums }: UseMatchFormProps) => {
  const [citySelection, setCitySelection] = useState('الرياض');
  const [filteredStadiums, setFilteredStadiums] = useState(stadiums['الرياض']);
  const [pricingData, setPricingData] = useState<Partial<PricingModelInput>>({});

  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: {
      opponent: 'فريق الأهلي', // Default to Al-Ahli instead of blank
      city: 'الرياض',
      stadium: '',
      date: '',
      time: '20:00',
      availableTickets: undefined,
      ticketPrice: undefined,
      giftTickets: 0,
    },
  });

  // Update pricing data helper
  const updatePricingData = (newData: Partial<PricingModelInput>) => {
    setPricingData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

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
  
  const handleSetRecommendedPrice = (price: number) => {
    form.setValue('ticketPrice', price);
  };

  const handleFormSubmit = (data: MatchFormData) => {
    onSubmit(data);
    form.reset({
      opponent: 'فريق الأهلي', // Reset to Al-Ahli after submission
      city: 'الرياض',
      stadium: '',
      date: '',
      time: '20:00',
      availableTickets: undefined,
      ticketPrice: undefined,
      giftTickets: 0,
    });
  };

  // Set home team when component mounts
  useEffect(() => {
    if (currentTeam) {
      updatePricingData({ homeTeam: currentTeam });
    }
  }, [currentTeam]);

  return {
    form,
    filteredStadiums,
    pricingData,
    handleCityChange,
    handleOpponentChange,
    handleStadiumChange,
    handleTimeChange,
    handleSetRecommendedPrice,
    handleFormSubmit
  };
};
