const { sql, poolPromise } = require('../db');

async function getInfo() {
    try {
        const pool = await poolPromise;
        
        // 1. Get Schema
        console.log('--- TABLE SCHEMA ---');
        const schema = await pool.request().query("SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'purchase'");
        console.table(schema.recordset);

        // 2. Check for triggers
        console.log('\n--- TRIGGERS ---');
        const triggers = await pool.request().query("SELECT name FROM sys.triggers WHERE parent_id = OBJECT_ID('purchase')");
        console.table(triggers.recordset);

        // 3. Check Row 364 again in detail
        console.log('\n--- RECORD 364 RAW ---');
        const r364 = await pool.request().query("SELECT * FROM purchase WHERE id = 364");
        console.log(JSON.stringify(r364.recordset[0], null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

getInfo();
