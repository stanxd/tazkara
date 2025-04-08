
/**
 * Linear Regression Model for price prediction
 */

// Model types
interface LinearRegressionModelDetails {
  coefficients: number[];
  intercept: number;
  rSquared: number;
  mse: number;
  meanAbsoluteError: number;
}

export class LinearRegression {
  private coefficients: number[] = [];
  private intercept: number = 0;
  private rSquared: number = 0;
  private mse: number = 0;
  private meanAbsoluteError: number = 0;

  /**
   * Fit the model with training data
   */
  fit(X: number[][], y: number[]): void {
    const n = X.length;
    if (n === 0 || X[0].length === 0) {
      console.error('Training data is empty');
      return;
    }
    
    const numFeatures = X[0].length;
    this.coefficients = new Array(numFeatures).fill(0);
    this.intercept = 0;
    
    // Gradient descent parameters
    const learningRate = 0.01;
    const iterations = 1000;
    
    // Gradient descent optimization
    for (let iter = 0; iter < iterations; iter++) {
      // Calculate predictions
      const predictions = X.map((xi) => {
        // Ensure xi is an array before using reduce
        if (!Array.isArray(xi)) {
          console.error('Feature vector is not an array:', xi);
          return this.intercept; // Return just the intercept as fallback
        }
        return this.intercept + xi.reduce((sum, xij, j) => sum + xij * this.coefficients[j], 0);
      });
      
      // Calculate errors
      const errors = predictions.map((pred, i) => pred - y[i]);
      
      // Calculate gradients
      const interceptGradient = errors.reduce((sum, error) => sum + error, 0) / n;
      const coeffGradients = new Array(numFeatures).fill(0);
      
      for (let j = 0; j < numFeatures; j++) {
        coeffGradients[j] = errors.reduce((sum, error, i) => {
          // Ensure X[i] is an array and has a value at index j
          if (Array.isArray(X[i]) && j < X[i].length) {
            return sum + error * X[i][j];
          }
          console.error(`Invalid feature vector at index ${i}`);
          return sum;
        }, 0) / n;
      }
      
      // Update parameters
      this.intercept -= learningRate * interceptGradient;
      for (let j = 0; j < numFeatures; j++) {
        this.coefficients[j] -= learningRate * coeffGradients[j];
      }
    }
    
    // Calculate performance metrics
    const predictions = X.map((xi) => {
      if (!Array.isArray(xi)) {
        console.error('Feature vector is not an array:', xi);
        return this.intercept; // Return just the intercept as fallback
      }
      return this.intercept + xi.reduce((sum, xij, j) => sum + xij * this.coefficients[j], 0);
    });
    
    // Mean Squared Error
    this.mse = predictions.reduce((sum, pred, i) => sum + Math.pow(pred - y[i], 2), 0) / n;
    
    // Mean Absolute Error
    this.meanAbsoluteError = predictions.reduce((sum, pred, i) => sum + Math.abs(pred - y[i]), 0) / n;
    
    // Calculate R-squared
    const yMean = y.reduce((sum, yi) => sum + yi, 0) / n;
    const totalSumSquares = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const residualSumSquares = predictions.reduce((sum, pred, i) => sum + Math.pow(pred - y[i], 2), 0);
    
    this.rSquared = Math.max(0, 1 - (residualSumSquares / totalSumSquares));
    
    console.log('Training complete, R-squared:', this.rSquared, 'MSE:', this.mse);
  }

  /**
   * Predict prices based on features
   */
  predict(X: number[]): number {
    if (X.length !== this.coefficients.length) {
      console.error(`Feature count mismatch: got ${X.length}, expected ${this.coefficients.length}`);
      return 0;
    }
    
    // Calculate prediction using weights and intercept
    let prediction = this.intercept;
    for (let i = 0; i < X.length; i++) {
      prediction += X[i] * this.coefficients[i];
    }
    
    // تحقق من عدم وجود أسعار سالبة
    if (prediction < 0) {
      console.warn('Model predicted negative price, adjusting to 0');
      prediction = 0;
    }
    
    return prediction;
  }
  
  /**
   * Get model details
   */
  getModelDetails(): LinearRegressionModelDetails {
    return {
      coefficients: this.coefficients,
      intercept: this.intercept,
      rSquared: this.rSquared,
      mse: this.mse,
      meanAbsoluteError: this.meanAbsoluteError
    };
  }
}
