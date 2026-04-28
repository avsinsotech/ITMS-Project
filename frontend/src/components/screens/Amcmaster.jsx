// // import { useState } from 'react';
// // import { Building2, Plus, Search, Edit2, Trash2 } from 'lucide-react';

// // const initialAmcs = [
// //   { code: 'AMC-001', name: 'SBI Funds Management', rta: 'CAMS', schemes: 4, aum: '12.40', status: 'Active' },
// //   { code: 'AMC-002', name: 'HDFC Asset Mgmt', rta: 'CAMS', schemes: 3, aum: '9.80', status: 'Active' },
// //   { code: 'AMC-003', name: 'ICICI Prudential AMC', rta: 'CAMS', schemes: 4, aum: '8.20', status: 'Active' },
// //   { code: 'AMC-004', name: 'Kotak Mahindra AMC', rta: 'KFintech', schemes: 3, aum: '6.50', status: 'Active' },
// //   { code: 'AMC-005', name: 'Aditya Birla Sun Life', rta: 'KFintech', schemes: 4, aum: '5.90', status: 'Active' },
// // ];

// // export default function AMCMaster({ onNavigate }) {
// //   const [form, setForm] = useState({
// //     code: 'AMC-007',
// //     name: 'SBI Funds Management Limited',
// //     amfiReg: 'ARN-SBI001',
// //     sebiReg: 'MF/034/87/1',
// //     rta: 'CAMS',
// //     trustee: 'SBI Mutual Fund Trustee Co.',
// //     pan: 'AAATS1140C',
// //     gstin: '27AAATS1140C1ZL',
// //     exposureCap: '30',
// //   });
// //   const [search, setSearch] = useState('');
// //   const [saved, setSaved] = useState(false);

// //   const filtered = initialAmcs.filter(a =>
// //     a.name.toLowerCase().includes(search.toLowerCase()) ||
// //     a.code.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const handleSave = () => {
// //     setSaved(true);
// //     setTimeout(() => setSaved(false), 2500);
// //   };

// //   return (
// //     <div>
// //       <div className="screen-head">
// //         <div>
// //           <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
// //             <Building2 size={20} />
// //             AMC Master
// //             <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
// //           </h1>
// //           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › AMC Master</div>
// //         </div>
// //       </div>

// //       {saved && (
// //         <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //           ✓ AMC record saved successfully.
// //         </div>
// //       )}

// //       {/* Add/Edit Form */}
// //       <div className="card">
// //         <div className="card-title">Add / Edit Asset Management Company</div>
// //         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
// //           {[
// //             { label: 'AMC Code', key: 'code', req: false },
// //             { label: 'AMC Name', key: 'name', req: true },
// //             { label: 'AMFI Registration No.', key: 'amfiReg', req: false },
// //             { label: 'SEBI Reg No.', key: 'sebiReg', req: false },
// //             { label: 'Trustee Company', key: 'trustee', req: false },
// //             { label: 'PAN', key: 'pan', req: false },
// //             { label: 'GSTIN', key: 'gstin', req: false },
// //             { label: 'AMC Group Exposure Cap (%)', key: 'exposureCap', req: false },
// //           ].map(f => (
// //             <div key={f.key} style={{ marginBottom: '10px' }}>
// //               <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
// //                 {f.label} {f.req && <span style={{ color: 'var(--red)' }}>*</span>}
// //               </label>
// //               <input
// //                 className="form-input"
// //                 value={form[f.key]}
// //                 onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
// //               />
// //             </div>
// //           ))}
// //           {/* RTA dropdown */}
// //           <div style={{ marginBottom: '10px' }}>
// //             <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
// //               RTA <span style={{ color: 'var(--red)' }}>*</span>
// //             </label>
// //             <select
// //               className="form-select"
// //               value={form.rta}
// //               onChange={e => setForm(p => ({ ...p, rta: e.target.value }))}
// //             >
// //               <option>CAMS</option>
// //               <option>KFintech</option>
// //               <option>Sundaram BNP Paribas</option>
// //             </select>
// //           </div>
// //         </div>
// //         <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
// //           <button className="topbar-btn btn-outline" onClick={() => setForm({ code: '', name: '', amfiReg: '', sebiReg: '', rta: 'CAMS', trustee: '', pan: '', gstin: '', exposureCap: '30' })}>Cancel</button>
// //           <button className="topbar-btn btn-primary" onClick={handleSave}>Save AMC</button>
// //         </div>
// //       </div>

// //       {/* Empaneled AMCs Table */}
// //       <div className="card">
// //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
// //           <div className="card-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>Empaneled AMCs</div>
// //           <div style={{ position: 'relative' }}>
// //             <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
// //             <input
// //               className="form-input"
// //               placeholder="Search AMC..."
// //               style={{ paddingLeft: '28px', width: '200px', fontSize: '12px' }}
// //               value={search}
// //               onChange={e => setSearch(e.target.value)}
// //             />
// //           </div>
// //         </div>
// //         <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
// //           <thead>
// //             <tr>
// //               {['Code', 'AMC Name', 'RTA', 'Schemes', 'Current AUM (₹ Cr)', 'Status', 'Actions'].map((h, i) => (
// //                 <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i >= 3 && i <= 4 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filtered.map((row, i) => (
// //               <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
// //                 <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)' }}>{row.code}</td>
// //                 <td style={{ padding: '7px 10px' }}>{row.name}</td>
// //                 <td style={{ padding: '7px 10px' }}>{row.rta}</td>
// //                 <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.schemes}</td>
// //                 <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{row.aum}</td>
// //                 <td style={{ padding: '7px 10px' }}>
// //                   <span className="badge b-approved">{row.status}</span>
// //                 </td>
// //                 <td style={{ padding: '7px 10px' }}>
// //                   <div style={{ display: 'flex', gap: '8px' }}>
// //                     <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}>
// //                       <Edit2 size={12} /> Edit
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect, useCallback } from 'react';
// import { Building2, Search, Edit2, RefreshCw, PlusCircle } from 'lucide-react';

// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080';

// const EMPTY_FORM = {
//   code: '', name: '', amfiReg: '', sebiReg: '',
//   rta: 'CAMS', trustee: '', pan: '', gstin: '', exposureCap: '30',
// };

// export default function AMCMaster({ onNavigate }) {
//   // ── List state ──────────────────────────────────────────────────────────
//   const [amcs, setAmcs]           = useState([]);
//   const [total, setTotal]         = useState(0);
//   const [loading, setLoading]     = useState(false);
//   const [listError, setListError] = useState('');
//   const [search, setSearch]       = useState('');
//   const [page, setPage]           = useState(1);
//   const PAGE_SIZE = 20;

//   // ── Form state ──────────────────────────────────────────────────────────
//   const [form, setForm]           = useState(EMPTY_FORM);
//   const [editId, setEditId]       = useState(null);   // null = add mode
//   const [saving, setSaving]       = useState(false);
//   const [formError, setFormError] = useState('');
//   const [toast, setToast]         = useState('');

//   // ── Fetch list ──────────────────────────────────────────────────────────
//   const fetchAMCs = useCallback(async (searchTerm, pageNum) => {
//     setLoading(true);
//     setListError('');
//     try {
//       const params = new URLSearchParams({
//         is_active: 1,
//         page:      pageNum,
//         page_size: PAGE_SIZE,
//       });
//       if (searchTerm && searchTerm.trim()) params.set('search', searchTerm.trim());

//       const res  = await fetch(`${API_BASE}/api/amc?${params}`);
//       const json = await res.json();
//       if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load AMCs');

//       setAmcs(json.data || []);
//       setTotal(json.pagination?.total || 0);
//     } catch (err) {
//       setListError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Initial load
//   useEffect(() => { fetchAMCs('', 1); }, [fetchAMCs]);

//   // Debounced search
//   useEffect(() => {
//     const t = setTimeout(() => { setPage(1); fetchAMCs(search, 1); }, 400);
//     return () => clearTimeout(t);
//   }, [search, fetchAMCs]);

//   // ── Helpers ──────────────────────────────────────────────────────────────
//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(''), 3000);
//   };

//   const startEdit = (row) => {
//     setEditId(row.AMC_ID);
//     setForm({
//       code:        row.AMC_Code                    || '',
//       name:        row.AMC_Name                    || '',
//       amfiReg:     row.AMFI_Reg_No                 || '',
//       sebiReg:     row.SEBI_Reg_No                 || '',
//       rta:         row.RTA                         || 'CAMS',
//       trustee:     row.Trustee_Company             || '',
//       pan:         row.PAN?.trim()                 || '',
//       gstin:       row.GSTIN                       || '',
//       exposureCap: row.AMC_Group_Exposure_Cap_Pct != null
//                      ? String(row.AMC_Group_Exposure_Cap_Pct)
//                      : '30',
//     });
//     setFormError('');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const cancelForm = () => {
//     setForm(EMPTY_FORM);
//     setEditId(null);
//     setFormError('');
//   };

//   // ── Save (POST or PUT) ───────────────────────────────────────────────────
//   const handleSave = async () => {
//     if (!form.code.trim() || !form.name.trim()) {
//       setFormError('AMC Code and AMC Name are required.');
//       return;
//     }
//     setSaving(true);
//     setFormError('');

//     const payload = {
//       AMC_Code:                   form.code.trim(),
//       AMC_Name:                   form.name.trim(),
//       AMFI_Reg_No:                form.amfiReg.trim()     || null,
//       SEBI_Reg_No:                form.sebiReg.trim()     || null,
//       Trustee_Company:            form.trustee.trim()     || null,
//       PAN:                        form.pan.trim()         || null,
//       GSTIN:                      form.gstin.trim()       || null,
//       AMC_Group_Exposure_Cap_Pct: form.exposureCap !== '' ? Number(form.exposureCap) : null,
//       RTA:                        form.rta,
//       [editId ? 'Modified_By' : 'Created_By']: 'ADMIN',
//     };

//     try {
//       const url    = editId ? `${API_BASE}/api/amc/${editId}` : `${API_BASE}/api/amc`;
//       const method = editId ? 'PUT' : 'POST';

//       const res  = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
//       const json = await res.json();
//       if (!res.ok || !json.success) throw new Error(json.message || 'Save failed');

//       showToast(editId ? 'AMC updated successfully.' : 'AMC created successfully.');
//       cancelForm();
//       fetchAMCs(search, page);
//     } catch (err) {
//       setFormError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Pagination ───────────────────────────────────────────────────────────
//   const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
//   const goPage = (p) => { setPage(p); fetchAMCs(search, p); };

//   // ── Render ───────────────────────────────────────────────────────────────
//   return (
//     <div>
//       {/* Header */}
//       <div className="screen-head">
//         <div>
//           <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <Building2 size={20} />
//             AMC Master
//             <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
//           </h1>
//           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › AMC Master</div>
//         </div>
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//           ✓ {toast}
//         </div>
//       )}

//       {/* Add / Edit Form */}
//       <div className="card">
//         <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           {editId ? <Edit2 size={14} /> : <PlusCircle size={14} />}
//           {editId ? 'Edit Asset Management Company' : 'Add Asset Management Company'}
//         </div>

//         {formError && (
//           <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '12px' }}>
//             ✕ {formError}
//           </div>
//         )}

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
//           {[
//             { label: 'AMC Code',                   key: 'code',        req: true  },
//             { label: 'AMC Name',                   key: 'name',        req: true  },
//             { label: 'AMFI Registration No.',      key: 'amfiReg',     req: false },
//             { label: 'SEBI Reg No.',               key: 'sebiReg',     req: false },
//             { label: 'Trustee Company',            key: 'trustee',     req: false },
//             { label: 'PAN',                        key: 'pan',         req: false },
//             { label: 'GSTIN',                      key: 'gstin',       req: false },
//             { label: 'AMC Group Exposure Cap (%)', key: 'exposureCap', req: false },
//           ].map(f => (
//             <div key={f.key} style={{ marginBottom: '10px' }}>
//               <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
//                 {f.label} {f.req && <span style={{ color: 'var(--red)' }}>*</span>}
//               </label>
//               <input
//                 className="form-input"
//                 value={form[f.key]}
//                 onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
//               />
//             </div>
//           ))}

//           {/* RTA dropdown */}
//           <div style={{ marginBottom: '10px' }}>
//             <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
//               RTA <span style={{ color: 'var(--red)' }}>*</span>
//             </label>
//             <select
//               className="form-select"
//               value={form.rta}
//               onChange={e => setForm(p => ({ ...p, rta: e.target.value }))}
//             >
//               <option>CAMS</option>
//               <option>KFintech</option>
//               <option>Sundaram BNP Paribas</option>
//             </select>
//           </div>
//         </div>

//         <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
//           <button className="topbar-btn btn-outline" onClick={cancelForm} disabled={saving}>
//             Cancel
//           </button>
//           <button className="topbar-btn btn-primary" onClick={handleSave} disabled={saving}>
//             {saving ? 'Saving…' : editId ? 'Update AMC' : 'Save AMC'}
//           </button>
//         </div>
//       </div>

//       {/* Empaneled AMCs Table */}
//       <div className="card">
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
//           <div className="card-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
//             Empaneled AMCs
//             {total > 0 && (
//               <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>
//                 ({total} record{total !== 1 ? 's' : ''})
//               </span>
//             )}
//           </div>
//           <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//             <button
//               onClick={() => fetchAMCs(search, page)}
//               style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}
//               title="Refresh"
//             >
//               <RefreshCw size={13} />
//             </button>
//             <div style={{ position: 'relative' }}>
//               <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
//               <input
//                 className="form-input"
//                 placeholder="Search AMC..."
//                 style={{ paddingLeft: '28px', width: '200px', fontSize: '12px' }}
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* List error */}
//         {listError && (
//           <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '10px' }}>
//             ✕ {listError}
//           </div>
//         )}

//         <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
//           <thead>
//             <tr>
//               {['Code', 'AMC Name', 'RTA', 'Trustee', 'Exposure Cap', 'Status', 'Actions'].map((h, i) => (
//                 <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i === 4 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
//                   Loading…
//                 </td>
//               </tr>
//             )}
//             {!loading && amcs.length === 0 && (
//               <tr>
//                 <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
//                   No AMCs found.
//                 </td>
//               </tr>
//             )}
//             {!loading && amcs.map((row, i) => (
//               <tr
//                 key={row.AMC_ID}
//                 style={{
//                   borderBottom: '1px solid var(--border)',
//                   background: editId === row.AMC_ID ? '#FFFBEB' : i % 2 === 1 ? '#fcfcfd' : '',
//                 }}
//               >
//                 <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)' }}>{row.AMC_Code}</td>
//                 <td style={{ padding: '7px 10px' }}>{row.AMC_Name}</td>
//                 <td style={{ padding: '7px 10px' }}>{row.RTA}</td>
//                 <td style={{ padding: '7px 10px', color: 'var(--muted)' }}>{row.Trustee_Company || '—'}</td>
//                 <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
//                   {row.AMC_Group_Exposure_Cap_Pct != null ? `${row.AMC_Group_Exposure_Cap_Pct}%` : '—'}
//                 </td>
//                 <td style={{ padding: '7px 10px' }}>
//                   <span className={`badge ${row.Is_Active ? 'b-approved' : 'b-rejected'}`}>
//                     {row.Is_Active ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td style={{ padding: '7px 10px' }}>
//                   <button
//                     onClick={() => startEdit(row)}
//                     style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}
//                   >
//                     <Edit2 size={12} /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '12px', alignItems: 'center' }}>
//             <button
//               className="topbar-btn btn-outline"
//               style={{ padding: '3px 10px', fontSize: '11px' }}
//               disabled={page === 1}
//               onClick={() => goPage(page - 1)}
//             >
//               ‹ Prev
//             </button>
//             <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               className="topbar-btn btn-outline"
//               style={{ padding: '3px 10px', fontSize: '11px' }}
//               disabled={page === totalPages}
//               onClick={() => goPage(page + 1)}
//             >
//               Next ›
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from 'react';
import { Building2, Search, Edit2, RefreshCw, PlusCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080';

const EMPTY_FORM = {
  code: '', name: '', amfiReg: '', sebiReg: '',
  rta: 'CAMS', trustee: '', pan: '', gstin: '', exposureCap: '30',
};

export default function AMCMaster({ onNavigate }) {
  // ── List state ──────────────────────────────────────────────────────────
  const [amcs, setAmcs]           = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [listError, setListError] = useState('');
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const PAGE_SIZE = 20;

  // ── Form state ──────────────────────────────────────────────────────────
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]       = useState(null);   // null = add mode
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast]         = useState('');

  // ── Fetch list ──────────────────────────────────────────────────────────
  const fetchAMCs = useCallback(async (searchTerm, pageNum) => {
    setLoading(true);
    setListError('');
    try {
      const params = new URLSearchParams({
        is_active: 1,
        page:      pageNum,
        page_size: PAGE_SIZE,
      });
      if (searchTerm && searchTerm.trim()) params.set('search', searchTerm.trim());

      const res  = await fetch(`${API_BASE}/api/amc?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load AMCs');

      setAmcs(json.data || []);
      setTotal(json.pagination?.total || 0);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchAMCs('', 1); }, [fetchAMCs]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchAMCs(search, 1); }, 400);
    return () => clearTimeout(t);
  }, [search, fetchAMCs]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const startEdit = (row) => {
    setEditId(row.AMC_ID);
    setForm({
      code:        row.AMC_Code                    || '',
      name:        row.AMC_Name                    || '',
      amfiReg:     row.AMFI_Reg_No                 || '',
      sebiReg:     row.SEBI_Reg_No                 || '',
      rta:         row.RTA                         || 'CAMS',
      trustee:     row.Trustee_Company             || '',
      pan:         row.PAN?.trim()                 || '',
      gstin:       row.GSTIN                       || '',
      exposureCap: row.AMC_Group_Exposure_Cap_Pct != null
                     ? String(row.AMC_Group_Exposure_Cap_Pct)
                     : '30',
    });
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setFormError('');
  };

  // ── Save (POST or PUT) ───────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.code.trim() || !form.name.trim()) {
      setFormError('AMC Code and AMC Name are required.');
      return;
    }
    setSaving(true);
    setFormError('');

    const payload = {
      AMC_Code:                   form.code.trim(),
      AMC_Name:                   form.name.trim(),
      AMFI_Reg_No:                form.amfiReg.trim()     || null,
      SEBI_Reg_No:                form.sebiReg.trim()     || null,
      Trustee_Company:            form.trustee.trim()     || null,
      PAN:                        form.pan.trim()         || null,
      GSTIN:                      form.gstin.trim()       || null,
      AMC_Group_Exposure_Cap_Pct: form.exposureCap !== '' ? Number(form.exposureCap) : null,
      RTA:                        form.rta,
      [editId ? 'Modified_By' : 'Created_By']: 'ADMIN',
    };

    try {
      const url    = editId ? `${API_BASE}/api/amc/${editId}` : `${API_BASE}/api/amc`;
      const method = editId ? 'PUT' : 'POST';

      const res  = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Save failed');

      showToast(editId ? 'AMC updated successfully.' : 'AMC created successfully.');
      cancelForm();
      fetchAMCs(search, page);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Pagination ───────────────────────────────────────────────────────────
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const goPage = (p) => { setPage(p); fetchAMCs(search, p); };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="screen-head">
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={20} />
            AMC Master
            <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › AMC Master</div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✓ {toast}
        </div>
      )}

      {/* Add / Edit Form */}
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editId ? <Edit2 size={14} /> : <PlusCircle size={14} />}
          {editId ? 'Edit Asset Management Company' : 'Add Asset Management Company'}
        </div>

        {formError && (
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '12px' }}>
            ✕ {formError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: 'AMC Code',                   key: 'code',        req: true  },
            { label: 'AMC Name',                   key: 'name',        req: true  },
            { label: 'AMFI Registration No.',      key: 'amfiReg',     req: false },
            { label: 'SEBI Reg No.',               key: 'sebiReg',     req: false },
            { label: 'Trustee Company',            key: 'trustee',     req: false },
            { label: 'PAN',                        key: 'pan',         req: false },
            { label: 'GSTIN',                      key: 'gstin',       req: false },
            { label: 'AMC Group Exposure Cap (%)', key: 'exposureCap', req: false },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
                {f.label} {f.req && <span style={{ color: 'var(--red)' }}>*</span>}
              </label>
              <input
                className="form-input"
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              />
            </div>
          ))}

          {/* RTA dropdown */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
              RTA <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <select
              className="form-select"
              value={form.rta}
              onChange={e => setForm(p => ({ ...p, rta: e.target.value }))}
            >
              <option>CAMS</option>
              <option>KFintech</option>
              <option>Sundaram BNP Paribas</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
          <button className="topbar-btn btn-outline" onClick={cancelForm} disabled={saving}>
            Cancel
          </button>
          <button className="topbar-btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : editId ? 'Update AMC' : 'Save AMC'}
          </button>
        </div>
      </div>

      {/* Empaneled AMCs Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="card-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
            Empaneled AMCs
            {total > 0 && (
              <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>
                ({total} record{total !== 1 ? 's' : ''})
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => fetchAMCs(search, page)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}
              title="Refresh"
            >
              <RefreshCw size={13} />
            </button>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                className="form-input"
                placeholder="Search AMC..."
                style={{ paddingLeft: '28px', width: '200px', fontSize: '12px' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* List error */}
        {listError && (
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '10px' }}>
            ✕ {listError}
          </div>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr>
              {['Code', 'AMC Name', 'RTA', 'Trustee', 'Exposure Cap', 'Status', 'Actions'].map((h, i) => (
                <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i === 4 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && amcs.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
                  No AMCs found.
                </td>
              </tr>
            )}
            {!loading && amcs.map((row, i) => (
              <tr
                key={row.AMC_ID}
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: editId === row.AMC_ID ? '#FFFBEB' : i % 2 === 1 ? '#fcfcfd' : '',
                }}
              >
                <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)' }}>{row.AMC_Code}</td>
                <td style={{ padding: '7px 10px' }}>{row.AMC_Name}</td>
                <td style={{ padding: '7px 10px' }}>{row.RTA}</td>
                <td style={{ padding: '7px 10px', color: 'var(--muted)' }}>{row.Trustee_Company || '—'}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                  {row.AMC_Group_Exposure_Cap_Pct != null ? `${row.AMC_Group_Exposure_Cap_Pct}%` : '—'}
                </td>
                <td style={{ padding: '7px 10px' }}>
                  <span className={`badge ${row.Is_Active ? 'b-approved' : 'b-rejected'}`}>
                    {row.Is_Active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '7px 10px' }}>
                  <button
                    onClick={() => startEdit(row)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '12px', alignItems: 'center' }}>
            <button
              className="topbar-btn btn-outline"
              style={{ padding: '3px 10px', fontSize: '11px' }}
              disabled={page === 1}
              onClick={() => goPage(page - 1)}
            >
              ‹ Prev
            </button>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
              Page {page} of {totalPages}
            </span>
            <button
              className="topbar-btn btn-outline"
              style={{ padding: '3px 10px', fontSize: '11px' }}
              disabled={page === totalPages}
              onClick={() => goPage(page + 1)}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}