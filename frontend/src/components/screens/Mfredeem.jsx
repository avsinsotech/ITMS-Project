import { useState } from 'react';
import { TrendingDown } from 'lucide-react';
import { TXN_STYLES } from "../../TxnStyles";

const FIFO_ROWS = [
  { date: '15-Jun-2025', units: '1,500.00', cost: '982.45',  sale: '1,012.80', hold: '10 mo', gain: '45,525', type: 'STCG' },
  { date: '22-Aug-2025', units: '1,462.15', cost: '988.12',  sale: '1,012.80', hold: '8 mo',  gain: '36,085', type: 'STCG' },
];

export default function Mfredeem({ onNavigate }) {
  const [form, setForm] = useState({
    redeemId:   'MF-R-2026-0056',
    scheme:     'HDFC Liquid Fund - Direct - Growth',
    folio:      '55667788',
    redeemType: 'By Amount',
    amtUnits:   '30,00,000',
    nav:        '1,012.80',
    units:      '2,962.15',
    exitLoad:   '0.00 (Nil after 7 days)',
    bank:       'Current A/c - 000101234567',
    settlement: 'T+1 (20-Apr-2026)',
    tds:        'No (Bank - DDT exempt)',
    reason:     'Cash Flow Need',
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <>
      <style>{TXN_STYLES}</style>
      <div className="txn-root">

        {/* Header */}
        <div className="txn-header">
          <div>
            <div className="txn-title">
              <TrendingDown size={18} />
              Redemption
              <span className="txn-chip">TXN</span>
            </div>
            <div className="txn-breadcrumb">Home › Transactions › Redemption</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('mf_dashboard')}>← Back</button>
          </div>
        </div>

        <div className="txn-body">

          {submitted && (
            <div className="toast ok">✓ Redemption submitted to Checker. Ref: MF-R-2026-0056</div>
          )}

          {/* Redemption Form */}
          <div className="card">
            <div className="card-title">Redemption Request</div>
            <div className="g3">
              <div className="field">
                <label>Redemption ID</label>
                <input className="readonly" readOnly value={form.redeemId} />
              </div>
              <div className="field">
                <label>Scheme</label>
                <select value={form.scheme} onChange={e => set('scheme', e.target.value)}>
                  <option>HDFC Liquid Fund - Direct - Growth</option>
                  <option>SBI Liquid Fund - Direct - Growth</option>
                  <option>ICICI Pru Overnight Fund - Direct - Growth</option>
                  <option>Kotak Savings Fund - Direct - Growth</option>
                </select>
              </div>
              <div className="field">
                <label>Folio No.</label>
                <input value={form.folio} onChange={e => set('folio', e.target.value)} />
              </div>

              <div className="field">
                <label>Redemption Type</label>
                <select value={form.redeemType} onChange={e => set('redeemType', e.target.value)}>
                  <option>By Amount</option>
                  <option>By Units</option>
                  <option>Full Redemption</option>
                </select>
              </div>
              <div className="field">
                <label>Amount / Units</label>
                <input value={form.amtUnits} onChange={e => set('amtUnits', e.target.value)} />
              </div>
              <div className="field">
                <label>Applicable NAV</label>
                <input className="readonly" readOnly value={form.nav} />
              </div>

              <div className="field">
                <label>Est. Units Redeemed</label>
                <input className="readonly" readOnly value={form.units} />
              </div>
              <div className="field">
                <label>Exit Load</label>
                <input className="readonly" readOnly value={form.exitLoad} />
              </div>
              <div className="field">
                <label>Bank A/c (Credit)</label>
                <select value={form.bank} onChange={e => set('bank', e.target.value)}>
                  <option>Current A/c - 000101234567</option>
                  <option>Current A/c - 000201234568</option>
                </select>
              </div>

              <div className="field">
                <label>Expected Settlement</label>
                <input className="readonly" readOnly value={form.settlement} />
              </div>
              <div className="field">
                <label>TDS Applicable?</label>
                <select value={form.tds} onChange={e => set('tds', e.target.value)}>
                  <option>No (Bank - DDT exempt)</option>
                  <option>Yes – 10% on STCG</option>
                </select>
              </div>
              <div className="field">
                <label>Reason / Purpose</label>
                <select value={form.reason} onChange={e => set('reason', e.target.value)}>
                  <option>Cash Flow Need</option>
                  <option>Rebalance</option>
                  <option>Policy Breach Correction</option>
                </select>
              </div>
            </div>
          </div>

          {/* FIFO Gain/Loss Preview */}
          <div className="card">
            <div className="card-title">Gain / Loss Preview (FIFO Method)</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Purchase Date</th>
                  <th className="num">Units Used</th>
                  <th className="num">Cost / Unit (₹)</th>
                  <th className="num">Sale / Unit (₹)</th>
                  <th>Holding</th>
                  <th className="num">Gain (₹)</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {FIFO_ROWS.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td className="num">{r.units}</td>
                    <td className="num">{r.cost}</td>
                    <td className="num">{r.sale}</td>
                    <td>{r.hold}</td>
                    <td className="num col-green">{r.gain}</td>
                    <td><span className="badge b-info">{r.type}</span></td>
                  </tr>
                ))}
                <tr className="tfoot-row">
                  <td>TOTAL</td>
                  <td className="num">2,962.15</td>
                  <td className="num">—</td>
                  <td className="num">—</td>
                  <td>—</td>
                  <td className="num col-green">81,610</td>
                  <td>STCG</td>
                </tr>
              </tbody>
            </table>

            <div className="callout" style={{ marginTop: 12 }}>
              All units &lt; 24 months → Short Term Capital Gain. Taxed at slab rate (for banks, part of normal business income).
            </div>

            <div className="actions">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-gold" onClick={() => setSubmitted(true)}>Submit to Checker</button>
            </div>
          </div>

        </div>
        <div className="txn-footer">
          AVS InSoTech Private Limited | Investment &amp; Treasury Management System – Mutual Funds Module v1.0 | © 2026
        </div>
      </div>
    </>
  );
}