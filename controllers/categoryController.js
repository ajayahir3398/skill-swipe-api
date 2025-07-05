const Category = require('../models/category');

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get categories with optional filtering
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status (optional)
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Get specific category by key (optional)
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         description: Category key
 *                       value:
 *                         type: string
 *                         description: Category value
 *                       description:
 *                         type: string
 *                         description: Category description
 *       404:
 *         description: Category not found (when key is provided)
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
const getCategories = async (req, res) => {
  try {
    const { active, key } = req.query;

    // If key is provided, return specific category
    if (key) {
      const category = await Category.findOne({ key: key.toLowerCase() })
        .select('key value description isActive');

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }

      return res.json({
        success: true,
        data: [{
          key: category.key,
          value: category.value,
          description: category.description,
          isActive: category.isActive
        }],
        count: 1
      });
    }

    // Build query filter for multiple categories
    const filter = {};
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const categories = await Category.find(filter)
      .select('key value description isActive')
      .sort({ key: 1 });

    // Transform to key-value pairs format
    const keyValuePairs = categories.map(category => ({
      key: category.key,
      value: category.value,
      description: category.description,
      isActive: category.isActive
    }));

    res.json({
      success: true,
      data: keyValuePairs,
      count: keyValuePairs.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  getCategories
}; 