// import React from 'react';

// export default function BondNew({ onNavigate }) {
//   return (
//     <div>

//       {/* Header */}
//       <div className="card">
//         <div className="card-header">
//           <span className="card-title">📜 New Bond Investment</span>
//           <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>
//             ← Back
//           </button>
//         </div>

//         <div className="card-body">

//           {/* RBI Info */}
//           <div className="rbi-info-box" style={{ marginBottom: '15px' }}>
//             <div className="rbi-header">
//               <span className="rbi-tag">RBI</span>
//               <span style={{ fontSize: '11px', fontWeight: 600 }}>
//                 NABARD / NHB Bonds — SLR Eligibility & HTM Norms
//               </span>
//             </div>
//             <div className="rbi-text">
//               Bonds issued by NABARD/NHB are eligible for SLR (subject to RBI norms). HTM category preferred for long-term holding. Valuation as per FIMMDA guidelines.
//             </div>
//           </div>

//           <div className="form-grid">

//             {/* Bond Details */}
//             <div className="form-group">
//               <label className="form-label">Bond Name</label>
//               <input className="form-input" placeholder="e.g. NABARD Rural Bond" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Issuer</label>
//               <input className="form-input" placeholder="e.g. NABARD / NHB" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">ISIN</label>
//               <input className="form-input" placeholder="Enter ISIN" />
//             </div>

//             {/* Financials */}
//             <div className="form-group">
//               <label className="form-label">Face Value (₹)</label>
//               <input className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Purchase Price (₹)</label>
//               <input className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Quantity</label>
//               <input className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Coupon %</label>
//               <input className="form-input" placeholder="e.g. 7.00" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Yield %</label>
//               <input className="form-input" placeholder="Auto / Manual" />
//             </div>

//             {/* Dates */}
//             <div className="form-group">
//               <label className="form-label">Purchase Date</label>
//               <input type="date" className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Maturity Date</label>
//               <input type="date" className="form-input" />
//             </div>

//             {/* Classification */}
//             <div className="form-group">
//               <label className="form-label">Classification</label>
//               <select className="form-select">
//                 <option>HTM</option>
//                 <option>AFS</option>
//                 <option>HFT</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label className="form-label">SLR Status</label>
//               <select className="form-select">
//                 <option>SLR</option>
//                 <option>Non-SLR</option>
//               </select>
//             </div>

//           </div>

//           {/* Actions */}
//           <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
//             <button className="btn-sm gold">Submit</button>
//             <button className="btn-sm outline">Save Draft</button>
//             <button 
//               className="btn-sm outline"
//               onClick={() => onNavigate('fd_bonds')}
//             >
//               Cancel
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { createBond } from '../../services/bondApi';

const INITIAL = {
    bond_name:      '',
    issuer:         '',
    isin:           '',
    face_value:     '',
    purchase_price: '',
    quantity:       '',
    coupon_pct:     '',
    yield_pct:      '',
    purchase_date:  '',
    maturity_date:  '',
    classification: 'HTM',
    slr_status:     'SLR',
    record_status:  'Draft',
};

export default function BondNew({ onNavigate }) {
    const [form, setForm]       = useState(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [success, setSuccess] = useState(null);

    // Auto-calc yield if not manually entered (simple approximation)
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        if (!form.bond_name.trim())      return 'Bond Name is required.';
        if (!form.issuer.trim())         return 'Issuer is required.';
        if (!form.isin.trim())           return 'ISIN is required.';
        if (!form.face_value)            return 'Face Value is required.';
        if (!form.purchase_price)        return 'Purchase Price is required.';
        if (!form.quantity)              return 'Quantity is required.';
        if (!form.coupon_pct)            return 'Coupon % is required.';
        if (!form.purchase_date)         return 'Purchase Date is required.';
        if (!form.maturity_date)         return 'Maturity Date is required.';
        if (new Date(form.maturity_date) <= new Date(form.purchase_date))
            return 'Maturity Date must be after Purchase Date.';
        return null;
    };

    const handleSubmit = async (asDraft = false) => {
        const err = validate();
        if (err) { setError(err); return; }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = {
                ...form,
                record_status:  asDraft ? 'Draft' : 'Submitted',
                face_value:     parseFloat(form.face_value),
                purchase_price: parseFloat(form.purchase_price),
                quantity:       parseFloat(form.quantity),
                coupon_pct:     parseFloat(form.coupon_pct),
                yield_pct:      form.yield_pct ? parseFloat(form.yield_pct) : null,
            };

            const res = await createBond(payload);
            setSuccess(`✅ Bond created successfully! ID: INV-${String(res.data?.ID || '').padStart(3, '0')}`);
            setForm(INITIAL);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <span className="card-title">📜 New Bond Investment</span>
                    <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
                </div>

                <div className="card-body">

                    {/* RBI Info */}
                    <div className="rbi-info-box" style={{ marginBottom: '15px' }}>
                        <div className="rbi-header">
                            <span className="rbi-tag">RBI</span>
                            <span style={{ fontSize: '11px', fontWeight: 600 }}>
                                NABARD / NHB Bonds — SLR Eligibility & HTM Norms
                            </span>
                        </div>
                        <div className="rbi-text">
                            Bonds issued by NABARD/NHB are eligible for SLR (subject to RBI norms). HTM category preferred for long-term holding. Valuation as per FIMMDA guidelines.
                        </div>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="alert-banner danger" style={{ marginBottom: '12px' }}>
                            ⚠️ {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert-banner success" style={{ marginBottom: '12px' }}>
                            {success}
                            <button
                                className="btn-sm outline"
                                style={{ marginLeft: '10px', fontSize: '11px' }}
                                onClick={() => onNavigate('fd_bonds')}
                            >
                                View All
                            </button>
                        </div>
                    )}

                    <div className="form-grid">

                        <div className="form-group">
                            <label className="form-label">Bond Name <span className="req">*</span></label>
                            <input
                                className="form-input"
                                placeholder="e.g. NABARD Rural Bond"
                                value={form.bond_name}
                                onChange={e => handleChange('bond_name', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Issuer <span className="req">*</span></label>
                            <input
                                className="form-input"
                                placeholder="e.g. NABARD / NHB"
                                value={form.issuer}
                                onChange={e => handleChange('issuer', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">ISIN <span className="req">*</span></label>
                            <input
                                className="form-input"
                                placeholder="e.g. INE261F08020"
                                value={form.isin}
                                onChange={e => handleChange('isin', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Face Value (₹) <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="e.g. 1000"
                                value={form.face_value}
                                onChange={e => handleChange('face_value', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Purchase Price (₹) <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                step="0.000001"
                                placeholder="e.g. 998.50"
                                value={form.purchase_price}
                                onChange={e => handleChange('purchase_price', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Quantity <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="e.g. 500"
                                value={form.quantity}
                                onChange={e => handleChange('quantity', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Coupon % <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                step="0.01"
                                placeholder="e.g. 7.00"
                                value={form.coupon_pct}
                                onChange={e => handleChange('coupon_pct', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Yield %</label>
                            <input
                                className="form-input"
                                type="number"
                                step="0.000001"
                                placeholder="Auto / Manual"
                                value={form.yield_pct}
                                onChange={e => handleChange('yield_pct', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Purchase Date <span className="req">*</span></label>
                            <input
                                type="date"
                                className="form-input"
                                value={form.purchase_date}
                                onChange={e => handleChange('purchase_date', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Maturity Date <span className="req">*</span></label>
                            <input
                                type="date"
                                className="form-input"
                                value={form.maturity_date}
                                onChange={e => handleChange('maturity_date', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Classification</label>
                            <select
                                className="form-select"
                                value={form.classification}
                                onChange={e => handleChange('classification', e.target.value)}
                            >
                                <option value="HTM">HTM</option>
                                <option value="AFS">AFS</option>
                                <option value="HFT">HFT</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">SLR Status</label>
                            <select
                                className="form-select"
                                value={form.slr_status}
                                onChange={e => handleChange('slr_status', e.target.value)}
                            >
                                <option value="SLR">SLR</option>
                                <option value="Non-SLR">Non-SLR</option>
                            </select>
                        </div>

                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <button
                            className="btn-sm gold"
                            disabled={loading}
                            onClick={() => handleSubmit(false)}
                        >
                            {loading ? '⏳ Submitting...' : 'Submit'}
                        </button>
                        <button
                            className="btn-sm outline"
                            disabled={loading}
                            onClick={() => handleSubmit(true)}
                        >
                            Save Draft
                        </button>
                        <button
                            className="btn-sm outline"
                            onClick={() => onNavigate('fd_bonds')}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}