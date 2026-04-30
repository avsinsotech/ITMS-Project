const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API endpoints for generating investment and holding reports
 */

/**
 * @swagger
 * /api/reports/g-security/details:
 *   get:
 *     summary: G-Sec holding details
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: wDate
 *         schema: { type: string, format: date }
 *         description: As on date (YYYY-MM-DD)
 *       - in: query
 *         name: prdcode
 *         schema: { type: string }
 *       - in: query
 *         name: isin
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         example: "0"
 *     responses:
 *       200:
 *         description: Detailed holding report data
 */
router.get('/g-security/details', (req, res) => {
    req.query.type = 'ALL';
    reportController.getGSecurityReport(req, res);
});

/**
 * @swagger
 * /api/reports/g-security/summary:
 *   get:
 *     summary: G-Sec holding summary
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: wDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: prdcode
 *         schema: { type: string }
 *       - in: query
 *         name: isin
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         example: "0"
 *     responses:
 *       200:
 *         description: Holding summary report data
 */
router.get('/g-security/summary', (req, res) => {
    req.query.type = 'AllSummary';
    reportController.getGSecurityReport(req, res);
});

/**
 * @swagger
 * /api/reports/g-security/date-wise:
 *   get:
 *     summary: Date wise holding position
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: wDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: prdcode
 *         schema: { type: string }
 *       - in: query
 *         name: isin
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         example: "0"
 *     responses:
 *       200:
 *         description: Date wise position report data
 */
router.get('/g-security/date-wise', (req, res) => {
    req.query.type = 'AllSummary';
    reportController.getGSecurityReport(req, res);
});

module.exports = router;