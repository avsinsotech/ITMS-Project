const express = require('express');
const router = express.Router();
const { createAMC, getAllAMCs, getAMCById, updateAMC } = require('../controllers/Amccontroller');

/**
 * @swagger
 * tags:
 *   name: AMC Master
 *   description: Asset Management Company master data endpoints
 */

/**
 * @swagger
 * /api/amc:
 *   post:
 *     summary: Create a new AMC
 *     tags: [AMC Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - AMC_Code
 *               - AMC_Name
 *             properties:
 *               AMC_Code:                   { type: string, example: 'AMC-007' }
 *               AMC_Name:                   { type: string, example: 'SBI Funds Management Ltd.' }
 *               AMFI_Reg_No:                { type: string, example: 'ARN-SBI001' }
 *               SEBI_Reg_No:                { type: string, example: 'MF/034/87/1' }
 *               Trustee_Company:            { type: string, example: 'SBI Mutual Fund Trustee Co.' }
 *               PAN:                        { type: string, example: 'AAATS1140C' }
 *               GSTIN:                      { type: string, example: '27AAATS1140C1ZL' }
 *               AMC_Group_Exposure_Cap_Pct: { type: number, example: 30 }
 *               RTA:                        { type: string, enum: [CAMS, KFintech, 'Sundaram BNP Paribas'], example: 'CAMS' }
 *               Created_By:                 { type: string, example: 'ADMIN' }
 *     responses:
 *       201:
 *         description: AMC created successfully
 *       400:
 *         description: Validation error or duplicate entry
 */
router.post('/', createAMC);

/**
 * @swagger
 * /api/amc:
 *   get:
 *     summary: Get all AMCs with optional filters and pagination
 *     tags: [AMC Master]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema: { type: integer, enum: [0, 1] }
 *         description: Filter by active status (1=active, 0=inactive, omit for all)
 *       - in: query
 *         name: rta
 *         schema: { type: string }
 *         description: Filter by RTA (e.g. CAMS, KFintech)
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by AMC name or code
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: page_size
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated list of AMCs
 */
router.get('/', getAllAMCs);

/**
 * @swagger
 * /api/amc/{id}:
 *   get:
 *     summary: Get a single AMC by ID
 *     tags: [AMC Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: AMC primary key (AMC_ID)
 *     responses:
 *       200:
 *         description: AMC record
 *       404:
 *         description: AMC not found
 */
router.get('/:id', getAMCById);

/**
 * @swagger
 * /api/amc/{id}:
 *   put:
 *     summary: Update an existing AMC
 *     tags: [AMC Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: AMC primary key (AMC_ID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - AMC_Code
 *               - AMC_Name
 *             properties:
 *               AMC_Code:                   { type: string }
 *               AMC_Name:                   { type: string }
 *               AMFI_Reg_No:                { type: string }
 *               SEBI_Reg_No:                { type: string }
 *               Trustee_Company:            { type: string }
 *               PAN:                        { type: string }
 *               GSTIN:                      { type: string }
 *               AMC_Group_Exposure_Cap_Pct: { type: number }
 *               RTA:                        { type: string }
 *               Is_Active:                  { type: integer, enum: [0, 1] }
 *               Modified_By:                { type: string }
 *     responses:
 *       200:
 *         description: AMC updated successfully
 *       400:
 *         description: Validation error or duplicate entry
 *       404:
 *         description: AMC not found
 */
router.put('/:id', updateAMC);

module.exports = router;