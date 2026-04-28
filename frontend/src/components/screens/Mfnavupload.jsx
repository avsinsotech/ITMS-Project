import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const navData = [
  { code: '119551', scheme: 'SBI Liquid Fund - Direct - G',        prevNav: '4,011.72', latestNav: '4,012.45', change: '+0.73',  pct: '+0.018%', status: 'Matched' },
  { code: '119712', scheme: 'HDFC Liquid Fund - Direct - IDCW',    prevNav: '1,012.62', latestNav: '1,012.80', change: '+0.18',  pct: '+0.018%', status: 'Matched' },
  { code: '120503', scheme: 'ICICI Pru Overnight - Direct - G',    prevNav: '1,352.02', latestNav: '1,352.20', change: '+0.18',  pct: '+0.013%', status: 'Matched' },
  { code: '118825', scheme: 'Kotak Savings Fund - Direct - G',     prevNav: '42.17',    latestNav: '42.18',    change: '+0.01',  pct: '+0.024%', status: 'Matched' },
  { code: '118560', scheme: 'ABSL Low Duration Fund - Direct - G', prevNav: '618.40',   latestNav: '618.55',   change: '+0.15',  pct: '+0.024%', status: 'Matched' },
  { code: '110148', scheme: 'SBI Ultra Short Dur - Direct - G',    prevNav: '421.65',   latestNav: '421.78',   change: '+0.13',  pct: '+0.031%', status: 'Unmatched' },
];

const STEPS = [
  { label: 'Fetch AMFI File', state: 'done' },
  { label: 'Validate', state: 'current' },
  { label: 'Map Schemes', state: '' },
  { label: 'Update Portfolio', state: '' },
  { label: 'Trigger MTM', state: '' },
];

export default function MfNavUpload({ onNavigate }) {
  const [navDate, setNavDate] = useState('2026-04-19');
  const [source, setSource] = useState('AMFI India (Auto-Fetch)');
  const [fetched, setFetched] = useState(true);

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .nav-stepper { display:flex; margin-bottom:14px; border-radius:5px; overflow:hidden; border:1px solid #D8DDE5; }
        .nav-step { flex:1; display:flex; align-items:center; gap:8px; padding:9px 12px; background:#fff; font-size:11px; border-right:1px solid #D8DDE5; color:#6b7385; }
        .nav-step:last-child { border-right:none; }
        .nav-step .sn { width:20px; height:20px; border-radius:50%; background:#D8DDE5; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:10px; flex-shrink:0; }
        .nav-step.done { background:#EAF0F9; color:#1F3864; }
        .nav-step.done .sn { background:#1B873F; }
        .nav-step.current { background:#FFF5D6; color:#1F3864; font-weight:600; }
        .nav-step.current .sn { background:#C8A000; color:#1F3864; }
        .nav-stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
      `}</style>
      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">NAV Upload (AMFI / RTA Feed) <span className="txn-chip">DAILY</span></h2>
            <div className="txn-breadcrumb">Home › Valuation › NAV Upload</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Schedule Auto-Fetch</button>
            <button className="btn btn-primary">Fetch Now</button>
          </div>
        </div>

        <div className="txn-body">
          {/* Stepper */}
          <div className="nav-stepper">
            {STEPS.map((s, i) => (
              <div key={i} className={`nav-step${s.state ? ' ' + s.state : ''}`}>
                <span className="sn">{i + 1}</span>
                {s.label}
              </div>
            ))}
          </div>

          {/* Stat strip */}
          <div className="nav-stat-row">
            <div className="kpi green"><div className="s-label">NAV File Date</div><div className="s-value">19-Apr-2026</div></div>
            <div className="kpi"><div className="s-label">Total Records</div><div className="s-value">48</div></div>
            <div className="kpi alt"><div className="s-label">Matched</div><div className="s-value">47</div></div>
            <div className="kpi red"><div className="s-label">Unmatched</div><div className="s-value">1</div></div>
          </div>

          {/* Upload Config */}
          <div className="card">
            <div className="card-title">NAV File Configuration</div>
            <div className="g3">
              <div className="field">
                <label>NAV Date</label>
                <input type="date" value={navDate} onChange={e => setNavDate(e.target.value)} />
              </div>
              <div className="field">
                <label>Source</label>
                <select value={source} onChange={e => setSource(e.target.value)}>
                  <option>AMFI India (Auto-Fetch)</option>
                  <option>CAMS API</option>
                  <option>KFintech API</option>
                  <option>Manual Upload</option>
                </select>
              </div>
              <div className="field">
                <label>File (if Manual)</label>
                <input type="file" disabled={source !== 'Manual Upload'} />
              </div>
            </div>
            <div className="callout ok" style={{marginTop:'10px'}}>
              ✓ Auto-fetch enabled — AMFI NAV file pulled at 9:00 PM daily from portal.amfiindia.com
            </div>
            <div className="actions">
              <button className="btn btn-ghost">Fetch Now</button>
              <button className="btn btn-gold">Validate & Update</button>
            </div>
          </div>

          {/* NAV Snapshot Table */}
          <div className="card">
            <div className="card-title">Latest NAV Snapshot</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>AMFI Code</th>
                    <th>Scheme</th>
                    <th className="num">Prev NAV</th>
                    <th className="num">Latest NAV</th>
                    <th className="num">Change</th>
                    <th className="num">% Change</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {navData.map((n, i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600,color:'#1F3864'}}>{n.code}</td>
                      <td>{n.scheme}</td>
                      <td className="num">{n.prevNav}</td>
                      <td className="num" style={{fontWeight:600}}>{n.latestNav}</td>
                      <td className="num" style={{color: n.change.startsWith('+') ? '#1B873F' : '#C62828'}}>{n.change}</td>
                      <td className="num" style={{color: n.pct.startsWith('+') ? '#1B873F' : '#C62828'}}>{n.pct}</td>
                      <td>
                        <span className={n.status === 'Matched' ? 'badge b-approved' : 'badge b-rejected'}>
                          {n.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {navData.some(n => n.status === 'Unmatched') && (
              <div className="callout warn" style={{marginTop:'12px'}}>
                ⚠ 1 scheme unmatched — SBI Ultra Short Duration AMFI code may have changed. Verify and remap in Scheme Master.
              </div>
            )}

            <div className="actions">
              <button className="btn btn-ghost">Download Mismatch Report</button>
              <button className="btn btn-primary">Update Portfolio & Trigger MTM</button>
            </div>
          </div>

          {/* NAV History Log */}
          <div className="card">
            <div className="card-title">Recent NAV Upload History</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th className="num">Records</th>
                  <th className="num">Matched</th>
                  <th>Uploaded By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>19-Apr-2026</td><td>AMFI Auto-Fetch</td><td className="num">48</td><td className="num">47</td><td>SYSTEM</td><td><span className="badge b-pending">In Progress</span></td></tr>
                <tr><td>18-Apr-2026</td><td>AMFI Auto-Fetch</td><td className="num">48</td><td className="num">48</td><td>SYSTEM</td><td><span className="badge b-approved">Completed</span></td></tr>
                <tr><td>17-Apr-2026</td><td>AMFI Auto-Fetch</td><td className="num">48</td><td className="num">48</td><td>SYSTEM</td><td><span className="badge b-approved">Completed</span></td></tr>
                <tr><td>16-Apr-2026</td><td>Manual Upload</td><td className="num">48</td><td className="num">46</td><td>DEALER01</td><td><span className="badge b-approved">Completed</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}