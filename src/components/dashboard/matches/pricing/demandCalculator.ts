
import { stadiumCapacities, teamFanBases, teamHomeCities, historicalAttendanceRates } from './data';

/**
 * Functions for calculating match demand
 */

/**
 * Normalize team name by removing "فريق " prefix if it exists
 */
const normalizeTeamName = (name: string): string => {
  return name.startsWith('فريق ') ? name.substring(5) : name;
};

/**
 * Predict expected demand based on teams and stadium
 */
export const predictDemandLevel = (
  homeTeam: string,
  awayTeam: string,
  stadium: string,
  matchType: string
): 'منخفض' | 'متوسط' | 'مرتفع' => {
  // Normalize team names
  const normHomeTeam = normalizeTeamName(homeTeam);
  const normAwayTeam = normalizeTeamName(awayTeam);
  
  console.log(`Predicting demand for: ${normHomeTeam} vs ${normAwayTeam} at ${stadium}, match type: ${matchType}`);
  
  // Get fan bases, use fallbacks if needed
  const homeTeamFanBase = teamFanBases[normHomeTeam] || teamFanBases[homeTeam] || 500000;
  const awayTeamFanBase = teamFanBases[normAwayTeam] || teamFanBases[awayTeam] || 500000;
  const stadiumCapacity = stadiumCapacities[stadium] || 20000;
  
  // Calculate base demand ratio based on combined fan bases vs stadium capacity
  const demandRatio = (homeTeamFanBase + awayTeamFanBase) / (stadiumCapacity * 50);
  
  // Factor in historical attendance rates
  const homeAttendanceRate = historicalAttendanceRates[normHomeTeam] || historicalAttendanceRates[homeTeam] || 0.75;
  const awayAttendanceRate = historicalAttendanceRates[normAwayTeam] || historicalAttendanceRates[awayTeam] || 0.75;
  const attendanceMultiplier = (homeAttendanceRate + awayAttendanceRate) / 2;
  
  // Adjust based on match type
  let matchTypeMultiplier = 1.0;
  if (matchType === 'ديربي') {
    matchTypeMultiplier = 1.5;
  } else if (matchType === 'قمة') {
    matchTypeMultiplier = 1.3;
  }
  
  // Local match adjustment (if away team is from same city, higher attendance expected)
  const homeCity = teamHomeCities[normHomeTeam] || teamHomeCities[homeTeam];
  const awayCity = teamHomeCities[normAwayTeam] || teamHomeCities[awayTeam];
  const localMatchMultiplier = (homeCity && awayCity && homeCity === awayCity) ? 1.2 : 1.0;
  
  // Calculate final demand score
  const finalDemandScore = demandRatio * matchTypeMultiplier * attendanceMultiplier * localMatchMultiplier;
  
  console.log(`Demand calculation: ratio=${demandRatio.toFixed(2)}, matchType=${matchTypeMultiplier}, attendance=${attendanceMultiplier.toFixed(2)}, local=${localMatchMultiplier}`);
  console.log(`Final demand score: ${finalDemandScore.toFixed(2)}`);
  
  // Determine demand level based on the score
  if (finalDemandScore > 2.5) {
    return 'مرتفع';
  } else if (finalDemandScore > 1.5) {
    return 'متوسط';
  } else {
    return 'منخفض';
  }
};
