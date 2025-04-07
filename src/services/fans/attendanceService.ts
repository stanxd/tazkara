
/**
 * Service for tracking fan attendance and managing penalties
 */

// Local storage keys
const MISSED_MATCHES_KEY = 'tazkara_missed_matches';
const PENALTY_STATUS_KEY = 'tazkara_penalty_status';

interface MissedAttendance {
  userId: string;
  matchIds: string[];
}

interface PenaltyStatus {
  userId: string;
  isPenalized: boolean;
  penaltyMatchesRemaining: number;
  penaltyStartDate: string;
}

/**
 * Record a missed attendance for a user
 */
export const recordMissedAttendance = (userId: string, matchId: string): number => {
  try {
    const missedAttendancesJSON = localStorage.getItem(MISSED_MATCHES_KEY);
    const missedAttendances: MissedAttendance[] = missedAttendancesJSON ? JSON.parse(missedAttendancesJSON) : [];
    
    // Find user's record or create a new one
    let userRecord = missedAttendances.find(record => record.userId === userId);
    if (!userRecord) {
      userRecord = { userId, matchIds: [] };
      missedAttendances.push(userRecord);
    }
    
    // Add the match ID if not already recorded
    if (!userRecord.matchIds.includes(matchId)) {
      userRecord.matchIds.push(matchId);
    }
    
    // Save back to localStorage
    localStorage.setItem(MISSED_MATCHES_KEY, JSON.stringify(missedAttendances));
    
    // Check if penalty should be applied
    const missedCount = userRecord.matchIds.length;
    if (missedCount >= 3 && !isUserPenalized(userId)) {
      applyPenalty(userId);
    }
    
    return userRecord.matchIds.length;
  } catch (error) {
    console.error('Error recording missed attendance:', error);
    return 0;
  }
};

/**
 * Check if user is currently penalized
 */
export const isUserPenalized = (userId: string): boolean => {
  try {
    const penaltyStatusJSON = localStorage.getItem(PENALTY_STATUS_KEY);
    if (!penaltyStatusJSON) return false;
    
    const penaltyStatuses: PenaltyStatus[] = JSON.parse(penaltyStatusJSON);
    const userStatus = penaltyStatuses.find(status => status.userId === userId);
    
    if (!userStatus || !userStatus.isPenalized) return false;
    
    // If penalty period has passed, remove the penalty
    if (userStatus.penaltyMatchesRemaining <= 0) {
      removePenalty(userId);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking penalty status:', error);
    return false;
  }
};

/**
 * Apply penalty to a user
 */
export const applyPenalty = (userId: string): void => {
  try {
    const penaltyStatusJSON = localStorage.getItem(PENALTY_STATUS_KEY);
    const penaltyStatuses: PenaltyStatus[] = penaltyStatusJSON ? JSON.parse(penaltyStatusJSON) : [];
    
    // Remove any existing penalty for this user
    const filteredStatuses = penaltyStatuses.filter(status => status.userId !== userId);
    
    // Add new penalty
    filteredStatuses.push({
      userId,
      isPenalized: true,
      penaltyMatchesRemaining: 3,
      penaltyStartDate: new Date().toISOString()
    });
    
    localStorage.setItem(PENALTY_STATUS_KEY, JSON.stringify(filteredStatuses));
  } catch (error) {
    console.error('Error applying penalty:', error);
  }
};

/**
 * Remove penalty from a user
 */
export const removePenalty = (userId: string): void => {
  try {
    const penaltyStatusJSON = localStorage.getItem(PENALTY_STATUS_KEY);
    if (!penaltyStatusJSON) return;
    
    const penaltyStatuses: PenaltyStatus[] = JSON.parse(penaltyStatusJSON);
    const updatedStatuses = penaltyStatuses.filter(status => status.userId !== userId);
    
    localStorage.setItem(PENALTY_STATUS_KEY, JSON.stringify(updatedStatuses));
  } catch (error) {
    console.error('Error removing penalty:', error);
  }
};

/**
 * Reduce remaining penalty matches for a user when they attend
 */
export const reducePenaltyCounter = (userId: string): number => {
  try {
    const penaltyStatusJSON = localStorage.getItem(PENALTY_STATUS_KEY);
    if (!penaltyStatusJSON) return 0;
    
    const penaltyStatuses: PenaltyStatus[] = JSON.parse(penaltyStatusJSON);
    const userStatus = penaltyStatuses.find(status => status.userId === userId);
    
    if (!userStatus || !userStatus.isPenalized) return 0;
    
    // Reduce penalty counter
    userStatus.penaltyMatchesRemaining = Math.max(0, userStatus.penaltyMatchesRemaining - 1);
    
    // If penalty has been served, remove it
    if (userStatus.penaltyMatchesRemaining <= 0) {
      userStatus.isPenalized = false;
    }
    
    localStorage.setItem(PENALTY_STATUS_KEY, JSON.stringify(penaltyStatuses));
    return userStatus.penaltyMatchesRemaining;
  } catch (error) {
    console.error('Error reducing penalty counter:', error);
    return 0;
  }
};

/**
 * Get user penalty information
 */
export const getUserPenaltyInfo = (userId: string): { isPenalized: boolean; matchesRemaining: number } => {
  try {
    const penaltyStatusJSON = localStorage.getItem(PENALTY_STATUS_KEY);
    if (!penaltyStatusJSON) return { isPenalized: false, matchesRemaining: 0 };
    
    const penaltyStatuses: PenaltyStatus[] = JSON.parse(penaltyStatusJSON);
    const userStatus = penaltyStatuses.find(status => status.userId === userId);
    
    if (!userStatus) return { isPenalized: false, matchesRemaining: 0 };
    
    return {
      isPenalized: userStatus.isPenalized,
      matchesRemaining: userStatus.penaltyMatchesRemaining
    };
  } catch (error) {
    console.error('Error getting penalty info:', error);
    return { isPenalized: false, matchesRemaining: 0 };
  }
};

/**
 * Reset attendance records for testing
 */
export const resetAttendanceRecords = (userId: string): void => {
  try {
    // Clear missed matches
    const missedAttendancesJSON = localStorage.getItem(MISSED_MATCHES_KEY);
    if (missedAttendancesJSON) {
      const missedAttendances: MissedAttendance[] = JSON.parse(missedAttendancesJSON);
      const filteredAttendances = missedAttendances.filter(record => record.userId !== userId);
      localStorage.setItem(MISSED_MATCHES_KEY, JSON.stringify(filteredAttendances));
    }
    
    // Clear penalties
    removePenalty(userId);
  } catch (error) {
    console.error('Error resetting attendance records:', error);
  }
};
