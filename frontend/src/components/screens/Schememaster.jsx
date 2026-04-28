// import { useState } from 'react';
// import { List, Search, Edit2 } from 'lucide-react';

// const sampleSchemes = [
//   { code: '119551', isin: 'INF200K01LQ1', name: 'SBI Liquid Fund', cat: 'Liquid', catBadge: 'b-liquid', plan: 'Growth', planBadge: 'b-growth', nav: '4,012.45', exitLoad: 'Nil > 7d', status: 'Active' },
//   { code: '119712', isin: 'INF179K01VW2', name: 'HDFC Liquid Fund', cat: 'Liquid', catBadge: 'b-liquid', plan: 'IDCW', planBadge: 'b-idcw', nav: '1,012.80', exitLoad: 'Nil > 7d', status: 'Active' },
//   { code: '120503', isin: 'INF109K01W27', name: 'ICICI Pru Overnight', cat: 'Overnight', catBadge: 'b-overnight', plan: 'Growth', planBadge: 'b-growth', nav: '1,352.20', exitLoad: 'Nil', status: 'Active' },
//   { code: '118825', isin: 'INF174K01LS7', name: 'Kotak Savings Fund', cat: 'Ultra Short', catBadge: 'b-debt', plan: 'Growth', planBadge: 'b-growth', nav: '42.18', exitLoad: 'Nil', status: 'Active' },
//   { code: '118560', isin: 'INF209K01YL5', name: 'ABSL Low Duration Fund', cat: 'Low Dur.', catBadge: 'b-debt', plan: 'Growth', planBadge: 'b-growth', nav: '618.55', exitLoad: 'Nil', status: 'Active' },
// ];

// export default function SchemeMaster({ onNavigate }) {
//   const [form, setForm] = useState({
//     code: '119551',
//     isin: 'INF200K01LQ1',
//     name: 'SBI Liquid Fund - Direct - Growth',
//     amc: 'SBI Funds Management',
//     category: 'Liquid',
//     subCategory: 'Direct - Growth',
//     planType: 'Growth',
//     minLumpsum: '5,000',
//     minSip: '500',
//     exitLoad: 'Nil after 7 days',
//     expenseRatio: '0.18',
//     benchmark: 'CRISIL Liquid Fund Index',
//     riskMeter: 'Low',
//     navFrequency: 'Daily',
//     ucbApproved: 'Yes',
//   });
//   const [search, setSearch] = useState('');
//   const [saved, setSaved] = useState(false);

//   const filtered = sampleSchemes.filter(s =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.code.includes(search)
//   );

//   const Field = ({ label, fieldKey, type = 'text', readonly = false, children }) => (
//     <div style={{ marginBottom: '10px' }}>
//       <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>{label}</label>
//       {children || (
//         <input
//           type={type}
//           className="form-input"
//           value={form[fieldKey] || ''}
//           readOnly={readonly}
//           style={readonly ? { background: '#f8f9fb', color: '#555' } : {}}
//           onChange={e => !readonly && setForm(p => ({ ...p, [fieldKey]: e.target.value }))}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <div className="screen-head">
//         <div>
//           <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <List size={20} />
//             Scheme Master
//             <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
//           </h1>
//           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › Scheme Master</div>
//         </div>
//       </div>

//       {saved && (
//         <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px' }}>
//           ✓ Scheme saved successfully.
//         </div>
//       )}

//       {/* Add Scheme Form */}
//       <div className="card">
//         <div className="card-title">Add Scheme</div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 12px' }}>
//           <Field label="Scheme Code (AMFI) *" fieldKey="code" />
//           <Field label="ISIN" fieldKey="isin" />
//           <Field label="Scheme Name *" fieldKey="name" />

//           <Field label="AMC">
//             <select className="form-select" value={form.amc} onChange={e => setForm(p => ({ ...p, amc: e.target.value }))}>
//               <option>SBI Funds Management</option>
//               <option>HDFC Asset Mgmt</option>
//               <option>ICICI Prudential AMC</option>
//               <option>Kotak Mahindra AMC</option>
//               <option>Aditya Birla Sun Life</option>
//             </select>
//           </Field>

//           <Field label="Category *">
//             <select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
//               {['Liquid', 'Overnight', 'Ultra Short Duration', 'Low Duration', 'Money Market', 'Short Duration Debt', 'Corporate Bond', 'Gilt Fund'].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </Field>

//           <Field label="Sub-Category">
//             <select className="form-select" value={form.subCategory} onChange={e => setForm(p => ({ ...p, subCategory: e.target.value }))}>
//               {['Direct - Growth', 'Direct - IDCW Payout', 'Direct - IDCW Reinvest', 'Regular - Growth'].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </Field>

//           <Field label="Plan Type">
//             <select className="form-select" value={form.planType} onChange={e => setForm(p => ({ ...p, planType: e.target.value }))}>
//               {['Growth', 'IDCW Payout', 'IDCW Reinvestment'].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </Field>

//           <Field label="Min Investment (Lumpsum)" fieldKey="minLumpsum" />
//           <Field label="Min SIP Amount" fieldKey="minSip" />
//           <Field label="Exit Load" fieldKey="exitLoad" />
//           <Field label="Expense Ratio (%)" fieldKey="expenseRatio" />
//           <Field label="Benchmark" fieldKey="benchmark" />

//           <Field label="Risk-o-Meter">
//             <select className="form-select" value={form.riskMeter} onChange={e => setForm(p => ({ ...p, riskMeter: e.target.value }))}>
//               {['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High', 'Very High'].map(o => <option key={o}>{o}</option>)}
//             </select>
//           </Field>

//           <Field label="NAV Frequency">
//             <select className="form-select" value={form.navFrequency} onChange={e => setForm(p => ({ ...p, navFrequency: e.target.value }))}>
//               <option>Daily</option>
//               <option>Weekly</option>
//             </select>
//           </Field>

//           <Field label="Approved for UCB?">
//             <select className="form-select" value={form.ucbApproved} onChange={e => setForm(p => ({ ...p, ucbApproved: e.target.value }))}>
//               <option>Yes</option>
//               <option>No</option>
//             </select>
//           </Field>
//         </div>

//         <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
//           <button className="topbar-btn btn-outline">Cancel</button>
//           <button className="topbar-btn btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>Save Scheme</button>
//         </div>
//       </div>

//       {/* Empaneled Schemes */}
//       <div className="card">
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
//           <div className="card-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>Empaneled Schemes ({sampleSchemes.length} active)</div>
//           <div style={{ position: 'relative' }}>
//             <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
//             <input
//               className="form-input"
//               placeholder="Search scheme..."
//               style={{ paddingLeft: '28px', width: '200px', fontSize: '12px' }}
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>
//         </div>
//         <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
//           <thead>
//             <tr>
//               {['AMFI Code', 'Scheme Name', 'Category', 'Plan', 'Latest NAV', 'Exit Load', 'Status', ''].map((h, i) => (
//                 <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i === 4 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((row, i) => (
//               <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
//                 <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)', fontFamily: 'monospace', fontSize: '12px' }}>{row.code}</td>
//                 <td style={{ padding: '7px 10px' }}>{row.name}</td>
//                 <td style={{ padding: '7px 10px' }}><span className={`badge ${row.catBadge}`}>{row.cat}</span></td>
//                 <td style={{ padding: '7px 10px' }}><span className={`badge ${row.planBadge}`}>{row.plan}</span></td>
//                 <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{row.nav}</td>
//                 <td style={{ padding: '7px 10px', fontSize: '11px' }}>{row.exitLoad}</td>
//                 <td style={{ padding: '7px 10px' }}><span className="badge b-approved">{row.status}</span></td>
//                 <td style={{ padding: '7px 10px' }}>
//                   <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}>
//                     <Edit2 size={12} /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { List, Search, Edit2, RefreshCw, PlusCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080';

// ── Badge helpers ──────────────────────────────────────────────────────────
const CAT_BADGE = {
  Liquid:                'b-liquid',
  Overnight:             'b-overnight',
  'Ultra Short Duration':'b-debt',
  'Low Duration':        'b-debt',
  'Money Market':        'b-debt',
  'Short Duration Debt': 'b-debt',
  'Corporate Bond':      'b-debt',
  'Gilt Fund':           'b-debt',
};
const PLAN_BADGE = {
  Growth:              'b-growth',
  'IDCW Payout':       'b-idcw',
  'IDCW Reinvestment': 'b-idcw',
};

const EMPTY_FORM = {
  code: '', isin: '', name: '',
  amc: 'SBI Funds Management',
  category: 'Liquid', subCategory: 'Direct - Growth',
  planType: 'Growth', minLumpsum: '', minSip: '',
  exitLoad: '', expenseRatio: '',
  benchmark: '', riskMeter: 'Low',
  navFrequency: 'Daily', ucbApproved: 'Yes',
};

export default function SchemeMaster({ onNavigate }) {
  // ── List state ─────────────────────────────────────────────────────────
  const [schemes, setSchemes]     = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [listError, setListError] = useState('');
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const PAGE_SIZE = 20;

  // ── Form state ──────────────────────────────────────────────────────────
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]       = useState(null);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast]         = useState('');

  // ── Fetch ───────────────────────────────────────────────────────────────
  const fetchSchemes = useCallback(async (searchTerm, pageNum) => {
    setLoading(true);
    setListError('');
    try {
      const params = new URLSearchParams({ is_active: 1, page: pageNum, page_size: PAGE_SIZE });
      if (searchTerm?.trim()) params.set('search', searchTerm.trim());

      const res  = await fetch(`${API_BASE}/api/scheme?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load schemes');

      setSchemes(json.data || []);
      setTotal(json.pagination?.total || 0);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSchemes('', 1); }, [fetchSchemes]);

  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchSchemes(search, 1); }, 400);
    return () => clearTimeout(t);
  }, [search, fetchSchemes]);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const startEdit = (row) => {
    setEditId(row.Scheme_ID);
    setForm({
      code:         row.AMFI_Code                       || '',
      isin:         row.ISIN                            || '',
      name:         row.Scheme_Name                     || '',
      amc:          row.AMC                             || 'SBI Funds Management',
      category:     row.Category                        || 'Liquid',
      subCategory:  row.Sub_Category                    || 'Direct - Growth',
      planType:     row.Plan_Type                       || 'Growth',
      minLumpsum:   row.Min_Lumpsum    != null ? String(row.Min_Lumpsum)    : '',
      minSip:       row.Min_SIP        != null ? String(row.Min_SIP)        : '',
      exitLoad:     row.Exit_Load                       || '',
      expenseRatio: row.Expense_Ratio_Pct != null ? String(row.Expense_Ratio_Pct) : '',
      benchmark:    row.Benchmark                       || '',
      riskMeter:    row.Risk_Meter                      || 'Low',
      navFrequency: row.NAV_Frequency                   || 'Daily',
      ucbApproved:  row.Approved_For_UCB                || 'Yes',
    });
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => { setForm(EMPTY_FORM); setEditId(null); setFormError(''); };

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.code.trim() || !form.name.trim()) {
      setFormError('AMFI Code and Scheme Name are required.');
      return;
    }
    setSaving(true);
    setFormError('');

    const payload = {
      AMFI_Code:         form.code.trim(),
      ISIN:              form.isin.trim()         || null,
      Scheme_Name:       form.name.trim(),
      AMC:               form.amc,
      Category:          form.category,
      Sub_Category:      form.subCategory         || null,
      Plan_Type:         form.planType            || null,
      Min_Lumpsum:       form.minLumpsum !== ''   ? Number(form.minLumpsum)    : null,
      Min_SIP:           form.minSip     !== ''   ? Number(form.minSip)        : null,
      Exit_Load:         form.exitLoad.trim()     || null,
      Expense_Ratio_Pct: form.expenseRatio !== '' ? Number(form.expenseRatio)  : null,
      Benchmark:         form.benchmark.trim()    || null,
      Risk_Meter:        form.riskMeter           || null,
      NAV_Frequency:     form.navFrequency        || null,
      Approved_For_UCB:  form.ucbApproved,
      [editId ? 'Modified_By' : 'Created_By']: 'ADMIN',
    };

    try {
      const url    = editId ? `${API_BASE}/api/scheme/${editId}` : `${API_BASE}/api/scheme`;
      const method = editId ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json   = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Save failed');

      showToast(editId ? 'Scheme updated successfully.' : 'Scheme created successfully.');
      cancelForm();
      fetchSchemes(search, page);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const goPage = (p) => { setPage(p); fetchSchemes(search, p); };

  // ── Field component ───────────────────────────────────────────────────
  const Field = ({ label, children, req }) => (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', fontSize: '11px', color: 'var(--navy)', fontWeight: 600, marginBottom: '4px' }}>
        {label} {req && <span style={{ color: 'var(--red)' }}>*</span>}
      </label>
      {children}
    </div>
  );

  const TextInput = ({ fkey, ...rest }) => (
    <input className="form-input" value={form[fkey]} onChange={f(fkey)} {...rest} />
  );

  const Sel = ({ fkey, options }) => (
    <select className="form-select" value={form[fkey]} onChange={f(fkey)}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="screen-head">
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <List size={20} />
            Scheme Master
            <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MASTERS</span>
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Masters › Scheme Master</div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#125C2A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✓ {toast}
        </div>
      )}

      {/* Form */}
      <div className="card">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editId ? <Edit2 size={14} /> : <PlusCircle size={14} />}
          {editId ? 'Edit Scheme' : 'Add Scheme'}
        </div>

        {formError && (
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '12px' }}>
            ✕ {formError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 12px' }}>

          <Field label="Scheme Code (AMFI)" req><TextInput fkey="code" /></Field>
          <Field label="ISIN"><TextInput fkey="isin" /></Field>
          <Field label="Scheme Name" req><TextInput fkey="name" /></Field>

          <Field label="AMC" req>
            <Sel fkey="amc" options={['SBI Funds Management','HDFC Asset Mgmt','ICICI Prudential AMC','Kotak Mahindra AMC','Aditya Birla Sun Life']} />
          </Field>

          <Field label="Category" req>
            <Sel fkey="category" options={['Liquid','Overnight','Ultra Short Duration','Low Duration','Money Market','Short Duration Debt','Corporate Bond','Gilt Fund']} />
          </Field>

          <Field label="Sub-Category">
            <Sel fkey="subCategory" options={['Direct - Growth','Direct - IDCW Payout','Direct - IDCW Reinvest','Regular - Growth']} />
          </Field>

          <Field label="Plan Type">
            <Sel fkey="planType" options={['Growth','IDCW Payout','IDCW Reinvestment']} />
          </Field>

          <Field label="Min Investment (Lumpsum)"><TextInput fkey="minLumpsum" type="number" /></Field>
          <Field label="Min SIP Amount"><TextInput fkey="minSip" type="number" /></Field>
          <Field label="Exit Load"><TextInput fkey="exitLoad" /></Field>
          <Field label="Expense Ratio (%)"><TextInput fkey="expenseRatio" type="number" /></Field>
          <Field label="Benchmark"><TextInput fkey="benchmark" /></Field>

          <Field label="Risk-o-Meter">
            <Sel fkey="riskMeter" options={['Low','Low to Moderate','Moderate','Moderately High','High','Very High']} />
          </Field>

          <Field label="NAV Frequency">
            <Sel fkey="navFrequency" options={['Daily','Weekly']} />
          </Field>

          <Field label="Approved for UCB?">
            <Sel fkey="ucbApproved" options={['Yes','No']} />
          </Field>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
          <button className="topbar-btn btn-outline" onClick={cancelForm} disabled={saving}>Cancel</button>
          <button className="topbar-btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : editId ? 'Update Scheme' : 'Save Scheme'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div className="card-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
            Empaneled Schemes
            {total > 0 && <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>({total} active)</span>}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={() => fetchSchemes(search, page)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }} title="Refresh">
              <RefreshCw size={13} />
            </button>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input className="form-input" placeholder="Search scheme..." style={{ paddingLeft: '28px', width: '200px', fontSize: '12px' }} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {listError && (
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid var(--red)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#991B1B', marginBottom: '10px' }}>
            ✕ {listError}
          </div>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr>
              {['AMFI Code', 'Scheme Name', 'AMC', 'Category', 'Plan', 'Exit Load', 'UCB', 'Status', ''].map((h, i) => (
                <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={9} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>Loading…</td></tr>
            )}
            {!loading && schemes.length === 0 && (
              <tr><td colSpan={9} style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>No schemes found.</td></tr>
            )}
            {!loading && schemes.map((row, i) => (
              <tr
                key={row.Scheme_ID}
                style={{ borderBottom: '1px solid var(--border)', background: editId === row.Scheme_ID ? '#FFFBEB' : i % 2 === 1 ? '#fcfcfd' : '' }}
              >
                <td style={{ padding: '7px 10px', fontWeight: 600, color: 'var(--navy)', fontFamily: 'monospace', fontSize: '12px' }}>{row.AMFI_Code}</td>
                <td style={{ padding: '7px 10px', maxWidth: '220px' }}>{row.Scheme_Name}</td>
                <td style={{ padding: '7px 10px', color: 'var(--muted)', fontSize: '11px' }}>{row.AMC}</td>
                <td style={{ padding: '7px 10px' }}>
                  <span className={`badge ${CAT_BADGE[row.Category] || 'b-debt'}`}>{row.Category}</span>
                </td>
                <td style={{ padding: '7px 10px' }}>
                  {row.Plan_Type && <span className={`badge ${PLAN_BADGE[row.Plan_Type] || 'b-growth'}`}>{row.Plan_Type}</span>}
                </td>
                <td style={{ padding: '7px 10px', fontSize: '11px' }}>{row.Exit_Load || '—'}</td>
                <td style={{ padding: '7px 10px' }}>
                  <span className={`badge ${row.Approved_For_UCB === 'Yes' ? 'b-approved' : 'b-rejected'}`}>{row.Approved_For_UCB}</span>
                </td>
                <td style={{ padding: '7px 10px' }}>
                  <span className={`badge ${row.Is_Active ? 'b-approved' : 'b-rejected'}`}>{row.Is_Active ? 'Active' : 'Inactive'}</span>
                </td>
                <td style={{ padding: '7px 10px' }}>
                  <button onClick={() => startEdit(row)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px' }}>
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
            <button className="topbar-btn btn-outline" style={{ padding: '3px 10px', fontSize: '11px' }} disabled={page === 1} onClick={() => goPage(page - 1)}>‹ Prev</button>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Page {page} of {totalPages}</span>
            <button className="topbar-btn btn-outline" style={{ padding: '3px 10px', fontSize: '11px' }} disabled={page === totalPages} onClick={() => goPage(page + 1)}>Next ›</button>
          </div>
        )}
      </div>
    </div>
  );
}