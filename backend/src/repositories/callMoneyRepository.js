const { sql, poolPromise } = require('../config/db');

class CallMoneyRepository {
    async createDeal(dealData) {
        const pool = await poolPromise;
        const request = pool.request();
        
        // Generate a unique deal_id since the table uses varchar(20) and likely doesn't have IDENTITY
        const dealId = 'CM' + Date.now().toString().slice(-10) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        request.input('deal_id', sql.NVarChar, dealId);
        request.input('deal_type', sql.NVarChar, dealData.deal_type);
        request.input('transaction_type', sql.NVarChar, dealData.transaction_type);
        request.input('counterparty_id', sql.Int, dealData.counterparty_id);
        request.input('counterparty_name', sql.NVarChar, dealData.counterparty_name);
        request.input('principal_amount', sql.Decimal(18, 2), dealData.principal_amount);
        request.input('interest_rate', sql.Decimal(10, 4), dealData.interest_rate);
        request.input('deal_date', sql.DateTime, dealData.deal_date || new Date());
        request.input('maturity_date', sql.DateTime, dealData.maturity_date);
        request.input('days', sql.Int, dealData.days);
        request.input('interest_amount', sql.Decimal(18, 2), dealData.interest_amount);
        request.input('status', sql.NVarChar, 'DRAFT'); // Initial status is always DRAFT
        request.input('created_by', sql.Int, dealData.created_by || 1);

        const result = await request.query(`
            INSERT INTO call_money_deals 
            (deal_id, deal_type, transaction_type, counterparty_id, counterparty_name, principal_amount, interest_rate, deal_date, maturity_date, days, interest_amount, status, created_by, created_at, updated_at)
            VALUES 
            (@deal_id, @deal_type, @transaction_type, @counterparty_id, @counterparty_name, @principal_amount, @interest_rate, @deal_date, @maturity_date, @days, @interest_amount, @status, @created_by, GETDATE(), GETDATE())
        `);
        return dealId;
    }

    async getDealById(dealId) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, dealId.toString());
        const result = await request.query(`SELECT * FROM call_money_deals WHERE deal_id = @deal_id`);
        return result.recordset[0];
    }

    async getAllDeals(status, counterparty_id) {
        const pool = await poolPromise;
        const request = pool.request();
        
        let query = `SELECT * FROM call_money_deals WHERE 1=1 `;
        if (status) {
            request.input('status', sql.NVarChar, status);
            query += ` AND status = @status`;
        }
        if (counterparty_id) {
            request.input('counterparty_id', sql.Int, counterparty_id);
            query += ` AND counterparty_id = @counterparty_id`;
        }
        query += ` ORDER BY created_at DESC`;
        
        const result = await request.query(query);
        return result.recordset;
    }

    async updateDealStatus(dealId, newStatus, userId) {
        const pool = await poolPromise;
        const request = pool.request();
        
        request.input('deal_id', sql.NVarChar, dealId.toString());
        request.input('new_status', sql.NVarChar, newStatus);
        
        const currentDeal = await this.getDealById(dealId);
        if (!currentDeal) throw new Error("Deal not found");
        
        await request.query(`UPDATE call_money_deals SET status = @new_status, updated_at = GETDATE() WHERE deal_id = @deal_id`);
        
        // Log history
        await this.insertStatusHistory(dealId, currentDeal.status, newStatus, userId);
    }

    async updateDeal(dealId, dealData) {
        const pool = await poolPromise;
        const request = pool.request();
        
        let query = `UPDATE call_money_deals SET updated_at = GETDATE()`;
        
        request.input('deal_id', sql.NVarChar, dealId.toString());
        
        if (dealData.principal_amount !== undefined) {
            request.input('principal_amount', sql.Decimal(18, 2), dealData.principal_amount);
            query += `, principal_amount = @principal_amount`;
        }
        if (dealData.interest_rate !== undefined) {
            request.input('interest_rate', sql.Decimal(10, 4), dealData.interest_rate);
            query += `, interest_rate = @interest_rate`;
        }
        if (dealData.maturity_date !== undefined) {
            request.input('maturity_date', sql.DateTime, dealData.maturity_date);
            query += `, maturity_date = @maturity_date`;
        }
        if (dealData.interest_amount !== undefined) {
            request.input('interest_amount', sql.Decimal(18, 2), dealData.interest_amount);
            query += `, interest_amount = @interest_amount`;
        }
        
        query += ` WHERE deal_id = @deal_id`;
        
        await request.query(query);
    }

    async insertStatusHistory(dealId, oldStatus, newStatus, userId) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, dealId.toString());
        request.input('old_status', sql.NVarChar, oldStatus);
        request.input('new_status', sql.NVarChar, newStatus);
        request.input('changed_by', sql.Int, userId || 1);

        await request.query(`
            INSERT INTO deal_status_history (deal_id, old_status, new_status, changed_by, changed_at)
            VALUES (@deal_id, @old_status, @new_status, @changed_by, GETDATE())
        `);
    }

    async insertComplianceCheck(data) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, data.deal_id.toString());
        request.input('is_scheduled_bank', sql.Bit, data.is_scheduled_bank);
        request.input('rate_valid', sql.Bit, data.rate_valid);
        request.input('nds_reported', sql.Bit, data.nds_reported);
        request.input('deal_slip_generated', sql.Bit, data.deal_slip_generated);
        request.input('maker_checker_done', sql.Bit, data.maker_checker_done);
        request.input('limit_check', sql.Bit, data.limit_check);
        request.input('remarks', sql.NVarChar, data.remarks);

        await request.query(`
            INSERT INTO compliance_checks 
            (deal_id, is_scheduled_bank, rate_valid, nds_reported, deal_slip_generated, maker_checker_done, limit_check, remarks, checked_at)
            VALUES 
            (@deal_id, @is_scheduled_bank, @rate_valid, @nds_reported, @deal_slip_generated, @maker_checker_done, @limit_check, @remarks, GETDATE())
        `);
    }

    async insertApprovalWorkflow(dealId, makerId, checkerId, status, remarks) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, dealId.toString());
        request.input('maker_id', sql.Int, makerId);
        request.input('checker_id', sql.Int, checkerId || null);
        request.input('approval_status', sql.NVarChar, status);
        request.input('remarks', sql.NVarChar, remarks);

        await request.query(`
            INSERT INTO approval_workflow (deal_id, maker_id, checker_id, approval_status, approved_at, remarks)
            VALUES (@deal_id, @maker_id, @checker_id, @approval_status, GETDATE(), @remarks)
        `);
    }

    async insertRollover(rolloverData) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, rolloverData.deal_id.toString());
        request.input('old_rate', sql.Decimal(10, 4), rolloverData.old_rate);
        request.input('new_rate', sql.Decimal(10, 4), rolloverData.new_rate);
        request.input('old_maturity', sql.DateTime, rolloverData.old_maturity);
        request.input('new_maturity', sql.DateTime, rolloverData.new_maturity);
        request.input('interest_adjustment', sql.Decimal(18, 2), rolloverData.interest_adjustment);
        request.input('created_by', sql.Int, rolloverData.created_by || 1);

        const result = await request.query(`
            INSERT INTO call_money_rollovers 
            (deal_id, old_rate, new_rate, old_maturity, new_maturity, rollover_date, interest_adjustment, created_by, created_at)
            OUTPUT inserted.rollover_id
            VALUES 
            (@deal_id, @old_rate, @new_rate, @old_maturity, @new_maturity, GETDATE(), @interest_adjustment, @created_by, GETDATE())
        `);
        return result.recordset[0].rollover_id;
    }

    async getRollovers() {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM call_money_rollovers ORDER BY created_at DESC`);
        return result.recordset;
    }

    async insertInterestLog(logData) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, logData.deal_id ? logData.deal_id.toString() : null);
        request.input('principal', sql.Decimal(18, 2), logData.principal);
        request.input('rate', sql.Decimal(10, 4), logData.rate);
        request.input('days', sql.Int, logData.days);
        request.input('calculated_interest', sql.Decimal(18, 2), logData.calculated_interest);
        request.input('formula_used', sql.NVarChar, logData.formula_used);

        await request.query(`
            INSERT INTO interest_calculations_log (deal_id, principal, rate, days, calculated_interest, formula_used, created_at)
            VALUES (@deal_id, @principal, @rate, @days, @calculated_interest, @formula_used, GETDATE())
        `);
    }

    async getCounterparty(id) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('id', sql.Int, id);
        const result = await request.query(`SELECT * FROM counterparty_master WHERE counterparty_id = @id`);
        return result.recordset[0];
    }
    
    async getAllCounterparties() {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM counterparty_master ORDER BY bank_name`);
        return result.recordset;
    }

    async updateCounterpartyLimit(id, utilizedChange) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('id', sql.Int, id);
        request.input('change', sql.Decimal(18, 2), utilizedChange);
        await request.query(`UPDATE counterparty_master SET utilized_limit = utilized_limit + @change WHERE counterparty_id = @id`);
    }

    async insertNdsReporting(dealId, ndsRefNo) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, dealId.toString());
        request.input('nds_ref_no', sql.NVarChar, ndsRefNo);
        request.input('report_status', sql.NVarChar, 'REPORTED');

        await request.query(`
            INSERT INTO nds_reporting (deal_id, nds_ref_no, reported_flag, reported_at, report_status)
            VALUES (@deal_id, @nds_ref_no, 1, GETDATE(), @report_status)
        `);
        
        await request.query(`UPDATE call_money_deals SET nds_reference = @nds_ref_no WHERE deal_id = @deal_id`);
    }

    async getNdsStatus(dealId) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, dealId.toString());
        const result = await request.query(`SELECT TOP 1 * FROM nds_reporting WHERE deal_id = @deal_id ORDER BY reported_at DESC`);
        return result.recordset[0];
    }

    async insertSettlement(settlementData) {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('deal_id', sql.NVarChar, settlementData.deal_id.toString());
        request.input('principal_received', sql.Decimal(18, 2), settlementData.principal_received);
        request.input('interest_received', sql.Decimal(18, 2), settlementData.interest_received);
        request.input('payment_mode', sql.NVarChar, settlementData.payment_mode || 'NEFT');

        await request.query(`
            INSERT INTO deal_settlements (deal_id, principal_received, interest_received, settlement_date, payment_mode, created_at)
            VALUES (@deal_id, @principal_received, @interest_received, GETDATE(), @payment_mode, GETDATE())
        `);
    }
}

module.exports = new CallMoneyRepository();
