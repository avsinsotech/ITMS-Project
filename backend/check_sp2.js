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
        const lines = spText.split('\n');
        // Show lines 40-80
        for (let i = 40; i < Math.min(80, lines.length); i++) {
            console.log(`${i + 1}: ${lines[i]}`);
        }
        await pool.close();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
main();
