import React from 'react';
import { RefreshCcw } from 'lucide-react';

export default function CategoryTransfer() {
  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>Category Transfer — Restricted Window | Board Resolution Mandatory</span>
        </div>
        <div className="rbi-text">HTM → AFS/HFT allowed only in RBI notified window (typically April 1). Board resolution mandatory. Transfer at market value; loss recognized immediately. MF always AFS — no transfer.</div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCcw size={16} /> Category Transfer Request
          </span>
        </div>
        <div className="card-body">
          <div className="form-grid-3">
            <div className="form-group"><label className="form-label">Select Investment</label>
              <select className="form-select"><option>INV-001 – 7.26% GS 2033 (HTM)</option></select>
            </div>
            <div className="form-group"><label className="form-label">Current Classification</label>
              <input className="form-input readonly" defaultValue="HTM – Held to Maturity" readOnly />
            </div>
            <div className="form-group"><label className="form-label">Transfer To <span className="rbi-note">RBI WINDOW</span></label>
              <select className="form-select"><option>AFS – Available for Sale</option></select>
            </div>
            <div className="form-group"><label className="form-label">Transfer Date</label>
              <input className="form-input" type="date" defaultValue="2026-04-15" />
            </div>
            <div className="form-group"><label className="form-label">RBI Window Circular Ref.</label>
              <input className="form-input" defaultValue="RBI/2026-27/10 dt. 01-Apr-2026" />
            </div>
            <div className="form-group"><label className="form-label">Board Resolution Date</label>
              <input className="form-input" type="date" defaultValue="2026-04-01" />
            </div>
            <div className="form-group"><label className="form-label">Book Value (₹)</label>
              <input className="form-input readonly" defaultValue="98,75,000" readOnly />
            </div>
            <div className="form-group"><label className="form-label">Market Value (₹)</label>
              <input className="form-input" defaultValue="99,20,000" />
            </div>
            <div className="form-group"><label className="form-label">Gain/(Loss)</label>
              <input className="form-input readonly" defaultValue="+₹45,000" readOnly />
            </div>
            <div className="form-group full"><label className="form-label">Justification <span className="req">*</span></label>
              <textarea className="form-textarea" rows="2" defaultValue="Transfer to AFS as per Board decision to utilize RBI annual window for portfolio flexibility." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
            <button className="topbar-btn btn-outline">Save Draft</button>
            <button className="topbar-btn btn-primary">Submit for Board Approval</button>
          </div>
        </div>
      </div>
    </div>
  );
}
