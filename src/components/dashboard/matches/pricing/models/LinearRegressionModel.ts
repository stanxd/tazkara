
import { LinearRegressionModelDetails } from '../types';

/**
 * Linear Regression Model for Match Ticket Pricing
 */
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

    // Calculate R-squared and MAE
    this.calculateRSquared(x, y);
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
  getModelDetails(): LinearRegressionModelDetails {
    return {
      slope: this.slope,
      intercept: this.intercept,
      rSquared: this.rSquared,
      meanAbsoluteError: this.meanAbsoluteError
    };
  }
}
