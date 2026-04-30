import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const exitLoadData = [
  {
    scheme: 'HDFC Short Term Debt Fund',
    folio: '99887766',
    purchaseDate: '15-Apr-2026',
    units: '1,748.20',
    load: '0.25% if < 1 yr',
    exitLoadEnds: '15-Apr-2027',
    daysLeft: 361,
    loadAmount: '≈ ₹ 4,300',
    status: 'Load Zone',
  },
  {
    scheme: 'ABSL Short Term Fund',
    folio: '66554433',
    purchaseDate: '05-Mar-2026',
    units: '890.50',
    load: '0.50% if < 6 mo',
    exitLoadEnds: '05-Sep-2026',
    daysLeft: 139,
    loadAmount: '≈ ₹ 2,780',
    status: 'Load Zone',
  },
  {
    scheme: 'SBI Liquid Fund (Graded)',
    folio: '12345678',
    purchaseDate: '12-Apr-2026',
    units: '2,500.00',
    load: '0.0070% (Day 6)',
    exitLoadEnds: '19-Apr-2026',
    daysLeft: 0,
    loadAmount: '₹ 0',
    status: 'Exit Clear',
  },
  {
    scheme: 'ICICI Pru Overnight Fund',
    folio: '77889900',
    purchaseDate: '10-Mar-2026',
    units: '3,200.00',
    load: 'Nil',
    exitLoadEnds: '—',
    daysLeft: null,
    loadAmount: '₹ 0',
    status: 'No Load',
  },
  {
    scheme: 'Kotak Savings Fund',
    folio: '99887766',
    purchaseDate: '01-Feb-2026',
    units: '4,100.00',
    load: 'Nil',
    exitLoadEnds: '—',
    daysLeft: null,
    loadAmount: '₹ 0',
    status: 'No Load',
  },
];

const TABS = ['All Units', 'In Load Window', 'Exit Clear / No Load'];

const schemeLoadRules = [
  { scheme: 'HDFC Short Term Debt Fund', rule: '0.25% if redeemed within 1 year of purchase' },
  { scheme: 'ABSL Short Term Fund',       rule: '0.50% if redeemed within 6 months; 0.25% if within 12 months' },
  { scheme: 'SBI Liquid Fund',            rule: 'Graded exit load: Day 1 – 0.0070%, Day 2 – 0.0065%, …, Day 7+ – Nil' },
  { scheme: 'ICICI Pru Overnight Fund',   rule: 'Nil exit load' },
  { scheme: 'Kotak Savings Fund',         rule: 'Nil exit load' },
];

function statusBadge(status) {
  if (status === 'Load Zone')   return <span className="badge b-pending">Load Zone</span>;
  if (status === 'Exit Clear')  return <span className="badge b-approved">Exit Clear</span>;
  if (status === 'No Load')     return <span className="badge b-info">No Load</span>;
  return null;
}

function daysLeftCell(daysLeft, status) {
  if (status === 'No Load') return <td className="num" style={{color:'#6b7385'}}>—</td>;
  const color = daysLeft === 0 ? '#1B873F' : daysLeft < 90 ? '#E08E0B' : '#C62828';
  return <td className="num" style={{color, fontWeight:600}}>{daysLeft}</td>;
}

export default function Mfexitload({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch]       = useState('');

  const filtered = exitLoadData.filter(r => {
    const matchSearch = r.scheme.toLowerCase().includes(search.toLowerCase()) || r.folio.includes(search);
    if (activeTab === 1) return matchSearch && r.status === 'Load Zone';
    if (activeTab === 2) return matchSearch && r.status !== 'Load Zone';
    return matchSearch;
  });

  const loadZoneCount = exitLoadData.filter(r => r.status === 'Load Zone').length;

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .el-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
        .kpi .s-label { font-size:10.5px; color:#6b7385; text-transform:uppercase; letter-spacing:.5px; font-weight:600; }
        .kpi .s-value { font-size:20px; font-weight:700; color:#1F3864; margin-top:4px; }
        .kpi .s-sub   { font-size:11px; color:#6b7385; margin-top:2px; }
        .el-search { display:flex; gap:10px; margin-bottom:14px; }
        .el-search input { flex:1; padding:7px 10px; border:1px solid #D8DDE5; border-radius:4px; font-size:12px; }
        .days-bar-wrap { display:flex; align-items:center; gap:8px; }
        .days-bar { height:6px; border-radius:3px; flex:1; background:#D8DDE5; }
        .days-bar-fill { height:6px; border-radius:3px; }
        .load-rule-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .load-rule-item { background:#F5F6FA; border:1px solid #D8DDE5; border-radius:4px; padding:9px 12px; font-size:11.5px; }
        .load-rule-item .lr-scheme { font-weight:700; color:#1F3864; margin-bottom:3px; }
        .load-rule-item .lr-rule   { color:#6b7385; }
      `}</style>

      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">Exit Load Tracking <span className="txn-chip">MONITOR</span></h2>
            <div className="txn-breadcrumb">Home › Tax & Valuation › Exit Load</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export Load Report</button>
          </div>
        </div>

        <div className="txn-body">

          {/* KPI Strip */}
          <div className="el-kpi-row">
            <div className="kpi" style={{borderLeftColor:'#E08E0B'}}>
              <div className="s-label">In Load Window</div>
              <div className="s-value" style={{color:'#E08E0B'}}>{loadZoneCount}</div>
              <div className="s-sub">Units under exit load</div>
            </div>
            <div className="kpi green">
              <div className="s-label">Exit Clear / No Load</div>
              <div className="s-value" style={{color:'#1B873F'}}>{exitLoadData.length - loadZoneCount}</div>
              <div className="s-sub">Safe to redeem</div>
            </div>
            <div className="kpi alt">
              <div className="s-label">Total Schemes Tracked</div>
              <div className="s-value">{exitLoadData.length}</div>
            </div>
            <div className="kpi red" style={{borderLeftColor:'#C62828'}}>
              <div className="s-label">Estimated Load (if redeemed)</div>
              <div className="s-value" style={{color:'#C62828'}}>₹ 7,080</div>
              <div className="s-sub">On in-load-window units</div>
            </div>
          </div>

          {/* Alert */}
          <div className="callout warn" style={{marginBottom:'14px'}}>
            ⚠ <b>System Alert:</b> {loadZoneCount} scheme(s) have units in the exit load window. Checker will receive auto-alert if redemption is initiated on these units.
          </div>

          {/* Tabs */}
          <div className="tabs">
            {TABS.map((t, i) => (
              <div key={i} className={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
                {t}
                {i === 1 && <span style={{marginLeft:'5px',background:'#E08E0B',color:'#fff',padding:'1px 5px',borderRadius:'8px',fontSize:'10px',fontWeight:700}}>{loadZoneCount}</span>}
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="el-search">
            <input
              placeholder="Search by scheme or folio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Main Table */}
          <div className="card">
            <div className="card-title">Units Under Exit Load Window</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Folio</th>
                    <th>Purchase Date</th>
                    <th className="num">Units</th>
                    <th className="num">Applicable Load</th>
                    <th>Exit Load Ends</th>
                    <th className="num">Days Left</th>
                    <th className="num">Est. Load Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? filtered.map((r, i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600}}>{r.scheme}</td>
                      <td>{r.folio}</td>
                      <td>{r.purchaseDate}</td>
                      <td className="num">{r.units}</td>
                      <td className="num">{r.load}</td>
                      <td>{r.exitLoadEnds}</td>
                      {daysLeftCell(r.daysLeft, r.status)}
                      <td className="num" style={{color: r.status === 'Load Zone' ? '#C62828' : '#1B873F', fontWeight:600}}>
                        {r.loadAmount}
                      </td>
                      <td>{statusBadge(r.status)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={9} style={{textAlign:'center',color:'#6b7385',padding:'20px'}}>No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Days-left visual bars for Load Zone items */}
            {filtered.filter(r => r.status === 'Load Zone').length > 0 && (
              <div style={{marginTop:'14px'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#1F3864',marginBottom:'8px'}}>Exit Load Countdown</div>
                {filtered.filter(r => r.status === 'Load Zone').map((r, i) => {
                  const maxDays = 365;
                  const pct = Math.min((r.daysLeft / maxDays) * 100, 100);
                  const barColor = r.daysLeft > 180 ? '#C62828' : r.daysLeft > 60 ? '#E08E0B' : '#1B873F';
                  return (
                    <div key={i} style={{marginBottom:'8px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#1F3864',marginBottom:'3px'}}>
                        <span style={{fontWeight:600}}>{r.scheme}</span>
                        <span style={{color: barColor, fontWeight:700}}>{r.daysLeft} days remaining</span>
                      </div>
                      <div className="days-bar">
                        <div className="days-bar-fill" style={{width:`${pct}%`, background: barColor}}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="callout" style={{marginTop:'12px'}}>
              💡 System auto-flags redemptions from load window; checker gets alert if redeemed under load. Exit load is deducted at source by the AMC/RTA.
            </div>
          </div>

          {/* Scheme Load Rules Reference */}
          <div className="card">
            <div className="card-title">Exit Load Rules – Scheme Reference</div>
            <div className="load-rule-grid">
              {schemeLoadRules.map((r, i) => (
                <div key={i} className="load-rule-item">
                  <div className="lr-scheme">{r.scheme}</div>
                  <div className="lr-rule">{r.rule}</div>
                </div>
              ))}
            </div>
            <div className="callout warn" style={{marginTop:'12px'}}>
              ⚠ Exit load rates are subject to change by AMC with 30-day notice. System should be updated immediately upon receipt of AMC circular.
            </div>
          </div>

          {/* Redemption Simulator */}
          <div className="card">
            <div className="card-title">Redemption Load Simulator</div>
            <div className="g3">
              <div className="field">
                <label>Select Scheme</label>
                <select>
                  <option>HDFC Short Term Debt Fund</option>
                  <option>ABSL Short Term Fund</option>
                  <option>SBI Liquid Fund</option>
                </select>
              </div>
              <div className="field">
                <label>Redemption Amount (₹)</label>
                <input type="number" placeholder="e.g. 10,00,000" />
              </div>
              <div className="field">
                <label>Redemption Date</label>
                <input type="date" defaultValue="2026-04-19" />
              </div>
            </div>
            <div className="callout" style={{marginTop:'8px'}}>
              💡 Enter amount and date to simulate the exit load applicable on the redemption.
            </div>
            <div className="actions">
              <button className="btn btn-primary">Calculate Exit Load</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}