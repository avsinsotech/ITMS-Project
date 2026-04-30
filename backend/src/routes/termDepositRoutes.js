// src/routes/termDepositRoutes.js
const express  = require('express');
const router   = express.Router();
const { validateGL, createDeposit, updateDeposit, listDeposits } = require('../controllers/termDepositController');

/**
 * @swagger
 * tags:
 *   name: TermDeposit
 *   description: Term Deposit Investment Receipt APIs
 */

/**
 * @swagger
 * /api/term-deposit/validate-gl:
 *   get:
 *     summary: Validate Product Code (GL Code) against GLMAST
 *     tags: [TermDeposit]
 *     parameters:
 *       - in: query
 *         name: glCode
 *         required: true
 *         schema:
 *           type: number
 *         example: 56015
 *         description: GL Code to validate — must belong to GLGROUP = INV
 *     responses:
 *       200:
 *         description: Valid GL Code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Valid GL Code.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid GL Code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid Product Code: 56015. GL Group is not INV."
 */
router.get('/validate-gl', validateGL);

/**
 * @swagger
 * /api/term-deposit/create:
 *   post:
 *     summary: Create a new Term Deposit
 *     tags: [TermDeposit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brcd
 *               - custNo
 *               - custAccNo
 *               - glCode
 *               - subGlCode
 *               - period
 *               - periodType
 *               - rateOfInt
 *               - principleAmt
 *               - interestAmt
 *               - maturityAmt
 *               - intPayOut
 *               - openingDate
 *               - dueDate
 *               - entryDate
 *               - paymentMode
 *             properties:
 *               brcd:
 *                 type: number
 *                 example: 1
 *               custNo:
 *                 type: string
 *                 example: "1001"
 *               custAccNo:
 *                 type: number
 *                 example: 123456
 *               glCode:
 *                 type: number
 *                 example: 56015
 *               subGlCode:
 *                 type: string
 *                 example: "56015"
 *               period:
 *                 type: number
 *                 example: 12
 *               periodType:
 *                 type: string
 *                 example: "M"
 *                 enum: [M, Y, D]
 *               rateOfInt:
 *                 type: number
 *                 example: 8.5
 *               principleAmt:
 *                 type: number
 *                 example: 50000
 *               interestAmt:
 *                 type: number
 *                 example: 4250
 *               maturityAmt:
 *                 type: number
 *                 example: 54250
 *               intPayOut:
 *                 type: number
 *                 example: 4
 *                 description: 1=Monthly 2=Quarterly 3=Half-Yearly 4=Yearly 5=On Maturity
 *               openingDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-01"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2027-04-01"
 *               entryDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-01"
 *               paymentMode:
 *                 type: string
 *                 example: "NEFT"
 *     responses:
 *       201:
 *         description: Term Deposit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 depositId:
 *                   type: number
 *                 setNo:
 *                   type: number
 *       400:
 *         description: Validation error
 */
router.post('/create', createDeposit);

/**
 * @swagger
 * /api/term-deposit/update/{id}:
 *   put:
 *     summary: Update an existing Term Deposit
 *     tags: [TermDeposit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 42
 *         description: ID of the Term Deposit record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - period
 *               - rateOfInt
 *               - principleAmt
 *               - interestAmt
 *               - maturityAmt
 *               - intPayOut
 *               - dueDate
 *             properties:
 *               period:
 *                 type: number
 *                 example: 12
 *               periodUnit:
 *                 type: string
 *                 example: "Months"
 *                 enum: [Days, Months]
 *               rateOfInt:
 *                 type: number
 *                 example: 8.5
 *               principleAmt:
 *                 type: number
 *                 example: 50000
 *               interestAmt:
 *                 type: number
 *                 example: 4250
 *               maturityAmt:
 *                 type: number
 *                 example: 54250
 *               intPayOut:
 *                 type: number
 *                 example: 4
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2027-04-01"
 *               intTrfSubGl:
 *                 type: string
 *               prinTrfSubGl:
 *                 type: string
 *               intTrfAccNo:
 *                 type: string
 *               prinTrfAccNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Term Deposit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Term Deposit updated successfully.
 *       400:
 *         description: Validation error or invalid ID
 */
router.put('/update/:id', updateDeposit);

/**
 * @swagger
 * /api/term-deposit/list:
 *   get:
 *     summary: List all Term Deposits for grid display
 *     tags: [TermDeposit]
 *     parameters:
 *       - in: query
 *         name: brcd
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *         description: Branch code to filter records
 *     responses:
 *       200:
 *         description: List of term deposit records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Missing brcd query param
 */
router.get('/list', listDeposits);

module.exports = router;