import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { TXN_STYLES } from "../../TxnStyles";

const STEPS = [
  'Scheme Selection',
  'Purchase Details',
  'Pre-Deal Checks',
  'Checker Approval',
  'RTA Placement',
  'Allotment & GL',
];

const VALIDATIONS = [
  { label: 'Scheme approved for UCB',   detail: 'Debt-Liquid category',                        status: 'OK',       badge: 'b-approved' },
  { label: 'AMC exposure check',        detail: 'SBI: 29.0% → 30.2% after deal',               status: 'Near Cap', badge: 'b-pending'  },
  { label: 'Scheme concentration',      detail: '10.2% → 11.4% (cap 15%)',                      status: 'OK',       badge: 'b-approved' },
  { label: 'Total MF cap',             detail: '21.4% → 21.6% of total investment (cap 30%)', status: 'OK',       badge: 'b-approved' },
  { label: 'Same-day NAV eligibility',  detail: 'Funds available before 1:30 PM cut-off',       status: 'OK',       badge: 'b-approved' },
];

export default function Mfpurchase({ onNavigate }) {
  const [form, setForm] = useState({
    dealId:     'MF-P-2026-0142',
    txnDate:    '2026-04-19',
    scheme:     'SBI Liquid Fund - Direct - Growth',
    amc:        'SBI Funds Management',
    folio:      '12345678',
    mode:       'Existing Folio',
    amount:     '50,00,000',
    intent:     'AFS (Short Term)',
    payment:    'RTGS',
    nav:        '4,012.4567',
    units:      '124.622',
    cutoff:     '1:30 PM (Liquid/Overnight)',
    distributor:'Direct (No ARN)',
    bankAc:     'Current A/c - 000101234567',
    source:     'Surplus Funds',
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
              <ShoppingCart size={18} />
              MF Purchase – Lumpsum
              <span className="txn-chip">TXN</span>
            </div>
            <div className="txn-breadcrumb">Home › Transactions › Purchase</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('mf_dashboard')}>← Back</button>
          </div>
        </div>

        <div className="txn-body">

          {submitted && (
            <div className="toast ok">✓ Purchase submitted to Checker for approval. Ref: MF-P-2026-0142</div>
          )}

          {/* Stepper */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <div key={i} className={`step ${i === 0 ? 'done' : i === 1 ? 'current' : ''}`}>
                <span className="sn">{i + 1}</span>{s}
              </div>
            ))}
          </div>

          {/* Purchase Form */}
          <div className="card">
            <div className="card-title">Purchase Transaction</div>
            <div className="g3">
              {/* Row 1 */}
              <div className="field">
                <label>Deal ID</label>
                <input className="readonly" readOnly value={form.dealId} />
              </div>
              <div className="field">
                <label>Transaction Date</label>
                <input type="date" className="readonly" readOnly value={form.txnDate} />
              </div>
              <div className="field">
                <label>Scheme <span className="req">*</span></label>
                <select value={form.scheme} onChange={e => set('scheme', e.target.value)}>
                  <option>SBI Liquid Fund - Direct - Growth</option>
                  <option>HDFC Liquid Fund - Direct - Growth</option>
                  <option>ICICI Pru Overnight Fund - Direct - Growth</option>
                  <option>Kotak Savings Fund - Direct - Growth</option>
                </select>
              </div>

              {/* Row 2 */}
              <div className="field">
                <label>AMC</label>
                <input className="readonly" readOnly value={form.amc} />
              </div>
              <div className="field">
                <label>Folio No. (if existing)</label>
                <input placeholder="New if blank" value={form.folio} onChange={e => set('folio', e.target.value)} />
              </div>
              <div className="field">
                <label>Mode</label>
                <select value={form.mode} onChange={e => set('mode', e.target.value)}>
                  <option>Existing Folio</option>
                  <option>New Folio</option>
                </select>
              </div>

              {/* Row 3 */}
              <div className="field">
                <label>Purchase Amount (₹) <span className="req">*</span></label>
                <input value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
              <div className="field">
                <label>Intent Classification</label>
                <select value={form.intent} onChange={e => set('intent', e.target.value)}>
                  <option>AFS (Short Term)</option>
                  <option>HFT (Active Trading)</option>
                </select>
              </div>
              <div className="field">
                <label>Payment Mode</label>
                <select value={form.payment} onChange={e => set('payment', e.target.value)}>
                  <option>RTGS</option>
                  <option>NEFT</option>
                  <option>Cheque</option>
                </select>
              </div>

              {/* Row 4 */}
              <div className="field">
                <label>Latest NAV (Applicable)</label>
                <input className="readonly" readOnly value={form.nav} />
              </div>
              <div className="field">
                <label>Est. Units (Indicative)</label>
                <input className="readonly" readOnly value={form.units} />
                <div className="hint">Exact units allotted after T+1 confirmation</div>
              </div>
              <div className="field">
                <label>Cut-off Time</label>
                <select value={form.cutoff} onChange={e => set('cutoff', e.target.value)}>
                  <option>1:30 PM (Liquid/Overnight)</option>
                  <option>3:00 PM (Debt)</option>
                </select>
              </div>

              {/* Row 5 */}
              <div className="field">
                <label>Distributor</label>
                <select value={form.distributor} onChange={e => set('distributor', e.target.value)}>
                  <option>Direct (No ARN)</option>
                  <option>NJ India Invest</option>
                </select>
              </div>
              <div className="field">
                <label>Bank A/c (Debit)</label>
                <select value={form.bankAc} onChange={e => set('bankAc', e.target.value)}>
                  <option>Current A/c - 000101234567</option>
                  <option>Current A/c - 000201234568</option>
                </select>
              </div>
              <div className="field">
                <label>Source of Funds</label>
                <select value={form.source} onChange={e => set('source', e.target.value)}>
                  <option>Surplus Funds</option>
                  <option>SLR Adjustment</option>
                  <option>Redemption Proceeds</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pre-Deal Validation */}
          <div className="card">
            <div className="card-title">Pre-Deal Validation</div>
            <table className="txn-table">
              <tbody>
                {VALIDATIONS.map((v, i) => (
                  <tr key={i}>
                    <td>✓ {v.label}</td>
                    <td>{v.detail}</td>
                    <td><span className={`badge ${v.badge}`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="callout warn" style={{ marginTop: 12 }}>
              <b>⚠ AMC concentration approaching cap.</b> Consider diversifying to HDFC/ICICI on next purchase.
            </div>
            <div className="actions">
              <button className="btn btn-ghost">Save Draft</button>
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