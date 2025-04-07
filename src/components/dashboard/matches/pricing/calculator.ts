
import { PricingModelInput, PricingModelOutput } from './types';
import { stadiumCapacities, teamFanBases, teamHomeCities, historicalAttendanceRates } from './data';
import { getMatchType, calculateImportanceLevel, calculateSelloutProbability, generatePricingNotes } from './utils';
import { predictDemandLevel } from './demandCalculator';

/**
 * Calculate the recommended ticket price
 */
export const calculateRecommendedPrice = (input: PricingModelInput): PricingModelOutput => {
  // Determine base price based on team categories
  const bigTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'];
  const mediumTeams = ['الشباب', 'الاتفاق', 'الفيصلي'];
  
  // Set base price range based on teams
  let basePrice = 45; // Default base price for regular teams (35-55)
  
  if (bigTeams.includes(input.homeTeam) || bigTeams.includes(input.awayTeam)) {
    // For big teams, higher base price (100-150)
    basePrice = 100;
  } else if (mediumTeams.includes(input.homeTeam) || mediumTeams.includes(input.awayTeam)) {
    // For medium tier teams
    basePrice = 60;
  }
  
  // Determine match characteristics
  const matchType = getMatchType(input.homeTeam, input.awayTeam);
  const importanceLevel = calculateImportanceLevel(input.homeTeam, input.awayTeam, matchType);
  const expectedDemandLevel = predictDemandLevel(input.homeTeam, input.awayTeam, input.stadium, matchType);
  
  // Calculate importance multiplier
  const importanceMultiplier = (importanceLevel === 'عالية' || matchType === 'ديربي') ? 1.25 : 
                               (importanceLevel === 'متوسطة' ? 1.15 : 1.0);
  
  // Calculate demand multiplier based on expected demand
  const demandMultiplier = expectedDemandLevel === 'مرتفع' ? 1.25 : 
                          (expectedDemandLevel === 'متوسط' ? 1.1 : 0.9);
  
  // Stadium capacity adjustment (smaller stadiums can command higher prices due to scarcity)
  const stadiumCapacity = stadiumCapacities[input.stadium] || 25000;
  const capacityMultiplier = 1 + (0.15 * (1 - (stadiumCapacity / 60000)));
  
  // Calculate historical attendance adjustment
  let attendanceRate = historicalAttendanceRates[input.homeTeam] || 0.8;
  let attendanceAdjustment = 1.0;
  
  if (input.previousMatches && input.previousMatches.length > 0) {
    // Calculate average attendance from previous matches
    const totalCapacity = stadiumCapacities[input.stadium] || 25000;
    const avgAttendance = input.previousMatches.reduce((sum, match) => sum + match.attendance, 0) / input.previousMatches.length;
    attendanceRate = avgAttendance / totalCapacity;
    attendanceAdjustment = attendanceRate < 0.7 ? 0.95 : (attendanceRate > 0.9 ? 1.15 : 1.0);
  }
  
  // Time adjustment (weekend and prime-time matches get a premium)
  const timeHour = parseInt(input.time.split(':')[0]);
  const isWeekend = input.day === 'الجمعة' || input.day === 'السبت';
  const timeMultiplier = (timeHour >= 19 && timeHour <= 21) ? 1.15 : 
                         (timeHour >= 16 && timeHour < 19) ? 1.05 : 1.0;
  const dayMultiplier = isWeekend ? 1.1 : 1.0;
  
  // City adjustment (matches in major cities can be priced higher)
  const cityMultiplier = (input.city === 'الرياض' || input.city === 'جدة') ? 1.08 : 1.0;
  
  // Local derby adjustment (derbies in the same city have higher demand)
  const homeTeamCity = teamHomeCities[input.homeTeam];
  const awayTeamCity = teamHomeCities[input.awayTeam];
  const localDerbyMultiplier = (matchType === 'ديربي' && homeTeamCity === awayTeamCity) ? 1.15 : 1.0;
  
  // Season timing adjustment (mid-season and end-season matches often command higher prices)
  // For now we'll use a default value, but this could be extended with more data
  const seasonTimingMultiplier = 1.0;
  
  // Calculate recommended price based on all factors
  let recommendedPrice = basePrice * 
                       importanceMultiplier * 
                       demandMultiplier * 
                       capacityMultiplier * 
                       attendanceAdjustment * 
                       timeMultiplier * 
                       dayMultiplier * 
                       cityMultiplier *
                       localDerbyMultiplier *
                       seasonTimingMultiplier;
  
  // Round to nearest 5
  recommendedPrice = Math.round(recommendedPrice / 5) * 5;
  
  // Add a randomization factor to make it seem more "intelligent" and varied
  // +/- 5-10 SAR based on various teams
  const teamFactor = (input.homeTeam.length + input.awayTeam.length) % 3;
  recommendedPrice += (teamFactor === 0 ? 5 : teamFactor === 1 ? 0 : -5);
  
  // Calculate sellout probability
  const selloutProbability = calculateSelloutProbability(importanceMultiplier, demandMultiplier);
  
  // Generate notes based on factors
  const notes = generatePricingNotes(importanceLevel, expectedDemandLevel);
  
  // Calculate confidence score based on data quality and match characteristics
  const confidenceScore = calculateConfidenceScore(input, matchType, attendanceRate);
  
  return {
    recommendedPrice,
    confidenceScore,
    selloutProbability,
    notes
  };
};

/**
 * Calculate confidence score for the pricing recommendation
 */
const calculateConfidenceScore = (
  input: PricingModelInput, 
  matchType: string, 
  attendanceRate: number
): number => {
  // Base confidence starts at 0.7
  let confidenceScore = 0.7;
  
  // Major teams have more predictable pricing
  if (['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(input.homeTeam)) {
    confidenceScore += 0.1;
  }
  
  // More confident about derbies and major matches
  if (matchType === 'ديربي' || matchType === 'قمة') {
    confidenceScore += 0.1;
  }
  
  // More confident with historical data
  if (input.previousMatches && input.previousMatches.length > 0) {
    confidenceScore += 0.05;
  }
  
  // More confident with consistent attendance rates
  if (attendanceRate > 0.8) {
    confidenceScore += 0.05;
  }
  
  // City factor - more predictable in major cities
  if (input.city === 'الرياض' || input.city === 'جدة') {
    confidenceScore += 0.03;
  }
  
  // Cap at 0.95
  return Math.min(confidenceScore, 0.95);
};
