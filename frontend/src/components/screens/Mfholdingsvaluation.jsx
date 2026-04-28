import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const holdings = [
  { scheme: 'SBI Liquid Fund',       cat: 'Liquid',      catClass: 'b-liquid',    units: '24,886.18', avgCost: '3,900.50', nav: '4,012.45', costCr: '9.70', mktCr: '9.99', absRet: '2.87%', annRet: '6.72%', retPos: true },
  { scheme: 'HDFC Liquid Fund',      cat: 'Liquid',      catClass: 'b-liquid',    units: '9,870.45',  avgCost: '981.22',   nav: '1,012.80', costCr: '9.69', mktCr: '10.00', absRet: '3.22%', annRet: '6.85%', retPos: true },
  { scheme: 'ICICI Pru Overnight',   cat: 'Overnight',   catClass: 'b-overnight', units: '62,888.42', avgCost: '1,332.15', nav: '1,352.20', costCr: '8.38', mktCr: '8.50', absRet: '1.51%', annRet: '6.48%', retPos: true },
  { scheme: 'SBI Ultra Short Dur.',  cat: 'Ultra Short', catClass: 'b-debt',      units: '5,927.14',  avgCost: '401.55',   nav: '421.78',   costCr: '2.38', mktCr: '2.50', absRet: '5.03%', annRet: '7.15%', retPos: true },
  { scheme: 'Kotak Savings Fund',    cat: 'Low Dur.',    catClass: 'b-debt',      units: '15,420.82', avgCost: '40.85',    nav: '42.18',    costCr: '6.30', mktCr: '6.50', absRet: '3.25%', annRet: '7.38%', retPos: true },
  { scheme: 'ABSL Low Duration',     cat: 'Low Dur.',    catClass: 'b-debt',      units: '9,708.32',  avgCost: '598.45',   nav: '618.55',   costCr: '5.81', mktCr: '6.01', absRet: '3.36%', annRet: '7.42%', retPos: true },
];

const TABS = ['All Holdings', 'By AMC', 'By Category', 'By Plan (Growth/IDCW)'];

export default function MfHoldingsValuation({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .holdings-kpi { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:14px; }
        .kpi .s-label { font-size:10.5px; color:#6b7385; text-transform:uppercase; letter-spacing:.5px; font-weight:600; }
        .kpi .s-value { font-size:19px; font-weight:700; color:#1F3864; margin-top:4px; }
        .kpi .s-sub { font-size:11px; color:#6b7385; margin-top:2px; }
        .amc-block { margin-bottom:12px; }
        .amc-block-header { background:#EAF0F9; padding:8px 12px; font-size:12px; font-weight:700; color:#1F3864; border-radius:4px 4px 0 0; border:1px solid #D8DDE5; }
        .cat-bar { display:flex; height:18px; border-radius:4px; overflow:hidden; margin:12px 0 6px; }
        .cat-bar-seg { display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#fff; transition:flex .3s; }
      `}</style>
      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">Holdings & Valuation <span className="txn-chip">PORTFOLIO</span></h2>
            <div className="txn-breadcrumb">Home › Portfolio › Holdings</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export to Excel</button>
            <button className="btn btn-primary">Refresh NAV</button>
          </div>
        </div>

        <div className="txn-body">
          {/* KPI Strip */}
          <div className="holdings-kpi">
            <div className="kpi"><div className="s-label">Total AUM</div><div className="s-value">₹ 42.80 Cr</div><div className="s-sub">Across 18 schemes</div></div>
            <div className="kpi alt"><div className="s-label">Cost Basis</div><div className="s-value">₹ 41.25 Cr</div><div className="s-sub">Invested amount</div></div>
            <div className="kpi green"><div className="s-label">Unrealised Gain</div><div className="s-value" style={{color:'#1B873F'}}>₹ 1.55 Cr</div><div className="s-sub">+3.76%</div></div>
            <div className="kpi"><div className="s-label">Avg Ann. Return</div><div className="s-value">6.94%</div><div className="s-sub">Weighted average</div></div>
            <div className="kpi purple"><div className="s-label">IDCW (FYTD)</div><div className="s-value">₹ 22.4 L</div></div>
          </div>

          {/* Portfolio allocation bar */}
          <div className="card-gold" style={{marginBottom:'14px'}}>
            <div style={{fontSize:'11px',fontWeight:700,color:'#1F3864',marginBottom:'6px'}}>Category Allocation</div>
            <div className="cat-bar">
              <div className="cat-bar-seg" style={{flex:'42.5',background:'#1B873F'}}>Liquid 42.5%</div>
              <div className="cat-bar-seg" style={{flex:'24.8',background:'#1F3864'}}>UST 24.8%</div>
              <div className="cat-bar-seg" style={{flex:'19.9',background:'#0B5B98'}}>ON 19.9%</div>
              <div className="cat-bar-seg" style={{flex:'12.8',background:'#6A1B9A'}}>ST 12.8%</div>
            </div>
            <div style={{display:'flex',gap:'16px',fontSize:'10.5px',color:'#6b7385'}}>
              <span style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'10px',background:'#1B873F',borderRadius:'2px',display:'inline-block'}}></span>Liquid</span>
              <span style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'10px',background:'#1F3864',borderRadius:'2px',display:'inline-block'}}></span>Ultra Short Term</span>
              <span style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'10px',background:'#0B5B98',borderRadius:'2px',display:'inline-block'}}></span>Overnight</span>
              <span style={{display:'flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'10px',background:'#6A1B9A',borderRadius:'2px',display:'inline-block'}}></span>Short Term</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {TABS.map((t, i) => (
              <div key={i} className={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</div>
            ))}
          </div>

          {/* Holdings Table */}
          <div className="card">
            <div className="card-title">Scheme-wise Valuation (As on 19-Apr-2026)</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Category</th>
                    <th className="num">Units</th>
                    <th className="num">Avg Cost/Unit</th>
                    <th className="num">Current NAV</th>
                    <th className="num">Cost (₹ Cr)</th>
                    <th className="num">Mkt Value (₹ Cr)</th>
                    <th className="num">Abs Return %</th>
                    <th className="num">Ann. Return</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h, i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600}}>{h.scheme}</td>
                      <td><span className={`badge ${h.catClass}`}>{h.cat}</span></td>
                      <td className="num">{h.units}</td>
                      <td className="num">{h.avgCost}</td>
                      <td className="num">{h.nav}</td>
                      <td className="num">{h.costCr}</td>
                      <td className="num" style={{fontWeight:600}}>{h.mktCr}</td>
                      <td className="num" style={{color: h.retPos ? '#1B873F' : '#C62828'}}>{h.absRet}</td>
                      <td className="num" style={{color:'#1F3864',fontWeight:600}}>{h.annRet}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="tfoot-row">
                    <td colSpan={5} style={{fontWeight:700}}>TOTAL</td>
                    <td className="num" style={{fontWeight:700}}>41.25</td>
                    <td className="num" style={{fontWeight:700}}>42.80</td>
                    <td className="num" style={{color:'#1B873F',fontWeight:700}}>3.76%</td>
                    <td className="num" style={{fontWeight:700}}>6.94%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* AMC Concentration */}
          <div className="card">
            <div className="card-title">AMC Concentration vs Policy Limits</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>AMC</th>
                  <th className="num">AUM (₹ Cr)</th>
                  <th className="num">% Share</th>
                  <th className="num">Policy Cap</th>
                  <th className="num">Headroom</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SBI Mutual Fund</td>
                  <td className="num">12.40</td>
                  <td className="num">29.0%</td>
                  <td className="num">30%</td>
                  <td className="num" style={{color:'#E08E0B',fontWeight:600}}>1.0%</td>
                  <td><span className="badge b-pending">Near Cap</span></td>
                </tr>
                <tr>
                  <td>HDFC Mutual Fund</td>
                  <td className="num">9.80</td>
                  <td className="num">22.9%</td>
                  <td className="num">30%</td>
                  <td className="num">7.1%</td>
                  <td><span className="badge b-approved">OK</span></td>
                </tr>
                <tr>
                  <td>ICICI Prudential AMC</td>
                  <td className="num">8.20</td>
                  <td className="num">19.2%</td>
                  <td className="num">30%</td>
                  <td className="num">10.8%</td>
                  <td><span className="badge b-approved">OK</span></td>
                </tr>
                <tr>
                  <td>Kotak Mahindra AMC</td>
                  <td className="num">6.50</td>
                  <td className="num">15.2%</td>
                  <td className="num">30%</td>
                  <td className="num">14.8%</td>
                  <td><span className="badge b-approved">OK</span></td>
                </tr>
                <tr>
                  <td>Aditya Birla Sun Life MF</td>
                  <td className="num">5.90</td>
                  <td className="num">13.8%</td>
                  <td className="num">30%</td>
                  <td className="num">16.2%</td>
                  <td><span className="badge b-approved">OK</span></td>
                </tr>
              </tbody>
            </table>
            <div className="callout warn" style={{marginTop:'10px'}}>
              ⚠ SBI MF concentration at 29% — policy cap 30%. Monitor before fresh purchase.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}