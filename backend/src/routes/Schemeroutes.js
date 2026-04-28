const express = require('express');
const router  = express.Router();
const { createScheme, getAllSchemes, getSchemeById, updateScheme } = require('../controllers/Schemecontroller');

/**
 * @swagger
 * tags:
 *   name: Scheme Master
 *   description: Mutual Fund Scheme master data endpoints
 */

/**
 * @swagger
 * /api/scheme:
 *   post:
 *     summary: Create a new Scheme
 *     tags: [Scheme Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [AMFI_Code, Scheme_Name, AMC, Category]
 *             properties:
 *               AMFI_Code:          { type: string,  example: '119551' }
 *               ISIN:               { type: string,  example: 'INF200K01LQ1' }
 *               Scheme_Name:        { type: string,  example: 'SBI Liquid Fund - Direct - Growth' }
 *               AMC:                { type: string,  example: 'SBI Funds Management' }
 *               Category:           { type: string,  example: 'Liquid' }
 *               Sub_Category:       { type: string,  example: 'Direct - Growth' }
 *               Plan_Type:          { type: string,  example: 'Growth' }
 *               Min_Lumpsum:        { type: number,  example: 5000 }
 *               Min_SIP:            { type: number,  example: 500 }
 *               Exit_Load:          { type: string,  example: 'Nil after 7 days' }
 *               Expense_Ratio_Pct:  { type: number,  example: 0.0018 }
 *               Benchmark:          { type: string,  example: 'CRISIL Liquid Fund Index' }
 *               Risk_Meter:         { type: string,  example: 'Low' }
 *               NAV_Frequency:      { type: string,  enum: [Daily, Weekly] }
 *               Approved_For_UCB:   { type: string,  enum: [Yes, No] }
 *               Created_By:         { type: string,  example: 'ADMIN' }
 *     responses:
 *       201: { description: Scheme created }
 *       400: { description: Validation / duplicate error }
 */
router.post('/', createScheme);

/**
 * @swagger
 * /api/scheme:
 *   get:
 *     summary: Get all Schemes (filterable, paginated)
 *     tags: [Scheme Master]
 *     parameters:
 *       - { in: query, name: amc,              schema: { type: string } }
 *       - { in: query, name: category,         schema: { type: string } }
 *       - { in: query, name: plan_type,        schema: { type: string } }
 *       - { in: query, name: risk_meter,       schema: { type: string } }
 *       - { in: query, name: approved_for_ucb, schema: { type: string, enum: [Yes, No] } }
 *       - { in: query, name: is_active,        schema: { type: integer, enum: [0, 1] } }
 *       - { in: query, name: search,           schema: { type: string }, description: 'Name / AMFI Code / ISIN' }
 *       - { in: query, name: page,             schema: { type: integer, default: 1 } }
 *       - { in: query, name: page_size,        schema: { type: integer, default: 20 } }
 *     responses:
 *       200: { description: Paginated list }
 */
router.get('/', getAllSchemes);

/**
 * @swagger
 * /api/scheme/{id}:
 *   get:
 *     summary: Get a single Scheme by ID
 *     tags: [Scheme Master]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     responses:
 *       200: { description: Scheme record }
 *       404: { description: Not found }
 */
router.get('/:id', getSchemeById);

/**
 * @swagger
 * /api/scheme/{id}:
 *   put:
 *     summary: Update an existing Scheme
 *     tags: [Scheme Master]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [AMFI_Code, Scheme_Name, AMC, Category]
 *             properties:
 *               AMFI_Code:          { type: string }
 *               ISIN:               { type: string }
 *               Scheme_Name:        { type: string }
 *               AMC:                { type: string }
 *               Category:           { type: string }
 *               Sub_Category:       { type: string }
 *               Plan_Type:          { type: string }
 *               Min_Lumpsum:        { type: number }
 *               Min_SIP:            { type: number }
 *               Exit_Load:          { type: string }
 *               Expense_Ratio_Pct:  { type: number }
 *               Benchmark:          { type: string }
 *               Risk_Meter:         { type: string }
 *               NAV_Frequency:      { type: string }
 *               Approved_For_UCB:   { type: string, enum: [Yes, No] }
 *               Is_Active:          { type: integer, enum: [0, 1] }
 *               Modified_By:        { type: string }
 *     responses:
 *       200: { description: Updated }
 *       400: { description: Validation error }
 *       404: { description: Not found }
 */
router.put('/:id', updateScheme);

module.exports = router;