const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepo = require('../repositories/authRepository');

class AuthService {
    async login(username, password) {
        // 1. Find user
        const user = await authRepo.getUserByUsername(username);
        if (!user) {
            throw new Error("Invalid username or password.");
        }

        // 2. Verify password hash
        const isMatch = await bcrypt.compare(password, user.PASSWORD);
        if (!isMatch) {
            throw new Error("Invalid username or password.");
        }

        // 3. Generate JWT
        const payload = {
            id: user.ID,
            username: user.USERNAME
        };

        const secret = process.env.JWT_SECRET || 'fallback_secret';
        const token = jwt.sign(payload, secret, { expiresIn: '8h' });

        return {
            token,
            user: {
                id: user.ID,
                username: user.USERNAME
            }
        };
    }
}

module.exports = new AuthService();
