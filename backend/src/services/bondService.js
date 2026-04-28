const { sql, poolPromise } = require('../config/db');

// POST - Insert new Bond Investment
const insertBond = async (data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Bond_Name',      sql.NVarChar(200),  data.bond_name);
        request.input('Issuer',         sql.NVarChar(200),  data.issuer);
        request.input('ISIN',           sql.NVarChar(20),   data.isin);
        request.input('Face_Value',     sql.Decimal(18, 2), parseFloat(data.face_value));
        request.input('Purchase_Price', sql.Decimal(18, 6), parseFloat(data.purchase_price));
        request.input('Quantity',       sql.Decimal(18, 4), parseFloat(data.quantity));
        request.input('Coupon_Pct',     sql.Decimal(10, 4), parseFloat(data.coupon_pct));
        request.input('Yield_Pct',      sql.Decimal(10, 6), data.yield_pct ? parseFloat(data.yield_pct) : null);
        request.input('Purchase_Date',  sql.Date,           new Date(data.purchase_date));
        request.input('Maturity_Date',  sql.Date,           new Date(data.maturity_date));
        request.input('Classification', sql.NVarChar(10),   data.classification || 'HTM');
        request.input('SLR_Status',     sql.NVarChar(10),   data.slr_status     || 'SLR');
        request.input('Record_Status',  sql.NVarChar(15),   data.record_status  || 'Draft');
        request.input('Created_By',     sql.NVarChar(100),  data.created_by     || null);
        request.output('New_ID',        sql.Int);

        const result = await request.execute('SP_Bond_Insert');
        return result.recordset[0];
    } catch (err) {
        console.error('[bondService.insertBond] FULL ERROR:', err);
        throw err;
    }
};

// GET - List all Bond Investments with optional filters & pagination
const getAllBonds = async (filters = {}) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Bond_Name',        sql.NVarChar(200), filters.bond_name        || null);
        request.input('Issuer',           sql.NVarChar(200), filters.issuer           || null);
        request.input('ISIN',             sql.NVarChar(20),  filters.isin             || null);
        request.input('Classification',   sql.NVarChar(10),  filters.classification   || null);
        request.input('SLR_Status',       sql.NVarChar(10),  filters.slr_status       || null);
        request.input('Record_Status',    sql.NVarChar(15),  filters.record_status    || null);
        request.input('Maturity_From',    sql.Date,          filters.maturity_from    ? new Date(filters.maturity_from)    : null);
        request.input('Maturity_To',      sql.Date,          filters.maturity_to      ? new Date(filters.maturity_to)      : null);
        request.input('Maturing_In_Days', sql.Int,           filters.maturing_in_days ? parseInt(filters.maturing_in_days) : null);
        request.input('PageNumber',       sql.Int,           filters.page_number      ? parseInt(filters.page_number)      : 1);
        request.input('PageSize',         sql.Int,           filters.page_size        ? parseInt(filters.page_size)        : 20);

        const result = await request.execute('SP_Bond_GetAll');

        // SP returns 2 recordsets: [0] = total count row, [1] = paginated data rows
        const totalRecords = result.recordsets[0][0]?.Total_Records ?? 0;
        const records      = result.recordsets[1] ?? [];

        return { totalRecords, records };
    } catch (err) {
        console.error('[bondService.getAllBonds] FULL ERROR:', err);
        throw err;
    }
};

// GET BY ID - Fetch a single Bond Investment
const getBondById = async (id) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('ID', sql.Int, id);

        const result = await request.execute('SP_Bond_GetByID');
        return result.recordset[0] || null;
    } catch (err) {
        console.error('[bondService.getBondById] FULL ERROR:', err);
        throw err;
    }
};

// PUT - Update an existing Bond Investment
// Wire up SP_Bond_Update once the stored procedure is provided.
const updateBond = async (id, data) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('ID',             sql.Int,            id);
        request.input('Bond_Name',      sql.NVarChar(200),  data.bond_name);
        request.input('Issuer',         sql.NVarChar(200),  data.issuer);
        request.input('ISIN',           sql.NVarChar(20),   data.isin);
        request.input('Face_Value',     sql.Decimal(18, 2), parseFloat(data.face_value));
        request.input('Purchase_Price', sql.Decimal(18, 6), parseFloat(data.purchase_price));
        request.input('Quantity',       sql.Decimal(18, 4), parseFloat(data.quantity));
        request.input('Coupon_Pct',     sql.Decimal(10, 4), parseFloat(data.coupon_pct));
        request.input('Yield_Pct',      sql.Decimal(10, 6), data.yield_pct ? parseFloat(data.yield_pct) : null);
        request.input('Purchase_Date',  sql.Date,           new Date(data.purchase_date));
        request.input('Maturity_Date',  sql.Date,           new Date(data.maturity_date));
        request.input('Classification', sql.NVarChar(10),   data.classification || 'HTM');
        request.input('SLR_Status',     sql.NVarChar(10),   data.slr_status     || 'SLR');
        request.input('Record_Status',  sql.NVarChar(15),   data.record_status  || 'Active');
        request.input('Updated_By',     sql.NVarChar(100),  data.updated_by     || null);

        const result = await request.execute('SP_Bond_Update');
        return result.recordset[0] || null;
    } catch (err) {
        console.error('[bondService.updateBond] FULL ERROR:', err);
        throw err;
    }
};

module.exports = { insertBond, getAllBonds, getBondById, updateBond };