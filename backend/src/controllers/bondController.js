const bondService = require('../services/bondService');

// POST /api/bond
const createBond = async (req, res) => {
    try {
        const {
            bond_name, issuer, isin, face_value,
            purchase_price, quantity, coupon_pct,
            purchase_date, maturity_date
        } = req.body;

        if (!bond_name || !issuer || !isin || !face_value || !purchase_price ||
            !quantity || !coupon_pct || !purchase_date || !maturity_date) {
            return res.status(400).json({
                success: false,
                message: 'bond_name, issuer, isin, face_value, purchase_price, quantity, coupon_pct, purchase_date, and maturity_date are required.'
            });
        }

        const record = await bondService.insertBond(req.body);

        return res.status(201).json({
            success: true,
            message: 'Bond Investment created successfully.',
            data: record
        });
    } catch (err) {
        console.error('[createBond]', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null
        });
    }
};

// GET /api/bond
const getAllBonds = async (req, res) => {
    try {
        const filters = {
            bond_name:        req.query.bond_name        || null,
            issuer:           req.query.issuer           || null,
            isin:             req.query.isin             || null,
            classification:   req.query.classification   || null,
            slr_status:       req.query.slr_status       || null,
            record_status:    req.query.record_status    || null,
            maturity_from:    req.query.maturity_from    || null,
            maturity_to:      req.query.maturity_to      || null,
            maturing_in_days: req.query.maturing_in_days || null,
            page_number:      req.query.page_number      || 1,
            page_size:        req.query.page_size        || 20
        };

        const { totalRecords, records } = await bondService.getAllBonds(filters);

        return res.status(200).json({
            success: true,
            total_records: totalRecords,
            page_number: parseInt(filters.page_number),
            page_size: parseInt(filters.page_size),
            data: records
        });
    } catch (err) {
        console.error('[getAllBonds]', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null
        });
    }
};

// GET /api/bond/:id
const getBondById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID.' });
        }

        const record = await bondService.getBondById(id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `Bond Investment not found for ID: ${id}`
            });
        }

        return res.status(200).json({ success: true, data: record });
    } catch (err) {
        console.error('[getBondById]', err);
        if (err.message && err.message.toLowerCase().includes('not found')) {
            return res.status(404).json({ success: false, message: err.message });
        }
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null
        });
    }
};

// PUT /api/bond/:id
const updateBond = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID.' });
        }

        const {
            bond_name, issuer, isin, face_value,
            purchase_price, quantity, coupon_pct,
            purchase_date, maturity_date
        } = req.body;

        if (!bond_name || !issuer || !isin || !face_value || !purchase_price ||
            !quantity || !coupon_pct || !purchase_date || !maturity_date) {
            return res.status(400).json({
                success: false,
                message: 'bond_name, issuer, isin, face_value, purchase_price, quantity, coupon_pct, purchase_date, and maturity_date are required.'
            });
        }

        const record = await bondService.updateBond(id, req.body);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `Bond Investment not found for ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Bond Investment updated successfully.',
            data: record
        });
    } catch (err) {
        console.error('[updateBond]', err);
        if (err.message && err.message.toLowerCase().includes('not found')) {
            return res.status(404).json({ success: false, message: err.message });
        }
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null
        });
    }
};

module.exports = { createBond, getAllBonds, getBondById, updateBond };