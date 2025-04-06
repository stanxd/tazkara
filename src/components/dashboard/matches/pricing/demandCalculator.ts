
import { stadiumCapacities, teamFanBases, teamHomeCities, historicalAttendanceRates } from './data';

/**
 * Functions for calculating match demand
 */

/**
 * Predict expected demand based on teams and stadium
 */
export const predictDemandLevel = (
  homeTeam: string,
  awayTeam: string,
  stadium: string,
  matchType: string
): 'منخفض' | 'متوسط' | 'مرتفع' => {
  const homeTeamFanBase = teamFanBases[homeTeam] || 500000;
  const awayTeamFanBase = teamFanBases[awayTeam] || 500000;
  const stadiumCapacity = stadiumCapacities[stadium] || 20000;
  
  // Calculate base demand ratio based on combined fan bases vs stadium capacity
  const demandRatio = (homeTeamFanBase + awayTeamFanBase) / (stadiumCapacity * 50);
  
  // Factor in historical attendance rates
  const homeAttendanceRate = historicalAttendanceRates[homeTeam] || 0.75;
  const awayAttendanceRate = historicalAttendanceRates[awayTeam] || 0.75;
  const attendanceMultiplier = (homeAttendanceRate + awayAttendanceRate) / 2;
  
  // Adjust based on match type
  let matchTypeMultiplier = 1.0;
  if (matchType === 'ديربي') {
    matchTypeMultiplier = 1.5;
  } else if (matchType === 'قمة') {
    matchTypeMultiplier = 1.3;
  }
  
  // Local match adjustment (if away team is from same city, higher attendance expected)
  const homeCity = teamHomeCities[homeTeam];
  const awayCity = teamHomeCities[awayTeam];
  const localMatchMultiplier = (homeCity && awayCity && homeCity === awayCity) ? 1.2 : 1.0;
  
  // Calculate final demand score
  const finalDemandScore = demandRatio * matchTypeMultiplier * attendanceMultiplier * localMatchMultiplier;
  
  // Determine demand level based on the score
  if (finalDemandScore > 2.5) {
    return 'مرتفع';
  } else if (finalDemandScore > 1.5) {
    return 'متوسط';
  } else {
    return 'منخفض';
  }
};
