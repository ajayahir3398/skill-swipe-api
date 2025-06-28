const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Register user (public route)
router.post('/register', registerUser);

// Login user (public route)
router.post('/login', loginUser);

// Get user profile (protected route - requires authentication)
router.get('/profile', authenticateToken, getProfile);

// Update user profile (protected route - requires authentication)
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
