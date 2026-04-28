import React, { useState } from 'react';
import {
  Search, FileText, Calendar, AlertCircle,
  FileBarChart2, List, XCircle, LogOut,
  ChevronDown, Filter, Download, RefreshCw,
  CheckCircle2, Clock, TrendingUp, Banknote,
} from 'lucide-react';

const SAMPLE_DATA = [
  { invNo: 'TD-2024-0041', branch: 'HO Mumbai',    prodCode: '2011', glDesc: 'Term Deposit – Staff', party: 'Ramesh Kumar',      principal: '5,00,000',  rate: '7.25', matDate: '15-Oct-2026', status: 'Active'  },
  { invNo: 'TD-2024-0038', branch: 'HO Mumbai',    prodCode: '2012', glDesc: 'Term Deposit – Senior', party: 'Sunita Sharma',   principal: '10,00,000', rate: '7.50', matDate: '01-Sep-2026', status: 'Active'  },
  { invNo: 'TD-2024-0035', branch: 'Pune Branch',  prodCode: '2011', glDesc: 'Term Deposit – Staff', party: 'Vikram Desai',      principal: '2,50,000',  rate: '7.00', matDate: '30-Jun-2026', status: 'Active'  },
  { invNo: 'TD-2023-0120', branch: 'HO Mumbai',    prodCode: '2013', glDesc: 'Term Deposit – Corp',  party: 'ABC Pvt Ltd',       principal: '50,00,000', rate: '7.75', matDate: '12-Mar-2026', status: 'Matured' },
  { invNo: 'TD-2023-0115', branch: 'Nashik Branch',prodCode: '2011', glDesc: 'Term Deposit – Staff', party: 'Anita Joshi',       principal: '3,00,000',  rate: '7.10', matDate: '05-Feb-2026', status: 'Closed'  },
  { invNo: 'TD-2024-0044', branch: 'HO Mumbai',    prodCode: '2014', glDesc: 'Term Deposit – NRO',   party: 'NRI Holdings Ltd',  principal: '25,00,000', rate: '7.60', matDate: '20-Dec-2026', status: 'Active'  },
];

const STATUS_STYLES = {
  Active:  { bg: 'rgba(34,197,94,0.15)',  color: '#16a34a', dot: '#22c55e' },
  Matured: { bg: 'rgba(234,179,8,0.15)',  color: '#a16207', dot: '#eab308' },
  Closed:  { bg: 'rgba(239,68,68,0.12)',  color: '#b91c1c', dot: '#ef4444' },
};

export default function InvestmentRegister({ onNavigate }) {
  const [mode, setMode]           = useState('specific'); // 'all' | 'specific'
  const [fromDate, setFromDate]   = useState('');
  const [toDate, setToDate]       = useState('');
  const [prodCode, setProdCode]   = useState('');
  const [rows, setRows]           = useState([]);
  const [searched, setSearched]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleView = () => {
    setLoading(true);
    setTimeout(() => {
      let data = SAMPLE_DATA;
      if (mode === 'specific' && prodCode) {
        data = data.filter(r => r.prodCode.includes(prodCode) || r.glDesc.toLowerCase().includes(prodCode.toLowerCase()));
      }
      setRows(data);
      setSearched(true);
      setLoading(false);
    }, 600);
  };

  const handleClear = () => {
    setMode('specific');
    setFromDate('');
    setToDate('');
    setProdCode('');
    setRows([]);
    setSearched(false);
  };

  const totalPrincipal = rows.reduce((sum, r) => sum + parseFloat(r.principal.replace(/,/g, '')), 0);
  const activeCount    = rows.filter(r => r.status === 'Active').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '0 0 32px', minHeight: '100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .ir-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .ir-card-header {
          background: linear-gradient(135deg, #1a2d5a 0%, #243872 100%);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ir-card-title {
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .ir-body { padding: 18px; }

        /* Radio row */
        .radio-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px dashed #e2e8f0;
        }
        .radio-label {
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #334155;
        }
        .radio-label input[type=radio] { accent-color: #1a2d5a; width: 15px; height: 15px; cursor: pointer; }
        .radio-label.active { color: #1a2d5a; font-weight: 700; }

        /* Filter grid */
        .filter-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }
        .fg-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .fg-input {
          width: 100%;
          height: 36px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          padding: 0 10px;
          font-size: 13px;
          color: #1e293b;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          background: #f8fafc;
          box-sizing: border-box;
        }
        .fg-input:focus {
          border-color: #1a2d5a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,45,90,0.1);
        }
        .fg-input:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
          border-color: #e2e8f0;
        }

        /* Buttons */
        .btn-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }
        .ir-btn {
          height: 34px;
          padding: 0 14px;
          border-radius: 6px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all .18s;
          letter-spacing: 0.2px;
        }
        .ir-btn-primary {
          background: #1a2d5a;
          color: #fff;
        }
        .ir-btn-primary:hover { background: #243872; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(26,45,90,0.3); }
        .ir-btn-gold {
          background: linear-gradient(135deg, #c9a227, #e2b93b);
          color: #1a2d5a;
        }
        .ir-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 3px 8px rgba(201,162,39,0.35); }
        .ir-btn-outline {
          background: #fff;
          border: 1.5px solid #cbd5e1;
          color: #475569;
        }
        .ir-btn-outline:hover { border-color: #1a2d5a; color: #1a2d5a; background: #f8fafc; }
        .ir-btn-danger {
          background: #fff;
          border: 1.5px solid #fca5a5;
          color: #dc2626;
        }
        .ir-btn-danger:hover { background: #fef2f2; border-color: #ef4444; }

        /* Summary chips */
        .summary-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .summary-chip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }
        .chip-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chip-val { font-size: 16px; font-weight: 700; color: #1e293b; font-family: 'DM Mono', monospace; }
        .chip-lbl { font-size: 10px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }

        /* Table */
        .ir-table-wrap {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .ir-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }
        .ir-table thead th {
          background: #1a2d5a;
          color: #fff;
          padding: 10px 12px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .ir-table thead th:first-child { border-radius: 8px 0 0 0; }
        .ir-table thead th:last-child  { border-radius: 0 8px 0 0; }
        .ir-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .15s; }
        .ir-table tbody tr:hover { background: #f8fafc; }
        .ir-table tbody td { padding: 10px 12px; color: #334155; vertical-align: middle; white-space: nowrap; }
        .ir-table tbody td.mono { font-family: 'DM Mono', monospace; font-size: 12px; }
        .ir-table tfoot td {
          background: #f1f5f9;
          padding: 10px 12px;
          font-weight: 700;
          font-size: 12px;
          color: #1a2d5a;
          border-top: 2px solid #cbd5e1;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #94a3b8;
        }
        .empty-icon {
          width: 56px; height: 56px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
        }

        .spinner {
          width: 24px; height: 24px;
          border: 2.5px solid #e2e8f0;
          border-top-color: #1a2d5a;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          margin: 0 auto 10px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── FILTER CARD ── */}
      <div className="ir-card" style={{ marginBottom: 18 }}>
        <div className="ir-card-header">
          <FileBarChart2 size={16} color="#c9a227" strokeWidth={2.5} />
          <span className="ir-card-title">Investment Register — Term Deposits</span>
        </div>
        <div className="ir-body">

          {/* Radio */}
          <div className="radio-row">
            <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>View Mode:</span>
            <label className={`radio-label ${mode === 'all' ? 'active' : ''}`}>
              <input type="radio" name="mode" value="all" checked={mode === 'all'} onChange={() => setMode('all')} />
              All Investments
            </label>
            <label className={`radio-label ${mode === 'specific' ? 'active' : ''}`}>
              <input type="radio" name="mode" value="specific" checked={mode === 'specific'} onChange={() => setMode('specific')} />
              Specific (Filter)
            </label>
          </div>

          {/* Filter fields */}
          <div className="filter-grid">
            <div>
              <div className="fg-label">From Date</div>
              <input
                type="date"
                className="fg-input"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                disabled={mode === 'all'}
              />
            </div>
            <div>
              <div className="fg-label">To Date</div>
              <input
                type="date"
                className="fg-input"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                disabled={mode === 'all'}
              />
            </div>
            <div>
              <div className="fg-label">Prod Code / Deposit GL</div>
              <input
                className="fg-input"
                placeholder="Enter Deposit GL or Product Code"
                value={prodCode}
                onChange={e => setProdCode(e.target.value)}
                disabled={mode === 'all'}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-row">
            <button className="ir-btn ir-btn-primary" onClick={handleView}>
              <Search size={13} /> View
            </button>
            <button className="ir-btn ir-btn-gold" onClick={handleView}>
              <FileText size={13} /> Report
            </button>
            <button className="ir-btn ir-btn-outline" onClick={handleView}>
              <Calendar size={13} /> Due Date Report
            </button>
            <button className="ir-btn ir-btn-outline" onClick={handleView}>
              <List size={13} /> Stat Date List
            </button>
            <button className="ir-btn ir-btn-outline" onClick={handleView}>
              <XCircle size={13} /> Closed Inv List
            </button>
            <div style={{ flex: 1 }} />
            <button className="ir-btn ir-btn-outline" onClick={handleClear}>
              <RefreshCw size={13} /> Clear All
            </button>
            <button className="ir-btn ir-btn-danger" onClick={() => onNavigate?.('dashboard')}>
              <LogOut size={13} /> Exit
            </button>
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="ir-card">
        <div className="ir-card-header">
          <Banknote size={16} color="#c9a227" strokeWidth={2.5} />
          <span className="ir-card-title">Investment Register</span>
          {rows.length > 0 && (
            <span style={{
              marginLeft: 'auto',
              background: 'rgba(201,162,39,0.25)',
              color: '#c9a227',
              fontSize: 11,
              fontWeight: 700,
              padding: '2px 10px',
              borderRadius: 20,
            }}>
              {rows.length} Record{rows.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="ir-body">

          {/* Summary chips (only if results exist) */}
          {rows.length > 0 && (
            <div className="summary-row">
              <div className="summary-chip">
                <div className="chip-icon" style={{ background: 'rgba(26,45,90,0.1)' }}>
                  <Banknote size={16} color="#1a2d5a" />
                </div>
                <div>
                  <div className="chip-val">{rows.length}</div>
                  <div className="chip-lbl">Total Deposits</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <TrendingUp size={16} color="#c9a227" />
                </div>
                <div>
                  <div className="chip-val">₹{(totalPrincipal / 100000).toFixed(2)}L</div>
                  <div className="chip-lbl">Total Principal</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                </div>
                <div>
                  <div className="chip-val">{activeCount}</div>
                  <div className="chip-lbl">Active</div>
                </div>
              </div>
              <div className="summary-chip">
                <div className="chip-icon" style={{ background: 'rgba(234,179,8,0.12)' }}>
                  <Clock size={16} color="#a16207" />
                </div>
                <div>
                  <div className="chip-val">{rows.filter(r => r.status === 'Matured').length}</div>
                  <div className="chip-lbl">Matured</div>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="empty-state">
              <div className="spinner" />
              <div style={{ fontSize: 13, color: '#64748b' }}>Fetching records…</div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !searched && (
            <div className="empty-state">
              <div className="empty-icon">
                <Search size={22} color="#94a3b8" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>No records loaded</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Set filters and click <strong>View</strong> to fetch investment data.</div>
            </div>
          )}

          {/* Table */}
          {!loading && rows.length > 0 && (
            <div className="ir-table-wrap">
              <table className="ir-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Investment No.</th>
                    <th>Branch</th>
                    <th>Prod Code</th>
                    <th>GL Description</th>
                    <th>Party Name</th>
                    <th style={{ textAlign: 'right' }}>Principal (₹)</th>
                    <th style={{ textAlign: 'right' }}>Rate %</th>
                    <th>Maturity Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const s = STATUS_STYLES[r.status] || STATUS_STYLES.Active;
                    return (
                      <tr key={i}>
                        <td style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</td>
                        <td className="mono" style={{ color: '#1a2d5a', fontWeight: 600 }}>{r.invNo}</td>
                        <td>{r.branch}</td>
                        <td className="mono" style={{ fontWeight: 600, color: '#475569' }}>{r.prodCode}</td>
                        <td>{r.glDesc}</td>
                        <td style={{ fontWeight: 500 }}>{r.party}</td>
                        <td className="mono" style={{ textAlign: 'right', fontWeight: 600 }}>{r.principal}</td>
                        <td className="mono" style={{ textAlign: 'right', color: '#1a2d5a', fontWeight: 700 }}>{r.rate}%</td>
                        <td className="mono">{r.matDate}</td>
                        <td>
                          <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                            <span className="status-dot" style={{ background: s.dot }} />
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'right', color: '#64748b' }}>Total Principal:</td>
                    <td className="mono" style={{ textAlign: 'right' }}>
                      {totalPrincipal.toLocaleString('en-IN')}
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* No results after search */}
          {!loading && searched && rows.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <AlertCircle size={22} color="#f59e0b" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>No matching records</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Try adjusting your filters or selecting All mode.</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}