import React, { useState, useEffect, useCallback } from 'react';
import { getAllFDs } from '../../services/fdApi';
import { getAllBonds } from '../../services/bondApi';

// ── Helpers ──────────────────────────────────────────────────
function formatINR(val) {
    if (val === null || val === undefined) return '—';
    return '₹' + Number(val).toLocaleString('en-IN');
}

function formatCr(val) {
    if (val === null || val === undefined) return '₹0.00 Cr';
    return '₹' + (Number(val) / 1e7).toFixed(2) + ' Cr';
}

function formatDate(val) {
    if (!val) return '—';
    return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function DaysLeftBadge({ days }) {
    if (days === null || days === undefined) return <span>—</span>;
    if (days <= 7)  return <span style={{ color: 'var(--danger)',  fontWeight: 700 }}>{days}</span>;
    if (days <= 30) return <span style={{ color: 'var(--warning)', fontWeight: 700 }}>{days}</span>;
    return <span>{days}</span>;
}

function ClassBadge({ cls }) {
    const map = { HTM: 'htm', AFS: 'afs', HFT: 'hft' };
    return <span className={`badge ${map[cls] || 'cd'}`}>{cls}</span>;
}

function StatusPill({ status }) {
    const styles = {
        Draft:     { background: '#fff3cd', color: '#856404' },
        Submitted: { background: '#cce5ff', color: '#004085' },
        Cancelled: { background: '#f8d7da', color: '#721c24' },
    };
    const s = styles[status] || { background: '#e2e3e5', color: '#383d41' };
    return (
        <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, ...s }}>
            {status}
        </span>
    );
}

// ── Summary Cards ─────────────────────────────────────────────
function SummaryCards({ fdRows, bondRows, fdLoading, bondLoading }) {
    // FD – Scheduled Banks: sum of all active/submitted FDs
    const fdTotal = fdRows
        .filter(r => r.Record_Status !== 'Cancelled')
        .reduce((sum, r) => sum + (Number(r.Deposit_Amount) || 0), 0);

    // NABARD/NHB Bonds: sum of face_value * quantity for active bonds
    const bondTotal = bondRows
        .filter(r => r.Record_Status !== 'Cancelled')
        .reduce((sum, r) => sum + (Number(r.Face_Value) * Number(r.Quantity) || 0), 0);

    // Total portfolio
    const totalPortfolio = fdTotal + bondTotal;

    // Maturing in 30 days count
    const maturingSoon = [...fdRows, ...bondRows].filter(
        r => r.Days_To_Maturity !== null && r.Days_To_Maturity <= 30 && r.Record_Status !== 'Cancelled'
    ).length;

    const loading = fdLoading || bondLoading;

    const Card = ({ label, value, highlight, warn }) => (
        <div className="report-card" style={
            highlight ? { borderColor: 'var(--navy)', background: 'var(--navy)' } :
            warn      ? { borderColor: 'var(--warning)', background: '#fffbf0' } : {}
        }>
            <div className="rc-label" style={highlight ? { color: 'rgba(255,255,255,0.6)' } : warn ? { color: 'var(--warning)' } : {}}>
                {label}
            </div>
            <div className="rc-value" style={highlight ? { color: 'var(--gold)', fontSize: '16px' } : warn ? { color: 'var(--warning)', fontSize: '16px' } : { fontSize: '16px' }}>
                {loading ? <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Loading...</span> : value}
            </div>
        </div>
    );

    return (
        <div className="report-cards">
            <Card label="FD Holdings"           value={formatCr(fdTotal)} />
            <Card label="Bond Holdings"         value={formatCr(bondTotal)} />
            <Card label="Total Portfolio"       value={formatCr(totalPortfolio)} highlight />
            <Card label="Maturing in 30 Days"   value={`${maturingSoon} instrument${maturingSoon !== 1 ? 's' : ''}`} warn={maturingSoon > 0} />
        </div>
    );
}

// ── FD Tab ────────────────────────────────────────────────────
function FDTab({ onNavigate, onDataLoaded }) {
    const [rows, setRows]          = useState([]);
    const [loading, setLoading]    = useState(true);
    const [error, setError]        = useState(null);
    const [totalRecords, setTotal] = useState(0);
    const [filters, setFilters]    = useState({
        bank_name: '', classification: '', slr_status: '', record_status: '',
        page_number: 1, page_size: 20,
    });

    const fetchData = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            // Fetch ALL for summary (page_size=1000), paginated for table
            const [summaryRes, tableRes] = await Promise.all([
                getAllFDs({ page_size: 1000, page_number: 1 }),
                getAllFDs(filters),
            ]);
            setRows(tableRes.data || []);
            setTotal(tableRes.total_records || 0);
            onDataLoaded && onDataLoaded(summaryRes.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const fc = (key, val) => setFilters(p => ({ ...p, [key]: val, page_number: 1 }));

    return (
        <>
            {/* Filters */}
            <div style={{ padding: '10px 16px', display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
                <input
                    className="form-input"
                    style={{ width: '180px', padding: '5px 8px', fontSize: '12px' }}
                    placeholder="Search bank name..."
                    value={filters.bank_name}
                    onChange={e => fc('bank_name', e.target.value)}
                />
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.classification} onChange={e => fc('classification', e.target.value)}>
                    <option value="">All Classes</option>
                    <option value="HTM">HTM</option>
                    <option value="AFS">AFS</option>
                </select>
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.slr_status} onChange={e => fc('slr_status', e.target.value)}>
                    <option value="">All SLR</option>
                    <option value="SLR">SLR</option>
                    <option value="Non-SLR">Non-SLR</option>
                </select>
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.record_status} onChange={e => fc('record_status', e.target.value)}>
                    <option value="">All Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button className="btn-sm outline" style={{ fontSize: '12px' }} onClick={fetchData}>🔄 Refresh</button>
            </div>

            <div className="card-body" style={{ padding: 0 }}>
                {error && (
                    <div className="alert-banner danger" style={{ margin: '12px 16px' }}>
                        ⚠️ {error}
                        <button className="btn-sm outline" style={{ marginLeft: '10px', fontSize: '11px' }} onClick={fetchData}>Retry</button>
                    </div>
                )}

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>⏳ Loading Fixed Deposits...</div>
                ) : rows.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No records found.
                        <button className="btn-sm gold" style={{ marginLeft: '8px' }} onClick={() => onNavigate('fd_new')}>+ Add New FD</button>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th><th>Bank / FD No.</th><th>Amount (₹)</th>
                                <th>Rate%</th><th>Maturity</th><th>Days Left</th>
                                <th>SLR</th><th>Class</th><th>Status</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <tr key={row.ID}>
                                    <td>INV-{String(row.ID).padStart(3, '0')}</td>
                                    <td>
                                        <b>{row.FD_Number || '—'}</b>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{row.Bank_Name}</div>
                                    </td>
                                    <td>{formatINR(row.Deposit_Amount)}</td>
                                    <td>{row.Interest_Rate_Pct}%</td>
                                    <td>{formatDate(row.Maturity_Date)}</td>
                                    <td><DaysLeftBadge days={row.Days_To_Maturity} /></td>
                                    <td><span className={`badge ${row.SLR_Status === 'SLR' ? 'slr' : 'non-slr'}`}>{row.SLR_Status}</span></td>
                                    <td><ClassBadge cls={row.Classification} /></td>
                                    <td><StatusPill status={row.Record_Status} /></td>
                                    <td>
                                        {row.Days_To_Maturity <= 30
                                            ? <button className="btn-sm gold" onClick={() => onNavigate('renewal')}>Renew</button>
                                            : <button className="btn-sm outline" onClick={() => onNavigate('fd_view', { id: row.ID })}>View</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                {!loading && totalRecords > filters.page_size && (
                    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid var(--border)', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Showing {((filters.page_number - 1) * filters.page_size) + 1}–{Math.min(filters.page_number * filters.page_size, totalRecords)} of {totalRecords}
                        </span>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                            <button className="btn-sm outline" disabled={filters.page_number <= 1}
                                onClick={() => setFilters(p => ({ ...p, page_number: p.page_number - 1 }))}>← Prev</button>
                            <button className="btn-sm outline" disabled={filters.page_number * filters.page_size >= totalRecords}
                                onClick={() => setFilters(p => ({ ...p, page_number: p.page_number + 1 }))}>Next →</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ── Bond Tab ──────────────────────────────────────────────────
function BondTab({ onNavigate, onDataLoaded }) {
    const [rows, setRows]          = useState([]);
    const [loading, setLoading]    = useState(true);
    const [error, setError]        = useState(null);
    const [totalRecords, setTotal] = useState(0);
    const [filters, setFilters]    = useState({
        bond_name: '', issuer: '', classification: '', slr_status: '', record_status: '',
        page_number: 1, page_size: 20,
    });

    const fetchData = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const [summaryRes, tableRes] = await Promise.all([
                getAllBonds({ page_size: 1000, page_number: 1 }),
                getAllBonds(filters),
            ]);
            setRows(tableRes.data || []);
            setTotal(tableRes.total_records || 0);
            onDataLoaded && onDataLoaded(summaryRes.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const fc = (key, val) => setFilters(p => ({ ...p, [key]: val, page_number: 1 }));

    return (
        <>
            {/* Filters */}
            <div style={{ padding: '10px 16px', display: 'flex', gap: '10px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
                <input className="form-input" style={{ width: '160px', padding: '5px 8px', fontSize: '12px' }}
                    placeholder="Search bond name..." value={filters.bond_name}
                    onChange={e => fc('bond_name', e.target.value)} />
                <input className="form-input" style={{ width: '140px', padding: '5px 8px', fontSize: '12px' }}
                    placeholder="Search issuer..." value={filters.issuer}
                    onChange={e => fc('issuer', e.target.value)} />
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.classification} onChange={e => fc('classification', e.target.value)}>
                    <option value="">All Classes</option>
                    <option value="HTM">HTM</option>
                    <option value="AFS">AFS</option>
                    <option value="HFT">HFT</option>
                </select>
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.slr_status} onChange={e => fc('slr_status', e.target.value)}>
                    <option value="">All SLR</option>
                    <option value="SLR">SLR</option>
                    <option value="Non-SLR">Non-SLR</option>
                </select>
                <select className="form-select" style={{ width: '130px', padding: '5px 8px', fontSize: '12px' }}
                    value={filters.record_status} onChange={e => fc('record_status', e.target.value)}>
                    <option value="">All Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button className="btn-sm outline" style={{ fontSize: '12px' }} onClick={fetchData}>🔄 Refresh</button>
            </div>

            <div className="card-body" style={{ padding: 0 }}>
                {error && (
                    <div className="alert-banner danger" style={{ margin: '12px 16px' }}>
                        ⚠️ {error}
                        <button className="btn-sm outline" style={{ marginLeft: '10px', fontSize: '11px' }} onClick={fetchData}>Retry</button>
                    </div>
                )}

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>⏳ Loading Bonds...</div>
                ) : rows.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No records found.
                        <button className="btn-sm gold" style={{ marginLeft: '8px' }} onClick={() => onNavigate('bond_new')}>+ Add New Bond</button>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th><th>Bond / Issuer</th><th>ISIN</th>
                                <th>Face Val</th><th>Qty</th><th>Coupon%</th>
                                <th>Maturity</th><th>Days Left</th>
                                <th>SLR</th><th>Class</th><th>Status</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <tr key={row.ID}>
                                    <td>INV-{String(row.ID).padStart(3, '0')}</td>
                                    <td>
                                        <b>{row.Bond_Name}</b>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{row.Issuer}</div>
                                    </td>
                                    <td style={{ fontSize: '11px' }}>{row.ISIN}</td>
                                    <td>{formatINR(row.Face_Value)}</td>
                                    <td>{row.Quantity}</td>
                                    <td>{row.Coupon_Pct}%</td>
                                    <td>{formatDate(row.Maturity_Date)}</td>
                                    <td><DaysLeftBadge days={row.Days_To_Maturity} /></td>
                                    <td><span className={`badge ${row.SLR_Status === 'SLR' ? 'slr' : 'non-slr'}`}>{row.SLR_Status}</span></td>
                                    <td><ClassBadge cls={row.Classification} /></td>
                                    <td><StatusPill status={row.Record_Status} /></td>
                                    <td>
                                        <button className="btn-sm outline" onClick={() => onNavigate('bond_view', { id: row.ID })}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                {!loading && totalRecords > filters.page_size && (
                    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid var(--border)', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Showing {((filters.page_number - 1) * filters.page_size) + 1}–{Math.min(filters.page_number * filters.page_size, totalRecords)} of {totalRecords}
                        </span>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                            <button className="btn-sm outline" disabled={filters.page_number <= 1}
                                onClick={() => setFilters(p => ({ ...p, page_number: p.page_number - 1 }))}>← Prev</button>
                            <button className="btn-sm outline" disabled={filters.page_number * filters.page_size >= totalRecords}
                                onClick={() => setFilters(p => ({ ...p, page_number: p.page_number + 1 }))}>Next →</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ── Main Component ────────────────────────────────────────────
export default function FDBonds({ onNavigate }) {
    const [activeTab, setActiveTab] = useState('fd');

    // Summary data lifted from tabs
    const [allFDRows,   setAllFDRows]   = useState([]);
    const [allBondRows, setAllBondRows] = useState([]);
    const [fdLoading,   setFdLoading]   = useState(true);
    const [bondLoading, setBondLoading] = useState(true);

    const tabStyle = (tab) => ({
        padding: '7px 18px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
        background: 'transparent',
        color: activeTab === tab ? 'var(--gold)' : 'var(--gray-400)',
    });

    return (
        <div>
            {/* Live Summary Cards */}
            <SummaryCards
                fdRows={allFDRows}
                bondRows={allBondRows}
                fdLoading={fdLoading}
                bondLoading={bondLoading}
            />

            <div className="card">
                <div className="card-header">
                    <span className="card-title">🏦 Fixed Deposits & Bond Holdings</span>
                    <button className="btn-sm gold"    onClick={() => onNavigate('fd_new')}>+ New FD</button>
                    <button className="btn-sm primary" onClick={() => onNavigate('bond_new')}>+ New Bond</button>
                    <button className="btn-sm outline">Export</button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', paddingLeft: '16px' }}>
                    <button style={tabStyle('fd')}   onClick={() => setActiveTab('fd')}>🏦 Fixed Deposits</button>
                    <button style={tabStyle('bond')} onClick={() => setActiveTab('bond')}>📜 Bonds</button>
                </div>

                {activeTab === 'fd' ? (
                    <FDTab
                        onNavigate={onNavigate}
                        onDataLoaded={(data) => { setAllFDRows(data); setFdLoading(false); }}
                    />
                ) : (
                    <BondTab
                        onNavigate={onNavigate}
                        onDataLoaded={(data) => { setAllBondRows(data); setBondLoading(false); }}
                    />
                )}
            </div>
        </div>
    );
}