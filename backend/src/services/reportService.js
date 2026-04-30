const { sql, poolPromise } = require('../config/db');

class ReportService {
    async getGSecurityReport(params) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            
            // Map input parameters as NVarChar to let SQL Server handle implicit conversion
            // This is often safer for legacy stored procedures
            // Map input parameters as NVarChar for compatibility with the legacy stored procedure
            // Ensure values are not undefined
            // Map input parameters with more specific types to prevent conversion errors
            request.input('Type', sql.NVarChar, params.type || 'ALL');
            request.input('WDate', sql.NVarChar, params.wDate || new Date().toISOString().split('T')[0]);
            
            // prdcode often expects numeric 0 for 'All'
            const prd = params.prdcode && params.prdcode !== 'All' ? params.prdcode : '0';
            request.input('prdcode', sql.NVarChar, prd);
            
            request.input('ISIN', sql.NVarChar, params.isin || '');
            
            // Category often expected as numeric/int in legacy procedures
            // If it's a known string name (HTM/AFS/HFT), we pass as NVarChar
            // If it's '0' (All), we ensure it's passed safely
            const cat = params.category && params.category !== 'All' ? params.category : '0';
            request.input('Category', sql.NVarChar, cat);

            const result = await request.execute('ISP_Gsecurityreport');
            return result.recordset;
        } catch (error) {
            console.error('Error executing ISP_Gsecurityreport:', error);
            throw error;
        }
    }
}

module.exports = new ReportService();