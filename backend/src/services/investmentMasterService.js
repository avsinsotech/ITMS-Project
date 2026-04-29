// src/services/investmentMasterService.js
const repo = require('../repositories/investmentMasterRepository');

const DEFAULT_BRCD = 1; // adjust per your branch setup

/**
 * Returns the next GLCODE, ReceiptNo, and AccNo for the Add New form.
 * Called on form load so fields are pre-populated.
 */
async function getAddNewDefaults(brcd = DEFAULT_BRCD) {
    const [nextGLCode, nextReceiptNo, nextAccNo] = await Promise.all([
        repo.getNextGLCode(),
        repo.getNextReceiptNo(brcd),
        repo.getNextAccNo(brcd),
    ]);
    return { nextGLCode, nextReceiptNo, nextAccNo };
}

/**
 * Search product by code (GLCODE).
 */
async function searchProductByCode(glCode) {
    if (!glCode) throw new Error('glCode is required');
    return repo.searchGLByCode(Number(glCode));
}

/**
 * Search products by name (autocomplete).
 */
async function searchProductByName(searchTerm) {
    if (!searchTerm || searchTerm.trim().length < 1)
        throw new Error('searchTerm is required');
    return repo.searchGLByName(searchTerm.trim());
}

/**
 * Create a new Investment Term Deposit.
 *
 * Flow:
 *  1. Re-fetch MAX GLCODE from DB to guarantee no race condition.
 *  2. Insert GLMAST row for the FD product (Interest Credit GL).
 *  3. Insert AVS_InvAccountMaster row with all form fields.
 *
 * @param {object} payload  — body from the frontend Add New form
 * @param {string} mid      — maker user ID (from auth/session)
 */
async function createInvestmentAddNew(payload, mid = null, brcd = DEFAULT_BRCD) {
    // ── Validate mandatory fields ───────────────────────────────────────
    const required = ['bankName', 'openingDate', 'icProdCode', 'irProdCode', 'irAccNum'];
    for (const key of required) {
        if (!payload[key] && payload[key] !== 0) {
            throw new Error(`Missing required field: ${key}`);
        }
    }

    // ── Step 1: Get fresh next GLCODE ───────────────────────────────────
    const nextGLCode  = await repo.getNextGLCode();
    const receiptNo   = await repo.getNextReceiptNo(brcd);
    const custAccno   = await repo.getNextAccNo(brcd);

    // ── Step 2: Insert GLMAST (Interest Credit GL) ──────────────────────
    // subGlCode mirrors the new GLCODE cast to int
    // const glMastData = {
    //     glCode:       nextGLCode,
    //     glName:       payload.icProdName || payload.bankName,
    //     glGroup:      payload.investmentType || 'ITD',
    //     subGlCode:    Math.round(nextGLCode), // PK component; adjust per your convention
    //     brcd:         brcd,
    //     shortGlName:  payload.icProdName || payload.bankName,
    //     accNoYn:      'Y',
    //     lastNo:       custAccno,
    //     implimentDate: payload.openingDate,
    // };
    // ── Step 2: Insert GLMAST (Interest Credit GL) ──────────────────────
const glMastData = {
    glCode:        nextGLCode,
    glName:        payload.productName || payload.bankName,      // ← was payload.icProdName
    glGroup:       payload.investmentType || 'ITD',
    subGlCode:     Math.round(nextGLCode),
    brcd:          brcd,
    shortGlName:   payload.productName || payload.bankName,      // ← was payload.icProdName
    accNoYn:       'Y',
    lastNo:        custAccno,
    implimentDate: payload.openingDate,
};
    await repo.insertGLMast(glMastData);

    // ── Step 3: Insert AVS_InvAccountMaster ────────────────────────────
    const invData = {
        brcd,
        bankCode:      payload.bankCode      || 0,
        bankName:      payload.bankName,
        branchCode:    payload.branchCode    || 0,
        branchName:    payload.branchName    || '',
        receiptNo,
        receiptName:   payload.receiptName   || '',
        subGlCode:     Math.round(nextGLCode),
        boardResNo:    payload.boardResNo    || null,
        boardMeetDate: payload.boardMeetDate || null,
        openingDate:   payload.openingDate,
        mid,
        custAccno,
        prodCode:      payload.productCode   || String(nextGLCode),
        prodName:      payload.productName   || payload.bankName,
        crGl:          String(payload.icProdCode),   // Interest Credit GL code
        recGl:         String(payload.irProdCode),   // Interest Receivable GL code
        crAc:          payload.icAccNo       || null,
        recAc:         String(payload.irAccNum),
        prAccName:     payload.irCustName    || null,
        glGroup:       payload.investmentType || 'ITD',
        stage:         1001,                             // 0 = pending checker approval
        otherRecNo:    payload.otherRecNo    || null,
    };
    const inserted = await repo.insertInvAccountMaster(invData);

    return {
        message:    'Investment created successfully. Pending checker approval.',
        glCode:     nextGLCode,
        receiptNo,
        custAccno,
        insertedId: inserted?.InsertedID ?? null,
    };
}

/**
 * Get a single investment record by ID.
 */
async function getInvestmentById(id) {
    if (!id) throw new Error('ID is required');
    const record = await repo.getInvAccountById(Number(id));
    if (!record) throw new Error(`Investment with ID ${id} not found`);
    return record;
}

/**
 * List all investments (optionally filter by brcd / stage).
 */
async function listInvestments(filters = {}) {
    return repo.listInvAccounts(filters);
}

/**
 * Get defaults for Add Existing: looks up ReceiptNo + AccNo by GLCODE.
 * Called when user enters a GLCODE on the Add Existing form.
 */
async function getAddExistingDefaults(glCode) {
    if (!glCode) throw new Error('glCode is required');
    const subGlCode = Math.round(Number(glCode));

    const [glRows, nextReceiptNo, nextAccNo] = await Promise.all([
        repo.searchGLByCode(Number(glCode)),
        repo.getNextReceiptNoForGL(subGlCode),
        repo.getNextAccNoForGL(subGlCode),
    ]);

    if (!glRows || glRows.length === 0)
        throw new Error(`No GL record found for GLCODE ${glCode}`);

    return {
        glCode:       glRows[0].GLCODE,
        glName:       glRows[0].GLNAME,
        shortGlName:  glRows[0].ShortGlName,
        nextReceiptNo,
        nextAccNo,
    };
}

/**
 * Save Add Existing — inserts only into AVS_InvAccountMaster.
 * GLMAST is NOT touched.
 */
async function createInvestmentAddExisting(payload, mid = null, brcd = DEFAULT_BRCD) {
    const required = ['glCode', 'bankName', 'openingDate', 'icProdCode', 'irProdCode', 'irAccNum'];
    for (const key of required) {
        if (!payload[key] && payload[key] !== 0)
            throw new Error(`Missing required field: ${key}`);
    }

    const subGlCode = Math.round(Number(payload.glCode));

    // Re-fetch fresh counters at save-time to avoid race conditions
    const [nextReceiptNo, nextAccNo] = await Promise.all([
        repo.getNextReceiptNoForGL(subGlCode),
        repo.getNextAccNoForGL(subGlCode),
    ]);

    const invData = {
        brcd,
        bankCode:      payload.bankCode      || 0,
        bankName:      payload.bankName,
        branchCode:    payload.branchCode    || 0,
        branchName:    payload.branchName    || '',
        receiptNo:     nextReceiptNo,
        receiptName:   payload.receiptName   || '',
        subGlCode,
        boardResNo:    payload.boardResNo    || null,
        boardMeetDate: payload.boardMeetDate || null,
        openingDate:   payload.openingDate,
        mid,
        custAccno:     nextAccNo,
        prodCode:      String(payload.glCode),
        prodName:      payload.productName   || payload.bankName,
        crGl:          String(payload.icProdCode),
        recGl:         String(payload.irProdCode),
        crAc:          payload.icAccNo       || null,
        recAc:         String(payload.irAccNum),
        prAccName:     payload.irCustName    || null,
        glGroup:       payload.investmentType || 'ITD',
        stage:         1002,
        otherRecNo:    payload.otherRecNo    || null,
    };

    const inserted = await repo.insertInvAccountMaster(invData);

    return {
        message:    'Existing investment linked successfully. Pending checker approval.',
        glCode:     payload.glCode,
        receiptNo:  nextReceiptNo,
        custAccno:  nextAccNo,
        insertedId: inserted?.InsertedID ?? null,
    };
}

/**
 * Modify an existing investment record.
 * Stage → 1002
 */
async function modifyInvestment(payload, mid = null, brcd = DEFAULT_BRCD) {
    const required = ['glCode'];
    for (const key of required) {
        if (!payload[key] && payload[key] !== 0)
            throw new Error(`Missing required field: ${key}`);
    }

    const subGlCode = Math.round(Number(payload.glCode));
    const effectiveBrcd = payload.brcd ? Number(payload.brcd) : brcd;

    const result = await repo.modifyInvAccount({
        subGlCode,
        brcd:         effectiveBrcd,
        bankName:     payload.bankName     || null,
        branchName:   payload.branchName   || null,
        receiptName:  payload.receiptName  || null,
        boardResNo:   payload.boardResNo   || null,
        boardMeetDate:payload.boardMeetDate|| null,
        openingDate:  payload.openingDate  || null,
        prodName:     payload.productName  || null,
        crGl:         payload.icProdCode   ? String(payload.icProdCode) : null,
        recGl:        payload.irProdCode   ? String(payload.irProdCode) : null,
        crAc:         payload.icAccNo      || null,
        recAc:        payload.irAccNum     ? String(payload.irAccNum)   : null,
        prAccName:    payload.irCustName   || null,
        glGroup:      payload.investmentType || null,
        mid,
    });

    return {
        message:      'Investment modified successfully. Pending re-authorisation.',
        rowsAffected: result?.RowsAffected ?? 0,
    };
}

/**
 * Authorise a pending/modified investment.
 * Stage → 1003
 */
async function authoriseInvestment(glCode, brcd = DEFAULT_BRCD, mid = null) {
    if (!glCode) throw new Error('glCode is required');
    const subGlCode = Math.round(Number(glCode));

    const result = await repo.authoriseInvAccount(subGlCode, brcd, mid);
    return {
        message:      'Investment authorised successfully.',
        rowsAffected: result?.RowsAffected ?? 0,
    };
}

/**
 * Soft-delete an investment record.
 * Stage → 1004  (record is never physically removed)
 */
async function deleteInvestment(glCode, brcd = DEFAULT_BRCD, mid = null) {
    if (!glCode) throw new Error('glCode is required');
    const subGlCode = Math.round(Number(glCode));

    const result = await repo.deleteInvAccount(subGlCode, brcd, mid);
    return {
        message:      'Investment deleted (soft) successfully.',
        rowsAffected: result?.RowsAffected ?? 0,
    };
}

// module.exports = {
//     getAddNewDefaults,
//     searchProductByCode,
//     searchProductByName,
//     createInvestmentAddNew,
//     getInvestmentById,
//     listInvestments,
//      getAddExistingDefaults,
//     createInvestmentAddExisting,
// };
module.exports = {
    getAddNewDefaults,
    searchProductByCode,
    searchProductByName,
    createInvestmentAddNew,
    getInvestmentById,
    listInvestments,
    getAddExistingDefaults,
    createInvestmentAddExisting,
    modifyInvestment,       // ← new
    authoriseInvestment,    // ← new
    deleteInvestment,       // ← new
};