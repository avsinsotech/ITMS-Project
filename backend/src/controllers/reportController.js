const reportService = require('../services/reportService');

class ReportController {
    async getGSecurityReport(req, res) {
        try {
            const { type, wDate, prdcode, isin, category } = req.query;
            
            const reportData = await reportService.getGSecurityReport({
                type,
                wDate,
                prdcode,
                isin,
                category
            });

            res.status(200).json(reportData || []);
        } catch (error) {
            console.error('Controller Error (getGSecurityReport):', error);
            res.status(500).json({ error: 'Failed to generate report', details: error.message });
        }
    }
}

module.exports = new ReportController();