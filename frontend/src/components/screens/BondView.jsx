// // import React, { useState, useEffect } from 'react';
// // import { getBondById } from '../../services/bondApi';

// // function formatINR(val) {
// //     if (val === null || val === undefined) return '—';
// //     return '₹' + Number(val).toLocaleString('en-IN');
// // }

// // function formatDate(val) {
// //     if (!val) return '—';
// //     return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
// // }

// // function ClassBadge({ cls }) {
// //     const map = { HTM: 'htm', AFS: 'afs', HFT: 'hft' };
// //     return <span className={`badge ${map[cls] || 'cd'}`}>{cls}</span>;
// // }

// // function StatusPill({ status }) {
// //     const styles = {
// //         Draft:     { background: '#fff3cd', color: '#856404' },
// //         Submitted: { background: '#cce5ff', color: '#004085' },
// //         Cancelled: { background: '#f8d7da', color: '#721c24' },
// //     };
// //     const s = styles[status] || { background: '#e2e3e5', color: '#383d41' };
// //     return (
// //         <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, ...s }}>
// //             {status}
// //         </span>
// //     );
// // }

// // export default function BondView({ onNavigate, params }) {
// //     const [record, setRecord] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError]   = useState(null);

// //     const id = params?.id;

// //     useEffect(() => {
// //         if (!id) { setError('No Bond ID provided.'); setLoading(false); return; }
// //         (async () => {
// //             try {
// //                 const res = await getBondById(id);
// //                 setRecord(res.data);
// //             } catch (err) {
// //                 setError(err.message);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         })();
// //     }, [id]);

// //     if (loading) return (
// //         <div className="card">
// //             <div className="card-body" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
// //                 ⏳ Loading Bond details...
// //             </div>
// //         </div>
// //     );

// //     if (error) return (
// //         <div className="card">
// //             <div className="card-body">
// //                 <div className="alert-banner danger">⚠️ {error}</div>
// //                 <button className="btn-sm outline" style={{ marginTop: '12px' }} onClick={() => onNavigate('fd_bonds')}>← Back</button>
// //             </div>
// //         </div>
// //     );

// //     if (!record) return null;

// //     const Row = ({ label, value }) => (
// //         <div style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
// //             <div style={{ width: '200px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
// //             <div style={{ fontSize: '13px', fontWeight: 500 }}>{value ?? '—'}</div>
// //         </div>
// //     );

// //     const daysLeft = record.Days_To_Maturity;
// //     const daysColor = daysLeft <= 7 ? 'var(--danger)' : daysLeft <= 30 ? 'var(--warning)' : 'inherit';

// //     return (
// //         <div>
// //             <div className="card">
// //                 <div className="card-header">
// //                     <span className="card-title">📜 Bond Details — INV-{String(record.ID).padStart(3, '0')}</span>
// //                     <div style={{ display: 'flex', gap: '8px' }}>
// //                         <StatusPill status={record.Record_Status} />
// //                         <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
// //                     </div>
// //                 </div>

// //                 <div className="card-body">

// //                     {/* RBI Info */}
// //                     <div className="rbi-info-box" style={{ marginBottom: '20px' }}>
// //                         <div className="rbi-header">
// //                             <span className="rbi-tag">RBI</span>
// //                             <span style={{ fontSize: '11px', fontWeight: 600 }}>NABARD / NHB Bonds — SLR Eligibility & HTM Norms</span>
// //                         </div>
// //                         <div className="rbi-text">
// //                             Bonds issued by NABARD/NHB are eligible for SLR (subject to RBI norms). HTM category preferred for long-term holding. Valuation as per FIMMDA guidelines.
// //                         </div>
// //                     </div>

// //                     {/* Section: Bond Info */}
// //                     <div style={{ marginBottom: '20px' }}>
// //                         <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
// //                             Bond Information
// //                         </div>
// //                         <Row label="Bond Name"     value={<b>{record.Bond_Name}</b>} />
// //                         <Row label="Issuer"        value={record.Issuer} />
// //                         <Row label="ISIN"          value={<code style={{ fontSize: '12px' }}>{record.ISIN}</code>} />
// //                     </div>

// //                     {/* Section: Financials */}
// //                     <div style={{ marginBottom: '20px' }}>
// //                         <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
// //                             Financial Details
// //                         </div>
// //                         <Row label="Face Value"      value={formatINR(record.Face_Value)} />
// //                         <Row label="Purchase Price"  value={formatINR(record.Purchase_Price)} />
// //                         <Row label="Quantity"        value={Number(record.Quantity).toLocaleString('en-IN')} />
// //                         <Row label="Total Value"     value={formatINR(record.Face_Value * record.Quantity)} />
// //                         <Row label="Coupon %"        value={`${record.Coupon_Pct}%`} />
// //                         <Row label="Yield %"         value={record.Yield_Pct ? `${record.Yield_Pct}%` : '—'} />
// //                     </div>

// //                     {/* Section: Tenure */}
// //                     <div style={{ marginBottom: '20px' }}>
// //                         <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
// //                             Tenure
// //                         </div>
// //                         <Row label="Purchase Date" value={formatDate(record.Purchase_Date)} />
// //                         <Row label="Maturity Date" value={formatDate(record.Maturity_Date)} />
// //                         <Row label="Days to Maturity" value={
// //                             <span style={{ color: daysColor, fontWeight: 700 }}>{daysLeft ?? '—'} days</span>
// //                         } />
// //                     </div>

// //                     {/* Section: Classification */}
// //                     <div style={{ marginBottom: '20px' }}>
// //                         <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
// //                             Classification
// //                         </div>
// //                         <Row label="Classification" value={<ClassBadge cls={record.Classification} />} />
// //                         <Row label="SLR Status"     value={
// //                             <span className={`badge ${record.SLR_Status === 'SLR' ? 'slr' : 'non-slr'}`}>
// //                                 {record.SLR_Status}
// //                             </span>
// //                         } />
// //                         <Row label="Record Status"  value={<StatusPill status={record.Record_Status} />} />
// //                     </div>

// //                     {/* Actions */}
// //                     <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
// //                         <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back to List</button>
// //                     </div>

// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// import React, { useState, useEffect } from 'react';
// import { getBondById } from '../../services/bondApi';

// function formatINR(val) {
//     if (val === null || val === undefined) return '—';
//     return '₹' + Number(val).toLocaleString('en-IN');
// }

// function formatDate(val) {
//     if (!val) return '—';
//     return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
// }

// export default function BondView({ onNavigate, params }) {
//     const [record, setRecord]   = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError]     = useState(null);

//     const id = params?.id;

//     useEffect(() => {
//         if (!id) { setError('No Bond ID provided.'); setLoading(false); return; }
//         (async () => {
//             try {
//                 const res = await getBondById(id);
//                 setRecord(res.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, [id]);

//     if (loading) return (
//         <div className="card">
//             <div className="card-body" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
//                 ⏳ Loading Bond details...
//             </div>
//         </div>
//     );

//     if (error) return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="alert-banner danger">⚠️ {error}</div>
//                 <button className="btn-sm outline" style={{ marginTop: '12px' }} onClick={() => onNavigate('fd_bonds')}>← Back</button>
//             </div>
//         </div>
//     );

//     if (!record) return null;

//     // Readonly field component
//     const Field = ({ label, value, highlight }) => (
//         <div className="form-group">
//             <label className="form-label">{label}</label>
//             <input
//                 className="form-input readonly"
//                 value={value ?? '—'}
//                 readOnly
//                 style={highlight ? { borderColor: 'var(--gold)', background: '#fffbf0' } : {}}
//             />
//         </div>
//     );

//     const handleDownload = () => {
//         const lines = [
//             `Bond View — INV-${String(record.ID).padStart(3, '0')}`,
//             ``,
//             `Instrument      : ${record.Bond_Name}`,
//             `Type            : Bond-${record.Issuer}`,
//             `Bank / Issuer   : ${record.Issuer}`,
//             `ISIN / FD No    : ${record.ISIN}`,
//             `Amount (₹)      : ${formatINR(record.Face_Value * record.Quantity)}`,
//             `Interest/Coupon%: ${record.Coupon_Pct}%`,
//             `Purchase Price  : ${formatINR(record.Purchase_Price * record.Quantity)}`,
//             `Yield %         : ${record.Yield_Pct ? record.Yield_Pct + '%' : '—'}`,
//             `Purchase Date   : ${formatDate(record.Purchase_Date)}`,
//             `Maturity Date   : ${formatDate(record.Maturity_Date)}`,
//             `Classification  : ${record.Classification}`,
//             `SLR Status      : ${record.SLR_Status}`,
//             `Record Status   : ${record.Record_Status}`,
//         ];
//         const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
//         const url  = URL.createObjectURL(blob);
//         const a    = document.createElement('a');
//         a.href     = url;
//         a.download = `Bond_INV-${String(record.ID).padStart(3, '0')}.txt`;
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <div>
//             <div className="card">
//                 {/* Header */}
//                 <div className="card-header">
//                     <span className="card-title">📜 FD / Bond Details</span>
//                     <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
//                 </div>

//                 <div className="card-body">

//                     {/* Info Banner */}
//                     <div className="alert-banner info" style={{ marginBottom: '20px' }}>
//                         ℹ️ Showing detailed investment information (FD / Bond)
//                     </div>

//                     {/* Form Grid */}
//                     <div className="form-grid">

//                         <Field label="Instrument"          value={record.Bond_Name} />
//                         <Field label="Type"                value={`Bond-${record.Issuer}`} />

//                         <Field label="Bank / Issuer"       value={record.Issuer} />
//                         <Field label="ISIN / FD No"        value={record.ISIN} highlight />

//                         <Field label="Amount (₹)"          value={formatINR(record.Face_Value * record.Quantity)} />
//                         <Field label="Interest / Coupon %" value={`${record.Coupon_Pct}%`} />

//                         <Field label="Purchase Price"      value={formatINR(record.Purchase_Price * record.Quantity)} />
//                         <Field label="Yield %"             value={record.Yield_Pct ? `${record.Yield_Pct}%` : '—'} />

//                         <Field label="Start / Purchase Date" value={formatDate(record.Purchase_Date)} />
//                         <Field label="Maturity Date"          value={formatDate(record.Maturity_Date)} />

//                         <Field label="Classification"      value={record.Classification} />
//                         <Field label="SLR Status"          value={record.SLR_Status} highlight />

//                     </div>

//                     {/* Action Buttons */}
//                     <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
//                         <button
//                             className="btn-sm gold"
//                             onClick={() => onNavigate('bond_edit', { id: record.ID })}
//                         >
//                             Edit
//                         </button>
//                         <button
//                             className="btn-sm outline"
//                             onClick={handleDownload}
//                         >
//                             Download
//                         </button>
//                         <button
//                             className="btn-sm outline"
//                             onClick={() => onNavigate('fd_bonds')}
//                         >
//                             Back
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { getBondById, updateBond } from '../../services/bondApi';

function formatINR(val) {
    if (val === null || val === undefined) return '—';
    return '₹' + Number(val).toLocaleString('en-IN');
}

function formatDate(val) {
    if (!val) return '—';
    return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function toInputDate(val) {
    if (!val) return '';
    const d = new Date(val);
    return d.toISOString().split('T')[0];
}

export default function BondView({ onNavigate, screenParams }) {
    const [record, setRecord]   = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm]           = useState({});
    const [saving, setSaving]       = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(null);

    // const id = params?.id;
    const id = screenParams?.id;

    useEffect(() => {
        if (!id) { setError('No Bond ID provided.'); setLoading(false); return; }
        (async () => {
            try {
                const res = await getBondById(id);
                setRecord(res.data);
                initForm(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const initForm = (data) => {
        setForm({
            bond_name:      data.Bond_Name      || '',
            issuer:         data.Issuer         || '',
            isin:           data.ISIN           || '',
            face_value:     data.Face_Value     || '',
            purchase_price: data.Purchase_Price || '',
            quantity:       data.Quantity       || '',
            coupon_pct:     data.Coupon_Pct     || '',
            yield_pct:      data.Yield_Pct      || '',
            purchase_date:  toInputDate(data.Purchase_Date),
            maturity_date:  toInputDate(data.Maturity_Date),
            classification: data.Classification || 'HTM',
            slr_status:     data.SLR_Status     || 'SLR',
            record_status:  data.Record_Status  || 'Draft',
        });
    };

    const handleEdit = () => {
        setSaveError(null);
        setSaveSuccess(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        initForm(record); // reset to original
        setSaveError(null);
        setIsEditing(false);
    };

    const validate = () => {
        if (!form.bond_name.trim())  return 'Bond Name is required.';
        if (!form.issuer.trim())     return 'Issuer is required.';
        if (!form.isin.trim())       return 'ISIN is required.';
        if (!form.face_value)        return 'Face Value is required.';
        if (!form.purchase_price)    return 'Purchase Price is required.';
        if (!form.quantity)          return 'Quantity is required.';
        if (!form.coupon_pct)        return 'Coupon % is required.';
        if (!form.purchase_date)     return 'Purchase Date is required.';
        if (!form.maturity_date)     return 'Maturity Date is required.';
        if (new Date(form.maturity_date) <= new Date(form.purchase_date))
            return 'Maturity Date must be after Purchase Date.';
        return null;
    };

    const handleSave = async () => {
        const err = validate();
        if (err) { setSaveError(err); return; }

        setSaving(true);
        setSaveError(null);
        setSaveSuccess(null);

        try {
            const payload = {
                ...form,
                face_value:     parseFloat(form.face_value),
                purchase_price: parseFloat(form.purchase_price),
                quantity:       parseFloat(form.quantity),
                coupon_pct:     parseFloat(form.coupon_pct),
                yield_pct:      form.yield_pct ? parseFloat(form.yield_pct) : null,
            };

            const res = await updateBond(id, payload);

            // Update local record with saved data
            setRecord(res.data || { ...record, ...payload });
            setSaveSuccess('✅ Bond updated successfully!');
            setIsEditing(false);
        } catch (err) {
            setSaveError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDownload = () => {
        const r = record;
        const lines = [
            `Bond Details — INV-${String(r.ID).padStart(3, '0')}`,
            ``,
            `Instrument       : ${r.Bond_Name}`,
            `Type             : Bond-${r.Issuer}`,
            `Bank / Issuer    : ${r.Issuer}`,
            `ISIN / FD No     : ${r.ISIN}`,
            `Face Value       : ${formatINR(r.Face_Value)}`,
            `Quantity         : ${r.Quantity}`,
            `Amount (₹)       : ${formatINR(r.Face_Value * r.Quantity)}`,
            `Purchase Price   : ${formatINR(r.Purchase_Price)}`,
            `Interest/Coupon% : ${r.Coupon_Pct}%`,
            `Yield %          : ${r.Yield_Pct ? r.Yield_Pct + '%' : '—'}`,
            `Purchase Date    : ${formatDate(r.Purchase_Date)}`,
            `Maturity Date    : ${formatDate(r.Maturity_Date)}`,
            `Classification   : ${r.Classification}`,
            `SLR Status       : ${r.SLR_Status}`,
            `Record Status    : ${r.Record_Status}`,
        ];
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `Bond_INV-${String(r.ID).padStart(3, '0')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ── Field renderers ───────────────────────────────────────
    const ReadField = ({ label, value, highlight }) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                className="form-input readonly"
                value={value ?? '—'}
                readOnly
                style={highlight ? { borderColor: 'var(--gold)', background: '#fffbf0' } : {}}
            />
        </div>
    );

    // const EditField = ({ label, field, type = 'text', step, required }) => (
    //     <div className="form-group">
    //         <label className="form-label">{label}{required && <span className="req"> *</span>}</label>
    //         <input
    //             className="form-input"
    //             type={type}
    //             step={step}
    //             value={form[field] ?? ''}
    //             onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
    //         />
    //     </div>
    // );
const EditField = ({ label, field, type = 'text', step, required }) => (
    <div className="form-group">
        <label className="form-label">
            {label}{required && <span className="req"> *</span>}
        </label>
        <input
            className="form-input"          /* ← NO 'readonly' here */
            type={type}
            step={step}
            value={form[field] ?? ''}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            autoComplete="off"
        />
    </div>
);
    const EditSelect = ({ label, field, options }) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <select
                className="form-select"
                value={form[field] ?? ''}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            >
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </div>
    );

    // ── Loading / Error states ────────────────────────────────
    if (loading) return (
        <div className="card">
            <div className="card-body" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                ⏳ Loading Bond details...
            </div>
        </div>
    );

    if (error) return (
        <div className="card">
            <div className="card-body">
                <div className="alert-banner danger">⚠️ {error}</div>
                <button className="btn-sm outline" style={{ marginTop: '12px' }} onClick={() => onNavigate('fd_bonds')}>← Back</button>
            </div>
        </div>
    );

    if (!record) return null;

    return (
        <div>
            <div className="card">
                {/* Header */}
                <div className="card-header">
                    <span className="card-title">📜 FD / Bond Details</span>
                    <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>← Back</button>
                </div>

                <div className="card-body">

                    {/* Info Banner */}
                    <div className="alert-banner info" style={{ marginBottom: '20px' }}>
                        ℹ️ {isEditing
                            ? 'Edit mode — update the fields below and click Save.'
                            : 'Showing detailed investment information (FD / Bond)'}
                    </div>

                    {/* Save alerts */}
                    {saveError && (
                        <div className="alert-banner danger" style={{ marginBottom: '12px' }}>
                            ⚠️ {saveError}
                        </div>
                    )}
                    {saveSuccess && (
                        <div className="alert-banner success" style={{ marginBottom: '12px' }}>
                            {saveSuccess}
                        </div>
                    )}

                    {/* ── READ MODE ── */}
                    {!isEditing && (
                        <div className="form-grid">
                            <ReadField label="Instrument"            value={record.Bond_Name} />
                            <ReadField label="Type"                  value={`Bond-${record.Issuer}`} />
                            <ReadField label="Bank / Issuer"         value={record.Issuer} />
                            <ReadField label="ISIN / FD No"          value={record.ISIN} highlight />
                            <ReadField label="Amount (₹)"            value={formatINR(record.Face_Value * record.Quantity)} />
                            <ReadField label="Interest / Coupon %"   value={`${record.Coupon_Pct}%`} />
                            <ReadField label="Purchase Price"        value={formatINR(record.Purchase_Price)} />
                            <ReadField label="Yield %"               value={record.Yield_Pct ? `${record.Yield_Pct}%` : '—'} />
                            <ReadField label="Start / Purchase Date" value={formatDate(record.Purchase_Date)} />
                            <ReadField label="Maturity Date"         value={formatDate(record.Maturity_Date)} />
                            <ReadField label="Classification"        value={record.Classification} />
                            <ReadField label="SLR Status"            value={record.SLR_Status} highlight />
                        </div>
                    )}

                    {/* ── EDIT MODE ── */}
                    {isEditing && (
                        <div className="form-grid">
                            <EditField label="Bond Name"          field="bond_name"      required />
                            <EditField label="Issuer"             field="issuer"         required />
                            <EditField label="ISIN"               field="isin"           required />
                            <EditField label="Face Value (₹)"     field="face_value"     type="number"               required />
                            <EditField label="Purchase Price (₹)" field="purchase_price" type="number" step="0.0001" required />
                            <EditField label="Quantity"           field="quantity"       type="number"               required />
                            <EditField label="Coupon %"           field="coupon_pct"     type="number" step="0.01"   required />
                            <EditField label="Yield %"            field="yield_pct"      type="number" step="0.0001" />
                            <EditField label="Purchase Date"      field="purchase_date"  type="date"                 required />
                            <EditField label="Maturity Date"      field="maturity_date"  type="date"                 required />
                            <EditSelect
                                label="Classification"
                                field="classification"
                                options={[
                                    { value: 'HTM', label: 'HTM' },
                                    { value: 'AFS', label: 'AFS' },
                                    { value: 'HFT', label: 'HFT' },
                                ]}
                            />
                            <EditSelect
                                label="SLR Status"
                                field="slr_status"
                                options={[
                                    { value: 'SLR',     label: 'SLR' },
                                    { value: 'Non-SLR', label: 'Non-SLR' },
                                ]}
                            />
                            <EditSelect
                                label="Record Status"
                                field="record_status"
                                options={[
                                    { value: 'Draft',     label: 'Draft' },
                                    { value: 'Submitted', label: 'Submitted' },
                                    { value: 'Cancelled', label: 'Cancelled' },
                                ]}
                            />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                        {!isEditing ? (
                            <>
                                <button className="btn-sm gold" onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="btn-sm outline" onClick={handleDownload}>
                                    Download
                                </button>
                                <button className="btn-sm outline" onClick={() => onNavigate('fd_bonds')}>
                                    Back
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn-sm gold" disabled={saving} onClick={handleSave}>
                                    {saving ? '⏳ Saving...' : 'Save Changes'}
                                </button>
                                <button className="btn-sm outline" disabled={saving} onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}