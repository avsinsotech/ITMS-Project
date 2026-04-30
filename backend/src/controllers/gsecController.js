const gsecService = require('../services/gsecService');

class GSecController {
    async uploadMTMExcel(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const data = await gsecService.processMTMExcel(req.file.buffer);
            res.json(data);
        } catch (err) {
            console.error('MTM Upload Error:', err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    }
}

module.exports = new GSecController();
