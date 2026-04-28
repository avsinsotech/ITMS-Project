

// src/routes/investmentMasterRoutes.js
const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/investmentMasterController');

/**
 * @swagger
 * tags:
 *   name: InvestmentMaster
 *   description: Term Deposit / Investment Master APIs
 */

// ── IMPORTANT: All specific routes MUST come before /:id ─────────────────────
// Express matches routes top-to-bottom. If /:id is first, it swallows
// 'existing-defaults', 'gl', 'defaults', 'create-existing' as the id param.

/**
 * @swagger
 * /api/investment-master/defaults:
 *   get:
 *     summary: Get next GLCODE, ReceiptNo and AccNo for Add New form
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: query
 *         name: brcd
 *         schema: { type: number }
 *         description: Branch code (default 1)
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/defaults', ctrl.getAddNewDefaults);

/**
 * @swagger
 * /api/investment-master/existing-defaults:
 *   get:
 *     summary: Get GL name + next ReceiptNo + AccNo for Add Existing form
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: query
 *         name: glCode
 *         required: true
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: GL code not found
 */
router.get('/existing-defaults', ctrl.getAddExistingDefaults);

/**
 * @swagger
 * /api/investment-master/gl/search:
 *   get:
 *     summary: Search GLMAST by GLCODE
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: GL records matching the code
 */
router.get('/gl/search', ctrl.searchGLByCode);

/**
 * @swagger
 * /api/investment-master/gl/search-name:
 *   get:
 *     summary: Autocomplete search GLMAST by product name
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Matching GL records
 */
router.get('/gl/search-name', ctrl.searchGLByName);

/**
 * @swagger
 * /api/investment-master/create:
 *   post:
 *     summary: Create a new Term Deposit (Add New)
 *     tags: [InvestmentMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankName
 *               - openingDate
 *               - icProdCode
 *               - irProdCode
 *               - irAccNum
 *             properties:
 *               investmentType: { type: string, example: "itd" }
 *               productCode:    { type: string, example: "56002" }
 *               productName:    { type: string }
 *               bankName:       { type: string, example: "SBI" }
 *               bankCode:       { type: number, example: 1 }
 *               branchName:     { type: string, example: "Mumbai" }
 *               branchCode:     { type: number, example: 1 }
 *               receiptName:    { type: string }
 *               boardResNo:     { type: number, example: 1002 }
 *               boardMeetDate:  { type: string, format: date, example: "2024-06-04" }
 *               openingDate:    { type: string, format: date, example: "2024-06-04" }
 *               icProdCode:     { type: string, example: "702" }
 *               icProdName:     { type: string }
 *               irProdCode:     { type: string, example: "102" }
 *               irProdName:     { type: string }
 *               irAccNum:       { type: string, example: "1" }
 *               irCustName:     { type: string }
 *               brcd:           { type: number, example: 1 }
 *     responses:
 *       201:
 *         description: Investment created successfully
 *       400:
 *         description: Validation error
 */
router.post('/create', ctrl.createInvestment);

/**
 * @swagger
 * /api/investment-master/create-existing:
 *   post:
 *     summary: Link existing GL to a new investment account (Add Existing)
 *     tags: [InvestmentMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - glCode
 *               - bankName
 *               - openingDate
 *               - icProdCode
 *               - irProdCode
 *               - irAccNum
 *             properties:
 *               glCode:         { type: number, example: 702 }
 *               investmentType: { type: string, example: "INV" }
 *               productName:    { type: string }
 *               bankName:       { type: string, example: "SBI" }
 *               bankCode:       { type: number, example: 1 }
 *               branchName:     { type: string }
 *               branchCode:     { type: number }
 *               receiptName:    { type: string }
 *               boardResNo:     { type: number }
 *               boardMeetDate:  { type: string, format: date }
 *               openingDate:    { type: string, format: date }
 *               icProdCode:     { type: string }
 *               irProdCode:     { type: string }
 *               irAccNum:       { type: string }
 *               irCustName:     { type: string }
 *               brcd:           { type: number, example: 1 }
 *     responses:
 *       201:
 *         description: Existing investment linked successfully
 *       400:
 *         description: Validation error
 */
router.post('/create-existing', ctrl.createExistingInvestment);

/**
 * @swagger
 * /api/investment-master:
 *   get:
 *     summary: List all investment accounts
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: query
 *         name: brcd
 *         schema: { type: number }
 *       - in: query
 *         name: stage
 *         schema: { type: number }
 *         description: 0=Pending, 1=Approved
 *     responses:
 *       200:
 *         description: List of investments
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /api/investment-master/{id}:
 *   get:
 *     summary: Get investment record by ID
 *     tags: [InvestmentMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Investment record
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/investment-master/modify:
 *   put:
 *     summary: Modify an existing investment (Stage → 1002)
 *     tags: [InvestmentMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - glCode
 *             properties:
 *               glCode:         { type: number, example: 56001 }
 *               bankName:       { type: string }
 *               branchName:     { type: string }
 *               receiptName:    { type: string }
 *               boardResNo:     { type: number }
 *               boardMeetDate:  { type: string, format: date }
 *               openingDate:    { type: string, format: date }
 *               productName:    { type: string }
 *               icProdCode:     { type: string }
 *               irProdCode:     { type: string }
 *               irAccNum:       { type: string }
 *               irCustName:     { type: string }
 *               investmentType: { type: string }
 *               brcd:           { type: number, example: 1 }
 *     responses:
 *       200:
 *         description: Modified successfully
 *       400:
 *         description: Missing required field
 */
router.put('/modify', ctrl.modifyInvestment);

/**
 * @swagger
 * /api/investment-master/authorise:
 *   post:
 *     summary: Authorise a pending investment (Stage → 1003)
 *     tags: [InvestmentMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - glCode
 *             properties:
 *               glCode: { type: number, example: 56001 }
 *               brcd:   { type: number, example: 1 }
 *     responses:
 *       200:
 *         description: Authorised successfully
 *       400:
 *         description: glCode is required
 */
router.post('/authorise', ctrl.authoriseInvestment);

/**
 * @swagger
 * /api/investment-master/delete:
 *   delete:
 *     summary: Soft-delete an investment (Stage → 1004)
 *     tags: [InvestmentMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - glCode
 *             properties:
 *               glCode: { type: number, example: 56001 }
 *               brcd:   { type: number, example: 1 }
 *     responses:
 *       200:
 *         description: Soft-deleted successfully
 *       400:
 *         description: glCode is required
 */
router.delete('/delete', ctrl.deleteInvestment);
router.get('/:id', ctrl.getById);   // ← MUST be last among GET routes

module.exports = router;