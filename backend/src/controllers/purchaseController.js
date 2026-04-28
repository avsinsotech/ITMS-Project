const purchaseService = require('../services/purchaseService');

class PurchaseController {
    async uploadExcel(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const count = await purchaseService.processExcel(req.file.buffer, req.file.originalname);
            res.json({ success: count });
        } catch (err) {
            console.error('Upload Error:', err);
            res.status(500).send(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const data = await purchaseService.getAllPurchases();
            res.json(data);
        } catch (err) {
            console.error('Get All Error:', err);
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await purchaseService.getPurchaseById(id);
            if (!data) {
                return res.status(404).send('Purchase record not found.');
            }
            res.json(data);
        } catch (err) {
            console.error('Get By ID Error:', err);
            res.status(500).send(err.message);
        }
    }

    async authorize(req, res) {
        try {
            const { ids } = req.body;
            if (!ids || !ids.length) {
                return res.status(400).send('No IDs provided for authorization.');
            }
            const data = await purchaseService.authorizePurchases(ids);
            res.json({ success: true, authorized: data });
        } catch (err) {
            console.error('Authorization Error:', err);
            res.status(500).send(err.message);
        }
    }

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const success = await purchaseService.deletePurchaseById(id);
            if (!success) {
                return res.status(404).json({ success: false, message: 'Purchase record not found or already deleted.' });
            }
            res.json({ success: true, message: 'Purchase record deleted successfully.' });
        } catch (err) {
            console.error('Delete By ID Error:', err);
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getByPostset(req, res) {
        try {
            const { postset } = req.params;
            const data = await purchaseService.getPurchasesByPostset(postset);
            res.json(data);
        } catch (err) {
            console.error('Get By Postset Error:', err);
            res.status(500).send(err.message);
        }
    }
}

module.exports = new PurchaseController();