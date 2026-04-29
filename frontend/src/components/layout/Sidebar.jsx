

import React, { useState } from 'react';
import {
  LayoutDashboard, ChevronDown, ChevronRight, ChevronUp,
  LineChart, PhoneCall, Clock, CircleDollarSign,
  Repeat, RefreshCcw, Target, Receipt,
  Star, ShoppingCart, ArrowLeftRight, TrendingDown,
  CheckSquare, BookOpen, Calculator, AlertOctagon,
  BarChart2, Activity, FileSearch, CreditCard,
  FileText, Workflow, Database, ClipboardList,
  Building2, Landmark, ShieldCheck, AlertTriangle,
  CheckCircle2, Info, XCircle, Download, RefreshCw,
  BarChart3, PlusCircle, Briefcase, Search, Settings,
} from 'lucide-react';

/* ─────────────────────────────────────────────
  FilePlus, FileCheck, FileX, FileBarChart, Banknote,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   FD & BONDS SUBMENU CONFIG
───────────────────────────────────────────────*/
const FD_BONDS_SUBMENU = [

  { id: 'fd_term_deposit_create', label: 'Term Deposit Create',   icon: Banknote      },
  { id: 'fd_term_deposit_receipt',label: 'Term Deposit Receipt',  icon: FileCheck     },
  { id: 'fd_term_deposit_close',  label: 'Term Deposit Close',    icon: FileX         },
  { id: 'fd_term_deposit_calc', label: 'Term Deposit Calculation', icon: Calculator },
  // { id: 'fd_term_deposit_report', label: 'Term Deposit Report',   icon: FileBarChart  },
  {
    id: 'fd_term_deposit_report',
    label: 'Term Deposit Report',
    icon: FileBarChart,
    hasReportSub: true,
    subItems: [
      { id: 'fd_report_balance',    label: 'Balance Register'    },
      { id: 'fd_report_investment', label: 'Investment Register' },
      { id: 'fd_report_maturity',   label: 'Investment Maturity' },
      // { id: 'fd_report_interest',   label: 'Interest Statement'  },
      // { id: 'fd_report_tds',        label: 'TDS Report'          },
    ],
  },
];

// const FD_BONDS_IDS = new Set(FD_BONDS_SUBMENU.map(i => i.id));
const FD_BONDS_IDS = new Set([
  ...FD_BONDS_SUBMENU.map(i => i.id),
  ...FD_BONDS_SUBMENU.flatMap(i => i.subItems?.map(s => s.id) ?? []),
]);
/* ─────────────────────────────────────────────
   MF SUBMENU CONFIG
───────────────────────────────────────────────*/
const MF_SUBMENU = [
  {
    label: 'Masters & Setup',
    items: [
      { id: 'mf_dashboard',     text: 'MF Dashboard' },
      { id: 'mf_amc_master',    text: 'AMC Master' },
      { id: 'mf_scheme_master', text: 'Scheme Master' },
      { id: 'mf_distributor',   text: 'Distributor / RTA Master' },
      { id: 'mf_inv_policy',    text: 'Investment Policy & Limits' },
    ],
  },
  {
    label: 'Transactions',
    items: [
      { id: 'mf_purchase', text: 'Purchase – Lumpsum' },
      { id: 'mf_sip',      text: 'SIP Setup & Mandate' },
      { id: 'mf_switch',   text: 'Switch Transaction' },
      { id: 'mf_redeem',   text: 'Redemption' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { id: 'mf_folio_register', text: 'Folio Register' },
      { id: 'mf_holdings',       text: 'Holdings & Valuation' },
      { id: 'mf_nav_upload',     text: 'NAV Upload (AMFI)' },
      { id: 'mf_idcw',           text: 'IDCW / Dividend' },
    ],
  },
  {
    label: 'Tax & Valuation',
    items: [
      { id: 'mf_cap_gains', text: 'Capital Gains (STCG/LTCG)' },
      { id: 'mf_provision', text: 'MTM & IDR Provision' },
      { id: 'mf_exit_load', text: 'Exit Load Tracking' },
    ],
  },
  {
    label: 'MIS & Governance',
    items: [
      { id: 'mf_reports',       text: 'Reports & MIS' },
      { id: 'mf_checker_queue', text: 'Maker-Checker Queue' },
      { id: 'mf_cbs_gl',        text: 'CBS GL Integration' },
      { id: 'mf_audit',         text: 'Audit Log' },
    ],
  },
];

const MF_IDS = new Set(MF_SUBMENU.flatMap(g => g.items.map(i => i.id)));

function activeMFGroup(screenId) {
  for (const g of MF_SUBMENU) {
    if (g.items.some(i => i.id === screenId)) return g.label;
  }
  return null;
}

/* ─────────────────────────────────────────────
   CP/CD SUBMENU CONFIG
───────────────────────────────────────────────*/
const CPCD_SUBMODULES = [
  {
    group: 'Masters & Setup',
    items: [
      { id: 's1',  label: 'CP / CD Dashboard',       icon: LayoutDashboard },
      { id: 's2',  label: 'Issuer Master',            icon: Building2 },
      { id: 's3',  label: 'IPA Master',               icon: Landmark },
      { id: 's4',  label: 'Rating Agency Master',     icon: Star },
      { id: 's5',  label: 'Policy & Exposure Limits', icon: ShieldCheck },
    ],
  },
  {
    group: 'Transactions',
    items: [
      { id: 's6',  label: 'Primary Market Purchase',  icon: ShoppingCart },
      { id: 's7',  label: 'Secondary Market Buy',     icon: ArrowLeftRight },
      { id: 's8',  label: 'Sale Before Maturity',     icon: TrendingDown },
      { id: 's9',  label: 'Maturity / Redemption',    icon: CheckSquare },
    ],
  },
  {
    group: 'Portfolio',
    items: [
      { id: 's10', label: 'Holdings Register',        icon: BookOpen },
      { id: 's11', label: 'Discount Accrual',         icon: Calculator },
      { id: 's12', label: 'Rating Migration Monitor', icon: AlertOctagon },
      { id: 's13', label: 'MTM Valuation',            icon: BarChart2 },
    ],
  },
  {
    group: 'Compliance & Ops',
    items: [
      { id: 's14', label: 'Exposure & Concentration', icon: Activity },
      { id: 's15', label: 'Demat Reconciliation',     icon: FileSearch },
      { id: 's16', label: 'IPA Settlement Tracker',   icon: CreditCard },
    ],
  },
  {
    group: 'MIS & Governance',
    items: [
      { id: 's17', label: 'Reports & MIS',            icon: FileText },
      { id: 's18', label: 'Maker-Checker Queue',      icon: Workflow },
      { id: 's19', label: 'CBS GL Integration',       icon: Database },
      { id: 's20', label: 'Audit Log',                icon: ClipboardList },
    ],
  },
];

const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard',  icon: BarChart3,   text: 'Dashboard' },
      { id: 'compliance', icon: ShieldCheck, text: 'SLR / CRR Compliance' },
    ],
  },
  {
    label: 'Investment Entry',
    items: [
      { id: 'new_investment', icon: PlusCircle, text: 'New Investment' },
      { id: 'portfolio',      icon: Briefcase,  text: 'Portfolio Management' },
    ],
  },
  {
    label: 'Market Instruments',
    items: [
      { 
        id: 'gsec', 
        icon: Landmark, 
        text: 'G-Sec / SDL / T-Bills',
        subSections: [
          {
            id: 'gsec_masters',
            title: 'Masters & Setup',
            items: [
              { id: 'gsec_dashboard', text: 'Dashboard' },
              { id: 'gsec_security_master', text: 'Security Master' },
              { id: 'gsec_broker_master', text: 'Broker Master' },
              { id: 'gsec_policy', text: 'Investment Policy' },
            ]
          },
          {
            id: 'gsec_deals',
            title: 'Deals',
            items: [
              { id: 'gsec_auction_bid', text: 'Primary Auction Bid' },
              { id: 'gsec_secondary_buy', text: 'Secondary Buy Deal' },
              { id: 'gsec_sell', text: 'Sell Deal' },
              { id: 'gsec_shift', text: 'Classification / Shift' },
            ]
          },
          {
            id: 'gsec_portfolio',
            title: 'Portfolio',
            items: [
              { id: 'gsec_portfolio_holding', text: 'Holding Register' },
              { id: 'gsec_portfolio_ladder', text: 'Maturity Ladder' },
              { id: 'gsec_portfolio_coupon', text: 'Coupon Calendar' },
              { id: 'gsec_portfolio_accrual', text: 'Interest Accrual' },
            ]
          },
          {
            id: 'gsec_valuation',
            title: 'Valuation & Compliance',
            items: [
              { id: 'gsec_val_mtm', text: 'MTM Valuation' },
              { id: 'gsec_val_idr_ifr', text: 'IDR / IFR Movement' },
              { id: 'gsec_val_slr', text: 'SLR & Form VIII' },
              { id: 'gsec_val_repo', text: 'Repo / Reverse Repo' },
            ]
          },
          {
            id: 'gsec_mis',
            title: 'MIS & Governance',
            items: [
              { id: 'gsec_mis_reports', text: 'Reports & MIS' },
              { id: 'gsec_mis_queue', text: 'Maker-Checker Queue' },
              { id: 'gsec_mis_cbs', text: 'CBS GL Integration' },
              { id: 'gsec_mis_audit', text: 'Audit Log' },
            ]
          }
        ]
      },
      { id: 'fd_bonds',    icon: Building2, text: 'FD & Bonds' },
      // ── FD & Bonds now has hasFdBondsSub flag ──
      { id: 'fd_bonds', icon: Building2, text: 'FD & Bonds', hasFdBondsSub: true },
      { id: 'mutual_fund', icon: LineChart, text: 'Mutual Funds', hasSub: true },
      { id: 'call_money',  icon: PhoneCall, text: 'Call / Notice Money' },
      { id: 'cp_cd',       icon: FileText,  text: 'CP / CD Market', hasCpCdSub: true },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'maturity',  icon: Clock,            text: 'Maturity Tracker', badge: '7' },
      { id: 'interest',  icon: CircleDollarSign, text: 'Interest & Income' },
      { id: 'valuation', icon: TrendingDown,     text: 'Valuation (MTM)' },
      { id: 'transfer',  icon: Repeat,           text: 'Category Shift' },
      { id: 'transfer',  icon: Repeat,           text: 'Category Transfer' },
      { id: 'renewal',   icon: RefreshCcw,       text: 'FD / CP Renewal' },
    ],
  },
  {
    label: 'Limits & Control',
    items: [
      { id: 'limits',    icon: Target,  text: 'Investment Limits' },
      { id: 'dealslip',  icon: Receipt, text: 'Deal Slips' },
    ],
  },
  {
    label: 'Reports & Audit',
    items: [
      { id: 'reports',     icon: ClipboardList, text: 'Reports' },
      { id: 'rbi_returns', icon: Landmark,      text: 'RBI Returns' },
      { id: 'audit',       icon: Search,        text: 'Audit Trail' },
      { id: 'master',      icon: Settings,      text: 'Masters' },
    ],
  },
];

export default function Sidebar({ activeScreen, onNavigate, cpcdSubScreen, onCpcdNavigate }) {
  const isCpCdActive = activeScreen === 'cp_cd';
  const isMfActive   = MF_IDS.has(activeScreen) || activeScreen === 'mutual_fund';
export default function Sidebar({
  activeScreen,
  onNavigate,
  cpcdSubScreen,
  onCpcdNavigate,
  // ── NEW props for FD & Bonds ──
  fdBondsSubScreen,
  onFdBondsNavigate,
}) {
  const isCpCdActive    = activeScreen === 'cp_cd';
  const isMfActive      = MF_IDS.has(activeScreen) || activeScreen === 'mutual_fund';
  const isFdBondsActive = FD_BONDS_IDS.has(activeScreen) || activeScreen === 'fd_bonds';

  // ── G-Sec expanded items ──
  const [expandedItems, setExpandedItems] = useState(() => {
    const initialState = {};
    if (activeScreen && activeScreen.startsWith('gsec')) {
      initialState.gsec = true;
      navSections.forEach(section => {
        section.items.forEach(item => {
          if (item.subSections) {
            item.subSections.forEach(sub => {
              if (sub.items.some(si => si.id === activeScreen)) {
                initialState[sub.id] = true;
              }
            });
          }
        });
      });
    }
    return initialState;
  });

  // ── CP/CD panel open/close ──
  const [cpcdExpanded, setCpcdExpanded] = useState(isCpCdActive);

  // ── CP/CD group open/close ──
  const [cpcdGroups, setCpcdGroups] = useState({
    'Masters & Setup':  true,
    'Transactions':     true,
    'Portfolio':        false,
    'Compliance & Ops': false,
    'MIS & Governance': false,
  });

  // ── MF panel open/close ──
  const [mfOpen, setMfOpen] = useState(isMfActive);

  // ── MF group open/close ──
  const initMFGroups = () => {
    const ag = activeMFGroup(activeScreen);
    const state = {};
    MF_SUBMENU.forEach(g => { state[g.label] = g.label === ag; });
    return state;
  };
  const [mfGroupOpen, setMfGroupOpen] = useState(initMFGroups);

  // ── FD & Bonds panel open/close ──
  const [fdBondsExpanded, setFdBondsExpanded] = useState(isFdBondsActive);
const [fdReportOpen, setFdReportOpen] = useState(
  activeScreen?.startsWith('fd_report_')
);
  /* ── helpers ── */
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCpcdGroup = (group) =>
    setCpcdGroups(prev => ({ ...prev, [group]: !prev[group] }));

  const toggleMfGroup = (label) =>
    setMfGroupOpen(prev => ({ ...prev, [label]: !prev[label] }));

  const handleCpCdClick = () => {
    if (!isCpCdActive) {
      onNavigate('cp_cd');
      if (!cpcdSubScreen && onCpcdNavigate) onCpcdNavigate('s1');
      setCpcdExpanded(true);
    } else {
      setCpcdExpanded(prev => !prev);
    }
  };

  // ── FD & Bonds click handler (mirrors CP/CD pattern) ──
  const handleFdBondsClick = () => {
    if (!isFdBondsActive) {
      onNavigate('fd_bonds');
      if (!fdBondsSubScreen && onFdBondsNavigate) onFdBondsNavigate('fd_new_purchase');
      setFdBondsExpanded(true);
    } else {
      setFdBondsExpanded(prev => !prev);
    }
  };

  const isSubItemActive = (item) => {
    if (activeScreen === item.id) return true;
    if (item.subSections) {
      return item.subSections.some(sec => 
        sec.items.some(sub => sub.id === activeScreen)
      );
    }
    return false;
  };

  const showCpCdSub = isCpCdActive && cpcdExpanded;
  const showCpCdSub    = isCpCdActive && cpcdExpanded;
  const showFdBondsSub = isFdBondsActive && fdBondsExpanded;

  return (
    <nav className="sidebar">
      {/* ── Logo ── */}
      <div className="sidebar-logo">
        <div className="brand">AVS InSoTech</div>
        <div className="sub">Treasury System v2.0</div>
      </div>

      {/* ── Nav Sections ── */}
      {navSections.map((section, si) => (
        <div className="sidebar-section" key={si}>
          <div className="sidebar-section-label">{section.label}</div>

          {section.items.map((item) => {
            const hasGSecSub = !!item.subSections;
            const isGSecExpanded = !!expandedItems[item.id];
            const isGSecActive = isSubItemActive(item);
            const hasGSecSub    = !!item.subSections;
            const isGSecExpanded = !!expandedItems[item.id];
            const isGSecActive  = isSubItemActive(item);

            /* ════════════════════════════════
               MUTUAL FUNDS — with submenu
            ════════════════════════════════ */
            if (item.hasSub) {
              return (
                <div key={item.id}>
                  <div
                    className={`nav-item ${isMfActive ? 'active' : ''}`}
                    onClick={() => {
                      setMfOpen(o => !o);
                      if (!mfOpen) onNavigate('mutual_fund');
                    }}
                  >
                    <item.icon size={16} strokeWidth={2.5} className="icon" />
                    <span style={{ flex: 1 }}>{item.text}</span>
                    {mfOpen
                      ? <ChevronUp   size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                      : <ChevronDown size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                    }
                  </div>

                  {mfOpen && (
                    <div className="nav-nested-container expanded">
                      {MF_SUBMENU.map((group) => {
                        const isOpen      = mfGroupOpen[group.label];
                        const hasActive   = group.items.some(i => i.id === activeScreen);
                        const isOpen    = mfGroupOpen[group.label];
                        const hasActive = group.items.some(i => i.id === activeScreen);
                        return (
                          <div key={group.label} className="nav-sub-group">
                            <div
                              className={`nav-sub-group-header ${hasActive ? 'has-active' : ''}`}
                              onClick={() => toggleMfGroup(group.label)}
                            >
                              <span style={{ color: hasActive ? 'var(--gold)' : 'inherit' }}>{group.label}</span>
                              {isOpen
                                ? <ChevronUp   size={11} style={{ opacity: 0.6, flexShrink: 0 }} className="nested-chevron" />
                                : <ChevronDown size={11} style={{ opacity: 0.6, flexShrink: 0 }} className="nested-chevron" />
                              }
                            </div>
                            {isOpen && (
                              <div className="nav-nested-level-3 expanded">
                                {group.items.map(sub => (
                                  <div
                                    key={sub.id}
                                    className={`nav-sub-item ${activeScreen === sub.id ? 'active' : ''}`}
                                    onClick={() => onNavigate(sub.id)}
                                  >
                                    {sub.text}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            /* ════════════════════════════════
               FD & BONDS — with submenu
            ════════════════════════════════ */
           if (item.hasFdBondsSub) {
  return (
    <div key={item.id}>
      <div
        className={`nav-item ${isFdBondsActive ? 'active' : ''}`}
        onClick={handleFdBondsClick}
      >
        <item.icon size={16} strokeWidth={2.5} className="icon" />
        <span style={{ flex: 1 }}>{item.text}</span>
        {showFdBondsSub
          ? <ChevronUp   size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
          : <ChevronDown size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
        }
      </div>

      {showFdBondsSub && (
        <div className="nav-nested-container expanded">
          <div className="nav-nested-level-3 expanded">
            {FD_BONDS_SUBMENU.map((sub, idx) => {
              const SubIcon = sub.icon;

              if (sub.hasReportSub) {
                // ── highlight when any sub-report is active OR report parent itself ──
                const reportParentActive =
                  fdBondsSubScreen === sub.id ||
                  sub.subItems.some(r => r.id === activeScreen);

                return (
                  <div key={sub.id}>
                    {/* ── Report parent row ── */}
                    <div
                      className={`nav-sub-item ${reportParentActive ? 'active' : ''}`}
                      onClick={() => {
                        setFdReportOpen(o => !o);
                        onFdBondsNavigate?.(sub.id); // ← marks it active
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <span style={{
                        background: reportParentActive ? 'var(--gold)' : 'var(--navy)',
                        color:      reportParentActive ? 'var(--navy)' : '#fff',
                        fontSize: 9, width: 18, height: 18, borderRadius: 3,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                      }}>
                        {idx + 1}
                      </span>
                      <SubIcon size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 11, lineHeight: 1.3, flex: 1 }}>{sub.label}</span>
                      {fdReportOpen
                        ? <ChevronUp   size={10} style={{ opacity: 0.5, flexShrink: 0 }} />
                        : <ChevronDown size={10} style={{ opacity: 0.5, flexShrink: 0 }} />
                      }
                    </div>

                    {/* ── Report sub-items with a/b/c/d letters ── */}
                    {fdReportOpen && (
                      <div style={{ paddingLeft: 28 }}>
                        {sub.subItems.map((rep, repIdx) => (
                          <div
                            key={rep.id}
                            className={`nav-sub-item ${activeScreen === rep.id ? 'active' : ''}`}
                            onClick={() => onFdBondsNavigate?.(rep.id)}
                            style={{
                              fontSize: 10.5, paddingLeft: 8,
                              borderLeft: '2px solid var(--border)',
                              display: 'flex', alignItems: 'center', gap: 6,
                            }}
                          >
                            <span style={{
                              background: activeScreen === rep.id ? 'var(--gold)' : 'transparent',
                              color:      activeScreen === rep.id ? 'var(--navy)' : 'var(--gold)',
                              border:     '1px solid var(--gold)',
                              fontSize: 8, width: 16, height: 16, borderRadius: 3,
                              display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                            }}>
                              {String.fromCharCode(97 + repIdx)}
                            </span>
                            {rep.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // ── Regular FD sub-items (1–4) ──
              return (
                <div
                  key={sub.id}
                  className={`nav-sub-item ${fdBondsSubScreen === sub.id ? 'active' : ''}`}
                  onClick={() => onFdBondsNavigate?.(sub.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span style={{
                    background: fdBondsSubScreen === sub.id ? 'var(--gold)' : 'var(--navy)',
                    color:      fdBondsSubScreen === sub.id ? 'var(--navy)' : '#fff',
                    fontSize: 9, width: 18, height: 18, borderRadius: 3,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                  }}>
                    {idx + 1}
                  </span>
                  <SubIcon size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 11, lineHeight: 1.3 }}>{sub.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
  

            /* ════════════════════════════════
               CP / CD MARKET — with submenu
            ════════════════════════════════ */
            if (item.hasCpCdSub) {
              return (
                <div key={item.id}>
                  <div
                    className={`nav-item ${isCpCdActive ? 'active' : ''}`}
                    onClick={handleCpCdClick}
                  >
                    <item.icon size={16} strokeWidth={2.5} className="icon" />
                    <span style={{ flex: 1 }}>{item.text}</span>
                    {showCpCdSub
                      ? <ChevronUp   size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                      : <ChevronDown size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                    }
                  </div>

                  {showCpCdSub && (
                    <div className="nav-nested-container expanded">
                      {CPCD_SUBMODULES.map((group) => {
                        const isOpen    = cpcdGroups[group.group];
                        const hasActive = group.items.some(i => i.id === cpcdSubScreen);
                        return (
                          <div key={group.group} className="nav-sub-group">
                            <div
                              className={`nav-sub-group-header ${hasActive ? 'has-active' : ''}`}
                              onClick={() => toggleCpcdGroup(group.group)}
                            >
                              <span style={{ color: hasActive ? 'var(--gold)' : 'inherit' }}>{group.group}</span>
                              {isOpen
                                ? <ChevronUp   size={11} style={{ opacity: 0.6, flexShrink: 0 }} className="nested-chevron" />
                                : <ChevronDown size={11} style={{ opacity: 0.6, flexShrink: 0 }} className="nested-chevron" />
                              }
                            </div>

                            {isOpen && (
                              <div className="nav-nested-level-3 expanded">
                                {group.items.map(sub => {
                                  const SubIcon    = sub.icon;
                                  const subIsActive = cpcdSubScreen === sub.id;
                                  return (
                                    <div
                                      key={sub.id}
                                      className={`nav-sub-item ${subIsActive ? 'active' : ''}`}
                                      onClick={() => onCpcdNavigate?.(sub.id)}
                                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                                    >
                                      <span style={{
                                        background: subIsActive ? 'var(--gold)' : 'var(--navy)',
                                        color:      subIsActive ? 'var(--navy)' : '#fff',
                                        fontSize: 9, width: 18, height: 18, borderRadius: 3,
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontWeight: 700, flexShrink: 0,
                                      }}>
                                        {sub.id.replace('s', '')}
                                      </span>
                                      <SubIcon size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
                                      <span style={{ fontSize: 11, lineHeight: 1.3 }}>{sub.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            /* ════════════════════════════════
               REGULAR NAV ITEM (Including G-Sec)
            ════════════════════════════════ */
            return (
              <div key={item.id} className="nav-item-wrapper">
                <div
                  className={`nav-item ${isGSecActive ? 'active' : ''} ${hasGSecSub ? 'nav-parent-item' : ''}`}
                  onClick={() => {
                    if (hasGSecSub) {
                      toggleExpand(item.id);
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                >
                  <item.icon size={16} strokeWidth={2.5} className="icon" /> 
                  <span style={{flex: 1}}>{item.text}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                  {hasGSecSub && (
                    <ChevronDown 
                      size={14} 
                      className={`nav-chevron ${isGSecExpanded ? 'rotated' : ''}`} 
                    />
                  )}
                </div>

                {hasGSecSub && (
                  <div className={`nav-nested-container ${isGSecExpanded ? 'expanded' : ''}`}>
                    {item.subSections.map((subSec) => {
                      const isSubExpanded = !!expandedItems[subSec.id];
                      return (
                        <div key={subSec.id} className="nav-sub-group">
                          <div 
                            className="nav-sub-group-header"
                            onClick={() => toggleExpand(subSec.id)}
                          >
                            <span>{subSec.title}</span>
                            <ChevronDown 
                              size={12} 
                              className={`nested-chevron ${isSubExpanded ? 'rotated' : ''}`} 
                            />
                          </div>
                          
                          <div className={`nav-nested-level-3 ${isSubExpanded ? 'expanded' : ''}`}>
                            {subSec.items.map(subItem => (
                              <div
                                key={subItem.id}
                                className={`nav-sub-item ${activeScreen === subItem.id ? 'active' : ''}`}
                                onClick={() => onNavigate(subItem.id)}
                              >
                                {subItem.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">TM</div>
          <div>
            <div className="user-name">Treasury Manager</div>
            <div className="user-role">Maker · Branch HO</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

