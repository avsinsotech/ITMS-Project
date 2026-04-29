import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const mtmData = [
  { scheme: 'SBI Liquid Fund',      cat: 'Liquid',     catClass: 'b-liquid',    cost: '9,70,00,000',  mktVal: '9,85,42,380',  apprec: '15,42,380',  deprec: null },
  { scheme: 'HDFC Liquid Fund',     cat: 'Liquid',     catClass: 'b-liquid',    cost: '9,68,50,000',  mktVal: '9,92,18,000',  apprec: '23,68,000',  deprec: null },
  { scheme: 'ICICI Pru Short Term', cat: 'Short Term', catClass: 'b-debt',      cost: '5,50,00,000',  mktVal: '5,45,20,000',  apprec: null,          deprec: '(4,80,000)' },
  { scheme: 'Kotak Savings Fund',   cat: 'Low Dur.',   catClass: 'b-debt',      cost: '6,30,00,000',  mktVal: '6,50,45,345',  apprec: '20,45,345',  deprec: null },
  { scheme: 'ABSL Low Duration',    cat: 'Low Dur.',   catClass: 'b-debt',      cost: '5,81,00,000',  mktVal: '6,00,82,560',  apprec: '19,82,560',  deprec: null },
];

const idrHistory = [
  { quarter: 'Q4 FY 2025-26 (Mar-31)', depreciation: '(6,20,000)', idrProvided: '6,20,000', glVoucher: 'MF/IDR/2026/Q4', status: 'Posted' },
  { quarter: 'Q3 FY 2025-26 (Dec-31)', depreciation: '(2,40,000)', idrProvided: '2,40,000', glVoucher: 'MF/IDR/2025/Q3', status: 'Posted' },
  { quarter: 'Q2 FY 2025-26 (Sep-30)', depreciation: '—',           idrProvided: 'Nil',       glVoucher: '—',              status: 'No Action' },
  { quarter: 'Q1 FY 2025-26 (Jun-30)', depreciation: '(1,10,000)', idrProvided: '1,10,000', glVoucher: 'MF/IDR/2025/Q1', status: 'Posted' },
];

export default function MfMtmProvision({ onNavigate }) {
  const [valuationDate, setValuationDate] = useState('2026-03-31');
  const [category, setCategory]           = useState('AFS');
  const [posted, setPosted]               = useState(false);

  const handlePost = () => {
    setPosted(true);
    alert('✅ IDR Provision of ₹ 4,80,000 posted to GL. Voucher: MF/IDR/2026/Q1');
  };

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .mtm-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
        .kpi .s-label { font-size:10.5px; color:#6b7385; text-transform:uppercase; letter-spacing:.5px; font-weight:600; }
        .kpi .s-value { font-size:18px; font-weight:700; color:#1F3864; margin-top:4px; }
        .kpi .s-sub   { font-size:11px; color:#6b7385; margin-top:2px; }
        .rbi-rule-banner {
          background: #EAF0F9;
          border: 1px solid #1F3864;
          border-left: 4px solid #1F3864;
          border-radius: 5px;
          padding: 12px 14px;
          margin-bottom: 14px;
          font-size: 11.5px;
          color: #1F3864;
        }
        .rbi-rule-banner .rb-title { font-weight:700; margin-bottom:4px; font-size:12px; }
        .rbi-rule-banner ul { margin:6px 0 0 16px; }
        .rbi-rule-banner ul li { margin-bottom:3px; }
        .mtm-net-box {
          display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;
        }
        .net-card {
          border-radius:5px; padding:12px 14px; text-align:center;
        }
        .net-card.green-bg { background:#E7F5EC; border:1px solid #1B873F; }
        .net-card.red-bg   { background:#FDECEC; border:1px solid #C62828; }
        .net-card .nc-label { font-size:11px; font-weight:600; color:#6b7385; margin-bottom:4px; }
        .net-card .nc-value { font-size:22px; font-weight:700; }
        .net-card.green-bg .nc-value { color:#1B873F; }
        .net-card.red-bg   .nc-value { color:#C62828; }
        .net-card .nc-note  { font-size:10px; color:#6b7385; margin-top:4px; }
      `}</style>

      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">MTM Valuation & IDR Provision <span className="txn-chip">QUARTERLY</span></h2>
            <div className="txn-breadcrumb">Home › Tax & Valuation › MTM & IDR</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export MTM Report</button>
            <button className="btn btn-ghost">View IDR Ledger</button>
          </div>
        </div>

        <div className="txn-body">

          {/* KPI Strip */}
          <div className="mtm-kpi-row">
            <div className="kpi green">
              <div className="s-label">Net Appreciation (AFS)</div>
              <div className="s-value" style={{color:'#1B873F'}}>₹ 59,55,725</div>
              <div className="s-sub">Ignored per RBI UCB rule</div>
            </div>
            <div className="kpi red" style={{borderLeftColor:'#C62828'}}>
              <div className="s-label">Net Depreciation (AFS)</div>
              <div className="s-value" style={{color:'#C62828'}}>₹ (4,80,000)</div>
              <div className="s-sub">To be fully provided via IDR</div>
            </div>
            <div className="kpi alt">
              <div className="s-label">IDR Balance (Opening)</div>
              <div className="s-value">₹ 9,70,000</div>
              <div className="s-sub">As on 01-Apr-2026</div>
            </div>
            <div className="kpi">
              <div className="s-label">Valuation Date</div>
              <div className="s-value">31-Mar-2026</div>
              <div className="s-sub">Quarterly MTM Run</div>
            </div>
          </div>

          {/* RBI Rule Banner */}
          <div className="rbi-rule-banner">
            <div className="rb-title">📋 RBI UCB Master Direction – MTM Rules for Mutual Funds</div>
            <ul>
              <li>All MF investments classified under <b>AFS (Available for Sale)</b> must be marked to market quarterly.</li>
              <li><b>Appreciation is ignored</b> — only net depreciation is provided through IDR (Investment Depreciation Reserve).</li>
              <li>Net depreciation must be fully provided; partial provisioning is not permitted.</li>
              <li>IDR is a below-the-line provision; reversed only when units are redeemed at profit.</li>
            </ul>
          </div>

          {/* MTM Config Card */}
          <div className="card">
            <div className="card-title">Quarterly MTM Run (AFS Bucket)</div>
            <div className="g3">
              <div className="field">
                <label>Valuation Date</label>
                <input type="date" value={valuationDate} onChange={e => setValuationDate(e.target.value)} />
              </div>
              <div className="field">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option>AFS</option>
                  <option>HFT</option>
                </select>
              </div>
              <div className="field">
                <label>NAV Source</label>
                <input className="readonly" readOnly value="AMFI 31-Mar-2026" />
              </div>
            </div>
            <div className="actions">
              <button className="btn btn-ghost">Re-run MTM</button>
            </div>
          </div>

          {/* Scheme-wise MTM Table */}
          <div className="card">
            <div className="card-title">Scheme-wise MTM (As on {valuationDate})</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Category</th>
                    <th className="num">Cost (₹)</th>
                    <th className="num">Market Value (₹)</th>
                    <th className="num">Appreciation (₹)</th>
                    <th className="num">Depreciation (₹)</th>
                    <th>IDR Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mtmData.map((r, i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600}}>{r.scheme}</td>
                      <td><span className={`badge ${r.catClass}`}>{r.cat}</span></td>
                      <td className="num">{r.cost}</td>
                      <td className="num">{r.mktVal}</td>
                      <td className="num" style={{color:'#1B873F'}}>{r.apprec ?? '—'}</td>
                      <td className="num" style={{color:'#C62828'}}>{r.deprec ?? '—'}</td>
                      <td>
                        {r.deprec
                          ? <span className="badge b-pending">Provide IDR</span>
                          : <span className="badge b-approved">No Action</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="tfoot-row">
                    <td colSpan={4} style={{fontWeight:700}}>NET (AFS)</td>
                    <td className="num" style={{color:'#1B873F', fontWeight:700}}>59,55,725</td>
                    <td className="num" style={{color:'#C62828', fontWeight:700}}>(4,80,000)</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Net Summary boxes */}
            <div className="mtm-net-box">
              <div className="net-card green-bg">
                <div className="nc-label">Net Appreciation</div>
                <div className="nc-value">₹ 59,55,725</div>
                <div className="nc-note">Ignored per RBI UCB MD — not taken to P&L</div>
              </div>
              <div className="net-card red-bg">
                <div className="nc-label">Net Depreciation – IDR Required</div>
                <div className="nc-value">₹ (4,80,000)</div>
                <div className="nc-note">Full provision mandatory — GL: IDR Provision A/c Dr. / IDR Reserve A/c Cr.</div>
              </div>
            </div>

            <div className="callout warn" style={{marginTop:'12px'}}>
              <b>RBI Rule (UCB):</b> Net appreciation <b>IGNORED</b>; net depreciation of ₹ 4.80 L to be fully provided via IDR.
            </div>

            <div className="actions">
              {posted
                ? <div className="callout ok" style={{margin:0}}>✅ IDR Provision posted successfully. Voucher: MF/IDR/2026/Q1</div>
                : <button className="btn btn-gold" onClick={handlePost}>Post IDR Provision to CBS GL</button>
              }
            </div>
          </div>

          {/* GL Mapping Info */}
          <div className="card">
            <div className="card-title">GL Entries – IDR Provision</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Entry</th>
                  <th>Account</th>
                  <th>GL Code</th>
                  <th className="num">Amount (₹)</th>
                  <th>Dr / Cr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IDR Depreciation Provision</td>
                  <td>IDR Provision (P&L)</td>
                  <td>5220</td>
                  <td className="num">4,80,000</td>
                  <td><span className="badge b-rejected">Dr</span></td>
                </tr>
                <tr>
                  <td>IDR Reserve (Balance Sheet)</td>
                  <td>Investment Depreciation Reserve</td>
                  <td>3310</td>
                  <td className="num">4,80,000</td>
                  <td><span className="badge b-approved">Cr</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* IDR History */}
          <div className="card">
            <div className="card-title">IDR Provision History</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Quarter</th>
                  <th className="num">Net Depreciation (₹)</th>
                  <th className="num">IDR Provided (₹)</th>
                  <th>GL Voucher</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {idrHistory.map((r, i) => (
                  <tr key={i}>
                    <td>{r.quarter}</td>
                    <td className="num" style={{color: r.depreciation === '—' ? '#6b7385' : '#C62828'}}>{r.depreciation}</td>
                    <td className="num" style={{color: r.idrProvided === 'Nil' ? '#6b7385' : '#1B873F', fontWeight:600}}>{r.idrProvided}</td>
                    <td style={{color:'#1F3864', fontWeight: r.glVoucher !== '—' ? 600 : 400}}>{r.glVoucher}</td>
                    <td>
                      <span className={
                        r.status === 'Posted' ? 'badge b-approved' :
                        r.status === 'No Action' ? 'badge b-info' : 'badge b-pending'
                      }>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}