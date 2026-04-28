
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,       // Make sure .env is loaded before this runs
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        multipleActiveResultSets: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let poolPromise;

function getPool() {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(config)
            .connect()
            .then(pool => {
                console.log('Connected to MSSQL:', process.env.DB_SERVER);
                return pool;
            })
            .catch(err => {
                poolPromise = null; // Reset so next call retries
                console.error('Database Connection Failed!', err);
                throw err;
            });
    }
    return poolPromise;
}

module.exports = { sql, getPool };