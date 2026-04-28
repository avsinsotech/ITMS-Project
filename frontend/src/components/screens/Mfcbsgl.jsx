import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const GL_MAPPING = [
  { event: 'Purchase (Lumpsum / SIP)', debit: 'Investment – MF (1220)', credit: 'Bank / Suspense (1010)', category: 'Transaction' },
  { event: 'Redemption – at Cost', debit: 'Bank (1010)', credit: 'Investment – MF (1220)', category: 'Transaction' },
  { event: 'Profit on Redemption', debit: 'Bank (1010)', credit: 'Profit on Sale of MF (4920)', category: 'P&L' },
  { event: 'Loss on Redemption', debit: 'Loss on Sale of MF (5130)', credit: 'Investment – MF (1220)', category: 'P&L' },
  { event: 'IDCW Receipt (Payout)', debit: 'Bank (1010)', credit: 'IDCW Income (4120)', category: 'Income' },
  { event: 'IDCW Reinvestment', debit: 'Investment – MF (1220)', credit: 'IDCW Income (4120)', category: 'Income' },
  { event: 'TDS on IDCW', debit: 'TDS Receivable (1410)', credit: 'IDCW Income – Gross-up (4120)', category: 'Tax' },
  { event: 'MTM Depreciation (AFS)', debit: 'IDR Provision (5220)', credit: 'IDR Reserve (3310)', category: 'Valuation' },
  { event: 'MTM Appreciation (AFS)', debit: 'IDR Reserve (3310)', credit: 'IDR Provision Written Back (5220)', category: 'Valuation' },
  { event: 'Switch-Out', debit: 'Suspense – Switch-In Scheme', credit: 'Investment – MF Source (1220)', category: 'Transaction' },
  { event: 'Switch-In (Settlement)', debit: 'Investment – MF Target (1220)', credit: 'Suspense – Switch-In Scheme', category: 'Transaction' },
  { event: 'Exit Load Paid', debit: 'Exit Load Expense (5145)', credit: 'Bank (1010)', category: 'Transaction' },
];

const VOUCHERS = [
  { voucher: 'MF/2026/0412', date: '19-Apr', event: 'IDCW Credit – HDFC Liquid Fund', debitGL: '1010 – Bank', creditGL: '4120 – IDCW Income', amount: '24,183', status: 'Posted', statusClass: 'b-approved' },
  { voucher: 'MF/2026/0413', date: '19-Apr', event: 'SIP Debit – SBI Liquid Fund', debitGL: '1220 – Investment MF', creditGL: '1010 – Bank', amount: '2,00,000', status: 'Posted', statusClass: 'b-approved' },
  { voucher: 'MF/2026/0414', date: '19-Apr', event: 'Purchase Lumpsum – SBI Liquid (Pending Checker)', debitGL: '1220 – Investment MF', creditGL: '1010 – Bank', amount: '50,00,000', status: 'Awaiting Approval', statusClass: 'b-pending' },
  { voucher: 'MF/2026/0415', date: '19-Apr', event: 'MTM IDR Provision – HDFC Short Term Debt', debitGL: '5220 – IDR Provision', creditGL: '3310 – IDR Reserve', amount: '18,450', status: 'Posted', statusClass: 'b-approved' },
  { voucher: 'MF/2026/0416', date: '19-Apr', event: 'Redemption – Kotak Savings Fund (at cost)', debitGL: '1010 – Bank', creditGL: '1220 – Investment MF', amount: '75,00,000', status: 'Posted', statusClass: 'b-approved' },
  { voucher: 'MF/2026/0417', date: '19-Apr', event: 'Profit on Redemption – Kotak Savings Fund', debitGL: '1010 – Bank', creditGL: '4920 – Profit on MF', amount: '1,32,000', status: 'Posted', statusClass: 'b-approved' },
];

const CATEGORY_FILTER = ['All', 'Transaction', 'P&L', 'Income', 'Tax', 'Valuation'];

export default function Mfcbsgl({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('mapping');
  const [catFilter, setCatFilter] = useState('All');
  const [postMsg, setPostMsg] = useState('');
  const [manualVoucher, setManualVoucher] = useState({ event: '', debit: '', credit: '', amount: '', narration: '' });

  const filteredGL = catFilter === 'All' ? GL_MAPPING : GL_MAPPING.filter(r => r.category === catFilter);

  const handleManualPost = () => {
    setPostMsg('✅ Manual GL voucher MF/2026/0418 created and pushed to CBS. Pending checker approval.');
    setTimeout(() => setPostMsg(''), 4000);
  };

  return (
    <div className="txn-root">
      <style>{TXN_STYLES}</style>

      {/* Header */}
      <div className="txn-header">
        <div>
          <h1 className="txn-title">
            CBS GL Integration
            <span className="txn-chip">ACCOUNTING</span>
          </h1>
          <div className="txn-breadcrumb">Home › MIS &amp; Governance › CBS GL Integration</div>
        </div>
        <div className="txn-header-btns">
          <button className="btn btn-ghost">🔄 Sync with CBS</button>
          <button className="btn btn-primary">📤 Push Pending Vouchers</button>
        </div>
      </div>

      <div className="txn-body">

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
          <div className="kpi green"><div className="s-label">Posted Today</div><div className="s-value">5</div><div className="s-sub">Auto-vouchers to CBS</div></div>
          <div className="kpi"><div className="s-label">Awaiting Approval</div><div className="s-value">1</div></div>
          <div className="kpi alt"><div className="s-label">Total GL Entries (Apr)</div><div className="s-value">42</div></div>
          <div className="kpi" style={{ borderLeftColor: '#6A1B9A' }}><div className="s-label">Last Sync with CBS</div><div className="s-value" style={{ fontSize: 13 }}>19-Apr 10:55 AM</div></div>
        </div>

        <div className="callout" style={{ marginBottom: 14 }}>
          <b>⚙ Auto-Posting:</b> All approved MF transactions trigger GL vouchers automatically. Vouchers pending checker approval are held in draft and pushed only upon approval.
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['mapping', 'vouchers', 'manual'].map(t => (
            <div key={t} className={`tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'mapping' ? 'GL Mapping Table' : t === 'vouchers' ? "Today's Vouchers" : 'Manual Posting'}
            </div>
          ))}
        </div>

        {/* ── GL MAPPING TAB ── */}
        {activeTab === 'mapping' && (
          <div className="card">
            <div className="card-title">GL Account Mapping – Mutual Fund Events</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {CATEGORY_FILTER.map(c => (
                <button key={c}
                  onClick={() => setCatFilter(c)}
                  style={{
                    padding: '5px 12px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: catFilter === c ? '#1F3864' : '#EAF0F9', color: catFilter === c ? '#fff' : '#1F3864'
                  }}>{c}</button>
              ))}
            </div>
            <table>
              <thead>
                <tr><th>Event</th><th>Debit GL Account</th><th>Credit GL Account</th><th>Category</th></tr>
              </thead>
              <tbody>
                {filteredGL.map(r => (
                  <tr key={r.event}>
                    <td style={{ fontWeight: 600 }}>{r.event}</td>
                    <td style={{ color: '#C62828', fontFamily: 'monospace', fontSize: 11 }}>{r.debit}</td>
                    <td style={{ color: '#1B873F', fontFamily: 'monospace', fontSize: 11 }}>{r.credit}</td>
                    <td><span className="badge b-info">{r.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="callout warn" style={{ marginTop: 12 }}>
              ⚠ GL codes are configured per CBS chart of accounts. Modify only with Finance Head approval. Changes logged in Audit Trail.
            </div>
          </div>
        )}

        {/* ── VOUCHERS TAB ── */}
        {activeTab === 'vouchers' && (
          <>
            <div className="card">
              <div className="card-title">Today's Auto-Vouchers Pushed to CBS</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <input type="date" defaultValue="2026-04-19" style={{ padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }} />
                <select style={{ padding: '7px 10px', border: '1px solid #D8DDE5', borderRadius: 4, fontSize: 12 }}>
                  <option>All Statuses</option><option>Posted</option><option>Awaiting Approval</option><option>Failed</option>
                </select>
                <button className="btn btn-ghost" style={{ fontSize: 11 }}>🔍 Search</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Voucher No.</th>
                    <th>Date</th>
                    <th>Event / Narration</th>
                    <th>Debit GL</th>
                    <th>Credit GL</th>
                    <th className="num">Amount (₹)</th>
                    <th>CBS Status</th>
                  </tr>
                </thead>
                <tbody>
                  {VOUCHERS.map(v => (
                    <tr key={v.voucher}>
                      <td style={{ fontWeight: 600, color: '#1F3864' }}>{v.voucher}</td>
                      <td>{v.date}</td>
                      <td style={{ fontSize: 11 }}>{v.event}</td>
                      <td style={{ color: '#C62828', fontSize: 11, fontFamily: 'monospace' }}>{v.debitGL}</td>
                      <td style={{ color: '#1B873F', fontSize: 11, fontFamily: 'monospace' }}>{v.creditGL}</td>
                      <td className="num">₹ {v.amount}</td>
                      <td><span className={`badge ${v.statusClass}`}>{v.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button className="btn btn-ghost">📥 Download Voucher Log</button>
                <button className="btn btn-primary">📤 Push All Pending</button>
              </div>
            </div>

            {/* Reconciliation Status */}
            <div className="card">
              <div className="card-title">CBS Reconciliation Status – April 2026</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {[
                  { label: 'Investment Book (GL 1220)', val: '₹ 42,80,00,000', sub: 'Matches MF module AUM', ok: true },
                  { label: 'IDCW Income (GL 4120)', val: '₹ 22,40,000', sub: 'Matches IDCW register', ok: true },
                  { label: 'IDR Reserve (GL 3310)', val: '₹ 3,42,000', sub: '⚠ Pending MTM recon', ok: false },
                ].map(item => (
                  <div key={item.label} style={{ background: item.ok ? '#E7F5EC' : '#FFF8E7', border: `1px solid ${item.ok ? '#1B873F' : '#E08E0B'}`, borderRadius: 5, padding: '12px 14px' }}>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: '#6b7385', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1F3864' }}>{item.val}</div>
                    <div style={{ fontSize: 11, color: item.ok ? '#1B873F' : '#E08E0B', marginTop: 4 }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── MANUAL POSTING TAB ── */}
        {activeTab === 'manual' && (
          <div className="card">
            <div className="card-title">Manual GL Voucher Entry</div>
            <div className="callout warn" style={{ marginBottom: 12 }}>
              ⚠ Manual postings are subject to Maker-Checker approval. Use only for correction / adjustment entries.
            </div>
            {postMsg && <div className="toast ok" style={{ marginBottom: 12 }}>{postMsg}</div>}
            <div className="g3">
              <div className="field">
                <label>Event / Narration <span style={{ color: '#C62828' }}>*</span></label>
                <input value={manualVoucher.event} onChange={e => setManualVoucher(p => ({ ...p, event: e.target.value }))} placeholder="e.g. Exit Load Adjustment" />
              </div>
              <div className="field">
                <label>Debit GL Account <span style={{ color: '#C62828' }}>*</span></label>
                <select onChange={e => setManualVoucher(p => ({ ...p, debit: e.target.value }))}>
                  <option value="">– Select GL –</option>
                  <option>1010 – Bank / Current Account</option>
                  <option>1220 – Investment – Mutual Funds</option>
                  <option>1410 – TDS Receivable</option>
                  <option>5130 – Loss on Sale of MF</option>
                  <option>5145 – Exit Load Expense</option>
                  <option>5220 – IDR Provision</option>
                </select>
              </div>
              <div className="field">
                <label>Credit GL Account <span style={{ color: '#C62828' }}>*</span></label>
                <select onChange={e => setManualVoucher(p => ({ ...p, credit: e.target.value }))}>
                  <option value="">– Select GL –</option>
                  <option>1010 – Bank / Current Account</option>
                  <option>1220 – Investment – Mutual Funds</option>
                  <option>3310 – IDR Reserve</option>
                  <option>4120 – IDCW Income</option>
                  <option>4920 – Profit on Sale of MF</option>
                </select>
              </div>
              <div className="field">
                <label>Amount (₹) <span style={{ color: '#C62828' }}>*</span></label>
                <input type="number" placeholder="0.00" value={manualVoucher.amount} onChange={e => setManualVoucher(p => ({ ...p, amount: e.target.value }))} />
              </div>
              <div className="field">
                <label>Voucher Date <span style={{ color: '#C62828' }}>*</span></label>
                <input type="date" defaultValue="2026-04-19" />
              </div>
              <div className="field">
                <label>Folio / Ref No.</label>
                <input placeholder="Optional – link to MF transaction" />
              </div>
            </div>
            <div className="field">
              <label>Supporting Remarks</label>
              <textarea rows={2} placeholder="Reason for manual adjustment…" style={{ width: '100%', padding: '7px 9px', border: '1px solid #D8DDE5', borderRadius: 4, fontFamily: 'inherit', fontSize: 12 }} />
            </div>
            <div className="actions">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary" onClick={handleManualPost}>Submit for Checker Approval</button>
            </div>
          </div>
        )}

      </div>

      <div className="txn-footer">
        AVS InSoTech | CBS GL Integration | Auto-vouchers generated on transaction approval
      </div>
    </div>
  );
}