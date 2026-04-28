const sql = require('mssql');
const { poolPromise } = require('../config/db');

class AuthRepository {
    async getUserByUsername(username) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query("SELECT * FROM USERMASTER WHERE LOGINCODE = @username");
        return result.recordset[0];
    }
}

module.exports = new AuthRepository();