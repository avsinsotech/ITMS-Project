// import { useState } from 'react';
// import { Users, ExternalLink, Edit2 } from 'lucide-react';

// const rtaData = [
//   { code: 'RTA-01', name: 'Computer Age Management Services (CAMS)', api: 'https://api.camsonline.com/v2', amcs: 13, status: 'Active' },
//   { code: 'RTA-02', name: 'KFin Technologies', api: 'https://api.kfintech.com/v1', amcs: 9, status: 'Active' },
// ];

// const distData = [
//   { code: 'DIST-001', name: 'NJ India Invest', arn: 'ARN-110103', commission: 'Trail Only', status: 'Active' },
//   { code: 'DIST-002', name: 'Prudent Corporate Advisory', arn: 'ARN-12150', commission: 'Upfront + Trail', status: 'Active' },
// ];

// export default function DistributorRTAMaster({ onNavigate }) {
//   const [activeTab, setActiveTab] = useState('distributor');
//   const [saved, setSaved] = useState(false);
//   const [form, setForm] = useState({
//     code: 'DIST-003',
//     name: 'NJ India Invest',
//     arn: 'ARN-110103',
//     euin: 'E123456',
//     subBroker: 'SB-001',
//     pan: 'AAACN1234K',
//     gstin: '27AAACN1234K1ZX',
//     commission: 'Upfront + Trail',
//     empanelDate: '2024-06-01',
//   });

//   const tabs = [
//     { key: 'distributor', label: 'Distributor' },
//     { key: 'rta', label: 'RTA' },
//     { key: 'direct', label: 'Direct (No Intermediary)' },
//   ];

//   return (
//     <div>
//       <div className="screen-head">
//         <div>
//           <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <Users size={20} />
//             Distributor / RTA Master
//             <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
//           </h1>
//           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › Distributor & RTA</div>
//         </div>
//       </div>

//       {saved && (
//         <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px' }}>
//           ✓ Record saved successfully.
//         </div>
//       )}

//       {/* Tabs */}
//       <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border)', marginBottom: '14px' }}>
//         {tabs.map(t => (
//           <div
//             key={t.key}
//             onClick={() => setActiveTab(t.key)}
//             style={{
//               padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
//               color: activeTab === t.key ? 'var(--navy)' : 'var(--muted)',
//               borderBottom: `2px solid ${activeTab === t.key ? 'var(--gold)' : 'transparent'}`,
//               marginBottom: '-2px',
//             }}
//           >
//             {t.label}
//           </div>
//         ))}
//       </div>

//       {/* Distributor Tab */}
//       {activeTab === 'distributor' && (
//         <>
//           <div className="card">
//             <div className="card-title">Add Distributor</div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 12px' }}>
//               {[
//                 { label: 'Distributor Code', key: 'code' },
//                 { label: 'Distributor Name', key: 'name' },
//                 { label: 'ARN No.', key: 'arn' },
//                 { label: 'EUIN', key: 'euin' },
//                 { label: 'Sub-Broker Code', key: 'subBroker' },
//                 { label: 'PAN', key: 'pan' },
//                 { label: 'GSTIN', key: 'gstin' },
//               ].map(f => (
//                 <div key={f.key} style={{ marginBottom: '10px' }}>
//                   <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>{f.label}</label>
//                   <input className="form-input" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
//                 </div>
//               ))}
//               <div style={{ marginBottom: '10px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>Commission Type</label>
//                 <select className="form-select" value={form.commission} onChange={e => setForm(p => ({ ...p, commission: e.target.value }))}>
//                   <option>Upfront + Trail</option>
//                   <option>Trail Only</option>
//                   <option>Direct (No Commission)</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>Empanelment Date</label>
//                 <input type="date" className="form-input" value={form.empanelDate} onChange={e => setForm(p => ({ ...p, empanelDate: e.target.value }))} />
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
//               <button className="topbar-btn btn-outline">Cancel</button>
//               <button className="topbar-btn btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>Save Distributor</button>
//             </div>
//           </div>

//           <div className="card">
//             <div className="card-title">Empaneled Distributors</div>
//             <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
//               <thead>
//                 <tr>
//                   {['Code', 'Distributor Name', 'ARN No.', 'Commission Type', 'Status', ''].map((h, i) => (
//                     <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {distData.map((row, i) => (
//                   <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
//                     <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)' }}>{row.code}</td>
//                     <td style={{ padding: '7px 10px' }}>{row.name}</td>
//                     <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: '12px' }}>{row.arn}</td>
//                     <td style={{ padding: '7px 10px' }}>{row.commission}</td>
//                     <td style={{ padding: '7px 10px' }}><span className="badge b-approved">{row.status}</span></td>
//                     <td style={{ padding: '7px 10px' }}>
//                       <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}>
//                         <Edit2 size={12} /> Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {/* RTA Tab */}
//       {activeTab === 'rta' && (
//         <div className="card">
//           <div className="card-title">RTA (Registrar & Transfer Agent) Master</div>
//           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
//             <thead>
//               <tr>
//                 {['RTA Code', 'Name', 'API Endpoint', 'AMCs Covered', 'Status'].map((h, i) => (
//                   <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i === 3 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rtaData.map((row, i) => (
//                 <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
//                   <td style={{ padding: '7px 10px', fontWeight: 700, color: 'var(--navy)' }}>{row.code}</td>
//                   <td style={{ padding: '7px 10px' }}>{row.name}</td>
//                   <td style={{ padding: '7px 10px' }}>
//                     <a href="#" style={{ color: 'var(--navy)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
//                       {row.api} <ExternalLink size={11} />
//                     </a>
//                   </td>
//                   <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.amcs}</td>
//                   <td style={{ padding: '7px 10px' }}><span className="badge b-approved">{row.status}</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div style={{ background: 'var(--navy-light)', borderLeft: '3px solid var(--navy)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: 'var(--navy)', marginTop: '12px' }}>
//             💡 RTA integration via API enables real-time folio confirmations, allotment updates, and SOA reconciliation.
//           </div>
//         </div>
//       )}

//       {/* Direct Tab */}
//       {activeTab === 'direct' && (
//         <div className="card">
//           <div className="card-title">Direct Investment (No Intermediary)</div>
//           <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '12px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px' }}>
//             ✓ Direct investments are routed without a distributor ARN. All purchases through BSE StarMF / NSE NMF-II or directly to AMC.
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//             <div style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '6px' }}>
//               <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px' }}>BSE StarMF</div>
//               <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>Member ID: BSE-MF-001</div>
//               <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>API: api.bsestarmf.in/v1</div>
//               <span className="badge b-approved">Connected</span>
//             </div>
//             <div style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '6px' }}>
//               <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px' }}>NSE NMF-II</div>
//               <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>Member ID: NSE-NMF-004</div>
//               <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>API: nmfii.nseindia.com/v2</div>
//               <span className="badge b-pending">Pending Setup</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from 'react';
import { Users, ExternalLink, Edit2, Plus, RefreshCw, Search, X, Loader } from 'lucide-react';
import {
    getAllDistributors,
    createDistributor,
    updateDistributor,
} from '../../services/distributorApi';

// ─── Static RTA data (no backend table yet) ──────────────────────────────────
const RTA_DATA = [
    { code: 'RTA-01', name: 'Computer Age Management Services (CAMS)', api: 'https://api.camsonline.com/v2',  amcs: 13, status: 'Active' },
    { code: 'RTA-02', name: 'KFin Technologies',                        api: 'https://api.kfintech.com/v1',   amcs: 9,  status: 'Active' },
];

// ─── Blank form state ─────────────────────────────────────────────────────────
const BLANK_FORM = {
    Distributor_Code:  '',
    Distributor_Name:  '',
    ARN_No:            '',
    EUIN:              '',
    Sub_Broker_Code:   '',
    PAN:               '',
    GSTIN:             '',
    Commission_Type:   'Trail Only',
    Empanelment_Date:  '',
    Is_Active:         1,
};

// ─── Toast component ──────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    const styles = {
        success: { background: '#E7F5EC', borderColor: 'var(--green)',  color: '#125C2A' },
        error:   { background: '#FDE8E8', borderColor: '#C0392B',       color: '#7B0000' },
    };

    return (
        <div style={{
            ...styles[type],
            borderLeft: `3px solid`,
            padding: '10px 14px',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <span>{type === 'success' ? '✓' : '✕'} {message}</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                <X size={13} />
            </button>
        </div>
    );
}

// ─── Field row helper ─────────────────────────────────────────────────────────
function Field({ label, children }) {
    return (
        <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
                {label}
            </label>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function DistributorRTAMaster({ onNavigate }) {
    const [activeTab,  setActiveTab]  = useState('distributor');

    // ── List state ────────────────────────────────────────────────────────────
    const [distributors, setDistributors] = useState([]);
    const [total,        setTotal]        = useState(0);
    const [page,         setPage]         = useState(1);
    const [totalPages,   setTotalPages]   = useState(1);
    const [loading,      setLoading]      = useState(false);
    const [listError,    setListError]    = useState('');

    // ── Filter state ──────────────────────────────────────────────────────────
    const [searchTerm,      setSearchTerm]      = useState('');
    const [commissionFilter, setCommissionFilter] = useState('');
    const [activeFilter,    setActiveFilter]    = useState('');

    // ── Form / modal state ────────────────────────────────────────────────────
    const [showForm,    setShowForm]    = useState(false);
    const [editMode,    setEditMode]    = useState(false);
    const [editId,      setEditId]      = useState(null);
    const [form,        setForm]        = useState(BLANK_FORM);
    const [submitting,  setSubmitting]  = useState(false);
    const [formError,   setFormError]   = useState('');

    // ── Toast ─────────────────────────────────────────────────────────────────
    const [toast, setToast] = useState(null); // { message, type }
    const showToast = (message, type = 'success') => setToast({ message, type });

    // ─── Fetch distributor list ───────────────────────────────────────────────
    const fetchDistributors = useCallback(async (pg = 1) => {
        setLoading(true);
        setListError('');
        try {
            const res = await getAllDistributors({
                SearchTerm:      searchTerm,
                Commission_Type: commissionFilter,
                Is_Active:       activeFilter,
                PageNumber:      pg,
                PageSize:        15,
            });
            setDistributors(res.data ?? []);
            setTotal(res.total ?? 0);
            setTotalPages(res.totalPages ?? 1);
            setPage(pg);
        } catch (e) {
            setListError(e.message);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, commissionFilter, activeFilter]);

    // Initial load + re-fetch when filters change
    useEffect(() => {
        if (activeTab === 'distributor') fetchDistributors(1);
    }, [activeTab, fetchDistributors]);

    // ─── Open blank Add form ──────────────────────────────────────────────────
    const openAddForm = () => {
        setForm(BLANK_FORM);
        setEditMode(false);
        setEditId(null);
        setFormError('');
        setShowForm(true);
    };

    // ─── Open Edit form with existing data ───────────────────────────────────
    const openEditForm = (row) => {
        setForm({
            Distributor_Code:  row.Distributor_Code  ?? '',
            Distributor_Name:  row.Distributor_Name  ?? '',
            ARN_No:            row.ARN_No            ?? '',
            EUIN:              row.EUIN               ?? '',
            Sub_Broker_Code:   row.Sub_Broker_Code   ?? '',
            PAN:               row.PAN                ?? '',
            GSTIN:             row.GSTIN              ?? '',
            Commission_Type:   row.Commission_Type   ?? 'Trail Only',
            Empanelment_Date:  row.Empanelment_Date
                ? row.Empanelment_Date.substring(0, 10)
                : '',
            Is_Active: row.Is_Active ?? 1,
        });
        setEditMode(true);
        setEditId(row.Distributor_ID);
        setFormError('');
        setShowForm(true);
    };

    // ─── Submit (create or update) ────────────────────────────────────────────
    const handleSubmit = async () => {
        setFormError('');

        if (!form.Distributor_Code.trim() || !form.Distributor_Name.trim()) {
            setFormError('Distributor Code and Name are required.');
            return;
        }

        const payload = {
            ...form,
            Empanelment_Date: form.Empanelment_Date || null,
            Created_By:  'ADMIN',
            Modified_By: 'ADMIN',
        };

        setSubmitting(true);
        try {
            if (editMode) {
                await updateDistributor(editId, payload);
                showToast('Distributor updated successfully.');
            } else {
                await createDistributor(payload);
                showToast('Distributor created successfully.');
            }
            setShowForm(false);
            fetchDistributors(1);
        } catch (e) {
            setFormError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    const TABS = [
        { key: 'distributor', label: 'Distributor' },
        { key: 'rta',         label: 'RTA' },
        { key: 'direct',      label: 'Direct (No Intermediary)' },
    ];

    return (
        <div>
            {/* ── Page header ─────────────────────────────────────────────── */}
            <div className="screen-head">
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={20} />
                        Distributor / RTA Master
                        <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>
                            MASTERS
                        </span>
                    </h1>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                        Home › Masters › Distributor & RTA
                    </div>
                </div>
            </div>

            {/* ── Toast ───────────────────────────────────────────────────── */}
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}

            {/* ── Tabs ────────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border)', marginBottom: '14px' }}>
                {TABS.map(t => (
                    <div
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{
                            padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                            color: activeTab === t.key ? 'var(--navy)' : 'var(--muted)',
                            borderBottom: `2px solid ${activeTab === t.key ? 'var(--gold)' : 'transparent'}`,
                            marginBottom: '-2px',
                        }}
                    >
                        {t.label}
                    </div>
                ))}
            </div>

            {/* ════════════════════════════════════════════════════════════════
                DISTRIBUTOR TAB
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'distributor' && (
                <>
                    {/* ── Add / Edit Form ──────────────────────────────────── */}
                    {showForm && (
                        <div className="card" style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <div className="card-title" style={{ margin: 0 }}>
                                    {editMode ? `Edit Distributor — ${form.Distributor_Code}` : 'Add Distributor'}
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {formError && (
                                <div style={{ background: '#FDE8E8', borderLeft: '3px solid #C0392B', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#7B0000', marginBottom: '12px' }}>
                                    ✕ {formError}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 12px' }}>
                                {[
                                    { label: 'Distributor Code *', key: 'Distributor_Code' },
                                    { label: 'Distributor Name *', key: 'Distributor_Name' },
                                    { label: 'ARN No.',            key: 'ARN_No' },
                                    { label: 'EUIN',               key: 'EUIN' },
                                    { label: 'Sub-Broker Code',    key: 'Sub_Broker_Code' },
                                    { label: 'PAN',                key: 'PAN' },
                                    { label: 'GSTIN',              key: 'GSTIN' },
                                ].map(f => (
                                    <Field key={f.key} label={f.label}>
                                        <input
                                            className="form-input"
                                            value={form[f.key]}
                                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                            placeholder={f.label.replace(' *', '')}
                                        />
                                    </Field>
                                ))}

                                <Field label="Commission Type">
                                    <select
                                        className="form-select"
                                        value={form.Commission_Type}
                                        onChange={e => setForm(p => ({ ...p, Commission_Type: e.target.value }))}
                                    >
                                        <option>Upfront + Trail</option>
                                        <option>Trail Only</option>
                                        <option>Direct (No Commission)</option>
                                    </select>
                                </Field>

                                <Field label="Empanelment Date">
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={form.Empanelment_Date}
                                        onChange={e => setForm(p => ({ ...p, Empanelment_Date: e.target.value }))}
                                    />
                                </Field>

                                {editMode && (
                                    <Field label="Status">
                                        <select
                                            className="form-select"
                                            value={form.Is_Active}
                                            onChange={e => setForm(p => ({ ...p, Is_Active: Number(e.target.value) }))}
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </Field>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
                                <button className="topbar-btn btn-outline" onClick={() => setShowForm(false)} disabled={submitting}>
                                    Cancel
                                </button>
                                <button
                                    className="topbar-btn btn-primary"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                    {submitting && <Loader size={12} style={{ animation: 'spin 1s linear infinite' }} />}
                                    {editMode ? 'Update Distributor' : 'Save Distributor'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Filter bar + Add button ───────────────────────────── */}
                    <div className="card" style={{ marginBottom: '14px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {/* Search */}
                            <div style={{ position: 'relative', flex: '1', minWidth: '180px' }}>
                                <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input
                                    className="form-input"
                                    placeholder="Search name, code, ARN…"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && fetchDistributors(1)}
                                    style={{ paddingLeft: '28px', margin: 0 }}
                                />
                            </div>

                            {/* Commission Type filter */}
                            <select
                                className="form-select"
                                value={commissionFilter}
                                onChange={e => setCommissionFilter(e.target.value)}
                                style={{ width: '180px', margin: 0 }}
                            >
                                <option value="">All Commission Types</option>
                                <option>Upfront + Trail</option>
                                <option>Trail Only</option>
                                <option>Direct (No Commission)</option>
                            </select>

                            {/* Active filter */}
                            <select
                                className="form-select"
                                value={activeFilter}
                                onChange={e => setActiveFilter(e.target.value)}
                                style={{ width: '120px', margin: 0 }}
                            >
                                <option value="">All Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>

                            <button
                                className="topbar-btn btn-outline"
                                onClick={() => fetchDistributors(1)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <RefreshCw size={12} /> Refresh
                            </button>

                            <button
                                className="topbar-btn btn-primary"
                                onClick={openAddForm}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}
                            >
                                <Plus size={13} /> Add Distributor
                            </button>
                        </div>
                    </div>

                    {/* ── Distributor list table ────────────────────────────── */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div className="card-title" style={{ margin: 0 }}>Empaneled Distributors</div>
                            {!loading && (
                                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                                    {total} record{total !== 1 ? 's' : ''} found
                                </span>
                            )}
                        </div>

                        {/* Error */}
                        {listError && (
                            <div style={{ background: '#FDE8E8', borderLeft: '3px solid #C0392B', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#7B0000', marginBottom: '10px' }}>
                                ✕ {listError}
                            </div>
                        )}

                        {/* Loading spinner */}
                        {loading && (
                            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--muted)', fontSize: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <Loader size={20} style={{ animation: 'spin 1s linear infinite', color: 'var(--navy)' }} />
                                Loading distributors…
                            </div>
                        )}

                        {/* Table */}
                        {!loading && (
                            <>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                                    <thead>
                                        <tr>
                                            {['Code', 'Distributor Name', 'ARN No.', 'EUIN', 'Commission Type', 'Status', ''].map((h, i) => (
                                                <th key={i} style={{
                                                    background: 'var(--navy)', color: '#fff',
                                                    padding: '8px 10px', textAlign: 'left',
                                                    fontWeight: 600, fontSize: '11px',
                                                }}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {distributors.length === 0 && (
                                            <tr>
                                                <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)', fontSize: '12px' }}>
                                                    No distributors found. Click <strong>Add Distributor</strong> to create one.
                                                </td>
                                            </tr>
                                        )}
                                        {distributors.map((row, i) => (
                                            <tr key={row.Distributor_ID} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
                                                <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)' }}>
                                                    {row.Distributor_Code}
                                                </td>
                                                <td style={{ padding: '7px 10px' }}>{row.Distributor_Name}</td>
                                                <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: '12px' }}>
                                                    {row.ARN_No || '—'}
                                                </td>
                                                <td style={{ padding: '7px 10px', fontFamily: 'monospace', fontSize: '12px' }}>
                                                    {row.EUIN || '—'}
                                                </td>
                                                <td style={{ padding: '7px 10px' }}>{row.Commission_Type}</td>
                                                <td style={{ padding: '7px 10px' }}>
                                                    <span className={`badge ${row.Is_Active ? 'b-approved' : 'b-rejected'}`}>
                                                        {row.Is_Active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '7px 10px' }}>
                                                    <button
                                                        onClick={() => openEditForm(row)}
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
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--border)', fontSize: '12px' }}>
                                        <button
                                            className="topbar-btn btn-outline"
                                            onClick={() => fetchDistributors(page - 1)}
                                            disabled={page <= 1}
                                        >
                                            ← Prev
                                        </button>
                                        <span style={{ color: 'var(--muted)' }}>Page {page} of {totalPages}</span>
                                        <button
                                            className="topbar-btn btn-outline"
                                            onClick={() => fetchDistributors(page + 1)}
                                            disabled={page >= totalPages}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}

            {/* ════════════════════════════════════════════════════════════════
                RTA TAB  (static — no backend table yet)
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'rta' && (
                <div className="card">
                    <div className="card-title">RTA (Registrar & Transfer Agent) Master</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
                        <thead>
                            <tr>
                                {['RTA Code', 'Name', 'API Endpoint', 'AMCs Covered', 'Status'].map((h, i) => (
                                    <th key={i} style={{
                                        background: 'var(--navy)', color: '#fff',
                                        padding: '8px 10px', textAlign: i === 3 ? 'right' : 'left',
                                        fontWeight: 600, fontSize: '11px',
                                    }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RTA_DATA.map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
                                    <td style={{ padding: '7px 10px', fontWeight: 700, color: 'var(--navy)' }}>{row.code}</td>
                                    <td style={{ padding: '7px 10px' }}>{row.name}</td>
                                    <td style={{ padding: '7px 10px' }}>
                                        <a href="#" style={{ color: 'var(--navy)', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            {row.api} <ExternalLink size={11} />
                                        </a>
                                    </td>
                                    <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.amcs}</td>
                                    <td style={{ padding: '7px 10px' }}>
                                        <span className="badge b-approved">{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ background: 'var(--navy-light)', borderLeft: '3px solid var(--navy)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: 'var(--navy)', marginTop: '12px' }}>
                        💡 RTA integration via API enables real-time folio confirmations, allotment updates, and SOA reconciliation.
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                DIRECT TAB
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'direct' && (
                <div className="card">
                    <div className="card-title">Direct Investment (No Intermediary)</div>
                    <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '12px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px' }}>
                        ✓ Direct investments are routed without a distributor ARN. All purchases through BSE StarMF / NSE NMF-II or directly to AMC.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px' }}>BSE StarMF</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>Member ID: BSE-MF-001</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>API: api.bsestarmf.in/v1</div>
                            <span className="badge b-approved">Connected</span>
                        </div>
                        <div style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '8px', fontSize: '12px' }}>NSE NMF-II</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>Member ID: NSE-NMF-004</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginBottom: '4px' }}>API: nmfii.nseindia.com/v2</div>
                            <span className="badge b-pending">Pending Setup</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Spinner keyframe — injected once */}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}