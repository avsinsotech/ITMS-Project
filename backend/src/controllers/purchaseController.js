const purchaseService = require('../services/purchaseService');

class PurchaseController {
    async uploadExcel(req, res) {
        try {
            console.log(`[DEBUG] Controller uploadExcel called. req.user: ${JSON.stringify(req.user)}`);
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            // Use mid from the authenticated user session (PERMISSIONNO)
            const mid = req.user?.id;
            console.log(`[DEBUG] Passing mid to service: ${mid}`);
            const count = await purchaseService.processExcel(req.file.buffer, req.file.originalname, mid);
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
            const { ids, data } = req.body;
            if (!ids || !ids.length) {
                return res.status(400).send('No IDs provided for authorization.');
            }
            
            // Extract session data from JWT (PERMISSIONNO and BRCD)
            const sessionData = {
                mid: req.user.id,
                brcd: req.user.brcd,
                entryDate: new Date() // Current session date
            };

            // If updated record data is provided, pass it to the service
            const result = await purchaseService.authorizePurchases(ids, sessionData, data);
            res.json({ success: true, authorized: result });
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

    async getProductCodeBySecType(req, res) {
        try {
            const { secType } = req.params;
            const prCode = await purchaseService.getProductCodeBySecType(secType);
            res.json({ prCode });
        } catch (err) {
            console.error('Get Product Code Error:', err);
            res.status(500).send(err.message);
        }
    }

    async getSecuritiesByProdCode(req, res) {
        try {
            const { prodCode } = req.params;
            const data = await purchaseService.getSecuritiesByProdCode(prodCode);
            res.json(data);
        } catch (err) {
            console.error('Get Securities By ProdCode Error:', err);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PurchaseController();