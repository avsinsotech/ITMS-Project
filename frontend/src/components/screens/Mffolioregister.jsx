import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const folios = [
  { folio: '12345678', amc: 'SBI MF',    scheme: 'SBI Liquid Fund',     plan: 'G',    units: '24,886.18', nav: '4,012.45', mktVal: '9,85,42,380', cost: '9,70,00,000', pl: '+15,42,380',    plPos: true },
  { folio: '55667788', amc: 'HDFC MF',   scheme: 'HDFC Liquid Fund',    plan: 'IDCW', units: '9,870.45',  nav: '1,012.80', mktVal: '9,99,25,160', cost: '9,68,50,000', pl: '+30,75,160',    plPos: true },
  { folio: '11223344', amc: 'SBI MF',    scheme: 'SBI Ultra Short Dur', plan: 'G',    units: '5,927.14',  nav: '421.78',   mktVal: '2,50,00,000', cost: '2,38,00,000', pl: '+12,00,000',    plPos: true },
  { folio: '99887766', amc: 'Kotak MF',  scheme: 'Kotak Savings Fund',  plan: 'G',    units: '15,420.82', nav: '42.18',    mktVal: '6,50,45,345', cost: '6,30,00,000', pl: '+20,45,345',    plPos: true },
  { folio: '33445566', amc: 'ICICI MF',  scheme: 'ICICI Pru Overnight', plan: 'G',    units: '62,888.42', nav: '1,352.20', mktVal: '8,50,00,000', cost: '8,38,00,000', pl: '+12,00,000',    plPos: true },
  { folio: '66778899', amc: 'ABSL MF',   scheme: 'ABSL Low Duration',   plan: 'G',    units: '9,708.32',  nav: '618.55',   mktVal: '6,00,82,560', cost: '5,81,00,000', pl: '+19,82,560',    plPos: true },
];

export default function Mffolioregister({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [filterAMC, setFilterAMC] = useState('All');

  const filtered = folios.filter(f =>
    (filterAMC === 'All' || f.amc === filterAMC) &&
    (f.scheme.toLowerCase().includes(search.toLowerCase()) ||
     f.folio.includes(search))
  );

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .mf-folio-filters { display:flex; gap:10px; align-items:center; margin-bottom:14px; }
        .mf-folio-filters input { flex:1; padding:7px 10px; border:1px solid #D8DDE5; border-radius:4px; font-size:12px; }
        .mf-folio-filters select { padding:7px 10px; border:1px solid #D8DDE5; border-radius:4px; font-size:12px; background:#fff; }
        .folio-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
      `}</style>
      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">Folio Register <span className="txn-chip">PORTFOLIO</span></h2>
            <div className="txn-breadcrumb">Home › Portfolio › Folios</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export Folio Register</button>
            <button className="btn btn-primary">Reconcile with RTA</button>
          </div>
        </div>

        <div className="txn-body">
          {/* KPI Summary */}
          <div className="folio-kpi-row">
            <div className="kpi"><div className="s-label">Total Folios</div><div className="s-value">18</div></div>
            <div className="kpi green"><div className="s-label">Total Market Value</div><div className="s-value">₹ 42.80 Cr</div></div>
            <div className="kpi alt"><div className="s-label">Total Cost Basis</div><div className="s-value">₹ 41.25 Cr</div></div>
            <div className="kpi"><div className="s-label">Unrealised Gain</div><div className="s-value" style={{color:'#1B873F'}}>₹ 1.55 Cr</div></div>
          </div>

          {/* Filters */}
          <div className="mf-folio-filters">
            <input
              placeholder="Search scheme or folio no..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={filterAMC} onChange={e => setFilterAMC(e.target.value)}>
              <option>All</option>
              <option>SBI MF</option>
              <option>HDFC MF</option>
              <option>ICICI MF</option>
              <option>Kotak MF</option>
              <option>ABSL MF</option>
            </select>
          </div>

          {/* Folio Table */}
          <div className="card">
            <div className="card-title">Folio-wise Summary</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Folio No.</th>
                    <th>AMC</th>
                    <th>Scheme</th>
                    <th>Plan</th>
                    <th className="num">Current Units</th>
                    <th className="num">Latest NAV</th>
                    <th className="num">Market Value (₹)</th>
                    <th className="num">Cost Basis (₹)</th>
                    <th className="num">Unrealised P/L (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f, i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600,color:'#1F3864'}}>{f.folio}</td>
                      <td>{f.amc}</td>
                      <td>{f.scheme}</td>
                      <td>
                        <span className={f.plan === 'IDCW' ? 'badge b-idcw' : 'badge b-growth'}>{f.plan}</span>
                      </td>
                      <td className="num">{f.units}</td>
                      <td className="num">{f.nav}</td>
                      <td className="num">{f.mktVal}</td>
                      <td className="num">{f.cost}</td>
                      <td className="num" style={{color: f.plPos ? '#1B873F' : '#C62828', fontWeight:600}}>{f.pl}</td>
                      <td>
                        <button className="btn btn-ghost" style={{padding:'4px 10px',fontSize:'11px'}}
                          onClick={() => onNavigate && onNavigate('mf_holdings')}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="tfoot-row">
                    <td colSpan={6} style={{fontWeight:700}}>TOTAL</td>
                    <td className="num" style={{fontWeight:700}}>₹ 42,85,95,445</td>
                    <td className="num" style={{fontWeight:700}}>₹ 41,25,50,000</td>
                    <td className="num" style={{fontWeight:700,color:'#1B873F'}}>+₹ 1,10,45,065</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="callout ok" style={{marginTop:'12px'}}>
              ✓ Reconciled with RTA (CAMS + KFintech) as on 19-Apr-2026. All folios matched.
            </div>
          </div>

          {/* RTA Reconciliation Status */}
          <div className="card">
            <div className="card-title">RTA Reconciliation Status</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>RTA</th>
                  <th>AMCs Covered</th>
                  <th className="num">Folios in System</th>
                  <th className="num">Folios in RTA</th>
                  <th>Last Sync</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CAMS</td>
                  <td>SBI MF, HDFC MF, ICICI MF</td>
                  <td className="num">10</td>
                  <td className="num">10</td>
                  <td>19-Apr-2026 09:15 AM</td>
                  <td><span className="badge b-approved">Matched</span></td>
                </tr>
                <tr>
                  <td>KFintech</td>
                  <td>Kotak MF, ABSL MF</td>
                  <td className="num">8</td>
                  <td className="num">8</td>
                  <td>19-Apr-2026 09:18 AM</td>
                  <td><span className="badge b-approved">Matched</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}