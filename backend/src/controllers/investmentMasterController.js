// // src/controllers/investmentMasterController.js
// const svc = require('../services/investmentMasterService');

// /**
//  * GET /api/investment-master/defaults?brcd=1
//  * Returns next GLCODE, ReceiptNo, AccNo for pre-populating the Add New form.
//  */
// async function getAddNewDefaults(req, res, next) {
//     try {
//         const brcd = req.query.brcd ? Number(req.query.brcd) : undefined;
//         const data = await svc.getAddNewDefaults(brcd);
//         res.json({ success: true, data });
//     } catch (err) {
//         next(err);
//     }
// }

// /**
//  * GET /api/investment-master/gl/search?code=702
//  * Lookup a GL product by its GLCODE.
//  */
// async function searchGLByCode(req, res, next) {
//     try {
//         const { code } = req.query;
//         if (!code) return res.status(400).json({ success: false, message: 'code query param is required' });
//         const data = await svc.searchProductByCode(code);
//         res.json({ success: true, data });
//     } catch (err) {
//         next(err);
//     }
// }

// /**
//  * GET /api/investment-master/gl/search-name?name=interest
//  * Autocomplete search by GL name.
//  */
// async function searchGLByName(req, res, next) {
//     try {
//         const { name } = req.query;
//         if (!name) return res.status(400).json({ success: false, message: 'name query param is required' });
//         const data = await svc.searchProductByName(name);
//         res.json({ success: true, data });
//     } catch (err) {
//         next(err);
//     }
// }

// /**
//  * POST /api/investment-master/create
//  * Creates a new Term Deposit investment (Add New mode).
//  *
//  * Body (JSON):
//  * {
//  *   investmentType : "itd",
//  *   productCode    : "56002",      // from form (may differ from auto-increment)
//  *   productName    : "...",
//  *   bankName       : "SBI",
//  *   bankCode       : 1,
//  *   branchName     : "Mumbai",
//  *   branchCode     : 1,
//  *   receiptName    : "...",
//  *   boardResNo     : 1002,
//  *   boardMeetDate  : "2024-06-04",
//  *   openingDate    : "2024-06-04",
//  *   icProdCode     : "702",
//  *   icProdName     : "INTERST RECEIVABLE ON OTHER BANK FDR",
//  *   irProdCode     : "102",
//  *   irProdName     : "IRD - IRD INTEREST RECD",
//  *   irAccNum       : "1",
//  *   irCustName     : "Customer Name"
//  * }
//  */
// async function createInvestment(req, res, next) {
//     try {
//         const payload = req.body;
//         // mid could come from JWT/session; fallback to body
//         const mid  = req.user?.userId || req.body.mid || null;
//         const brcd = req.body.brcd    ? Number(req.body.brcd) : undefined;

//         const result = await svc.createInvestmentAddNew(payload, mid, brcd);
//         res.status(201).json({ success: true, data: result });
//     } catch (err) {
//         next(err);
//     }
// }

// /**
//  * GET /api/investment-master/:id
//  * Fetch a single investment record by ID.
//  */
// async function getById(req, res, next) {
//     try {
//         const data = await svc.getInvestmentById(req.params.id);
//         res.json({ success: true, data });
//     } catch (err) {
//         if (err.message.includes('not found')) {
//             return res.status(404).json({ success: false, message: err.message });
//         }
//         next(err);
//     }
// }

// /**
//  * GET /api/investment-master?brcd=1&stage=0
//  * List all investments.
//  */
// async function list(req, res, next) {
//     try {
//         const filters = {
//             brcd:  req.query.brcd  !== undefined ? Number(req.query.brcd)  : undefined,
//             stage: req.query.stage !== undefined ? Number(req.query.stage) : undefined,
//         };
//         const data = await svc.listInvestments(filters);
//         res.json({ success: true, data });
//     } catch (err) {
//         next(err);
//     }
// }
// /**
//  * GET /api/investment-master/existing-defaults?glCode=702
//  * Returns GL name + next ReceiptNo + AccNo for the Add Existing form.
//  */
// async function getAddExistingDefaults(req, res, next) {
//     try {
//         const { glCode } = req.query;
//         if (!glCode)
//             return res.status(400).json({ success: false, message: 'glCode query param is required' });
//         const data = await svc.getAddExistingDefaults(glCode);
//         res.json({ success: true, data });
//     } catch (err) {
//         if (err.message.includes('No GL record found'))
//             return res.status(404).json({ success: false, message: err.message });
//         next(err);
//     }
// }

// /**
//  * POST /api/investment-master/create-existing
//  * Links an existing GL to a new AVS_InvAccountMaster row.
//  * Does NOT write to GLMAST.
//  */
// async function createExistingInvestment(req, res, next) {
//     try {
//         const payload = req.body;
//         const mid  = req.user?.userId || req.body.mid || null;
//         const brcd = req.body.brcd ? Number(req.body.brcd) : undefined;
//         const result = await svc.createInvestmentAddExisting(payload, mid, brcd);
//         res.status(201).json({ success: true, data: result });
//     } catch (err) {
//         next(err);
//     }
// }

// module.exports = {
//     getAddNewDefaults,
//     searchGLByCode,
//     searchGLByName,
//     createInvestment,
//     getById,
//     list,
//      getAddExistingDefaults,
//     createExistingInvestment,
// };
// src/controllers/investmentMasterController.js
const svc = require('../services/investmentMasterService');

/**
 * GET /api/investment-master/defaults?brcd=1
 * Returns next GLCODE, ReceiptNo, AccNo for pre-populating the Add New form.
 */
async function getAddNewDefaults(req, res, next) {
    try {
        const brcd = req.query.brcd ? Number(req.query.brcd) : undefined;
        const data = await svc.getAddNewDefaults(brcd);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /api/investment-master/gl/search?code=702
 * Lookup a GL product by its GLCODE.
 */
async function searchGLByCode(req, res, next) {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).json({ success: false, message: 'code query param is required' });
        const data = await svc.searchProductByCode(code);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /api/investment-master/gl/search-name?name=interest
 * Autocomplete search by GL name.
 */
async function searchGLByName(req, res, next) {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ success: false, message: 'name query param is required' });
        const data = await svc.searchProductByName(name);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/investment-master/create
 * Creates a new Term Deposit investment (Add New mode).
 * Stage → 1001
 *
 * Body (JSON):
 * {
 *   investmentType : "itd",
 *   productCode    : "56002",
 *   productName    : "...",
 *   bankName       : "SBI",
 *   bankCode       : 1,
 *   branchName     : "Mumbai",
 *   branchCode     : 1,
 *   receiptName    : "...",
 *   boardResNo     : 1002,
 *   boardMeetDate  : "2024-06-04",
 *   openingDate    : "2024-06-04",
 *   icProdCode     : "702",
 *   icProdName     : "INTERST RECEIVABLE ON OTHER BANK FDR",
 *   irProdCode     : "102",
 *   irProdName     : "IRD - IRD INTEREST RECD",
 *   irAccNum       : "1",
 *   irCustName     : "Customer Name"
 * }
 */
async function createInvestment(req, res, next) {
    try {
        const payload = req.body;
        const mid  = req.user?.userId || req.body.mid || null;
        const brcd = req.body.brcd    ? Number(req.body.brcd) : undefined;

        const result = await svc.createInvestmentAddNew(payload, mid, brcd);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /api/investment-master/:id
 * Fetch a single investment record by ID.
 */
async function getById(req, res, next) {
    try {
        const data = await svc.getInvestmentById(req.params.id);
        res.json({ success: true, data });
    } catch (err) {
        if (err.message.includes('not found')) {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
}

/**
 * GET /api/investment-master?brcd=1&stage=1001
 * List all investments. Filter by stage: 1001=Pending, 1002=Modified, 1003=Authorised, 1004=Deleted
 */
// async function list(req, res, next) {
//     try {
//         const filters = {
//             brcd:  req.query.brcd  !== undefined ? Number(req.query.brcd)  : undefined,
//             stage: req.query.stage !== undefined ? Number(req.query.stage) : undefined,
//         };
//         const data = await svc.listInvestments(filters);
//         res.json({ success: true, data });
//     } catch (err) {
//         next(err);
//     }
// }
// investmentMasterController.js  — updated list()
async function list(req, res, next) {
    try {
        const filters = {
            brcd:    req.query.brcd    !== undefined ? Number(req.query.brcd)    : undefined,
            stage:   req.query.stage   !== undefined ? Number(req.query.stage)   : undefined,
            showAll: req.query.showAll === 'true',   // ?showAll=true for admin view
        };
        const data = await svc.listInvestments(filters);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
}

/**
 * GET /api/investment-master/existing-defaults?glCode=702
 * Returns GL name + next ReceiptNo + AccNo for the Add Existing form.
 */
async function getAddExistingDefaults(req, res, next) {
    try {
        const { glCode } = req.query;
        if (!glCode)
            return res.status(400).json({ success: false, message: 'glCode query param is required' });
        const data = await svc.getAddExistingDefaults(glCode);
        res.json({ success: true, data });
    } catch (err) {
        if (err.message.includes('No GL record found'))
            return res.status(404).json({ success: false, message: err.message });
        next(err);
    }
}

/**
 * POST /api/investment-master/create-existing
 * Links an existing GL to a new AVS_InvAccountMaster row.
 * Does NOT write to GLMAST.
 * Stage → 1001
 */
async function createExistingInvestment(req, res, next) {
    try {
        const payload = req.body;
        const mid  = req.user?.userId || req.body.mid || null;
        const brcd = req.body.brcd ? Number(req.body.brcd) : undefined;
        const result = await svc.createInvestmentAddExisting(payload, mid, brcd);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/investment-master/modify
 * Updates an existing investment record.
 * Stage → 1002
 *
 * Body (JSON):
 * {
 *   glCode        : "56001",
 *   bankName      : "SBI",
 *   branchName    : "Mumbai",
 *   receiptName   : "...",
 *   boardResNo    : 1002,
 *   boardMeetDate : "2024-06-04",
 *   openingDate   : "2024-06-04",
 *   productName   : "...",
 *   icProdCode    : "702",
 *   irProdCode    : "102",
 *   irAccNum      : "1",
 *   irCustName    : "Customer Name",
 *   investmentType: "INV",
 *   brcd          : 1
 * }
 */
async function modifyInvestment(req, res, next) {
    try {
        const mid  = req.user?.userId || req.body.mid || null;
        const brcd = req.body.brcd ? Number(req.body.brcd) : undefined;
        const result = await svc.modifyInvestment(req.body, mid, brcd);
        res.json({ success: true, data: result });
    } catch (err) {
        if (err.message.includes('Missing required field')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
}

/**
 * POST /api/investment-master/authorise
 * Authorises a pending investment record.
 * Stage → 1003
 *
 * Body (JSON):
 * {
 *   glCode : "56001",
 *   brcd   : 1
 * }
 */
async function authoriseInvestment(req, res, next) {
    try {
        const { glCode, brcd } = req.body;
        if (!glCode)
            return res.status(400).json({ success: false, message: 'glCode is required' });
        const mid  = req.user?.userId || req.body.mid || null;
        const result = await svc.authoriseInvestment(glCode, brcd ? Number(brcd) : undefined, mid);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/investment-master/delete
 * Soft-deletes an investment record (Stage = 1004). Record is never physically removed.
 * Stage → 1004
 *
 * Body (JSON):
 * {
 *   glCode : "56001",
 *   brcd   : 1
 * }
 */
async function deleteInvestment(req, res, next) {
    try {
        const { glCode, brcd } = req.body;
        if (!glCode)
            return res.status(400).json({ success: false, message: 'glCode is required' });
        const mid  = req.user?.userId || req.body.mid || null;
        const result = await svc.deleteInvestment(glCode, brcd ? Number(brcd) : undefined, mid);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAddNewDefaults,
    searchGLByCode,
    searchGLByName,
    createInvestment,
    getById,
    list,
    getAddExistingDefaults,
    createExistingInvestment,
    modifyInvestment,
    authoriseInvestment,
    deleteInvestment,
};