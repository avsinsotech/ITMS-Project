import { Bell, LogOut, PlusCircle, ShieldCheck } from 'lucide-react';

const screenTitles = {
  dashboard: ['Dashboard', 'Complete Portfolio Overview | 15-Apr-2026'],
  compliance: ['SLR / CRR Compliance', 'Regulatory Compliance Monitoring'],
  new_investment: ['New Investment', 'All Instrument Types | RBI Compliant'],
  portfolio: ['Portfolio Management', 'All Investments — Complete View'],
  gsec: ['G-Sec / SDL / T-Bills', 'SLR Eligible Securities'],
  gsec_dashboard: ['G-Sec / SDL / T-Bills', 'SLR Eligible Securities'],
  gsec_sell: ['G-Sec Sell Deal', 'Secondary Market Sale Transaction'],
  gsec_shift: ['Classification / Shift', 'HTM / AFS / HFT — Re-classification'],
  gsec_security_master: ['Security Master', 'G-Sec / SDL / T-Bill Instrument Setup'],
  gsec_broker_master: ['Broker Master', 'Approved Counterparties & Brokers'],
  gsec_policy: ['Investment Policy', 'Board Exposure Limits & SLR Targets'],
  gsec_portfolio_holding: ['G-Sec Holdings', 'Current SLR Portfolio Register'],
  fd_bonds: ['FD & Bonds', 'Fixed Deposits + NABARD/NHB Bonds'],
  mutual_fund: ['Mutual Funds', 'Liquid | Overnight | Gilt | Debt'],
  call_money: ['Call / Notice Money', 'Overnight & Term Placements | NDS-CALL'],
  cp_cd: ['CP / CD Market', 'Commercial Paper & Certificates of Deposit'],
  maturity: ['Maturity Tracker', 'All Upcoming Maturities & Actions'],
  interest: ['Interest & Income', 'Accrued & Received | All Instruments'],
  valuation: ['Valuation (MTM)', 'FIMMDA + AMFI NAV Based Marking'],
  transfer: ['Category Transfer', 'HTM / AFS / HFT — RBI Window'],
  renewal: ['FD / CP Renewal', 'Renewal & Reinvestment Management'],
  limits: ['Investment Limits', 'Board Limits vs Actuals | Live'],
  dealslip: ['Deal Slips', 'Maker-Checker Transaction Register'],
  reports: ['Reports', 'Standard + RBI Regulatory Reports'],
  rbi_returns: ['RBI Returns', 'Submission Status & Tracker'],
  audit: ['Audit Trail', 'Complete Activity Log'],
  master: ['Masters', 'Banks, Categories & System Config'],
};

export default function Topbar({ activeScreen, onNavigate, onLogout }) {
  const titles = screenTitles[activeScreen] || ['Dashboard', ''];

  return (
    <div className="topbar">
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <span className="topbar-title" style={{ flex: 'none' }}>{titles[0]}</span>
        <span className="topbar-subtitle">{titles[1]}</span>
      </div>
      <span className="rbi-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ShieldCheck size={10} strokeWidth={3} /> RBI UCB COMPLIANT
      </span>
      <button className="topbar-btn btn-outline" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Bell size={14} /> Alerts (7)
      </button>
      <button className="topbar-btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => onNavigate('new_investment')}>
        <PlusCircle size={14} /> New Investment
      </button>
      <button className="topbar-btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger)', borderColor: 'var(--danger-bg)', marginLeft: '10px' }} onClick={onLogout}>
        <LogOut size={14} /> Logout
      </button>
    </div>
  );
}
