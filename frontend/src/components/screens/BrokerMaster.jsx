import React, { useState } from 'react';
import { Save, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const BROKER_TYPES = ['Primary Dealer', 'Secondary Dealer', 'Inter-Bank Broker', 'Custodian', 'Clearing Member'];
const AUDIT_FLAGS = ['Yes', 'No'];

const INITIAL_BROKERS = [
  { code: 'BRK-001', name: 'SBI DFHI', type: 'Primary Dealer', sebiReg: 'INZ000...', ndsId: 'CCIL-SBIDFHI', gst: '27AAACS1234F1Z5', empDate: '01-Apr-2020', brokCap: '0.25', audit: 'Yes', ytd: '85.20', status: 'Active' },
  { code: 'BRK-002', name: 'STCI Primary Dealer', type: 'Primary Dealer', sebiReg: 'INZ000...', ndsId: 'CCIL-STCI', gst: '27AABCS5678G1Z2', empDate: '15-Jun-2021', brokCap: '0.25', audit: 'Yes', ytd: '42.50', status: 'Active' },
  { code: 'BRK-003', name: 'PNB Gilts Ltd', type: 'Primary Dealer', sebiReg: 'INZ000234567', ndsId: 'CCIL-PNBGLT', gst: '07AABCP9012H1Z8', empDate: '01-Jan-2019', brokCap: '0.20', audit: 'Yes', ytd: '38.75', status: 'Active' },
  { code: 'BRK-004', name: 'ICICI Securities PD', type: 'Primary Dealer', sebiReg: 'INZ000345678', ndsId: 'CCIL-ICICIPD', gst: '27AAACI3456K1Z1', empDate: '01-Mar-2022', brokCap: '0.25', audit: 'Yes', ytd: '61.30', status: 'Active' },
  { code: 'BRK-005', name: 'Goldman Sachs India', type: 'Secondary Dealer', sebiReg: 'INZ000456789', ndsId: 'CCIL-GSIND', gst: '27AABCG7890L1Z4', empDate: '10-Jul-2023', brokCap: '0.15', audit: 'No', ytd: '12.80', status: 'Active' },
  { code: 'BRK-006', name: 'Kotak Mahindra PD', type: 'Primary Dealer', sebiReg: 'INZ000567890', ndsId: 'CCIL-KOTAKPD', gst: '27AABCK1234M1Z7', empDate: '01-Apr-2021', brokCap: '0.25', audit: 'Yes', ytd: '55.10', status: 'Active' },
  { code: 'BRK-007', name: 'ICICI Sec Primary Dealership', type: 'Primary Dealer', sebiReg: 'INZ000112345', ndsId: 'CCIL-PDICICI', gst: '27AAACI1195H1ZZ', empDate: '01-Apr-2024', brokCap: '0.25', audit: 'Yes', ytd: '0.00', status: 'Pending Approval' },
];

const EMPTY_FORM = {
  code: '', name: '', type: 'Primary Dealer', sebiReg: '', ndsId: '', gst: '',
  empDate: '', brokCap: '0.25', audit: 'Yes'
};

export default function BrokerMaster() {
  const [brokers, setBrokers] = useState(INITIAL_BROKERS);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 7;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.code || !form.name) { alert('⚠️ Broker Code and Name are required.'); return; }
    const entry = {
      code: form.code, name: form.name, type: form.type, sebiReg: form.sebiReg,
      ndsId: form.ndsId, gst: form.gst,
      empDate: form.empDate ? new Date(form.empDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
      brokCap: form.brokCap, audit: form.audit, ytd: '0.00', status: 'Pending Approval'
    };
    if (editingIndex !== null) {
      setBrokers(prev => prev.map((b, i) => i === editingIndex ? { ...entry, ytd: prev[i].ytd, status: prev[i].status } : b));
      setEditingIndex(null); setModalMode(null);
    } else {
      setBrokers(prev => [entry, ...prev]);
    }
    setForm({ ...EMPTY_FORM });
  };

  const populateForm = (index) => {
    const b = brokers[index];
    setForm({ code: b.code, name: b.name, type: b.type, sebiReg: b.sebiReg, ndsId: b.ndsId, gst: b.gst, empDate: '', brokCap: b.brokCap, audit: b.audit });
  };

  const handleEdit = (index) => { populateForm(index); setEditingIndex(index); setModalMode('edit'); };
  const handleView = (index) => { populateForm(index); setModalMode('view'); };
  const handleCancel = () => { setForm({ ...EMPTY_FORM }); setEditingIndex(null); };
  const handleAuthorize = (index) => {
    setBrokers(prev => prev.map((b, i) => i === index ? { ...b, status: 'Active' } : b));
  };

  const closeModal = () => { setModalMode(null); setEditingIndex(null); setForm({ ...EMPTY_FORM }); };

  const totalPages = Math.ceil(brokers.length / PER_PAGE);
  const paginated = brokers.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const FIELDS = [
    { label: 'Broker Code', field: 'code', req: true },
    { label: 'Name', field: 'name', req: true },
    { label: 'Type', field: 'type', type: 'select', options: BROKER_TYPES, req: true },
    { label: 'SEBI Reg No.', field: 'sebiReg' },
    { label: 'NDS-OM Member ID', field: 'ndsId' },
    { label: 'GST No.', field: 'gst' },
    { label: 'Empanelment Date', field: 'empDate', type: 'date' },
    { label: 'Brokerage Cap (bps)', field: 'brokCap', type: 'number' },
    { label: 'Concurrent Audit Flag', field: 'audit', type: 'select', options: AUDIT_FLAGS },
  ];

  const renderFormField = (f, readOnly = false) => (
    <div key={f.field}>
      <label style={{ fontSize: '9px', fontWeight: '600', color: '#4a5568', marginBottom: '1px', display: 'block' }}>
        {f.label} {f.req && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      {f.type === 'select' ? (
        <select className="form-select" value={form[f.field]} onChange={e => handleChange(f.field, e.target.value)}
          disabled={readOnly}
          style={{ width: '100%', padding: '4px 8px', fontSize: '11px', background: readOnly ? 'var(--gray-50)' : '#fff' }}>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input className="form-input" type={f.type || 'text'} value={form[f.field]} onChange={e => handleChange(f.field, e.target.value)}
          readOnly={readOnly}
          style={{ width: '100%', padding: '4px 8px', fontSize: '11px', background: readOnly ? 'var(--gray-50)' : '#fff', cursor: readOnly ? 'default' : 'text' }} />
      )}
    </div>
  );

  return (
    <div>
      {/* PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', margin: 0 }}>Broker / Counterparty Master</h2>
        <span className="badge slr" style={{ fontSize: '9px', padding: '2px 8px' }}>MASTERS</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--gray-400)' }}>Home › Masters › Broker Master</span>
      </div>

      {/* ADD FORM */}
      <div className="card" style={{ marginBottom: '10px' }}>
        <div className="card-body" style={{ padding: '10px 16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '3px', height: '12px', background: 'var(--gold)', borderRadius: '2px' }}></div>
            Add Broker / Counterparty
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '16px', rowGap: '6px', marginBottom: '4px' }}>
            {FIELDS.map(f => renderFormField(f))}
          </div>
          <div style={{ borderTop: '2px dotted var(--gray-200)', margin: '6px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button className="btn-sm outline" onClick={handleCancel} style={{ padding: '5px 18px', fontSize: '11px' }}>Cancel</button>
            <button style={{ padding: '5px 18px', fontSize: '11px', fontWeight: '700', borderRadius: '5px', background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={handleSave}>
              <Save size={13} /> Save & Send for Approval
            </button>
          </div>
        </div>
      </div>

      {/* BROKER LIST */}
      <div className="card">
        <div className="card-body" style={{ padding: '12px 18px 0' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '3px', height: '12px', background: 'var(--gold)', borderRadius: '2px' }}></div>
            Empaneled Brokers
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table density-high">
            <thead>
              <tr>
                {['Code', 'Name', 'Type', 'SEBI Reg', 'YTD Business (₹ Cr)', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ color: '#fff', background: 'var(--navy)', padding: '7px 10px', fontSize: '10px', fontWeight: '700', textAlign: h.includes('YTD') ? 'right' : 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--gray-400)' }}>No brokers found.</td></tr>
              ) : (
                paginated.map((b, i) => {
                  const realIndex = (page - 1) * PER_PAGE + i;
                  return (
                    <tr key={b.code + i}>
                      <td style={{ padding: '6px 10px', color: 'var(--navy)', fontWeight: '500' }}>{b.code}</td>
                      <td style={{ padding: '6px 10px', fontWeight: '600' }}>{b.name}</td>
                      <td style={{ padding: '6px 10px' }}>{b.type}</td>
                      <td style={{ padding: '6px 10px' }}>{b.sebiReg}</td>
                      <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: '600' }}>{b.ytd}</td>
                      <td style={{ padding: '6px 10px' }}>
                        <span className={`badge ${b.status === 'Active' ? 'active' : 'alert'}`} style={{ fontSize: '10px' }}>{b.status}</span>
                      </td>
                      <td style={{ padding: '6px 10px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          {b.status === 'Pending Approval' && (
                            <button onClick={() => handleAuthorize(realIndex)}
                              style={{ 
                                padding: '3px 10px', fontSize: '10px', fontWeight: '600', borderRadius: '4px', 
                                background: '#e6fffa', color: '#234e52', border: '1px solid #b2f5ea', cursor: 'pointer', 
                                transition: 'all 0.15s' 
                              }}
                              onMouseEnter={e => { e.target.style.background = '#38b2ac'; e.target.style.color = '#fff'; e.target.style.borderColor = '#38b2ac'; }}
                              onMouseLeave={e => { e.target.style.background = '#e6fffa'; e.target.style.color = '#234e52'; e.target.style.borderColor = '#b2f5ea'; }}
                            >Authorize</button>
                          )}
                          <button onClick={() => handleEdit(realIndex)}
                            style={{ padding: '3px 12px', fontSize: '10px', fontWeight: '600', borderRadius: '4px', background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', cursor: 'pointer', transition: 'all 0.15s' }}
                            onMouseEnter={e => { e.target.style.background = '#f59e0b'; e.target.style.color = '#fff'; e.target.style.borderColor = '#f59e0b'; }}
                            onMouseLeave={e => { e.target.style.background = '#fef3c7'; e.target.style.color = '#92400e'; e.target.style.borderColor = '#fcd34d'; }}
                          >Edit</button>
                          <button onClick={() => handleView(realIndex)}
                            style={{ padding: '3px 12px', fontSize: '10px', fontWeight: '600', borderRadius: '4px', background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd', cursor: 'pointer', transition: 'all 0.15s' }}
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

          {brokers.length > PER_PAGE && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
              <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, brokers.length)} of {brokers.length} brokers
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

      {/* MODAL OVERLAY */}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '3px', height: '14px', background: modalMode === 'edit' ? '#f59e0b' : '#2563eb', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                  {modalMode === 'edit' ? 'Edit Broker' : 'View Broker'}
                </span>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: modalMode === 'edit' ? '#fef3c7' : '#dbeafe', color: modalMode === 'edit' ? '#92400e' : '#1e40af', fontWeight: '600' }}>
                  {modalMode === 'edit' ? 'EDITING' : 'READ-ONLY'}
                </span>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', padding: '4px' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '16px', rowGap: '10px' }}>
                {FIELDS.map(f => renderFormField(f, modalMode === 'view'))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 20px', borderTop: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
              <button className="btn-sm outline" onClick={closeModal} style={{ padding: '5px 18px', fontSize: '11px' }}>
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalMode === 'edit' && (
                <button style={{ padding: '5px 18px', fontSize: '11px', fontWeight: '700', borderRadius: '5px', background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleSave}>
                  <Save size={13} /> Update Broker
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
