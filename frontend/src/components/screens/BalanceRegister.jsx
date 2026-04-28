import React, { useState, useMemo } from 'react';
import {
  FileBarChart, Download, Printer, FileText, RefreshCw,
  Search, X, TrendingUp, Clock,
} from 'lucide-react';

/* ─── palette ────────────────────────────────────────────────────────── */
const BLUE      = '#1a56a0';
const BLUE_DARK = '#0d3880';
const GOLD      = '#c9a84c';
const WHITE     = '#ffffff';
const OFF_WHITE = '#f4f6fb';
const TEXT_DARK = '#1a2744';
const TEXT_MID  = '#4a5568';
const BORDER    = '#dde3ef';

/* ─── Static sample data ─────────────────────────────────────────────── */
const ALL_DEPOSITS = [
  { id: 'FD-2024-001', bank: 'SBI',            branch: 'Mumbai Main', cat: 'HTM', dDate: '01-Apr-2024', mDate: '2026-03-31', mDateFmt: '31-Mar-2026', principal: 100000000, rate: 7.25, tenure: '730D', accInt: 14500000, matVal: 114500000, status: 'matured' },
  { id: 'FD-2025-007', bank: 'HDFC Bank',      branch: 'Fort',        cat: 'AFS', dDate: '15-Jun-2025', mDate: '2026-06-14', mDateFmt: '14-Jun-2026', principal: 50000000,  rate: 7.10, tenure: '364D', accInt: 2241918,  matVal: 52241918,  status: 'active'  },
  { id: 'FD-2025-011', bank: 'ICICI Bank',     branch: 'BKC',         cat: 'HTM', dDate: '01-Jul-2025', mDate: '2026-06-30', mDateFmt: '30-Jun-2026', principal: 80000000,  rate: 7.30, tenure: '364D', accInt: 3364932,  matVal: 83364932,  status: 'active'  },
  { id: 'FD-2025-014', bank: 'PNB',            branch: 'New Delhi',   cat: 'HTM', dDate: '01-Aug-2025', mDate: '2026-07-31', mDateFmt: '31-Jul-2026', principal: 65000000,  rate: 7.00, tenure: '365D', accInt: 2320548,  matVal: 67320548,  status: 'active'  },
  { id: 'FD-2025-019', bank: 'SBI',            branch: 'Fort',        cat: 'AFS', dDate: '01-Oct-2025', mDate: '2026-04-30', mDateFmt: '30-Apr-2026', principal: 40000000,  rate: 6.90, tenure: '211D', accInt: 1589589,  matVal: 41589589,  status: 'due'     },
  { id: 'FD-2025-022', bank: 'Canara Bank',    branch: 'Delhi',       cat: 'HTM', dDate: '15-Nov-2025', mDate: '2026-05-14', mDateFmt: '14-May-2026', principal: 35000000,  rate: 7.15, tenure: '180D', accInt: 1024315,  matVal: 36024315,  status: 'due'     },
  { id: 'FD-2025-031', bank: 'Bank of Baroda', branch: 'Maharashtra', cat: 'HFT', dDate: '01-Dec-2025', mDate: '2026-05-29', mDateFmt: '29-May-2026', principal: 25000000,  rate: 7.05, tenure: '179D', accInt: 700438,   matVal: 25700438,  status: 'due'     },
  { id: 'FD-2025-037', bank: 'HDFC Bank',      branch: 'Andheri',     cat: 'AFS', dDate: '01-Jan-2026', mDate: '2026-12-31', mDateFmt: '31-Dec-2026', principal: 50000000,  rate: 7.20, tenure: '365D', accInt: 1454794,  matVal: 51454794,  status: 'active'  },
  { id: 'FD-2026-002', bank: 'SBI',            branch: 'Nariman Pt',  cat: 'HTM', dDate: '15-Jan-2026', mDate: '2027-01-14', mDateFmt: '14-Jan-2027', principal: 37500000,  rate: 7.30, tenure: '364D', accInt: 902397,   matVal: 38402397,  status: 'active'  },
  { id: 'FD-2026-005', bank: 'ICICI Bank',     branch: 'Pune',        cat: 'AFS', dDate: '01-Feb-2026', mDate: '2027-01-28', mDateFmt: '28-Jan-2027', principal: 45000000,  rate: 7.15, tenure: '362D', accInt: 909041,   matVal: 45909041,  status: 'active'  },
  { id: 'FD-2026-009', bank: 'PNB',            branch: 'Mumbai',      cat: 'HTM', dDate: '01-Mar-2026', mDate: '2027-02-28', mDateFmt: '28-Feb-2027', principal: 30000000,  rate: 7.00, tenure: '365D', accInt: 504109,   matVal: 30504109,  status: 'active'  },
  { id: 'FD-2026-012', bank: 'Canara Bank',    branch: 'BKC',         cat: 'AFS', dDate: '15-Apr-2026', mDate: '2026-10-14', mDateFmt: '14-Oct-2026', principal: 25000000,  rate: 6.95, tenure: '183D', accInt: 213575,   matVal: 25213575,  status: 'active'  },
];

const TODAY = new Date(2026, 3, 27);
function daysTo(d) { return Math.round((new Date(d) - TODAY) / 86400000); }
function fmt(n)    { return n.toLocaleString('en-IN'); }

/* ── Status badge ── */
function StatusBadge({ status }) {
  const m = {
    active:  { l: 'Active',   bg: '#e6f9f2', c: '#1a8c5b', b: '#a3dfc4' },
    matured: { l: 'Matured',  bg: '#fdecea', c: '#c0392b', b: '#f5aca6' },
    due:     { l: 'Due Soon', bg: '#fff8e1', c: '#b7860b', b: '#ffe082' },
  }[status] || { l: status, bg: '#e8f0fe', c: BLUE, b: '#b3c9f5' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:12, fontSize:10, fontWeight:700, background:m.bg, color:m.c, border:`1px solid ${m.b}` }}>
      {m.l}
    </span>
  );
}

/* ── Category badge ── */
function CatBadge({ cat }) {
  const m = {
    HTM: { bg:'#e8f0fe', c:BLUE,      b:'#b3c9f5' },
    AFS: { bg:'#f3e8ff', c:'#6b21a8', b:'#d8b4fe' },
    HFT: { bg:'#fff3e0', c:'#b45309', b:'#fcd34d' },
  }[cat] || { bg:'#e8f0fe', c:BLUE, b:'#b3c9f5' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:12, fontSize:10, fontWeight:700, background:m.bg, color:m.c, border:`1px solid ${m.b}` }}>
      {cat}
    </span>
  );
}

/* ── Days chip ── */
function DaysChip({ mDate, status }) {
  if (status === 'matured') return null;
  const days = daysTo(mDate);
  if (days <= 0) return null;
  const urgent = days <= 30, soon = days <= 90;
  return (
    <span style={{
      display:'inline-block', marginLeft:6, padding:'1px 7px', borderRadius:10, fontSize:9.5, fontFamily:'monospace',
      background: urgent ? '#fdecea' : soon ? '#fff8e1' : '#e8f0fe',
      color:      urgent ? '#c0392b' : soon ? '#b7860b' : BLUE,
      border:     urgent ? '1px solid #f5aca6' : soon ? '1px solid #ffe082' : `1px solid #b3c9f5`,
    }}>{days}d</span>
  );
}

/* ── Main ── */
export default function BalanceRegister({ onNavigate }) {
  const [type,         setType]         = useState('All');
  const [selection,    setSelection]    = useState('all');
  const [asOnDate,     setAsOnDate]     = useState('27/04/2026');
  const [bankFilter,   setBankFilter]   = useState('');
  const [catFilter,    setCatFilter]    = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search,       setSearch]       = useState('');
  const [generated,    setGenerated]    = useState(true);

  const rows = useMemo(() => {
    if (!generated) return [];
    return ALL_DEPOSITS.filter(r => {
      if (bankFilter   && r.bank   !== bankFilter)  return false;
      if (catFilter    && r.cat    !== catFilter)   return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!r.id.toLowerCase().includes(q) && !r.bank.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [generated, bankFilter, catFilter, statusFilter, search]);

  const totalPrincipal = rows.reduce((s, r) => s + r.principal, 0);
  const totalAccInt    = rows.reduce((s, r) => s + r.accInt,    0);
  const totalMatVal    = rows.reduce((s, r) => s + r.matVal,    0);
  const dueSoon        = rows.filter(r => r.status === 'due').reduce((s, r) => s + r.principal, 0);

  const clearFilters = () => {
    setType('All'); setSelection('all'); setBankFilter('');
    setCatFilter(''); setStatusFilter(''); setSearch(''); setGenerated(true);
  };

  /* shared white input */
  const inp = { background: WHITE, border: `1px solid ${BORDER}`, color: TEXT_DARK, borderRadius: 5, padding: '6px 10px', fontSize: 12, fontFamily: 'inherit', outline: 'none', width: '100%' };

  /* button */
  const btn = (v) => ({
    display:'inline-flex', alignItems:'center', gap:5,
    padding:'7px 14px', borderRadius:5, fontSize:11.5, fontWeight:600,
    cursor:'pointer', fontFamily:'inherit', border:'none',
    ...(v==='gold'    ? { background:GOLD,      color:WHITE } :
        v==='primary' ? { background:BLUE,      color:WHITE } :
        v==='ghost-w' ? { background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.45)' } :
        v==='ghost-wb'? { background:'transparent', color:'rgba(255,255,255,0.75)', border:'1px solid rgba(255,255,255,0.3)' } :
                        { background:OFF_WHITE, color:TEXT_DARK, border:`1px solid ${BORDER}` }),
  });

  /* table styles */
  const th  = { background:BLUE, color:WHITE, fontSize:10.5, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6, padding:'10px 12px', textAlign:'left',  borderBottom:`2px solid ${BLUE_DARK}`, whiteSpace:'nowrap', position:'sticky', top:0, zIndex:5 };
  const thR = { ...th, textAlign:'right' };
  const td  = { padding:'9px 12px', color:TEXT_DARK, fontSize:12, verticalAlign:'middle', borderBottom:`1px solid ${BORDER}` };
  const tdR = { ...td, textAlign:'right', fontFamily:'monospace', fontSize:11.5 };
  const tdM = { ...td, fontFamily:'monospace', fontSize:11.5 };

  const statCards = [
    { label:'Total Deposits',     value:`₹${fmt(totalPrincipal)}`, sub:`${rows.length} deposits`,                                              accent:BLUE,      icon:'🏦' },
    { label:'Accrued Interest',   value:`₹${fmt(totalAccInt)}`,    sub:'YTD earned income',                                                    accent:'#1a8c5b', icon:'📈' },
    { label:'Maturity Value',     value:`₹${fmt(totalMatVal)}`,    sub:'Total at maturity',                                                    accent:'#7c3aed', icon:'💰' },
    { label:'Maturing (30 days)', value:`₹${fmt(dueSoon)}`,        sub:`${rows.filter(r=>r.status==='due').length} deposits due soon`,          accent:'#c0392b', icon:'⏰' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:OFF_WHITE, color:TEXT_DARK, fontFamily:'inherit', overflow:'hidden' }}>

      {/* ══ HEADER — dark blue ══ */}
      <div style={{ background:BLUE_DARK, padding:'12px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, borderBottom:`3px solid ${GOLD}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:6, background:GOLD, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <FileBarChart size={18} color={WHITE} />
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:WHITE }}>Term Deposit — Balance Register</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontFamily:'monospace', marginTop:1 }}>
              FD &amp; Bonds › Term Deposit Report › Balance Register &nbsp;|&nbsp; As on: 27-Apr-2026
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={btn('ghost-w')}><Download size={12}/> Export CSV</button>
          <button style={btn('ghost-w')}><Printer  size={12}/> Print</button>
          <button style={btn('gold')}><FileText size={12}/> PDF</button>
          <button style={btn('ghost-w')} onClick={() => onNavigate?.('fd_term_deposit_report')}><X size={12}/> Exit</button>
        </div>
      </div>

      {/* ══ FILTER PANEL — medium blue ══ */}
      <div style={{ background:BLUE, padding:'13px 22px', flexShrink:0, borderBottom:`1px solid ${BLUE_DARK}` }}>
        <div style={{ fontSize:9.5, fontWeight:700, color:GOLD, letterSpacing:1.2, textTransform:'uppercase', marginBottom:9, display:'flex', alignItems:'center', gap:5 }}>
          <Search size={11} color={GOLD}/> Filter Criteria
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 150px 1fr 110px auto auto', gap:10, alignItems:'end' }}>

          {[
            { label:'Type', el: (
              <select style={inp} value={type} onChange={e=>setType(e.target.value)}>
                <option>All</option><option>FD – Fixed Rate</option><option>FD – Floating Rate</option>
                <option>RD – Recurring Deposit</option><option>FCNR</option>
              </select>
            )},
            { label:'Selection', el: (
              <div style={{ display:'flex', gap:10, padding:'7px 0' }}>
                {[['all','All'],['specific','Specific'],['group','Group wise']].map(([v,l])=>(
                  <label key={v} style={{ display:'flex', alignItems:'center', gap:4, fontSize:11.5, color:WHITE, cursor:'pointer' }}>
                    <input type="radio" name="sel" value={v} checked={selection===v} onChange={()=>setSelection(v)} style={{ accentColor:GOLD }}/>{l}
                  </label>
                ))}
              </div>
            )},
            { label:'As On Date', el: <input style={inp} type="text" value={asOnDate} onChange={e=>setAsOnDate(e.target.value)}/> },
            { label:'Bank / Issuer', el: (
              <select style={inp} value={bankFilter} onChange={e=>setBankFilter(e.target.value)}>
                <option value="">-- All Banks --</option>
                {[...new Set(ALL_DEPOSITS.map(r=>r.bank))].map(b=><option key={b}>{b}</option>)}
              </select>
            )},
            { label:'Category', el: (
              <select style={inp} value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
                <option value="">-- All --</option><option>HTM</option><option>AFS</option><option>HFT</option>
              </select>
            )},
          ].map(({ label, el }) => (
            <div key={label} style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <div style={{ fontSize:9.5, color:'rgba(255,255,255,0.75)', fontWeight:600, letterSpacing:0.5, textTransform:'uppercase' }}>{label}</div>
              {el}
            </div>
          ))}

          <button style={btn('gold')} onClick={()=>setGenerated(true)}>⚡ Generate</button>
          <button style={{ ...btn('ghost-w') }} onClick={clearFilters}><RefreshCw size={12}/> Clear</button>
        </div>
      </div>

      {/* ══ STAT CARDS — white bg with coloured left border ══ */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, padding:'14px 22px', background:WHITE, borderBottom:`1px solid ${BORDER}`, flexShrink:0 }}>
        {statCards.map(({ label, value, sub, accent, icon }) => (
          <div key={label} style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, borderLeft:`4px solid ${accent}`, padding:'12px 16px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
              <div style={{ fontSize:9.5, color:TEXT_MID, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6 }}>{label}</div>
              <span style={{ fontSize:16 }}>{icon}</span>
            </div>
            <div style={{ fontSize:18, fontWeight:800, color:accent, fontFamily:'monospace' }}>{value}</div>
            <div style={{ fontSize:10, color:TEXT_MID, marginTop:3 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ══ TABLE AREA — off-white ══ */}
      <div style={{ flex:1, overflow:'auto', padding:'14px 22px', background:OFF_WHITE }}>

        {/* toolbar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div style={{ fontSize:11, color:TEXT_MID }}>
            Showing <span style={{ color:BLUE, fontWeight:700 }}>{rows.length}</span> deposits
            &nbsp;|&nbsp; Principal: <span style={{ color:BLUE, fontWeight:700 }}>₹{fmt(totalPrincipal)}</span>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, background:WHITE, border:`1px solid ${BORDER}`, borderRadius:5, padding:'5px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
              <Search size={13} color={TEXT_MID}/>
              <input style={{ background:'none', border:'none', color:TEXT_DARK, fontSize:12, outline:'none', width:190, fontFamily:'inherit' }}
                placeholder="Search FD No. / Bank…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <select style={{ ...inp, width:130 }} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="due">Due Soon</option>
              <option value="matured">Matured</option>
            </select>
          </div>
        </div>

        {/* table card */}
        <div style={{ background:WHITE, borderRadius:8, border:`1px solid ${BORDER}`, overflow:'hidden', boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr>
                <th style={{ ...th, width:32 }}>#</th>
                <th style={th}>FD No. / Receipt</th>
                <th style={th}>Bank</th>
                <th style={th}>Branch</th>
                <th style={th}>Cat.</th>
                <th style={th}>Deposit Date</th>
                <th style={th}>Maturity Date</th>
                <th style={thR}>Principal (₹)</th>
                <th style={thR}>Rate %</th>
                <th style={th}>Tenure</th>
                <th style={thR}>Accrued Int. (₹)</th>
                <th style={thR}>Maturity Value (₹)</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}
                  style={{ background: i%2===0 ? WHITE : '#f8faff' }}
                  onMouseEnter={e => e.currentTarget.style.background='#eef3fc'}
                  onMouseLeave={e => e.currentTarget.style.background= i%2===0 ? WHITE : '#f8faff'}>
                  <td style={{ ...td, color:TEXT_MID, fontSize:11 }}>{i+1}</td>
                  <td style={{ ...tdM, color:BLUE, fontWeight:600 }}>{r.id}</td>
                  <td style={{ ...td, fontWeight:600 }}>{r.bank}</td>
                  <td style={{ ...td, color:TEXT_MID }}>{r.branch}</td>
                  <td style={td}><CatBadge cat={r.cat}/></td>
                  <td style={tdM}>{r.dDate}</td>
                  <td style={tdM}>{r.mDateFmt}<DaysChip mDate={r.mDate} status={r.status}/></td>
                  <td style={{ ...tdR, fontWeight:600 }}>{fmt(r.principal)}</td>
                  <td style={{ ...tdR, color:BLUE, fontWeight:700 }}>{r.rate.toFixed(2)}</td>
                  <td style={td}>
                    <span style={{ background:'#e8f0fe', color:BLUE, border:`1px solid #b3c9f5`, borderRadius:10, padding:'2px 8px', fontSize:10, fontFamily:'monospace', fontWeight:700 }}>{r.tenure}</span>
                  </td>
                  <td style={{ ...tdR, color:'#1a8c5b', fontWeight:600 }}>{fmt(r.accInt)}</td>
                  <td style={{ ...tdR, color:BLUE_DARK, fontWeight:700 }}>{fmt(r.matVal)}</td>
                  <td style={td}><StatusBadge status={r.status}/></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background:BLUE }}>
                <td colSpan={7} style={{ padding:'10px 12px', fontWeight:700, fontSize:11.5, color:WHITE, textTransform:'uppercase', letterSpacing:0.5, borderTop:`2px solid ${BLUE_DARK}` }}>
                  Grand Total — {rows.length} Deposits
                </td>
                <td style={{ padding:'10px 12px', textAlign:'right', fontFamily:'monospace', fontWeight:700, color:GOLD, fontSize:12, borderTop:`2px solid ${BLUE_DARK}` }}>{fmt(totalPrincipal)}</td>
                <td style={{ borderTop:`2px solid ${BLUE_DARK}` }}/>
                <td style={{ borderTop:`2px solid ${BLUE_DARK}` }}/>
                <td style={{ padding:'10px 12px', textAlign:'right', fontFamily:'monospace', fontWeight:700, color:'#7ee8b8', fontSize:12, borderTop:`2px solid ${BLUE_DARK}` }}>{fmt(totalAccInt)}</td>
                <td style={{ padding:'10px 12px', textAlign:'right', fontFamily:'monospace', fontWeight:700, color:GOLD, fontSize:12, borderTop:`2px solid ${BLUE_DARK}` }}>{fmt(totalMatVal)}</td>
                <td style={{ borderTop:`2px solid ${BLUE_DARK}` }}/>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ══ REPORT ACTION BUTTONS — dark blue footer ══ */}
      <div style={{ display:'flex', gap:8, padding:'11px 22px', background:BLUE_DARK, borderTop:`2px solid ${GOLD}`, flexShrink:0, alignItems:'center' }}>
        <button style={btn('gold')}><FileBarChart size={12}/> Balance Register Detail</button>
        <button style={btn('ghost-w')}><FileText size={12}/> Balance Register Summary</button>
        <button style={btn('ghost-wb')}><Clock size={12}/> Date-wise Position</button>
        <button style={btn('ghost-wb')}><TrendingUp size={12}/> Interest Projection</button>
        <div style={{ marginLeft:'auto', fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'monospace' }}>
          Last refreshed: 27-Apr-2026 &nbsp; 10:42 AM
        </div>
      </div>

    </div>
  );
}