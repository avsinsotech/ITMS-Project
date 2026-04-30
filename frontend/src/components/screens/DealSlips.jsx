import React from 'react';
import { Info, Search } from 'lucide-react';

export default function DealSlips() {
  return (
    <div>
      <div className="alert-banner info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Info size={16} /> Deal Slips are auto-generated for every investment transaction. Maker-Checker both must sign. Physical copy to be preserved per RBI audit requirements.
      </div>

      <div className="search-bar">
        <div className="search-input-wrap">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search Deal Slip No., Instrument..." />
        </div>
        <input type="date" className="form-input" style={{ width: '140px' }} defaultValue="2026-04-01" />
        <input type="date" className="form-input" style={{ width: '140px' }} defaultValue="2026-04-15" />
        <select className="form-select" style={{ width: '130px' }}>
          <option>All Types</option><option>G-Sec</option><option>FD</option>
          <option>MF</option><option>Call Money</option><option>CP</option><option>CD</option>
        </select>
        <button className="btn-sm gold">Export</button>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>Deal Slip No.</th><th>Date</th><th>Instrument</th><th>Type</th><th>Amount (₹)</th><th>Rate%</th><th>Maker</th><th>Checker</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              <tr>
                <td><b>DS-2604-0043</b></td><td>15-Apr-2026</td><td>7.26% GS 2033</td>
                <td><span className="badge slr">G-Sec</span></td><td>₹98,75,000</td><td>7.26%</td>
                <td>treasury.mgr</td><td>checker.1</td>
                <td><span className="badge approved">Approved</span></td>
                <td><button className="btn-sm gold">Print</button></td>
              </tr>
              <tr>
                <td><b>DS-2604-0042</b></td><td>15-Apr-2026</td><td>Call Money – SBI O/N</td>
                <td><span className="badge cm">Call</span></td><td>₹1,00,00,000</td><td>6.60%</td>
                <td>treasury.mgr</td><td>checker.1</td>
                <td><span className="badge approved">Approved</span></td>
                <td><button className="btn-sm gold">Print</button></td>
              </tr>
              <tr>
                <td><b>DS-2604-0041</b></td><td>14-Apr-2026</td><td>HDFC Liquid Fund Purchase</td>
                <td><span className="badge mf">MF</span></td><td>₹50,00,000</td><td>7.45% (ann.)</td>
                <td>treasury.mgr</td><td>Pending</td>
                <td><span className="badge pending">Awaiting Checker</span></td>
                <td><button className="btn-sm primary">Approve</button></td>
              </tr>
              <tr>
                <td><b>DS-2603-0040</b></td><td>10-Apr-2026</td><td>Reliance Ind. CP</td>
                <td><span className="badge cp">CP</span></td><td>₹2,00,00,000</td><td>7.60%</td>
                <td>treasury.mgr</td><td>checker.2</td>
                <td><span className="badge approved">Approved</span></td>
                <td><button className="btn-sm gold">Print</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
