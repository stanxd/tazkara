
import { PricingModelInput, PricingModelOutput } from './types';
import { stadiumCapacities } from './data';
import { getMatchType, calculateImportanceLevel, calculateSelloutProbability, generatePricingNotes } from './utils';
import { predictDemandLevel } from './demandCalculator';

/**
 * Calculate the recommended ticket price
 */
export const calculateRecommendedPrice = (input: PricingModelInput): PricingModelOutput => {
  // Determine base price (use provided base price or default to 85)
  const basePrice = input.basePrice || 85;
  
  // Determine match characteristics
  const matchType = getMatchType(input.homeTeam, input.awayTeam);
  const importanceLevel = calculateImportanceLevel(input.homeTeam, input.awayTeam, matchType);
  const expectedDemandLevel = predictDemandLevel(input.homeTeam, input.awayTeam, input.stadium, matchType);
  
  // Calculate multipliers according to the formula
  const importanceMultiplier = (importanceLevel === 'عالية' || matchType === 'ديربي') ? 1.2 : (importanceLevel === 'متوسطة' ? 1.1 : 1.0);
  const demandMultiplier = expectedDemandLevel === 'مرتفع' ? 1.1 : (expectedDemandLevel === 'متوسط' ? 1.0 : 0.9);
  
  // Calculate historical attendance adjustment (default to 1.0 if no data)
  let attendanceRate = 0.85; // Default assumption
  let attendanceAdjustment = 1.0;
  
  if (input.previousMatches && input.previousMatches.length > 0) {
    // Calculate average attendance from previous matches
    const totalCapacity = stadiumCapacities[input.stadium] || 20000;
    const avgAttendance = input.previousMatches.reduce((sum, match) => sum + match.attendance, 0) / input.previousMatches.length;
    attendanceRate = avgAttendance / totalCapacity;
    attendanceAdjustment = attendanceRate < 0.7 ? 0.9 : 1.0;
  }
  
  // Time adjustment (matches after 8pm get a small premium)
  const timeHour = parseInt(input.time.split(':')[0]);
  const timeMultiplier = timeHour >= 20 ? 1.05 : 1.0;
  
  // Calculate recommended price based on all factors
  let recommendedPrice = basePrice * importanceMultiplier * demandMultiplier * attendanceAdjustment * timeMultiplier;
  
  // Round to nearest 5
  recommendedPrice = Math.round(recommendedPrice / 5) * 5;
  
  // Calculate sellout probability
  const selloutProbability = calculateSelloutProbability(importanceMultiplier, demandMultiplier);
  
  // Generate notes based on factors
  const notes = generatePricingNotes(importanceLevel, expectedDemandLevel);
  
  // Calculate confidence score based on data quality
  // For now, use a simple heuristic (higher for well-known teams)
  const confidenceScore = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(input.homeTeam) ? 0.9 : 0.75;
  
  return {
    recommendedPrice,
    confidenceScore,
    selloutProbability,
    notes
  };
};
