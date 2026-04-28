import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const realisedGains = [
  {
    date: '18-Apr-2026', scheme: 'HDFC Liquid Fund', folio: '55667788',
    units: '2,962.15', cost: '29,18,390', sale: '30,00,000',
    holding: '8-10 mo', gain: 81610, gainStr: '81,610', type: 'STCG',
  },
  {
    date: '10-Apr-2026', scheme: 'ICICI Pru Overnight', folio: '77889900',
    units: '1,480.50', cost: '19,70,200', sale: '20,02,100',
    holding: '6 mo', gain: 31900, gainStr: '31,900', type: 'STCG',
  },
  {
    date: '05-Apr-2026', scheme: 'SBI Liquid Fund', folio: '12345678',
    units: '748.20', cost: '29,18,000', sale: '30,02,800',
    holding: '11 mo', gain: 84800, gainStr: '84,800', type: 'STCG',
  },
  {
    date: '20-Mar-2026', scheme: 'Kotak Savings Fund', folio: '99887766',
    units: '4,200.00', cost: '16,81,200', sale: '17,22,600',
    holding: '9 mo', gain: 41400, gainStr: '41,400', type: 'STCG',
  },
  {
    date: '12-Mar-2026', scheme: 'ABSL Low Duration', folio: '66554433',
    units: '1,820.00', cost: '10,75,640', sale: '11,18,200',
    holding: '7 mo', gain: 42560, gainStr: '42,560', type: 'STCG',
  },
];

const unrealisedGains = [
  { scheme: 'SBI Liquid Fund',      cat: 'Liquid',      catClass: 'b-liquid',    cost: '9,70,00,000', mktVal: '9,85,42,380', gain: 1542380,  gainStr: '15,42,380',  holding: '8 mo',  type: 'STCG (if redeemed)' },
  { scheme: 'HDFC Liquid Fund',     cat: 'Liquid',      catClass: 'b-liquid',    cost: '9,68,50,000', mktVal: '9,92,18,000', gain: 2368000,  gainStr: '23,68,000',  holding: '10 mo', type: 'STCG (if redeemed)' },
  { scheme: 'ICICI Pru Overnight',  cat: 'Overnight',   catClass: 'b-overnight', cost: '8,38,00,000', mktVal: '8,50,00,000', gain: 1200000,  gainStr: '12,00,000',  holding: '6 mo',  type: 'STCG (if redeemed)' },
  { scheme: 'SBI Ultra Short Dur.', cat: 'Ultra Short', catClass: 'b-debt',      cost: '2,38,00,000', mktVal: '2,50,00,000', gain: 1200000,  gainStr: '12,00,000',  holding: '5 mo',  type: 'STCG (if redeemed)' },
  { scheme: 'Kotak Savings Fund',   cat: 'Low Dur.',    catClass: 'b-debt',      cost: '6,30,00,000', mktVal: '6,50,45,345', gain: 2045345,  gainStr: '20,45,345',  holding: '9 mo',  type: 'STCG (if redeemed)' },
  { scheme: 'ABSL Low Duration',    cat: 'Low Dur.',    catClass: 'b-debt',      cost: '5,81,00,000', mktVal: '6,00,82,560', gain: 1982560,  gainStr: '19,82,560',  holding: '7 mo',  type: 'STCG (if redeemed)' },
];

const byScheme = [
  { scheme: 'HDFC Liquid Fund',    realisedGain: '81,610',  unrealisedGain: '23,68,000', totalGain: '24,49,610', type: 'STCG' },
  { scheme: 'ICICI Pru Overnight', realisedGain: '31,900',  unrealisedGain: '12,00,000', totalGain: '12,31,900', type: 'STCG' },
  { scheme: 'SBI Liquid Fund',     realisedGain: '84,800',  unrealisedGain: '15,42,380', totalGain: '16,27,180', type: 'STCG' },
  { scheme: 'Kotak Savings Fund',  realisedGain: '41,400',  unrealisedGain: '20,45,345', totalGain: '20,86,745', type: 'STCG' },
  { scheme: 'ABSL Low Duration',   realisedGain: '42,560',  unrealisedGain: '19,82,560', totalGain: '20,25,120', type: 'STCG' },
];

const TABS = ['Realised (FY 2026-27)', 'Unrealised (Current)', 'By Scheme'];

export default function Mfcapitalgains({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);
  const [fyFilter, setFyFilter] = useState('2026-27');
  const [schemeFilter, setSchemeFilter] = useState('All');

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .cg-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
        .kpi .s-label { font-size:10.5px; color:#6b7385; text-transform:uppercase; letter-spacing:.5px; font-weight:600; }
        .kpi .s-value { font-size:18px; font-weight:700; color:#1F3864; margin-top:4px; }
        .kpi .s-sub   { font-size:11px; color:#6b7385; margin-top:2px; }
        .cg-filter-row { display:flex; gap:10px; margin-bottom:14px; align-items:center; }
        .cg-filter-row select, .cg-filter-row input { padding:7px 10px; border:1px solid #D8DDE5; border-radius:4px; font-size:12px; background:#fff; }
        .tax-rule-box { background:#FFF5D6; border:1px solid #C8A000; border-radius:5px; padding:12px 14px; margin-bottom:14px; font-size:11.5px; color:#1F3864; }
        .tax-rule-box .rule-title { font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px; }
        .tax-rule-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px; font-size:11px; }
        .tax-rule-grid .rule-row { background:#fff; border-radius:4px; padding:7px 10px; border:1px solid #D8DDE5; }
        .tax-rule-grid .rule-row .rk { font-weight:600; color:#1F3864; }
        .tax-rule-grid .rule-row .rv { color:#6b7385; margin-top:2px; }
      `}</style>

      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">Capital Gains Computation <span className="txn-chip">TAX</span></h2>
            <div className="txn-breadcrumb">Home › Tax & Valuation › Capital Gains</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export to Excel</button>
            <button className="btn btn-primary">Generate Tax Report</button>
          </div>
        </div>

        <div className="txn-body">

          {/* KPI Strip */}
          <div className="cg-kpi-row">
            <div className="kpi green">
              <div className="s-label">STCG (Realised)</div>
              <div className="s-value" style={{color:'#1B873F'}}>₹ 4,82,310</div>
              <div className="s-sub">Debt MFs · FY 2026-27</div>
            </div>
            <div className="kpi purple" style={{borderLeftColor:'#6A1B9A'}}>
              <div className="s-label">LTCG (Realised)</div>
              <div className="s-value">₹ 0</div>
              <div className="s-sub">Holding &lt; 24 months</div>
            </div>
            <div className="kpi">
              <div className="s-label">Indexation Benefit</div>
              <div className="s-value">N/A</div>
              <div className="s-sub">Post Apr-2023 (Debt)</div>
            </div>
            <div className="kpi alt">
              <div className="s-label">Unrealised Gain</div>
              <div className="s-value">₹ 1.55 Cr</div>
              <div className="s-sub">If redeemed today</div>
            </div>
          </div>

          {/* Tax Rule Summary */}
          <div className="tax-rule-box">
            <div className="rule-title">⚖ Post Finance Act 2023 – Applicable Tax Rules</div>
            <div className="tax-rule-grid">
              <div className="rule-row">
                <div className="rk">Debt MF (Purchased after 01-Apr-2023)</div>
                <div className="rv">100% STCG at slab rate, regardless of holding period. No indexation.</div>
              </div>
              <div className="rule-row">
                <div className="rk">LTCG Threshold (Debt MF)</div>
                <div className="rv">Not applicable — all gains are STCG post Finance Act 2023.</div>
              </div>
              <div className="rule-row">
                <div className="rk">Equity MF (not applicable for banks)</div>
                <div className="rv">RBI UCB MD prohibits equity MF investment.</div>
              </div>
              <div className="rule-row">
                <div className="rk">TDS on Redemption</div>
                <div className="rv">No TDS on gain for banks / co-operative societies.</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {TABS.map((t, i) => (
              <div key={i} className={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</div>
            ))}
          </div>

          {/* Filters */}
          <div className="cg-filter-row">
            <select value={fyFilter} onChange={e => setFyFilter(e.target.value)}>
              <option>2026-27</option>
              <option>2025-26</option>
              <option>2024-25</option>
            </select>
            <select value={schemeFilter} onChange={e => setSchemeFilter(e.target.value)}>
              <option>All</option>
              <option>HDFC Liquid Fund</option>
              <option>ICICI Pru Overnight</option>
              <option>SBI Liquid Fund</option>
              <option>Kotak Savings Fund</option>
              <option>ABSL Low Duration</option>
            </select>
          </div>

          {/* ── TAB 0: Realised ── */}
          {activeTab === 0 && (
            <div className="card">
              <div className="card-title">Realised Gains – Transaction Register</div>
              <div style={{overflowX:'auto'}}>
                <table className="txn-table">
                  <thead>
                    <tr>
                      <th>Redemption Date</th>
                      <th>Scheme</th>
                      <th>Folio</th>
                      <th className="num">Units</th>
                      <th className="num">Cost (₹)</th>
                      <th className="num">Sale Proceeds (₹)</th>
                      <th>Holding Period</th>
                      <th className="num">Gain / Loss (₹)</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realisedGains
                      .filter(r => schemeFilter === 'All' || r.scheme === schemeFilter)
                      .map((r, i) => (
                      <tr key={i}>
                        <td>{r.date}</td>
                        <td style={{fontWeight:600}}>{r.scheme}</td>
                        <td>{r.folio}</td>
                        <td className="num">{r.units}</td>
                        <td className="num">{r.cost}</td>
                        <td className="num">{r.sale}</td>
                        <td>{r.holding}</td>
                        <td className="num" style={{color: r.gain >= 0 ? '#1B873F' : '#C62828', fontWeight:600}}>
                          {r.gain >= 0 ? '+' : ''}{r.gainStr}
                        </td>
                        <td><span className="badge b-info">{r.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="tfoot-row">
                      <td colSpan={7} style={{fontWeight:700}}>FYTD TOTAL</td>
                      <td className="num" style={{color:'#1B873F', fontWeight:700}}>+4,82,270</td>
                      <td><span className="badge b-info">STCG</span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="callout" style={{marginTop:'12px'}}>
                <b>Post Finance Act 2023:</b> All debt MF gains (units purchased after 01-Apr-2023) taxed as STCG at slab rate, irrespective of holding period. No indexation benefit.
              </div>
            </div>
          )}

          {/* ── TAB 1: Unrealised ── */}
          {activeTab === 1 && (
            <div className="card">
              <div className="card-title">Unrealised Gains – Current Holdings (As on 19-Apr-2026)</div>
              <div style={{overflowX:'auto'}}>
                <table className="txn-table">
                  <thead>
                    <tr>
                      <th>Scheme</th>
                      <th>Category</th>
                      <th className="num">Cost Basis (₹)</th>
                      <th className="num">Market Value (₹)</th>
                      <th className="num">Unrealised Gain (₹)</th>
                      <th>Holding Period</th>
                      <th>Type (if redeemed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unrealisedGains
                      .filter(r => schemeFilter === 'All' || r.scheme === schemeFilter)
                      .map((r, i) => (
                      <tr key={i}>
                        <td style={{fontWeight:600}}>{r.scheme}</td>
                        <td><span className={`badge ${r.catClass}`}>{r.cat}</span></td>
                        <td className="num">{r.cost}</td>
                        <td className="num">{r.mktVal}</td>
                        <td className="num" style={{color:'#1B873F', fontWeight:600}}>+{r.gainStr}</td>
                        <td>{r.holding}</td>
                        <td><span className="badge b-info">{r.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="tfoot-row">
                      <td colSpan={4} style={{fontWeight:700}}>TOTAL UNREALISED</td>
                      <td className="num" style={{color:'#1B873F', fontWeight:700}}>+1,54,38,285</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="callout warn" style={{marginTop:'12px'}}>
                ⚠ Unrealised gains are <b>not taxable</b> until units are redeemed. All current holdings would attract STCG if redeemed.
              </div>
            </div>
          )}

          {/* ── TAB 2: By Scheme ── */}
          {activeTab === 2 && (
            <div className="card">
              <div className="card-title">Gain Summary – Scheme-wise (FY 2026-27)</div>
              <div style={{overflowX:'auto'}}>
                <table className="txn-table">
                  <thead>
                    <tr>
                      <th>Scheme</th>
                      <th className="num">Realised Gain (₹)</th>
                      <th className="num">Unrealised Gain (₹)</th>
                      <th className="num">Total Gain (₹)</th>
                      <th>Tax Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byScheme.map((r, i) => (
                      <tr key={i}>
                        <td style={{fontWeight:600}}>{r.scheme}</td>
                        <td className="num" style={{color:'#1B873F'}}>+{r.realisedGain}</td>
                        <td className="num" style={{color:'#1F3864'}}>+{r.unrealisedGain}</td>
                        <td className="num" style={{color:'#1B873F', fontWeight:600}}>+{r.totalGain}</td>
                        <td><span className="badge b-info">{r.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="tfoot-row">
                      <td style={{fontWeight:700}}>TOTAL</td>
                      <td className="num" style={{color:'#1B873F', fontWeight:700}}>+2,82,270</td>
                      <td className="num" style={{fontWeight:700}}>+91,38,285</td>
                      <td className="num" style={{color:'#1B873F', fontWeight:700}}>+94,20,555</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}