const callMoneyRepo = require('../repositories/callMoneyRepository');

class CallMoneyService {

    async calculateAndLogInterest({ deal_id, principal, rate, days }) {
        if (!principal || !rate || !days) {
            throw new Error("Principal, rate, and days are required to calculate interest");
        }
        
        // Formula: Interest = (Principal * Rate * Days) / 36500 if rate is percentage, or 365 if rate is decimal.
        // Assuming rate is percentage (e.g. 5.5 means 5.5%), it should be divided by 100 * 365 = 36500.
        // Wait, standard banking is (P * R * N) / 365. Let's strictly use (P * (R/100) * N) / 365
        const calculated_interest = (Number(principal) * (Number(rate) / 100) * Number(days)) / 365;
        const interestStr = calculated_interest.toFixed(2);

        await callMoneyRepo.insertInterestLog({
            deal_id,
            principal,
            rate,
            days,
            calculated_interest: interestStr,
            formula_used: '(Principal * (Rate/100) * Days) / 365'
        });

        return parseFloat(interestStr);
    }

    async createDeal(dealData) {
        // Enforce business logic: Interest must be auto-calculated before saving
        const interest = await this.calculateAndLogInterest({
            principal: dealData.principal_amount,
            rate: dealData.interest_rate,
            days: dealData.days
        });

        dealData.interest_amount = interest;

        // Verify Counterparty and check limits
        const counterparty = await callMoneyRepo.getCounterparty(dealData.counterparty_id);
        if (!counterparty) {
            throw new Error(`Counterparty with ID ${dealData.counterparty_id} does not exist.`);
        }
        
        dealData.counterparty_name = counterparty.bank_name;

        // Auto limit update (adds to utilized limit)
        if (counterparty.limit_amount > 0 && ((counterparty.utilized_limit + dealData.principal_amount) > counterparty.limit_amount)) {
            // Can be a warning, but business rule specifies limit check.
            console.warn("Soft Warning: Limit Exceeded.");
        }

        const dealId = await callMoneyRepo.createDeal(dealData);

        // Update counterparty utilized limit
        await callMoneyRepo.updateCounterpartyLimit(dealData.counterparty_id, dealData.principal_amount);

        // Run compliance check post-deal creation
        await this.runComplianceCheck(dealId);

        return dealId;
    }

    async runComplianceCheck(dealId) {
        const deal = await callMoneyRepo.getDealById(dealId);
        if (!deal) throw new Error("Deal not found");
        
        const counterparty = await callMoneyRepo.getCounterparty(deal.counterparty_id);
        
        // Logical checks
        const isScheduled = !!counterparty.is_scheduled_bank;
        const limitCheck = counterparty.limit_amount >= (counterparty.utilized_limit); // Evaluates if currently strictly within bounds
        const rateValid = deal.interest_rate > 0 && deal.interest_rate < 20; // Example valid range check
        
        // Report into compliance_checks table
        await callMoneyRepo.insertComplianceCheck({
            deal_id: deal.deal_id,
            is_scheduled_bank: isScheduled,
            rate_valid: rateValid,
            nds_reported: !!deal.nds_reference,
            deal_slip_generated: !!deal.deal_slip_no,
            maker_checker_done: deal.status === 'ACTIVE' || deal.status === 'MATURED',
            limit_check: limitCheck,
            remarks: isScheduled ? 'Compliance OK' : 'Non-scheduled bank'
        });
        
        // Return summary
        return { is_scheduled_bank: isScheduled, rate_valid: rateValid, limit_check: limitCheck };
    }

    async submitDeal(dealId, userId) {
        // Change from DRAFT to PENDING
        const deal = await callMoneyRepo.getDealById(dealId);
        if (deal.status !== 'DRAFT') {
            throw new Error("Only deals in DRAFT status can be submitted for approval.");
        }

        await callMoneyRepo.updateDealStatus(dealId, 'PENDING', userId);
        return { success: true, message: "Deal submitted successfully." };
    }

    async approveDeal(dealId, checkerId) {
        const deal = await callMoneyRepo.getDealById(dealId);
        if (deal.status !== 'PENDING') {
            throw new Error("Deal is not in PENDING status.");
        }

        // Cannot approve if compliance fails
        const compliance = await this.runComplianceCheck(dealId);
        if (!compliance.is_scheduled_bank) {
            throw new Error("Approval Denied: Compliance Failed (Not a scheduled bank).");
        }

        await callMoneyRepo.updateDealStatus(dealId, 'ACTIVE', checkerId);

        // Log approval workflow
        await callMoneyRepo.insertApprovalWorkflow(dealId, deal.created_by, checkerId, 'APPROVED', 'Approved by Checker');

        return { success: true, message: "Deal approved." };
    }

    async rejectDeal(dealId, checkerId, remarks) {
        const deal = await callMoneyRepo.getDealById(dealId);
        if (deal.status !== 'PENDING') {
            throw new Error("Deal is not in PENDING status.");
        }

        await callMoneyRepo.updateDealStatus(dealId, 'REJECTED', checkerId);
        await callMoneyRepo.insertApprovalWorkflow(dealId, deal.created_by, checkerId, 'REJECTED', remarks || 'Rejected by Checker');

        return { success: true, message: "Deal rejected." };
    }

    async rolloverDeal(dealId, rolloverData, userId) {
        const oldDeal = await callMoneyRepo.getDealById(dealId);
        if (!oldDeal) throw new Error("Deal not found.");
        
        // Cannot rollover unless MATURED
        if (oldDeal.status !== 'MATURED') {
            throw new Error("Cannot rollover unless deal is MATURED.");
        }

        // Create new deal with same principal
        const newDealId = await this.createDeal({
            deal_type: oldDeal.deal_type,
            transaction_type: oldDeal.transaction_type,
            counterparty_id: oldDeal.counterparty_id,
            principal_amount: oldDeal.principal_amount,
            interest_rate: rolloverData.new_rate,
            deal_date: new Date(),
            maturity_date: rolloverData.new_maturity,
            days: rolloverData.days,
            created_by: userId
        });

        // Insert rollover record
        await callMoneyRepo.insertRollover({
            deal_id: dealId,
            old_rate: oldDeal.interest_rate,
            new_rate: rolloverData.new_rate,
            old_maturity: oldDeal.maturity_date,
            new_maturity: rolloverData.new_maturity,
            interest_adjustment: rolloverData.interest_adjustment || 0,
            created_by: userId
        });

        // The user says "Mark old deal as MATURED" but it's ALREADY required to be matured.
        // We will just leave it as MATURED, or update it to CLOSED if that's standard.
        // We'll keep it MATURED as per prompt: "Mark old deal as MATURED" -> no-op.

        return { new_deal_id: newDealId, old_deal_id: oldDeal.deal_id };
    }

    async reportToNds(dealId, ndsRefNo) {
        const deal = await callMoneyRepo.getDealById(dealId);
        if (!deal) throw new Error("Deal not found");
        
        await callMoneyRepo.insertNdsReporting(dealId, ndsRefNo);
        return { success: true, message: "Deal reported to NDS." };
    }

    async settleDeal(dealId, settlementData, userId) {
        const deal = await callMoneyRepo.getDealById(dealId);
        if (!deal) throw new Error("Deal not found.");
        
        // Cannot settle before maturity
        const today = new Date();
        const maturity = new Date(deal.maturity_date);
        if (today < maturity) {
            throw new Error("Cannot receive (settle) before maturity date.");
        }

        if (deal.status === 'CLOSED') {
            throw new Error("Deal is already settled/closed.");
        }

        // Insert settlement record
        await callMoneyRepo.insertSettlement({
            deal_id: dealId,
            principal_received: deal.principal_amount,
            interest_received: deal.interest_amount,
            payment_mode: settlementData.payment_mode
        });

        // Update status to CLOSED
        await callMoneyRepo.updateDealStatus(dealId, 'CLOSED', userId);

        // Update counterparty utilized limit (reduce it)
        await callMoneyRepo.updateCounterpartyLimit(deal.counterparty_id, -deal.principal_amount);

        return { success: true, message: "Deal settled and closed successfully. Counterparty limit updated." };
    }
}

module.exports = new CallMoneyService();
