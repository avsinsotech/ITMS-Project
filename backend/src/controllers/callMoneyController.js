const callMoneyService = require('../services/callMoneyService');
const callMoneyRepo = require('../repositories/callMoneyRepository');

class CallMoneyController {
    
    // 1. Deal APIs
    async createDeal(req, res) {
        try {
            const dealId = await callMoneyService.createDeal(req.body || {});
            res.status(201).json({ success: true, deal_id: dealId, message: "Deal created successfully in DRAFT status." });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async getDeals(req, res) {
        try {
            const { status, counterparty_id } = req.query;
            const deals = await callMoneyRepo.getAllDeals(status, counterparty_id);
            res.status(200).json(deals);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getDealById(req, res) {
        try {
            const deal = await callMoneyRepo.getDealById(req.params.id);
            if (!deal) return res.status(404).json({ success: false, error: "Deal not found" });
            res.status(200).json(deal);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async updateDeal(req, res) {
        try {
            await callMoneyRepo.updateDeal(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Deal updated successfully." });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async submitDeal(req, res) {
        try {
            // Usually user ID comes from req.user
            const body = req.body || {};
            const userId = body.user_id || 1; 
            const result = await callMoneyService.submitDeal(req.params.id, userId);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // 2. Approval APIs
    async approveDeal(req, res) {
        try {
            const body = req.body || {};
            const checkerId = body.checker_id || 2; // Stubbed checker
            const result = await callMoneyService.approveDeal(req.params.id, checkerId);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async rejectDeal(req, res) {
        try {
            const body = req.body || {};
            const checkerId = body.checker_id || 2;
            const result = await callMoneyService.rejectDeal(req.params.id, checkerId, body.remarks);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // 3. Rollover APIs
    async rolloverDeal(req, res) {
        try {
            const body = req.body || {};
            const userId = body.user_id || 1;
            const result = await callMoneyService.rolloverDeal(req.params.id, body, userId);
            res.status(201).json({ success: true, ...result, message: "Deal rolled over successfully." });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async getRollovers(req, res) {
        try {
            const rollovers = await callMoneyRepo.getRollovers();
            res.status(200).json(rollovers);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    // 4. Interest API
    async calculateInterest(req, res) {
        try {
            const interest = await callMoneyService.calculateAndLogInterest(req.body || {});
            res.status(200).json({ success: true, calculated_interest: interest });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // 5. Compliance API
    async complianceCheck(req, res) {
        try {
            const result = await callMoneyService.runComplianceCheck(req.params.id);
            res.status(200).json({ success: true, check_results: result });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // 6. Counterparty APIs
    async getCounterparties(req, res) {
        try {
            const parties = await callMoneyRepo.getAllCounterparties();
            res.status(200).json(parties);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getCounterpartyById(req, res) {
        try {
            const party = await callMoneyRepo.getCounterparty(req.params.id);
            if (!party) return res.status(404).json({ success: false, error: "Counterparty not found" });
            res.status(200).json(party);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    // 7. NDS Reporting APIs
    async reportToNds(req, res) {
        try {
            const { deal_id, nds_ref_no } = req.body || {};
            if (!deal_id || !nds_ref_no) throw new Error("deal_id and nds_ref_no are required.");
            
            const result = await callMoneyService.reportToNds(deal_id, nds_ref_no);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async getNdsStatus(req, res) {
        try {
            const status = await callMoneyRepo.getNdsStatus(req.params.deal_id);
            if (!status) return res.status(404).json({ success: false, error: "No reporting status found." });
            res.status(200).json(status);
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async settleDeal(req, res) {
        try {
            const body = req.body || {};
            const userId = body.user_id || 1;
            const result = await callMoneyService.settleDeal(req.params.id, body, userId);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = new CallMoneyController();
