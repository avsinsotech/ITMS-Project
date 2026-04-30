import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { TXN_STYLES } from "../../TxnStyles";

export default function Mfswitch({ onNavigate }) {
  const [outForm, setOut] = useState({
    scheme:     'SBI Magnum Ultra Short Duration Fund',
    folio:      '11223344',
    switchType: 'By Amount',
    amount:     '25,00,000',
    units:      '5,927.14',
    nav:        '421.78',
    exitLoad:   '0.00',
  });
  const [inForm, setIn] = useState({
    target:  'SBI Short Term Debt Fund',
    folio:   'Use Same Folio',
    plan:    'Direct - Growth',
    netAmt:  '25,00,000',
    nav:     '28.4512',
    units:   '87,870.12',
  });
  const [submitted, setSubmitted] = useState(false);
  const setO = (k, v) => setOut(p => ({ ...p, [k]: v }));
  const setI = (k, v) => setIn(p => ({ ...p, [k]: v }));

  return (
    <>
      <style>{TXN_STYLES}</style>
      <div className="txn-root">

        {/* Header */}
        <div className="txn-header">
          <div>
            <div className="txn-title">
              <ArrowLeftRight size={18} />
              Switch Transaction
              <span className="txn-chip">TXN</span>
            </div>
            <div className="txn-breadcrumb">Home › Transactions › Switch</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('mf_dashboard')}>← Back</button>
          </div>
        </div>

        <div className="txn-body">

          {submitted && (
            <div className="toast ok">✓ Switch transaction submitted for approval. Ref: MF-SW-2026-0019</div>
          )}

          {/* Info banner */}
          <div className="callout warn">
            ⚠ <b>Switch = Redemption + Purchase</b> in same AMC. STCG/LTCG applies on the redemption leg. Exit load may apply.
          </div>

          {/* Switch Details */}
          <div className="card">
            <div className="card-title">Switch Details</div>
            <div className="g2-col">

              {/* SWITCH-OUT */}
              <div>
                <div className="section-label red">SWITCH-OUT (Source)</div>
                <div className="field">
                  <label>Source Scheme</label>
                  <select value={outForm.scheme} onChange={e => setO('scheme', e.target.value)}>
                    <option>SBI Magnum Ultra Short Duration Fund</option>
                    <option>SBI Liquid Fund - Direct - Growth</option>
                  </select>
                </div>
                <div className="field">
                  <label>Folio No.</label>
                  <input className="readonly" readOnly value={outForm.folio} />
                </div>
                <div className="field">
                  <label>Switch-Out Type</label>
                  <select value={outForm.switchType} onChange={e => setO('switchType', e.target.value)}>
                    <option>By Amount</option>
                    <option>By Units</option>
                    <option>Full Redemption</option>
                  </select>
                </div>
                <div className="field">
                  <label>Amount (₹)</label>
                  <input value={outForm.amount} onChange={e => setO('amount', e.target.value)} />
                </div>
                <div className="field">
                  <label>Units (Est.)</label>
                  <input className="readonly" readOnly value={outForm.units} />
                </div>
                <div className="field">
                  <label>Applicable NAV</label>
                  <input className="readonly" readOnly value={outForm.nav} />
                </div>
                <div className="field">
                  <label>Exit Load (₹)</label>
                  <input className="readonly" readOnly value={outForm.exitLoad} />
                  <div className="hint">Nil — held &gt; 7 days</div>
                </div>
              </div>

              {/* SWITCH-IN */}
              <div>
                <div className="section-label green">SWITCH-IN (Destination)</div>
                <div className="field">
                  <label>Target Scheme (Same AMC)</label>
                  <select value={inForm.target} onChange={e => setI('target', e.target.value)}>
                    <option>SBI Short Term Debt Fund</option>
                    <option>SBI Savings Fund</option>
                    <option>SBI Banking &amp; PSU Fund</option>
                  </select>
                </div>
                <div className="field">
                  <label>Folio</label>
                  <select value={inForm.folio} onChange={e => setI('folio', e.target.value)}>
                    <option>Use Same Folio</option>
                    <option>New Folio</option>
                  </select>
                </div>
                <div className="field">
                  <label>Plan</label>
                  <select value={inForm.plan} onChange={e => setI('plan', e.target.value)}>
                    <option>Direct - Growth</option>
                    <option>Direct - IDCW Payout</option>
                    <option>Direct - IDCW Reinvest</option>
                  </select>
                </div>
                <div className="field">
                  <label>Net Switch Amount (₹)</label>
                  <input className="readonly" readOnly value={inForm.netAmt} />
                </div>
                <div className="field">
                  <label>Target NAV</label>
                  <input className="readonly" readOnly value={inForm.nav} />
                </div>
                <div className="field">
                  <label>Est. Units Allotted</label>
                  <input className="readonly" readOnly value={inForm.units} />
                </div>
              </div>
            </div>

            {/* Tax Impact */}
            <div className="card-gold" style={{ marginTop: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#1F3864',
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ width: 4, height: 12, background: '#C8A000', borderRadius: 2, display: 'inline-block' }} />
                Tax Impact (on Switch-Out)
              </div>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="s-label">Cost of Acquisition</div>
                  <div className="s-value">₹ 23,80,000</div>
                </div>
                <div className="summary-item">
                  <div className="s-label">Sale Proceeds</div>
                  <div className="s-value">₹ 25,00,000</div>
                </div>
                <div className="summary-item">
                  <div className="s-label">Holding Period</div>
                  <div className="s-value amber">8 months (STCG)</div>
                </div>
                <div className="summary-item">
                  <div className="s-label">Capital Gain</div>
                  <div className="s-value green" style={{ fontSize: 18 }}>₹ 1,20,000</div>
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-gold" onClick={() => setSubmitted(true)}>Submit for Approval</button>
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