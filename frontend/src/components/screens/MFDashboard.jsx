import { AlertTriangle, CheckCircle2, Info, TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function MFDashboard({ onNavigate }) {
  return (
    <div>
      {/* Page Header */}
      <div className="screen-head">
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} />
            Mutual Funds Dashboard
            <span style={{ background: 'var(--gold)', color: 'var(--navy)', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 700 }}>MF</span>
          </h1>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Home › Treasury › MF Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="topbar-btn btn-outline">Export Report</button>
          <button className="topbar-btn btn-primary" onClick={() => onNavigate('mf_purchase')}>+ New Purchase</button>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[
          { label: 'Total AUM (Bank)', value: '₹ 42.80 Cr', sub: 'Across 18 schemes', color: 'var(--gold)' },
          { label: 'Cost Basis', value: '₹ 41.25 Cr', sub: 'Invested Amount', color: 'var(--navy)' },
          { label: 'Unrealised Gain', value: '₹ 1.55 Cr', sub: '+3.76%', color: 'var(--green)' },
          { label: 'IDCW Received (FYTD)', value: '₹ 22.4 L', sub: 'This FY', color: '#6A1B9A' },
          { label: 'Active SIPs', value: '7', sub: '₹ 4.5 L monthly', color: 'var(--gold)' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderLeft: `4px solid ${kpi.color}`, borderRadius: '5px', padding: '12px 14px' }}>
            <div style={{ fontSize: '10.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 600 }}>{kpi.label}</div>
            <div style={{ fontSize: '20px', color: 'var(--navy)', fontWeight: 700, marginTop: '4px' }}>{kpi.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Portfolio by Category */}
        <div className="card">
          <div className="card-title">Portfolio by Category</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr>
                {['Category', 'AUM (₹ Cr)', '% Share', 'Avg Return'].map((h, i) => (
                  <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i > 0 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Overnight', badge: 'b-overnight', aum: '8.50', share: '19.9%', ret: '6.48%' },
                { cat: 'Liquid', badge: 'b-liquid', aum: '18.20', share: '42.5%', ret: '6.72%' },
                { cat: 'Ultra Short Debt', badge: 'b-debt', aum: '10.60', share: '24.8%', ret: '7.15%' },
                { cat: 'Short Term Debt', badge: 'b-debt', aum: '5.50', share: '12.8%', ret: '7.38%' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '7px 10px' }}><span className={`badge ${row.badge}`}>{row.cat}</span></td>
                  <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.aum}</td>
                  <td style={{ padding: '7px 10px', textAlign: 'right' }}>{row.share}</td>
                  <td style={{ padding: '7px 10px', textAlign: 'right', color: 'var(--green)', fontWeight: 600 }}>{row.ret}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: 'var(--navy-light)' }}>
                <td style={{ padding: '7px 10px' }}>TOTAL</td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>42.80</td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>100.0%</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: 'var(--green)' }}>6.94%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top 5 AMCs */}
        <div className="card">
          <div className="card-title">Top 5 AMCs – Concentration</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr>
                {['AMC', 'AUM (₹ Cr)', 'Share'].map((h, i) => (
                  <th key={i} style={{ background: 'var(--navy)', color: '#fff', padding: '8px 10px', textAlign: i > 0 ? 'right' : 'left', fontWeight: 600, fontSize: '11px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'SBI Mutual Fund', aum: '12.40', share: '29.0%', warn: true },
                { name: 'HDFC Mutual Fund', aum: '9.80', share: '22.9%' },
                { name: 'ICICI Pru MF', aum: '8.20', share: '19.2%' },
                { name: 'Kotak MF', aum: '6.50', share: '15.2%' },
                { name: 'Aditya Birla SL MF', aum: '5.90', share: '13.8%' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 1 ? '#fcfcfd' : '' }}>
                  <td style={{ padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {row.warn && <span style={{ width: '6px', height: '6px', background: 'var(--amber)', borderRadius: '50%', display: 'inline-block' }} />}
                    {row.name}
                  </td>
                  <td style={{ padding: '7px 10px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.aum}</td>
                  <td style={{ padding: '7px 10px', textAlign: 'right', color: row.warn ? 'var(--amber)' : 'inherit', fontWeight: row.warn ? 700 : 400 }}>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background: '#FFF8E7', borderLeft: '3px solid var(--amber)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#6B4D00', marginTop: '10px' }}>
            ⚠ SBI MF concentration at 29% — policy cap 30%. Monitor before fresh purchase.
          </div>
        </div>
      </div>

      {/* Today's Alerts */}
      <div className="card">
        <div className="card-title">Today's Alerts</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: 'var(--navy-light)', borderLeft: '3px solid var(--navy)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: 'var(--navy)' }}>
            <strong>📅 SIP due today:</strong> 5 SIPs scheduled for execution @ 3:00 PM cut-off
          </div>
          <div style={{ background: '#FFF8E7', borderLeft: '3px solid var(--amber)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#6B4D00' }}>
            <strong>⚠ AMFI NAV not uploaded:</strong> EOD NAV file pending — MTM valuation on hold
          </div>
          <div style={{ background: '#E7F5EC', borderLeft: '3px solid var(--green)', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#125C2A' }}>
            <strong>✓ IDCW received:</strong> ₹ 2.4 L from HDFC Liquid Fund credited
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-title">Quick Actions</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: '+ New Purchase', screen: 'mf_purchase', primary: true },
            { label: 'SIP Setup', screen: 'mf_sip' },
            { label: 'Redeem Units', screen: 'mf_redeem' },
            { label: 'Switch Fund', screen: 'mf_switch' },
            { label: 'Upload NAV', screen: 'mf_nav_upload' },
            { label: 'View Holdings', screen: 'mf_holdings' },
          ].map((a, i) => (
            <button
              key={i}
              className={`btn ${a.primary ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: a.primary ? 'var(--navy)' : '#fff', color: a.primary ? '#fff' : 'var(--navy)', border: a.primary ? 'none' : '1px solid var(--navy)' }}
              onClick={() => onNavigate(a.screen)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}