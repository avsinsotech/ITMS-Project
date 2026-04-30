import React from 'react';
import { BarChart3, Building2, ClipboardList, CheckCircle2, CalendarDays } from 'lucide-react';

export default function Compliance() {
  return (
    <div>
      <div className="rbi-info-box">
        <div className="rbi-header">
          <span className="rbi-tag">RBI CIRCULAR</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>SLR/CRR Master Circular | UBD.BPD.(PCB) MC No.4/09.37.000</span>
        </div>
        <div className="rbi-text">UCBs must maintain SLR ≥ 18% of NDTL in approved securities. CRR = 4% of NDTL in cash with RBI. Deficiency in SLR: penal interest @ 3% p.a. above bank rate. Weekly SLR return (Form VIII) due every Friday.</div>
      </div>

      <div className="three-col">
        {/* SLR Position */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={16} /> SLR Position
            </span>
          </div>
          <div className="card-body">
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '34px', fontFamily: "'DM Serif Display',serif", color: 'var(--navy)' }}>24.80%</div>
              <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Current SLR | Required 18.00%</div>
            </div>
            <div style={{ background: 'var(--success-bg)', borderRadius: '7px', padding: '9px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} /> SURPLUS +6.80%
              </div>
              <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>₹9.69 Cr above minimum</div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>NDTL</span><b>₹142.50 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Required 18%</span><b>₹25.65 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Actual SLR</span><b style={{ color: 'var(--success)' }}>₹35.34 Cr</b></div>
            </div>
          </div>
        </div>

        {/* CRR Position */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} /> CRR Position
            </span>
          </div>
          <div className="card-body">
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '34px', fontFamily: "'DM Serif Display',serif", color: 'var(--navy)' }}>4.20%</div>
              <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Current CRR | Required 4.00%</div>
            </div>
            <div style={{ background: 'var(--success-bg)', borderRadius: '7px', padding: '9px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} /> SURPLUS +0.20%
              </div>
              <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>₹0.285 Cr above minimum</div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>NDTL</span><b>₹142.50 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Required 4%</span><b>₹5.70 Cr</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Cash w/ RBI</span><b style={{ color: 'var(--success)' }}>₹5.985 Cr</b></div>
            </div>
          </div>
        </div>

        {/* Return Calendar */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={16} /> Return Calendar
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: 'var(--success-bg)', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--success)' }}>Form VIII – SLR Weekly</div>
                <div><span className="badge active">Submitted</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: 'var(--warning-bg)', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--warning)' }}>Daily CRR (Today)</div>
                <div><span className="badge pending">Pending</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: 'var(--gray-50)', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600 }}>NBS-8 Quarterly</div>
                <div><span className="badge htm">Jun-2026</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly SLR Trend */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarDays size={16} /> Weekly SLR Trend (Last 6 Weeks)
          </span>
          <button className="btn-sm gold">Export</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>Reporting Friday</th><th>NDTL (₹Cr)</th><th>Required 18%</th><th>G-Sec+SDL</th><th>T-Bills</th><th>Bonds</th><th>Total SLR</th><th>SLR%</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>11-Apr-2026</td><td>142.50</td><td>25.65</td><td>28.10</td><td>7.24</td><td>11.25</td><td>35.34</td><td>24.80%</td><td><span className="badge active">OK</span></td></tr>
              <tr><td>04-Apr-2026</td><td>141.80</td><td>25.52</td><td>27.60</td><td>7.00</td><td>11.25</td><td>34.60</td><td>24.40%</td><td><span className="badge active">OK</span></td></tr>
              <tr><td>28-Mar-2026</td><td>140.20</td><td>25.24</td><td>27.60</td><td>5.00</td><td>11.25</td><td>32.60</td><td>23.25%</td><td><span className="badge active">OK</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
