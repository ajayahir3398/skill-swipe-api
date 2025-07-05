const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Get categories with optional filtering (public route)
router.get('/', authenticateToken, getCategories);

module.exports = router; 