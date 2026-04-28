import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { TXN_STYLES } from "../../TxnStyles";

const ACTIVE_SIPS = [
  { id: 'SIP-2026-001', scheme: 'SBI Liquid Fund',    amount: '2,00,000', freq: 'Monthly',  next: '05-May-26', done: '3 / 24',   status: 'Active',  badge: 'b-approved' },
  { id: 'SIP-2026-002', scheme: 'ICICI Overnight',    amount: '1,50,000', freq: 'Weekly',   next: '22-Apr-26', done: '12 / 104', status: 'Active',  badge: 'b-approved' },
  { id: 'SIP-2026-003', scheme: 'Kotak Savings Fund', amount: '50,000',   freq: 'Monthly',  next: '10-May-26', done: '3 / 36',   status: 'Active',  badge: 'b-approved' },
  { id: 'SIP-2026-004', scheme: 'ABSL Low Duration',  amount: '75,000',   freq: 'Monthly',  next: '15-May-26', done: '2 / 24',   status: 'Pending', badge: 'b-pending'  },
];

export default function Mfsip({ onNavigate }) {
  const [form, setForm] = useState({
    sipId:    'SIP-2026-008',
    scheme:   'HDFC Short Term Debt Fund - Growth',
    folio:    '98765432',
    amount:   '1,00,000',
    freq:     'Monthly',
    sipDate:  '5',
    start:    '2026-05-05',
    end:      '2029-05-05',
    instalments: '36',
    mandate:  'NACH / ECS',
    bank:     'Current A/c - 000101234567',
    topup:    'None',
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
              <Repeat size={18} />
              SIP Setup &amp; Mandate
              <span className="txn-chip">SIP</span>
            </div>
            <div className="txn-breadcrumb">Home › Transactions › SIP</div>
          </div>
          <div className="txn-header-btns">
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('mf_dashboard')}>← Back</button>
          </div>
        </div>

        <div className="txn-body">

          {submitted && (
            <div className="toast ok">✓ SIP submitted for approval. Ref: SIP-2026-008</div>
          )}

          {/* New SIP Form */}
          <div className="card">
            <div className="card-title">Create New SIP</div>
            <div className="g3">
              <div className="field">
                <label>SIP Ref ID</label>
                <input className="readonly" readOnly value={form.sipId} />
              </div>
              <div className="field">
                <label>Scheme <span className="req">*</span></label>
                <select value={form.scheme} onChange={e => set('scheme', e.target.value)}>
                  <option>HDFC Short Term Debt Fund - Growth</option>
                  <option>SBI Liquid Fund - Direct - Growth</option>
                  <option>Kotak Savings Fund - Direct - Growth</option>
                  <option>ICICI Pru Overnight Fund - Direct - Growth</option>
                </select>
              </div>
              <div className="field">
                <label>Folio No.</label>
                <input value={form.folio} onChange={e => set('folio', e.target.value)} />
              </div>

              <div className="field">
                <label>SIP Amount (₹) <span className="req">*</span></label>
                <input value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
              <div className="field">
                <label>Frequency</label>
                <select value={form.freq} onChange={e => set('freq', e.target.value)}>
                  <option>Monthly</option>
                  <option>Fortnightly</option>
                  <option>Weekly</option>
                  <option>Quarterly</option>
                </select>
              </div>
              <div className="field">
                <label>SIP Date</label>
                <select value={form.sipDate} onChange={e => set('sipDate', e.target.value)}>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>25</option>
                </select>
              </div>

              <div className="field">
                <label>Start Date</label>
                <input type="date" value={form.start} onChange={e => set('start', e.target.value)} />
              </div>
              <div className="field">
                <label>End Date / Tenure</label>
                <input type="date" value={form.end} onChange={e => set('end', e.target.value)} />
              </div>
              <div className="field">
                <label>No. of Instalments</label>
                <input className="readonly" readOnly value={form.instalments} />
              </div>

              <div className="field">
                <label>Mandate Type</label>
                <select value={form.mandate} onChange={e => set('mandate', e.target.value)}>
                  <option>NACH / ECS</option>
                  <option>Standing Instruction</option>
                  <option>UPI Autopay</option>
                </select>
              </div>
              <div className="field">
                <label>Bank A/c (Debit)</label>
                <select value={form.bank} onChange={e => set('bank', e.target.value)}>
                  <option>Current A/c - 000101234567</option>
                  <option>Current A/c - 000201234568</option>
                </select>
              </div>
              <div className="field">
                <label>Top-Up (Optional)</label>
                <select value={form.topup} onChange={e => set('topup', e.target.value)}>
                  <option>None</option>
                  <option>10% Annual</option>
                  <option>Fixed ₹</option>
                </select>
              </div>
            </div>

            <div className="callout">
              Total Committed: <b>₹ 36,00,000</b> over {form.instalments} months |
              First NACH debit on <b>05-May-2026</b>
            </div>

            <div className="actions">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary">Validate with RTA</button>
              <button className="btn btn-gold" onClick={() => setSubmitted(true)}>Submit for Approval</button>
            </div>
          </div>

          {/* Active SIPs */}
          <div className="card">
            <div className="card-title">Active SIPs</div>
            <table className="txn-table">
              <thead>
                <tr>
                  <th>SIP ID</th>
                  <th>Scheme</th>
                  <th className="num">Amount (₹)</th>
                  <th>Freq</th>
                  <th>Next Date</th>
                  <th className="num">Instalments Done</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVE_SIPS.map((s, i) => (
                  <tr key={i}>
                    <td className="col-navy">{s.id}</td>
                    <td>{s.scheme}</td>
                    <td className="num">{s.amount}</td>
                    <td>{s.freq}</td>
                    <td>{s.next}</td>
                    <td className="num">{s.done}</td>
                    <td><span className={`badge ${s.badge}`}>{s.status}</span></td>
                    <td>
                      <button className="btn btn-ghost" style={{ padding: '3px 10px', fontSize: '11px' }}>
                        Pause
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        <div className="txn-footer">
          AVS InSoTech Private Limited | Investment &amp; Treasury Management System – Mutual Funds Module v1.0 | © 2026
        </div>
      </div>
    </>
  );
}