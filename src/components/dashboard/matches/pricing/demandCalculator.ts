
import { stadiumCapacities, teamFanBases } from './data';

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
  
  // Calculate a demand ratio based on combined fan bases vs stadium capacity
  const demandRatio = (homeTeamFanBase + awayTeamFanBase) / (stadiumCapacity * 50);
  
  // Adjust based on match type
  let demandMultiplier = 1.0;
  if (matchType === 'ديربي') {
    demandMultiplier = 1.5;
  } else if (matchType === 'قمة') {
    demandMultiplier = 1.3;
  }
  
  const finalDemandScore = demandRatio * demandMultiplier;
  
  if (finalDemandScore > 2.5) {
    return 'مرتفع';
  } else if (finalDemandScore > 1.5) {
    return 'متوسط';
  } else {
    return 'منخفض';
  }
};
