// const User = require('../models/user');

// /**
//  * @swagger
//  * /api/skills/findBySkill:
//  *   get:
//  *     summary: Find users by skill needed
//  *     tags: [Skills]
//  *     parameters:
//  *       - in: query
//  *         name: skill
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Skill to search for
//  *     responses:
//  *       200:
//  *         description: List of users with the specified skill
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/User'
//  *       500:
//  *         description: Server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
// const findUsersBySkill = async (req, res) => {
//     const { skill } = req.query;
//     try {
//         const users = await User.find({ skillsOffered: skill });
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// /**
//  * @swagger
//  * /api/skills/addSkill:
//  *   post:
//  *     summary: Add skill to authenticated user (offered or needed)
//  *     tags: [Skills]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/SkillRequest'
//  *     responses:
//  *       200:
//  *         description: Skill added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       400:
//  *         description: Bad request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *       401:
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
// const addSkillToUser = async (req, res) => {
//     const { type, skill } = req.body; // type = "offered" or "needed"
//     try {
//         const updateField = type === 'offered' ? { $addToSet: { skillsOffered: skill } } : { $addToSet: { skillsNeeded: skill } };
//         const user = await User.findByIdAndUpdate(req.user._id, updateField, { new: true }).select('-password');
//         res.json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// module.exports = {
//     findUsersBySkill,
//     addSkillToUser
// }; 