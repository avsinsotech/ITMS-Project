import React, { useState } from 'react';
import { 
  Folder, PlusCircle, Star, Clock, AlertTriangle, 
  CheckCircle2, Info, XCircle 
} from 'lucide-react';

export default function CPCD({ onOpenModal, subScreen }) {
  const [activeTab, setActiveTab] = useState('cp-portfolio');

  // Sync with sidebar sub-navigation
  React.useEffect(() => {
    if (subScreen) {
      const mapping = {
        's1':  'cp-portfolio',
        's6':  'cp-new',
        's7':  'cd-new',
        's12': 'cp-rating',
        's13': 'cp-maturity'
      };
      if (mapping[subScreen]) {
        setActiveTab(mapping[subScreen]);
      }
    }
  }, [subScreen]);

  const tabs = [
    { id: 'cp-portfolio', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Folder size={14} /> CP / CD Portfolio</div> },
    { id: 'cp-new', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={14} /> New CP Investment</div> },
    { id: 'cd-new', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={14} /> New CD Investment</div> },
    { id: 'cp-rating', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={14} /> Credit Rating Check</div> },
    { id: 'cp-maturity', label: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> CP Maturity</div> },
  ];

  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI CIRCULAR</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>CP — RBI Master Direction FMRD.DIRD.01/14.01.002/2017-18 | CD — RBI Master Direction 2021</span>
        </div>
        <div className="rbi-text"><b>CP (Commercial Paper):</b> Short-term (7 days to 1 year) unsecured money market instrument issued by corporates/FIs. UCBs can INVEST in CPs. Minimum credit rating A2 or above (as per RBI). Issued in dematerialised form. Held as AFS. <b>CD (Certificate of Deposit):</b> Issued by Scheduled Commercial Banks/FIs. UCBs can invest. Tenure 7 days to 1 year. Issued at discount. Minimum investment ₹1 Lakh. Both settled through CCDS (Clearcorp).</div>
      </div>

      <div className="report-cards-5">
        <div className="report-card"><div className="rc-label">CP Investments</div><div className="rc-value">₹4.50 Cr</div></div>
        <div className="report-card"><div className="rc-label">CD Investments</div><div className="rc-value">₹1.50 Cr</div></div>
        <div className="report-card"><div className="rc-label">Total CP+CD</div><div className="rc-value">₹6.00 Cr</div></div>
        <div className="report-card"><div className="rc-label">Avg CP Yield</div><div className="rc-value" style={{ color: 'var(--success)' }}>7.60%</div></div>
        <div className="report-card"><div className="rc-label">Due in 30 Days</div><div className="rc-value" style={{ color: 'var(--warning)' }}>₹2.00 Cr</div></div>
      </div>

      <div className="tab-bar">
        {tabs.map(tab => (
          <div key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</div>
        ))}
      </div>

      {/* CP/CD Portfolio */}
      {activeTab === 'cp-portfolio' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Folder size={16} /> Commercial Paper & Certificate of Deposit Holdings
            </span>
            <button className="btn-sm gold">Export</button>
            <button className="btn-sm teal" onClick={() => setActiveTab('cp-new')}>+ New CP</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead><tr><th>Deal ID</th><th>Instrument</th><th>Issuer</th><th>ISIN</th><th>Type</th><th>Rating</th><th>Face Value</th><th>Invested (₹)</th><th>Yield %</th><th>Issue Date</th><th>Maturity</th><th>Days Left</th><th>Class</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td>CP-2601-001</td><td><b>HDFC Ltd CP</b></td><td>HDFC Ltd.</td><td>INE001A14LC2</td>
                  <td><span className="badge cp">CP</span></td><td><span className="rating-chip rating-a1p">A1+</span></td>
                  <td>₹1,00,00,000</td><td>₹97,88,000</td><td>7.85%</td><td>01-Feb-2026</td><td>20-Apr-2026</td>
                  <td><span style={{ color: 'var(--danger)', fontWeight: 700 }}>5 days</span></td>
                  <td><span className="badge afs">AFS</span></td><td><span className="badge alert">Due Soon</span></td>
                  <td><button className="btn-sm gold">Maturity</button></td>
                </tr>
                <tr>
                  <td>CP-2602-001</td><td><b>Reliance Ind. CP</b></td><td>Reliance Industries</td><td>INE002A14LB9</td>
                  <td><span className="badge cp">CP</span></td><td><span className="rating-chip rating-a1p">A1+</span></td>
                  <td>₹2,00,00,000</td><td>₹1,93,40,000</td><td>7.60%</td><td>15-Feb-2026</td><td>15-May-2026</td>
                  <td>30 days</td><td><span className="badge afs">AFS</span></td><td><span className="badge active">Active</span></td>
                  <td><button className="btn-sm outline">View</button></td>
                </tr>
                <tr>
                  <td>CP-2603-001</td><td><b>L&T Finance CP</b></td><td>L&T Finance Ltd.</td><td>INE476A14LG4</td>
                  <td><span className="badge cp">CP</span></td><td><span className="rating-chip rating-a1">A1</span></td>
                  <td>₹1,50,00,000</td><td>₹1,46,10,000</td><td>7.45%</td><td>20-Mar-2026</td><td>17-Jun-2026</td>
                  <td>63 days</td><td><span className="badge afs">AFS</span></td><td><span className="badge active">Active</span></td>
                  <td><button className="btn-sm outline">View</button></td>
                </tr>
                <tr>
                  <td>CD-2601-001</td><td><b>Axis Bank CD</b></td><td>Axis Bank Ltd.</td><td>INE238A14RJ7</td>
                  <td><span className="badge cd">CD</span></td><td><span className="rating-chip rating-a1p">AAA</span></td>
                  <td>₹1,00,00,000</td><td>₹96,50,000</td><td>7.25%</td><td>01-Jan-2026</td><td>30-Jun-2026</td>
                  <td>76 days</td><td><span className="badge afs">AFS</span></td><td><span className="badge active">Active</span></td>
                  <td><button className="btn-sm outline">View</button></td>
                </tr>
                <tr>
                  <td>CD-2602-001</td><td><b>ICICI Bank CD</b></td><td>ICICI Bank Ltd.</td><td>INE090A14QB5</td>
                  <td><span className="badge cd">CD</span></td><td><span className="rating-chip rating-a1p">AAA</span></td>
                  <td>₹50,00,000</td><td>₹48,50,000</td><td>7.20%</td><td>15-Feb-2026</td><td>14-Aug-2026</td>
                  <td>121 days</td><td><span className="badge afs">AFS</span></td><td><span className="badge active">Active</span></td>
                  <td><button className="btn-sm outline">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New CP Investment */}
      {activeTab === 'cp-new' && (
        <div>
          <div className="alert-banner warning" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} /> Minimum credit rating A2 required for CP investment. A1+ preferred. Below A2 — investment NOT permitted per RBI.
          </div>
          <div className="two-col">
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlusCircle size={16} /> New Commercial Paper Investment
                </span>
              </div>
              <div className="card-body">
                <div className="form-section">
                  <div className="form-section-title">Issuer & Instrument Details</div>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-label">Issuer Name <span className="req">*</span></label><input className="form-input" placeholder="e.g. HDFC Ltd." defaultValue="HDFC Ltd." /></div>
                    <div className="form-group"><label className="form-label">Issuer Type</label><select className="form-select"><option>Corporate (Listed)</option><option>NBFC (RBI Regulated)</option><option>Financial Institution</option><option>PD – Primary Dealer</option></select></div>
                    <div className="form-group"><label className="form-label">ISIN <span className="req">*</span></label><input className="form-input" defaultValue="INE001A14LC2" /></div>
                    <div className="form-group"><label className="form-label">Credit Rating <span className="req">*</span> <span className="rbi-note">MIN A2</span></label>
                      <select className="form-select"><option>A1+ (Highest Short-Term)</option><option>A1</option><option>A2+ (Minimum Acceptable)</option><option>A2</option><option disabled style={{ color: 'red' }}>Below A2 — NOT Permitted</option></select>
                      <div className="form-hint rbi" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertTriangle size={10} /> Minimum A2 as per RBI. A1+ preferred for UCBs.
                      </div>
                    </div>
                    <div className="form-group"><label className="form-label">Rating Agency</label><select className="form-select"><option>CRISIL</option><option>ICRA</option><option>CARE</option><option>India Ratings</option></select></div>
                    <div className="form-group"><label className="form-label">Rating Valid Till</label><input className="form-input" type="date" defaultValue="2026-12-31" /></div>
                  </div>
                </div>
                <div className="form-section">
                  <div className="form-section-title">Financial Terms</div>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-label">Face Value (₹) <span className="req">*</span></label><input className="form-input" defaultValue="1,00,00,000" /><div className="form-hint">Minimum ₹5 Lakh per CP</div></div>
                    <div className="form-group"><label className="form-label">Issue Price (₹) — Discounted</label><input className="form-input" defaultValue="97,83,500" /></div>
                    <div className="form-group"><label className="form-label">Yield to Maturity (%)</label><input className="form-input readonly" defaultValue="7.85%" readOnly /></div>
                    <div className="form-group"><label className="form-label">Implicit Discount (₹)</label><input className="form-input readonly" defaultValue="₹2,16,500" readOnly /></div>
                    <div className="form-group"><label className="form-label">Issue Date <span className="req">*</span></label><input className="form-input" type="date" defaultValue="2026-04-15" /></div>
                    <div className="form-group"><label className="form-label">Maturity Date <span className="req">*</span></label><input className="form-input" type="date" defaultValue="2026-07-14" /><div className="form-hint">Tenure: 7 days to 1 year</div></div>
                    <div className="form-group"><label className="form-label">Tenure (Days Auto)</label><input className="form-input readonly" defaultValue="90 days" readOnly /></div>
                    <div className="form-group"><label className="form-label">Settlement Platform <span className="rbi-note">CCDS</span></label><select className="form-select"><option>CCDS – Clearcorp Dealing Systems</option><option>NSDL / CDSL</option></select></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="topbar-btn btn-outline">Save Draft</button>
                  <button className="topbar-btn btn-primary" onClick={() => onOpenModal('checker')}>Submit for Checker ▶</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} /> CP Investment Compliance
                </span>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { bg: 'success-bg', color: 'success', title: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={12} /> Rating A1+ — Above Minimum (A2)</div>, sub: 'CRISIL A1+ valid till 31-Dec-2026' },
                    { bg: 'success-bg', color: 'success', title: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={12} /> Tenure Within 7d-1yr Range</div>, sub: '90 days — permitted tenure' },
                    { bg: 'success-bg', color: 'success', title: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={12} /> CCDS Settlement Selected</div>, sub: 'Mandatory dematerialised settlement' },
                    { bg: 'success-bg', color: 'success', title: <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={12} /> Issuer Limit Available</div>, sub: 'HDFC: ₹3Cr limit | Current: ₹1Cr | This: ₹1Cr' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '10px', background: `var(--${item.bg})`, borderRadius: '7px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: `var(--${item.color})` }}>{item.title}</div>
                      <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{item.sub}</div>
                    </div>
                  ))}
                  <div style={{ padding: '10px', background: 'var(--warning-bg)', borderRadius: '7px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} /> Checker Approval Required
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Amount ≥ ₹25 Lakh</div>
                  </div>
                </div>
                <div style={{ background: 'var(--navy)', borderRadius: '8px', padding: '14px', color: '#fff' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '6px' }}>DEAL ECONOMICS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Investment</div><div style={{ color: 'var(--gold)', fontWeight: 700 }}>₹97,83,500</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Maturity Value</div><div style={{ color: 'var(--gold)', fontWeight: 700 }}>₹1,00,00,000</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>Discount Earned</div><div style={{ color: '#4ade80', fontWeight: 700 }}>₹2,16,500</div></div>
                    <div><div style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>YTM</div><div style={{ color: 'var(--gold)', fontWeight: 700 }}>7.85% p.a.</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New CD Investment */}
      {activeTab === 'cd-new' && (
        <div>
          <div className="alert-banner info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} /> CD (Certificate of Deposit) — Issued by Scheduled Commercial Banks. Tenor 7d-1yr. Discounted instrument. Minimum ₹1 Lakh face value.
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlusCircle size={16} /> New Certificate of Deposit Investment
              </span>
            </div>
            <div className="card-body">
              <div className="form-grid-3">
                <div className="form-group"><label className="form-label">Issuer Bank <span className="req">*</span></label><select className="form-select"><option>Axis Bank Ltd.</option><option>ICICI Bank Ltd.</option><option>HDFC Bank Ltd.</option><option>SBI</option></select></div>
                <div className="form-group"><label className="form-label">ISIN <span className="req">*</span></label><input className="form-input" defaultValue="INE238A14RJ7" /></div>
                <div className="form-group"><label className="form-label">Face Value (₹) <span className="req">*</span></label><input className="form-input" defaultValue="1,00,00,000" /></div>
                <div className="form-group"><label className="form-label">Issue Price (₹)</label><input className="form-input" defaultValue="96,45,000" /></div>
                <div className="form-group"><label className="form-label">Yield % (Auto)</label><input className="form-input readonly" defaultValue="7.25%" readOnly /></div>
                <div className="form-group"><label className="form-label">Issue Date</label><input className="form-input" type="date" defaultValue="2026-04-15" /></div>
                <div className="form-group"><label className="form-label">Maturity Date</label><input className="form-input" type="date" defaultValue="2026-10-14" /></div>
                <div className="form-group"><label className="form-label">Tenure (Auto)</label><input className="form-input readonly" defaultValue="182 days" readOnly /></div>
                <div className="form-group"><label className="form-label">Settlement</label><select className="form-select"><option>NSDL Demat</option><option>CDSL Demat</option></select></div>
                <div className="form-group"><label className="form-label">Classification</label><select className="form-select"><option>AFS</option><option>HFT</option></select></div>
                <div className="form-group"><label className="form-label">Issuer Credit Rating</label><input className="form-input readonly" defaultValue="AAA (SCB – Scheduled Commercial Bank)" readOnly /></div>
                <div className="form-group"><label className="form-label">Discount Income (₹)</label><input className="form-input readonly" defaultValue="₹3,55,000" readOnly /></div>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '14px' }}>
                <button className="topbar-btn btn-outline">Save Draft</button>
                <button className="topbar-btn btn-primary" onClick={() => onOpenModal('checker')}>Submit for Checker ▶</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Check */}
      {activeTab === 'cp-rating' && (
        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} /> CP Issuer Credit Rating Registry
              </span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead><tr><th>Issuer</th><th>Current Rating</th><th>Agency</th><th>Last Reviewed</th><th>Valid Till</th><th>Outlook</th><th>Investment Status</th></tr></thead>
                <tbody>
                  <tr><td><b>HDFC Ltd.</b></td><td><span className="rating-chip rating-a1p">A1+</span></td><td>CRISIL</td><td>15-Jan-2026</td><td>31-Dec-2026</td><td style={{ color: 'var(--success)' }}>Stable</td><td><span className="badge active" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Permitted</span></td></tr>
                  <tr><td><b>Reliance Industries</b></td><td><span className="rating-chip rating-a1p">A1+</span></td><td>ICRA</td><td>01-Feb-2026</td><td>31-Jan-2027</td><td style={{ color: 'var(--success)' }}>Stable</td><td><span className="badge active" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Permitted</span></td></tr>
                  <tr><td><b>L&T Finance Ltd.</b></td><td><span className="rating-chip rating-a1">A1</span></td><td>CARE</td><td>10-Mar-2026</td><td>31-Mar-2027</td><td style={{ color: 'var(--success)' }}>Stable</td><td><span className="badge active" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Permitted</span></td></tr>
                  <tr><td><b>XYZ Corp (Hypothetical)</b></td><td><span className="rating-chip rating-a2">A2</span></td><td>India Ratings</td><td>01-Apr-2026</td><td>31-Mar-2027</td><td style={{ color: 'var(--warning)' }}>Negative Watch</td><td><span className="badge pending" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={10} /> Review Required</span></td></tr>
                  <tr><td><b>ABC Ltd. (Hypothetical)</b></td><td><span className="rating-chip rating-below">B1</span></td><td>CRISIL</td><td>01-Mar-2026</td><td>28-Feb-2027</td><td style={{ color: 'var(--danger)' }}>Negative</td><td><span className="badge alert" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={10} /> NOT PERMITTED</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rbi-info-box">
            <div className="rbi-header"><span className="rbi-tag">RBI</span><span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>CP Rating Requirement — RBI Master Direction FMRD.DIRD.01/14.01.002/2017-18</span></div>
            <div className="rbi-text">UCBs investing in CP must ensure: Minimum credit rating of 'A2' (CRISIL) or equivalent. System auto-blocks below-minimum rated issuers. Rating must be current and valid on investment date. Downgrade alert system triggers if rating drops post-investment.</div>
          </div>
        </div>
      )}

      {activeTab === 'cp-maturity' && <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>CP/CD maturity schedule — auto-credit to bank account on maturity date, discount income booking.</div></div>}
    </div>
  );
}
