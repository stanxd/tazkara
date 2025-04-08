
import { PricingModelInput, PricingModelOutput } from './types';
import { stadiumCapacities, teamFanBases, teamHomeCities, historicalAttendanceRates, realMatchData } from './data';
import { getMatchType, calculateImportanceLevel, calculateSelloutProbability, generatePricingNotes } from './utils';
import { predictDemandLevel } from './demandCalculator';
import { LinearRegression, extractFeatures, generateTrainingData } from './linearRegression';

// Initialize and train the linear regression model with real data
const initializeRegressionModel = (): LinearRegression => {
  const model = new LinearRegression();
  const { features, prices } = generateTrainingData();
  model.fit(features, prices);
  return model;
};

// Create a singleton instance of the regression model
const regressionModel = initializeRegressionModel();
console.log('Regression model initialized:', regressionModel.getModelDetails());

/**
 * Calculate the recommended ticket price
 */
export const calculateRecommendedPrice = (input: PricingModelInput): PricingModelOutput => {
  // Determine match characteristics
  const matchType = getMatchType(input.homeTeam, input.awayTeam);
  const importanceLevel = calculateImportanceLevel(input.homeTeam, input.awayTeam, matchType);
  const expectedDemandLevel = predictDemandLevel(input.homeTeam, input.awayTeam, input.stadium, matchType);
  
  // Extract features for regression model
  const features = extractFeatures(input);
  
  // Get price prediction from regression model
  let recommendedPrice = regressionModel.predict(features[0]);
  
  // Apply traditional factors as adjustment coefficients
  
  // Calculate importance multiplier
  const importanceMultiplier = (importanceLevel === 'عالية' || matchType === 'ديربي') ? 1.15 : 
                               (importanceLevel === 'متوسطة' ? 1.08 : 1.0);
  
  // Calculate demand multiplier based on expected demand
  const demandMultiplier = expectedDemandLevel === 'مرتفع' ? 1.15 : 
                          (expectedDemandLevel === 'متوسط' ? 1.05 : 0.95);
  
  // Stadium capacity adjustment (smaller stadiums can command higher prices due to scarcity)
  const stadiumCapacity = stadiumCapacities[input.stadium] || 25000;
  const capacityMultiplier = 1 + (0.10 * (1 - (stadiumCapacity / 60000)));
  
  // Calculate historical attendance adjustment
  let attendanceRate = historicalAttendanceRates[input.homeTeam] || 0.8;
  let attendanceAdjustment = 1.0;
  
  if (input.previousMatches && input.previousMatches.length > 0) {
    // Calculate average attendance from previous matches
    const totalCapacity = stadiumCapacities[input.stadium] || 25000;
    const avgAttendance = input.previousMatches.reduce((sum, match) => sum + match.attendance, 0) / input.previousMatches.length;
    attendanceRate = avgAttendance / totalCapacity;
    attendanceAdjustment = attendanceRate < 0.7 ? 0.95 : (attendanceRate > 0.9 ? 1.10 : 1.0);
  }
  
  // Apply adjustment multipliers to the regression model prediction
  recommendedPrice *= importanceMultiplier * demandMultiplier * capacityMultiplier * attendanceAdjustment;
  
  // Round to nearest 5
  recommendedPrice = Math.round(recommendedPrice / 5) * 5;
  
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
  
  // Major teams have more predictable pricing
  if (['الهلال', 'النصر', 'الأهلي', 'الاتحاد'].includes(input.homeTeam)) {
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
