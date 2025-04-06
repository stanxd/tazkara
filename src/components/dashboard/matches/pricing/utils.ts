
import { matchTypes } from './data';

/**
 * Utility functions for calculating pricing recommendations
 */

/**
 * Determine match type (derby, regular, etc.) based on participating teams
 */
export const getMatchType = (homeTeam: string, awayTeam: string): string => {
  for (const matchType of matchTypes) {
    for (const teamPair of matchType.teams) {
      if (
        (teamPair[0] === homeTeam && teamPair[1] === awayTeam) ||
        (teamPair[0] === awayTeam && teamPair[1] === homeTeam)
      ) {
        return matchType.type;
      }
    }
  }
  return 'عادي';
};

/**
 * Calculate importance level based on teams and match type
 */
export const calculateImportanceLevel = (homeTeam: string, awayTeam: string, matchType: string): 'منخفضة' | 'متوسطة' | 'عالية' => {
  if (matchType === 'ديربي') {
    return 'عالية';
  } else if (matchType === 'قمة') {
    return 'عالية';
  } else if (
    ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(homeTeam) ||
    ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(awayTeam)
  ) {
    return 'متوسطة';
  } else {
    return 'منخفضة';
  }
};

/**
 * Calculate sellout probability based on factors
 */
export const calculateSelloutProbability = (importanceMultiplier: number, demandMultiplier: number): 'Low' | 'Medium' | 'High' | 'Very High' => {
  const selloutScore = importanceMultiplier * demandMultiplier * 1.2;
  
  if (selloutScore > 1.3) {
    return 'Very High';
  } else if (selloutScore > 1.1) {
    return 'High';
  } else if (selloutScore > 0.9) {
    return 'Medium';
  } else {
    return 'Low';
  }
};

/**
 * Generate notes based on match importance and demand level
 */
export const generatePricingNotes = (importanceLevel: string, expectedDemandLevel: string): string => {
  let notes = '';
  
  if (importanceLevel === 'عالية') {
    notes = 'مباراة مهمة. ';
  }
  
  if (expectedDemandLevel === 'مرتفع') {
    notes += 'الطلب مرتفع. ينصح بالتسعير في النطاق الأعلى.';
  } else if (expectedDemandLevel === 'منخفض') {
    notes += 'الطلب منخفض. ينصح بتخفيض السعر لتعزيز المبيعات.';
  } else {
    notes += 'الطلب متوسط. ينصح بالتسعير المتوازن.';
  }
  
  return notes;
};
