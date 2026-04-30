import React from 'react';
import { ShieldCheck, Target, Building2, ChevronRight, Home, AlertTriangle, FileText, BarChart3 } from 'lucide-react';

export default function GSecPolicy() {
  return (
    <div className="gsec-policy-screen" style={{ 
      background: '#f8fafc', 
      minHeight: '100%', 
      padding: '16px 20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header & Breadcrumbs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ color: '#1f2937', fontSize: '20px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Investment Policy & Exposure Limits
          </h2>
          <span style={{ 
            background: '#f59e0b', 
            color: '#fff', 
            fontSize: '9px', 
            fontWeight: 800, 
            padding: '2px 8px', 
            borderRadius: '5px',
            textTransform: 'uppercase'
          }}>
            SETUP
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
          Home › Policy › <span style={{ color: '#1f2937', fontWeight: 600 }}>FY 2026-27</span>
        </div>
      </div>

      {/* Board Approval Banner */}
      <div style={{ 
        background: '#fffef3', 
        border: '1.2px dashed #fcd34d', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '10px 16px',
        marginBottom: '16px',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="#d97706" />
          <div style={{ fontSize: '12px', color: '#451a03', fontWeight: 600 }}>
            Board-Approved Policy | <span style={{ fontWeight: 400 }}>Resolution No. BR/2026/14 dated 05-Apr-2026</span>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#451a03', fontWeight: 500 }}>
          Next Review: <span style={{ fontWeight: 700 }}>31-Mar-2027</span>
        </div>
      </div>

      <div className="two-col" style={{ gridTemplateColumns: '1fr 1.3fr', gap: '16px', marginBottom: '16px' }}>
        {/* SLR & Non-SLR Targets (Form on Left) */}
        <div className="card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div className="card-header" style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '3px', height: '14px', background: '#f59e0b', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>SLR & Non-SLR Targets</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: '16px' }}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label" style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>SLR Target (% of NDTL)</label>
              <input className="form-input readonly" value="18.50" readOnly style={{ height: '34px', fontSize: '13px', background: '#f8fafc' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label" style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>Current SLR</label>
              <input className="form-input readonly" value="18.75" readOnly style={{ height: '34px', fontSize: '13px', background: '#f0fdf4', color: '#15803d', fontWeight: 700 }} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label" style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>Max Non-SLR Exposure</label>
              <input className="form-input readonly" value="10.00" readOnly style={{ height: '34px', fontSize: '13px', background: '#f8fafc' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label" style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>Max Single Issuer (Non-GoI)</label>
              <input className="form-input readonly" value="5.00" readOnly style={{ height: '34px', fontSize: '13px', background: '#f8fafc' }} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>Max Modified Duration (yrs)</label>
              <input className="form-input readonly" value="6.00" readOnly style={{ height: '34px', fontSize: '13px', background: '#f8fafc' }} />
            </div>
          </div>
        </div>

        {/* Category-wise Caps (Table on Right) */}
        <div className="card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div className="card-header" style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '3px', height: '14px', background: '#f59e0b', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Category-wise Caps</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e3a8a', color: '#fff' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}>Policy Cap</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}>Current Holding</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}>Headroom</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700, background: '#f0fdf4', color: '#15803d', border: '1px solid #dcfce7' }}>HTM</span>
                  </td>
                  <td style={{ textAlign: 'center', fontSize: '12px', color: '#475569' }}>75% of Inv.</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600 }}>68.9%</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>6.1%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff7ed' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700, background: '#fff7ed', color: '#c2410c', border: '1px solid #ffedd5' }}>AFS</span>
                  </td>
                  <td style={{ textAlign: 'center', fontSize: '12px', color: '#475569' }}>25% of Inv.</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600 }}>25.8%</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#ef4444' }}>-0.8%</td>
                </tr>
                <tr style={{ borderBottom: 'none' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700, background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2' }}>HFT</span>
                  </td>
                  <td style={{ textAlign: 'center', fontSize: '12px', color: '#475569' }}>10% of Inv.</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600 }}>5.3%</td>
                  <td style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>4.7%</td>
                </tr>
              </tbody>
            </table>

            <div style={{ padding: '12px 16px', background: '#fffbeb', borderTop: '1px solid #fef3c7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', fontSize: '11px' }}>
                <AlertTriangle size={14} />
                <span style={{ fontWeight: 500 }}>
                  AFS marginally breached cap — trigger rebalance or shift to HTM.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counterparty Exposure Limits */}
      <div className="card" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <div className="card-header" style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '3px', height: '14px', background: '#f59e0b', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Counterparty Exposure Limits</span>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1e3a8a', color: '#fff' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600 }}>Counterparty</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600 }}>Sanctioned Limit (₹ Cr)</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600 }}>Utilised</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: '11px', fontWeight: 600 }}>Available</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>SBI DFHI</td>
                <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>PD</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600 }}>50.00</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px' }}>28.40</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>21.60</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>STCI PD</td>
                <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>PD</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600 }}>40.00</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px' }}>15.20</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>24.80</td>
              </tr>
              <tr style={{ borderBottom: 'none' }}>
                <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>HDFC Bank</td>
                <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>Bank</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600 }}>30.00</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px' }}>0.00</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#15803d' }}>30.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '24px', paddingBottom: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '10px', fontWeight: 500 }}>
        AVS InSoTech Private Limited | Investment & Treasury Management System — G-Sec Module v1.0 | © 2026
      </div>
    </div>
  );
}
