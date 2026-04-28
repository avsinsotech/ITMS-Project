import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const AUDIT_DATA = [
  { ts: '19-Apr 10:47:08', user: 'DEALER01', ip: '10.0.1.42', module: 'MF Purchase', action: 'SUBMIT', ref: 'MF-P-2026-0142', before: 'Draft', after: 'Pending Approval', hash: 'a3f8c12d' },
  { ts: '19-Apr 10:45:12', user: 'DEALER01', ip: '10.0.1.42', module: 'MF Purchase', action: 'CREATE', ref: 'MF-P-2026-0142', before: '—', after: 'Draft', hash: '9b4e2a7f' },
  { ts: '19-Apr 09:20:33', user: 'SYSTEM', ip: 'BATCH', module: 'NAV Upload', action: 'FETCH', ref: 'AMFI-20260419', before: 'Prev NAV', after: '48 NAVs updated', hash: 'f1c3d5e8' },
  { ts: '19-Apr 09:15:47', user: 'DEALER02', ip: '10.0.1.43', module: 'Redemption', action: 'CREATE', ref: 'MF-R-2026-0056', before: '—', after: 'Pending Approval', hash: 'b7a0e91c' },
  { ts: '18-Apr 16:30:22', user: 'TREAS-HEAD', ip: '10.0.1.10', module: 'MF Purchase', action: 'APPROVE', ref: 'MF-P-2026-0141', before: 'Pending', after: 'Approved', hash: '3d8f1a22' },
  { ts: '18-Apr 15:55:10', user: 'DEALER01', ip: '10.0.1.42', module: 'SIP Setup', action: 'CREATE', ref: 'SIP-2026-008', before: '—', after: 'Active', hash: 'c5b2f09e' },
  { ts: '18-Apr 14:30:00', user: 'OPS-MGR', ip: '10.0.1.20', module: 'AMC Master', action: 'MODIFY', ref: 'AMC-006', before: 'Inactive', after: 'Active', hash: '7e4d3c81' },
  { ts: '18-Apr 11:20:45', user: 'TREAS-HEAD', ip: '10.0.1.10', module: 'MF Purchase', action: 'APPROVE', ref: 'MF-P-2026-0138', before: 'Pending', after: 'Approved', hash: '2a9b5c3f' },
  { ts: '17-Apr 17:05:12', user: 'DEALER02', ip: '10.0.1.43', module: 'Switch', action: 'CREATE', ref: 'MF-SW-2026-0017', before: '—', after: 'Draft', hash: 'e8d1f47b' },
  { ts: '17-Apr 16:00:00', user: 'SYSTEM', ip: 'BATCH', module: 'MTM Provision', action: 'COMPUTE', ref: 'MTM-20260417', before: '₹3,12,000', after: '₹3,42,000', hash: '5f2c8b1a' },
];

const ACTION_COLORS = {
  CREATE: { bg: '#E7F5EC', color: '#1B873F' },
  SUBMIT: { bg: '#EAF0F9', color: '#1F3864' },
  APPROVE: { bg: '#E0F7FA', color: '#00695C' },
  MODIFY: { bg: '#FFF3D6', color: '#E08E0B' },
  FETCH: { bg: '#F3E5F5', color: '#6A1B9A' },
  COMPUTE: { bg: '#F3E5F5', color: '#6A1B9A' },
  REJECT: { bg: '#FDECEC', color: '#C62828' },
  DELETE: { bg: '#FDECEC', color: '#C62828' },
};

export default function MfauditLog({ onNavigate }) {
  const [fromDate, setFromDate] = useState('2026-04-01');
  const [toDate, setToDate] = useState('2026-04-19');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [searchRef, setSearchRef] = useState('');
  const [activeTab, setActiveTab] = useState('trail');

  const filtered = AUDIT_DATA.filter(r => {
    const modOk = moduleFilter === 'All' || r.module.includes(moduleFilter.replace('MF ', ''));
    const userOk = userFilter === 'All' || r.user === userFilter;
    const actOk = actionFilter === 'All' || r.action === actionFilter;
    const refOk = !searchRef || r.ref.toLowerCase().includes(searchRef.toLowerCase()) || r.user.toLowerCase().includes(searchRef.toLowerCase());
    return modOk && userOk && actOk && refOk;
  });

  return (
    <div className="txn-root">
      <style>{TXN_STYLES}</style>

      {/* Header */}
      <div className="txn-header">
        <div>
          <h1 className="txn-title">
            Audit Log &amp; Data Retention
            <span className="txn-chip">10-YR RETENTION</span>
          </h1>
          <div className="txn-breadcrumb">Home › MIS &amp; Governance › Audit Log</div>
        </div>
        <div className="txn-header-btns">
          <button className="btn btn-ghost">📥 Export Audit Log</button>
          <button className="btn btn-primary">🔍 Hash Verify</button>
        </div>
      </div>

      <div className="txn-body">

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
          <div className="kpi"><div className="s-label">Log Entries Today</div><div className="s-value">24</div><div className="s-sub">Across all MF modules</div></div>
          <div className="kpi green"><div className="s-label">Approvals Logged</div><div className="s-value">8</div></div>
          <div className="kpi alt"><div className="s-label">System Events (BATCH)</div><div className="s-value">6</div></div>
          <div className="kpi" style={{ borderLeftColor: '#1B873F' }}>
            <div className="s-label">Hash Chain Status</div>
            <div className="s-value" style={{ fontSize: 13, color: '#1B873F' }}>✓ Intact</div>
            <div className="s-sub">Last verified 05:00 AM</div>
          </div>
        </div>

        {/* Integrity banner */}
        <div className="callout ok" style={{ marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>✓ <b>Append-only log.</b> SHA-256 hash chain verified. Data retained 10 years per RBI Circular &amp; DPDP Act 2023. No record can be modified or deleted.</span>
          <span style={{ fontWeight: 700, color: '#1B873F', fontSize: 11 }}>COMPLIANT</span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['trail', 'retention', 'integrity'].map(t => (
            <div key={t} className={`tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'trail' ? 'Audit Trail' : t === 'retention' ? 'Retention Policy' : 'Integrity Checks'}
            </div>
          ))}
        </div>

        {/* ── AUDIT TRAIL TAB ── */}
        {activeTab === 'trail' && (
          <>
            {/* Filters */}
            <div className="card">
              <div className="card-title">Filter Audit Trail</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: 10 }}>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>From Date</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>To Date</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Module</label>
                  <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}>
                    <option>All</option><option>MF Purchase</option><option>Redemption</option><option>Switch</option><option>SIP Setup</option><option>NAV Upload</option><option>AMC Master</option><option>MTM Provision</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>User</label>
                  <select value={userFilter} onChange={e => setUserFilter(e.target.value)}>
                    <option>All</option><option>DEALER01</option><option>DEALER02</option><option>TREAS-HEAD</option><option>OPS-MGR</option><option>SYSTEM</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Action</label>
                  <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
                    <option>All</option><option>CREATE</option><option>SUBMIT</option><option>APPROVE</option><option>MODIFY</option><option>REJECT</option><option>FETCH</option><option>COMPUTE</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Search Ref / User</label>
                  <input placeholder="MF-P-2026-…" value={searchRef} onChange={e => setSearchRef(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Audit Trail (Immutable) — {filtered.length} records</div>
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User ID</th>
                    <th>IP Address</th>
                    <th>Module</th>
                    <th>Action</th>
                    <th>Ref ID</th>
                    <th>Before</th>
                    <th>After</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => {
                    const actionStyle = ACTION_COLORS[r.action] || { bg: '#EAF0F9', color: '#1F3864' };
                    return (
                      <tr key={i}>
                        <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{r.ts}</td>
                        <td style={{ fontWeight: 600 }}>{r.user}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7385' }}>{r.ip}</td>
                        <td>{r.module}</td>
                        <td>
                          <span className="badge" style={{ background: actionStyle.bg, color: actionStyle.color }}>{r.action}</span>
                        </td>
                        <td style={{ fontWeight: 600, color: '#1F3864', fontSize: 11 }}>{r.ref}</td>
                        <td style={{ fontSize: 11, color: '#6b7385' }}>{r.before}</td>
                        <td style={{ fontSize: 11, color: '#1F3864' }}>{r.after}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 10, color: '#6b7385' }}>{r.hash}…</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="callout" style={{ marginTop: 12 }}>No records match the selected filters.</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px dashed #D8DDE5' }}>
                <span style={{ fontSize: 11, color: '#6b7385' }}>Showing {filtered.length} of {AUDIT_DATA.length} total records</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}>◀ Prev</button>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}>Next ▶</button>
                  <button className="btn btn-primary" style={{ fontSize: 11 }}>📥 Export to Excel</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── RETENTION POLICY TAB ── */}
        {activeTab === 'retention' && (
          <>
            <div className="card">
              <div className="card-title">Data Retention Policy – Mutual Funds Module</div>
              <table>
                <thead>
                  <tr><th>Data Category</th><th>Retention Period</th><th>Regulatory Basis</th><th>Storage Tier</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {[
                    ['Transaction Records (Purchase / Redemption)', '10 Years', 'RBI Master Direction 2021', 'Hot + Cold Archive', 'b-approved'],
                    ['Audit Trail (All user actions)', '10 Years', 'RBI UCB / DPDP Act 2023', 'Immutable Append-Only', 'b-approved'],
                    ['NAV History (AMFI)', '10 Years', 'SEBI Circular', 'Hot Storage', 'b-approved'],
                    ['Capital Gains / Tax Records', '8 Years', 'Income Tax Act Section 44AA', 'Hot + Archive', 'b-approved'],
                    ['SIP Mandates', '7 Years from last SIP', 'NPCI / NACH Guidelines', 'Hot Storage', 'b-approved'],
                    ['Maker-Checker Decisions', '10 Years', 'RBI Dual Control Policy', 'Immutable Append-Only', 'b-approved'],
                    ['GL Vouchers (CBS)', '10 Years', 'Banking Regulation Act 1949', 'CBS + Archive', 'b-approved'],
                    ['Compliance Breach Reports', '10 Years', 'RBI Inspection Guidelines', 'Hot + Archive', 'b-approved'],
                  ].map(([cat, period, basis, tier, sc]) => (
                    <tr key={cat}>
                      <td style={{ fontWeight: 600, fontSize: 12 }}>{cat}</td>
                      <td style={{ fontWeight: 700, color: '#1F3864' }}>{period}</td>
                      <td style={{ fontSize: 11, color: '#6b7385' }}>{basis}</td>
                      <td><span className="badge b-info">{tier}</span></td>
                      <td><span className={`badge ${sc}`}>Compliant</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout ok" style={{ marginTop: 12 }}>
                ✓ All data categories are within policy retention windows. Next annual review: <b>31-Mar-2027</b>.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Archive & Purge Schedule</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1F3864', marginBottom: 8 }}>Upcoming Archival Jobs</div>
                  {[
                    { label: 'FY 2015-16 Transaction Records', due: '30-Apr-2026', type: 'Cold Archive' },
                    { label: 'NAV History – Pre-2016', due: '30-Apr-2026', type: 'Cold Archive' },
                  ].map(j => (
                    <div key={j.label} style={{ background: '#F5F6FA', padding: '8px 10px', borderRadius: 4, marginBottom: 6, fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{j.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7385', marginTop: 2 }}>Due: {j.due} | Type: <b>{j.type}</b></div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1F3864', marginBottom: 8 }}>Storage Usage</div>
                  {[
                    { label: 'Hot Storage (Active DB)', used: '2.4 GB', pct: 24 },
                    { label: 'Cold Archive (AWS S3)', used: '18.7 GB', pct: 62 },
                    { label: 'Audit Blockchain Ledger', used: '450 MB', pct: 9 },
                  ].map(s => (
                    <div key={s.label} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span>{s.label}</span>
                        <span style={{ fontWeight: 700 }}>{s.used}</span>
                      </div>
                      <div style={{ height: 8, background: '#EAF0F9', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.pct}%`, background: '#1F3864', borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── INTEGRITY CHECKS TAB ── */}
        {activeTab === 'integrity' && (
          <>
            <div className="card">
              <div className="card-title">Hash Chain Integrity Verification</div>
              <div className="callout" style={{ marginBottom: 12 }}>
                <b>🔒 How it works:</b> Every audit log entry is SHA-256 hashed with the previous entry's hash, forming a tamper-evident blockchain-style chain. Any modification breaks the chain and triggers an alert.
              </div>
              <table>
                <thead>
                  <tr><th>Verification Run</th><th>Entries Checked</th><th>Chain Status</th><th>Broken Links</th><th>Run By</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  {[
                    { run: '19-Apr-2026 05:00', entries: '24,182', status: '✓ Intact', broken: '0', by: 'SYSTEM', dur: '1.2s' },
                    { run: '18-Apr-2026 05:00', entries: '24,158', status: '✓ Intact', broken: '0', by: 'SYSTEM', dur: '1.1s' },
                    { run: '17-Apr-2026 05:00', entries: '24,130', status: '✓ Intact', broken: '0', by: 'SYSTEM', dur: '1.3s' },
                    { run: '16-Apr-2026 05:00', entries: '24,098', status: '✓ Intact', broken: '0', by: 'SYSTEM', dur: '1.0s' },
                  ].map(r => (
                    <tr key={r.run}>
                      <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{r.run}</td>
                      <td className="num">{r.entries}</td>
                      <td><span className="badge b-approved">{r.status}</span></td>
                      <td className="num" style={{ color: '#1B873F', fontWeight: 700 }}>{r.broken}</td>
                      <td>{r.by}</td>
                      <td>{r.dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                <button className="btn btn-ghost">📋 Download Verification Report</button>
                <button className="btn btn-primary">▶ Run Manual Verify Now</button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Access & Security Controls</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Audit Log Access', value: 'Read-Only for all users. No edit/delete permitted.', ok: true },
                  { label: 'Export Permission', value: 'Treasury Head, Internal Auditor, Compliance Officer only.', ok: true },
                  { label: 'Backup Frequency', value: 'Real-time replication + Daily snapshot to offsite archive.', ok: true },
                  { label: 'DPDP Act Compliance', value: 'PII masked in logs. Full data accessible only to DPO.', ok: true },
                  { label: 'RBI Inspection Ready', value: 'Log export in XBRL / Excel format available on demand.', ok: true },
                  { label: 'Session Timeout Logging', value: 'All idle sessions > 15 min auto-logged as LOGOUT.', ok: true },
                ].map(item => (
                  <div key={item.label} style={{ background: '#F5F6FA', padding: '10px 12px', borderRadius: 4, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{item.ok ? '✅' : '⚠️'}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#1F3864', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7385' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      <div className="txn-footer">
        AVS InSoTech | Audit Log – Append-Only, SHA-256 Hash Chain | 10-Year Retention | RBI &amp; DPDP Act 2023 Compliant
      </div>
    </div>
  );
}