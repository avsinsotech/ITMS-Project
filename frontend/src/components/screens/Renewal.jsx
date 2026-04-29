import React from 'react';
import { AlertCircle, RefreshCcw, BarChart3, CheckCircle2 } from 'lucide-react';

export default function Renewal({ onOpenModal }) {
  return (
    <div>
      <div className="alert-banner danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertCircle size={16} /> SBI FD #FD2024001 — ₹1,50,00,000 — Maturing 18-Apr-2026 (3 days). Renewal action required immediately.
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCcw size={16} /> FD / CP Renewal Form
            </span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Instrument Type</label>
                <select className="form-select"><option>Fixed Deposit (FD)</option><option>Commercial Paper (CP)</option><option>Certificate of Deposit (CD)</option></select>
              </div>
              <div className="form-group"><label className="form-label">Select Instrument</label>
                <select className="form-select"><option>SBI FD #FD2024001 – ₹1.5Cr</option></select>
              </div>
              <div className="form-group"><label className="form-label">Principal (₹)</label>
                <input className="form-input readonly" defaultValue="1,50,00,000" readOnly />
              </div>
              <div className="form-group"><label className="form-label">Interest Earned</label>
                <input className="form-input readonly" defaultValue="₹10,50,000" readOnly />
              </div>
              <div className="form-group"><label className="form-label">Renewal Option</label>
                <select className="form-select"><option>Renew Principal + Interest</option><option>Renew Principal Only</option><option>Redeem Fully</option></select>
              </div>
              <div className="form-group"><label className="form-label">New Principal</label>
                <input className="form-input" defaultValue="1,60,50,000" />
              </div>
              <div className="form-group"><label className="form-label">New Tenure</label>
                <select className="form-select"><option>6 Months</option><option>1 Year</option></select>
              </div>
              <div className="form-group"><label className="form-label">New Rate %</label>
                <input className="form-input" defaultValue="7.25" />
              </div>
              <div className="form-group"><label className="form-label">New Maturity (Auto)</label>
                <input className="form-input readonly" defaultValue="18-Apr-2027" readOnly />
              </div>
              <div className="form-group"><label className="form-label">Classification</label>
                <select className="form-select"><option>AFS</option></select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
              <button className="topbar-btn btn-outline">Cancel</button>
              <button className="topbar-btn btn-primary" onClick={() => onOpenModal('checker')}>Submit for Approval</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={16} /> Renewal Impact Analysis
            </span>
          </div>
          <div className="card-body">
            <div style={{ background: 'var(--navy)', borderRadius: '8px', padding: '14px', marginBottom: '14px', color: '#fff' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '4px' }}>Estimated New Income</div>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '26px', color: 'var(--gold)' }}>₹11,63,625</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>₹1,60,50,000 @ 7.25% for 1 Year</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '7px', background: 'var(--gray-50)', borderRadius: '6px' }}><span>Total FD Exposure post-renewal</span><b>₹22.60 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '7px', background: 'var(--gray-50)', borderRadius: '6px' }}><span>RBI Limit (10% Own Funds)</span><b>₹28.50 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '7px', background: 'var(--success-bg)', borderRadius: '6px' }}><span>Within Limit?</span><b style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Yes (79.3%)</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '7px', background: 'var(--gray-50)', borderRadius: '6px' }}><span>SLR Impact</span><b>No change (Non-SLR)</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
