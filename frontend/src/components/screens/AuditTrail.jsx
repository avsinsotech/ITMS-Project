import React from 'react';
import { Search } from 'lucide-react';

export default function AuditTrail() {
  return (
    <div>
      <div className="search-bar">
        <div className="search-input-wrap">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search audit logs..." />
        </div>
        <input type="date" className="form-input" style={{ width: '140px' }} defaultValue="2026-04-15" />
        <input type="date" className="form-input" style={{ width: '140px' }} defaultValue="2026-04-15" />
        <select className="form-select" style={{ width: '150px' }}>
          <option>All Actions</option><option>Create</option><option>Modify</option>
          <option>Approve</option><option>Redeem</option><option>Rollover</option>
        </select>
        <select className="form-select" style={{ width: '130px' }}>
          <option>All Modules</option><option>G-Sec</option><option>FD</option>
          <option>MF</option><option>Call Money</option><option>CP/CD</option>
        </select>
        <button className="btn-sm gold">Export</button>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Module</th><th>Record</th><th>Old Value</th><th>New Value</th><th>IP</th></tr></thead>
            <tbody>
              <tr>
                <td>15-Apr-2026 10:42</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge pending">CREATED</span></td><td>G-Sec</td>
                <td>INV-009 – 7.26% GS 2033</td><td>—</td><td>₹98,75,000</td><td>192.168.1.14</td>
              </tr>
              <tr>
                <td>15-Apr-2026 10:45</td><td>checker.1</td><td>Checker</td>
                <td><span className="badge active">APPROVED</span></td><td>G-Sec</td>
                <td>INV-009</td><td>Pending</td><td>Approved</td><td>192.168.1.22</td>
              </tr>
              <tr>
                <td>15-Apr-2026 09:15</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge mf">MF PURCHASE</span></td><td>Mutual Fund</td>
                <td>HDFC Liquid – ₹50L</td><td>—</td><td>Submitted</td><td>192.168.1.14</td>
              </tr>
              <tr>
                <td>15-Apr-2026 09:00</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge cm">CALL PLACED</span></td><td>Call Money</td>
                <td>CM-2604-001 SBI O/N ₹1Cr</td><td>—</td><td>₹1,00,00,000 @ 6.60%</td><td>192.168.1.14</td>
              </tr>
              <tr>
                <td>14-Apr-2026 16:10</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge htm">SUBMITTED</span></td><td>RBI Return</td>
                <td>Form VIII – 11-Apr Week</td><td>Draft</td><td>Submitted to RBI</td><td>192.168.1.14</td>
              </tr>
              <tr>
                <td>14-Apr-2026 14:30</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge cp">CP INVESTED</span></td><td>CP Module</td>
                <td>Reliance CP ₹2Cr</td><td>—</td><td>₹1,93,40,000</td><td>192.168.1.14</td>
              </tr>
              <tr>
                <td>14-Apr-2026 09:30</td><td>treasury.mgr</td><td>Maker</td>
                <td><span className="badge hft">MTM UPDATE</span></td><td>Valuation</td>
                <td>HFT + AFS Portfolio</td><td>Prev. Values</td><td>FIMMDA 14-Apr rates</td><td>192.168.1.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
