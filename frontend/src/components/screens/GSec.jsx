import React, { useState, useEffect } from 'react';
import { Briefcase, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getPurchases, authorizePurchases } from '../../services/api';

export default function GSec({ onNavigate }) {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPurchases();
        setHoldings(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatNum = (num) => {
    if (!num) return '₹0';
    const val = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const getSecurityType = (name) => {
    const n = (name || '').toUpperCase();
    if (n.includes('SDL')) return 'SDL';
    if (n.includes('T-BILL') || n.includes('TREASURY BILL')) return 'T-Bill';
    return 'G-Sec';
  };

  const totals = holdings.reduce((acc, inv) => {
    const amt = parseFloat((inv.Amount || '0').replace(/,/g, '')) || 0;
    const type = getSecurityType(inv.Security);
    if (type === 'G-Sec') acc.gsec += amt;
    else if (type === 'SDL') acc.sdl += amt;
    else if (type === 'T-Bill') acc.tbill += amt;
    acc.total += amt;
    return acc;
  }, { gsec: 0, sdl: 0, tbill: 0, total: 0 });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewMode('form');
  };

  const handleAuthorize = async () => {
    if (!selectedRecord?.id) {
      alert("⚠️ Error: Selected record is missing a database ID.");
      return;
    }
    
    console.log("Authorizing record in GSec with ID:", selectedRecord.id);
    setIsAuthorizing(true);
    try {
      await authorizePurchases([selectedRecord.id]);
      alert(`✅ Transaction Authorized Successfully!\nSet Number: ${selectedRecord.id}`);
      setViewMode('list');
      // Refresh data
      setLoading(true);
      const data = await getPurchases();
      setHoldings(data);
    } catch (err) {
      console.error("Authorization failed:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsAuthorizing(false);
      setLoading(false);
    }
  };

  const getFieldType = (key) => {
    const k = key.toLowerCase();
    if (k.includes('date')) return 'date';
    if (k.includes('amount') || k.includes('value') || k.includes('price')) return 'number';
    return 'text';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', flexDirection: 'column', gap: '12px' }}>
        <Loader2 className="animate-spin" size={32} color="var(--gold)" />
        <span style={{ color: 'var(--gray-400)' }}>Loading Treasury Portfolio...</span>
      </div>
    );
  }

  if (viewMode === 'form' && selectedRecord) {
    const displayFields = Object.keys(selectedRecord).filter(k => k !== 'id' && !k.startsWith('__'));

    return (
      <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-sm outline" style={{ padding: '8px' }} onClick={() => setViewMode('list')} disabled={isAuthorizing}>
              <ArrowLeft size={16} />
            </button>
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} /> Investment Details
            </span>
          </div>
          <span className="badge slr">{selectedRecord.Trade_Number}</span>
        </div>
        <div className="card-body">
          <div className="form-section">
            <div className="form-section-title">Record Information (Core Database)</div>
            <div className="form-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {displayFields.map(header => (
                <div className="form-group" key={header}>
                  <label className="form-label" style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>{header.replace(/_/g, ' ')}</label>
                  <input
                    className="form-input"
                    type={getFieldType(header)}
                    value={selectedRecord[header]?.toString() || ''}
                    readOnly
                    style={{ background: 'var(--gray-50)', cursor: 'default', width: '100%', padding: '8px' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button className="btn-sm outline" onClick={() => setViewMode('list')} disabled={isAuthorizing}>Close Details</button>
            {selectedRecord.Estatus != '2' && (
              <button 
                className="btn-sm gold" 
                style={{ minWidth: '160px', background: 'var(--success)', borderColor: 'var(--success)' }} 
                onClick={handleAuthorize}
                disabled={isAuthorizing}
              >
                {isAuthorizing ? <Loader2 size={14} className="animate-spin" /> : <><CheckCircle2 size={14} style={{ marginRight: '8px' }} /> Authorize Transaction</>}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>G-Sec / SDL / T-Bills — SLR Eligible | NDS-OM | SGL Account | FIMMDA Valuation</span>
        </div>
        <div className="rbi-text">UCBs must hold SLR securities (G-Sec, SDL, T-Bills, NABARD/NHB) ≥ 18% of NDTL. G-Secs traded on NDS-OM. Settlement through SGL account at RBI. Valuation: HTM at cost, AFS/HFT at FIMMDA/FBIL prices.</div>
      </div>

      <div className="report-cards">
        <div className="report-card"><div className="rc-label">G-Sec Holdings</div><div className="rc-value">{formatNum(totals.gsec)}</div></div>
        <div className="report-card"><div className="rc-label">SDL Holdings</div><div className="rc-value">{formatNum(totals.sdl)}</div></div>
        <div className="report-card"><div className="rc-label">T-Bills</div><div className="rc-value">{formatNum(totals.tbill)}</div></div>
        <div className="report-card"><div className="rc-label">Total SLR Portfolio</div><div className="rc-value">{formatNum(totals.total)}</div></div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={16} /> G-Sec / SDL / T-Bill Holdings
          </span>
          <button className="btn-sm gold" onClick={() => onNavigate('file_upload')}>Purchase/Sell</button>
          <button className="btn-sm outline">Export</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Inv. ID</th><th>Instrument</th><th>ISIN</th><th>Type</th><th>Classification</th>
                <th>Face Value</th><th>Book Value (₹)</th><th>Market Value</th><th>Coupon%</th>
                <th>Maturity</th><th>SGL No.</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 ? (
                <tr>
                  <td colSpan="13" style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '20px' }}>No records found in database.</td>
                </tr>
              ) : (
                holdings.map((inv) => {
                  return (
                    <tr key={inv.id || inv.Trade_Number}>
                      <td>{inv.Trade_Number?.toString().slice(-7)}</td>
                      <td><b>{inv.Security}</b></td>
                      <td>{inv.ISIN}</td>
                      <td><span className="badge slr">{getSecurityType(inv.Security)}</span></td>
                      <td><span className="badge htm">{inv.Portfolio}</span></td>
                      <td style={{ textAlign: 'right' }}>{formatNum(inv.Amount)}</td>
                      <td style={{ textAlign: 'right' }}>{formatNum(inv.Trade_Amount)}</td>
                      <td style={{ textAlign: 'right' }}>{formatNum(inv.Sett_Consideration)}</td>
                      <td>{inv.Trade_Yield}%</td>
                      <td>{inv.Maturity_Date}</td>
                      <td>{inv.postset || '-'}</td>
                      <td><span className={`badge ${inv.Estatus == '2' ? 'active' : 'pending'}`}>{inv.Estatus == '2' ? 'Active' : 'Pending'}</span></td>
                      <td>
                        <button className="btn-sm outline" onClick={() => handleViewRecord(inv)}>View</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
