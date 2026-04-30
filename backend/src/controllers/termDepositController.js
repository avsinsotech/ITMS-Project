
// src/controllers/termDepositController.js
const { createTermDeposit, updateTermDeposit, listTermDeposits } = require('../services/termDepositService');
const { validateGLCode } = require('../repositories/termDepositRepository');

/**
 * GET /api/term-deposit/validate-gl?glCode=56015
 *
 * Called on Product Code field blur to check GLMAST GLGROUP = 'INV'
 */
async function validateGL(req, res, next) {
    try {
        const { glCode } = req.query;
        if (!glCode) {
            return res.status(400).json({ success: false, message: 'glCode query param is required.' });
        }

        const rows = await validateGLCode(glCode);
        if (!rows || rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: `Invalid Product Code: ${glCode}. GL Group is not 'INV'.`,
                data:    [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Valid GL Code.',
            data:    rows,
        });
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/term-deposit/create
 */
async function createDeposit(req, res, next) {
    try {
        const {
            brcd, custNo, custAccNo,
            glCode, subGlCode,
            period, periodType,
            rateOfInt, principleAmt, interestAmt, maturityAmt,
            intPayOut,
            openingDate, dueDate, entryDate,
            paymentMode,
        } = req.body;

        const required = {
            brcd, custNo, custAccNo,
            glCode, subGlCode,
            period, periodType,
            rateOfInt, principleAmt, interestAmt, maturityAmt,
            intPayOut,
            openingDate, dueDate, entryDate,
            paymentMode,
        };

        const missing = Object.entries(required)
            .filter(([, v]) => v === undefined || v === null || v === '')
            .map(([k]) => k);

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(', ')}`,
            });
        }

        const result = await createTermDeposit(req.body);
        return res.status(201).json(result);

    } catch (err) {
        if (err.status === 400) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
}

/**
 * PUT /api/term-deposit/update/:id
 */
async function updateDeposit(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Valid numeric ID param is required.' });
        }

        const {
            period, periodUnit,
            rateOfInt, principleAmt, interestAmt, maturityAmt,
            intPayOut, dueDate,
        } = req.body;

        const required = {
            period, rateOfInt, principleAmt,
            interestAmt, maturityAmt, intPayOut, dueDate,
        };

        const missing = Object.entries(required)
            .filter(([, v]) => v === undefined || v === null || v === '')
            .map(([k]) => k);

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(', ')}`,
            });
        }

        const result = await updateTermDeposit(id, req.body);
        return res.status(200).json(result);

    } catch (err) {
        if (err.status === 400) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
}

/**
 * GET /api/term-deposit/list?brcd=1
 */
async function listDeposits(req, res, next) {
    try {
        const { brcd } = req.query;
        if (!brcd) {
            return res.status(400).json({ success: false, message: 'Query param brcd is required.' });
        }
        const result = await listTermDeposits(brcd);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = { validateGL, createDeposit, updateDeposit, listDeposits };