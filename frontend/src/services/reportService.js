const API_BASE_URL = `${import.meta.env.VITE_API_URL}/reports`;

/**
 * Fetch G-Security reports from the database
 * @param {string} endpoint 'details', 'summary', or 'date-wise'
 * @param {Object} params { wDate, prdcode, isin, category }
 */
export const getGSecurityReport = async (endpoint, params) => {
    const queryParams = new URLSearchParams({
        wDate: params.wDate || '',
        prdcode: params.prdcode || '',
        isin: params.isin || '',
        category: params.category || '0'
    });

    const response = await fetch(`${API_BASE_URL}/g-security/${endpoint}?${queryParams.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch report: ${response.statusText}`);
    }
    return response.json();
};