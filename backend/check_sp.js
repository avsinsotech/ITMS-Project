require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: { encrypt: false, trustServerCertificate: true }
};

async function main() {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT OBJECT_DEFINITION(OBJECT_ID('ISP_Gsecurityreport')) AS sp_text
        `);
        const spText = result.recordset[0].sp_text;
        if (spText) {
            const lines = spText.split('\n');
            // Print lines 15-35 to see around line 23
            console.log('=== Lines 15 to 35 of ISP_Gsecurityreport ===');
            for (let i = 14; i < Math.min(35, lines.length); i++) {
                console.log(`Line ${i + 1}: ${lines[i]}`);
            }
            console.log('\n=== Full SP (first 60 lines) ===');
            for (let i = 0; i < Math.min(60, lines.length); i++) {
                console.log(`${i + 1}: ${lines[i]}`);
            }
        } else {
            console.log('Could not find stored procedure ISP_Gsecurityreport');
        }
        await pool.close();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
main();
