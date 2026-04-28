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

        // 2. Verify password
        // The USERMASTER table uses 'password' (lowercase) for plain text and 'EPASSWORD' for encrypted
        const dbPassword = user.password || user.PASSWORD; // Handle potential casing issues
        const dbEPassword = user.EPASSWORD || user.epassword;

        let isMatch = (password === dbPassword);
        
        if (!isMatch && dbEPassword) {
            try {
                // If it looks like a bcrypt hash, compare it
                if (dbEPassword.startsWith('$2')) {
                    isMatch = await bcrypt.compare(password, dbEPassword);
                }
            } catch (e) {
                // Ignore error
            }
        }

        if (!isMatch) {
            throw new Error("Invalid username or password.");
        }

        // 3. Generate JWT
        const payload = {
            id: user.PERMISSIONNO,
            username: user.USERNAME || user.LOGINCODE,
            brcd: user.BRCD
        };

        const secret = process.env.JWT_SECRET || 'fallback_secret';
        const token = jwt.sign(payload, secret, { expiresIn: '8h' });

        return {
            token,
            user: {
                id: user.PERMISSIONNO,
                username: user.USERNAME || user.LOGINCODE,
                brcd: user.BRCD
            }
        };
    }
}

module.exports = new AuthService();