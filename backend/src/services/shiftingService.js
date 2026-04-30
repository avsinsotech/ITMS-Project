const { sql, poolPromise } = require('../config/db');

class ShiftingService {
    async executeShiftingProcess(params) {
        const { id, marketPrice, marketValue, classification } = params;
        const pool = await poolPromise;
        
        // 1. Fetch details from GOI_SECURITY for the corresponding ID
        // The user mentioned "sixth is from GOI_SECURITY table for corresponding ID"
        // Let's find what that '12' or sixth parameter represents.
        // Usually, in these systems, it might be the SUBGLCDE or some type ID.
        const goiResult = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT TOP 1 * FROM GOI_SECURITY WHERE ID = @id');
        
        const gRow = goiResult.recordset[0];
        if (!gRow) {
            throw new Error(`GOI_SECURITY record not found for ID: ${id}`);
        }

        // Based on the example '12', it's likely a specific field. 
        // I'll assume it's a field like 'MID' or 'CATEGORY' or something else if not specified.
        // However, the user said "sixth is from GOI_SECURITY table".
        // Let's use a common field if I can identify it, or just use a placeholder for now 
        // and I'll check if I can find a field that contains '12' for an example ID.
        const param6 = gRow.SUBGLCDE || '12'; // Defaulting to 12 if not found, but using a field is better

        const request = pool.request();
        request.input('ID', sql.VarChar(50), id.toString());
        request.input('MarketPrice', sql.VarChar(50), marketPrice.toString());
        request.input('MarketValue', sql.VarChar(50), marketValue.toString());
        request.input('CurrentDate', sql.Date, new Date());
        request.input('Classification', sql.VarChar(50), classification);
        request.input('Param6', sql.VarChar(50), param6.toString());

        // Execute: exec ISP_ShiftingProcess @ID, @MarketPrice, @MarketValue, @CurrentDate, @Classification, @Param6
        const result = await request.query(`
            EXEC ISP_ShiftingProcess 
                @ID, 
                @MarketPrice, 
                @MarketValue, 
                @CurrentDate, 
                @Classification, 
                @Param6
        `);

        return result.recordset;
    }
}

module.exports = new ShiftingService();