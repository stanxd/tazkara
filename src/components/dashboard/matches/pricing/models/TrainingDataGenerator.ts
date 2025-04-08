
import { RealMatchData } from '../types';
import { extractFeaturesFromRealData } from './FeatureExtractor';
import { realMatchData } from '../data';

/**
 * Generate training data based on real historical match data
 */
export const generateTrainingData = (): { features: number[]; prices: number[] } => {
  // Check if we have real match data available
  if (realMatchData && realMatchData.length > 0) {
    console.log(`Using ${realMatchData.length} real match data records for training`);
    
    const features: number[] = [];
    const prices: number[] = [];
    
    // Process each real match data entry
    realMatchData.forEach(match => {
      try {
        // Extract features from real match data
        const feature = extractFeaturesFromRealData(match);
        features.push(feature);
        
        // Add price to prices array
        prices.push(match.ticketPrice);
        
        console.log(`Processed match: ${match.homeTeam} vs ${match.awayTeam}, Price: ${match.ticketPrice}, Feature value: ${feature}`);
      } catch (error) {
        console.error(`Error processing match data: ${match.homeTeam} vs ${match.awayTeam}`, error);
      }
    });
    
    return { features, prices };
  } else {
    console.log('No real match data available. Using synthetic data.');
    return generateSyntheticTrainingData();
  }
};

/**
 * Generate synthetic training data based on known patterns
 * This is used as a fallback when no real data is available
 */
export const generateSyntheticTrainingData = (): { features: number[]; prices: number[] } => {
  const features: number[] = [];
  const prices: number[] = [];
  
  // Low importance matches (small teams, weekdays)
  for (let i = 0; i < 5; i++) {
    features.push(1 + Math.random() * 2); // Feature value around 1-3
    prices.push(30 + Math.random() * 20); // Prices around 30-50 SAR
  }
  
  // Medium importance matches (medium teams or good time slots)
  for (let i = 0; i < 7; i++) {
    features.push(3 + Math.random() * 3); // Feature value around 3-6
    prices.push(50 + Math.random() * 30); // Prices around 50-80 SAR
  }
  
  // High importance matches (big teams, good locations)
  for (let i = 0; i < 5; i++) {
    features.push(6 + Math.random() * 2.5); // Feature value around 6-8.5
    prices.push(80 + Math.random() * 40); // Prices around 80-120 SAR
  }
  
  // Derby and special matches (highest importance)
  for (let i = 0; i < 3; i++) {
    features.push(8.5 + Math.random() * 1.5); // Feature value around 8.5-10
    prices.push(120 + Math.random() * 60); // Prices around 120-180 SAR
  }
  
  return { features, prices };
};
