import React, { useState } from 'react';
import { 
  ClipboardList, PlusCircle, RefreshCcw, CalendarDays, Building2, 
  AlertTriangle, Radio, BarChart3, AlertCircle, CheckCircle2 
} from 'lucide-react';

export default function CallMoney({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('cm-active');

  const tabs = [
    { id: 'cm-active', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ClipboardList size={14} /> Active Placements</div> },
    { id: 'cm-new', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={14} /> New Placement</div> },
    { id: 'cm-rollover', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RefreshCcw size={14} /> Rollover</div> },
    { id: 'cm-history', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CalendarDays size={14} /> History</div> },
    { id: 'cm-counterparty', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={14} /> Counterparties</div> },
  ];

  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI CIRCULAR</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>Call/Notice/Term Money Market | RBI Master Direction on Call Money — RBI/2021-22/89 | FIMMDA Guidelines</span>
        </div>
        <div className="rbi-text">UCBs are permitted to lend (place) funds in Call Money market. Call Money = Overnight (1 day). Notice Money = 2-14 days. Term Money = 15-364 days. UCBs CANNOT BORROW from call money market. Interest calculated on actual/365 basis. No collateral; purely based on creditworthiness. Counterparty must be RBI-regulated entity (Scheduled Banks, PDs). All deals to be reported on NDS-CALL platform.</div>
      </div>

      <div className="alert-banner warning" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertTriangle size={16} /> UCBs can only LEND (place) in Call Money. Borrowing from call money market is NOT permitted for UCBs per RBI guidelines.
      </div>

      <div className="report-cards-5">
        <div className="report-card"><div className="rc-label">Call Money Placed (O/N)</div><div className="rc-value">₹2.00 Cr</div></div>
        <div className="report-card"><div className="rc-label">Notice Money (2-14d)</div><div className="rc-value">₹1.50 Cr</div></div>
        <div className="report-card"><div className="rc-label">Total Placed</div><div className="rc-value">₹3.50 Cr</div></div>
        <div className="report-card"><div className="rc-label">Avg Rate (O/N)</div><div className="rc-value" style={{ color: 'var(--success)' }}>6.60%</div></div>
        <div className="report-card"><div className="rc-label">Interest Earned (Apr)</div><div className="rc-value">₹63,493</div></div>
      </div>

      <div className="live-rate-box">
        <div className="lr-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Radio size={12} strokeWidth={3} /> Live Money Market Rates — NDS-CALL | RBI Reference
        </div>
        <div className="lr-grid">
          <div className="lr-item"><div className="lr-label">Overnight Call Rate</div><div className="lr-rate">6.60%</div><div className="lr-change lr-up">▲ +5 bps</div></div>
          <div className="lr-item"><div className="lr-label">Notice Money (7d)</div><div className="lr-rate">6.65%</div><div className="lr-change lr-flat">→ Unchanged</div></div>
          <div className="lr-item"><div className="lr-label">Term Money (30d)</div><div className="lr-rate">6.85%</div><div className="lr-change lr-up">▲ +3 bps</div></div>
          <div className="lr-item"><div className="lr-label">RBI Repo Rate</div><div className="lr-rate">6.25%</div><div className="lr-change lr-flat">→ Unchanged</div></div>
        </div>
      </div>

      <div className="tab-bar">
        {tabs.map(tab => (
          <div key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</div>
        ))}
      </div>

      {/* Active Placements */}
      {activeTab === 'cm-active' && (
        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClipboardList size={16} /> Active Call/Notice Money Placements
              </span>
              <button className="btn-sm teal" onClick={() => setActiveTab('cm-new')}>+ New Placement</button>
              <button className="btn-sm gold">Export</button>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead><tr><th>Deal ID</th><th>Type</th><th>Counterparty Bank</th><th>Principal (₹)</th><th>Rate (%)</th><th>Placed On</th><th>Due Date</th><th>Days</th><th>Interest (₹)</th><th>NDS Ref.</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td>CM-2604-001</td><td><span className="badge cm">Overnight</span></td><td><b>SBI – Mumbai</b></td>
                    <td>₹1,00,00,000</td><td><b>6.60%</b></td><td>15-Apr-2026</td><td>16-Apr-2026</td><td>1</td>
                    <td>₹1,808</td><td>NDS/2604/0881</td><td><span className="badge active">Active</span></td>
                    <td><button className="btn-sm gold" onClick={() => onOpenModal('cmRoll')}>Rollover</button></td>
                  </tr>
                  <tr>
                    <td>CM-2604-002</td><td><span className="badge cm">Overnight</span></td><td><b>Bank of Baroda – Thane</b></td>
                    <td>₹1,00,00,000</td><td><b>6.55%</b></td><td>15-Apr-2026</td><td>16-Apr-2026</td><td>1</td>
                    <td>₹1,795</td><td>NDS/2604/0882</td><td><span className="badge active">Active</span></td>
                    <td><button className="btn-sm gold" onClick={() => onOpenModal('cmRoll')}>Rollover</button></td>
                  </tr>
                  <tr>
                    <td>NM-2604-001</td><td><span className="badge pending">Notice 7d</span></td><td><b>Canara Bank – HO</b></td>
                    <td>₹1,50,00,000</td><td><b>6.65%</b></td><td>08-Apr-2026</td><td>15-Apr-2026</td><td>7</td>
                    <td>₹19,132</td><td>NDS/2604/0755</td><td><span className="badge alert">Due Today</span></td>
                    <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-sm success" onClick={() => alert('✅ Funds received. Notice money closed.')}>Receive</button><button className="btn-sm gold">Renew</button></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="two-col">
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart3 size={16} /> Placement Breakup
                </span>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}><span>Overnight Call</span><b>₹2.00 Cr</b></div><div className="progress-bar"><div className="progress-fill fill-navy" style={{ width: '57.1%' }}></div></div></div>
                  <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}><span>Notice Money (7d)</span><b>₹1.50 Cr</b></div><div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '42.9%' }}></div></div></div>
                </div>
                <div style={{ marginTop: '14px', padding: '10px', background: 'var(--gray-50)', borderRadius: '7px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>DAILY INTEREST PROJECTION</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Today's Expected Interest</span><b style={{ color: 'var(--success)' }}>₹21,735</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}><span>Monthly Projection</span><b>₹6,52,050</b></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={16} /> Approved Counterparties
                </span>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <table className="data-table">
                  <thead><tr><th>Bank</th><th>Max Limit</th><th>Current Exposure</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>State Bank of India</td><td>₹2.00 Cr</td><td>₹1.00 Cr</td><td><span className="badge active">Active</span></td></tr>
                    <tr><td>Bank of Baroda</td><td>₹1.50 Cr</td><td>₹1.00 Cr</td><td><span className="badge active">Active</span></td></tr>
                    <tr><td>Canara Bank</td><td>₹2.00 Cr</td><td>₹1.50 Cr</td><td><span className="badge active">Active</span></td></tr>
                    <tr><td>Punjab National Bank</td><td>₹1.00 Cr</td><td>₹0.00</td><td><span className="badge active">Active</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Placement */}
      {activeTab === 'cm-new' && (
        <div>
          <div className="alert-banner danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> RBI Rule: UCBs can ONLY LEND in Call Money market. Do NOT initiate borrowing transactions.
          </div>
          <div className="two-col">
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlusCircle size={16} /> New Call/Notice Money Placement
                </span>
              </div>
              <div className="card-body">
                <div className="form-grid">
                  <div className="form-group"><label className="form-label">Transaction Type <span className="req">*</span> <span className="rbi-note">LENDING ONLY</span></label>
                    <select className="form-select"><option>Call Money – Overnight (1 Day)</option><option>Notice Money – 2 to 14 Days</option><option>Term Money – 15 to 364 Days</option></select>
                  </div>
                  <div className="form-group"><label className="form-label">Counterparty Bank <span className="req">*</span></label>
                    <select className="form-select"><option>-- Select Counterparty --</option><option>State Bank of India – Mumbai</option><option>Bank of Baroda – Thane</option><option>Canara Bank – Head Office</option></select>
                  </div>
                  <div className="form-group"><label className="form-label">Principal Amount (₹) <span className="req">*</span></label><input className="form-input" defaultValue="1,00,00,000" /></div>
                  <div className="form-group"><label className="form-label">Interest Rate (% p.a.) <span className="req">*</span></label><input className="form-input" defaultValue="6.60" /><div className="form-hint">Market rate: 6.60% | Min acceptable: 6.25%</div></div>
                  <div className="form-group"><label className="form-label">Deal Date <span className="req">*</span></label><input className="form-input" type="date" defaultValue="2026-04-15" /></div>
                  <div className="form-group"><label className="form-label">Maturity Date <span className="req">*</span></label><input className="form-input" type="date" defaultValue="2026-04-16" /></div>
                  <div className="form-group"><label className="form-label">Interest Amount (Auto, ₹)</label><input className="form-input readonly" defaultValue="₹1,808" readOnly /><div className="form-hint">Principal × Rate × Days / 365</div></div>
                  <div className="form-group"><label className="form-label">NDS-CALL Ref. No.</label><input className="form-input" placeholder="Auto-populated on NDS confirmation" defaultValue="NDS/2604/0884" /></div>
                  <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-select"><option>RTGS – Same Day</option><option>NDS Settlement</option></select></div>
                  <div className="form-group"><label className="form-label">Reporting Platform <span className="rbi-note">MANDATORY</span></label><input className="form-input readonly" defaultValue="NDS-CALL (RBI Reporting Platform)" readOnly /></div>
                  <div className="form-group"><label className="form-label">Checker Approval</label><select className="form-select"><option>Required (≥ ₹25 Lakh)</option></select></div>
                  <div className="form-group"><label className="form-label">Deal Slip No. (Auto)</label><input className="form-input readonly" defaultValue="DS-2604-0043" readOnly /></div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
                  <button className="topbar-btn btn-outline">Save Draft</button>
                  <button className="topbar-btn btn-primary" onClick={() => onOpenModal('checker')}>Submit for Checker ▶</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardList size={16} /> Deal Terms & Compliance
                </span>
              </div>
              <div className="card-body">
                <div style={{ background: 'var(--navy)', borderRadius: '8px', padding: '14px', marginBottom: '14px', color: '#fff' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '8px' }}>DEAL ECONOMICS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Principal</div><div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '18px', color: 'var(--gold)' }}>₹1.00 Cr</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Rate</div><div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '18px', color: 'var(--gold)' }}>6.60%</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Days</div><div style={{ fontSize: '16px', color: '#fff', fontWeight: 700 }}>1 day</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Interest</div><div style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 700 }}>₹1,808</div></div>
                  </div>
                </div>
                <div className="rbi-info-box">
                  <div className="rbi-header"><span className="rbi-tag">RBI</span><span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--navy)' }}>Call Money Compliance Checklist</span></div>
                  <div className="rbi-text" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> Counterparty is Scheduled Bank</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> Rate ≥ RBI Repo Floor (6.25%)</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> NDS-CALL reporting selected</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> Deal Slip generated</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> Maker-Checker dual control</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> Counterparty limit not breached</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={10} className="lr-up" /> UCB lending (not borrowing) confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cm-rollover' && <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Rollover management — extend overnight positions with rate update. Auto-calculate new interest.</div></div>}
      {activeTab === 'cm-history' && <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Historical call money deals — closed deals with P&L. NDS-CALL confirmation archive.</div></div>}
      {activeTab === 'cm-counterparty' && <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Counterparty master — approved banks, per-counterparty limits, credit rating, exposure tracking.</div></div>}
    </div>
  );
}
