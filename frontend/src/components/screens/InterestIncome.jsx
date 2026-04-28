import React from 'react';
import { CircleDollarSign } from 'lucide-react';

export default function InterestIncome() {
  return (
    <div>
      <div className="report-cards-5">
        <div className="report-card"><div className="rc-label">Interest (Apr 2026)</div><div className="rc-value">₹58.44 L</div></div>
        <div className="report-card"><div className="rc-label">Accrued YTD</div><div className="rc-value">₹5.92 Cr</div></div>
        <div className="report-card"><div className="rc-label">Received YTD</div><div className="rc-value">₹4.86 Cr</div></div>
        <div className="report-card"><div className="rc-label">MF IDCW Income</div><div className="rc-value">₹14.20 L</div></div>
        <div className="report-card"><div className="rc-label">Avg Portfolio Yield</div><div className="rc-value">7.24%</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CircleDollarSign size={16} /> Interest / Income Statement — All Instruments
          </span>
          <select className="form-select" style={{ width: '130px' }}>
            <option>April 2026</option><option>FY 2025-26</option>
          </select>
          <button className="btn-sm gold">Export</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Instrument</th><th>Type</th><th>Amount</th><th>Rate%</th><th>Accrued (₹)</th><th>Received (₹)</th><th>TDS</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>INV-001</td><td>7.26% GS 2033</td><td><span className="badge slr">G-Sec</span></td><td>₹1Cr</td><td>7.26%</td><td>₹60,500</td><td>₹1,23,000</td><td>Nil (G-Sec)</td><td><span className="badge active">Received</span></td></tr>
              <tr><td>INV-005</td><td>SBI FD #2024001</td><td><span className="badge cd">FD</span></td><td>₹1.5Cr</td><td>7.00%</td><td>₹10,50,000</td><td>₹10,50,000</td><td>₹1,05,000</td><td><span className="badge active">Received</span></td></tr>
              <tr><td>MF-001</td><td>HDFC Liquid Fund</td><td><span className="badge mf">MF</span></td><td>₹3.31Cr</td><td>7.45% (Ann.)</td><td>₹20,575</td><td>—</td><td>Nil</td><td><span className="badge pending">Accrued (NAV)</span></td></tr>
              <tr><td>CM-2604</td><td>Call Money O/N</td><td><span className="badge cm">Call</span></td><td>₹2Cr</td><td>6.60%</td><td>₹3,603</td><td>₹63,493</td><td>Nil</td><td><span className="badge active">Daily Credit</span></td></tr>
              <tr><td>CP-2601</td><td>HDFC Ltd. CP</td><td><span className="badge cp">CP</span></td><td>₹1Cr</td><td>7.85%</td><td>₹2,16,500</td><td>—</td><td>Nil</td><td><span className="badge pending">On Maturity</span></td></tr>
              <tr><td>CD-2601</td><td>Axis Bank CD</td><td><span className="badge cd">CD</span></td><td>₹1Cr</td><td>7.25%</td><td>₹3,55,000</td><td>—</td><td>Nil</td><td><span className="badge pending">On Maturity</span></td></tr>
              <tr><td>INV-006</td><td>NABARD Bond</td><td><span className="badge slr">Bond</span></td><td>₹50L</td><td>7.00%</td><td>₹29,167</td><td>—</td><td>Nil</td><td><span className="badge pending">Accrued</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
