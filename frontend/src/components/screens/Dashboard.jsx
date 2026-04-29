import React from 'react';
import { Briefcase, Target, CheckCircle2, Clock } from 'lucide-react';

export default function Dashboard({ onNavigate, onOpenModal }) {
  return (
    <div>
      {/* Compliance Strip */}
      <div className="compliance-strip">
        <div className="cs-item">
          <div className="cs-label">SLR Status</div>
          <div className="cs-value">24.80%</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>Min 18% Required</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">CRR Status</div>
          <div className="cs-value">4.20%</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>Min 4% Required</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">NDTL</div>
          <div className="cs-value">₹142.5 Cr</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>Net Dem. & Time Liab.</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">Total Portfolio</div>
          <div className="cs-value">₹84.60 Cr</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>All instruments</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">Call Money O/S</div>
          <div className="cs-value">₹3.50 Cr</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>Overnight placed</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">CP Invested</div>
          <div className="cs-value">₹6.00 Cr</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>A1+ rated only</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">MF NAV (Liquid)</div>
          <div className="cs-value">₹1,284.56</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>As of today</div>
        </div>
        <div className="cs-divider"></div>
        <div className="cs-item">
          <div className="cs-label">RBI Compliance</div>
          <div style={{ marginTop: '3px' }}><span className="cs-pill ok">✓ ALL NORMS MET</span></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-6">
        <div className="stat-card highlight"><div className="label">Total Portfolio</div><div className="value">₹84.60 Cr</div><div className="change neutral">↑ 5.2% YoY</div></div>
        <div className="stat-card"><div className="label">Govt. Securities</div><div className="value">₹35.34 Cr</div><div className="change up">6 holdings</div></div>
        <div className="stat-card"><div className="label">Fixed Deposits</div><div className="value">₹22.60 Cr</div><div className="change up">14 FDs</div></div>
        <div className="stat-card"><div className="label">Mutual Funds</div><div className="value">₹8.76 Cr</div><div className="change up" style={{ color: 'var(--purple)' }}>4 schemes</div></div>
        <div className="stat-card"><div className="label">Call Money</div><div className="value">₹3.50 Cr</div><div className="change neutral" style={{ color: 'var(--warning)' }}>Overnight</div></div>
        <div className="stat-card gold-card"><div className="label">CP / CD</div><div className="value">₹6.00 Cr</div><div className="change neutral">3 CPs active</div></div>
      </div>

      {/* Main Content */}
      <div className="left-wide">
        <div>
          {/* Portfolio Summary Table */}
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={16} /> Complete Portfolio Summary — All Instruments
              </span>
              <button className="btn-sm gold" onClick={() => onNavigate('portfolio')}>View All</button>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Instrument Type</th><th>Classification</th><th>SLR</th><th>Holdings</th>
                    <th>Amount (₹ Cr)</th><th>Portfolio %</th><th>Avg Yield</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() => onNavigate('gsec')}>
                    <td><b>Central Govt Securities (G-Sec)</b></td>
                    <td><span className="badge htm">HTM</span></td>
                    <td><span className="badge slr">SLR</span></td>
                    <td>4</td><td>₹18.40</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-navy" style={{ width: '21.7%' }}></div></div>21.7%</td>
                    <td>7.28%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('gsec')}>
                    <td><b>State Dev. Loans (SDL)</b></td>
                    <td><span className="badge htm">HTM</span></td>
                    <td><span className="badge slr">SLR</span></td>
                    <td>3</td><td>₹9.70</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-navy" style={{ width: '11.5%' }}></div></div>11.5%</td>
                    <td>7.55%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('gsec')}>
                    <td><b>Treasury Bills (91/182/364d)</b></td>
                    <td><span className="badge hft">HFT</span></td>
                    <td><span className="badge slr">SLR</span></td>
                    <td>3</td><td>₹7.24</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '8.6%' }}></div></div>8.6%</td>
                    <td>6.80%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('fd_bonds')}>
                    <td><b>FD – Scheduled Comm. Banks</b></td>
                    <td><span className="badge afs">AFS</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>8</td><td>₹14.60</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-warning" style={{ width: '17.3%' }}></div></div>17.3%</td>
                    <td>7.00%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('fd_bonds')}>
                    <td><b>NABARD / NHB / SIDBI Bonds</b></td>
                    <td><span className="badge htm">HTM</span></td>
                    <td><span className="badge slr">SLR</span></td>
                    <td>4</td><td>₹11.25</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-success" style={{ width: '13.3%' }}></div></div>13.3%</td>
                    <td>7.10%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('mutual_fund')}>
                    <td><b>Mutual Funds (Liquid + Debt)</b></td>
                    <td><span className="badge afs">AFS</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>4</td><td>₹8.76</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-purple" style={{ width: '10.4%' }}></div></div>10.4%</td>
                    <td>7.45%</td><td><span className="badge active">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('call_money')}>
                    <td><b>Call / Notice Money</b></td>
                    <td><span className="badge hft">HFT</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>2</td><td>₹3.50</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-warning" style={{ width: '4.1%' }}></div></div>4.1%</td>
                    <td>6.60%</td><td><span className="badge cm">Overnight</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('cp_cd')}>
                    <td><b>Commercial Papers (CP)</b></td>
                    <td><span className="badge afs">AFS</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>3</td><td>₹4.50</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-teal" style={{ width: '5.3%' }}></div></div>5.3%</td>
                    <td>7.60%</td><td><span className="badge cp">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('cp_cd')}>
                    <td><b>Certificates of Deposit (CD)</b></td>
                    <td><span className="badge afs">AFS</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>2</td><td>₹1.50</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-teal" style={{ width: '1.8%' }}></div></div>1.8%</td>
                    <td>7.25%</td><td><span className="badge cd">Active</span></td>
                  </tr>
                  <tr onClick={() => onNavigate('fd_bonds')}>
                    <td><b>Co-op Bank FDs</b></td>
                    <td><span className="badge afs">AFS</span></td>
                    <td><span className="badge non-slr">Non-SLR</span></td>
                    <td>4</td><td>₹7.50</td>
                    <td><div className="progress-bar"><div className="progress-fill fill-warning" style={{ width: '8.9%' }}></div></div>8.9%</td>
                    <td>6.90%</td><td><span className="badge active">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          {/* SLR Utilization Donut */}
          <div className="card" style={{ marginBottom: '16px' }}>
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} /> SLR Utilization
              </span>
            </div>
            <div className="card-body">
              <div className="donut-wrapper">
                <div className="donut">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="36" fill="none" stroke="var(--gray-200)" strokeWidth="14" />
                    <circle cx="50" cy="50" r="36" fill="none" stroke="var(--navy)" strokeWidth="14" strokeDasharray="142 84" strokeLinecap="round" />
                  </svg>
                  <div className="donut-center">
                    <div className="dc-val">24.8%</div>
                    <div className="dc-lbl">of NDTL</div>
                  </div>
                </div>
                <div>
                  <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--navy)' }}></div><span className="legend-label">G-Sec+SDL</span><span className="legend-val">₹28.1Cr</span></div>
                  <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--gold)' }}></div><span className="legend-label">T-Bills</span><span className="legend-val">₹7.2Cr</span></div>
                  <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--success)' }}></div><span className="legend-label">NABARD/NHB</span><span className="legend-val">₹11.25Cr</span></div>
                  <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--gray-200)' }}></div><span className="legend-label">Required(18%)</span><span className="legend-val">₹25.65Cr</span></div>
                </div>
              </div>
              <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--success-bg)', borderRadius: '7px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={12} /> SLR SURPLUS +₹9.69 Cr
                </div>
                <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>6.8% above minimum requirement</div>
              </div>
            </div>
          </div>

          {/* Urgent Maturities */}
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} /> Urgent Maturities
              </span>
              <button className="btn-sm gold" onClick={() => onNavigate('maturity')}>All</button>
            </div>
            <div className="card-body" style={{ padding: '10px 14px' }}>
              <div className="timeline-item">
                <div className="timeline-dot tl-danger"></div>
                <div className="tl-info"><div className="tl-name">SBI FD #FD2024001</div><div className="tl-meta">Fixed Deposit</div></div>
                <div><div className="tl-amt">₹1.50Cr</div><div className="tl-days" style={{ color: 'var(--danger)', fontWeight: 700 }}>3 days</div></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot tl-teal"></div>
                <div className="tl-info"><div className="tl-name">HDFC CP #CP2026Q1</div><div className="tl-meta">Commercial Paper</div></div>
                <div><div className="tl-amt">₹1.00Cr</div><div className="tl-days" style={{ color: 'var(--teal)', fontWeight: 700 }}>5 days</div></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot tl-gold"></div>
                <div className="tl-info"><div className="tl-name">91-Day T-Bill #TB01</div><div className="tl-meta">Treasury Bill</div></div>
                <div><div className="tl-amt">₹2.00Cr</div><div className="tl-days" style={{ color: 'var(--warning)' }}>8 days</div></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot tl-purple"></div>
                <div className="tl-info"><div className="tl-name">Call Money (Notice)</div><div className="tl-meta">Notice Money – 7 day</div></div>
                <div><div className="tl-amt">₹1.50Cr</div><div className="tl-days">7 days</div></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot tl-navy"></div>
                <div className="tl-info"><div className="tl-name">BOI FD #FD-BOI-22</div><div className="tl-meta">Fixed Deposit</div></div>
                <div><div className="tl-amt">₹0.80Cr</div><div className="tl-days">18 days</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
