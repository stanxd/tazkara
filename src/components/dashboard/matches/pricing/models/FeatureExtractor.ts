
import { PricingModelInput, RealMatchData } from '../types';

/**
 * Extract features from match data for the regression model
 */
export const extractFeatures = (
  matchData: PricingModelInput
): number[] => {
  // Calculate basic feature value
  const bigTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'];
  const mediumTeams = ['الشباب', 'الاتفاق', 'الفيصلي'];
  
  // Team importance feature (0-2)
  let teamFeature = 0;
  if (bigTeams.includes(matchData.homeTeam) || bigTeams.includes(matchData.awayTeam)) {
    teamFeature = 2;
  } else if (mediumTeams.includes(matchData.homeTeam) || mediumTeams.includes(matchData.awayTeam)) {
    teamFeature = 1;
  }
  
  // City importance feature (0-1)
  const cityFeature = (matchData.city === 'الرياض' || matchData.city === 'جدة') ? 1 : 0;
  
  // Time feature (0-1)
  const timeHour = parseInt(matchData.time.split(':')[0]);
  const timeFeature = (timeHour >= 18 && timeHour <= 21) ? 1 : 0;
  
  // Day feature (0-1)
  const weekendDays = ['الجمعة', 'السبت'];
  const dayFeature = matchData.day && weekendDays.includes(matchData.day) ? 1 : 0;
  
  // Derby feature (0-1)
  const isDerby = (
    (matchData.homeTeam === 'الهلال' && matchData.awayTeam === 'النصر') ||
    (matchData.homeTeam === 'النصر' && matchData.awayTeam === 'الهلال') ||
    (matchData.homeTeam === 'الأهلي' && matchData.awayTeam === 'الاتحاد') ||
    (matchData.homeTeam === 'الاتحاد' && matchData.awayTeam === 'الأهلي')
  ) ? 1 : 0;
  
  // Combined feature value (weighted sum)
  const combinedFeature = 
    2.5 * teamFeature + 
    1.2 * cityFeature + 
    0.8 * timeFeature + 
    0.7 * dayFeature + 
    3.0 * isDerby;
  
  return [combinedFeature];
};

/**
 * Extract features from real match data
 */
export const extractFeaturesFromRealData = (matchData: RealMatchData): number => {
  const bigTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد'];
  const mediumTeams = ['الشباب', 'الاتفاق', 'الفيصلي', 'التعاون'];
  
  // Team importance feature (0-2)
  let teamFeature = 0;
  if (bigTeams.includes(matchData.homeTeam) || bigTeams.includes(matchData.awayTeam)) {
    teamFeature = 2;
  } else if (mediumTeams.includes(matchData.homeTeam) || mediumTeams.includes(matchData.awayTeam)) {
    teamFeature = 1;
  }
  
  // City importance feature (0-1)
  const cityFeature = (matchData.city === 'الرياض' || matchData.city === 'جدة') ? 1 : 0;
  
  // Opponent ranking feature (0-2)
  const opponentRankingFeature = 
    matchData.opponentRanking === 'منافس' ? 2 : 
    matchData.opponentRanking === 'متوسط' ? 1 : 0;
  
  // Match importance feature (0-1)
  const importanceFeature = matchData.importance === 'ديربي' ? 1 : 0;
  
  // Attendance rate feature (0-1)
  // Get stadium capacity from the stadium name
  const stadiumCapacity = getStadiumCapacity(matchData.stadium);
  const attendanceRateFeature = stadiumCapacity > 0 ? 
    Math.min(matchData.attendance / stadiumCapacity, 1) : 0.5;
  
  // Combined feature value (weighted sum)
  const combinedFeature = 
    2.5 * teamFeature + 
    1.2 * cityFeature + 
    2.0 * opponentRankingFeature + 
    3.0 * importanceFeature +
    1.5 * attendanceRateFeature;
  
  return combinedFeature;
};

/**
 * Get stadium capacity from stadium name
 */
const getStadiumCapacity = (stadiumName: string): number => {
  const capacities: Record<string, number> = {
    'الأول بارك': 30000,
    'استاد الملك عبدالله': 62000,
    'المملكة أرينا': 25000,
  };
  
  return capacities[stadiumName] || 25000;
};
