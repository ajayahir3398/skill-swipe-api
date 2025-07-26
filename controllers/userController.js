const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cleanupAllExpiredTokens, cleanupUserExpiredTokens } = require('../utils/tokenCleanup');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    // Clear invalidated tokens on successful login
    await User.findByIdAndUpdate(
      user._id,
      { $set: { invalidatedTokens: [] } }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile with detailed information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdateRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const updateProfile = async (req, res) => {
  try {
    const {
      bio,
      avatar,
      dateOfBirth,
      gender,
      location,
      profession,
      company,
      experienceLevel,
      yearsOfExperience,
      skillsOffered,
      skillsNeeded,
      availability,
      preferredMeetingType,
      phone,
      website,
      linkedin,
      github,
      isPublicProfile,
      notificationsEnabled,
      interests,
      languages,
      certifications
    } = req.body;

    // Fields that should not be updated via this endpoint
    const updateData = {
      bio,
      avatar,
      dateOfBirth,
      gender,
      location,
      profession,
      company,
      experienceLevel,
      yearsOfExperience,
      skillsOffered,
      skillsNeeded,
      availability,
      preferredMeetingType,
      phone,
      website,
      linkedin,
      github,
      isPublicProfile,
      notificationsEnabled,
      interests,
      languages,
      certifications,
      isProfileComplete: true // Mark profile as complete
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const logoutUser = async (req, res) => {
  try {
    // Get the token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    // Add the token to the user's invalidated tokens list
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { invalidatedTokens: token } }
    );

    res.status(200).json({ 
      message: 'Logout successful. Token has been invalidated.',
      logoutTime: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed: ' + err.message });
  }
};

/**
 * @swagger
 * /api/users/logout-all:
 *   post:
 *     summary: Logout user from all devices
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout from all devices successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const logoutAllDevices = async (req, res) => {
  try {
    // Clear all invalidated tokens (this will force all existing tokens to be invalid)
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { invalidatedTokens: [] } }
    );

    res.status(200).json({ 
      message: 'Logged out from all devices successfully.',
      logoutTime: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed: ' + err.message });
  }
};

/**
 * Utility function to clean up expired tokens from invalidatedTokens array
 * This can be called periodically or on login
 */
const cleanupExpiredTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.invalidatedTokens || user.invalidatedTokens.length === 0) {
      return;
    }

    const validTokens = [];
    for (const token of user.invalidatedTokens) {
      try {
        // Try to verify the token to see if it's expired
        jwt.verify(token, process.env.JWT_SECRET);
        // If verification passes, token is still valid (not expired)
        validTokens.push(token);
      } catch (error) {
        // Token is expired or invalid, skip it
        continue;
      }
    }

    // Update user with only valid tokens
    await User.findByIdAndUpdate(
      userId,
      { $set: { invalidatedTokens: validTokens } }
    );
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
  }
};

/**
 * @swagger
 * /api/users/get-token:
 *   post:
 *     summary: Get access token for user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getToken = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    // Clear invalidated tokens on successful token generation
    await User.findByIdAndUpdate(
      user._id,
      { $set: { invalidatedTokens: [] } }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/users/cleanup-tokens:
 *   post:
 *     summary: Manually trigger cleanup of expired tokens (Admin function)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token cleanup completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 totalCleaned:
 *                   type: number
 *                   description: Number of expired tokens removed
 *                 usersProcessed:
 *                   type: number
 *                   description: Number of users processed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const manualCleanupTokens = async (req, res) => {
  try {
    const result = await cleanupAllExpiredTokens();
    res.json({ 
      message: 'Token cleanup completed successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: 'Token cleanup failed: ' + error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getToken,
  logoutUser,
  logoutAllDevices,
  manualCleanupTokens
}; 