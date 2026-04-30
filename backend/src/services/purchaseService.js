const { sql, poolPromise } = require('../config/db');
const xlsx = require('xlsx');
const fs = require('fs');
const { getValFuzzy } = require('../utils/mappingHelper');
const Logger = require('../utils/logger');


class PurchaseService {
    async processExcel(buffer, fileName, mid) {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const pool = await poolPromise;
        let successCount = 0;

        for (const row of data) {
            try {
                console.log(`[DEBUG] Processing trade row with mid: ${mid}, fileName: ${fileName}`);
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
                request.input('MID', sql.NVarChar, mid?.toString() || '');

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
                            Stage = @Stage, FileName = @FileName, MID = @MID
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
                            Stage, FileName, MID
                        ) VALUES (
                            @Member, @Member_Number, @Users, @User_Number, @Market, @Sub_Market, @Order_Number, 
                            @Trade_Date, @Trade_Time, @Trade_Number, @Trade_Type, @Settlement_Type, @Settlement_Date, 
                            @ISIN, @Genspec, @Security, @Maturity_Date, @Amount, @Trade_Price, @Trade_Yield, 
                            @Trade_Amount, @Last_Interest_Payment_Date, @Number_of_Broken_Period_Days, 
                            @Accrued_Interest, @Sett_Consideration, @Constituent, @Constituent_Number, @Portfolio, GETDATE(),
                            @Stage, @FileName, @MID
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
        const result = await pool.request().query(`
            SELECT p.*, 
                   g.ACCNO as Acc_No, 
                   g.ACCNO as AccNo,
                   g.CATEGORIES as Category, 
                   g.SLRType as SLR, 
                   g.I_Type as [Sec Type],
                   g.I_Type as Sec_Type,
                   g.SUBGLCDE as [Purchase Book],
                   g.Portfolio,
                   g.CounterParty as [Counter Type],
                   m.GLCODE as ProdCode
            FROM purchase p
            LEFT JOIN (
                SELECT *, ROW_NUMBER() OVER(PARTITION BY Trade_Number ORDER BY SYSTEMDATE DESC) as rn
                FROM GOI_SECURITY
            ) g ON LTRIM(RTRIM(p.Trade_Number)) = LTRIM(RTRIM(g.Trade_Number)) AND g.rn = 1
            LEFT JOIN GLMAST m ON LTRIM(RTRIM(g.SUBGLCDE)) = LTRIM(RTRIM(m.SUBGLCODE))
            ORDER BY p.id DESC
        `);

        const records = result.recordset.map(r => {
            let secType = r['Sec Type'] || r.Sec_Type || '';
            let prodCode = r.ProdCode;
            let subgl = r['Purchase Book'] || r.SUBGLCDE;

            // Dynamic Mapping for Display
            if (secType === 'Central Goverment Sec' || secType === 'CENTRAL SECURITY PRINCIPAL ACCOUNT') {
                secType = 'CENTRAL SECURITY PRINCIPAL ACCOUNT';
                if (!prodCode || prodCode === '0') prodCode = '417';
                if (!subgl || subgl === '0') subgl = '417';
            } else if (secType === 'State Goverment Sec' || secType === 'STATE SECURITY PRINCIPAL ACCOUNT' || !secType) {
                secType = 'STATE SECURITY PRINCIPAL ACCOUNT';
                if (!prodCode || prodCode === '0') prodCode = '416';
                if (!subgl || subgl === '0') subgl = '416';
            }

            return {
                ...r,
                'Sec Type': secType,
                'Sec_Type': secType,
                'ProdCode': prodCode,
                'Purchase Book': subgl,
                'Subglcode': subgl
            };
        });

        return records;
    }

    async getPurchaseById(id) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('id_str', sql.NVarChar, id);

        let whereClause = 'p.Trade_Number = @id_str';
        if (!isNaN(id) && Number(id) <= 2147483647) {
            request.input('id_num', sql.Int, parseInt(id));
            whereClause = 'p.id = @id_num OR p.Trade_Number = @id_str';
        }

        const query = `
            SELECT p.*, 
                   g.ACCNO as Acc_No, 
                   g.ACCNO as AccNo,
                   g.CATEGORIES as Category, 
                   g.SLRType as SLR, 
                   m.GLNAME as [Sec Type],
                   m.GLNAME as Sec_Type,
                   g.SUBGLCDE as [Purchase Book],
                   g.Portfolio,
                   g.CounterParty as [Counter Type],
                   m.GLCODE as ProdCode
            FROM purchase p
            LEFT JOIN (
                SELECT *, ROW_NUMBER() OVER(PARTITION BY Trade_Number ORDER BY SYSTEMDATE DESC) as rn
                FROM GOI_SECURITY
            ) g ON LTRIM(RTRIM(p.Trade_Number)) = LTRIM(RTRIM(g.Trade_Number)) AND g.rn = 1
            LEFT JOIN GLMAST m ON LTRIM(RTRIM(g.SUBGLCDE)) = LTRIM(RTRIM(m.SUBGLCODE))
            WHERE ${whereClause}
        `;

        const result = await request.query(query);
        if (!result.recordset.length) return null;

        const r = result.recordset[0];
        let secType = r['Sec Type'] || r.Sec_Type || '';
        let prodCode = r.ProdCode;
        let subgl = r['Purchase Book'] || r.SUBGLCDE;

        if (secType === 'Central Goverment Sec' || secType === 'CENTRAL SECURITY PRINCIPAL ACCOUNT') {
            secType = 'CENTRAL SECURITY PRINCIPAL ACCOUNT';
            if (!prodCode || prodCode === '0') prodCode = '417';
            if (!subgl || subgl === '0') subgl = '417';
        } else if (secType === 'State Goverment Sec' || secType === 'STATE SECURITY PRINCIPAL ACCOUNT' || !secType) {
            secType = 'STATE SECURITY PRINCIPAL ACCOUNT';
            if (!prodCode || prodCode === '0') prodCode = '416';
            if (!subgl || subgl === '0') subgl = '416';
        }

        return {
            ...r,
            'Sec Type': secType,
            'Sec_Type': secType,
            'ProdCode': prodCode,
            'Purchase Book': subgl,
            'Subglcode': subgl
        };
    }

    async authorizePurchases(ids, sessionData, updatedRecord = null) {
        const pool = await poolPromise;
        const results = [];

        for (const id of ids) {
            let paramsForLog = {};
            try {
                // 1. Fetch the purchase record
                const purchaseReq = pool.request();
                purchaseReq.input('id', sql.Int, parseInt(id));
                const purchaseResult = await purchaseReq.query('SELECT * FROM purchase WHERE id = @id');
                const pRow = purchaseResult.recordset[0];

                if (!pRow) {
                    results.push({ id, status: 'Failed', error: 'Purchase record not found' });
                    continue;
                }

                // Map UI display values back to numeric strings for the GOI_SECURITY table and SP
                const catMap = { 'AFS': '1', 'HTM': '2', 'HFT': '3' };
                const revCatMap = { '1': 'AFS', '2': 'HTM', '3': 'HFT' };
                const slrMap = { 'SLR': '1', 'Non SLR': '2' };

                // Helper to clean numeric strings
                const cleanNum = (val) => {
                    if (val === undefined || val === null || val === '' || val === '-') return '0';
                    return String(val).replace(/,/g, '').trim() || '0';
                };

                // Helper to standardize dates to YYYY-MM-DD for SP's 121 conversion
                const cleanDate = (val) => {
                    if (!val) return null;
                    const d = new Date(val);
                    return isNaN(d.getTime()) ? val : d.toISOString().split('T')[0];
                };

                // 1.5 Sync/Initialize Master Data (GOI_SECURITY) and generate Acc_No
                const isManualEdit = updatedRecord && (updatedRecord.id == id || updatedRecord.__id?.split('-')[2] == id);
                const editData = isManualEdit ? updatedRecord : {};

                // Fetch latest master data to check for Acc_No
                const goiCheck = await pool.request()
                    .input('Trade_Number', sql.NVarChar, String(pRow.Trade_Number))
                    .query('SELECT TOP 1 ACCNO, CATEGORIES, SLRType, SUBGLCDE FROM GOI_SECURITY WHERE Trade_Number = @Trade_Number');
                const currentGRow = goiCheck.recordset[0] || {};

                // Generate Acc_No if missing everywhere
                let finalAccNo = editData.AccNo || editData.Acc_No || currentGRow.ACCNO || '';
                if (!finalAccNo || finalAccNo === '0') {
                    finalAccNo = Date.now().toString().slice(-8) + Math.floor(Math.random() * 10000);
                    console.log(`[DEBUG] Generated new Acc_No: ${finalAccNo} for ID ${id}`);
                }

                // Update purchase table (ensure latest data)
                const updateReq = pool.request();
                updateReq.input('id', sql.Int, parseInt(id));
                updateReq.input('Counter', sql.NVarChar, String(editData.Counter || editData.CounterParty || pRow.Counterparty || ''));
                updateReq.input('Amount', sql.NVarChar, cleanNum(editData.Amount || pRow.Amount));
                updateReq.input('Trade_Price', sql.NVarChar, cleanNum(editData.Trade_Price || pRow.Trade_Price));
                updateReq.input('Trade_Yield', sql.NVarChar, cleanNum(editData.Trade_Yield || pRow.Trade_Yield));
                updateReq.input('Trade_Amount', sql.NVarChar, cleanNum(editData.Trade_Amount || pRow.Trade_Amount));
                updateReq.input('Accrued_Interest', sql.NVarChar, cleanNum(editData.Accrued_Interest || pRow.Accrued_Interest));
                updateReq.input('Sett_Consideration', sql.NVarChar, cleanNum(editData.Sett_Consideration || pRow.Sett_Consideration));
                updateReq.input('BrokenDays', sql.NVarChar, cleanNum(editData.Number_of_Broken_Period_Days || pRow.Number_of_Broken_Period_Days));
                updateReq.input('Trade_Date', sql.NVarChar, cleanDate(editData.Trade_Date || pRow.Trade_Date));
                updateReq.input('Maturity_Date', sql.NVarChar, cleanDate(editData.Maturity_Date || pRow.Maturity_Date));

                await updateReq.query(`
                    UPDATE purchase 
                    SET Counterparty = @Counter,
                        Amount = @Amount,
                        Trade_Price = @Trade_Price,
                        Trade_Yield = @Trade_Yield,
                        Trade_Amount = @Trade_Amount,
                        Accrued_Interest = @Accrued_Interest,
                        Sett_Consideration = @Sett_Consideration,
                        Number_of_Broken_Period_Days = @BrokenDays,
                        Trade_Date = @Trade_Date,
                        Maturity_Date = @Maturity_Date
                    WHERE id = @id
                `);

                // Determine the numeric and string versions of category
                const rawCat = editData.Category || currentGRow.CATEGORIES || 'AFS';
                const catId = catMap[rawCat] || rawCat || '1';
                const catString = revCatMap[catId] || rawCat || 'AFS';

                // Update or Insert into GOI_SECURITY table (accounting info)
                const goiUpdateReq = pool.request();
                goiUpdateReq.input('Trade_Number', sql.NVarChar, String(pRow.Trade_Number));
                goiUpdateReq.input('AccNo', sql.NVarChar, String(finalAccNo));
                goiUpdateReq.input('Subglcode', sql.NVarChar, String(editData.Subglcode || currentGRow.SUBGLCDE || ''));
                goiUpdateReq.input('Category', sql.NVarChar, String(catId));
                goiUpdateReq.input('CatString', sql.NVarChar, String(catString));
                goiUpdateReq.input('SLR', sql.NVarChar, String(editData.SLR || currentGRow.SLRType || ''));
                
                // Extra fields for Insert
                goiUpdateReq.input('ISIN', sql.NVarChar, String(pRow.ISIN || ''));
                goiUpdateReq.input('Security', sql.NVarChar, String(pRow.Security || ''));
                goiUpdateReq.input('BRCD', sql.NVarChar, String(sessionData.brcd || '1'));
                goiUpdateReq.input('MID', sql.Int, parseInt(sessionData.mid || 0));
                goiUpdateReq.input('Trade_Type', sql.NVarChar, String(pRow.Trade_Type || 'BUY'));

                await goiUpdateReq.query(`
                    -- Delete potential duplicates to ensure a clean slate for the UPSERT logic
                    DELETE FROM GOI_SECURITY WHERE Trade_Number = @Trade_Number AND (SUBGLCDE = '' OR SUBGLCDE = '0' OR ACCNO = '0')

                    IF EXISTS (SELECT 1 FROM GOI_SECURITY WHERE Trade_Number = @Trade_Number)
                    BEGIN
                        UPDATE GOI_SECURITY 
                        SET ACCNO = @AccNo,
                            SUBGLCDE = @Subglcode,
                            Category = CASE WHEN ISNUMERIC(@Category)=1 THEN CAST(@Category AS INT) ELSE 0 END,
                            CATEGORIES = @CatString,
                            SLRType = @SLR
                        WHERE Trade_Number = @Trade_Number
                    END
                    ELSE
                    BEGIN
                        INSERT INTO GOI_SECURITY (
                            Trade_Number, ACCNO, SUBGLCDE, Category, CATEGORIES, SLRType, 
                            ISIN, NAME_GOI_SECURITY, BRCD, MID, Trade_Type, RecSrno, SYSTEMDATE
                        ) VALUES (
                            @Trade_Number, @AccNo, @Subglcode, 
                            CASE WHEN ISNUMERIC(@Category)=1 THEN CAST(@Category AS INT) ELSE 0 END, 
                            @CatString, @SLR, 
                            @ISIN, @Security, @BRCD, @MID, @Trade_Type, '1', GETDATE()
                        )
                    END
                `);

                console.log(`[DEBUG] Synchronized purchase and GOI_SECURITY for record ${id} before authorization.`);


                // 2. Fetch GOI_SECURITY data and calculated values (IR, AR, AvAmt) using Trade_Number
                const goiReq = pool.request();
                goiReq.input('Trade_Number', sql.NVarChar, pRow.Trade_Number);
                goiReq.input('WDate', sql.DateTime, sessionData.entryDate);

                const goiResult = await goiReq.query(`
                    SELECT G.SUBGLCDE, G.ACCNO, G.RecSrno, G.Trade_Type, G.ISIN,
                           G1.int_amt as AR, 
                           G2.book_value1 as AvAmt
                    FROM GOI_SECURITY G
                    LEFT JOIN (
                        SELECT AccountNo ACCNO, abs(Sum(case when trxtype=2 then -1*amount else amount end)) int_amt, RecSrno, SubGlCode 
                        FROM AVS_GOITRX 
                        WHERE Trade_Type='ACCR' AND EntryDate <= @WDate 
                        GROUP BY AccountNo, RecSrno, SubGlCode
                    ) G1 ON G.SUBGLCDE=G1.SubGlCode AND G.ACCNO=G1.ACCNO AND G.RecSrno=G1.RecSrno
                    LEFT JOIN (
                        SELECT ISIN, SUBGLCDE, ACCNO, Sum(CASE WHEN Trxtype='2' THEN -1* BOOK_VALUE ELSE BOOK_VALUE END) book_value1, RecSrno 
                        FROM GOI_SECURITY 
                        WHERE Trade_Type in('SELL','BUY','TR-AMT') 
                        GROUP BY ISIN, SUBGLCDE, ACCNO, RecSrno
                    ) G2 ON G.ISIN=G2.ISIN AND G.SUBGLCDE=G2.SUBGLCDE AND G.ACCNO=G2.ACCNO AND G.RecSrno=G2.RecSrno
                    WHERE G.Trade_Number = @Trade_Number
                `);

                const gRow = goiResult.recordset[0];
                if (!gRow) {
                    console.error(`[ERROR] No matching GOI_SECURITY record found for Trade_Number: ${pRow.Trade_Number}`);
                    results.push({ id, status: 'Failed', error: `Security master record not found for Trade Number ${pRow.Trade_Number}` });
                    continue;
                }

                // 3. Ensure AVS5002 DaySetNo initialized
                const preReq = pool.request();
                preReq.input('EntryDate', sql.DateTime, sessionData.entryDate);
                preReq.input('BRCD', sql.VarChar(50), sessionData.brcd ? sessionData.brcd.toString() : '1');
                preReq.input('MID', sql.VarChar(50), sessionData.mid ? sessionData.mid.toString() : '0');
                await preReq.query(`
                    IF NOT EXISTS (SELECT 1 FROM AVS5002 WHERE ENTRYDATE = CONVERT(nvarchar(10), @EntryDate, 121) AND PARAMETERNAME = 'DaySetNo' AND brcd = @BRCD)
                    BEGIN
                        INSERT INTO AVS5002 (ENTRYDATE, PARAMETERNAME, LASTNO, MID, MIDDATE, SYSTEMDATE, BRCD) 
                        VALUES (CONVERT(nvarchar(10), @EntryDate, 121), 'DaySetNo', '0', @MID, GETDATE(), GETDATE(), @BRCD)
                    END
                `);

                // 4. Map parameters for ISP_GSecuTransaction
                const request = pool.request();
                
                    // Map UI display values back to numeric strings for the SP's conditional logic
                    const counterMap = { 'CounterParty1': '1', 'NDS-OM': '2' };

                    // Helper to clean numeric strings
                    const clean = (val) => {
                        if (val === undefined || val === null || val === '') return '0';
                        return String(val).replace(/,/g, '').trim() || '0';
                    };

                    paramsForLog = {
                        ID: id.toString(),
                        MID: sessionData.mid ? sessionData.mid.toString() : '12', 
                        EntryDate: sessionData.entryDate,
                        Flag: 'Purchase',
                        BRCD: sessionData.brcd ? sessionData.brcd.toString() : '1',
                        Counter: counterMap[editData.Counter || editData.CounterParty || gRow.CounterParty || pRow.Counterparty] || '1',
                        SLR: slrMap[editData.SLR || gRow.SLRType || pRow.SLR] || '1',
                        Category: catId || '1',
                        Subglcode: (editData.Subglcode || gRow.SUBGLCDE || '0').toString().trim() || '0',
                        Accno: (finalAccNo || gRow.ACCNO || '0').toString().trim() || '0',
                        SType: (editData.Subglcode || gRow.SUBGLCDE || '0').toString().trim() || '0',
                        PL: clean(editData.PL),
                        RecsrNo: (gRow.RecSrno || gRow.RecSrNo || '1').toString(),
                        IR: clean(editData.IR || gRow.IR),
                        AR: clean(editData.AR || gRow.AR),
                        AvAmt: clean(editData.AvAmt || gRow.AvAmt)
                    };

                console.log(`[DEBUG] Authorizing ID ${id} with individual parameters:`);
                Object.keys(paramsForLog).forEach(key => {
                    console.log(`  - ${key}: [${paramsForLog[key]}] (${typeof paramsForLog[key]})`);
                });

                try {
                    request.input('ID', sql.VarChar(50), String(paramsForLog.ID));
                    request.input('MID', sql.VarChar(50), String(paramsForLog.MID));
                    request.input('EntryDate', sql.DateTime, paramsForLog.EntryDate);
                    request.input('Flag', sql.VarChar(50), String(paramsForLog.Flag));
                    request.input('BRCD', sql.VarChar(50), String(paramsForLog.BRCD));
                    request.input('Counter', sql.VarChar(50), String(paramsForLog.Counter));
                    request.input('SLR', sql.VarChar(50), String(paramsForLog.SLR));
                    request.input('Category', sql.VarChar(50), String(paramsForLog.Category));
                    request.input('IntSubglcode', sql.VarChar(50), String(paramsForLog.Subglcode));
                    request.input('IntAcc', sql.VarChar(50), String(paramsForLog.Accno));
                    request.input('SType', sql.VarChar(50), String(paramsForLog.SType));
                    request.input('PL', sql.VarChar(50), String(paramsForLog.PL));
                    request.input('RecSrNo', sql.VarChar(50), String(paramsForLog.RecsrNo));
                    request.input('IRAmt', sql.VarChar(50), String(paramsForLog.IR));
                    request.input('ARAmt', sql.VarChar(50), String(paramsForLog.AR));
                    request.input('AVAmt', sql.VarChar(50), String(paramsForLog.AvAmt));
                } catch (paramError) {
                    console.error(`[CRITICAL] Parameter binding failed for ID ${id}:`, paramError);
                    throw paramError;
                }

                const result = await request.execute('ISP_GSecuTransaction');
                
                // LOG SUCCESS
                Logger.logSPExecution('ISP_GSecuTransaction', paramsForLog, 'SUCCESS', result.rowsAffected[0]);

                results.push({ id, status: 'Authorized', data: result.recordset });

            } catch (e) {
                // LOG FAILURE
                Logger.logSPExecution('ISP_GSecuTransaction', paramsForLog, 'FAILED', 0, e);
                const fullError = {
                    message: e.message,
                    code: e.code,
                    number: e.number,
                    state: e.state,
                    procedure: e.procName || e.procedureName,
                    line: e.lineNumber
                };
                console.error(`SP Execution Error for ID ${id}:`, JSON.stringify(fullError, null, 2));
                results.push({ id, status: 'Failed', error: e.message || 'Unknown SP error' });
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

    async getProductCodeBySecType(secType) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('secType', sql.VarChar(100), secType);
            const result = await request.query('SELECT TOP 1 GLCODE, SUBGLCODE FROM GLMAST WHERE GLNAME = @secType');
            return result.recordset.length > 0 ? result.recordset[0] : { GLCODE: '', SUBGLCODE: '' };
        } catch (err) {
            console.error('Error fetching product code:', err);
            throw err;
        }
    }

    async getSecuritiesByProdCode(prodCode) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('prodCode', sql.NVarChar, prodCode.toString());
        const result = await request.query(`
            SELECT 
                G.*,
                G.NAME_GOI_SECURITY AS Security,
                G.SUBGLCDE AS SUBGLCODE,
                CONVERT(nvarchar(10), G.DATE_PURCHASE, 23) AS DATE_PURCHASE_FMT,
                CONVERT(nvarchar(10), G.MATURITY_DATE, 23) AS MATURITY_DATE_FMT,
                CONVERT(nvarchar(10), G.Settlement_Date, 23) AS Settlement_Date_FMT,
                CONVERT(nvarchar(10), G.Last_Interest_Payment_Date, 23) AS Last_Int_Date_FMT,
                CONVERT(nvarchar(10), G.Trade_Date, 23) AS Trade_Date_FMT
            FROM GOI_SECURITY G
            WHERE G.SUBGLCDE = @prodCode
            ORDER BY G.ISIN, G.ACCNO
        `);
        return result.recordset;
    }
}

module.exports = new PurchaseService();