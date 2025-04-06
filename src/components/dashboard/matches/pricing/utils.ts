
import { matchTypes, teamHomeCities } from './data';

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
  
  // Check if it's a local match (same city)
  const homeTeamCity = teamHomeCities[homeTeam];
  const awayTeamCity = teamHomeCities[awayTeam];
  if (homeTeamCity && awayTeamCity && homeTeamCity === awayTeamCity) {
    return 'محلي';
  }
  
  return 'عادي';
};

/**
 * Calculate importance level based on teams and match type
 */
export const calculateImportanceLevel = (homeTeam: string, awayTeam: string, matchType: string): 'منخفضة' | 'متوسطة' | 'عالية' => {
  // Derbies and marquee matches are high importance
  if (matchType === 'ديربي' || matchType === 'قمة') {
    return 'عالية';
  }
  
  // Matches involving big teams have at least medium importance
  const bigTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'];
  if (bigTeams.includes(homeTeam) || bigTeams.includes(awayTeam)) {
    // If both teams are big teams but not a derby/marquee, still high importance
    if (bigTeams.includes(homeTeam) && bigTeams.includes(awayTeam)) {
      return 'عالية';
    }
    return 'متوسطة';
  }
  
  // Local matches have at least medium importance
  if (matchType === 'محلي') {
    return 'متوسطة';
  }
  
  return 'منخفضة';
};

/**
 * Calculate sellout probability based on factors
 */
export const calculateSelloutProbability = (importanceMultiplier: number, demandMultiplier: number): 'Low' | 'Medium' | 'High' | 'Very High' => {
  const selloutScore = importanceMultiplier * demandMultiplier;
  
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
    notes = 'مباراة ذات أهمية عالية مع اهتمام كبير من المشجعين. ';
  } else if (importanceLevel === 'متوسطة') {
    notes = 'مباراة ذات أهمية متوسطة. ';
  } else {
    notes = 'مباراة عادية. ';
  }
  
  if (expectedDemandLevel === 'مرتفع') {
    notes += 'يتوقع طلب مرتفع على التذاكر. ينصح بالتسعير في النطاق الأعلى لتعظيم العائدات.';
  } else if (expectedDemandLevel === 'منخفض') {
    notes += 'يتوقع طلب منخفض على التذاكر. ينصح بتخفيض السعر لتشجيع الحضور.';
  } else {
    notes += 'يتوقع طلب متوسط على التذاكر. ينصح بتسعير متوازن.';
  }
  
  return notes;
};
