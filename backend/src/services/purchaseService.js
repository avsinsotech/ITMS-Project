const { sql, poolPromise } = require('../config/db');
const xlsx = require('xlsx');
const fs = require('fs');
const { getValFuzzy } = require('../utils/mappingHelper');

class PurchaseService {
    async processExcel(buffer, fileName) {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        const pool = await poolPromise;
        let successCount = 0;

        for (const row of data) {
            try {
                const tradeNumber = getValFuzzy(row, 'Trade_Number') || getValFuzzy(row, 'Trade Number');
                if (!tradeNumber) continue;

                // PERSISTENT TRACE LOG for specific trade
                if (tradeNumber.includes('1770')) {
                    fs.appendFileSync('trace_log.txt', `\n[${new Date().toISOString()}] MODULAR TRACE 1770:\n${JSON.stringify(row, null, 2)}\n`);
                }

                const request = pool.request();
                request.input('Member', sql.NVarChar, getValFuzzy(row, 'Member'));
                request.input('Member_Number', sql.NVarChar, getValFuzzy(row, 'Member Number'));
                request.input('Users', sql.NVarChar, getValFuzzy(row, 'User') || getValFuzzy(row, 'Users'));
                request.input('User_Number', sql.NVarChar, getValFuzzy(row, 'User Number'));
                request.input('Market', sql.NVarChar, getValFuzzy(row, 'Market'));
                request.input('Sub_Market', sql.NVarChar, getValFuzzy(row, 'Sub Market'));
                request.input('Order_Number', sql.NVarChar, getValFuzzy(row, 'Order Number'));
                request.input('Trade_Date', sql.NVarChar, getValFuzzy(row, 'Trade Date'));
                request.input('Trade_Time', sql.NVarChar, getValFuzzy(row, 'Trade Time'));
                request.input('Trade_Number', sql.NVarChar, tradeNumber);
                request.input('Trade_Type', sql.NVarChar, getValFuzzy(row, 'Trade Type'));
                request.input('Settlement_Type', sql.NVarChar, getValFuzzy(row, 'Settlement Type'));
                request.input('Settlement_Date', sql.NVarChar, getValFuzzy(row, 'Settlement Date'));
                request.input('ISIN', sql.NVarChar, getValFuzzy(row, 'ISIN'));
                request.input('Genspec', sql.NVarChar, getValFuzzy(row, 'Genspec'));
                request.input('Security', sql.NVarChar, getValFuzzy(row, 'Security'));
                request.input('Maturity_Date', sql.NVarChar, getValFuzzy(row, 'Maturity Date'));
                request.input('Amount', sql.NVarChar, getValFuzzy(row, 'Amount') || '0');
                request.input('Trade_Price', sql.NVarChar, getValFuzzy(row, 'Trade_Price') || '0');
                request.input('Trade_Yield', sql.NVarChar, getValFuzzy(row, 'Trade_Yield') || '0');
                request.input('Trade_Amount', sql.NVarChar, getValFuzzy(row, 'Trade_Amount') || '0');
                request.input('Last_Interest_Payment_Date', sql.NVarChar, getValFuzzy(row, 'Last Interest Payment Date'));
                request.input('Number_of_Broken_Period_Days', sql.NVarChar, getValFuzzy(row, 'Number of Broken Period Days'));
                request.input('Accrued_Interest', sql.NVarChar, getValFuzzy(row, 'Accrued_Interest') || '0');
                request.input('Sett_Consideration', sql.NVarChar, getValFuzzy(row, 'Sett_Consideration') || '0');
                request.input('Constituent', sql.NVarChar, getValFuzzy(row, 'Constituent'));
                request.input('Constituent_Number', sql.NVarChar, getValFuzzy(row, 'Constituent Number'));
                request.input('Portfolio', sql.NVarChar, getValFuzzy(row, 'Portfolio'));
                request.input('Stage', sql.NVarChar, '1001');
                request.input('FileName', sql.NVarChar, fileName);

                const query = `
                    IF EXISTS (SELECT 1 FROM purchase WHERE Trade_Number = @Trade_Number)
                    BEGIN
                        UPDATE purchase SET 
                            Member = @Member, Member_Number = @Member_Number, Users = @Users, User_Number = @User_Number,
                            Market = @Market, Sub_Market = @Sub_Market, Order_Number = @Order_Number, Trade_Date = @Trade_Date,
                            Trade_Time = @Trade_Time, Trade_Type = @Trade_Type, Settlement_Type = @Settlement_Type,
                            Settlement_Date = @Settlement_Date, ISIN = @ISIN, Genspec = @Genspec, Security = @Security,
                            Maturity_Date = @Maturity_Date, Amount = @Amount, Trade_Price = @Trade_Price,
                            Trade_Yield = @Trade_Yield, Trade_Amount = @Trade_Amount, 
                            Last_Interest_Payment_Date = @Last_Interest_Payment_Date,
                            Number_of_Broken_Period_Days = @Number_of_Broken_Period_Days,
                            Accrued_Interest = @Accrued_Interest, Sett_Consideration = @Sett_Consideration,
                            Constituent = @Constituent, Constituent_Number = @Constituent_Number, Portfolio = @Portfolio,
                            Stage = @Stage, FileName = @FileName
                        WHERE Trade_Number = @Trade_Number
                    END
                    ELSE
                    BEGIN
                        INSERT INTO purchase (
                            Member, Member_Number, Users, User_Number, Market, Sub_Market, Order_Number, 
                            Trade_Date, Trade_Time, Trade_Number, Trade_Type, Settlement_Type, Settlement_Date, 
                            ISIN, Genspec, Security, Maturity_Date, Amount, Trade_Price, Trade_Yield, 
                            Trade_Amount, Last_Interest_Payment_Date, Number_of_Broken_Period_Days, 
                            Accrued_Interest, Sett_Consideration, Constituent, Constituent_Number, Portfolio, Entrydate,
                            Stage, FileName
                        ) VALUES (
                            @Member, @Member_Number, @Users, @User_Number, @Market, @Sub_Market, @Order_Number, 
                            @Trade_Date, @Trade_Time, @Trade_Number, @Trade_Type, @Settlement_Type, @Settlement_Date, 
                            @ISIN, @Genspec, @Security, @Maturity_Date, @Amount, @Trade_Price, @Trade_Yield, 
                            @Trade_Amount, @Last_Interest_Payment_Date, @Number_of_Broken_Period_Days, 
                            @Accrued_Interest, @Sett_Consideration, @Constituent, @Constituent_Number, @Portfolio, GETDATE(),
                            @Stage, @FileName
                        )
                    END`;
                await request.query(query);
                successCount++;
            } catch (e) {
                console.error(`Error processing trade row: ${e.message}`);
                throw e; // Bubble up for controller handling if needed
            }
        }
        return successCount;
    }

    async getAllPurchases() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM purchase ORDER BY id DESC');
        return result.recordset;
    }

    async getPurchaseById(id) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('id_str', sql.NVarChar, id);
        
        let query = 'SELECT * FROM purchase WHERE Trade_Number = @id_str';
        if (!isNaN(id) && Number(id) <= 2147483647) {
            request.input('id_num', sql.Int, parseInt(id));
            query = 'SELECT * FROM purchase WHERE id = @id_num OR Trade_Number = @id_str';
        }
        
        const result = await request.query(query);
        return result.recordset[0] || null;
    }

    async authorizePurchases(ids) {
        const pool = await poolPromise;
        const results = [];
        
        for (const id of ids) {
            // First, fetch the existing record to get its data (like MID, EntryDate)
            const getReq = pool.request();
            getReq.input('id', sql.Int, parseInt(id));
            const recordResult = await getReq.query('SELECT * FROM purchase WHERE id = @id');
            const row = recordResult.recordset[0];
            
            if (!row) {
                results.push({ id, status: 'Failed', error: 'Record not found' });
                continue;
            }

            const entryDate = row.Entrydate || new Date();

            // Ensure AVS5002 DaySetNo initialized to prevent SP ROLLBACK error
            const preReq = pool.request();
            preReq.input('EntryDate', sql.DateTime, entryDate);
            preReq.input('BRCD', sql.NVarChar, '1');
            await preReq.query(`
                IF NOT EXISTS (SELECT 1 FROM AVS5002 WHERE ENTRYDATE = CONVERT(nvarchar(10), @EntryDate, 121) AND PARAMETERNAME = 'DaySetNo' AND brcd = @BRCD)
                BEGIN
                    INSERT INTO AVS5002 (ENTRYDATE, PARAMETERNAME, LASTNO, MID, MIDDATE, SYSTEMDATE, BRCD) 
                    VALUES (CONVERT(nvarchar(10), @EntryDate, 121), 'DaySetNo', '0', '1', GETDATE(), GETDATE(), @BRCD)
                END
            `);

            const request = pool.request();
            
            // Map parameters expected by ISP_GSecuTransaction
            // NOTE: I am passing the row data where available. You may need to hardcode values like @Flag = 'A'
            request.input('ID', sql.NVarChar, id.toString());
            request.input('MID', sql.NVarChar, row.MID || '1'); // Default to 1 if missing
            request.input('EntryDate', sql.DateTime, entryDate);
            request.input('Flag', sql.NVarChar, 'Purchase'); // As per SP example
            request.input('BRCD', sql.NVarChar, '1'); // CRITICAL: Required for SetNo generation
            request.input('Counter', sql.NVarChar, '1');
            request.input('SLR', sql.NVarChar, '1');
            request.input('Category', sql.NVarChar, '1');
            request.input('IntSubglcode', sql.NVarChar, '');
            request.input('IntAcc', sql.NVarChar, '0');
            request.input('SType', sql.NVarChar, row.Settlement_Type || '');
            request.input('PL', sql.NVarChar, '0');
            request.input('RecSrNo', sql.NVarChar, '1'); // Also providing a default number here just in case
            request.input('IRAmt', sql.NVarChar, '0');
            request.input('ARAmt', sql.NVarChar, '0');
            request.input('AVAmt', sql.NVarChar, '0');
            
            try {
                const result = await request.execute('ISP_GSecuTransaction'); 
                results.push({ id, status: 'Authorized', data: result.recordset });
            } catch(e) {
                results.push({ id, status: 'Failed', error: e.message });
            }
        }
        
        return results;
    }

    async deletePurchaseById(id) {
        const pool = await poolPromise;
        const request = pool.request();
        // Assume ID can be the primary key `id` or Trade_Number, similar to getPurchaseById
        request.input('paramId', sql.NVarChar, id.toString());
        const result = await request.query(`
            DELETE FROM Purchase 
            WHERE id = @paramId OR Trade_Number = @paramId
        `);
        // rowsAffected[0] contains the number of rows deleted
        return result.rowsAffected[0] > 0;
    }

    async getPurchasesByPostset(postset) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('postset', sql.NVarChar, postset.toString());
        const result = await request.query('SELECT * FROM purchase WHERE postset = @postset ORDER BY id DESC');
        return result.recordset;
    }
}

module.exports = new PurchaseService();