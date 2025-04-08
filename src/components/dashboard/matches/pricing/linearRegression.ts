/**
 * Linear Regression Model for Match Ticket Pricing
 */
import { RealMatchData } from './types';
import { realMatchData } from './data';

// Simple linear regression implementation
export class LinearRegression {
  private xMean = 0;
  private yMean = 0;
  private slope = 0;
  private intercept = 0;
  private rSquared = 0;
  private meanAbsoluteError = 0;

  /**
   * Fit the linear regression model to the provided data points
   */
  fit(x: number[], y: number[]): void {
    if (x.length !== y.length || x.length === 0) {
      throw new Error('Data arrays must have the same non-zero length');
    }

    // Calculate means
    this.xMean = x.reduce((sum, val) => sum + val, 0) / x.length;
    this.yMean = y.reduce((sum, val) => sum + val, 0) / y.length;

    // Calculate the slope (β1)
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < x.length; i++) {
      numerator += (x[i] - this.xMean) * (y[i] - this.yMean);
      denominator += Math.pow(x[i] - this.xMean, 2);
    }
    
    this.slope = denominator !== 0 ? numerator / denominator : 0;
    
    // Calculate the y-intercept (β0)
    this.intercept = this.yMean - this.slope * this.xMean;

    // Guard against negative intercept if it would cause too many negative predictions
    if (this.intercept < 0 && this.slope < Math.abs(this.intercept) / this.xMean) {
      // Adjust the intercept to be slightly positive to avoid negative predictions
      this.intercept = 5;
      // Recalculate slope with new intercept
      numerator = 0;
      for (let i = 0; i < x.length; i++) {
        numerator += (x[i] - this.xMean) * (y[i] - (this.intercept + this.slope * x[i]));
      }
      this.slope = denominator !== 0 ? numerator / denominator : 0;
    }

    // Calculate R-squared (coefficient of determination)
    this.calculateRSquared(x, y);

    // Calculate Mean Absolute Error
    this.calculateMAE(x, y);

    console.log(`Linear regression model trained. Intercept: ${this.intercept}, Slope: ${this.slope}, R²: ${this.rSquared}, MAE: ${this.meanAbsoluteError}`);
  }

  /**
   * Calculate the coefficient of determination (R²)
   */
  private calculateRSquared(x: number[], y: number[]): void {
    // Calculate total sum of squares (SST) and residual sum of squares (SSR)
    let sst = 0;
    let ssr = 0;
    
    for (let i = 0; i < y.length; i++) {
      const prediction = this.predict(x[i]);
      sst += Math.pow(y[i] - this.yMean, 2);
      ssr += Math.pow(y[i] - prediction, 2);
    }
    
    // Calculate R-squared: 1 - (SSR / SST)
    this.rSquared = sst !== 0 ? 1 - (ssr / sst) : 0;
  }

  /**
   * Calculate Mean Absolute Error
   */
  private calculateMAE(x: number[], y: number[]): void {
    let totalError = 0;
    for (let i = 0; i < x.length; i++) {
      const prediction = this.predict(x[i]);
      totalError += Math.abs(y[i] - prediction);
    }
    this.meanAbsoluteError = totalError / x.length;
  }

  /**
   * Predict y value for a given x input
   */
  predict(x: number): number {
    // Basic prediction using the linear formula
    const prediction = this.intercept + this.slope * x;
    
    // Ensure prediction is positive
    return Math.max(0, prediction);
  }

  /**
   * Get the model parameters and statistics
   */
  getModelDetails() {
    return {
      slope: this.slope,
      intercept: this.intercept,
      rSquared: this.rSquared,
      meanAbsoluteError: this.meanAbsoluteError
    };
  }
}

/**
 * Extract features from match data for the regression model
 */
export const extractFeatures = (
  matchData: {
    homeTeam: string;
    awayTeam: string;
    city: string;
    stadium: string;
    day?: string;
    time: string;
  },
  historicalData?: {
    importanceLevel: string;
    demandLevel: string;
    attendance: number;
    price: number;
    sellout: boolean;
  }[]
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
    (matchData.homeTeam === 'الأهلي' && matchData.awayTeam === 'ال��تحاد') ||
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
}

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
 * Extract features from real match data
 */
const extractFeaturesFromRealData = (matchData: RealMatchData): number => {
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
    'مدينة الملك عبد الله الرياضية': 62000,
    'المملكة أرينا': 25000,
    'المملكة ارينا': 25000,
  };
  
  return capacities[stadiumName] || 25000;
};

/**
 * Generate synthetic training data based on known patterns
 * This is used as a fallback when no real data is available
 */
const generateSyntheticTrainingData = (): { features: number[]; prices: number[] } => {
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
