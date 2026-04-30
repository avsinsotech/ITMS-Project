import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const REPORTS = [
  {
    group: 'Portfolio',
    icon: '📊',
    color: '#1F3864',
    items: [
      'Folio-wise Holding Register',
      'Scheme-wise Valuation',
      'AMC Concentration Report',
      'Category Allocation Report',
      'XIRR / Absolute Return Report',
    ],
  },
  {
    group: 'Transactions',
    icon: '📈',
    color: '#1B873F',
    items: [
      'Purchase Register',
      'Redemption Register',
      'Switch Register',
      'SIP Execution Log',
      'Transaction Statement (per Folio)',
    ],
  },
  {
    group: 'Tax & Income',
    icon: '💰',
    color: '#C8A000',
    items: [
      'Capital Gains (STCG / LTCG)',
      'IDCW Income Statement',
      'TDS Summary Report',
      'Form 26AS Reconciliation',
    ],
  },
  {
    group: 'Compliance',
    icon: '🏛',
    color: '#6A1B9A',
    items: [
      'Policy Limit Breach Report',
      'Board / ALCO Pack',
      'Concurrent Audit Pack',
      'RBI UCB Investment Return',
      'Non-SLR Exposure Statement',
    ],
  },
  {
    group: 'Valuation',
    icon: '📉',
    color: '#C62828',
    items: [
      'MTM Depreciation Report',
      'IDR Movement Statement',
      'Unrealised P&L Summary',
      'NAV History (Scheme-wise)',
    ],
  },
  {
    group: 'Export / Delivery',
    icon: '📥',
    color: '#0B5B98',
    items: [
      'Excel (Detailed)',
      'PDF (Print-ready)',
      'CAMS / KFin Reco File',
      'Scheduled Email Dispatch',
    ],
  },
];

const SCHEDULED = [
  { name: 'Daily Portfolio Valuation', freq: 'Daily 07:00', recipient: 'treasury-hod@bank.in', format: 'PDF + Excel', status: 'Active' },
  { name: 'Weekly MIS Pack', freq: 'Monday 08:00', recipient: 'alco@bank.in', format: 'PDF', status: 'Active' },
  { name: 'IDCW Monthly Summary', freq: '1st of Month', recipient: 'accounts@bank.in', format: 'Excel', status: 'Active' },
  { name: 'Capital Gains – Quarterly', freq: 'Apr/Jul/Oct/Jan', recipient: 'audit@bank.in', format: 'Excel', status: 'Active' },
];

export default function Mfreportsmis({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [fromDate, setFromDate] = useState('2026-04-01');
  const [toDate, setToDate] = useState('2026-04-19');
  const [reportType, setReportType] = useState('Folio-wise Holding Register');
  const [formatType, setFormatType] = useState('Excel');
  const [generatedMsg, setGeneratedMsg] = useState('');

  const handleGenerate = () => {
    setGeneratedMsg(`✅ "${reportType}" generated for ${fromDate} → ${toDate}. Downloading as ${formatType}…`);
    setTimeout(() => setGeneratedMsg(''), 4000);
  };

  return (
    <div className="txn-root">
      <style>{TXN_STYLES}</style>

      {/* Header */}
      <div className="txn-header">
        <div>
          <h1 className="txn-title">
            Reports &amp; MIS
            <span className="txn-chip">MIS</span>
          </h1>
          <div className="txn-breadcrumb">Home › MIS &amp; Governance › Reports &amp; MIS</div>
        </div>
        <div className="txn-header-btns">
          <button className="btn btn-ghost">⏰ Schedule Report</button>
          <button className="btn btn-primary">📥 Quick Download</button>
        </div>
      </div>

      <div className="txn-body">

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
          <div className="kpi"><div className="s-label">Reports Generated Today</div><div className="s-value">12</div></div>
          <div className="kpi alt"><div className="s-label">Scheduled Reports</div><div className="s-value">4</div></div>
          <div className="kpi green"><div className="s-label">Last Valuation Report</div><div className="s-value" style={{ fontSize: 14 }}>19-Apr 07:05</div></div>
          <div className="kpi" style={{ borderLeftColor: '#6A1B9A' }}><div className="s-label">Board Pack – Next Due</div><div className="s-value" style={{ fontSize: 14 }}>30-Apr-2026</div></div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['catalog', 'generate', 'scheduled'].map(t => (
            <div key={t} className={`tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'catalog' ? 'Report Catalog' : t === 'generate' ? 'Generate Report' : 'Scheduled Delivery'}
            </div>
          ))}
        </div>

        {/* ── CATALOG TAB ── */}
        {activeTab === 'catalog' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {REPORTS.map(r => (
              <div className="card" key={r.group} style={{ marginBottom: 0 }}>
                <div className="card-title">{r.icon} {r.group}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, padding: '6px 8px', borderRadius: 4, background: '#F5F6FA', cursor: 'pointer' }}
                      onClick={() => { setReportType(item); setActiveTab('generate'); }}>
                      <span>{item}</span>
                      <span style={{ color: r.color, fontWeight: 700, fontSize: 11 }}>▶</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── GENERATE TAB ── */}
        {activeTab === 'generate' && (
          <>
            {generatedMsg && (
              <div className="toast ok" style={{ marginBottom: 12 }}>{generatedMsg}</div>
            )}
            <div className="card">
              <div className="card-title">Report Parameters</div>
              <div className="g3">
                <div className="field">
                  <label>Report Type <span style={{ color: '#C62828' }}>*</span></label>
                  <select value={reportType} onChange={e => setReportType(e.target.value)}>
                    {REPORTS.flatMap(r => r.items).map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>From Date <span style={{ color: '#C62828' }}>*</span></label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </div>
                <div className="field">
                  <label>To Date <span style={{ color: '#C62828' }}>*</span></label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                </div>
                <div className="field">
                  <label>AMC Filter</label>
                  <select><option>All AMCs</option><option>SBI Mutual Fund</option><option>HDFC Mutual Fund</option><option>ICICI Pru MF</option><option>Kotak MF</option></select>
                </div>
                <div className="field">
                  <label>Category Filter</label>
                  <select><option>All Categories</option><option>Liquid</option><option>Overnight</option><option>Ultra Short Debt</option><option>Short Term Debt</option></select>
                </div>
                <div className="field">
                  <label>Output Format <span style={{ color: '#C62828' }}>*</span></label>
                  <select value={formatType} onChange={e => setFormatType(e.target.value)}>
                    <option>Excel</option>
                    <option>PDF</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-ghost" onClick={() => setActiveTab('catalog')}>← Back to Catalog</button>
                <button className="btn btn-primary" onClick={handleGenerate}>Generate &amp; Download</button>
              </div>
            </div>

            {/* Preview stub */}
            <div className="card">
              <div className="card-title">Preview – {reportType}</div>
              <div className="callout">📋 Report preview will appear here after generation. Showing last generated snapshot.</div>
              <table>
                <thead>
                  <tr><th>Folio No.</th><th>Scheme</th><th>Category</th><th className="num">Units</th><th className="num">Latest NAV (₹)</th><th className="num">Current Value (₹)</th><th className="num">Cost (₹)</th><th className="num">Gain / (Loss)</th></tr>
                </thead>
                <tbody>
                  <tr><td>12345678</td><td>SBI Liquid Fund – Direct Growth</td><td><span className="badge b-liquid">Liquid</span></td><td className="num">24,820.45</td><td className="num">4,012.45</td><td className="num">99,69,126</td><td className="num">97,50,000</td><td className="num" style={{ color: '#1B873F' }}>+2,19,126</td></tr>
                  <tr><td>99887766</td><td>HDFC Overnight Fund – Growth</td><td><span className="badge b-overnight">Overnight</span></td><td className="num">62,100.00</td><td className="num">1,352.20</td><td className="num">83,97,162</td><td className="num">82,50,000</td><td className="num" style={{ color: '#1B873F' }}>+1,47,162</td></tr>
                  <tr><td>55443322</td><td>ICICI Pru Ultra Short – Growth</td><td><span className="badge b-debt">Ultra Short</span></td><td className="num">3,18,450.12</td><td className="num">42.18</td><td className="num">1,34,32,261</td><td className="num">1,30,00,000</td><td className="num" style={{ color: '#1B873F' }}>+4,32,261</td></tr>
                  <tr style={{ fontWeight: 700, background: '#EAF0F9' }}>
                    <td colSpan={5}>TOTAL</td>
                    <td className="num">3,17,98,549</td>
                    <td className="num">3,10,00,000</td>
                    <td className="num" style={{ color: '#1B873F' }}>+7,98,549</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── SCHEDULED TAB ── */}
        {activeTab === 'scheduled' && (
          <>
            <div className="card">
              <div className="card-title">Add Scheduled Report</div>
              <div className="g3">
                <div className="field"><label>Report Name</label><input defaultValue="Daily Portfolio Valuation" /></div>
                <div className="field"><label>Frequency</label><select><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select></div>
                <div className="field"><label>Time</label><input type="time" defaultValue="07:00" /></div>
                <div className="field"><label>Recipients (comma-separated)</label><input defaultValue="treasury-hod@bank.in" /></div>
                <div className="field"><label>Output Format</label><select><option>PDF + Excel</option><option>PDF</option><option>Excel</option></select></div>
                <div className="field"><label>Report Type</label><select>{REPORTS.flatMap(r => r.items).map(i => <option key={i}>{i}</option>)}</select></div>
              </div>
              <div className="actions">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn btn-primary">Save Schedule</button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Scheduled Reports ({SCHEDULED.length} active)</div>
              <table>
                <thead>
                  <tr><th>Report Name</th><th>Frequency</th><th>Recipient(s)</th><th>Format</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {SCHEDULED.map(s => (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td>{s.freq}</td>
                      <td style={{ fontSize: 11 }}>{s.recipient}</td>
                      <td><span className="badge b-info">{s.format}</span></td>
                      <td><span className="badge b-approved">{s.status}</span></td>
                      <td><span style={{ color: '#1F3864', cursor: 'pointer', fontSize: 11, marginRight: 8 }}>Edit</span><span style={{ color: '#C62828', cursor: 'pointer', fontSize: 11 }}>Pause</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>

      <div className="txn-footer">
        AVS InSoTech | MF Reports &amp; MIS | RBI UCB / SEBI Compliant
      </div>
    </div>
  );
}