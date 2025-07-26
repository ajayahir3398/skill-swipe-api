const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Automatic cleanup of expired tokens from all users
 * This function should be called periodically (e.g., daily)
 */
const cleanupAllExpiredTokens = async () => {
  try {
    console.log('Starting automatic cleanup of expired tokens...');
    
    // Get all users with invalidated tokens
    const users = await User.find({ 
      invalidatedTokens: { $exists: true, $ne: [] } 
    });

    if (users.length === 0) {
      console.log('No users with invalidated tokens found');
      return { totalCleaned: 0, usersProcessed: 0 };
    }

    let totalCleaned = 0;
    let usersProcessed = 0;

    for (const user of users) {
      if (!user.invalidatedTokens || user.invalidatedTokens.length === 0) {
        continue;
      }

      const validTokens = [];
      let tokensCleaned = 0;

      for (const token of user.invalidatedTokens) {
        try {
          // Try to verify the token to see if it's expired
          jwt.verify(token, process.env.JWT_SECRET);
          // If verification passes, token is still valid (not expired)
          validTokens.push(token);
        } catch (error) {
          // Token is expired or invalid, skip it
          tokensCleaned++;
        }
      }

      // Update user with only valid tokens
      if (tokensCleaned > 0) {
        await User.findByIdAndUpdate(
          user._id,
          { $set: { invalidatedTokens: validTokens } }
        );
        totalCleaned += tokensCleaned;
        console.log(`Cleaned ${tokensCleaned} expired tokens from user ${user.email}`);
      }

      usersProcessed++;
    }

    console.log(`Cleanup completed: ${totalCleaned} expired tokens removed from ${usersProcessed} users`);
    return { totalCleaned, usersProcessed };
  } catch (error) {
    console.error('Error during automatic token cleanup:', error);
    throw error;
  }
};

/**
 * Clean up expired tokens for a specific user
 * @param {string} userId - The user ID to clean tokens for
 */
const cleanupUserExpiredTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.invalidatedTokens || user.invalidatedTokens.length === 0) {
      return { totalCleaned: 0 };
    }

    const validTokens = [];
    let tokensCleaned = 0;

    for (const token of user.invalidatedTokens) {
      try {
        // Try to verify the token to see if it's expired
        jwt.verify(token, process.env.JWT_SECRET);
        // If verification passes, token is still valid (not expired)
        validTokens.push(token);
      } catch (error) {
        // Token is expired or invalid, skip it
        tokensCleaned++;
      }
    }

    // Update user with only valid tokens
    if (tokensCleaned > 0) {
      await User.findByIdAndUpdate(
        user._id,
        { $set: { invalidatedTokens: validTokens } }
      );
      console.log(`Cleaned ${tokensCleaned} expired tokens from user ${user.email}`);
    }

    return { totalCleaned: tokensCleaned };
  } catch (error) {
    console.error('Error cleaning up user tokens:', error);
    throw error;
  }
};

/**
 * Schedule automatic token cleanup
 * Runs daily at 2 AM
 */
const scheduleTokenCleanup = () => {
  const now = new Date();
  const nextRun = new Date();
  nextRun.setHours(2, 0, 0, 0); // 2 AM
  
  // If it's past 2 AM today, schedule for tomorrow
  if (now.getHours() >= 2) {
    nextRun.setDate(nextRun.getDate() + 1);
  }
  
  const timeUntilNextRun = nextRun.getTime() - now.getTime();
  
  console.log(`Next token cleanup scheduled for: ${nextRun.toISOString()}`);
  
  setTimeout(async () => {
    try {
      await cleanupAllExpiredTokens();
    } catch (error) {
      console.error('Scheduled token cleanup failed:', error);
    }
    
    // Schedule next cleanup (24 hours later)
    setInterval(async () => {
      try {
        await cleanupAllExpiredTokens();
      } catch (error) {
        console.error('Scheduled token cleanup failed:', error);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  }, timeUntilNextRun);
};

/**
 * Start the cleanup scheduler
 */
const startCleanupScheduler = () => {
  console.log('Starting token cleanup scheduler...');
  scheduleTokenCleanup();
};

module.exports = {
  cleanupAllExpiredTokens,
  cleanupUserExpiredTokens,
  scheduleTokenCleanup,
  startCleanupScheduler
}; 