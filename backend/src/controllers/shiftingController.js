const shiftingService = require('../services/shiftingService');

class ShiftingController {
    async processShifting(req, res) {
        try {
            const { id, marketPrice, marketValue, classification } = req.body;
            
            if (!id || !marketPrice || !marketValue || !classification) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Missing required parameters: id, marketPrice, marketValue, classification' 
                });
            }

            const result = await shiftingService.executeShiftingProcess({
                id,
                marketPrice,
                marketValue,
                classification
            });

            res.json({ 
                success: true, 
                message: 'Shifting process executed successfully', 
                data: result 
            });
        } catch (err) {
            console.error('Shifting Process Error:', err);
            res.status(500).json({ 
                success: false, 
                message: err.message 
            });
        }
    }
}

module.exports = new ShiftingController();