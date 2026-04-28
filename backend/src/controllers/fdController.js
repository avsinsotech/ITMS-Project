// const fdService = require('../services/fdService');

// // POST /api/fd
// const createFD = async (req, res) => {
//     try {
//         const {
//             bank_name,
//             deposit_amount,
//             interest_rate_pct,
//             start_date,
//             maturity_date
//         } = req.body;

//         // Required field validation
//         if (!bank_name || !deposit_amount || !interest_rate_pct || !start_date || !maturity_date) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'bank_name, deposit_amount, interest_rate_pct, start_date, and maturity_date are required.'
//             });
//         }

//         const record = await fdService.insertFD(req.body);

//         return res.status(201).json({
//             success: true,
//             message: 'Fixed Deposit created successfully.',
//             data: record
//         });
//     } catch (err) {
//         console.error('[createFD]', err.message);
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'Internal server error.'
//         });
//     }
// };

// // GET /api/fd
// const getAllFDs = async (req, res) => {
//     try {
//         const filters = {
//             bank_name:        req.query.bank_name        || null,
//             classification:   req.query.classification   || null,
//             slr_status:       req.query.slr_status       || null,
//             record_status:    req.query.record_status    || null,
//             interest_type:    req.query.interest_type    || null,
//             maturity_from:    req.query.maturity_from    || null,
//             maturity_to:      req.query.maturity_to      || null,
//             maturing_in_days: req.query.maturing_in_days || null,
//             page_number:      req.query.page_number      || 1,
//             page_size:        req.query.page_size        || 20
//         };

//         const { totalRecords, records } = await fdService.getAllFDs(filters);

//         return res.status(200).json({
//             success: true,
//             total_records: totalRecords,
//             page_number: parseInt(filters.page_number),
//             page_size: parseInt(filters.page_size),
//             data: records
//         });
//     } catch (err) {
//         console.error('[getAllFDs]', err.message);
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'Internal server error.'
//         });
//     }
// };

// // GET /api/fd/:id
// const getFDById = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id);

//         if (isNaN(id)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID.' });
//         }

//         const record = await fdService.getFDById(id);

//         if (!record) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Fixed Deposit not found for ID: ${id}`
//             });
//         }

//         return res.status(200).json({ success: true, data: record });
//     } catch (err) {
//         console.error('[getFDById]', err.message);
//         // SP raises a "not found" error — surface it as 404
//         if (err.message && err.message.includes('not found')) {
//             return res.status(404).json({ success: false, message: err.message });
//         }
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'Internal server error.'
//         });
//     }
// };

// // PUT /api/fd/:id
// const updateFD = async (req, res) => {
//     try {
//         const id = parseInt(req.params.id);

//         if (isNaN(id)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID.' });
//         }

//         const {
//             bank_name,
//             deposit_amount,
//             interest_rate_pct,
//             start_date,
//             maturity_date
//         } = req.body;

//         if (!bank_name || !deposit_amount || !interest_rate_pct || !start_date || !maturity_date) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'bank_name, deposit_amount, interest_rate_pct, start_date, and maturity_date are required.'
//             });
//         }

//         const record = await fdService.updateFD(id, req.body);

//         if (!record) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Fixed Deposit not found for ID: ${id}`
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Fixed Deposit updated successfully.',
//             data: record
//         });
//     } catch (err) {
//         console.error('[updateFD]', err.message);
//         if (err.message && err.message.includes('not found')) {
//             return res.status(404).json({ success: false, message: err.message });
//         }
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'Internal server error.'
//         });
//     }
// };

// module.exports = { createFD, getAllFDs, getFDById, updateFD };
const fdService = require('../services/fdService');

// POST /api/fd
const createFD = async (req, res) => {
    try {
        const { bank_name, deposit_amount, interest_rate_pct, start_date, maturity_date } = req.body;

        if (!bank_name || !deposit_amount || !interest_rate_pct || !start_date || !maturity_date) {
            return res.status(400).json({
                success: false,
                message: 'bank_name, deposit_amount, interest_rate_pct, start_date, and maturity_date are required.'
            });
        }

        const record = await fdService.insertFD(req.body);

        return res.status(201).json({
            success: true,
            message: 'Fixed Deposit created successfully.',
            data: record
        });
    } catch (err) {
        console.error('[createFD]', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null   // surfaces the raw SQL/SP error
        });
    }
};

// GET /api/fd
const getAllFDs = async (req, res) => {
    try {
        const filters = {
            bank_name:        req.query.bank_name        || null,
            classification:   req.query.classification   || null,
            slr_status:       req.query.slr_status       || null,
            record_status:    req.query.record_status    || null,
            interest_type:    req.query.interest_type    || null,
            maturity_from:    req.query.maturity_from    || null,
            maturity_to:      req.query.maturity_to      || null,
            maturing_in_days: req.query.maturing_in_days || null,
            page_number:      req.query.page_number      || 1,
            page_size:        req.query.page_size        || 20
        };

        const { totalRecords, records } = await fdService.getAllFDs(filters);

        return res.status(200).json({
            success: true,
            total_records: totalRecords,
            page_number: parseInt(filters.page_number),
            page_size: parseInt(filters.page_size),
            data: records
        });
    } catch (err) {
        console.error('[getAllFDs]', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error.',
            detail: err.originalError?.message || null
        });
    }
};

// GET /api/fd/:id
const getFDById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID.' });
        }

        const record = await fdService.getFDById(id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `Fixed Deposit not found for ID: ${id}`
            });
        }

        return res.status(200).json({ success: true, data: record });
    } catch (err) {
        console.error('[getFDById]', err);
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

// PUT /api/fd/:id
const updateFD = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID.' });
        }

        const { bank_name, deposit_amount, interest_rate_pct, start_date, maturity_date } = req.body;

        if (!bank_name || !deposit_amount || !interest_rate_pct || !start_date || !maturity_date) {
            return res.status(400).json({
                success: false,
                message: 'bank_name, deposit_amount, interest_rate_pct, start_date, and maturity_date are required.'
            });
        }

        const record = await fdService.updateFD(id, req.body);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `Fixed Deposit not found for ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fixed Deposit updated successfully.',
            data: record
        });
    } catch (err) {
        console.error('[updateFD]', err);
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

module.exports = { createFD, getAllFDs, getFDById, updateFD };