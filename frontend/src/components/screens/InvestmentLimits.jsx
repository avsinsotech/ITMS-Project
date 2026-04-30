import React from 'react';
import { Target } from 'lucide-react';

export default function InvestmentLimits() {
  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>Investment Limits Framework — Board Policy + RBI Regulatory Caps</span>
        </div>
        <div className="rbi-text">Board of Directors must approve category-wise investment limits annually as part of Investment Policy. RBI sets outer caps (e.g., FD-SCB = 10% of own funds). Counterparty-wise limits for CP, CD, Call Money to be Board-approved. Breach of any limit triggers auto-alert and prevents new entry.</div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={16} /> All Investment Limits — Live Utilization
          </span>
          <button className="btn-sm gold">Edit Limits</button>
          <button className="btn-sm primary">Print Policy</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>Category</th><th>RBI Cap</th><th>Board Limit</th><th>Current (₹Cr)</th><th>Utilization</th><th>Headroom (₹Cr)</th><th>Last Reviewed</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td><b>G-Sec + SDL</b></td><td>No cap (SLR requirement)</td><td>₹40.00 Cr</td><td>₹28.10</td>
                <td><div className="progress-bar"><div className="progress-fill fill-navy" style={{ width: '70.3%' }}></div></div> 70.3%</td>
                <td>₹11.90</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>T-Bills</b></td><td>No cap (SLR)</td><td>₹10.00 Cr</td><td>₹7.24</td>
                <td><div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '72.4%' }}></div></div> 72.4%</td>
                <td>₹2.76</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>FD – Scheduled Banks</b></td><td>10% of Own Funds</td><td>₹28.50 Cr</td><td>₹14.60</td>
                <td><div className="progress-bar"><div className="progress-fill fill-warning" style={{ width: '51.2%' }}></div></div> 51.2%</td>
                <td>₹13.90</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>NABARD / NHB Bonds</b></td><td>No cap (SLR)</td><td>₹15.00 Cr</td><td>₹11.25</td>
                <td><div className="progress-bar"><div className="progress-fill fill-success" style={{ width: '75%' }}></div></div> 75.0%</td>
                <td>₹3.75</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>Mutual Funds</b></td><td>Board Policy</td><td>₹10.00 Cr</td><td>₹8.76</td>
                <td><div className="progress-bar"><div className="progress-fill fill-purple" style={{ width: '87.6%' }}></div></div> 87.6%</td>
                <td>₹1.24</td><td>01-Apr-2026</td><td><span className="badge pending">Near Limit</span></td>
              </tr>
              <tr>
                <td><b>Call Money (Placed)</b></td><td>UCBs: Lending only</td><td>₹5.00 Cr</td><td>₹3.50</td>
                <td><div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '70%' }}></div></div> 70.0%</td>
                <td>₹1.50</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>CP (Commercial Paper)</b></td><td>Min A2 rating</td><td>₹8.00 Cr</td><td>₹4.50</td>
                <td><div className="progress-bar"><div className="progress-fill fill-teal" style={{ width: '56.3%' }}></div></div> 56.3%</td>
                <td>₹3.50</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
              <tr>
                <td><b>CD (Certificates of Deposit)</b></td><td>SCBs only</td><td>₹3.00 Cr</td><td>₹1.50</td>
                <td><div className="progress-bar"><div className="progress-fill fill-teal" style={{ width: '50%' }}></div></div> 50.0%</td>
                <td>₹1.50</td><td>01-Apr-2026</td><td><span className="badge active">Within</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
