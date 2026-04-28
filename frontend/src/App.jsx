import React, { useState } from 'react';
import LoginScreen from './components/layout/LoginScreen';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Modal from './components/shared/Modal';
import { ShieldCheck, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Screen imports
import Dashboard from './components/screens/Dashboard';
import Compliance from './components/screens/Compliance';
import NewInvestment from './components/screens/NewInvestment';
import Portfolio from './components/screens/Portfolio';
import GSec from './components/screens/GSec';

import CallMoney from './components/screens/CallMoney';
import CPCD from './components/screens/CPCD';
import MaturityTracker from './components/screens/MaturityTracker';
import InterestIncome from './components/screens/InterestIncome';
import Valuation from './components/screens/Valuation';
import CategoryTransfer from './components/screens/CategoryTransfer';
import Renewal from './components/screens/Renewal';
import InvestmentLimits from './components/screens/InvestmentLimits';
import DealSlips from './components/screens/DealSlips';
import Reports from './components/screens/Reports';
import RBIReturns from './components/screens/RBIReturns';
import AuditTrail from './components/screens/AuditTrail';
import Masters from './components/screens/Masters';
import FileUpload from './components/screens/FileUpload';
import TermDepositCreate from './components/screens/TermDepositCreate';
import TermDepositReceipt from './components/screens/TermDepositReceipt';
import TermDepositClose from './components/screens/TermDepositClose'
import TermDepositCalc from './components/screens/TermDepositCalc';
import BalanceRegister from './components/screens/BalanceRegister';
import InvestmentRegister from './components/screens/InvestmentRegister';
import InvestmentMaturity from './components/screens/InvestmentMaturity';

// in renderScreen():

// inside renderScreen():

import GSecSell from './components/screens/GSecSell';
import SecurityMaster from './components/screens/SecurityMaster';
import BrokerMaster from './components/screens/BrokerMaster';

// Mutual Fund Master & Setup
import MFDashboard from './components/screens/MFDashboard';
import Amcmaster from './components/screens/Amcmaster';
import Schememaster from './components/screens/Schememaster';
import Distributorrtamaster from './components/screens/Distributorrtamaster';

// Mutual Fund Transactions
import Mfpurchase from './components/screens/MFPurchase';
import Mfsip from './components/screens/Mfsip';
import Mfswitch from './components/screens/Mfswitch';
import Mfredeem from './components/screens/Mfredeem';

// Mutual Fund Portfolio & Analysis
import Mffolioregister from './components/screens/Mffolioregister';
import Mfholdingsvaluation from './components/screens/Mfholdingsvaluation';
import Mfnavupload from './components/screens/Mfnavupload';
import Mfidcw from './components/screens/Mfidcw';
import Mfcapitalgains from './components/screens/Mfcapitalgains';
import Mfmtmprovision from './components/screens/Mfmtmprovision';
import Mfexitload from './components/screens/Mfexitload';

// Mutual Fund MIS & Governance
import Mfreportsmis from './components/screens/Mfreportsmis';
import Mfcheckerqueue from './components/screens/Mfcheckerqueue';
import Mfcbsgl from './components/screens/Mfcbsgl';
import Mfauditlog from './components/screens/Mfauditlog';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [cpcdSubScreen, setCpcdSubScreen] = useState('s1');
 const [fdBondsSubScreen, setFdBondsSubScreen] = useState('fd_term_deposit_create');
  const [screenParams, setScreenParams] = useState({});
  const [modals, setModals] = useState({
    checker: false,
    mfRedeem: false,
    cmRoll: false,
  });

  const handleCpcdNavigate = (subId) => {
    setActiveScreen('cp_cd');
    setCpcdSubScreen(subId);
  };
const handleFdBondsNavigate = (subId) => {
  setActiveScreen(subId);        // ← use the actual sub-screen id
  setFdBondsSubScreen(subId);
};
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const openModal = (modalId) => {
    setModals(prev => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId) => {
    setModals(prev => ({ ...prev, [modalId]: false }));
  };


const navigate = (screenId, params = {}) => {
    setActiveScreen(screenId);
    setScreenParams(params);
};
  // Render the active screen
  const renderScreen = () => {
    const props = { onNavigate: navigate, onOpenModal: openModal, screenParams };

    switch (activeScreen) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'compliance': return <Compliance {...props} />;
      case 'new_investment': return <NewInvestment {...props} />;
      case 'portfolio': return <Portfolio {...props} />;
      case 'gsec': return <GSec {...props} />;
      case 'gsec_sell': return <GSecSell {...props} />;
      case 'gsec_security_master': return <SecurityMaster {...props} />;
      case 'gsec_broker_master': return <BrokerMaster {...props} />;
     
      
      // Mutual Fund Sub-screens
      case 'mf_dashboard':     return <MFDashboard {...props} />;
      case 'mf_amc_master':    return <Amcmaster {...props} />;
      case 'mf_scheme_master': return <Schememaster {...props} />;
      case 'mf_distributor':   return <Distributorrtamaster {...props} />;
      case 'mf_inv_policy':    return <InvestmentLimits {...props} />; // Reusing InvestmentLimits
      case 'mf_purchase':      return <Mfpurchase {...props} />;
      case 'mf_sip':           return <Mfsip {...props} />;
      case 'mf_switch':        return <Mfswitch {...props} />;
      case 'mf_redeem':        return <Mfredeem {...props} />;
      case 'mf_folio_register': return <Mffolioregister {...props} />;
      case 'mf_holdings':      return <Mfholdingsvaluation {...props} />;
      case 'mf_nav_upload':    return <Mfnavupload {...props} />;
      case 'mf_idcw':          return <Mfidcw {...props} />;
      case 'mf_cap_gains':     return <Mfcapitalgains {...props} />;
      case 'mf_provision':     return <Mfmtmprovision {...props} />;
      case 'mf_exit_load':     return <Mfexitload {...props} />;
      case 'mf_reports':       return <Mfreportsmis {...props} />;
      case 'mf_checker_queue': return <Mfcheckerqueue {...props} />;
      case 'mf_cbs_gl':        return <Mfcbsgl {...props} />;
      case 'mf_audit':         return <Mfauditlog {...props} />;

      case 'call_money': return <CallMoney {...props} />;
      case 'cp_cd': return <CPCD {...props} subScreen={cpcdSubScreen} />;
     case 'fd_bonds':
case 'fd_term_deposit_create':return <TermDepositCreate {...props} />;
case 'fd_term_deposit_receipt':return <TermDepositReceipt {...props} />;
  case 'fd_term_deposit_close':  return <TermDepositClose {...props} />;
  case 'fd_term_deposit_calc': return <TermDepositCalc {...props} />;
// case 'fd_term_deposit_report':   return <div>Term Deposit Report</div>;
// case 'fd_report_balance':    return <div>Balance Register</div>;
case 'fd_report_balance': return <BalanceRegister {...props} />;
// case 'fd_report_investment': return <div>Investment Register</div>;
case 'fd_report_investment': return <InvestmentRegister {...props} />;
// case 'fd_report_maturity':   return <div>Investment Maturity</div>;
case 'fd_report_maturity': return <InvestmentMaturity {...props} />;
// case 'fd_report_interest':   return <div>Interest Statement</div>;
// case 'fd_report_tds':        return <div>TDS Report</div>;
      case 'maturity': return <MaturityTracker {...props} />;
      case 'interest': return <InterestIncome {...props} />;
      case 'valuation': return <Valuation {...props} />;
      case 'transfer': return <CategoryTransfer {...props} />;
      case 'renewal': return <Renewal {...props} />;
      case 'limits': return <InvestmentLimits {...props} />;
      case 'dealslip': return <DealSlips {...props} />;
      case 'reports': return <Reports {...props} />;
      case 'rbi_returns': return <RBIReturns {...props} />;
      case 'audit': return <AuditTrail {...props} />;
      case 'master': return <Masters {...props} />;
      case 'file_upload': return <FileUpload {...props} />;
     
     
      default: return <Dashboard {...props} />;
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }


return (
    <>
      <div className="app-shell">
        <Sidebar 
          activeScreen={activeScreen} 
          onNavigate={navigate} 
          cpcdSubScreen={cpcdSubScreen}

          onCpcdNavigate={handleCpcdNavigate}
          fdBondsSubScreen={fdBondsSubScreen}         
  onFdBondsNavigate={handleFdBondsNavigate}    
        />
        <div className="main">
          <Topbar activeScreen={activeScreen} onNavigate={navigate} onLogout={handleLogout} />
          <div className="content">
            <div key={activeScreen} className="screen active">
              {renderScreen()}
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODALS ========== */}

      {/* Checker Approval Modal */}
      <Modal
        show={modals.checker}
        onClose={() => closeModal('checker')}
        title="Submit for Checker Approval"
        footer={
          <>
            <button className="topbar-btn btn-outline" onClick={() => closeModal('checker')}>Cancel</button>
            <button className="topbar-btn btn-primary" onClick={() => { closeModal('checker'); alert('✅ Submitted to Checker for approval!'); }}>Submit for Approval</button>
          </>
        }
      >
        <div className="rbi-info-box">
          <div className="rbi-header">
            <span className="rbi-tag">RBI</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--navy)' }}>Dual Control — Maker-Checker for ≥ ₹25 Lakhs</span>
          </div>
          <div className="rbi-text">All investments ≥ ₹25 Lakhs require independent Checker approval. Checker must verify instrument, amount, rate, limit, classification and compliance before approval.</div>
        </div>
        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label className="form-label">Select Checker <span className="req">*</span></label>
          <select className="form-select">
            <option>Checker 1 – Sr. Manager Treasury</option>
            <option>Checker 2 – GM Finance</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Remarks for Checker</label>
          <textarea className="form-textarea" rows="3" defaultValue="Investment within board approved limits. All compliance checks passed." />
        </div>
      </Modal>

      {/* MF Redeem Modal */}
      <Modal
        show={modals.mfRedeem}
        onClose={() => closeModal('mfRedeem')}
        title="Mutual Fund Redemption"
        footer={
          <>
            <button className="topbar-btn btn-outline" onClick={() => closeModal('mfRedeem')}>Cancel</button>
            <button className="topbar-btn btn-primary" onClick={() => { closeModal('mfRedeem'); openModal('checker'); }}>Submit Redemption</button>
          </>
        }
      >
        <div className="alert-banner info" style={{ marginBottom: '14px' }}>ℹ️ HDFC Liquid Fund — Redemption T+1 settlement. Min redemption ₹500.</div>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Folio</label><input className="form-input readonly" defaultValue="HDFC/LF/0045" readOnly /></div>
          <div className="form-group"><label className="form-label">Current Value (₹)</label><input className="form-input readonly" defaultValue="₹3,32,10,430" readOnly /></div>
          <div className="form-group"><label className="form-label">Redemption Amount (₹)</label><input className="form-input" defaultValue="1,00,00,000" /></div>
          <div className="form-group"><label className="form-label">Reason</label>
            <select className="form-select"><option>Liquidity Requirement</option><option>Reinvestment</option></select>
          </div>
        </div>
      </Modal>

      {/* Call Money Rollover Modal */}
      <Modal
        show={modals.cmRoll}
        onClose={() => closeModal('cmRoll')}
        title="Call Money Rollover"
        footer={
          <>
            <button className="topbar-btn btn-outline" onClick={() => closeModal('cmRoll')}>Cancel</button>
            <button className="topbar-btn btn-primary" onClick={() => { closeModal('cmRoll'); alert('✅ Call Money rolled over @ 6.62% for 16-Apr-2026. NDS-CALL updated.'); }}>Confirm Rollover</button>
          </>
        }
      >
        <div className="alert-banner warning" style={{ marginBottom: '14px' }}>⚠️ Rollover must be confirmed before 12:00 Noon. Report on NDS-CALL.</div>
        <div className="form-grid">
          <div className="form-group"><label className="form-label">Deal ID</label><input className="form-input readonly" defaultValue="CM-2604-001" readOnly /></div>
          <div className="form-group"><label className="form-label">Counterparty</label><input className="form-input readonly" defaultValue="SBI – Mumbai" readOnly /></div>
          <div className="form-group"><label className="form-label">Principal (₹)</label><input className="form-input readonly" defaultValue="1,00,00,000" readOnly /></div>
          <div className="form-group"><label className="form-label">New Rate % (today)</label><input className="form-input" defaultValue="6.62" /><div className="form-hint">Market rate today: 6.62%</div></div>
          <div className="form-group"><label className="form-label">Rollover Date</label><input className="form-input" type="date" defaultValue="2026-04-16" /></div>
          <div className="form-group"><label className="form-label">New Maturity</label><input className="form-input readonly" defaultValue="17-Apr-2026" readOnly /></div>
        </div>
      </Modal>
    </>
  );
}