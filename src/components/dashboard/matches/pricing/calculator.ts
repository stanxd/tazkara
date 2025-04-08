import { PricingModelInput, PricingModelOutput } from './types';
import { stadiumCapacities, teamFanBases, teamHomeCities, historicalAttendanceRates, realMatchData } from './data';
import { getMatchType, calculateImportanceLevel, calculateSelloutProbability, generatePricingNotes } from './utils';
import { predictDemandLevel } from './demandCalculator';
import { LinearRegression } from './models';
import { extractFeatures, generateTrainingData } from './models';

// Initialize and train the linear regression model with real data
const initializeRegressionModel = (): LinearRegression => {
  const model = new LinearRegression();
  const { features, prices } = generateTrainingData();
  
  console.log('Training regression model with data:', { features, prices });
  
  // Ensure features are formatted correctly as number[][]
  const formattedFeatures = features.map(feature => {
    // If feature is already an array, return it
    if (Array.isArray(feature)) return feature;
    // Otherwise, wrap it in an array to match the expected format
    return [feature];
  });
  
  model.fit(formattedFeatures, prices);
  return model;
};

// Create a singleton instance of the regression model
const regressionModel = initializeRegressionModel();
console.log('Regression model initialized:', regressionModel.getModelDetails());

// Constants for price limits - using a lower minimum to allow more variation
const MIN_TICKET_PRICE = 15; // Reduced minimum ticket price in SAR

/**
 * Calculate the recommended ticket price
 */
export const calculateRecommendedPrice = (input: PricingModelInput): PricingModelOutput => {
  // Normalize team names by removing "فريق " prefix if it exists
  const normalizeTeamName = (name: string): string => {
    return name.startsWith('فريق ') ? name.substring(5) : name;
  };

  const homeTeam = normalizeTeamName(input.homeTeam);
  const awayTeam = normalizeTeamName(input.awayTeam);
  
  console.log(`Calculating price for match: ${homeTeam} vs ${awayTeam} at ${input.stadium}, ${input.city}`);
  
  // Determine match characteristics
  const matchType = getMatchType(homeTeam, awayTeam);
  const importanceLevel = calculateImportanceLevel(homeTeam, awayTeam, matchType);
  const expectedDemandLevel = predictDemandLevel(homeTeam, awayTeam, input.stadium, matchType);
  
  console.log(`Match characteristics: type=${matchType}, importance=${importanceLevel}, demand=${expectedDemandLevel}`);
  
  // Extract features for regression model
  const features = extractFeatures(input);
  
  // Get price prediction from regression model
  // If features[0] is a number, wrap it in an array
  const featureForPrediction = Array.isArray(features[0]) ? features[0][0] : features[0];
  let recommendedPrice = regressionModel.predict([featureForPrediction]);
  
  console.log(`Base price from regression model: ${recommendedPrice}`);
  
  // Apply traditional factors as adjustment coefficients
  
  // Calculate importance multiplier
  const importanceMultiplier = (importanceLevel === 'عالية' || matchType === 'ديربي') ? 1.25 : 
                               (importanceLevel === 'متوسطة' ? 1.1 : 0.9);
  
  // Calculate demand multiplier based on expected demand - made more impactful
  const demandMultiplier = expectedDemandLevel === 'مرتفع' ? 1.25 : 
                          (expectedDemandLevel === 'متوسط' ? 1.05 : 0.85);
  
  // Stadium capacity adjustment (smaller stadiums can command higher prices due to scarcity)
  const stadiumCapacity = stadiumCapacities[input.stadium] || 25000;
  const capacityMultiplier = 1 + (0.15 * (1 - (stadiumCapacity / 60000)));
  
  // Calculate historical attendance adjustment
  let attendanceRate = historicalAttendanceRates[homeTeam] || 0.8;
  let attendanceAdjustment = 1.0;
  
  if (input.previousMatches && input.previousMatches.length > 0) {
    // Calculate average attendance from previous matches
    const totalCapacity = stadiumCapacities[input.stadium] || 25000;
    const avgAttendance = input.previousMatches.reduce((sum, match) => sum + match.attendance, 0) / input.previousMatches.length;
    attendanceRate = avgAttendance / totalCapacity;
    attendanceAdjustment = attendanceRate < 0.7 ? 0.9 : (attendanceRate > 0.9 ? 1.15 : 1.0);
  }
  
  // Log multipliers before applying
  console.log(`Price adjustment multipliers: importance=${importanceMultiplier}, demand=${demandMultiplier}, capacity=${capacityMultiplier}, attendance=${attendanceAdjustment}`);
  
  // Apply adjustment multipliers to the regression model prediction
  recommendedPrice *= importanceMultiplier * demandMultiplier * capacityMultiplier * attendanceAdjustment;
  
  console.log(`Price after applying multipliers: ${recommendedPrice}`);
  
  // If regression model returns too low a price, apply base pricing model
  if (recommendedPrice < 30) {
    // Base prices by team tier and match importance
    const basePriceByImportance = {
      'عالية': 150,
      'متوسطة': 80,
      'منخفضة': 40
    };
    
    // Get base price from importance level
    const basePrice = basePriceByImportance[importanceLevel as keyof typeof basePriceByImportance];
    
    // Apply same multipliers to base price
    const adjustedBasePrice = basePrice * demandMultiplier * capacityMultiplier * attendanceAdjustment;
    
    console.log(`Using base pricing model: importance=${importanceLevel}, basePrice=${basePrice}, adjusted=${adjustedBasePrice}`);
    
    // Blend regression result with base price model with higher weight to base price
    recommendedPrice = (adjustedBasePrice * 0.7) + (recommendedPrice * 0.3);
    console.log(`Blended price: ${recommendedPrice}`);
  }
  
  // Ensure the price is at least the minimum ticket price
  recommendedPrice = Math.max(recommendedPrice, MIN_TICKET_PRICE);
  
  // Round to nearest 5
  recommendedPrice = Math.round(recommendedPrice / 5) * 5;
  console.log(`Final recommended price: ${recommendedPrice}`);
  
  // Calculate sellout probability
  const selloutProbability = calculateSelloutProbability(importanceMultiplier, demandMultiplier);
  
  // Generate notes based on factors
  let notes = generatePricingNotes(importanceLevel, expectedDemandLevel);
  
  // Add model information to notes
  const modelDetails = regressionModel.getModelDetails();
  
  // Add data source information to notes
  notes += `\n\nالتوصية تستند إلى نموذج الانحدار الخطي (دقة النموذج: ${Math.round(modelDetails.rSquared * 100)}%).`;
  if (realMatchData && realMatchData.length > 0) {
    notes += `\nتم تدريب النموذج على بيانات ${realMatchData.length} مباراة حقيقية.`;
  }
  
  // Calculate confidence score based on data quality and match characteristics
  const confidenceScore = calculateConfidenceScore(input, matchType, attendanceRate, modelDetails.rSquared);
  
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
  attendanceRate: number,
  modelAccuracy: number
): number => {
  // Base confidence starts at 0.6
  let confidenceScore = 0.6;
  
  // Normalize team names
  const normalizeTeamName = (name: string): string => {
    return name.startsWith('فريق ') ? name.substring(5) : name;
  };

  const homeTeam = normalizeTeamName(input.homeTeam);
  const awayTeam = normalizeTeamName(input.awayTeam);
  
  // Major teams have more predictable pricing
  if (['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(homeTeam)) {
    confidenceScore += 0.08;
  }
  
  // More confident about derbies and major matches
  if (matchType === 'ديربي' || matchType === 'قمة') {
    confidenceScore += 0.08;
  }
  
  // More confident with historical data
  if (input.previousMatches && input.previousMatches.length > 0) {
    confidenceScore += 0.05;
  }
  
  // More confident with consistent attendance rates
  if (attendanceRate > 0.8) {
    confidenceScore += 0.04;
  }
  
  // Factor in regression model accuracy
  confidenceScore += (modelAccuracy * 0.15);
  
  // Add bonus for using real data
  if (realMatchData && realMatchData.length > 0) {
    confidenceScore += 0.05;
  }
  
  // Cap at 0.95
  return Math.min(confidenceScore, 0.95);
};
