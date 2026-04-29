const BASE_URL = `${import.meta.env.VITE_API_URL}/bond`;

export async function createBond(payload) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create Bond');
    return data;
}

export async function getAllBonds(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') params.append(k, v);
    });
    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch Bonds');
    return data;
}

export async function getBondById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch Bond');
    return data;
}

export async function updateBond(id, payload) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update Bond');
    return data;
}