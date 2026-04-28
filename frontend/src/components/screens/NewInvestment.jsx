import React from 'react';
import { 
  CheckCircle2, XCircle, AlertTriangle, Landmark, 
  Building2, LineChart, Phone, FileText, FileSpreadsheet, Target,
  PlusCircle 
} from 'lucide-react';

export default function NewInvestment({ onNavigate }) {
  return (
    <div>
      {/* Wizard Steps */}
      <div className="wizard-steps">
        <div className="wizard-step"><div className="wizard-step-num ws-done">✓</div><span className="wizard-step-label ws-done-label">Select Type</span></div>
        <div className="wizard-line done"></div>
        <div className="wizard-step"><div className="wizard-step-num ws-active">2</div><span className="wizard-step-label ws-active-label">Fill Details</span></div>
        <div className="wizard-line"></div>
        <div className="wizard-step"><div className="wizard-step-num ws-pending">3</div><span className="wizard-step-label ws-pending-label">Limits Check</span></div>
        <div className="wizard-line"></div>
        <div className="wizard-step"><div className="wizard-step-num ws-pending">4</div><span className="wizard-step-label ws-pending-label">Maker-Checker</span></div>
        <div className="wizard-line"></div>
        <div className="wizard-step"><div className="wizard-step-num ws-pending">5</div><span className="wizard-step-label ws-pending-label">Deal Slip</span></div>
      </div>

      <div className="rbi-info-box">
        <div className="rbi-header"><span className="rbi-tag">RBI</span><span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>Permitted Investments for UCBs — All Categories</span></div>
        <div className="rbi-text" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> G-Sec</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> T-Bills</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> NABARD/NHB/Bonds</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> FD-SCBs</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> Mutual Funds</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> Call Money</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} className="lr-up" /> CP/CD</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={10} className="lr-down" /> Equity/Speculative</span>
        </div>
      </div>

      <div className="alert-banner warning" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertTriangle size={16} /> Dual Control (Maker-Checker) mandatory for all investments ≥ ₹25 Lakhs.
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={16} /> Select Investment Category
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '14px', border: '2px solid var(--navy)', borderRadius: '9px', cursor: 'pointer', background: 'var(--navy)' }} onClick={() => onNavigate('gsec')}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Landmark size={14} /> G-Sec / SDL / T-Bills
                </div>
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '10px', marginTop: '3px' }}>SLR Eligible | NDS-OM</div>
              </div>
              <div style={{ padding: '14px', border: '2px solid var(--border)', borderRadius: '9px', cursor: 'pointer' }} onClick={() => onNavigate('fd_bonds')}>
                <div style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={14} /> Fixed Deposit / Bonds
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '10px', marginTop: '3px' }}>FD-SCB | NABARD | NHB</div>
              </div>
              <div style={{ padding: '14px', border: '2px solid var(--border)', borderRadius: '9px', cursor: 'pointer' }} onClick={() => onNavigate('mutual_fund')}>
                <div style={{ color: 'var(--purple)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <LineChart size={14} /> Mutual Funds
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '10px', marginTop: '3px' }}>Liquid | Overnight | Gilt | Debt</div>
              </div>
              <div style={{ padding: '14px', border: '2px solid var(--border)', borderRadius: '9px', cursor: 'pointer' }} onClick={() => onNavigate('call_money')}>
                <div style={{ color: 'var(--warning)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} /> Call / Notice Money
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '10px', marginTop: '3px' }}>Overnight lending | NDS-CALL</div>
              </div>
              <div style={{ padding: '14px', border: '2px solid var(--border)', borderRadius: '9px', cursor: 'pointer' }} onClick={() => onNavigate('cp_cd')}>
                <div style={{ color: 'var(--teal)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> Commercial Paper (CP)
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '10px', marginTop: '3px' }}>Min A2 rated | CCDS settlement</div>
              </div>
              <div style={{ padding: '14px', border: '2px solid var(--border)', borderRadius: '9px', cursor: 'pointer' }} onClick={() => onNavigate('cp_cd')}>
                <div style={{ color: 'var(--success)', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileSpreadsheet size={14} /> Certificate of Deposit (CD)
                </div>
                <div style={{ color: 'var(--gray-400)', fontSize: '10px', marginTop: '3px' }}>SCB issued | Discounted</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={16} /> Investment Limit Dashboard
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}><span>G-Sec / SDL (Board: ₹40Cr)</span><b>₹28.1Cr used</b></div><div className="progress-bar"><div className="progress-fill fill-navy" style={{ width: '70.3%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}><span>FD-SCB (10% Own Funds: ₹28.5Cr)</span><b>₹22.6Cr used</b></div><div className="progress-bar"><div className="progress-fill fill-warning" style={{ width: '79.3%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}><span>Mutual Funds (Board: ₹10Cr)</span><b>₹8.76Cr used</b></div><div className="progress-bar"><div className="progress-fill fill-purple" style={{ width: '87.6%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}><span>Call Money (Board: ₹5Cr)</span><b>₹3.5Cr placed</b></div><div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '70%' }}></div></div></div>
              <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}><span>CP/CD (Board: ₹10Cr)</span><b>₹6.0Cr invested</b></div><div className="progress-bar"><div className="progress-fill fill-teal" style={{ width: '60%' }}></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
