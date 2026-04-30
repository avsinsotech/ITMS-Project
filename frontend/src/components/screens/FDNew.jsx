// import React from 'react';

// export default function FDNew({ onNavigate }) {
//   return (
//     <div>

//       {/* Header */}
//       <div className="card">
//         <div className="card-header">
//           <span className="card-title">🏦 New Fixed Deposit</span>
//           <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>
//             ← Back
//           </button>
//         </div>

//         <div className="card-body">

//           {/* RBI Info */}
//           <div className="rbi-info-box" style={{ marginBottom: '15px' }}>
//             <div className="rbi-header">
//               <span className="rbi-tag">RBI</span>
//               <span style={{ fontSize: '11px', fontWeight: 600 }}>FD Limits & Exposure</span>
//             </div>
//             <div className="rbi-text">
//               UCBs can place deposits with Scheduled Banks. Total exposure must be within Board approved limits (typically % of own funds).
//             </div>
//           </div>

//           <div className="form-grid">

//             {/* Bank Info */}
//             <div className="form-group">
//               <label className="form-label">Bank Name</label>
//               <input className="form-input" placeholder="e.g. SBI – Mumbai" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">FD Number</label>
//               <input className="form-input" placeholder="Auto / Manual" />
//             </div>

//             {/* Amount */}
//             <div className="form-group">
//               <label className="form-label">Deposit Amount (₹)</label>
//               <input className="form-input" placeholder="Enter amount" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Interest Rate %</label>
//               <input className="form-input" placeholder="e.g. 7.00" />
//             </div>

//             {/* Tenure */}
//             <div className="form-group">
//               <label className="form-label">Start Date</label>
//               <input type="date" className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Maturity Date</label>
//               <input type="date" className="form-input" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Tenure (Days)</label>
//               <input className="form-input" placeholder="Auto / Manual" />
//             </div>

//             {/* Interest */}
//             <div className="form-group">
//               <label className="form-label">Interest Type</label>
//               <select className="form-select">
//                 <option>Simple</option>
//                 <option>Quarterly Compounding</option>
//                 <option>Cumulative</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label className="form-label">Interest Payout</label>
//               <select className="form-select">
//                 <option>On Maturity</option>
//                 <option>Monthly</option>
//                 <option>Quarterly</option>
//               </select>
//             </div>

//             {/* Classification */}
//             <div className="form-group">
//               <label className="form-label">Classification</label>
//               <select className="form-select">
//                 <option>HTM</option>
//                 <option>AFS</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label className="form-label">SLR Status</label>
//               <select className="form-select">
//                 <option>Non-SLR</option>
//                 <option>SLR</option>
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
import { createFD } from '../../services/fdApi';

const INITIAL = {
    bank_name:         '',
    fd_number:         '',
    deposit_amount:    '',
    interest_rate_pct: '',
    start_date:        '',
    maturity_date:     '',
    tenure_days:       '',
    interest_type:     'Simple',
    interest_payout:   'On Maturity',
    classification:    'HTM',
    slr_status:        'Non-SLR',
    record_status:     'Draft',
};

export default function FDNew({ onNavigate }) {
    const [form, setForm]       = useState(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [success, setSuccess] = useState(null);

    // Auto-calc tenure days when both dates are set
    const handleChange = (field, value) => {
        setForm(prev => {
            const updated = { ...prev, [field]: value };

            // Auto calculate tenure
            const start    = field === 'start_date'    ? value : updated.start_date;
            const maturity = field === 'maturity_date' ? value : updated.maturity_date;
            if (start && maturity) {
                const diff = Math.round((new Date(maturity) - new Date(start)) / (1000 * 60 * 60 * 24));
                updated.tenure_days = diff > 0 ? diff : '';
            }

            return updated;
        });
    };

    const validate = () => {
        if (!form.bank_name.trim())         return 'Bank Name is required.';
        if (!form.deposit_amount)           return 'Deposit Amount is required.';
        if (!form.interest_rate_pct)        return 'Interest Rate is required.';
        if (!form.start_date)               return 'Start Date is required.';
        if (!form.maturity_date)            return 'Maturity Date is required.';
        if (new Date(form.maturity_date) <= new Date(form.start_date))
            return 'Maturity Date must be after Start Date.';
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
                record_status: asDraft ? 'Draft' : 'Submitted',
                deposit_amount:    parseFloat(form.deposit_amount),
                interest_rate_pct: parseFloat(form.interest_rate_pct),
            };
            // Remove tenure_days from payload — SP calculates it
            delete payload.tenure_days;

            const res = await createFD(payload);
            setSuccess(`✅ FD created successfully! ID: INV-${String(res.data?.ID || '').padStart(3, '0')}`);
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
                    <span className="card-title">🏦 New Fixed Deposit</span>
                    <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
                </div>

                <div className="card-body">

                    {/* RBI Info */}
                    <div className="rbi-info-box" style={{ marginBottom: '15px' }}>
                        <div className="rbi-header">
                            <span className="rbi-tag">RBI</span>
                            <span style={{ fontSize: '11px', fontWeight: 600 }}>FD Limits & Exposure</span>
                        </div>
                        <div className="rbi-text">
                            UCBs can place deposits with Scheduled Banks. Total exposure must be within Board approved limits (typically % of own funds).
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
                            <button className="btn-sm outline" style={{ marginLeft: '10px', fontSize: '11px' }} onClick={() => onNavigate('fd_bonds')}>
                                View All FDs
                            </button>
                        </div>
                    )}

                    <div className="form-grid">

                        <div className="form-group">
                            <label className="form-label">Bank Name <span className="req">*</span></label>
                            <input
                                className="form-input"
                                placeholder="e.g. SBI – Mumbai"
                                value={form.bank_name}
                                onChange={e => handleChange('bank_name', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">FD Number</label>
                            <input
                                className="form-input"
                                placeholder="Auto / Manual"
                                value={form.fd_number}
                                onChange={e => handleChange('fd_number', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deposit Amount (₹) <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Enter amount"
                                value={form.deposit_amount}
                                onChange={e => handleChange('deposit_amount', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Rate % <span className="req">*</span></label>
                            <input
                                className="form-input"
                                type="number"
                                step="0.01"
                                placeholder="e.g. 7.00"
                                value={form.interest_rate_pct}
                                onChange={e => handleChange('interest_rate_pct', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Start Date <span className="req">*</span></label>
                            <input
                                type="date"
                                className="form-input"
                                value={form.start_date}
                                onChange={e => handleChange('start_date', e.target.value)}
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
                            <label className="form-label">Tenure (Days)</label>
                            <input
                                className="form-input readonly"
                                placeholder="Auto-calculated"
                                value={form.tenure_days}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Type</label>
                            <select className="form-select" value={form.interest_type} onChange={e => handleChange('interest_type', e.target.value)}>
                                <option value="Simple">Simple</option>
                                <option value="Quarterly Compounding">Quarterly Compounding</option>
                                <option value="Cumulative">Cumulative</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interest Payout</label>
                            <select className="form-select" value={form.interest_payout} onChange={e => handleChange('interest_payout', e.target.value)}>
                                <option value="On Maturity">On Maturity</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Classification</label>
                            <select className="form-select" value={form.classification} onChange={e => handleChange('classification', e.target.value)}>
                                <option value="HTM">HTM</option>
                                <option value="AFS">AFS</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">SLR Status</label>
                            <select className="form-select" value={form.slr_status} onChange={e => handleChange('slr_status', e.target.value)}>
                                <option value="Non-SLR">Non-SLR</option>
                                <option value="SLR">SLR</option>
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