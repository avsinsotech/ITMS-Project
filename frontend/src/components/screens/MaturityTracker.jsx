import React from 'react';
import { AlertCircle, AlertTriangle, Clock, CircleDollarSign } from 'lucide-react';

export default function MaturityTracker({ onNavigate, onOpenModal }) {
  return (
    <div>
      <div className="alert-banner danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertCircle size={16} /> SBI FD #FD2024001 — ₹1,50,00,000 — Maturing 18-Apr-2026 (3 days). Renewal action required immediately.
      </div>
      <div className="alert-banner warning" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertTriangle size={16} /> Call Money (Overnight) rollover decisions needed daily by 11:00 AM.
      </div>

      <div className="report-cards-5">
        <div className="report-card"><div className="rc-label">Due in 7 Days</div><div className="rc-value" style={{ color: 'var(--danger)' }}>₹5.50 Cr</div></div>
        <div className="report-card"><div className="rc-label">Due in 15 Days</div><div className="rc-value" style={{ color: 'var(--warning)' }}>₹6.30 Cr</div></div>
        <div className="report-card"><div className="rc-label">Due in 30 Days</div><div className="rc-value">₹7.80 Cr</div></div>
        <div className="report-card"><div className="rc-label">Due in 90 Days</div><div className="rc-value">₹14.20 Cr</div></div>
        <div className="report-card"><div className="rc-label">Call Money (Daily)</div><div className="rc-value" style={{ color: 'var(--warning)' }}>₹2.00 Cr</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CircleDollarSign size={16} /> Interest / Income Statement — All Instruments
          </span>
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} /> Complete Maturity Schedule — All Instrument Types
          </span>
          <select className="form-select" style={{ width: '150px' }}>
            <option>All Types</option><option>FD Only</option><option>G-Sec/T-Bill</option>
            <option>Call Money</option><option>CP/CD</option><option>Bonds</option>
          </select>
          <button className="btn-sm gold">Export</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Instrument</th><th>Type</th><th>Amount (₹)</th><th>Maturity</th><th>Days</th><th>Income</th><th>Action</th><th>Status</th></tr></thead>
            <tbody>
              <tr style={{ background: '#fff5f5' }}>
                <td>INV-005</td><td><b>SBI FD #2024001</b></td><td><span className="badge cd">FD</span></td>
                <td>₹1,50,00,000</td><td>18-Apr-2026</td>
                <td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>3 Days</span></td>
                <td>₹10,50,000</td>
                <td><button className="btn-sm gold" onClick={() => onNavigate('renewal')}>Renew/Redeem</button></td>
                <td><span className="badge alert">Urgent</span></td>
              </tr>
              <tr style={{ background: '#fffbf0' }}>
                <td>CP-2601-001</td><td><b>HDFC Ltd. CP</b></td><td><span className="badge cp">CP</span></td>
                <td>₹1,00,00,000</td><td>20-Apr-2026</td>
                <td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>5 Days</span></td>
                <td>₹2,16,500</td>
                <td><button className="btn-sm teal" onClick={() => onNavigate('cp_cd')}>CP Maturity</button></td>
                <td><span className="badge alert">Action</span></td>
              </tr>
              <tr>
                <td>CM-2604</td><td><b>Call Money – SBI/BOB</b></td><td><span className="badge cm">Call O/N</span></td>
                <td>₹2,00,00,000</td><td>16-Apr-2026</td>
                <td><span style={{ color: 'var(--warning)', fontWeight: 700 }}>1 Day</span></td>
                <td>₹3,603</td>
                <td><button className="btn-sm gold" onClick={() => onOpenModal('cmRoll')}>Rollover</button></td>
                <td><span className="badge cm">Daily</span></td>
              </tr>
              <tr>
                <td>INV-004</td><td><b>91-Day T-Bill #TB01</b></td><td><span className="badge slr">T-Bill</span></td>
                <td>₹2,00,00,000</td><td>23-Apr-2026</td><td>8 Days</td><td>₹3,60,000</td>
                <td><button className="btn-sm primary">Plan Reinvestment</button></td>
                <td><span className="badge pending">Due Soon</span></td>
              </tr>
              <tr>
                <td>NM-2604-001</td><td><b>Notice Money – Canara</b></td><td><span className="badge cm">Notice 7d</span></td>
                <td>₹1,50,00,000</td><td>22-Apr-2026</td><td>7 Days</td><td>₹19,132</td>
                <td><button className="btn-sm gold">Receive/Renew</button></td>
                <td><span className="badge pending">Notice</span></td>
              </tr>
              <tr>
                <td>INV-007</td><td><b>BOI FD #FD-BOI-22</b></td><td><span className="badge cd">FD</span></td>
                <td>₹80,00,000</td><td>03-May-2026</td><td>18 Days</td><td>₹5,44,000</td>
                <td><button className="btn-sm outline">View</button></td>
                <td><span className="badge active">Active</span></td>
              </tr>
              <tr>
                <td>CP-2602</td><td><b>Reliance Ind. CP</b></td><td><span className="badge cp">CP</span></td>
                <td>₹2,00,00,000</td><td>15-May-2026</td><td>30 Days</td><td>₹4,65,753</td>
                <td><button className="btn-sm outline">View</button></td>
                <td><span className="badge active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
