import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function Valuation() {
  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI NORMS</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>Valuation — FIMMDA/FBIL prices for AFS/HFT | HTM at amortised cost | MF at NAV</span>
        </div>
        <div className="rbi-text">HTM: Amortised cost; no MTM required. AFS: Quarterly MTM using FIMMDA/FBIL price matrix; net depreciation provisioned; net appreciation not recognised. HFT: Daily MTM. MF: Daily NAV-based MTM. CP/CD: Discounted cash flow method. Provision = max(0, Book Value − Market Value).</div>
      </div>

      <div className="report-cards">
        <div className="report-card"><div className="rc-label">Total Book Value</div><div className="rc-value">₹82.74 Cr</div></div>
        <div className="report-card"><div className="rc-label">Market Value (MTM)</div><div className="rc-value">₹83.81 Cr</div></div>
        <div className="report-card"><div className="rc-label">Net Unrealised Gain</div><div className="rc-value" style={{ color: 'var(--success)' }}>+₹1.07 Cr</div></div>
        <div className="report-card"><div className="rc-label">Provision Required</div><div className="rc-value" style={{ color: 'var(--danger)' }}>₹91,710</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={16} /> MTM Valuation — All Instruments
          </span>
          <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>FIMMDA rates: 15-Apr-2026 | AMFI NAV: 15-Apr-2026</div>
          <button className="btn-sm gold">Update Rates</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead><tr><th>Instrument</th><th>Type</th><th>Class</th><th>Book Value (₹)</th><th>Valuation Basis</th><th>Market/NAV Value</th><th>Gain/(Loss)</th><th>Provision</th></tr></thead>
            <tbody>
              <tr><td>7.26% GS 2033</td><td><span className="badge slr">G-Sec</span></td><td><span className="badge htm">HTM</span></td><td>₹98,75,000</td><td>Amortised Cost</td><td>₹99,20,000</td><td style={{ color: 'var(--success)' }}>+₹45,000</td><td>Nil (HTM)</td></tr>
              <tr><td>SBI FD #2024001</td><td><span className="badge cd">FD</span></td><td><span className="badge afs">AFS</span></td><td>₹1,50,00,000</td><td>Par (FD)</td><td>₹1,50,00,000</td><td>—</td><td>Nil</td></tr>
              <tr><td>HDFC Liquid Fund</td><td><span className="badge mf">MF</span></td><td><span className="badge afs">AFS</span></td><td>₹3,30,98,000</td><td>AMFI NAV Daily</td><td>₹3,32,10,430</td><td style={{ color: 'var(--success)' }}>+₹1,12,430</td><td>Nil</td></tr>
              <tr><td>ABSL Gilt Fund</td><td><span className="badge mf">MF</span></td><td><span className="badge afs">AFS</span></td><td>₹1,80,07,000</td><td>AMFI NAV Daily</td><td>₹1,79,15,290</td><td style={{ color: 'var(--danger)' }}>-₹91,710</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>₹91,710</span></td></tr>
              <tr><td>91-Day T-Bill</td><td><span className="badge slr">T-Bill</span></td><td><span className="badge hft">HFT</span></td><td>₹1,98,20,000</td><td>FIMMDA Daily</td><td>₹1,97,10,000</td><td style={{ color: 'var(--danger)' }}>-₹1,10,000</td><td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>₹1,10,000</span></td></tr>
              <tr><td>HDFC Ltd. CP</td><td><span className="badge cp">CP</span></td><td><span className="badge afs">AFS</span></td><td>₹97,88,000</td><td>Discounted CF</td><td>₹98,80,000</td><td style={{ color: 'var(--success)' }}>+₹92,000</td><td>Nil</td></tr>
              <tr><td>Call Money O/N</td><td><span className="badge cm">Call</span></td><td><span className="badge hft">HFT</span></td><td>₹2,00,00,000</td><td>At Principal</td><td>₹2,00,00,000</td><td>—</td><td>Nil</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
