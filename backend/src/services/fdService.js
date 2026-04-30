// const { sql, poolPromise } = require('../config/db');

// // POST - Insert new Fixed Deposit
// const insertFD = async (data) => {
//     const pool = await poolPromise;
//     const request = pool.request();

//     request.input('Bank_Name',         sql.NVarChar(200),  data.bank_name);
//     request.input('FD_Number',         sql.NVarChar(50),   data.fd_number   || null);
//     request.input('Deposit_Amount',    sql.Decimal(20, 2), data.deposit_amount);
//     request.input('Interest_Rate_Pct', sql.Decimal(10, 4), data.interest_rate_pct);
//     request.input('Start_Date',        sql.Date,           data.start_date);
//     request.input('Maturity_Date',     sql.Date,           data.maturity_date);
//     request.input('Interest_Type',     sql.NVarChar(20),   data.interest_type    || 'Simple');
//     request.input('Interest_Payout',   sql.NVarChar(30),   data.interest_payout  || 'On Maturity');
//     request.input('Classification',    sql.NVarChar(10),   data.classification   || 'HTM');
//     request.input('SLR_Status',        sql.NVarChar(10),   data.slr_status       || 'Non-SLR');
//     request.input('Record_Status',     sql.NVarChar(15),   data.record_status    || 'Draft');
//     request.input('Created_By',        sql.NVarChar(100),  data.created_by       || null);
//     request.output('New_ID',           sql.Int);

//     const result = await request.execute('SP_FD_Insert');

//     // SP returns the inserted row as a recordset
//     return result.recordset[0];
// };

// // GET - List all Fixed Deposits with optional filters & pagination
// const getAllFDs = async (filters = {}) => {
//     const pool = await poolPromise;
//     const request = pool.request();

//     request.input('Bank_Name',        sql.NVarChar(200), filters.bank_name        || null);
//     request.input('Classification',   sql.NVarChar(10),  filters.classification   || null);
//     request.input('SLR_Status',       sql.NVarChar(10),  filters.slr_status       || null);
//     request.input('Record_Status',    sql.NVarChar(15),  filters.record_status    || null);
//     request.input('Interest_Type',    sql.NVarChar(20),  filters.interest_type    || null);
//     request.input('Maturity_From',    sql.Date,          filters.maturity_from    || null);
//     request.input('Maturity_To',      sql.Date,          filters.maturity_to      || null);
//     request.input('Maturing_In_Days', sql.Int,           filters.maturing_in_days ? parseInt(filters.maturing_in_days) : null);
//     request.input('PageNumber',       sql.Int,           filters.page_number      ? parseInt(filters.page_number)      : 1);
//     request.input('PageSize',         sql.Int,           filters.page_size        ? parseInt(filters.page_size)        : 20);

//     const result = await request.execute('SP_FD_GetAll');

//     // SP returns 2 recordsets: [0] = total count, [1] = paginated rows
//     const totalRecords = result.recordsets[0][0]?.Total_Records ?? 0;
//     const records      = result.recordsets[1] ?? [];

//     return { totalRecords, records };
// };

// // GET BY ID - Fetch a single Fixed Deposit
// const getFDById = async (id) => {
//     const pool = await poolPromise;
//     const request = pool.request();

//     request.input('ID', sql.Int, id);

//     const result = await request.execute('SP_FD_GetByID');
//     return result.recordset[0] || null;
// };

// // PUT - Update an existing Fixed Deposit
// // NOTE: Wire up SP_FD_Update once the stored procedure is provided.
// const updateFD = async (id, data) => {
//     const pool = await poolPromise;
//     const request = pool.request();

//     request.input('ID',                sql.Int,           id);
//     request.input('Bank_Name',         sql.NVarChar(200), data.bank_name);
//     request.input('FD_Number',         sql.NVarChar(50),  data.fd_number         || null);
//     request.input('Deposit_Amount',    sql.Decimal(20,2), data.deposit_amount);
//     request.input('Interest_Rate_Pct', sql.Decimal(10,4), data.interest_rate_pct);
//     request.input('Start_Date',        sql.Date,          data.start_date);
//     request.input('Maturity_Date',     sql.Date,          data.maturity_date);
//     request.input('Interest_Type',     sql.NVarChar(20),  data.interest_type     || 'Simple');
//     request.input('Interest_Payout',   sql.NVarChar(30),  data.interest_payout   || 'On Maturity');
//     request.input('Classification',    sql.NVarChar(10),  data.classification    || 'HTM');
//     request.input('SLR_Status',        sql.NVarChar(10),  data.slr_status        || 'Non-SLR');
//     request.input('Record_Status',     sql.NVarChar(15),  data.record_status     || 'Active');
//     request.input('Updated_By',        sql.NVarChar(100), data.updated_by        || null);

//     const result = await request.execute('SP_FD_Update');
//     return result.recordset[0] || null;
// };

// module.exports = { insertFD, getAllFDs, getFDById, updateFD };
const { sql, poolPromise } = require('../config/db');

// POST - Insert new Fixed Deposit
const insertFD = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Bank_Name',         sql.NVarChar(200),  data.bank_name);
        request.input('FD_Number',         sql.NVarChar(50),   data.fd_number        || null);
        request.input('Deposit_Amount',    sql.Decimal(20, 2), parseFloat(data.deposit_amount));
        request.input('Interest_Rate_Pct', sql.Decimal(10, 4), parseFloat(data.interest_rate_pct));
        request.input('Start_Date',        sql.Date,           new Date(data.start_date));
        request.input('Maturity_Date',     sql.Date,           new Date(data.maturity_date));
        request.input('Interest_Type',     sql.NVarChar(20),   data.interest_type    || 'Simple');
        request.input('Interest_Payout',   sql.NVarChar(30),   data.interest_payout  || 'On Maturity');
        request.input('Classification',    sql.NVarChar(10),   data.classification   || 'HTM');
        request.input('SLR_Status',        sql.NVarChar(10),   data.slr_status       || 'Non-SLR');
        request.input('Record_Status',     sql.NVarChar(15),   data.record_status    || 'Draft');
        request.input('Created_By',        sql.NVarChar(100),  data.created_by       || null);
        request.output('New_ID',           sql.Int);

        const result = await request.execute('SP_FD_Insert');
        return result.recordset[0];
    } catch (err) {
        console.error('[fdService.insertFD] FULL ERROR:', err);
        throw err;
    }
};

// GET - List all Fixed Deposits with optional filters & pagination
const getAllFDs = async (filters = {}) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Bank_Name',        sql.NVarChar(200), filters.bank_name        || null);
        request.input('Classification',   sql.NVarChar(10),  filters.classification   || null);
        request.input('SLR_Status',       sql.NVarChar(10),  filters.slr_status       || null);
        request.input('Record_Status',    sql.NVarChar(15),  filters.record_status    || null);
        request.input('Interest_Type',    sql.NVarChar(20),  filters.interest_type    || null);
        request.input('Maturity_From',    sql.Date,          filters.maturity_from    ? new Date(filters.maturity_from)    : null);
        request.input('Maturity_To',      sql.Date,          filters.maturity_to      ? new Date(filters.maturity_to)      : null);
        request.input('Maturing_In_Days', sql.Int,           filters.maturing_in_days ? parseInt(filters.maturing_in_days) : null);
        request.input('PageNumber',       sql.Int,           filters.page_number      ? parseInt(filters.page_number)      : 1);
        request.input('PageSize',         sql.Int,           filters.page_size        ? parseInt(filters.page_size)        : 20);

        const result = await request.execute('SP_FD_GetAll');

        // SP returns 2 recordsets: [0] = total count row, [1] = paginated data rows
        const totalRecords = result.recordsets[0][0]?.Total_Records ?? 0;
        const records      = result.recordsets[1] ?? [];

        return { totalRecords, records };
    } catch (err) {
        console.error('[fdService.getAllFDs] FULL ERROR:', err);
        throw err;
    }
};

// GET BY ID - Fetch a single Fixed Deposit
const getFDById = async (id) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('ID', sql.Int, id);

        const result = await request.execute('SP_FD_GetByID');
        return result.recordset[0] || null;
    } catch (err) {
        console.error('[fdService.getFDById] FULL ERROR:', err);
        throw err;
    }
};

// PUT - Update an existing Fixed Deposit
const updateFD = async (id, data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('ID',                sql.Int,            id);
        request.input('Bank_Name',         sql.NVarChar(200),  data.bank_name);
        request.input('FD_Number',         sql.NVarChar(50),   data.fd_number        || null);
        request.input('Deposit_Amount',    sql.Decimal(20, 2), parseFloat(data.deposit_amount));
        request.input('Interest_Rate_Pct', sql.Decimal(10, 4), parseFloat(data.interest_rate_pct));
        request.input('Start_Date',        sql.Date,           new Date(data.start_date));
        request.input('Maturity_Date',     sql.Date,           new Date(data.maturity_date));
        request.input('Interest_Type',     sql.NVarChar(20),   data.interest_type    || 'Simple');
        request.input('Interest_Payout',   sql.NVarChar(30),   data.interest_payout  || 'On Maturity');
        request.input('Classification',    sql.NVarChar(10),   data.classification   || 'HTM');
        request.input('SLR_Status',        sql.NVarChar(10),   data.slr_status       || 'Non-SLR');
        request.input('Record_Status',     sql.NVarChar(15),   data.record_status    || 'Active');
        request.input('Updated_By',        sql.NVarChar(100),  data.updated_by       || null);

        const result = await request.execute('SP_FD_Update');
        return result.recordset[0] || null;
    } catch (err) {
        console.error('[fdService.updateFD] FULL ERROR:', err);
        throw err;
    }
};

module.exports = { insertFD, getAllFDs, getFDById, updateFD };