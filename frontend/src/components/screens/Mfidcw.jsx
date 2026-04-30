import React, { useState } from 'react';
import { TXN_STYLES } from '../../TxnStyles';

const idcwRecords = [
  {
    recordDate: '15-Apr-2026',
    scheme: 'HDFC Liquid Fund - IDCW',
    folio: '55667788',
    units: '9,870.45',
    idcwUnit: '2.4500',
    gross: '24,183',
    mode: 'Payout',
    status: 'Credited',
    tds: '2,418',
    net: '21,765',
  },
  {
    recordDate: '10-Apr-2026',
    scheme: 'ICICI Pru Money Market - IDCW',
    folio: '77889900',
    units: '8,200.00',
    idcwUnit: '1.8000',
    gross: '14,760',
    mode: 'Reinvest',
    status: 'Units Credited',
    tds: '—',
    net: '14,760',
  },
  {
    recordDate: '05-Apr-2026',
    scheme: 'Kotak Money Market - IDCW',
    folio: '33445566',
    units: '5,500.10',
    idcwUnit: '1.6500',
    gross: '9,075',
    mode: 'Payout',
    status: 'Pending',
    tds: '908',
    net: '8,167',
  },
  {
    recordDate: '01-Apr-2026',
    scheme: 'SBI Liquid Fund - IDCW',
    folio: '12345678',
    units: '24,886.18',
    idcwUnit: '0.9800',
    gross: '24,388',
    mode: 'Payout',
    status: 'Credited',
    tds: '2,439',
    net: '21,949',
  },
];

export default function MfIdcw({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['All IDCW', 'Payout', 'Reinvestment', 'Pending'];

  const filtered = idcwRecords.filter(r => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return r.mode === 'Payout';
    if (activeTab === 2) return r.mode === 'Reinvest';
    if (activeTab === 3) return r.status === 'Pending';
    return true;
  });

  return (
    <>
      <style>{TXN_STYLES}</style>
      <style>{`
        .idcw-kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
        .kpi .s-label { font-size:10.5px; color:#6b7385; text-transform:uppercase; letter-spacing:.5px; font-weight:600; }
        .kpi .s-value { font-size:19px; font-weight:700; color:#1F3864; margin-top:4px; }
        .kpi-purple { border-left-color:#6A1B9A !important; }
        .idcw-record-form .g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
      `}</style>
      <div className="txn-root">
        <div className="txn-header">
          <div>
            <h2 className="txn-title">IDCW / Dividend Management <span className="txn-chip">INCOME</span></h2>
            <div className="txn-breadcrumb">Home › Portfolio › IDCW</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost">Export IDCW Register</button>
            <button className="btn btn-primary">Record IDCW</button>
          </div>
        </div>

        <div className="txn-body">
          {/* KPI Strip */}
          <div className="idcw-kpi-row">
            <div className="kpi green">
              <div className="s-label">IDCW Received (FYTD)</div>
              <div className="s-value" style={{color:'#1B873F'}}>₹ 22.4 L</div>
            </div>
            <div className="kpi">
              <div className="s-label">IDCW Reinvested</div>
              <div className="s-value">₹ 8.5 L</div>
            </div>
            <div className="kpi alt">
              <div className="s-label">IDCW Payout</div>
              <div className="s-value">₹ 13.9 L</div>
            </div>
            <div className="kpi kpi-purple" style={{borderLeftColor:'#6A1B9A'}}>
              <div className="s-label">Pending Credit</div>
              <div className="s-value" style={{color:'#E08E0B'}}>₹ 2.1 L</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {tabs.map((t, i) => (
              <div key={i} className={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{t}</div>
            ))}
          </div>

          {/* IDCW Register Table */}
          <div className="card">
            <div className="card-title">IDCW Declarations & Receipts</div>
            <div style={{overflowX:'auto'}}>
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>Record Date</th>
                    <th>Scheme</th>
                    <th>Folio</th>
                    <th className="num">Units Held</th>
                    <th className="num">IDCW / Unit (₹)</th>
                    <th className="num">Gross Amount (₹)</th>
                    <th className="num">TDS (₹)</th>
                    <th className="num">Net Amount (₹)</th>
                    <th>Mode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={i}>
                      <td>{r.recordDate}</td>
                      <td style={{fontWeight:600}}>{r.scheme}</td>
                      <td>{r.folio}</td>
                      <td className="num">{r.units}</td>
                      <td className="num">{r.idcwUnit}</td>
                      <td className="num" style={{fontWeight:600}}>{r.gross}</td>
                      <td className="num" style={{color:'#C62828'}}>{r.tds}</td>
                      <td className="num" style={{color:'#1B873F',fontWeight:600}}>{r.net}</td>
                      <td>
                        <span className={r.mode === 'Reinvest' ? 'badge b-info' : 'badge b-idcw'}>{r.mode}</span>
                      </td>
                      <td>
                        <span className={
                          r.status === 'Credited' || r.status === 'Units Credited' ? 'badge b-approved' :
                          r.status === 'Pending' ? 'badge b-pending' : 'badge b-info'
                        }>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="tfoot-row">
                    <td colSpan={5} style={{fontWeight:700}}>FYTD TOTAL</td>
                    <td className="num" style={{fontWeight:700}}>72,406</td>
                    <td className="num" style={{color:'#C62828',fontWeight:700}}>5,765</td>
                    <td className="num" style={{color:'#1B873F',fontWeight:700}}>66,641</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="callout warn" style={{marginTop:'12px'}}>
              ⚠ <strong>Finance Act 2020:</strong> IDCW is taxable in hands of investor. For banks, treated as Other Income; TDS @ 10% above ₹ 5,000 threshold.
            </div>
          </div>

          {/* Record IDCW Form */}
          <div className="card">
            <div className="card-title">Record New IDCW</div>
            <div className="idcw-record-form">
              <div className="g3">
                <div className="field">
                  <label>Scheme <span style={{color:'#C62828'}}>*</span></label>
                  <select>
                    <option>HDFC Liquid Fund - Direct - IDCW</option>
                    <option>ICICI Pru Money Market - IDCW</option>
                    <option>Kotak Money Market - IDCW</option>
                  </select>
                </div>
                <div className="field">
                  <label>Folio No. <span style={{color:'#C62828'}}>*</span></label>
                  <input placeholder="Enter folio number" />
                </div>
                <div className="field">
                  <label>Record Date <span style={{color:'#C62828'}}>*</span></label>
                  <input type="date" defaultValue="2026-04-19" />
                </div>
                <div className="field">
                  <label>IDCW per Unit (₹) <span style={{color:'#C62828'}}>*</span></label>
                  <input type="number" placeholder="e.g. 2.45" />
                </div>
                <div className="field">
                  <label>Mode <span style={{color:'#C62828'}}>*</span></label>
                  <select>
                    <option>Payout</option>
                    <option>Reinvestment</option>
                  </select>
                </div>
                <div className="field">
                  <label>Payment Date</label>
                  <input type="date" defaultValue="2026-04-22" />
                </div>
                <div className="field">
                  <label>Gross Amount (₹)</label>
                  <input className="readonly" readOnly placeholder="Auto-computed" />
                </div>
                <div className="field">
                  <label>TDS Applicable?</label>
                  <select>
                    <option>Yes – 10% above ₹5,000</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Bank A/c (Credit)</label>
                  <select>
                    <option>Current A/c – 000101234567</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-gold">Save & Submit to Checker</button>
            </div>
          </div>

          {/* TDS Summary */}
          <div className="card">
            <div className="card-title">TDS Summary (FYTD)</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Scheme</th>
                  <th className="num">Gross IDCW (₹)</th>
                  <th className="num">TDS Deducted (₹)</th>
                  <th className="num">Net Received (₹)</th>
                  <th>TDS Cert. (26AS)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HDFC Liquid Fund</td>
                  <td className="num">24,183</td>
                  <td className="num" style={{color:'#C62828'}}>2,418</td>
                  <td className="num" style={{color:'#1B873F'}}>21,765</td>
                  <td><span className="badge b-approved">Available</span></td>
                </tr>
                <tr>
                  <td>SBI Liquid Fund</td>
                  <td className="num">24,388</td>
                  <td className="num" style={{color:'#C62828'}}>2,439</td>
                  <td className="num" style={{color:'#1B873F'}}>21,949</td>
                  <td><span className="badge b-approved">Available</span></td>
                </tr>
                <tr>
                  <td>Kotak Money Market</td>
                  <td className="num">9,075</td>
                  <td className="num" style={{color:'#C62828'}}>908</td>
                  <td className="num" style={{color:'#E08E0B'}}>8,167</td>
                  <td><span className="badge b-pending">Pending</span></td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="tfoot-row">
                  <td style={{fontWeight:700}}>TOTAL</td>
                  <td className="num" style={{fontWeight:700}}>57,646</td>
                  <td className="num" style={{fontWeight:700,color:'#C62828'}}>5,765</td>
                  <td className="num" style={{fontWeight:700,color:'#1B873F'}}>51,881</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}