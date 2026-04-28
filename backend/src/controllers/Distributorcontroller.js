// controllers/distributorController.js
// Mirrors the SP signatures exactly:
//   sp_Distributor_Master_Insert
//   sp_Distributor_Master_GetAll
//   sp_Distributor_Master_GetByID
//   sp_Distributor_Master_Update

const { sql, poolPromise } = require('../config/db');

// ─────────────────────────────────────────────────────────────────────────────
// Helper — standard JSON envelope used across the project
// ─────────────────────────────────────────────────────────────────────────────
const ok  = (res, data, meta = {})  => res.status(200).json({ success: true,  ...meta, data });
const err = (res, message, status = 500) => res.status(status).json({ success: false, message });


// ─────────────────────────────────────────────────────────────────────────────
// POST  /api/distributor
// Body: { Distributor_Code, Distributor_Name, ARN_No?, EUIN?, Sub_Broker_Code?,
//         PAN?, GSTIN?, Commission_Type?, Empanelment_Date?, Created_By? }
// ─────────────────────────────────────────────────────────────────────────────
const createDistributor = async (req, res) => {
    try {
        const {
            Distributor_Code,
            Distributor_Name,
            ARN_No          = null,
            EUIN            = null,
            Sub_Broker_Code = null,
            PAN             = null,
            GSTIN           = null,
            Commission_Type = 'Trail Only',
            Empanelment_Date = null,
            Created_By      = null,
        } = req.body;

        // ── Required field guard ──────────────────────────────────────────────
        if (!Distributor_Code || !Distributor_Name) {
            return err(res, 'Distributor_Code and Distributor_Name are required.', 400);
        }

        const pool    = await poolPromise;
        const request = pool.request();

        request.input('Distributor_Code',  sql.VarChar(20),   Distributor_Code);
        request.input('Distributor_Name',  sql.VarChar(200),  Distributor_Name);
        request.input('ARN_No',            sql.VarChar(20),   ARN_No);
        request.input('EUIN',              sql.VarChar(20),   EUIN);
        request.input('Sub_Broker_Code',   sql.VarChar(20),   Sub_Broker_Code);
        request.input('PAN',               sql.Char(10),      PAN);
        request.input('GSTIN',             sql.VarChar(15),   GSTIN);
        request.input('Commission_Type',   sql.VarChar(30),   Commission_Type);
        request.input('Empanelment_Date',  sql.Date,          Empanelment_Date ? new Date(Empanelment_Date) : null);
        request.input('Created_By',        sql.VarChar(50),   Created_By);

        const result = await request.execute('sp_Distributor_Master_Insert');

        // SP returns the newly inserted row as the first recordset
        const inserted = result.recordset?.[0] ?? null;
        return ok(res, inserted, { message: 'Distributor created successfully.' });

    } catch (e) {
        // Bubble up SP RAISERROR messages (duplicate code, ARN, PAN, GSTIN etc.)
        return err(res, e.message);
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/distributor
// Query params: Commission_Type?, Is_Active?, SearchTerm?, PageNumber?, PageSize?
// ─────────────────────────────────────────────────────────────────────────────
const getAllDistributors = async (req, res) => {
    try {
        const {
            Commission_Type = null,
            Is_Active       = null,   // send '1', '0', or omit for all
            SearchTerm      = null,
            PageNumber      = 1,
            PageSize        = 20,
        } = req.query;

        const pool    = await poolPromise;
        const request = pool.request();

        // Pass NULL for un-filtered params so SP returns everything
        request.input('Commission_Type', sql.VarChar(30),  Commission_Type || null);
        request.input('Is_Active',       sql.Bit,          Is_Active !== null && Is_Active !== '' ? Number(Is_Active) : null);
        request.input('SearchTerm',      sql.VarChar(100), SearchTerm  || null);
        request.input('PageNumber',      sql.Int,          Number(PageNumber));
        request.input('PageSize',        sql.Int,          Number(PageSize));

        const result = await request.execute('sp_Distributor_Master_GetAll');

        const rows        = result.recordset ?? [];
        const totalRecords = rows[0]?.Total_Records ?? 0;

        return ok(res, rows, {
            total:      totalRecords,
            page:       Number(PageNumber),
            pageSize:   Number(PageSize),
            totalPages: Math.ceil(totalRecords / Number(PageSize)),
        });

    } catch (e) {
        return err(res, e.message);
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/distributor/:id
// ─────────────────────────────────────────────────────────────────────────────
const getDistributorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id < 1) {
            return err(res, 'Invalid Distributor ID.', 400);
        }

        const pool    = await poolPromise;
        const request = pool.request();

        request.input('Distributor_ID', sql.Int, id);

        const result = await request.execute('sp_Distributor_Master_GetByID');
        const row    = result.recordset?.[0];

        if (!row) {
            return err(res, 'Distributor not found.', 404);
        }

        return ok(res, row);

    } catch (e) {
        // SP RAISERROR: "Distributor not found for given ID."
        if (e.message?.toLowerCase().includes('not found')) {
            return err(res, e.message, 404);
        }
        return err(res, e.message);
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// PUT  /api/distributor/:id
// Body: same shape as POST, plus Is_Active? and Modified_By?
// ─────────────────────────────────────────────────────────────────────────────
const updateDistributor = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id < 1) {
            return err(res, 'Invalid Distributor ID.', 400);
        }

        const {
            Distributor_Code,
            Distributor_Name,
            ARN_No           = null,
            EUIN             = null,
            Sub_Broker_Code  = null,
            PAN              = null,
            GSTIN            = null,
            Commission_Type  = 'Trail Only',
            Empanelment_Date = null,
            Is_Active        = 1,
            Modified_By      = null,
        } = req.body;

        if (!Distributor_Code || !Distributor_Name) {
            return err(res, 'Distributor_Code and Distributor_Name are required.', 400);
        }

        const pool    = await poolPromise;
        const request = pool.request();

        request.input('Distributor_ID',    sql.Int,          id);
        request.input('Distributor_Code',  sql.VarChar(20),  Distributor_Code);
        request.input('Distributor_Name',  sql.VarChar(200), Distributor_Name);
        request.input('ARN_No',            sql.VarChar(20),  ARN_No);
        request.input('EUIN',              sql.VarChar(20),  EUIN);
        request.input('Sub_Broker_Code',   sql.VarChar(20),  Sub_Broker_Code);
        request.input('PAN',               sql.Char(10),     PAN);
        request.input('GSTIN',             sql.VarChar(15),  GSTIN);
        request.input('Commission_Type',   sql.VarChar(30),  Commission_Type);
        request.input('Empanelment_Date',  sql.Date,         Empanelment_Date ? new Date(Empanelment_Date) : null);
        request.input('Is_Active',         sql.Bit,          Number(Is_Active));
        request.input('Modified_By',       sql.VarChar(50),  Modified_By);

        const result = await request.execute('sp_Distributor_Master_Update');

        const updated = result.recordset?.[0] ?? null;
        return ok(res, updated, { message: 'Distributor updated successfully.' });

    } catch (e) {
        if (e.message?.toLowerCase().includes('not found')) {
            return err(res, e.message, 404);
        }
        return err(res, e.message);
    }
};


module.exports = {
    createDistributor,
    getAllDistributors,
    getDistributorById,
    updateDistributor,
};