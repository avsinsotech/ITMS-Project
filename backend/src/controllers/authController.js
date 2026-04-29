const authService = require('../services/authService');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ success: false, error: "Username and password are required." });
            }

            const result = await authService.login(username, password);
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (err) {
            res.status(401).json({ success: false, error: err.message });
        }
    }
}

module.exports = new AuthController();
