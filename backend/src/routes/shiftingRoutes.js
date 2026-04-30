const express = require('express');
const router = express.Router();
const shiftingController = require('../controllers/shiftingController');
const authMiddleware = require('../utils/authMiddleware');

// Apply authMiddleware if authentication is required
// router.use(authMiddleware);

/**
 * @swagger
 * /api/shifting/process:
 *   post:
 *     summary: Execute the shifting process (Classification and Shift module)
 *     tags: [Shifting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               marketPrice:
 *                 type: number
 *               marketValue:
 *                 type: number
 *               classification:
 *                 type: string
 *             example:
 *               id: 51255
 *               marketPrice: 98
 *               marketValue: 19560800.00
 *               classification: 'HTM'
 *     responses:
 *       200:
 *         description: Shifting process executed successfully
 */
router.post('/process', shiftingController.processShifting);

module.exports = router;