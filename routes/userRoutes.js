const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, getToken, logoutUser, logoutAllDevices, manualCleanupTokens } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Register user (public route)
router.post('/register', registerUser);

// Login user (public route)
router.post('/login', loginUser);

// Get token (public route)
router.post('/get-token', getToken);

// Logout user (protected route)
router.post('/logout', authenticateToken, logoutUser);

// Logout from all devices (protected route)
router.post('/logout-all', authenticateToken, logoutAllDevices);

// Manual token cleanup (protected route - for admin use)
router.post('/cleanup-tokens', authenticateToken, manualCleanupTokens);

// Get user profile (protected route - requires authentication)
router.get('/profile', authenticateToken, getProfile);

// Update user profile (protected route - requires authentication)
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
