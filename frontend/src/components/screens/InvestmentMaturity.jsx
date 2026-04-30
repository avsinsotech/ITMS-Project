import React, { useState } from 'react';
import {
  Clock, FileText, Search, LogOut, RefreshCw,
  Calendar, TrendingUp, AlertTriangle, CheckCircle2,
  Banknote, ChevronRight, Download,
} from 'lucide-react';

const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0];
const fmtDisplay = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
const daysDiff = (matIso) => {
  const mat = new Date(matIso);
  const diff = Math.ceil((mat - today) / (1000 * 60 * 60 * 24));
  return diff;
};

const SAMPLE = [
  { invNo: 'TD-2024-0041', party: 'Ramesh Kumar',      prodCode: '2011', branch: 'HO Mumbai',     principal: 5000000,  rate: 7.25, openDate: '15-Oct-2024', matDate: '2026-05-15', matAmount: 5762500 },
  { invNo: 'TD-2024-0038', party: 'Sunita Sharma',     prodCode: '2012', branch: 'HO Mumbai',     principal: 10000000, rate: 7.50, openDate: '01-Sep-2024', matDate: '2026-05-01', matAmount: 11500000 },
  { invNo: 'TD-2024-0035', party: 'Vikram Desai',      prodCode: '2011', branch: 'Pune Branch',   principal: 2500000,  rate: 7.00, openDate: '30-Jun-2024', matDate: '2026-06-30', matAmount: 2675000 },
  { invNo: 'TD-2023-0120', party: 'ABC Pvt Ltd',       prodCode: '2013', branch: 'HO Mumbai',     principal: 50000000, rate: 7.75, openDate: '12-Mar-2023', matDate: '2026-05-12', matAmount: 53875000 },
  { invNo: 'TD-2024-0044', party: 'NRI Holdings Ltd',  prodCode: '2014', branch: 'HO Mumbai',     principal: 25000000, rate: 7.60, openDate: '20-Dec-2024', matDate: '2026-06-20', matAmount: 26900000 },
  { invNo: 'TD-2024-0050', party: 'Anita Joshi',       prodCode: '2011', branch: 'Nashik Branch', principal: 3000000,  rate: 7.10, openDate: '05-Feb-2024', matDate: '2026-05-05', matAmount: 3213000 },
];

const urgencyLabel = (days) => {
  if (days < 0)  return { label: 'Overdue',    bg: 'rgba(239,68,68,0.12)',   color: '#b91c1c', dot: '#ef4444' };
  if (days <= 7)  return { label: '≤ 7 days',  bg: 'rgba(239,68,68,0.1)',    color: '#b91c1c', dot: '#ef4444' };
  if (days <= 30) return { label: '≤ 30 days', bg: 'rgba(234,179,8,0.15)',   color: '#a16207', dot: '#eab308' };
  return             { label: `${days}d`,       bg: 'rgba(34,197,94,0.12)',   color: '#15803d', dot: '#22c55e' };
};

const inrFmt = (n) => '₹' + Number(n).toLocaleString('en-IN');

export default function InvestmentMaturity({ onNavigate }) {
  const [fromDate, setFromDate] = useState(fmt(today));
  const [toDate, setToDate]     = useState(fmt(new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())));
  const [rows, setRows]         = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleView = () => {
    setLoading(true);
    setTimeout(() => {
      const from = new Date(fromDate);
      const to   = new Date(toDate);
      const filtered = SAMPLE.filter(r => {
        const mat = new Date(r.matDate);
        return mat >= from && mat <= to;
      });
      // sort ascending by maturity
      filtered.sort((a, b) => new Date(a.matDate) - new Date(b.matDate));
      setRows(filtered);
      setSearched(true);
      setLoading(false);
    }, 600);
  };

  const totalPrincipal  = rows.reduce((s, r) => s + r.principal, 0);
  const totalMatAmount  = rows.reduce((s, r) => s + r.matAmount, 0);
  const totalInterest   = totalMatAmount - totalPrincipal;
  const overdue         = rows.filter(r => daysDiff(r.matDate) < 0).length;
  const dueSoon         = rows.filter(r => { const d = daysDiff(r.matDate); return d >= 0 && d <= 30; }).length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '0 0 32px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .im-card { background:#fff; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.06); }
        .im-card-header { background:linear-gradient(135deg,#1a2d5a 0%,#243872 100%); padding:12px 18px; display:flex; align-items:center; gap:10px; }
        .im-card-title  { color:#fff; font-size:13px; font-weight:700; letter-spacing:.3px; }
        .im-body        { padding:18px; }

        .filter-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
        .fg-label    { font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:.5px; margin-bottom:5px; }
        .fg-input    {
          width:100%; height:36px; border:1.5px solid #cbd5e1; border-radius:6px;
          padding:0 10px; font-size:13px; color:#1e293b; font-family:'DM Mono',monospace;
          outline:none; transition:border-color .2s, box-shadow .2s; background:#f8fafc; box-sizing:border-box;
        }
        .fg-input:focus { border-color:#1a2d5a; background:#fff; box-shadow:0 0 0 3px rgba(26,45,90,.1); }

        .btn-row { display:flex; gap:8px; flex-wrap:wrap; padding-top:14px; border-top:1px solid #f1f5f9; }
        .im-btn  { height:34px; padding:0 14px; border-radius:6px; border:none; font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:5px; transition:all .18s; }
        .im-btn-primary { background:#1a2d5a; color:#fff; }
        .im-btn-primary:hover { background:#243872; transform:translateY(-1px); box-shadow:0 3px 8px rgba(26,45,90,.3); }
        .im-btn-gold    { background:linear-gradient(135deg,#c9a227,#e2b93b); color:#1a2d5a; }
        .im-btn-gold:hover { transform:translateY(-1px); box-shadow:0 3px 8px rgba(201,162,39,.35); }
        .im-btn-outline { background:#fff; border:1.5px solid #cbd5e1; color:#475569; }
        .im-btn-outline:hover { border-color:#1a2d5a; color:#1a2d5a; }
        .im-btn-danger  { background:#fff; border:1.5px solid #fca5a5; color:#dc2626; }
        .im-btn-danger:hover { background:#fef2f2; }

        .summary-row  { display:flex; gap:12px; margin-bottom:16px; }
        .summary-chip { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 16px; display:flex; align-items:center; gap:10px; flex:1; }
        .chip-icon    { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .chip-val     { font-size:15px; font-weight:700; color:#1e293b; font-family:'DM Mono',monospace; }
        .chip-lbl     { font-size:10px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:.4px; }

        .im-table-wrap { overflow-x:auto; border-radius:8px; border:1px solid #e2e8f0; }
        .im-table      { width:100%; border-collapse:collapse; font-size:12.5px; }
        .im-table thead th {
          background:#1a2d5a; color:#fff; padding:10px 12px; text-align:left;
          font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; white-space:nowrap;
        }
        .im-table thead th:first-child { border-radius:8px 0 0 0; }
        .im-table thead th:last-child  { border-radius:0 8px 0 0; }
        .im-table tbody tr { border-bottom:1px solid #f1f5f9; transition:background .15s; }
        .im-table tbody tr:hover { background:#f8fafc; }
        .im-table tbody td { padding:10px 12px; color:#334155; vertical-align:middle; white-space:nowrap; }
        .im-table tfoot td { background:#f1f5f9; padding:10px 12px; font-weight:700; font-size:12px; color:#1a2d5a; border-top:2px solid #cbd5e1; }

        .urgency-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:20px; font-size:11px; font-weight:600; }
        .u-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        .mono { font-family:'DM Mono',monospace; font-size:12px; }

        .empty-state { text-align:center; padding:48px 24px; color:#94a3b8; }
        .empty-icon  { width:56px; height:56px; background:#f1f5f9; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }

        .spinner { width:24px; height:24px; border:2.5px solid #e2e8f0; border-top-color:#1a2d5a; border-radius:50%; animation:spin .7s linear infinite; margin:0 auto 10px; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {/* ── FILTER CARD ── */}
      <div className="im-card" style={{ marginBottom: 18 }}>
        <div className="im-card-header">
          <Clock size={16} color="#c9a227" strokeWidth={2.5} />
          <span className="im-card-title">Investment Maturity Report</span>
        </div>
        <div className="im-body">
          <div className="filter-grid">
            <div>
              <div className="fg-label">From Date</div>
              <input type="date" className="fg-input" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            </div>
            <div>
              <div className="fg-label">To Date</div>
              <input type="date" className="fg-input" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
          </div>
          <div className="btn-row">
            <button className="im-btn im-btn-primary" onClick={handleView}>
              <Search size={13} /> View
            </button>
            <button className="im-btn im-btn-gold" onClick={handleView}>
              <FileText size={13} /> Report
            </button>
            <button className="im-btn im-btn-outline" onClick={() => { setFromDate(fmt(today)); setToDate(fmt(new Date(today.getFullYear(), today.getMonth()+3, today.getDate()))); setRows([]); setSearched(false); }}>
              <RefreshCw size={13} /> Clear
            </button>
            <div style={{ flex: 1 }} />
            <button className="im-btn im-btn-danger" onClick={() => onNavigate?.('dashboard')}>
              <LogOut size={13} /> Exit
            </button>
          </div>
        </div>
      </div>

      {/* ── RESULTS CARD ── */}
      <div className="im-card">
        <div className="im-card-header">
          <Calendar size={16} color="#c9a227" strokeWidth={2.5} />
          <span className="im-card-title">Investment Maturity</span>
          {rows.length > 0 && (
            <span style={{ marginLeft:'auto', background:'rgba(201,162,39,.25)', color:'#c9a227', fontSize:11, fontWeight:700, padding:'2px 10px', borderRadius:20 }}>
              {rows.length} Record{rows.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="im-body">

          {/* Summary chips */}
          {rows.length > 0 && (
            <div className="summary-row">
              <div className="summary-chip">
                <div className="chip-icon" style={{ background:'rgba(26,45,90,.1)' }}>
                  <Banknote size={16} color="#1a2d5a" />
                </div>
                <div>
                  <div className="chip-val">₹{(totalPrincipal/100000).toFixed(2)}L</div>
                  <div className="chip-lbl">Total Principal</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background:'rgba(201,162,39,.15)' }}>
                  <TrendingUp size={16} color="#c9a227" />
                </div>
                <div>
                  <div className="chip-val">₹{(totalInterest/100000).toFixed(2)}L</div>
                  <div className="chip-lbl">Total Interest</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background:'rgba(239,68,68,.1)' }}>
                  <AlertTriangle size={16} color="#dc2626" />
                </div>
                <div>
                  <div className="chip-val" style={{ color: overdue > 0 ? '#dc2626' : undefined }}>{overdue}</div>
                  <div className="chip-lbl">Overdue</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background:'rgba(234,179,8,.12)' }}>
                  <Clock size={16} color="#a16207" />
                </div>
                <div>
                  <div className="chip-val" style={{ color: dueSoon > 0 ? '#a16207' : undefined }}>{dueSoon}</div>
                  <div className="chip-lbl">Due ≤ 30 Days</div>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="empty-state">
              <div className="spinner" />
              <div style={{ fontSize:13, color:'#64748b' }}>Fetching maturity records…</div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !searched && (
            <div className="empty-state">
              <div className="empty-icon"><Calendar size={22} color="#94a3b8" /></div>
              <div style={{ fontSize:13, fontWeight:600, color:'#64748b', marginBottom:4 }}>No records loaded</div>
              <div style={{ fontSize:12, color:'#94a3b8' }}>Select a date range and click <strong>View</strong> to fetch maturity data.</div>
            </div>
          )}

          {/* No results */}
          {!loading && searched && rows.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon"><AlertTriangle size={22} color="#f59e0b" /></div>
              <div style={{ fontSize:13, fontWeight:600, color:'#64748b', marginBottom:4 }}>No maturities in selected period</div>
              <div style={{ fontSize:12, color:'#94a3b8' }}>Try widening the date range.</div>
            </div>
          )}

          {/* Table */}
          {!loading && rows.length > 0 && (
            <div className="im-table-wrap">
              <table className="im-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Investment No.</th>
                    <th>Party Name</th>
                    <th>Branch</th>
                    <th>Prod Code</th>
                    <th>Open Date</th>
                    <th>Maturity Date</th>
                    <th style={{ textAlign:'right' }}>Rate %</th>
                    <th style={{ textAlign:'right' }}>Principal (₹)</th>
                    <th style={{ textAlign:'right' }}>Mat. Amount (₹)</th>
                    <th style={{ textAlign:'right' }}>Interest (₹)</th>
                    <th>Due In</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const days = daysDiff(r.matDate);
                    const u    = urgencyLabel(days);
                    const interest = r.matAmount - r.principal;
                    return (
                      <tr key={i}>
                        <td style={{ color:'#94a3b8', fontSize:11, fontWeight:600 }}>{String(i+1).padStart(2,'0')}</td>
                        <td className="mono" style={{ color:'#1a2d5a', fontWeight:600 }}>{r.invNo}</td>
                        <td style={{ fontWeight:500 }}>{r.party}</td>
                        <td>{r.branch}</td>
                        <td className="mono" style={{ fontWeight:600, color:'#475569' }}>{r.prodCode}</td>
                        <td className="mono">{r.openDate}</td>
                        <td className="mono" style={{ fontWeight:600 }}>{fmtDisplay(r.matDate)}</td>
                        <td className="mono" style={{ textAlign:'right', fontWeight:700, color:'#1a2d5a' }}>{r.rate}%</td>
                        <td className="mono" style={{ textAlign:'right' }}>{inrFmt(r.principal)}</td>
                        <td className="mono" style={{ textAlign:'right', fontWeight:700 }}>{inrFmt(r.matAmount)}</td>
                        <td className="mono" style={{ textAlign:'right', color:'#15803d' }}>{inrFmt(interest)}</td>
                        <td>
                          <span className="urgency-badge" style={{ background:u.bg, color:u.color }}>
                            <span className="u-dot" style={{ background:u.dot }} />
                            {u.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={8} style={{ textAlign:'right', color:'#64748b', fontWeight:600 }}>Totals:</td>
                    <td className="mono" style={{ textAlign:'right' }}>{inrFmt(totalPrincipal)}</td>
                    <td className="mono" style={{ textAlign:'right' }}>{inrFmt(totalMatAmount)}</td>
                    <td className="mono" style={{ textAlign:'right', color:'#15803d' }}>{inrFmt(totalInterest)}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}