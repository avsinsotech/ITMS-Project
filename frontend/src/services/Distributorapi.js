// services/distributorApi.js
// Mirrors the backend routes:
//   POST   /api/distributor          → createDistributor
//   GET    /api/distributor          → getAllDistributors  (with filters + pagination)
//   GET    /api/distributor/:id      → getDistributorById
//   PUT    /api/distributor/:id      → updateDistributor

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/distributor`;

// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/distributor
// Params: { Commission_Type?, Is_Active?, SearchTerm?, PageNumber?, PageSize? }
// ─────────────────────────────────────────────────────────────────────────────
export const getAllDistributors = async (params = {}) => {
    const {
        Commission_Type = '',
        Is_Active       = '',   // '' = all, '1' = active, '0' = inactive
        SearchTerm      = '',
        PageNumber      = 1,
        PageSize        = 20,
    } = params;

    const query = new URLSearchParams();
    if (Commission_Type) query.set('Commission_Type', Commission_Type);
    if (Is_Active !== '') query.set('Is_Active', Is_Active);
    if (SearchTerm)      query.set('SearchTerm', SearchTerm);
    query.set('PageNumber', PageNumber);
    query.set('PageSize',   PageSize);

    const response = await fetch(`${API_BASE_URL}?${query.toString()}`);
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || `Failed to fetch distributors: ${response.statusText}`);
    }
    return response.json();
    // Returns: { success, total, page, pageSize, totalPages, data: [...] }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/distributor/:id
// ─────────────────────────────────────────────────────────────────────────────
export const getDistributorById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || `Failed to fetch distributor ${id}`);
    }
    return response.json();
    // Returns: { success, data: { ...Distributor } }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST  /api/distributor
// Body: { Distributor_Code, Distributor_Name, ARN_No?, EUIN?, Sub_Broker_Code?,
//         PAN?, GSTIN?, Commission_Type?, Empanelment_Date?, Created_By? }
// ─────────────────────────────────────────────────────────────────────────────
export const createDistributor = async (payload) => {
    const response = await fetch(API_BASE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(body.message || 'Failed to create distributor');
    }
    return body;
    // Returns: { success, message, data: { ...Distributor } }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT  /api/distributor/:id
// Body: same as POST plus Is_Active? and Modified_By?
// ─────────────────────────────────────────────────────────────────────────────
export const updateDistributor = async (id, payload) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(body.message || `Failed to update distributor ${id}`);
    }
    return body;
    // Returns: { success, message, data: { ...Distributor } }
};