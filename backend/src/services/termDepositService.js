// src/services/termDepositService.js
const { getPool } = require('../config/db');
const {
    validateGLCode,
    getTermDeposits,
    insertDepositMaster,
    updateDepositMaster,
    insertVoucher,
    incrementAndGetSetNo,
} = require('../repositories/termDepositRepository');

/**
 * Create a new Term Deposit.
 *
 * Steps:
 *  1. Validate GL code belongs to GLGROUP = 'INV'
 *  2. Open a DB transaction via getPool()
 *  3. Increment DaySetNo in AVS5002
 *  4. Insert into AVS_InvDepositeMaster
 *  5. Insert debit voucher in ALLVCR
 *  6. Commit — return new deposit ID + set number
 */
async function createTermDeposit(payload) {
    const {
        brcd, custNo, custAccNo,
        glCode, subGlCode,
        period, periodType,
        rateOfInt, principleAmt, interestAmt, maturityAmt,
        intPayOut,
        openingDate, dueDate, entryDate,
        paymentMode,
        intTrfSubGl, prinTrfSubGl,
        intTrfAccNo, prinTrfAccNo,
        mid, cid, vid, pcmac,
    } = payload;

    // ── Step 1: GL Code Validation ───────────────────────────────────────────
    const glRows = await validateGLCode(glCode);
    if (!glRows || glRows.length === 0) {
        const error = new Error(
            `Invalid Product Code (GL Code): ${glCode}. It does not belong to GLGROUP = 'INV'.`
        );
        error.status = 400;
        throw error;
    }

    // ── Step 2: Open transaction from the live pool ──────────────────────────
    const pool        = await getPool();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
        const data = {
            brcd, custNo, custAccNo,
            glCode, subGlCode,
            period, periodType,
            rateOfInt, principleAmt, interestAmt, maturityAmt,
            intPayOut,
            openingDate, dueDate, entryDate,
            paymentMode,
            intTrfSubGl:  intTrfSubGl  || '',
            prinTrfSubGl: prinTrfSubGl || '',
            intTrfAccNo:  intTrfAccNo  || null,
            prinTrfAccNo: prinTrfAccNo || null,
            mid, cid, vid, pcmac,
        };

        // ── Step 3: Increment DaySetNo ───────────────────────────────────────
        const setNo = await incrementAndGetSetNo(transaction, brcd, entryDate);

        // ── Step 4: Insert AVS_InvDepositeMaster ─────────────────────────────
        const depositId = await insertDepositMaster(transaction, data);

        // ── Step 5: Insert ALLVCR voucher (scrollNo = depositId) ─────────────
        await insertVoucher(transaction, data, setNo, depositId);

        // ── Step 6: Commit ───────────────────────────────────────────────────
        await transaction.commit();

        return {
            success:   true,
            message:   'Term Deposit created successfully.',
            depositId,
            setNo,
        };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

/**
 * Update an existing Term Deposit.
 *
 * Only editable fields are updated — GL Code, Account No, Opening Date
 * are intentionally locked and never modified after creation.
 */
async function updateTermDeposit(id, payload) {
    const {
        period, periodUnit,
        rateOfInt, principleAmt, interestAmt, maturityAmt,
        intPayOut, dueDate,
        intTrfSubGl, prinTrfSubGl,
        intTrfAccNo, prinTrfAccNo,
    } = payload;

    const pool        = await getPool();
    const transaction = pool.transaction();
    await transaction.begin();

    try {
        await updateDepositMaster(transaction, id, {
            period:       Number(period),
            periodType:   periodUnit === 'Days' ? 'D' : 'M',
            rateOfInt:    Number(rateOfInt),
            principleAmt: Number(principleAmt),
            interestAmt:  Number(interestAmt),
            maturityAmt:  Number(maturityAmt),
            intPayOut:    Number(intPayOut),
            dueDate,
            intTrfSubGl:  intTrfSubGl  || '',
            prinTrfSubGl: prinTrfSubGl || '',
            intTrfAccNo:  intTrfAccNo  || null,
            prinTrfAccNo: prinTrfAccNo || null,
        });

        await transaction.commit();

        return {
            success: true,
            message: 'Term Deposit updated successfully.',
        };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

/**
 * Fetch all term deposits for the grid (filtered by branch)
 */
async function listTermDeposits(brcd) {
    const records = await getTermDeposits(brcd);
    return {
        success: true,
        total:   records.length,
        data:    records,
    };
}

module.exports = { createTermDeposit, updateTermDeposit, listTermDeposits };