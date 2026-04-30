const { sql, poolPromise } = require('../config/db');

// POST /api/scheme
const createScheme = async (req, res) => {
    try {
        const {
            AMFI_Code, ISIN, Scheme_Name, AMC, Category, Sub_Category,
            Plan_Type, Min_Lumpsum, Min_SIP, Exit_Load, Expense_Ratio_Pct,
            Benchmark, Risk_Meter, NAV_Frequency, Approved_For_UCB, Created_By
        } = req.body;

        if (!AMFI_Code || !Scheme_Name || !AMC || !Category) {
            return res.status(400).json({ success: false, message: 'AMFI_Code, Scheme_Name, AMC and Category are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('AMFI_Code',         sql.VarChar(20),    AMFI_Code)
            .input('ISIN',              sql.VarChar(12),    ISIN              || null)
            .input('Scheme_Name',       sql.VarChar(300),   Scheme_Name)
            .input('AMC',               sql.VarChar(100),   AMC)
            .input('Category',          sql.VarChar(50),    Category)
            .input('Sub_Category',      sql.VarChar(50),    Sub_Category      || null)
            .input('Plan_Type',         sql.VarChar(50),    Plan_Type         || null)
            .input('Min_Lumpsum',       sql.Decimal(12, 2), Min_Lumpsum       != null ? Number(Min_Lumpsum)      : null)
            .input('Min_SIP',           sql.Decimal(12, 2), Min_SIP           != null ? Number(Min_SIP)          : null)
            .input('Exit_Load',         sql.VarChar(200),   Exit_Load         || null)
            .input('Expense_Ratio_Pct', sql.Decimal(5, 4),  Expense_Ratio_Pct != null ? Number(Expense_Ratio_Pct) : null)
            .input('Benchmark',         sql.VarChar(200),   Benchmark         || null)
            .input('Risk_Meter',        sql.VarChar(30),    Risk_Meter        || null)
            .input('NAV_Frequency',     sql.VarChar(10),    NAV_Frequency     || null)
            .input('Approved_For_UCB',  sql.VarChar(3),     Approved_For_UCB  || 'No')
            .input('Created_By',        sql.VarChar(50),    Created_By        || null)
            .execute('sp_Scheme_Master_Insert');

        const record = result.recordset?.[0] || null;
        return res.status(201).json({ success: true, message: 'Scheme created successfully.', data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(400).json({ success: false, message: msg });
    }
};

// GET /api/scheme
const getAllSchemes = async (req, res) => {
    try {
        const {
            amc, category, plan_type, risk_meter,
            approved_for_ucb, is_active, search,
            page = 1, page_size = 20
        } = req.query;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('AMC',               sql.VarChar(100),   amc               || null)
            .input('Category',          sql.VarChar(50),    category          || null)
            .input('Plan_Type',         sql.VarChar(50),    plan_type         || null)
            .input('Risk_Meter',        sql.VarChar(30),    risk_meter        || null)
            .input('Approved_For_UCB',  sql.VarChar(3),     approved_for_ucb  || null)
            .input('Is_Active',         sql.Bit,            is_active !== undefined ? Number(is_active) : null)
            .input('SearchTerm',        sql.VarChar(100),   search            || null)
            .input('PageNumber',        sql.Int,            Number(page))
            .input('PageSize',          sql.Int,            Number(page_size))
            .execute('sp_Scheme_Master_GetAll');

        const records    = result.recordset || [];
        const total      = records[0]?.Total_Records ?? 0;
        const totalPages = Math.ceil(total / Number(page_size)) || 1;

        return res.status(200).json({
            success: true,
            pagination: { total, page: Number(page), page_size: Number(page_size), total_pages: totalPages },
            data: records
        });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(500).json({ success: false, message: msg });
    }
};

// GET /api/scheme/:id
const getSchemeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'A valid numeric Scheme ID is required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Scheme_ID', sql.Int, Number(id))
            .execute('sp_Scheme_Master_GetByID');

        const record = result.recordset?.[0];
        if (!record) return res.status(404).json({ success: false, message: 'Scheme not found.' });

        return res.status(200).json({ success: true, data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(404).json({ success: false, message: msg });
    }
};

// PUT /api/scheme/:id
const updateScheme = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'A valid numeric Scheme ID is required.' });
        }

        const {
            AMFI_Code, ISIN, Scheme_Name, AMC, Category, Sub_Category,
            Plan_Type, Min_Lumpsum, Min_SIP, Exit_Load, Expense_Ratio_Pct,
            Benchmark, Risk_Meter, NAV_Frequency, Approved_For_UCB,
            Is_Active, Modified_By
        } = req.body;

        if (!AMFI_Code || !Scheme_Name || !AMC || !Category) {
            return res.status(400).json({ success: false, message: 'AMFI_Code, Scheme_Name, AMC and Category are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Scheme_ID',         sql.Int,            Number(id))
            .input('AMFI_Code',         sql.VarChar(20),    AMFI_Code)
            .input('ISIN',              sql.VarChar(12),    ISIN              || null)
            .input('Scheme_Name',       sql.VarChar(300),   Scheme_Name)
            .input('AMC',               sql.VarChar(100),   AMC)
            .input('Category',          sql.VarChar(50),    Category)
            .input('Sub_Category',      sql.VarChar(50),    Sub_Category      || null)
            .input('Plan_Type',         sql.VarChar(50),    Plan_Type         || null)
            .input('Min_Lumpsum',       sql.Decimal(12, 2), Min_Lumpsum       != null ? Number(Min_Lumpsum)      : null)
            .input('Min_SIP',           sql.Decimal(12, 2), Min_SIP           != null ? Number(Min_SIP)          : null)
            .input('Exit_Load',         sql.VarChar(200),   Exit_Load         || null)
            .input('Expense_Ratio_Pct', sql.Decimal(5, 4),  Expense_Ratio_Pct != null ? Number(Expense_Ratio_Pct) : null)
            .input('Benchmark',         sql.VarChar(200),   Benchmark         || null)
            .input('Risk_Meter',        sql.VarChar(30),    Risk_Meter        || null)
            .input('NAV_Frequency',     sql.VarChar(10),    NAV_Frequency     || null)
            .input('Approved_For_UCB',  sql.VarChar(3),     Approved_For_UCB  || 'No')
            .input('Is_Active',         sql.Bit,            Is_Active !== undefined ? Number(Is_Active) : 1)
            .input('Modified_By',       sql.VarChar(50),    Modified_By       || null)
            .execute('sp_Scheme_Master_Update');

        const record = result.recordset?.[0];
        return res.status(200).json({ success: true, message: 'Scheme updated successfully.', data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(400).json({ success: false, message: msg });
    }
};

module.exports = { createScheme, getAllSchemes, getSchemeById, updateScheme };