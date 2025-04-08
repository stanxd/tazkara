
import { matchTypes, teamHomeCities } from './data';

/**
 * Utility functions for calculating pricing recommendations
 */

/**
 * Normalize team name by removing "فريق " prefix if it exists
 */
const normalizeTeamName = (name: string): string => {
  return name.startsWith('فريق ') ? name.substring(5) : name;
};

/**
 * Determine match type (derby, regular, etc.) based on participating teams
 */
export const getMatchType = (homeTeam: string, awayTeam: string): string => {
  // Normalize team names
  const normHomeTeam = normalizeTeamName(homeTeam);
  const normAwayTeam = normalizeTeamName(awayTeam);
  
  for (const matchType of matchTypes) {
    for (const teamPair of matchType.teams) {
      // Check with normalized team names
      if (
        (teamPair[0] === normHomeTeam && teamPair[1] === normAwayTeam) ||
        (teamPair[0] === normAwayTeam && teamPair[1] === normHomeTeam)
      ) {
        return matchType.type;
      }
    }
  }
  
  // Check if it's a local match (same city)
  const homeTeamCity = teamHomeCities[normHomeTeam];
  const awayTeamCity = teamHomeCities[normAwayTeam];
  if (homeTeamCity && awayTeamCity && homeTeamCity === awayTeamCity) {
    return 'محلي';
  }
  
  return 'عادي';
};

/**
 * Calculate importance level based on teams and match type
 */
export const calculateImportanceLevel = (homeTeam: string, awayTeam: string, matchType: string): 'منخفضة' | 'متوسطة' | 'عالية' => {
  // Normalize team names
  const normHomeTeam = normalizeTeamName(homeTeam);
  const normAwayTeam = normalizeTeamName(awayTeam);
  
  // Derbies and marquee matches are high importance
  if (matchType === 'ديربي' || matchType === 'قمة') {
    return 'عالية';
  }
  
  // Matches involving big teams have at least medium importance
  const bigTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'];
  if (bigTeams.includes(normHomeTeam) || bigTeams.includes(normAwayTeam)) {
    // If both teams are big teams but not a derby/marquee, still high importance
    if (bigTeams.includes(normHomeTeam) && bigTeams.includes(normAwayTeam)) {
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
  
  if (selloutScore > 1.4) {
    return 'Very High';
  } else if (selloutScore > 1.2) {
    return 'High';
  } else if (selloutScore > 1.0) {
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
  
  // Importance level notes - Fixed to match the displayed importance level correctly
  if (importanceLevel === 'عالية') {
    notes = 'مباراة ذات أهمية عالية تحظى باهتمام كبير من المشجعين. ';
  } else if (importanceLevel === 'متوسطة') {
    notes = 'مباراة ذات أهمية متوسطة مع جمهور متوقع جيد. ';
  } else {
    notes = 'مباراة ذات أهمية منخفضة. ';
  }
  
  // Demand level notes
  if (expectedDemandLevel === 'مرتفع') {
    notes += 'من المتوقع طلب مرتفع على التذاكر، ربما تنفد بسرعة. ';
    notes += 'ينصح بالتسعير في النطاق الأعلى لتعظيم العائدات مع الحفاظ على معدل حضور جيد.';
  } else if (expectedDemandLevel === 'منخفض') {
    notes += 'من المتوقع طلب منخفض على التذاكر. ';
    notes += 'ينصح بتخفيض السعر لتشجيع الحضور والحفاظ على نسبة إشغال جيدة للملعب.';
  } else {
    notes += 'من المتوقع طلب متوسط على التذاكر. ';
    notes += 'ينصح بتسعير متوازن يجمع بين تعظيم العائدات وضمان إقبال جيد من الجماهير.';
  }
  
  return notes;
};
