const express = require('express');
const router = express.Router();
const { createBond, getAllBonds, getBondById, updateBond } = require('../controllers/bondController');

/**
 * @swagger
 * tags:
 *   name: Bond Investments
 *   description: APIs for managing Bond Investment records
 */

/**
 * @swagger
 * /api/bond:
 *   post:
 *     summary: Create a new Bond Investment
 *     tags: [Bond Investments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bond_name
 *               - issuer
 *               - isin
 *               - face_value
 *               - purchase_price
 *               - quantity
 *               - coupon_pct
 *               - purchase_date
 *               - maturity_date
 *             properties:
 *               bond_name:
 *                 type: string
 *                 example: "NABARD Rural Bond"
 *               issuer:
 *                 type: string
 *                 example: "NABARD"
 *               isin:
 *                 type: string
 *                 example: "INE261F08AX1"
 *                 description: "Must be exactly 12 characters"
 *               face_value:
 *                 type: number
 *                 example: 1000
 *               purchase_price:
 *                 type: number
 *                 example: 996.50
 *               quantity:
 *                 type: number
 *                 example: 500
 *               coupon_pct:
 *                 type: number
 *                 example: 7.00
 *               yield_pct:
 *                 type: number
 *                 example: 7.10
 *               purchase_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-12"
 *               maturity_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-12"
 *               classification:
 *                 type: string
 *                 enum: [HTM, AFS, HFT]
 *                 example: "HTM"
 *               slr_status:
 *                 type: string
 *                 enum: [SLR, Non-SLR]
 *                 example: "SLR"
 *               record_status:
 *                 type: string
 *                 enum: [Draft, Active]
 *                 example: "Draft"
 *               created_by:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Bond Investment created successfully
 *       400:
 *         description: Validation error – required fields missing or ISIN not 12 chars
 *       500:
 *         description: Internal server error
 */
router.post('/', createBond);

/**
 * @swagger
 * /api/bond:
 *   get:
 *     summary: Get all Bond Investments (with optional filters & pagination)
 *     tags: [Bond Investments]
 *     parameters:
 *       - in: query
 *         name: bond_name
 *         schema:
 *           type: string
 *         description: Partial match on bond name
 *       - in: query
 *         name: issuer
 *         schema:
 *           type: string
 *         description: Partial match on issuer name
 *       - in: query
 *         name: isin
 *         schema:
 *           type: string
 *         description: Exact match on ISIN
 *       - in: query
 *         name: classification
 *         schema:
 *           type: string
 *           enum: [HTM, AFS, HFT]
 *       - in: query
 *         name: slr_status
 *         schema:
 *           type: string
 *           enum: [SLR, Non-SLR]
 *       - in: query
 *         name: record_status
 *         schema:
 *           type: string
 *           enum: [Draft, Active]
 *       - in: query
 *         name: maturity_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter bonds maturing on or after this date (YYYY-MM-DD)
 *       - in: query
 *         name: maturity_to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter bonds maturing on or before this date (YYYY-MM-DD)
 *       - in: query
 *         name: maturing_in_days
 *         schema:
 *           type: integer
 *         description: Bonds maturing within the next N days from today
 *       - in: query
 *         name: page_number
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Paginated list of Bond Investments
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllBonds);

/**
 * @swagger
 * /api/bond/{id}:
 *   get:
 *     summary: Get a single Bond Investment by ID
 *     tags: [Bond Investments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bond Investment ID
 *     responses:
 *       200:
 *         description: Bond Investment detail record with Maturity_Alert_Level and Clean_Consideration
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBondById);

/**
 * @swagger
 * /api/bond/{id}:
 *   put:
 *     summary: Update an existing Bond Investment
 *     tags: [Bond Investments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bond Investment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bond_name
 *               - issuer
 *               - isin
 *               - face_value
 *               - purchase_price
 *               - quantity
 *               - coupon_pct
 *               - purchase_date
 *               - maturity_date
 *             properties:
 *               bond_name:
 *                 type: string
 *               issuer:
 *                 type: string
 *               isin:
 *                 type: string
 *                 description: "Must be exactly 12 characters"
 *               face_value:
 *                 type: number
 *               purchase_price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               coupon_pct:
 *                 type: number
 *               yield_pct:
 *                 type: number
 *               purchase_date:
 *                 type: string
 *                 format: date
 *               maturity_date:
 *                 type: string
 *                 format: date
 *               classification:
 *                 type: string
 *                 enum: [HTM, AFS, HFT]
 *               slr_status:
 *                 type: string
 *                 enum: [SLR, Non-SLR]
 *               record_status:
 *                 type: string
 *                 enum: [Draft, Active]
 *               updated_by:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bond Investment updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateBond);

module.exports = router;