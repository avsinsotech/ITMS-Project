// import React, { useState } from 'react';

// export default function FDView({ onNavigate }) {

//   // 🔹 Edit mode toggle
//   const [isEditing, setIsEditing] = useState(false);

//   // 🔹 Form data state
//   const [formData, setFormData] = useState({
//     instrument: "NABARD Rural Bond",
//     type: "Bond-NABARD",
//     issuer: "NABARD",
//     isin: "INXXXXXXX001",
//     amount: "₹50,00,000",
//     interest: "7.00%",
//     purchasePrice: "₹49,80,000",
//     yield: "7.10%",
//     purchaseDate: "12-May-2024",
//     maturityDate: "12-May-2026",
//     classification: "HTM",
//     slr: "SLR"
//   });

//   // 🔹 Handle input change
//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <div>

//       {/* Header */}
//       <div className="card">
//         <div className="card-header">
//           <span className="card-title">📄 FD / Bond Details</span>
//           <button 
//             className="btn-sm outline" 
//             onClick={() => onNavigate('fd_bonds')}
//           >
//             ← Back
//           </button>
//         </div>

//         <div className="card-body">

//           {/* Info Banner */}
//           <div className="alert-banner info" style={{ marginBottom: '15px' }}>
//             ℹ️ {isEditing ? "Edit Mode Enabled" : "Showing detailed investment information (FD / Bond)"}
//           </div>

//           <div className="form-grid">

//             {/* Instrument */}
//             <div className="form-group">
//               <label className="form-label">Instrument</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.instrument}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('instrument', e.target.value)}
//               />
//             </div>

//             {/* Type */}
//             <div className="form-group">
//               <label className="form-label">Type</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.type}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('type', e.target.value)}
//               />
//             </div>

//             {/* Issuer */}
//             <div className="form-group">
//               <label className="form-label">Bank / Issuer</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.issuer}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('issuer', e.target.value)}
//               />
//             </div>

//             {/* ISIN */}
//             <div className="form-group">
//               <label className="form-label">ISIN / FD No</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.isin}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('isin', e.target.value)}
//               />
//             </div>

//             {/* Amount */}
//             <div className="form-group">
//               <label className="form-label">Amount (₹)</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.amount}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('amount', e.target.value)}
//               />
//             </div>

//             {/* Interest */}
//             <div className="form-group">
//               <label className="form-label">Interest / Coupon %</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.interest}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('interest', e.target.value)}
//               />
//             </div>

//             {/* Purchase Price */}
//             <div className="form-group">
//               <label className="form-label">Purchase Price</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.purchasePrice}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('purchasePrice', e.target.value)}
//               />
//             </div>

//             {/* Yield */}
//             <div className="form-group">
//               <label className="form-label">Yield %</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.yield}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('yield', e.target.value)}
//               />
//             </div>

//             {/* Purchase Date */}
//             <div className="form-group">
//               <label className="form-label">Start / Purchase Date</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.purchaseDate}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('purchaseDate', e.target.value)}
//               />
//             </div>

//             {/* Maturity Date */}
//             <div className="form-group">
//               <label className="form-label">Maturity Date</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.maturityDate}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('maturityDate', e.target.value)}
//               />
//             </div>

//             {/* Classification */}
//             <div className="form-group">
//               <label className="form-label">Classification</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.classification}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('classification', e.target.value)}
//               />
//             </div>

//             {/* SLR */}
//             <div className="form-group">
//               <label className="form-label">SLR Status</label>
//               <input 
//                 className={`form-input ${!isEditing ? 'readonly' : ''}`}
//                 value={formData.slr}
//                 readOnly={!isEditing}
//                 onChange={(e) => handleChange('slr', e.target.value)}
//               />
//             </div>

//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>

//             {!isEditing ? (
//               <>
//                 <button 
//                   className="btn-sm gold"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </button>

//                 <button 
//                   className="btn-sm outline"
//                   onClick={() => alert('📥 Download started')}
//                 >
//                   Download
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button 
//                   className="btn-sm success"
//                   onClick={() => {
//                     setIsEditing(false);
//                     alert('✅ Changes saved successfully');
//                   }}
//                 >
//                   Save
//                 </button>

//                 <button 
//                   className="btn-sm outline"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </>
//             )}

//             <button 
//               className="btn-sm outline"
//               onClick={() => onNavigate('fd_bonds')}
//             >
//               Back
//             </button>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { getFDById, updateFD } from '../../services/fdApi';

function formatDate(val) {
    if (!val) return '';
    const d = new Date(val);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function toInputDate(val) {
    if (!val) return '';
    return new Date(val).toISOString().split('T')[0];
}

function formatINR(val) {
    if (val === null || val === undefined) return '—';
    return '₹' + Number(val).toLocaleString('en-IN');
}

export default function FDView({ onNavigate, screenParams }) {
    // screenParams = { id } passed from App.jsx when navigating
    const id = screenParams?.id;

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading]     = useState(true);
    const [saving, setSaving]       = useState(false);
    const [error, setError]         = useState(null);
    const [success, setSuccess]     = useState(null);
    const [original, setOriginal]   = useState(null); // untouched data for cancel
    const [formData, setFormData]   = useState(null);

    // ── Fetch on mount ─────────────────────────────────────────
    useEffect(() => {
        if (!id) {
            setError('No FD ID provided. Please go back and select a record.');
            setLoading(false);
            return;
        }
        fetchRecord();
    }, [id]);

    const fetchRecord = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getFDById(id);
            const d = res.data;
            const mapped = {
                bank_name:         d.Bank_Name         || '',
                fd_number:         d.FD_Number         || '',
                deposit_amount:    d.Deposit_Amount    || '',
                interest_rate_pct: d.Interest_Rate_Pct || '',
                start_date:        toInputDate(d.Start_Date),
                maturity_date:     toInputDate(d.Maturity_Date),
                tenure_days:       d.Tenure_Days       || '',
                interest_type:     d.Interest_Type     || 'Simple',
                interest_payout:   d.Interest_Payout   || 'On Maturity',
                classification:    d.Classification    || 'HTM',
                slr_status:        d.SLR_Status        || 'Non-SLR',
                record_status:     d.Record_Status     || '',
                maturity_amount:   d.Maturity_Amount   || '',
                days_to_maturity:  d.Days_To_Maturity,
                maturity_alert:    d.Maturity_Alert_Level || 'Normal',
                created_at:        d.Created_At,
                created_by:        d.Created_By,
            };
            setFormData(mapped);
            setOriginal(mapped);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-calc tenure on date change
            const start    = field === 'start_date'    ? value : updated.start_date;
            const maturity = field === 'maturity_date' ? value : updated.maturity_date;
            if (start && maturity) {
                const diff = Math.round((new Date(maturity) - new Date(start)) / (1000 * 60 * 60 * 24));
                updated.tenure_days = diff > 0 ? diff : '';
            }
            return updated;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
            const payload = {
                bank_name:         formData.bank_name,
                fd_number:         formData.fd_number         || null,
                deposit_amount:    parseFloat(formData.deposit_amount),
                interest_rate_pct: parseFloat(formData.interest_rate_pct),
                start_date:        formData.start_date,
                maturity_date:     formData.maturity_date,
                interest_type:     formData.interest_type,
                interest_payout:   formData.interest_payout,
                classification:    formData.classification,
                slr_status:        formData.slr_status,
                record_status:     formData.record_status,
            };
            await updateFD(id, payload);
            setSuccess('✅ Changes saved successfully.');
            setIsEditing(false);
            setOriginal(formData);
            fetchRecord(); // re-fetch to get recalculated fields
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(original);
        setIsEditing(false);
        setError(null);
    };

    // ── Alert level color ──────────────────────────────────────
    const alertColor = {
        Critical: 'var(--danger)',
        Warning:  'var(--warning)',
        Normal:   'var(--success)',
    };

    // ── Render ─────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="card">
                <div className="card-body" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    ⏳ Loading FD details...
                </div>
            </div>
        );
    }

    if (error && !formData) {
        return (
            <div className="card">
                <div className="card-body" style={{ padding: '20px' }}>
                    <div className="alert-banner danger">⚠️ {error}</div>
                    <button className="btn-sm outline" style={{ marginTop: '10px' }} onClick={() => onNavigate('fd_bonds')}>← Back to List</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <span className="card-title">📄 FD / Bond Details</span>
                    <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
                </div>

                <div className="card-body">

                    {/* Info Banner */}
                    <div className="alert-banner info" style={{ marginBottom: '15px' }}>
                        ℹ️ {isEditing ? 'Edit Mode Enabled — make changes and click Save' : 'Showing detailed investment information (FD / Bond)'}
                        {formData?.maturity_alert && (
                            <span style={{
                                marginLeft: '12px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: alertColor[formData.maturity_alert] + '22',
                                color: alertColor[formData.maturity_alert],
                                fontWeight: 600,
                                fontSize: '11px',
                            }}>
                                ⏰ {formData.maturity_alert} — {formData.days_to_maturity} days left
                            </span>
                        )}
                    </div>

                    {error  && <div className="alert-banner danger"  style={{ marginBottom: '12px' }}>⚠️ {error}</div>}
                    {success && <div className="alert-banner success" style={{ marginBottom: '12px' }}>{success}</div>}

                    <div className="form-grid">

                        <div className="form-group">
                            <label className="form-label">Bank Name</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                value={formData.bank_name}
                                readOnly={!isEditing}
                                onChange={e => handleChange('bank_name', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">FD Number</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                value={formData.fd_number}
                                readOnly={!isEditing}
                                onChange={e => handleChange('fd_number', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deposit Amount (₹)</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                type={isEditing ? 'number' : 'text'}
                                value={isEditing ? formData.deposit_amount : formatINR(formData.deposit_amount)}
                                readOnly={!isEditing}
                                onChange={e => handleChange('deposit_amount', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Rate %</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                type={isEditing ? 'number' : 'text'}
                                step="0.01"
                                value={isEditing ? formData.interest_rate_pct : `${formData.interest_rate_pct}%`}
                                readOnly={!isEditing}
                                onChange={e => handleChange('interest_rate_pct', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                type={isEditing ? 'date' : 'text'}
                                value={isEditing ? formData.start_date : formatDate(formData.start_date)}
                                readOnly={!isEditing}
                                onChange={e => handleChange('start_date', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Maturity Date</label>
                            <input
                                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                                type={isEditing ? 'date' : 'text'}
                                value={isEditing ? formData.maturity_date : formatDate(formData.maturity_date)}
                                readOnly={!isEditing}
                                onChange={e => handleChange('maturity_date', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tenure (Days)</label>
                            <input className="form-input readonly" value={formData.tenure_days || '—'} readOnly />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Maturity Amount (₹)</label>
                            <input className="form-input readonly" value={formatINR(formData.maturity_amount)} readOnly />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Type</label>
                            {isEditing ? (
                                <select className="form-select" value={formData.interest_type} onChange={e => handleChange('interest_type', e.target.value)}>
                                    <option value="Simple">Simple</option>
                                    <option value="Quarterly Compounding">Quarterly Compounding</option>
                                    <option value="Cumulative">Cumulative</option>
                                </select>
                            ) : (
                                <input className="form-input readonly" value={formData.interest_type} readOnly />
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Payout</label>
                            {isEditing ? (
                                <select className="form-select" value={formData.interest_payout} onChange={e => handleChange('interest_payout', e.target.value)}>
                                    <option value="On Maturity">On Maturity</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                </select>
                            ) : (
                                <input className="form-input readonly" value={formData.interest_payout} readOnly />
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Classification</label>
                            {isEditing ? (
                                <select className="form-select" value={formData.classification} onChange={e => handleChange('classification', e.target.value)}>
                                    <option value="HTM">HTM</option>
                                    <option value="AFS">AFS</option>
                                </select>
                            ) : (
                                <input className="form-input readonly" value={formData.classification} readOnly />
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">SLR Status</label>
                            {isEditing ? (
                                <select className="form-select" value={formData.slr_status} onChange={e => handleChange('slr_status', e.target.value)}>
                                    <option value="Non-SLR">Non-SLR</option>
                                    <option value="SLR">SLR</option>
                                </select>
                            ) : (
                                <input className="form-input readonly" value={formData.slr_status} readOnly />
                            )}
                        </div>

                    </div>

                    {/* Meta info */}
                    {!isEditing && formData.created_at && (
                        <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                            Created: {formatDate(formData.created_at)}
                            {formData.created_by ? ` by ${formData.created_by}` : ''}
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        {!isEditing ? (
                            <>
                                <button className="btn-sm gold" onClick={() => setIsEditing(true)}>Edit</button>
                                <button className="btn-sm outline" onClick={() => alert('📥 Download started')}>Download</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-sm gold" disabled={saving} onClick={handleSave}>
                                    {saving ? '⏳ Saving...' : 'Save'}
                                </button>
                                <button className="btn-sm outline" onClick={handleCancel}>Cancel</button>
                            </>
                        )}
                        <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>Back</button>
                    </div>

                </div>
            </div>
        </div>
    );
}