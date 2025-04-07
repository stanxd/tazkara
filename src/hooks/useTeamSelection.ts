
import { useState, useEffect } from 'react';
import { isPopularTeam } from '@/services/teams/teamPopularity';

export interface UseTeamSelectionProps {
  price: number;
  city: string;
  onOpenChange: (open: boolean) => void;
}

export const useTeamSelection = ({ price, city, onOpenChange }: UseTeamSelectionProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(price);
  
  // Calculate adjusted price based on team and city
  const calculateAdjustedPrice = (team: string): number => {
    let adjustedPrice = price;
    
    // Popular teams get 60% price increase
    if (isPopularTeam(team)) {
      adjustedPrice = Math.round(price * 1.6);
    }
    
    // Riyadh matches are more expensive
    if (city === "الرياض") {
      adjustedPrice = Math.round(adjustedPrice * 1.15);
    }
    
    return adjustedPrice;
  };
  
  // Update price when team is selected
  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setCalculatedPrice(calculateAdjustedPrice(team));
  };
  
  // Reset selection when dialog closes
  useEffect(() => {
    if (onOpenChange) {
      return () => setSelectedTeam(null);
    }
  }, [onOpenChange]);
  
  // Submit selection
  const handleSubmit = (onTeamSelect: (team: string) => void) => {
    if (selectedTeam) {
      onTeamSelect(selectedTeam);
    }
  };

  return {
    selectedTeam,
    calculatedPrice,
    handleTeamSelect,
    handleSubmit,
    calculateAdjustedPrice
  };
};
