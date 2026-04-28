const API_BASE_URL = `${import.meta.env.VITE_API_URL}/purchase`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
    };
};

/**
 * Fetch all G-Sec / Purchase records from the database
 */
export const getPurchases = async () => {
    const response = await fetch(API_BASE_URL, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch purchases: ${response.statusText}`);
    }
    return response.json();
};

/**
 * Upload an Excel file to the database for UPSERT
 */
export const uploadPurchaseExcel = async (file, mid) => {
    const formData = new FormData();
    formData.append('file', file);
    if (mid) formData.append('mid', mid);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/upload-excel`, {
        method: 'POST',
        headers: {
            'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to upload excel');
    }

    return response.json();
};

/**
 * Get a single purchase by ID or Trade Number
 */
export const getPurchaseById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch purchase ${id}`);
    }
    return response.json();
};

/**
 * Authorize purchase records (calls stored procedure on backend)
 */
export const authorizePurchases = async (ids, data = null) => {
    const response = await fetch(`${API_BASE_URL}/authorize`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids, data }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to authorize transactions');
    }

    return response.json();
};

/**
 * Delete a purchase record from the database
 */
export const deletePurchase = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to delete record ${id}`);
    }

    return response.json();
};

/**
 * Get purchase records by postset (Set Number)
 */
export const getPurchasesByPostset = async (postset) => {
    const response = await fetch(`${API_BASE_URL}/set/${postset}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch purchases for postset ${postset}`);
    }
    return response.json();
};

/**
 * Fetch ProdCode from GLMAST by Sec Type
 */
export const getProductCode = async (secType) => {
    const response = await fetch(`${API_BASE_URL}/prodcode/${encodeURIComponent(secType)}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch product code for ${secType}`);
    }
    const data = await response.json();
    return data.prCode;
};

/**
 * Fetch GOI_SECURITY records by ProdCode (SUBGLCODE)
 */
export const getSecuritiesByProdCode = async (prodCode) => {
    const response = await fetch(`${API_BASE_URL}/securities/${encodeURIComponent(prodCode)}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch securities for prodCode ${prodCode}`);
    }
    return response.json();
};
