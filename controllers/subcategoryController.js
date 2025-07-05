const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Get subcategories with optional filtering
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryKey
 *         schema:
 *           type: string
 *         description: Filter by category key (optional)
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status (optional)
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Get specific subcategory by key (optional)
 *     responses:
 *       200:
 *         description: Subcategories retrieved successfully
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
 *                         description: Subcategory key
 *                       value:
 *                         type: string
 *                         description: Subcategory value
 *                       description:
 *                         type: string
 *                         description: Subcategory description
 *                       categoryKey:
 *                         type: string
 *                         description: Parent category key
 *       404:
 *         description: Subcategory not found (when key is provided)
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
const getSubcategories = async (req, res) => {
  try {
    const { categoryKey, active, key } = req.query;

    // If key is provided, return specific subcategory
    if (key) {
      const subcategory = await Subcategory.findOne({ key: key.toLowerCase() })
        .select('key value description categoryKey isActive');

      if (!subcategory) {
        return res.status(404).json({
          success: false,
          error: 'Subcategory not found'
        });
      }

      return res.json({
        success: true,
        data: [{
          key: subcategory.key,
          value: subcategory.value,
          description: subcategory.description,
          categoryKey: subcategory.categoryKey,
          isActive: subcategory.isActive
        }],
        count: 1
      });
    }

    // If categoryKey is provided, verify category exists and return subcategories
    if (categoryKey) {
      const category = await Category.findOne({ key: categoryKey.toLowerCase() });
      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }
    }

    // Build query filter
    const filter = {};
    if (categoryKey) {
      filter.categoryKey = categoryKey.toLowerCase();
    }
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const subcategories = await Subcategory.find(filter)
      .select('key value description categoryKey isActive')
      .sort({ categoryKey: 1, key: 1 });

    // Transform to key-value pairs format
    const keyValuePairs = subcategories.map(subcategory => ({
      key: subcategory.key,
      value: subcategory.value,
      description: subcategory.description,
      categoryKey: subcategory.categoryKey,
      isActive: subcategory.isActive
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
  getSubcategories
}; 