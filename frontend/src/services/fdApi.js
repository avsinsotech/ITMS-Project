// src/services/fdApi.js
// Central API service for Fixed Deposit endpoints

const BASE_URL = `${import.meta.env.VITE_API_URL}/fd`;

// ── POST /api/fd ──────────────────────────────────────────────
export async function createFD(payload) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create FD');
    return data;
}

// ── GET /api/fd ───────────────────────────────────────────────
export async function getAllFDs(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') params.append(k, v);
    });
    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch FDs');
    return data; // { success, total_records, page_number, page_size, data: [] }
}

// ── GET /api/fd/:id ───────────────────────────────────────────
export async function getFDById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch FD');
    return data; // { success, data: {} }
}

// ── PUT /api/fd/:id ───────────────────────────────────────────
export async function updateFD(id, payload) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update FD');
    return data;
}