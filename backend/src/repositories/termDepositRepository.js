
// src/repositories/termDepositRepository.js
const { getPool, sql } = require('../config/db');

/**
 * Validate that the given GL code belongs to GLGROUP = 'INV'
 */
async function validateGLCode(glCode) {
    const pool = await getPool();
    const result = await pool.request()
        .input('glCode', sql.Float, glCode)
        .query(`
            SELECT GLCODE, SUBGLCODE, GLGROUP, GLNAME
            FROM   GLMAST
            WHERE  GLCODE  = @glCode
              AND  GLGROUP = 'INV'
        `);
    return result.recordset; // empty array → invalid
}

/**
 * Fetch all Term Deposit records for the grid, with BankName from GLMAST
 */
async function getTermDeposits(brcd) {
    const pool = await getPool();
    const result = await pool.request()
        .input('brcd', sql.Float, brcd)
        .query(`
            SELECT  d.ID,
                    d.BRCD,
                    d.CustNo,
                    d.CustAccNo,
                    d.SubGlCode,
                    d.Period,
                    d.PeriodType,
                    d.RateOfInt,
                    d.PrincipleAmt,
                    d.InterestAmt,
                    d.MaturityAmt,
                    d.IntPayOut,
                    d.OpeningDate,
                    d.DueDate,
                    d.AccStatus,
                    d.ReceiptNo,
                    d.EntryDate,
                    d.Stage,
                    ISNULL(g.GLNAME, '') AS BankName
            FROM    AVS_InvDepositeMaster d
            LEFT JOIN GLMAST g
                ON  g.SUBGLCODE = d.SubGlCode
                AND g.GLGROUP   = 'INV'
            WHERE   d.BRCD = @brcd
            ORDER BY d.ID DESC
        `);
    return result.recordset;
}

/**
 * Insert into AVS_InvDepositeMaster — Stage = 1001 on creation
 * Returns new ID
 */
async function insertDepositMaster(transaction, data) {
    const req = transaction.request();

    req.input('BRCD',           sql.Float,          data.brcd);
    req.input('CustNo',         sql.VarChar(16),    data.custNo);
    req.input('CustAccNo',      sql.BigInt,         data.custAccNo);
    req.input('SubGlCode',      sql.VarChar(10),    data.subGlCode);
    req.input('Period',         sql.Int,            data.period);
    req.input('PeriodType',     sql.NVarChar(4),    data.periodType);
    req.input('RateOfInt',      sql.Float,          data.rateOfInt);
    req.input('PrincipleAmt',   sql.Numeric(18, 2), data.principleAmt);
    req.input('InterestAmt',    sql.Numeric(18, 2), data.interestAmt);
    req.input('MaturityAmt',    sql.Numeric(18, 2), data.maturityAmt);
    req.input('IntPayOut',      sql.Int,            data.intPayOut);
    req.input('OpeningDate',    sql.DateTime,       new Date(data.openingDate));
    req.input('DueDate',        sql.DateTime,       new Date(data.dueDate));
    req.input('IntTrfSubGl',    sql.VarChar(10),    data.intTrfSubGl    || '');
    req.input('PrinTrfSubGl',   sql.VarChar(10),    data.prinTrfSubGl   || '');
    req.input('IntTrfAccNo',    sql.VarChar(16),    data.intTrfAccNo    || null);
    req.input('PrinTrfAccNo',   sql.VarChar(16),    data.prinTrfAccNo   || null);
    req.input('AccStatus',      sql.Int,            1);
    req.input('Stage',          sql.Float,          1001);   // ← 1001 on new record
    req.input('MID',            sql.VarChar(16),    data.mid            || null);
    req.input('CID',            sql.VarChar(16),    data.cid            || null);
    req.input('VID',            sql.VarChar(16),    data.vid            || null);
    req.input('PCMAC',          sql.NVarChar(50),   data.pcmac          || null);
    req.input('EntryDate',      sql.DateTime,       new Date(data.entryDate));
    req.input('SystemDate',     sql.DateTime,       new Date());

    const result = await req.query(`
        INSERT INTO AVS_InvDepositeMaster (
            BRCD, CustNo, CustAccNo, SubGlCode,
            Period, PeriodType, RateOfInt,
            PrincipleAmt, InterestAmt, MaturityAmt,
            IntPayOut, OpeningDate, DueDate,
            IntTrfSubGl, PrinTrfSubGl, IntTrfAccNo, PrinTrfAccNo,
            AccStatus, Stage,
            MID, CID, VID, PCMAC,
            EntryDate, SystemDate
        )
        OUTPUT INSERTED.ID
        VALUES (
            @BRCD, @CustNo, @CustAccNo, @SubGlCode,
            @Period, @PeriodType, @RateOfInt,
            @PrincipleAmt, @InterestAmt, @MaturityAmt,
            @IntPayOut, @OpeningDate, @DueDate,
            @IntTrfSubGl, @PrinTrfSubGl, @IntTrfAccNo, @PrinTrfAccNo,
            @AccStatus, @Stage,
            @MID, @CID, @VID, @PCMAC,
            @EntryDate, @SystemDate
        )
    `);

    return result.recordset[0].ID;
}

/**
 * Update AVS_InvDepositeMaster — Stage = 1002 on modification
 */
async function updateDepositMaster(transaction, id, data) {
    const req = transaction.request();

    req.input('ID',           sql.Int,            id);
    req.input('Period',       sql.Int,            data.period);
    req.input('PeriodType',   sql.NVarChar(4),    data.periodType);
    req.input('RateOfInt',    sql.Float,          data.rateOfInt);
    req.input('PrincipleAmt', sql.Numeric(18, 2), data.principleAmt);
    req.input('InterestAmt',  sql.Numeric(18, 2), data.interestAmt);
    req.input('MaturityAmt',  sql.Numeric(18, 2), data.maturityAmt);
    req.input('IntPayOut',    sql.Int,            data.intPayOut);
    req.input('DueDate',      sql.DateTime,       new Date(data.dueDate));
    req.input('IntTrfSubGl',  sql.VarChar(10),    data.intTrfSubGl    || '');
    req.input('PrinTrfSubGl', sql.VarChar(10),    data.prinTrfSubGl   || '');
    req.input('IntTrfAccNo',  sql.VarChar(16),    data.intTrfAccNo    || null);
    req.input('PrinTrfAccNo', sql.VarChar(16),    data.prinTrfAccNo   || null);
    req.input('Stage',        sql.Float,          1002);   // ← 1002 on modify

    await req.query(`
        UPDATE AVS_InvDepositeMaster SET
            Period       = @Period,
            PeriodType   = @PeriodType,
            RateOfInt    = @RateOfInt,
            PrincipleAmt = @PrincipleAmt,
            InterestAmt  = @InterestAmt,
            MaturityAmt  = @MaturityAmt,
            IntPayOut    = @IntPayOut,
            DueDate      = @DueDate,
            IntTrfSubGl  = @IntTrfSubGl,
            PrinTrfSubGl = @PrinTrfSubGl,
            IntTrfAccNo  = @IntTrfAccNo,
            PrinTrfAccNo = @PrinTrfAccNo,
            Stage        = @Stage
        WHERE ID = @ID
    `);
}

/**
 * Insert a debit voucher into ALLVCR
 */
async function insertVoucher(transaction, data, setNo, scrollNo) {
    const req = transaction.request();

    req.input('ENTRYDATE',   sql.DateTime2,     new Date(data.entryDate));
    req.input('POSTINGDATE', sql.DateTime2,     new Date(data.openingDate));
    req.input('GLCODE',      sql.Float,         data.glCode);
    req.input('SUBGLCODE',   sql.Float,         data.subGlCode);
    req.input('ACCNO',       sql.BigInt,        data.custAccNo);
    req.input('PARTICULARS', sql.NVarChar(255), `TD DEPOSIT - ACNO ${data.custAccNo}`);
    req.input('CREDIT',      sql.Numeric(13,2), 0.00);
    req.input('DEBIT',       sql.Numeric(13,2), data.principleAmt);
    req.input('PMTMODE',     sql.NVarChar(10),  data.paymentMode);
    req.input('SETNO',       sql.Float,         setNo);
    req.input('SCROLLNO',    sql.Float,         scrollNo);
    req.input('STAGE',       sql.Float,         1);
    req.input('BRCD',        sql.Float,         data.brcd);
    req.input('MID',         sql.Float,         parseFloat(data.mid)  || null);
    req.input('CID',         sql.Float,         parseFloat(data.cid)  || null);
    req.input('VID',         sql.Float,         parseFloat(data.vid)  || null);
    req.input('CUSTNO',      sql.Numeric(13,2), data.custNo);
    req.input('REFID',       sql.VarChar(100),  `TD-${data.custAccNo}-${data.entryDate}`);
    req.input('SYSTEMDATE',  sql.DateTime2,     new Date());
    req.input('ACTIVITY',    sql.Float,         1);

    await req.query(`
        INSERT INTO ALLVCR (
            ENTRYDATE, POSTINGDATE,
            GLCODE, SUBGLCODE, ACCNO,
            PARTICULARS, CREDIT, DEBIT,
            PMTMODE, SETNO, SCROLLNO,
            STAGE, BRCD,
            MID, CID, VID,
            CUSTNO, REFID, SYSTEMDATE, ACTIVITY
        ) VALUES (
            @ENTRYDATE, @POSTINGDATE,
            @GLCODE, @SUBGLCODE, @ACCNO,
            @PARTICULARS, @CREDIT, @DEBIT,
            @PMTMODE, @SETNO, @SCROLLNO,
            @STAGE, @BRCD,
            @MID, @CID, @VID,
            @CUSTNO, @REFID, @SYSTEMDATE, @ACTIVITY
        )
    `);
}

/**
 * Increment DaySetNo in AVS5002 and return the new value
 */
async function incrementAndGetSetNo(transaction, brcd, entryDate) {
    // Step 1 — update
    await transaction.request()
        .input('entryDate', sql.VarChar(20), entryDate)
        .input('brcd',      sql.VarChar(10), String(brcd))
        .query(`
            UPDATE avs5002
            SET    LastNo = (
                       SELECT MAX(LastNo) + 1
                       FROM   avs5002
                       WHERE  EntryDate     = @entryDate
                         AND  ParameterName = 'DaySetNo'
                         AND  BRCD          = @brcd
                   )
            WHERE  EntryDate     = @entryDate
              AND  ParameterName = 'DaySetNo'
              AND  BRCD          = @brcd
        `);

    // Step 2 — select the new value
    const res = await transaction.request()
        .input('entryDate2', sql.VarChar(20), entryDate)
        .input('brcd2',      sql.VarChar(10), String(brcd))
        .query(`
            SELECT LastNo
            FROM   avs5002
            WHERE  EntryDate     = @entryDate2
              AND  ParameterName = 'DaySetNo'
              AND  BRCD          = @brcd2
        `);

    return res.recordset[0]?.LastNo ?? 1;
}

module.exports = {
    validateGLCode,
    getTermDeposits,
    insertDepositMaster,
    updateDepositMaster,
    insertVoucher,
    incrementAndGetSetNo,
};