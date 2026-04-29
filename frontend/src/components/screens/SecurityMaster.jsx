import React, { useState } from 'react';
import { ShieldCheck, Save, X, Edit3, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowLeft } from 'lucide-react';

const ISSUER_TYPES = [
  'GoI Dated Security', 'State Development Loan', 'Treasury Bill', 'GoI Floating Rate', 'Other'
];
const COUPON_FREQUENCIES = ['Annual', 'Half-Yearly', 'Quarterly', 'Monthly', 'Zero Coupon', 'At Maturity'];
const DAY_COUNT_OPTIONS = ['30/360', 'Actual/360', 'Actual/365', 'Actual/Actual'];

// Sample data matching the screenshot
const INITIAL_SECURITIES = [
  { isin: 'IN0020230051', name: '7.26% GS 2033', issuer: 'GoI', coupon: '7.26%', maturity: '06-Feb-2033', status: 'Active' },
  { isin: 'IN0020220011', name: '7.10% GS 2029', issuer: 'GoI', coupon: '7.10%', maturity: '18-Apr-2029', status: 'Active' },
  { isin: 'IN1020240015', name: '7.71% MH SDL 2034', issuer: 'Maharashtra', coupon: '7.71%', maturity: '22-Mar-2034', status: 'Active' },
  { isin: 'IN002026T091', name: '91-D T-Bill 2026', issuer: 'GoI', coupon: 'Discount', maturity: '17-Jul-2026', status: 'Active' },
  { isin: 'IN0020230062', name: '7.18% GS 2033', issuer: 'GoI', coupon: '7.18%', maturity: '14-Aug-2033', status: 'Active' },
  { isin: 'IN0020240033', name: '7.30% GS 2053', issuer: 'GoI', coupon: '7.30%', maturity: '19-Jun-2053', status: 'Active' },
  { isin: 'IN1020240028', name: '7.59% GJ SDL 2034', issuer: 'Gujarat', coupon: '7.59%', maturity: '08-Mar-2034', status: 'Active' },
  { isin: 'IN0020240044', name: '7.25% GS 2034', issuer: 'GoI', coupon: '7.25%', maturity: '12-Jun-2034', status: 'Active' },
  { isin: 'IN0020210011', name: '6.10% GS 2031', issuer: 'GoI', coupon: '6.10%', maturity: '12-Jul-2031', status: 'Active' },
  { isin: 'IN0020200011', name: '5.85% GS 2030', issuer: 'GoI', coupon: '5.85%', maturity: '01-Dec-2030', status: 'Active' },
  { isin: 'IN1020230045', name: '7.62% KA SDL 2033', issuer: 'Karnataka', coupon: '7.62%', maturity: '15-Nov-2033', status: 'Active' },
];

const EMPTY_FORM = {
  isin: '', name: '', issuerType: 'GoI Dated Security', couponRate: '', faceValue: '100.00',
  issueDate: '', maturityDate: '', couponFrequency: 'Half-Yearly', dayCount: '30/360'
};

export default function SecurityMaster() {
  const [securities, setSecurities] = useState(INITIAL_SECURITIES);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit' | null
  const [modalIndex, setModalIndex] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 7;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.isin || !form.name) {
      alert('⚠️ ISIN and Security Name are required.');
      return;
    }
    const entry = {
      isin: form.isin,
      name: form.name,
      issuer: form.issuerType.replace(' Dated Security', '').replace(' Development Loan', '').replace('Treasury Bill', 'GoI'),
      coupon: form.couponRate ? `${form.couponRate}%` : 'Discount',
      maturity: form.maturityDate ? new Date(form.maturityDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
      status: 'Active'
    };

    if (editingIndex !== null) {
      setSecurities(prev => prev.map((s, i) => i === editingIndex ? entry : s));
      setEditingIndex(null);
      setModalMode(null);
      setModalIndex(null);
    } else {
      setSecurities(prev => [entry, ...prev]);
    }
    setForm({ ...EMPTY_FORM });
  };

  const populateForm = (index) => {
    const s = securities[index];
    setForm({
      isin: s.isin,
      name: s.name,
      issuerType: ISSUER_TYPES.find(t => t.includes(s.issuer)) || 'GoI Dated Security',
      couponRate: s.coupon === 'Discount' ? '' : s.coupon.replace('%', ''),
      faceValue: '100.00',
      issueDate: '',
      maturityDate: '',
      couponFrequency: 'Half-Yearly',
      dayCount: '30/360'
    });
  };

  const handleEdit = (index) => {
    populateForm(index);
    setEditingIndex(index);
    setModalIndex(index);
    setModalMode('edit');
  };

  const handleView = (index) => {
    populateForm(index);
    setModalIndex(index);
    setModalMode('view');
  };

  const handleCancel = () => {
    setForm({ ...EMPTY_FORM });
    setEditingIndex(null);
  };

  const closeModal = () => {
    setModalMode(null);
    setModalIndex(null);
    setEditingIndex(null);
    setForm({ ...EMPTY_FORM });
  };

  const totalPages = Math.ceil(securities.length / PER_PAGE);
  const paginated = securities.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      {/* PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', margin: 0 }}>Security Master</h2>
        <span className="badge slr" style={{ fontSize: '9px', padding: '2px 8px' }}>MASTERS</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--gray-400)' }}>Home › Masters › Security Master</span>
      </div>

      {/* ADD / EDIT FORM */}
      <div className="card" style={{ marginBottom: '10px' }}>
        <div className="card-body" style={{ padding: '10px 16px' }}>
          {/* Section Title */}
          <div style={{ 
            fontSize: '12px', fontWeight: '700', color: 'var(--navy)', marginBottom: '10px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <div style={{ width: '3px', height: '12px', background: 'var(--gold)', borderRadius: '2px' }}></div>
            {editingIndex !== null ? 'Edit Security' : 'Add / Edit Security'}
          </div>

          {/* Row 1: ISIN, Security Name, Issuer Type */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '16px', rowGap: '6px', marginBottom: '4px' }}>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                ISIN <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input className="form-input" value={form.isin} onChange={e => handleChange('isin', e.target.value)}
                placeholder="IN0020230051" style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Security Name <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)}
                placeholder="7.26% GS 2033" style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Issuer Type <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <select className="form-select" value={form.issuerType} onChange={e => handleChange('issuerType', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }}>
                {ISSUER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Row 2: Coupon Rate, Face Value, Issue Date */}
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Coupon Rate (%)
              </label>
              <input className="form-input" type="number" step="0.01" value={form.couponRate} onChange={e => handleChange('couponRate', e.target.value)}
                placeholder="7.26" style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Face Value (₹)
              </label>
              <input className="form-input" type="number" value={form.faceValue} onChange={e => handleChange('faceValue', e.target.value)}
                placeholder="100.00" style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Issue Date
              </label>
              <input className="form-input" type="date" value={form.issueDate} onChange={e => handleChange('issueDate', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>

            {/* Row 3: Maturity Date, Coupon Frequency, Day Count */}
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Maturity Date
              </label>
              <input className="form-input" type="date" value={form.maturityDate} onChange={e => handleChange('maturityDate', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }} />
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Coupon Frequency
              </label>
              <select className="form-select" value={form.couponFrequency} onChange={e => handleChange('couponFrequency', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }}>
                {COUPON_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                Day Count Convention
              </label>
              <select className="form-select" value={form.dayCount} onChange={e => handleChange('dayCount', e.target.value)}
                style={{ width: '100%', padding: '4px 8px', fontSize: '11px' }}>
                {DAY_COUNT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Dotted Separator */}
          <div style={{ borderTop: '2px dotted var(--gray-200)', margin: '6px 0' }}></div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button className="btn-sm outline" onClick={handleCancel} style={{ padding: '5px 18px', fontSize: '11px' }}>
              Cancel
            </button>
            <button 
              style={{ 
                padding: '5px 18px', fontSize: '11px', fontWeight: '700', borderRadius: '5px',
                background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s'
              }}
              onClick={handleSave}
              onMouseEnter={e => e.target.style.opacity = '0.9'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              <Save size={13} />
              Save Security
            </button>
          </div>
        </div>
      </div>

      {/* SECURITY MASTER LIST */}
      <div className="card">
        <div className="card-body" style={{ padding: '12px 18px 0' }}>
          <div style={{ 
            fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '10px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <div style={{ width: '3px', height: '14px', background: 'var(--gold)', borderRadius: '2px' }}></div>
            Security Master List
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table density-high">
            <thead>
              <tr>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700' }}>ISIN</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700' }}>Security Name</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700' }}>Issuer</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700', textAlign: 'center' }}>Coupon</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700' }}>Maturity</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700', textAlign: 'center' }}>Status</th>
                <th style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--gray-400)' }}>
                    No securities found. Add one using the form above.
                  </td>
                </tr>
              ) : (
                paginated.map((s, i) => {
                  const realIndex = (page - 1) * PER_PAGE + i;
                  return (
                    <tr key={s.isin + i}>
                      <td style={{ color: 'var(--navy)', fontWeight: '500', padding: '6px 10px' }}>{s.isin}</td>
                      <td style={{ fontWeight: '600', padding: '6px 10px' }}>{s.name}</td>
                      <td style={{ padding: '6px 10px' }}>{s.issuer}</td>
                      <td style={{ textAlign: 'center', padding: '6px 10px' }}>{s.coupon}</td>
                      <td style={{ padding: '6px 10px' }}>{s.maturity}</td>
                      <td style={{ textAlign: 'center', padding: '6px 10px' }}>
                        <span className="badge active" style={{ fontSize: '10px' }}>{s.status}</span>
                      </td>
                      <td style={{ textAlign: 'center', padding: '6px 10px' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button 
                            onClick={() => handleEdit(realIndex)}
                            style={{ 
                              padding: '3px 12px', fontSize: '10px', fontWeight: '600', borderRadius: '4px',
                              background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                            onMouseEnter={e => { e.target.style.background = '#f59e0b'; e.target.style.color = '#fff'; e.target.style.borderColor = '#f59e0b'; }}
                            onMouseLeave={e => { e.target.style.background = '#fef3c7'; e.target.style.color = '#92400e'; e.target.style.borderColor = '#fcd34d'; }}
                          >Edit</button>
                          <button 
                            onClick={() => handleView(realIndex)}
                            style={{ 
                              padding: '3px 12px', fontSize: '10px', fontWeight: '600', borderRadius: '4px',
                              background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd', cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                            onMouseEnter={e => { e.target.style.background = '#2563eb'; e.target.style.color = '#fff'; e.target.style.borderColor = '#2563eb'; }}
                            onMouseLeave={e => { e.target.style.background = '#dbeafe'; e.target.style.color = '#1e40af'; e.target.style.borderColor = '#93c5fd'; }}
                          >View</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {securities.length > PER_PAGE && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
              <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, securities.length)} of {securities.length} securities
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft size={14} /></button>
                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={14} /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                  <button key={pg} className={`btn-sm ${pg === page ? 'gold' : 'outline'}`} style={{ padding: '4px 10px', fontSize: '11px', minWidth: '30px' }} onClick={() => setPage(pg)}>{pg}</button>
                ))}
                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={14} /></button>
                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setPage(totalPages)} disabled={page === totalPages}><ChevronsRight size={14} /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== MODAL OVERLAY ===== */}
      {modalMode && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease'
        }} onClick={closeModal}>
          <div style={{
            background: '#fff', borderRadius: '10px', width: '720px', maxHeight: '85vh', overflow: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)', animation: 'slideUp 0.25s ease'
          }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '3px', height: '14px', background: modalMode === 'edit' ? '#4299e1' : '#38b2ac', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                  {modalMode === 'edit' ? 'Edit Security' : 'View Security'}
                </span>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: modalMode === 'edit' ? '#ebf8ff' : '#e6fffa', color: modalMode === 'edit' ? '#2b6cb0' : '#234e52', fontWeight: '600' }}>
                  {modalMode === 'edit' ? 'EDITING' : 'READ-ONLY'}
                </span>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '16px', rowGap: '10px' }}>
                {[
                  { label: 'ISIN', field: 'isin', req: true },
                  { label: 'Security Name', field: 'name', req: true },
                  { label: 'Issuer Type', field: 'issuerType', type: 'select', options: ISSUER_TYPES, req: true },
                  { label: 'Coupon Rate (%)', field: 'couponRate', type: 'number' },
                  { label: 'Face Value (₹)', field: 'faceValue', type: 'number' },
                  { label: 'Issue Date', field: 'issueDate', type: 'date' },
                  { label: 'Maturity Date', field: 'maturityDate', type: 'date' },
                  { label: 'Coupon Frequency', field: 'couponFrequency', type: 'select', options: COUPON_FREQUENCIES },
                  { label: 'Day Count Convention', field: 'dayCount', type: 'select', options: DAY_COUNT_OPTIONS },
                ].map(f => (
                  <div key={f.field}>
                    <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
                      {f.label} {f.req && <span style={{ color: 'var(--danger)' }}>*</span>}
                    </label>
                    {f.type === 'select' ? (
                      <select className="form-select" value={form[f.field]} onChange={e => handleChange(f.field, e.target.value)}
                        disabled={modalMode === 'view'}
                        style={{ width: '100%', padding: '4px 8px', fontSize: '11px', background: modalMode === 'view' ? 'var(--gray-50)' : '#fff' }}>
                        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input className="form-input" type={f.type || 'text'} value={form[f.field]} onChange={e => handleChange(f.field, e.target.value)}
                        readOnly={modalMode === 'view'}
                        style={{ width: '100%', padding: '4px 8px', fontSize: '11px', background: modalMode === 'view' ? 'var(--gray-50)' : '#fff', cursor: modalMode === 'view' ? 'default' : 'text' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end', gap: '8px',
              padding: '12px 20px', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)'
            }}>
              <button className="btn-sm outline" onClick={closeModal} style={{ padding: '5px 18px', fontSize: '11px' }}>
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalMode === 'edit' && (
                <button 
                  style={{ 
                    padding: '5px 18px', fontSize: '11px', fontWeight: '700', borderRadius: '5px',
                    background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                  onClick={handleSave}
                >
                  <Save size={13} />
                  Update Security
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
