// src/services/termDepositApi.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8020/api';

/**
 * Validate GL Code — checks GLMAST where GLGROUP = 'INV'
 * Returns { valid: true, data: [...] } or { valid: false, message: '...' }
 */
export async function validateGLCode(glCode) {
    try {
        const res = await fetch(
            `${BASE_URL}/term-deposit/validate-gl?glCode=${encodeURIComponent(glCode)}`
        );
        const json = await res.json();
        if (!res.ok) return { valid: false, message: json.message || 'Invalid GL Code.' };
        return { valid: true, data: json.data };
    } catch {
        return { valid: false, message: 'Network error while validating GL Code.' };
    }
}

/**
 * Create a new Term Deposit
 * Returns { success, depositId, setNo, message }
 */
export async function createTermDeposit(payload) {
    const res = await fetch(`${BASE_URL}/term-deposit/create`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create term deposit.');
    return json;
}

/**
 * Fetch term deposits for grid — GET /api/term-deposit/list?brcd=1
 */
export async function fetchTermDeposits(brcd) {
    const res = await fetch(`${BASE_URL}/term-deposit/list?brcd=${encodeURIComponent(brcd)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch records.');
    return json.data || [];
}

/**
 * Update an existing Term Deposit — PUT /api/term-deposit/update/:id
 * Returns { success, message }
 */
export async function updateTermDeposit(id, payload) {
    const res = await fetch(`${BASE_URL}/term-deposit/update/${encodeURIComponent(id)}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update term deposit.');
    return json;
}