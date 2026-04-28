const express = require('express');
const router = express.Router();
const { createFD, getAllFDs, getFDById, updateFD } = require('../controllers/fdController');

/**
 * @swagger
 * tags:
 *   name: Fixed Deposits
 *   description: APIs for managing Fixed Deposit records
 */

/**
 * @swagger
 * /api/fd:
 *   post:
 *     summary: Create a new Fixed Deposit
 *     tags: [Fixed Deposits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bank_name
 *               - deposit_amount
 *               - interest_rate_pct
 *               - start_date
 *               - maturity_date
 *             properties:
 *               bank_name:
 *                 type: string
 *                 example: "SBI - Mumbai"
 *               fd_number:
 *                 type: string
 *                 example: "FD2024001"
 *               deposit_amount:
 *                 type: number
 *                 example: 1500000
 *               interest_rate_pct:
 *                 type: number
 *                 example: 7.00
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-18"
 *               maturity_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-18"
 *               interest_type:
 *                 type: string
 *                 enum: [Simple, Compound]
 *                 example: "Simple"
 *               interest_payout:
 *                 type: string
 *                 enum: [On Maturity, Monthly, Quarterly, Annually]
 *                 example: "On Maturity"
 *               classification:
 *                 type: string
 *                 enum: [HTM, AFS, HFT]
 *                 example: "HTM"
 *               slr_status:
 *                 type: string
 *                 enum: [SLR, Non-SLR]
 *                 example: "Non-SLR"
 *               record_status:
 *                 type: string
 *                 enum: [Draft, Active]
 *                 example: "Draft"
 *               created_by:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Fixed Deposit created successfully
 *       400:
 *         description: Validation error – required fields missing
 *       500:
 *         description: Internal server error
 */
router.post('/', createFD);

/**
 * @swagger
 * /api/fd:
 *   get:
 *     summary: Get all Fixed Deposits (with optional filters & pagination)
 *     tags: [Fixed Deposits]
 *     parameters:
 *       - in: query
 *         name: bank_name
 *         schema:
 *           type: string
 *         description: Partial match on bank name
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
 *         name: interest_type
 *         schema:
 *           type: string
 *           enum: [Simple, Compound]
 *       - in: query
 *         name: maturity_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter FDs maturing on or after this date (YYYY-MM-DD)
 *       - in: query
 *         name: maturity_to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter FDs maturing on or before this date (YYYY-MM-DD)
 *       - in: query
 *         name: maturing_in_days
 *         schema:
 *           type: integer
 *         description: FDs maturing within the next N days from today
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
 *         description: Paginated list of Fixed Deposits
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllFDs);

/**
 * @swagger
 * /api/fd/{id}:
 *   get:
 *     summary: Get a single Fixed Deposit by ID
 *     tags: [Fixed Deposits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fixed Deposit ID
 *     responses:
 *       200:
 *         description: Fixed Deposit detail record
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getFDById);

/**
 * @swagger
 * /api/fd/{id}:
 *   put:
 *     summary: Update an existing Fixed Deposit
 *     tags: [Fixed Deposits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fixed Deposit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bank_name
 *               - deposit_amount
 *               - interest_rate_pct
 *               - start_date
 *               - maturity_date
 *             properties:
 *               bank_name:
 *                 type: string
 *               fd_number:
 *                 type: string
 *               deposit_amount:
 *                 type: number
 *               interest_rate_pct:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               maturity_date:
 *                 type: string
 *                 format: date
 *               interest_type:
 *                 type: string
 *                 enum: [Simple, Compound]
 *               interest_payout:
 *                 type: string
 *                 enum: [On Maturity, Monthly, Quarterly, Annually]
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
 *         description: Fixed Deposit updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateFD);

module.exports = router;