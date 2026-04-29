const express = require('express');
const router = express.Router();
const callMoneyController = require('../controllers/callMoneyController');

/**
 * Call / Notice Money Placement Routes
 * Mapped to strictly fulfill the 15 requested endpoints.
 */

/**
 * @swagger
 * tags:
 *   name: Call Money
 *   description: Call and Notice Money Placement Operations
 */

/**
 * @swagger
 * /api/call-money/deals:
 *   post:
 *     summary: Create a new deal
 *     tags: [Call Money]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deal_type:
 *                 type: string
 *               transaction_type:
 *                 type: string
 *               counterparty_id:
 *                 type: integer
 *               principal_amount:
 *                 type: number
 *               interest_rate:
 *                 type: number
 *               days:
 *                 type: integer
 *               maturity_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Deal created successfully
 */
router.post('/deals', callMoneyController.createDeal);

/**
 * @swagger
 * /api/call-money/deals:
 *   get:
 *     summary: List deals (with optional filters)
 *     tags: [Call Money]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Deal status filter (e.g. DRAFT, PENDING, ACTIVE)
 *       - in: query
 *         name: counterparty_id
 *         schema:
 *           type: integer
 *         description: Filter by counterparty
 *     responses:
 *       200:
 *         description: A list of deals
 */
router.get('/deals', callMoneyController.getDeals);

/**
 * @swagger
 * /api/call-money/deals/{id}:
 *   get:
 *     summary: Get deal details
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Deal ID
 *     responses:
 *       200:
 *         description: Deal details
 */
router.get('/deals/:id', callMoneyController.getDealById);

/**
 * @swagger
 * /api/call-money/deals/{id}:
 *   put:
 *     summary: Update an existing deal
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               principal_amount:
 *                 type: number
 *               interest_rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deal updated successfully
 */
router.put('/deals/:id', callMoneyController.updateDeal);

/**
 * @swagger
 * /api/call-money/deals/{id}/submit:
 *   post:
 *     summary: Submit deal for approval (changes status to PENDING)
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal submitted successfully
 */
router.post('/deals/:id/submit', callMoneyController.submitDeal);

// 2. Approval APIs

/**
 * @swagger
 * /api/call-money/deals/{id}/approve:
 *   post:
 *     summary: Checker approves the deal (changes status to ACTIVE)
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal approved successfully
 */
router.post('/deals/:id/approve', callMoneyController.approveDeal);

/**
 * @swagger
 * /api/call-money/deals/{id}/reject:
 *   post:
 *     summary: Checker rejects the deal (changes status to REJECTED)
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deal rejected successfully
 */
router.post('/deals/:id/reject', callMoneyController.rejectDeal);

// 3. Rollover APIs

/**
 * @swagger
 * /api/call-money/deals/{id}/rollover:
 *   post:
 *     summary: Rollover a matured deal
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_rate:
 *                 type: number
 *               days:
 *                 type: integer
 *               new_maturity:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Deal rolled over successfully
 */
router.post('/deals/:id/rollover', callMoneyController.rolloverDeal);

/**
 * @swagger
 * /api/call-money/rollovers:
 *   get:
 *     summary: Get rollover history
 *     tags: [Call Money]
 *     responses:
 *       200:
 *         description: List of rollovers
 */
router.get('/rollovers', callMoneyController.getRollovers);

// 4. Interest API

/**
 * @swagger
 * /api/call-money/calculate-interest:
 *   post:
 *     summary: Calculate interest and save log
 *     tags: [Call Money]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deal_id:
 *                 type: string
 *               principal:
 *                 type: number
 *               rate:
 *                 type: number
 *               days:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Calculated interest
 */
router.post('/calculate-interest', callMoneyController.calculateInterest);

// 5. Compliance API

/**
 * @swagger
 * /api/call-money/deals/{id}/compliance-check:
 *   get:
 *     summary: Run compliance check and evaluate limits
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compliance results
 */
router.get('/deals/:id/compliance-check', callMoneyController.complianceCheck);

// 6. Counterparty APIs

/**
 * @swagger
 * /api/call-money/counterparties:
 *   get:
 *     summary: Get all counterparties
 *     tags: [Call Money]
 *     responses:
 *       200:
 *         description: List of counterparties
 */
router.get('/counterparties', callMoneyController.getCounterparties);

/**
 * @swagger
 * /api/call-money/counterparties/{id}:
 *   get:
 *     summary: Get specific counterparty
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Counterparty details
 */
router.get('/counterparties/:id', callMoneyController.getCounterpartyById);

// 7. NDS Reporting APIs

/**
 * @swagger
 * /api/call-money/nds/report:
 *   post:
 *     summary: Mark deal as reported to NDS
 *     tags: [Call Money]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deal_id:
 *                 type: string
 *               nds_ref_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully reported
 */
router.post('/nds/report', callMoneyController.reportToNds);

/**
 * @swagger
 * /api/call-money/nds/status/{deal_id}:
 *   get:
 *     summary: Get NDS reporting status for deal
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: deal_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporting status
 */
router.get('/nds/status/:deal_id', callMoneyController.getNdsStatus);

/**
 * @swagger
 * /api/call-money/deals/{id}/settle:
 *   post:
 *     summary: Settle and close a deal (receives funds, releases limit)
 *     tags: [Call Money]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_mode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deal settled successfully
 */
router.post('/deals/:id/settle', callMoneyController.settleDeal);

module.exports = router;
