const express = require('express');
const router = express.Router();
const multer = require('multer');
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../utils/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Apply authMiddleware to all purchase routes
router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         Member:
 *           type: string
 *         Member_Number:
 *           type: string
 *         Trade_Number:
 *           type: string
 *         Trade_Date:
 *           type: string
 *         Security:
 *           type: string
 *         Amount:
 *           type: string
 *         Portfolio:
 *           type: string
 */

/**
 * @swagger
 * /api/purchase/upload-excel:
 *   post:
 *     summary: Upload Excel file to UPSERT records in purchase table
 *     tags: [Purchase]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Excel processed successfully
 */
router.post('/upload-excel', upload.single('file'), purchaseController.uploadExcel);

/**
 * @swagger
 * /api/purchase:
 *   get:
 *     summary: Retrieve all purchase records
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: A list of purchase records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */
router.get('/', purchaseController.getAll);

/**
 * @swagger
 * /api/purchase/{id}:
 *   get:
 *     summary: Get a purchase record by internal ID or Trade Number
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Either the numeric internal ID or the Trade Number string
 *     responses:
 *       200:
 *         description: Purchase record retrieved successfully
 *       404:
 *         description: Purchase not found
 */
router.get('/:id', purchaseController.getById);

/**
 * @swagger
 * /api/purchase/authorize:
 *   post:
 *     summary: Authorize purchase records and generate unique set number
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               ids: [364]
 *     responses:
 *       200:
 *         description: Successfully authorized
 */
router.post('/authorize', purchaseController.authorize);

/**
 * @swagger
 * /api/purchase/{id}:
 *   delete:
 *     summary: Delete a purchase record by ID
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the purchase record to delete
 *     responses:
 *       200:
 *         description: Purchase record deleted successfully
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', purchaseController.deleteById);

/**
 * @swagger
 * /api/purchase/set/{postset}:
 *   get:
 *     summary: Get purchase records by postset (Set Number)
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: postset
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase records retrieved successfully
 */
router.get('/set/:postset', purchaseController.getByPostset);

/**
 * @swagger
 * /api/purchase/prodcode/{secType}:
 *   get:
 *     summary: Get ProdCode from GLMAST by Sec Type (GLNAME)
 *     tags: [Purchase]
 *     parameters:
 *       - in: path
 *         name: secType
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product code retrieved
 */
router.get('/prodcode/:secType', purchaseController.getProductCodeBySecType);

router.get('/securities/:prodCode', purchaseController.getSecuritiesByProdCode);

module.exports = router;
