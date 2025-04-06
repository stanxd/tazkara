
/**
 * Smart Ticket Pricing Model
 * This module calculates recommended ticket prices based on match attributes
 */

// Stadium capacity data
interface StadiumCapacity {
  [key: string]: number;
}

export const stadiumCapacities: StadiumCapacity = {
  'مملكة آرينا': 25000,
  'استاد الملك فهد الدولي': 67000,
  'مرسول بارك': 22000,
  'ملعب الشباب': 15000,
  'الجوهرة': 45000,
  'استاد الملك عبدالله': 62000,
  'ملعب أبها': 12000,
  'استاد الأمير سلطان': 25000
};

// Team fan base estimates (approximate numbers for calculation purposes)
interface TeamFanBase {
  [key: string]: number;
}

export const teamFanBases: TeamFanBase = {
  'الهلال': 1200000,
  'النصر': 1000000,
  'الأهلي': 800000,
  'الاتحاد': 850000,
  'الشباب': 600000
};

// Match type categories
export const matchTypes = [
  { type: 'ديربي', teams: [['الهلال', 'النصر'], ['الأهلي', 'الاتحاد']] },
  { type: 'قمة', teams: [['الهلال', 'الأهلي'], ['الهلال', 'الاتحاد'], ['النصر', 'الأهلي'], ['النصر', 'الاتحاد']] }
];

// Input data structure for pricing model
export interface PricingModelInput {
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  day?: string;
  time: string;
  basePrice?: number;
  previousMatches?: {
    attendance: number;
    ticketPrice: number;
  }[];
}

// Output data structure from pricing model
export interface PricingModelOutput {
  recommendedPrice: number;
  confidenceScore: number;
  selloutProbability: 'Low' | 'Medium' | 'High' | 'Very High';
  notes: string;
}

/**
 * Determine match type (derby, regular, etc.) based on participating teams
 */
const getMatchType = (homeTeam: string, awayTeam: string): string => {
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
const calculateImportanceLevel = (homeTeam: string, awayTeam: string, matchType: string): 'منخفضة' | 'متوسطة' | 'عالية' => {
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
 * Predict expected demand based on teams and stadium
 */
const predictDemandLevel = (
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
  let selloutProbability: 'Low' | 'Medium' | 'High' | 'Very High';
  const selloutScore = importanceMultiplier * demandMultiplier * 1.2;
  
  if (selloutScore > 1.3) {
    selloutProbability = 'Very High';
  } else if (selloutScore > 1.1) {
    selloutProbability = 'High';
  } else if (selloutScore > 0.9) {
    selloutProbability = 'Medium';
  } else {
    selloutProbability = 'Low';
  }
  
  // Generate notes based on factors
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
