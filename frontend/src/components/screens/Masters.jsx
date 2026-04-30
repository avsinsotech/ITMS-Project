import React from 'react';
import { Building2, Folder, Settings } from 'lucide-react';

export default function Masters() {
  return (
    <div>
      <div className="three-col">
        {/* Bank / Issuer Master */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} /> Bank / Issuer Master
            </span>
            <button className="btn-sm gold">+ Add</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead><tr><th>Name</th><th>Type</th><th>Limit</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>SBI</td><td>SCB</td><td>₹5Cr</td><td><span className="badge active">Active</span></td></tr>
                <tr><td>NABARD</td><td>Dev. FI</td><td>₹10Cr</td><td><span className="badge active">Active</span></td></tr>
                <tr><td>HDFC AMC</td><td>MF-AMC</td><td>₹5Cr</td><td><span className="badge active">Active</span></td></tr>
                <tr><td>HDFC Ltd.</td><td>CP Issuer</td><td>₹3Cr</td><td><span className="badge active">Active</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Categories */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Folder size={16} /> Investment Categories
            </span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead><tr><th>Category</th><th>SLR</th><th>Permitted</th></tr></thead>
              <tbody>
                <tr><td>G-Sec</td><td><span className="badge slr">SLR</span></td><td><span className="badge active">Yes</span></td></tr>
                <tr><td>T-Bill</td><td><span className="badge slr">SLR</span></td><td><span className="badge active">Yes</span></td></tr>
                <tr><td>Mutual Fund</td><td><span className="badge non-slr">Non-SLR</span></td><td><span className="badge active">Board OK</span></td></tr>
                <tr><td>Call Money</td><td><span className="badge non-slr">Non-SLR</span></td><td><span className="badge active">Lending Only</span></td></tr>
                <tr><td>CP (Min A2)</td><td><span className="badge non-slr">Non-SLR</span></td><td><span className="badge active">Yes</span></td></tr>
                <tr><td>Equity Shares</td><td><span className="badge non-slr">Non-SLR</span></td><td><span className="badge alert">NOT PERMITTED</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Parameters */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={16} /> System Parameters
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {[
                ['Min. SLR %', '18.00%'],
                ['Min. CRR %', '4.00%'],
                ['Checker Limit', '₹25 Lakh'],
                ['FD SCB Limit', '10% Own Funds'],
                ['CP Min. Rating', 'A2 (CRISIL equiv.)'],
                ['MTM Frequency (AFS)', 'Quarterly'],
                ['Call Money Report', 'NDS-CALL (Daily)'],
                ['Maturity Alert Days', '30 / 15 / 7 Days'],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '7px', background: 'var(--gray-50)', borderRadius: '5px' }}>
                  <span>{label}</span><b>{value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
