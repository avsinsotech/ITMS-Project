
<<<<<<< HEAD
// // src/repositories/investmentMasterRepository.js
// const { getPool, sql } = require('../config/db');

// async function getNextGLCode() {
//     const pool = await getPool();
//     const result = await pool.request().execute('dbo.sp_GetNextGLCode');
//     return result.recordset[0].NextGLCode; // SP must return MAX(GLCODE)+1
// }

// async function searchGLByCode(glCode) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('GLCode', sql.Float, glCode)
//         .execute('dbo.sp_SearchGLByCode');
//     return result.recordset;
// }

// async function searchGLByName(searchTerm) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('SearchTerm', sql.NVarChar(255), searchTerm)
//         .execute('dbo.sp_SearchGLByName');
//     return result.recordset;
// }

// // ── Hardcoded to 1 as per requirement ──────────────────────────────
// async function getNextReceiptNo(brcd) {
//     return 1;
// }

// async function getNextAccNo(brcd) {
//     return 1;
// }
// // ───────────────────────────────────────────────────────────────────

// async function insertGLMast(data) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('GLCODE',        sql.Float,        data.glCode)
//         .input('GLNAME',        sql.NVarChar(255), data.glName)
//         .input('GLGROUP',       sql.NVarChar(10),  data.glGroup      || null)
//         .input('SUBGLCODE',     sql.Float,         data.subGlCode)
//         .input('BRCD',          sql.Float,         data.brcd)
//         .input('ShortGlName',   sql.VarChar(150),  data.shortGlName  || data.glName)
//         .input('ACCNOYN',       sql.NVarChar(1),   data.accNoYn      || 'Y')
//         .input('LASTNO',        sql.BigInt,        data.lastNo       || 1)
//         .input('ImplimentDate', sql.DateTime,      data.implimentDate ? new Date(data.implimentDate) : new Date())
//         .execute('dbo.sp_InsertGLMast');
//     return result.recordset[0];
// }

// async function insertInvAccountMaster(data) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('BRCD',          sql.Float,        data.brcd)
//         .input('BankCode',      sql.Int,          data.bankCode)
//         .input('BankName',      sql.VarChar(50),  data.bankName)
//         .input('BranchCode',    sql.Int,          data.branchCode)
//         .input('Branchname',    sql.VarChar(50),  data.branchName)
//         .input('ReceiptNo',     sql.VarChar(100), String(data.receiptNo))
//         .input('ReceiptName',   sql.VarChar(100), data.receiptName  || null)
//         .input('SubGlCode',     sql.Int,          data.subGlCode)
//         .input('BoardResNo',    sql.BigInt,       data.boardResNo   || null)
//         .input('BoardMeetDate', sql.DateTime,     data.boardMeetDate ? new Date(data.boardMeetDate) : null)
//         .input('OpeningDate',   sql.DateTime,     new Date(data.openingDate))
//         .input('MID',           sql.VarChar(16),  data.mid          || null)
//         .input('CustAccno',     sql.BigInt,       data.custAccno)
//         .input('ProdCode',      sql.VarChar(100), String(data.prodCode))
//         .input('ProdName',      sql.VarChar(100), data.prodName     || null)
//         .input('CRGL',          sql.NVarChar(20), data.crGl         || null)
//         .input('RecGL',         sql.NVarChar(20), data.recGl        || null)
//         .input('CRAC',          sql.NVarChar(20), data.crAc         || null)
//         .input('RecAC',         sql.NVarChar(20), data.recAc        || null)
//         .input('PRACCNAME',     sql.NVarChar(50), data.prAccName    || null)
//         .input('GlGroup',       sql.VarChar(10),  data.glGroup      || null)
//         .input('Stage',         sql.Float,        data.stage        ?? 0)
//         .input('OtherRecNo',    sql.VarChar(50),  data.otherRecNo   || null)
//         .execute('dbo.sp_InsertInvAccountMaster');
//     return result.recordset[0];
// }

// async function getInvAccountById(id) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('ID', sql.BigInt, id)
//         .execute('dbo.sp_GetInvAccountById');
//     return result.recordset[0] || null;
// }

// async function listInvAccounts({ brcd, stage } = {}) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('BRCD',  sql.Float, brcd  ?? null)
//         .input('Stage', sql.Float, stage ?? null)
//         .execute('dbo.sp_ListInvAccounts');
//     return result.recordset;
// }

// async function getNextReceiptNoForGL(subGlCode) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('SubGlCode', sql.Int, Math.round(subGlCode))
//         .execute('dbo.sp_GetNextReceiptNoForGL');
//     return result.recordset[0].NextReceiptNo;
// }

// async function getNextAccNoForGL(subGlCode) {
//     const pool = await getPool();
//     const result = await pool.request()
//         .input('SubGlCode', sql.Int, Math.round(subGlCode))
//         .execute('dbo.sp_GetNextAccNoForGL');
//     return result.recordset[0].NextAccNo;
// }

// module.exports = {
//     getNextGLCode,
//     searchGLByCode,
//     searchGLByName,
//     getNextReceiptNo,
//     getNextAccNo,
//     insertGLMast,
//     insertInvAccountMaster,
//     getInvAccountById,
//     listInvAccounts,
//      getNextReceiptNoForGL,
//     getNextAccNoForGL,
// };
=======
>>>>>>> my-code-backup
// src/repositories/investmentMasterRepository.js
const { getPool, sql } = require('../config/db');

async function getNextGLCode() {
    const pool = await getPool();
    const result = await pool.request().execute('dbo.sp_GetNextGLCode');
    return result.recordset[0].NextGLCode; // SP must return MAX(GLCODE)+1
}

async function searchGLByCode(glCode) {
    const pool = await getPool();
    const result = await pool.request()
        .input('GLCode', sql.Float, glCode)
        .execute('dbo.sp_SearchGLByCode');
    return result.recordset;
}

async function searchGLByName(searchTerm) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SearchTerm', sql.NVarChar(255), searchTerm)
        .execute('dbo.sp_SearchGLByName');
    return result.recordset;
}

// ── Hardcoded to 1 as per requirement ──────────────────────────────
async function getNextReceiptNo(brcd) {
    return 1;
}

async function getNextAccNo(brcd) {
    return 1;
}
// ───────────────────────────────────────────────────────────────────

async function insertGLMast(data) {
    const pool = await getPool();
    const result = await pool.request()
        .input('GLCODE',        sql.Float,         data.glCode)
        .input('GLNAME',        sql.NVarChar(255),  data.glName)
        .input('GLGROUP',       sql.NVarChar(10),   data.glGroup      || null)
        .input('SUBGLCODE',     sql.Float,          data.subGlCode)
        .input('BRCD',          sql.Float,          data.brcd)
        .input('ShortGlName',   sql.VarChar(150),   data.shortGlName  || data.glName)
        .input('ACCNOYN',       sql.NVarChar(1),    data.accNoYn      || 'Y')
        .input('LASTNO',        sql.BigInt,         data.lastNo       || 1)
        .input('ImplimentDate', sql.DateTime,       data.implimentDate ? new Date(data.implimentDate) : new Date())
        .execute('dbo.sp_InsertGLMast');
    return result.recordset[0];
}

async function insertInvAccountMaster(data) {
    const pool = await getPool();
    const result = await pool.request()
        .input('BRCD',          sql.Float,         data.brcd)
        .input('BankCode',      sql.Int,           data.bankCode)
        .input('BankName',      sql.VarChar(50),   data.bankName)
        .input('BranchCode',    sql.Int,           data.branchCode)
        .input('Branchname',    sql.VarChar(50),   data.branchName)
        .input('ReceiptNo',     sql.VarChar(100),  String(data.receiptNo))
        .input('ReceiptName',   sql.VarChar(100),  data.receiptName  || null)
        .input('SubGlCode',     sql.Int,           data.subGlCode)
        .input('BoardResNo',    sql.BigInt,        data.boardResNo   || null)
        .input('BoardMeetDate', sql.DateTime,      data.boardMeetDate ? new Date(data.boardMeetDate) : null)
        .input('OpeningDate',   sql.DateTime,      new Date(data.openingDate))
        .input('MID',           sql.VarChar(16),   data.mid          || null)
        .input('CustAccno',     sql.BigInt,        data.custAccno)
        .input('ProdCode',      sql.VarChar(100),  String(data.prodCode))
        .input('ProdName',      sql.VarChar(100),  data.prodName     || null)
        .input('CRGL',          sql.NVarChar(20),  data.crGl         || null)
        .input('RecGL',         sql.NVarChar(20),  data.recGl        || null)
        .input('CRAC',          sql.NVarChar(20),  data.crAc         || null)
        .input('RecAC',         sql.NVarChar(20),  data.recAc        || null)
        .input('PRACCNAME',     sql.NVarChar(50),  data.prAccName    || null)
        .input('GlGroup',       sql.VarChar(10),   data.glGroup      || null)
        .input('Stage',         sql.Float,         data.stage        ?? 1001)   // ← default 1001
        .input('OtherRecNo',    sql.VarChar(50),   data.otherRecNo   || null)
        .execute('dbo.sp_InsertInvAccountMaster');
    return result.recordset[0];
}

async function getInvAccountById(id) {
    const pool = await getPool();
    const result = await pool.request()
        .input('ID', sql.BigInt, id)
        .execute('dbo.sp_GetInvAccountById');
    return result.recordset[0] || null;
}

// // async function listInvAccounts({ brcd, stage } = {}) {
// //     const pool = await getPool();
// //     const result = await pool.request()
// //         .input('BRCD',  sql.Float, brcd  ?? null)
// //         .input('Stage', sql.Float, stage ?? null)
// //         .execute('dbo.sp_ListInvAccounts');
// //     return result.recordset;
// // }
// // investmentMasterService.js  — updated listInvestments
// async function listInvestments(filters = {}) {
//     return repo.listInvAccounts({
//         brcd:    filters.brcd,
//         stage:   filters.stage,
//         showAll: filters.showAll || false,
//     });
// }
async function listInvAccounts({ brcd, stage, showAll = false } = {}) {
    const pool = await getPool();
    const result = await pool.request()
        .input('BRCD',    sql.Float, brcd    ?? null)
        .input('Stage',   sql.Float, stage   ?? null)
        .input('ShowAll', sql.Bit,   showAll ? 1 : 0)
        .execute('dbo.sp_ListInvAccounts');
    return result.recordset;
}
async function getNextReceiptNoForGL(subGlCode) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SubGlCode', sql.Int, Math.round(subGlCode))
        .execute('dbo.sp_GetNextReceiptNoForGL');
    return result.recordset[0].NextReceiptNo;
}

async function getNextAccNoForGL(subGlCode) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SubGlCode', sql.Int, Math.round(subGlCode))
        .execute('dbo.sp_GetNextAccNoForGL');
    return result.recordset[0].NextAccNo;
}

// ── Stage 1002: Modify ─────────────────────────────────────────────
async function modifyInvAccount(data) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SubGlCode',     sql.Int,           Math.round(data.subGlCode))
        .input('BRCD',          sql.Float,          data.brcd)
        .input('BankName',      sql.VarChar(50),    data.bankName      || null)
        .input('Branchname',    sql.VarChar(50),    data.branchName    || null)
        .input('ReceiptName',   sql.VarChar(100),   data.receiptName   || null)
        .input('BoardResNo',    sql.BigInt,         data.boardResNo    || null)
        .input('BoardMeetDate', sql.DateTime,       data.boardMeetDate ? new Date(data.boardMeetDate) : null)
        .input('OpeningDate',   sql.DateTime,       data.openingDate   ? new Date(data.openingDate)   : null)
        .input('ProdName',      sql.VarChar(100),   data.prodName      || null)
        .input('CRGL',          sql.NVarChar(20),   data.crGl          || null)
        .input('RecGL',         sql.NVarChar(20),   data.recGl         || null)
        .input('CRAC',          sql.NVarChar(20),   data.crAc          || null)
        .input('RecAC',         sql.NVarChar(20),   data.recAc         || null)
        .input('PRACCNAME',     sql.NVarChar(50),   data.prAccName     || null)
        .input('GlGroup',       sql.VarChar(10),    data.glGroup       || null)
        .input('MID',           sql.VarChar(16),    data.mid           || null)
        .execute('dbo.sp_ModifyInvAccount');        // sets Stage = 1002
    return result.recordset[0];
}

// ── Stage 1003: Authorise ──────────────────────────────────────────
async function authoriseInvAccount(subGlCode, brcd, mid) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SubGlCode', sql.Int,         Math.round(subGlCode))
        .input('BRCD',      sql.Float,       brcd)
        .input('MID',       sql.VarChar(16), mid || null)
        .execute('dbo.sp_AuthoriseInvAccount');     // sets Stage = 1003
    return result.recordset[0];
}

// ── Stage 1004: Soft Delete ────────────────────────────────────────
async function deleteInvAccount(subGlCode, brcd, mid) {
    const pool = await getPool();
    const result = await pool.request()
        .input('SubGlCode', sql.Int,         Math.round(subGlCode))
        .input('BRCD',      sql.Float,       brcd)
        .input('MID',       sql.VarChar(16), mid || null)
        .execute('dbo.sp_DeleteInvAccount');        // sets Stage = 1004
    return result.recordset[0];
}

module.exports = {
    getNextGLCode,
    searchGLByCode,
    searchGLByName,
    getNextReceiptNo,
    getNextAccNo,
    insertGLMast,
    insertInvAccountMaster,
    getInvAccountById,
    listInvAccounts,
    getNextReceiptNoForGL,
    getNextAccNoForGL,
    modifyInvAccount,
    authoriseInvAccount,
    deleteInvAccount,
};