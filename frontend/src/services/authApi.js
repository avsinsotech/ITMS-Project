const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Authenticate a user and return a JWT token
 * @param {string} username 
 * @param {string} password 
 */
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        return data; // { success: true, token: '...', user: {...} }
    } catch (error) {
        throw error;
    }
};
