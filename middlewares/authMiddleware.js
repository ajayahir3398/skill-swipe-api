const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * JWT Authentication Middleware
 * Verifies the JWT token from Authorization header
 * Adds user data to req.user if token is valid
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' });
    }

    // Check if token has been invalidated (logout)
    if (user.invalidatedTokens && user.invalidatedTokens.includes(token)) {
      return res.status(401).json({ error: 'Token has been invalidated. Please login again.' });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
};

/**
 * Optional Authentication Middleware
 * Similar to authenticateToken but doesn't require token
 * Adds user data to req.user if valid token is provided
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        // Check if token has been invalidated (logout)
        if (!user.invalidatedTokens || !user.invalidatedTokens.includes(token)) {
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
}; 