import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const PENDING = [
  { ref: 'MF-P-2026-0142', type: 'Purchase – Lumpsum', scheme: 'SBI Liquid Fund – Direct Growth', maker: 'DEALER01', amount: '50,00,000', submitted: '19-Apr 10:45', age: '30 min', ageClass: 'b-pending' },
  { ref: 'MF-R-2026-0056', type: 'Redemption', scheme: 'HDFC Liquid Fund – IDCW', maker: 'DEALER02', amount: '30,00,000', submitted: '19-Apr 09:15', age: '2 hr', ageClass: 'b-pending' },
  { ref: 'MF-SW-2026-0018', type: 'Switch Transaction', scheme: 'SBI MF – Liquid to Overnight', maker: 'DEALER01', amount: '25,00,000', submitted: '19-Apr 08:30', age: '3 hr', ageClass: 'b-pending' },
  { ref: 'SIP-2026-008', type: 'SIP Registration', scheme: 'HDFC Short Term Debt', maker: 'DEALER02', amount: '1,00,000 /mo', submitted: '18-Apr 16:20', age: '>24 hr', ageClass: 'b-rejected' },
  { ref: 'AMC-EMPL-007', type: 'AMC Empanelment', scheme: 'Nippon India MF', maker: 'OPS-MGR', amount: '—', submitted: '18-Apr 14:00', age: '>24 hr', ageClass: 'b-rejected' },
];

const HISTORY = [
  { ref: 'MF-P-2026-0141', type: 'Purchase – Lumpsum', scheme: 'ICICI Pru Overnight', maker: 'DEALER01', checker: 'TREAS-HEAD', amount: '1,00,00,000', decision: 'Approved', decided: '18-Apr 16:30' },
  { ref: 'MF-P-2026-0138', type: 'Purchase – Lumpsum', scheme: 'Kotak Savings Fund', maker: 'DEALER02', checker: 'TREAS-HEAD', amount: '75,00,000', decision: 'Approved', decided: '17-Apr 11:20' },
  { ref: 'MF-R-2026-0050', type: 'Redemption', scheme: 'SBI Liquid Fund', maker: 'DEALER01', checker: 'GM-FINANCE', amount: '40,00,000', decision: 'Sent-Back', decided: '16-Apr 14:55' },
];

export default function Mfcheckerqueue({ onNavigate, onOpenModal }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [showApprove, setShowApprove] = useState(null);
  const [showReject, setShowReject] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const pendingList = PENDING.filter(p => !approved.includes(p.ref) && !rejected.includes(p.ref));

  const handleApprove = (ref) => {
    setApproved(prev => [...prev, ref]);
    setShowApprove(null);
    setRemarks('');
  };

  const handleReject = (ref) => {
    setRejected(prev => [...prev, ref]);
    setShowReject(null);
    setRemarks('');
  };

  return (
    <div className="txn-root">
      <style>{TXN_STYLES}</style>

      {/* Approve Modal */}
      {showApprove && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 8, width: 480, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1F3864', marginBottom: 14 }}>✅ Approve Transaction</div>
            <div className="callout" style={{ marginBottom: 12 }}>
              <b>Ref:</b> {showApprove.ref} | <b>Type:</b> {showApprove.type}<br />
              <b>Scheme:</b> {showApprove.scheme} | <b>Amount:</b> ₹ {showApprove.amount}
            </div>
            <div className="field">
              <label>Checker Remarks <span style={{ color: '#C62828' }}>*</span></label>
              <textarea rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} style={{ width: '100%', padding: '7px 9px', border: '1px solid #D8DDE5', borderRadius: 4, fontFamily: 'inherit', fontSize: 12 }}
                placeholder="All parameters verified. Within board-approved limits. Compliance passed." />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="btn btn-ghost" onClick={() => setShowApprove(null)}>Cancel</button>
              <button className="btn btn-primary" style={{ background: '#1B873F' }} onClick={() => handleApprove(showApprove.ref)}>Confirm Approval</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showReject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 8, width: 480, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#C62828', marginBottom: 14 }}>❌ Reject / Send-Back</div>
            <div className="callout danger" style={{ marginBottom: 12 }}>
              <b>Ref:</b> {showReject.ref} | <b>Type:</b> {showReject.type}<br />
              <b>Scheme:</b> {showReject.scheme}
            </div>
            <div className="field">
              <label>Reason for Rejection / Send-Back <span style={{ color: '#C62828' }}>*</span></label>
              <textarea rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} style={{ width: '100%', padding: '7px 9px', border: '1px solid #D8DDE5', borderRadius: 4, fontFamily: 'inherit', fontSize: 12 }}
                placeholder="State the reason clearly for the maker's record…" />
            </div>
            <div className="field">
              <label>Action</label>
              <select style={{ width: '100%', padding: '7px 9px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }}>
                <option>Send-Back to Maker</option>
                <option>Reject (Final)</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="btn btn-ghost" onClick={() => setShowReject(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleReject(showReject.ref)}>Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="txn-header">
        <div>
          <h1 className="txn-title">
            Maker-Checker Approval Queue
            <span className="txn-chip">WORKFLOW</span>
          </h1>
          <div className="txn-breadcrumb">Home › MIS &amp; Governance › Maker-Checker Queue</div>
        </div>
        <div className="txn-header-btns">
          <button className="btn btn-ghost">📤 Export Queue</button>
        </div>
      </div>

      <div className="txn-body">

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
          <div className="kpi"><div className="s-label">Pending My Action</div><div className="s-value">{pendingList.length}</div><div className="s-sub">Awaiting checker decision</div></div>
          <div className="kpi alt"><div className="s-label">Sent for Approval</div><div className="s-value">2</div><div className="s-sub">Submitted by me</div></div>
          <div className="kpi green"><div className="s-label">Approved Today</div><div className="s-value">{approved.length + 8}</div></div>
          <div className="kpi red"><div className="s-label">Sent-Back / Rejected</div><div className="s-value">{rejected.length + 1}</div></div>
        </div>

        {/* RBI Notice */}
        <div className="mc-banner">
          <span>🏛 RBI UCB Master Direction – Dual Control Mandatory for investments ≥ ₹ 25 Lakhs</span>
          <span style={{ fontWeight: 700, color: '#C62828' }}>SLA: Approve within 4 hours of submission</span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['pending', 'history'].map(t => (
            <div key={t} className={`tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'pending' ? `Pending Approvals (${pendingList.length})` : 'Decision History'}
            </div>
          ))}
        </div>

        {/* ── PENDING TAB ── */}
        {activeTab === 'pending' && (
          <>
            {approved.length > 0 && (
              <div className="toast ok" style={{ marginBottom: 12 }}>✅ {approved.length} transaction(s) approved successfully. CBS GL vouchers auto-generated.</div>
            )}
            {rejected.length > 0 && (
              <div className="toast warn" style={{ marginBottom: 12 }}>ℹ️ {rejected.length} transaction(s) sent back to maker for revision.</div>
            )}

            <div className="card">
              <div className="card-title">Pending Checker Approvals</div>
              {pendingList.length === 0 ? (
                <div className="callout ok">✓ All transactions have been actioned. No pending items.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Transaction Type</th>
                      <th>Scheme / AMC</th>
                      <th>Maker</th>
                      <th className="num">Amount (₹)</th>
                      <th>Submitted</th>
                      <th>Pending Age</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingList.map(row => (
                      <tr key={row.ref}>
                        <td style={{ fontWeight: 600, color: '#1F3864' }}>{row.ref}</td>
                        <td>{row.type}</td>
                        <td>{row.scheme}</td>
                        <td>{row.maker}</td>
                        <td className="num">₹ {row.amount}</td>
                        <td>{row.submitted}</td>
                        <td><span className={`badge ${row.ageClass}`}>{row.age}</span></td>
                        <td>
                          <span style={{ color: '#1B873F', cursor: 'pointer', fontWeight: 700, fontSize: 11, marginRight: 8 }}
                            onClick={() => { setShowApprove(row); setRemarks(''); }}>Approve</span>
                          <span style={{ color: '#C62828', cursor: 'pointer', fontWeight: 700, fontSize: 11, marginRight: 8 }}
                            onClick={() => { setShowReject(row); setRemarks(''); }}>Reject</span>
                          <span style={{ color: '#6b7385', cursor: 'pointer', fontSize: 11 }}>View</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Approval Detail Panel */}
            <div className="card">
              <div className="card-title">Transaction Detail – MF-P-2026-0142 (Purchase)</div>
              <div className="callout" style={{ marginBottom: 12 }}>
                <b>Pre-Approval Checklist</b> — Checker must verify all items before approving.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {[
                  ['Scheme', 'SBI Liquid Fund – Direct Growth (AMFI: 119551)'],
                  ['Folio No.', '12345678'],
                  ['Purchase Amount', '₹ 50,00,000'],
                  ['Payment Mode', 'RTGS – A/c 00112233445566'],
                  ['Category', 'Liquid'],
                  ['Investment Policy', 'Non-SLR | Within Board Cap'],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: '#F5F6FA', padding: '8px 10px', borderRadius: 4 }}>
                    <div style={{ fontSize: 10, color: '#6b7385', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1F3864' }}>{v}</div>
                  </div>
                ))}
              </div>
              <table style={{ marginBottom: 12 }}>
                <thead>
                  <tr><th>Compliance Check</th><th>Result</th><th>Detail</th></tr>
                </thead>
                <tbody>
                  <tr><td>Single AMC Limit (30% cap)</td><td><span className="badge b-approved">✓ Pass</span></td><td>SBI MF at 29.0% after this txn</td></tr>
                  <tr><td>Single Scheme Limit (15% cap)</td><td><span className="badge b-approved">✓ Pass</span></td><td>SBI Liquid at 11.7% after this txn</td></tr>
                  <tr><td>Category Limit (Liquid ≤ 60%)</td><td><span className="badge b-approved">✓ Pass</span></td><td>Liquid at 44.3% after this txn</td></tr>
                  <tr><td>Credit Rating Check</td><td><span className="badge b-approved">✓ Pass</span></td><td>CRISIL AAA rated portfolio</td></tr>
                  <tr><td>Equity / Hybrid Exclusion</td><td><span className="badge b-approved">✓ Pass</span></td><td>Debt-only scheme</td></tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === 'history' && (
          <div className="card">
            <div className="card-title">Decision History</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <input style={{ flex: 1, padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }} placeholder="Search by Ref ID / Scheme…" />
              <select style={{ padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }}><option>All Decisions</option><option>Approved</option><option>Sent-Back</option><option>Rejected</option></select>
              <input type="date" defaultValue="2026-04-01" style={{ padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }} />
              <input type="date" defaultValue="2026-04-19" style={{ padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }} />
            </div>
            <table>
              <thead>
                <tr><th>Ref ID</th><th>Type</th><th>Scheme</th><th>Maker</th><th>Checker</th><th className="num">Amount (₹)</th><th>Decision</th><th>Decided On</th></tr>
              </thead>
              <tbody>
                {[...HISTORY, ...approved.map(ref => {
                  const p = PENDING.find(x => x.ref === ref);
                  return { ref: p.ref, type: p.type, scheme: p.scheme, maker: p.maker, checker: 'TREAS-HEAD', amount: p.amount, decision: 'Approved', decided: '19-Apr (Today)' };
                })].map(row => (
                  <tr key={row.ref}>
                    <td style={{ fontWeight: 600 }}>{row.ref}</td>
                    <td>{row.type}</td>
                    <td>{row.scheme}</td>
                    <td>{row.maker}</td>
                    <td>{row.checker}</td>
                    <td className="num">₹ {row.amount}</td>
                    <td>
                      <span className={`badge ${row.decision === 'Approved' ? 'b-approved' : row.decision === 'Sent-Back' ? 'b-pending' : 'b-rejected'}`}>{row.decision}</span>
                    </td>
                    <td>{row.decided}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <div className="txn-footer">
        AVS InSoTech | Maker-Checker Queue | All approvals are logged immutably in the Audit Trail
      </div>
    </div>
  );
}