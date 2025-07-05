const express = require('express');
const router = express.Router();
const { getSubcategories } = require('../controllers/subcategoryController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Get subcategories with optional filtering (public route)
router.get('/', authenticateToken, getSubcategories);

module.exports = router; 