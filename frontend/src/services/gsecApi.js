const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
};

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/gsec`;

/**
 * Upload MTM Valuation Excel
 */
export const uploadMTMExcel = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/upload-mtm`, {
        method: 'POST',
        headers: {
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to upload MTM excel');
    }

    return response.json();
};
