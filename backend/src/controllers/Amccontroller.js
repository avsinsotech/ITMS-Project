const { sql, poolPromise } = require('../config/db');

// POST /api/amc — Insert a new AMC
const createAMC = async (req, res) => {
    try {
        const {
            AMC_Code, AMC_Name, AMFI_Reg_No, SEBI_Reg_No,
            Trustee_Company, PAN, GSTIN,
            AMC_Group_Exposure_Cap_Pct, RTA, Created_By
        } = req.body;

        if (!AMC_Code || !AMC_Name) {
            return res.status(400).json({ success: false, message: 'AMC_Code and AMC_Name are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('AMC_Code',                   sql.VarChar(20),    AMC_Code)
            .input('AMC_Name',                   sql.VarChar(200),   AMC_Name)
            .input('AMFI_Reg_No',                sql.VarChar(50),    AMFI_Reg_No     || null)
            .input('SEBI_Reg_No',                sql.VarChar(50),    SEBI_Reg_No     || null)
            .input('Trustee_Company',            sql.VarChar(200),   Trustee_Company || null)
            .input('PAN',                        sql.Char(10),       PAN             || null)
            .input('GSTIN',                      sql.VarChar(15),    GSTIN           || null)
            .input('AMC_Group_Exposure_Cap_Pct', sql.Decimal(5, 2),  AMC_Group_Exposure_Cap_Pct || null)
            .input('RTA',                        sql.VarChar(50),    RTA             || null)
            .input('Created_By',                 sql.VarChar(50),    Created_By      || null)
            .execute('sp_AMC_Master_Insert');

        const record = result.recordset?.[0] || null;
        return res.status(201).json({ success: true, message: 'AMC created successfully.', data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(400).json({ success: false, message: msg });
    }
};

// GET /api/amc — Get all AMCs (with optional filters & pagination)
const getAllAMCs = async (req, res) => {
    try {
        const {
            is_active, rta, search,
            page = 1, page_size = 20
        } = req.query;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Is_Active',   sql.Bit,          is_active  !== undefined ? Number(is_active) : null)
            .input('RTA',         sql.VarChar(50),   rta        || null)
            .input('SearchTerm',  sql.VarChar(100),  search     || null)
            .input('PageNumber',  sql.Int,           Number(page))
            .input('PageSize',    sql.Int,           Number(page_size))
            .execute('sp_AMC_Master_GetAll');

        const records      = result.recordset || [];
        const total        = records[0]?.Total_Records ?? 0;
        const totalPages   = Math.ceil(total / Number(page_size)) || 1;

        return res.status(200).json({
            success: true,
            pagination: {
                total,
                page:       Number(page),
                page_size:  Number(page_size),
                total_pages: totalPages
            },
            data: records
        });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(500).json({ success: false, message: msg });
    }
};

// GET /api/amc/:id — Get a single AMC by primary key
const getAMCById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'A valid numeric AMC ID is required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('AMC_ID', sql.Int, Number(id))
            .execute('sp_AMC_Master_GetByID');

        const record = result.recordset?.[0];
        if (!record) {
            return res.status(404).json({ success: false, message: 'AMC record not found.' });
        }

        return res.status(200).json({ success: true, data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(404).json({ success: false, message: msg });
    }
};

// PUT /api/amc/:id — Update an existing AMC
const updateAMC = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: 'A valid numeric AMC ID is required.' });
        }

        const {
            AMC_Code, AMC_Name, AMFI_Reg_No, SEBI_Reg_No,
            Trustee_Company, PAN, GSTIN,
            AMC_Group_Exposure_Cap_Pct, RTA,
            Is_Active, Modified_By
        } = req.body;

        if (!AMC_Code || !AMC_Name) {
            return res.status(400).json({ success: false, message: 'AMC_Code and AMC_Name are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('AMC_ID',                     sql.Int,            Number(id))
            .input('AMC_Code',                   sql.VarChar(20),    AMC_Code)
            .input('AMC_Name',                   sql.VarChar(200),   AMC_Name)
            .input('AMFI_Reg_No',                sql.VarChar(50),    AMFI_Reg_No     || null)
            .input('SEBI_Reg_No',                sql.VarChar(50),    SEBI_Reg_No     || null)
            .input('Trustee_Company',            sql.VarChar(200),   Trustee_Company || null)
            .input('PAN',                        sql.Char(10),       PAN             || null)
            .input('GSTIN',                      sql.VarChar(15),    GSTIN           || null)
            .input('AMC_Group_Exposure_Cap_Pct', sql.Decimal(5, 2),  AMC_Group_Exposure_Cap_Pct || null)
            .input('RTA',                        sql.VarChar(50),    RTA             || null)
            .input('Is_Active',                  sql.Bit,            Is_Active !== undefined ? Number(Is_Active) : 1)
            .input('Modified_By',                sql.VarChar(50),    Modified_By     || null)
            .execute('sp_AMC_Master_Update');

        const record = result.recordset?.[0];
        return res.status(200).json({ success: true, message: 'AMC updated successfully.', data: record });

    } catch (err) {
        const msg = err.originalError?.info?.message || err.message;
        return res.status(400).json({ success: false, message: msg });
    }
};

module.exports = { createAMC, getAllAMCs, getAMCById, updateAMC };