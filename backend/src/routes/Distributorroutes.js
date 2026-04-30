// // routes/distributorRoutes.js

// const express = require('express');
// const router  = express.Router();

// const {
//     createDistributor,
//     getAllDistributors,
//     getDistributorById,
//     updateDistributor,
// } = require('../controllers/distributorController');

// // ── POST   /api/distributor         → create new distributor
// // ── GET    /api/distributor         → get all (with filters + pagination)
// // ── GET    /api/distributor/:id     → get single by ID
// // ── PUT    /api/distributor/:id     → update existing distributor

// router.post('/',    createDistributor);
// router.get('/',     getAllDistributors);
// router.get('/:id',  getDistributorById);
// router.put('/:id',  updateDistributor);

// module.exports = router;
// routes/distributorRoutes.js
const express = require('express');
const router  = express.Router();

const {
    createDistributor,
    getAllDistributors,
    getDistributorById,
    updateDistributor,
} = require('../controllers/Distributorcontroller');

/**
 * @swagger
 * tags:
 *   name: Distributor Master
 *   description: Distributor / RTA master data endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Distributor:
 *       type: object
 *       properties:
 *         Distributor_ID:
 *           type: integer
 *           example: 1
 *         Distributor_Code:
 *           type: string
 *           example: DIST-001
 *         Distributor_Name:
 *           type: string
 *           example: NJ India Invest
 *         ARN_No:
 *           type: string
 *           example: ARN-110103
 *         EUIN:
 *           type: string
 *           example: E123456
 *         Sub_Broker_Code:
 *           type: string
 *           example: SB-001
 *         PAN:
 *           type: string
 *           example: AAACN1234K
 *         GSTIN:
 *           type: string
 *           example: 27AAACN1234K1ZX
 *         Commission_Type:
 *           type: string
 *           enum: [Upfront + Trail, Trail Only, Direct (No Commission)]
 *           example: Trail Only
 *         Empanelment_Date:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         Is_Active:
 *           type: integer
 *           enum: [0, 1]
 *           example: 1
 *         Created_By:
 *           type: string
 *           example: ADMIN
 *         Created_At:
 *           type: string
 *           format: date-time
 *         Modified_By:
 *           type: string
 *           example: ADMIN
 *         Modified_At:
 *           type: string
 *           format: date-time
 *
 *     DistributorInput:
 *       type: object
 *       required:
 *         - Distributor_Code
 *         - Distributor_Name
 *       properties:
 *         Distributor_Code:
 *           type: string
 *           example: DIST-003
 *         Distributor_Name:
 *           type: string
 *           example: NJ India Invest
 *         ARN_No:
 *           type: string
 *           example: ARN-110103
 *         EUIN:
 *           type: string
 *           example: E123456
 *         Sub_Broker_Code:
 *           type: string
 *           example: SB-001
 *         PAN:
 *           type: string
 *           example: AAACN1234K
 *         GSTIN:
 *           type: string
 *           example: 27AAACN1234K1ZX
 *         Commission_Type:
 *           type: string
 *           enum: [Upfront + Trail, Trail Only, Direct (No Commission)]
 *           example: Upfront + Trail
 *         Empanelment_Date:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         Created_By:
 *           type: string
 *           example: ADMIN
 */

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/distributor:
 *   post:
 *     summary: Create a new Distributor
 *     tags: [Distributor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DistributorInput'
 *     responses:
 *       200:
 *         description: Distributor created successfully
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
 *                   example: Distributor created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Distributor'
 *       400:
 *         description: Validation error (missing required fields, duplicate ARN/PAN/GSTIN, bad format)
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
 *                   example: ARN No. already exists.
 *       500:
 *         description: Internal server error
 */
router.post('/', createDistributor);

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/distributor:
 *   get:
 *     summary: Get all Distributors (with optional filters & pagination)
 *     tags: [Distributor Master]
 *     parameters:
 *       - in: query
 *         name: SearchTerm
 *         schema:
 *           type: string
 *         description: Search by Name, Code, ARN or EUIN
 *         example: NJ India
 *       - in: query
 *         name: Commission_Type
 *         schema:
 *           type: string
 *           enum: [Upfront + Trail, Trail Only, Direct (No Commission)]
 *         description: Filter by commission type
 *       - in: query
 *         name: Is_Active
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filter by active status (omit for all)
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (1-based)
 *       - in: query
 *         name: PageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Records per page (max 200)
 *     responses:
 *       200:
 *         description: Paginated list of distributors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 20
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Distributor'
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllDistributors);

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/distributor/{id}:
 *   get:
 *     summary: Get a single Distributor by ID
 *     tags: [Distributor Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Distributor_ID (primary key)
 *         example: 1
 *     responses:
 *       200:
 *         description: Distributor record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Distributor'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Distributor not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getDistributorById);

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/distributor/{id}:
 *   put:
 *     summary: Update an existing Distributor
 *     tags: [Distributor Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Distributor_ID to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/DistributorInput'
 *               - type: object
 *                 properties:
 *                   Is_Active:
 *                     type: integer
 *                     enum: [0, 1]
 *                     example: 1
 *                   Modified_By:
 *                     type: string
 *                     example: ADMIN
 *     responses:
 *       200:
 *         description: Distributor updated successfully
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
 *                   example: Distributor updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Distributor'
 *       400:
 *         description: Validation error (duplicate Code/ARN/PAN/GSTIN, bad format)
 *       404:
 *         description: Distributor not found for given ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateDistributor);

module.exports = router;