import React, { useState, useCallback } from 'react';
import { Calculator, RefreshCw, FileText, X, TrendingUp, Calendar, Percent, IndianRupee, Clock, Building2 } from 'lucide-react';

const emptyForm = {
  calcType: 'investment',      // 'investment' | 'gsecurity'
  asOnDate: '',
  prdCdFrom: '',
  prdCdFromDesc: '',
  prdCdTo: '',
  prdCdToDesc: '',
  // Investment-specific
  depositAmount: '',
  rateOfInterest: '',
  tenorDays: '',
  depositDate: '',
  maturityDate: '',
  interestType: 'simple',      // 'simple' | 'compound'
  compoundFreq: 'quarterly',
  bankBranch: '',
  accountNo: '',
  // G-Security specific
  faceValue: '',
  couponRate: '',
  settlementDate: '',
  yieldRate: '',
  securityType: 'gsec',        // 'gsec' | 'sdl' | 'tbill'
};

const PRD_OPTIONS = [
  { code: '101', desc: 'Short Term Deposit' },
  { code: '102', desc: 'Fixed Deposit' },
  { code: '103', desc: 'Recurring Deposit' },
  { code: '104', desc: 'Special Deposit' },
];

export default function TermDepositCalc({ onNavigate }) {
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  /* ── Auto-fill maturity date when tenor changes ── */
  const handleTenorChange = (days) => {
    set('tenorDays', days);
    if (form.depositDate && days) {
      const d = new Date(form.depositDate);
      d.setDate(d.getDate() + parseInt(days, 10));
      set('maturityDate', d.toISOString().split('T')[0]);
    }
  };

  const handleDepositDateChange = (date) => {
    set('depositDate', date);
    if (form.tenorDays && date) {
      const d = new Date(date);
      d.setDate(d.getDate() + parseInt(form.tenorDays, 10));
      set('maturityDate', d.toISOString().split('T')[0]);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.asOnDate)    e.asOnDate = 'Required';
    if (!form.prdCdFrom)   e.prdCdFrom = 'Required';
    if (form.calcType === 'investment') {
      if (!form.depositAmount)    e.depositAmount = 'Required';
      if (!form.rateOfInterest)   e.rateOfInterest = 'Required';
      if (!form.tenorDays)        e.tenorDays = 'Required';
      if (!form.depositDate)      e.depositDate = 'Required';
    } else {
      if (!form.faceValue)        e.faceValue = 'Required';
      if (!form.couponRate)       e.couponRate = 'Required';
      if (!form.settlementDate)   e.settlementDate = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calcInterest = useCallback(() => {
    if (!validate()) return;
    setIsCalculating(true);

    setTimeout(() => {
      if (form.calcType === 'investment') {
        const P = parseFloat(form.depositAmount.replace(/,/g, '')) || 0;
        const r = parseFloat(form.rateOfInterest) / 100;
        const t = parseInt(form.tenorDays, 10) / 365;
        let interest, maturityAmt;

        if (form.interestType === 'simple') {
          interest    = P * r * t;
          maturityAmt = P + interest;
        } else {
          const n = form.compoundFreq === 'monthly' ? 12
                  : form.compoundFreq === 'quarterly' ? 4
                  : form.compoundFreq === 'halfyearly' ? 2 : 1;
          maturityAmt = P * Math.pow(1 + r / n, n * t);
          interest    = maturityAmt - P;
        }

        const tdsRate  = 0.10;
        const tds      = interest * tdsRate;
        const netInt   = interest - tds;
        const dayCount = parseInt(form.tenorDays, 10);

        setResult({
          type: 'investment',
          principal: P,
          grossInterest: interest,
          tds,
          netInterest: netInt,
          maturityAmount: P + netInt,
          grossMaturity: maturityAmt,
          effectiveRate: (interest / P / t) * 100,
          dayCount,
          annualYield: (netInt / P / t) * 100,
        });
      } else {
        // G-Security dirty price calc (simplified)
        const fv  = parseFloat(form.faceValue.replace(/,/g, '')) || 0;
        const c   = parseFloat(form.couponRate) / 100;
        const y   = parseFloat(form.yieldRate) / 100 || c;
        const semiAnnualCoupon = fv * c / 2;
        const periods = 10; // assume 5-yr bond = 10 half-years
        let pv = 0;
        for (let i = 1; i <= periods; i++) {
          pv += semiAnnualCoupon / Math.pow(1 + y / 2, i);
        }
        pv += fv / Math.pow(1 + y / 2, periods);
        const accruedDays = 45; // mock
        const accruedInt  = fv * c * accruedDays / 365;

        setResult({
          type: 'gsecurity',
          faceValue: fv,
          cleanPrice: pv,
          accruedInterest: accruedInt,
          dirtyPrice: pv + accruedInt,
          couponPayable: semiAnnualCoupon * 2,
          yieldToMaturity: y * 100,
          modDuration: 4.2,
          macDuration: 4.35,
        });
      }
      setIsCalculating(false);
    }, 600);
  }, [form]);

  const handleClear = () => { setForm(emptyForm); setResult(null); setErrors({}); };

  const fmt = (n) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);
  const fmtCr = (n) => `₹ ${fmt(n)}`;

  /* ─── PRD lookup helper ─── */
  const lookupPrd = (code, field) => {
    const found = PRD_OPTIONS.find(p => p.code === code);
    if (found) set(field, found.desc);
  };

  return (
    <div style={{ padding: '0 0 32px 0' }}>
      {/* ── Page Header ── */}
      <div className="screen-header" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Calculator size={18} color="var(--navy)" strokeWidth={2.5} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>
              Term Deposit Calculation
            </h2>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
              Calculate interest &amp; maturity for Investment or G-Security deposits
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="card" style={{ marginBottom: 16 }}>
        {/* Header band */}
        <div style={{
          background: 'var(--navy)', borderRadius: '8px 8px 0 0',
          padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Investment Interest Calculation</span>
        </div>

        <div style={{ padding: '20px 20px 8px' }}>
          {/* ── Radio Buttons ── */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 20 }}>
            {[
              { val: 'investment', label: 'Investment' },
              { val: 'gsecurity', label: 'G-Security' },
            ].map(opt => (
              <label key={opt.val} style={{
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                fontWeight: form.calcType === opt.val ? 700 : 500,
                color: form.calcType === opt.val ? 'var(--navy)' : 'var(--text-muted)',
                fontSize: 13,
              }}>
                <input
                  type="radio"
                  name="calcType"
                  value={opt.val}
                  checked={form.calcType === opt.val}
                  onChange={() => { set('calcType', opt.val); setResult(null); }}
                  style={{ accentColor: 'var(--navy)', width: 15, height: 15 }}
                />
                {opt.label}
              </label>
            ))}
          </div>

          {/* ── Row 1: As On Date ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, marginBottom: 16, alignItems: 'end' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">
                As On Date <span className="req">*</span>
              </label>
              <input
                type="date"
                className={`form-input ${errors.asOnDate ? 'input-error' : ''}`}
                value={form.asOnDate}
                onChange={e => set('asOnDate', e.target.value)}
              />
              {errors.asOnDate && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.asOnDate}</div>}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0 16px' }} />

          {/* ── Row 2: PRD Code From / To ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
            {/* From */}
            <div>
              <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>
                PRD Cd. (From) <span className="req">*</span>
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: '0 0 120px' }}>
                  <select
                    className={`form-select ${errors.prdCdFrom ? 'input-error' : ''}`}
                    value={form.prdCdFrom}
                    onChange={e => {
                      set('prdCdFrom', e.target.value);
                      lookupPrd(e.target.value, 'prdCdFromDesc');
                    }}
                  >
                    <option value="">Code</option>
                    {PRD_OPTIONS.map(p => <option key={p.code} value={p.code}>{p.code}</option>)}
                  </select>
                  {errors.prdCdFrom && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.prdCdFrom}</div>}
                </div>
                <input
                  className="form-input readonly"
                  value={form.prdCdFromDesc}
                  readOnly
                  placeholder="Product Description"
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>
                PRD Cd. (To)
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: '0 0 120px' }}>
                  <select
                    className="form-select"
                    value={form.prdCdTo}
                    onChange={e => {
                      set('prdCdTo', e.target.value);
                      lookupPrd(e.target.value, 'prdCdToDesc');
                    }}
                  >
                    <option value="">Code</option>
                    {PRD_OPTIONS.map(p => <option key={p.code} value={p.code}>{p.code}</option>)}
                  </select>
                </div>
                <input
                  className="form-input readonly"
                  value={form.prdCdToDesc}
                  readOnly
                  placeholder="To Product Description"
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0 16px' }} />

          {/* ── Calculation Fields (same for both types) ── */}
          {form.calcType === 'investment' ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Deposit Details
              </div>
              <div className="form-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 20px', marginBottom: 16 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Deposit Date <span className="req">*</span></label>
                  <input type="date" className={`form-input ${errors.depositDate ? 'input-error' : ''}`}
                    value={form.depositDate} onChange={e => handleDepositDateChange(e.target.value)} />
                  {errors.depositDate && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.depositDate}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Deposit Amount (₹) <span className="req">*</span></label>
                  <input type="text" className={`form-input ${errors.depositAmount ? 'input-error' : ''}`}
                    value={form.depositAmount} placeholder="e.g. 10,00,000"
                    onChange={e => set('depositAmount', e.target.value)} />
                  {errors.depositAmount && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.depositAmount}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Rate of Interest (%) <span className="req">*</span></label>
                  <input type="number" className={`form-input ${errors.rateOfInterest ? 'input-error' : ''}`}
                    value={form.rateOfInterest} placeholder="e.g. 7.25" step="0.01" min="0" max="30"
                    onChange={e => set('rateOfInterest', e.target.value)} />
                  {errors.rateOfInterest && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.rateOfInterest}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Tenor (Days) <span className="req">*</span></label>
                  <input type="number" className={`form-input ${errors.tenorDays ? 'input-error' : ''}`}
                    value={form.tenorDays} placeholder="e.g. 365" min="1"
                    onChange={e => handleTenorChange(e.target.value)} />
                  {errors.tenorDays && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.tenorDays}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Maturity Date</label>
                  <input type="date" className="form-input readonly" value={form.maturityDate} readOnly />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Interest Type</label>
                  <select className="form-select" value={form.interestType} onChange={e => set('interestType', e.target.value)}>
                    <option value="simple">Simple Interest</option>
                    <option value="compound">Compound Interest</option>
                  </select>
                </div>

                {form.interestType === 'compound' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Compounding Frequency</label>
                    <select className="form-select" value={form.compoundFreq} onChange={e => set('compoundFreq', e.target.value)}>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="halfyearly">Half-Yearly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                )}

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bank / Branch</label>
                  <input type="text" className="form-input" value={form.bankBranch} placeholder="e.g. SBI – Mumbai HO"
                    onChange={e => set('bankBranch', e.target.value)} />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Account / FD No.</label>
                  <input type="text" className="form-input" value={form.accountNo} placeholder="FD Reference Number"
                    onChange={e => set('accountNo', e.target.value)} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                G-Security Details
              </div>
              <div className="form-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 20px', marginBottom: 16 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Security Type</label>
                  <select className="form-select" value={form.securityType} onChange={e => set('securityType', e.target.value)}>
                    <option value="gsec">G-Sec</option>
                    <option value="sdl">SDL</option>
                    <option value="tbill">T-Bill</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Settlement Date <span className="req">*</span></label>
                  <input type="date" className={`form-input ${errors.settlementDate ? 'input-error' : ''}`}
                    value={form.settlementDate} onChange={e => set('settlementDate', e.target.value)} />
                  {errors.settlementDate && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.settlementDate}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Face Value (₹) <span className="req">*</span></label>
                  <input type="text" className={`form-input ${errors.faceValue ? 'input-error' : ''}`}
                    value={form.faceValue} placeholder="e.g. 1,00,00,000"
                    onChange={e => set('faceValue', e.target.value)} />
                  {errors.faceValue && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.faceValue}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Coupon Rate (%) <span className="req">*</span></label>
                  <input type="number" className={`form-input ${errors.couponRate ? 'input-error' : ''}`}
                    value={form.couponRate} placeholder="e.g. 7.26" step="0.01"
                    onChange={e => set('couponRate', e.target.value)} />
                  {errors.couponRate && <div className="form-hint" style={{ color: 'var(--danger)' }}>{errors.couponRate}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Yield Rate (%) <span className="req">*</span></label>
                  <input type="number" className="form-input"
                    value={form.yieldRate} placeholder="e.g. 7.15" step="0.01"
                    onChange={e => set('yieldRate', e.target.value)} />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Maturity Date</label>
                  <input type="date" className="form-input" value={form.maturityDate}
                    onChange={e => set('maturityDate', e.target.value)} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div style={{
          borderTop: '1px solid var(--border)', padding: '14px 20px',
          display: 'flex', gap: 10, justifyContent: 'center',
        }}>
          <button
            className="topbar-btn btn-primary"
            onClick={calcInterest}
            disabled={isCalculating}
            style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 110 }}
          >
            {isCalculating
              ? <><RefreshCw size={14} className="spin" /> Calculating…</>
              : <><Calculator size={14} /> Trial Run</>
            }
          </button>
          <button
            className="topbar-btn btn-primary"
            onClick={calcInterest}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            Apply Entry
          </button>
          <button
            className="topbar-btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => result && window.print()}
          >
            <FileText size={14} /> Report
          </button>
          <button
            className="topbar-btn btn-outline"
            onClick={handleClear}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={14} /> Clear All
          </button>
          <button
            className="topbar-btn btn-outline"
            onClick={() => onNavigate?.('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <X size={14} /> Exit
          </button>
        </div>
      </div>

      {/* ── Results Card ── */}
      {result && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{
            background: 'var(--navy)', padding: '10px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <TrendingUp size={15} color="var(--gold)" />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>
              Calculation Result
            </span>
            <span style={{
              marginLeft: 'auto', background: 'var(--gold)', color: 'var(--navy)',
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
            }}>
              {result.type === 'investment' ? 'INVESTMENT' : 'G-SECURITY'}
            </span>
          </div>

          {result.type === 'investment' ? (
            <div style={{ padding: 20 }}>
              {/* Summary tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Principal Amount', value: fmtCr(result.principal), icon: IndianRupee, color: 'var(--navy)' },
                  { label: 'Gross Interest', value: fmtCr(result.grossInterest), icon: Percent, color: '#0a7c42' },
                  { label: 'TDS @ 10%', value: fmtCr(result.tds), icon: Clock, color: '#c0392b' },
                  { label: 'Net Maturity Amount', value: fmtCr(result.maturityAmount), icon: TrendingUp, color: 'var(--gold-dark, #b8860b)' },
                ].map((tile, i) => (
                  <div key={i} style={{
                    border: `1.5px solid ${tile.color}22`,
                    borderTop: `3px solid ${tile.color}`,
                    borderRadius: 8, padding: '14px 16px',
                    background: `${tile.color}08`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <tile.icon size={13} color={tile.color} />
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{tile.label}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: tile.color, fontVariantNumeric: 'tabular-nums' }}>
                      {tile.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light, #f0f4f8)' }}>
                    {['Particulars', 'Details'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--navy)', fontSize: 11, borderBottom: '2px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Principal Amount', fmtCr(result.principal)],
                    ['Deposit Period', `${result.dayCount} days`],
                    ['Gross Interest (before TDS)', fmtCr(result.grossInterest)],
                    ['TDS Deducted @ 10%', fmtCr(result.tds)],
                    ['Net Interest (after TDS)', fmtCr(result.netInterest)],
                    ['Gross Maturity Value', fmtCr(result.grossMaturity)],
                    ['Net Maturity Value', fmtCr(result.maturityAmount)],
                    ['Effective Annual Rate', `${result.effectiveRate.toFixed(4)} %`],
                    ['Annualized Net Yield', `${result.annualYield.toFixed(4)} %`],
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'var(--bg-light, #f8fafc)' }}>
                      <td style={{ padding: '8px 14px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 700, color: 'var(--navy)', fontVariantNumeric: 'tabular-nums' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="alert-banner info" style={{ marginTop: 16 }}>
                ℹ️ TDS deducted as per Section 194A. Effective rate assumes 365-day year. Net yield is post-TDS annualised return.
              </div>
            </div>
          ) : (
            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Face Value', value: fmtCr(result.faceValue), icon: IndianRupee, color: 'var(--navy)' },
                  { label: 'Clean Price', value: fmtCr(result.cleanPrice), icon: TrendingUp, color: '#0a7c42' },
                  { label: 'Accrued Interest', value: fmtCr(result.accruedInterest), icon: Percent, color: '#e67e22' },
                  { label: 'Dirty Price', value: fmtCr(result.dirtyPrice), icon: Calculator, color: 'var(--gold-dark, #b8860b)' },
                ].map((tile, i) => (
                  <div key={i} style={{
                    border: `1.5px solid ${tile.color}22`,
                    borderTop: `3px solid ${tile.color}`,
                    borderRadius: 8, padding: '14px 16px',
                    background: `${tile.color}08`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <tile.icon size={13} color={tile.color} />
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{tile.label}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: tile.color, fontVariantNumeric: 'tabular-nums' }}>
                      {tile.value}
                    </div>
                  </div>
                ))}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light, #f0f4f8)' }}>
                    {['Particulars', 'Details'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--navy)', fontSize: 11, borderBottom: '2px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Face Value', fmtCr(result.faceValue)],
                    ['Clean Price (PV of Cash Flows)', fmtCr(result.cleanPrice)],
                    ['Accrued Interest (45 days)', fmtCr(result.accruedInterest)],
                    ['Dirty Price (Settlement Price)', fmtCr(result.dirtyPrice)],
                    ['Annual Coupon Payable', fmtCr(result.couponPayable)],
                    ['Yield to Maturity', `${result.yieldToMaturity.toFixed(4)} %`],
                    ['Modified Duration', `${result.modDuration} years`],
                    ['Macaulay Duration', `${result.macDuration} years`],
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'var(--bg-light, #f8fafc)' }}>
                      <td style={{ padding: '8px 14px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</td>
                      <td style={{ padding: '8px 14px', fontWeight: 700, color: 'var(--navy)', fontVariantNumeric: 'tabular-nums' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="alert-banner info" style={{ marginTop: 16 }}>
                ℹ️ Dirty price = Clean price + Accrued interest. YTM calculated on semi-annual basis as per FIMMDA norms.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Spin animation */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .input-error { border-color: var(--danger, #c0392b) !important; }
      `}</style>
    </div>
  );
}