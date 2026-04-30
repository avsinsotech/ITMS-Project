import React, { useState } from 'react';
import { FileX, Printer, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';

/* ─────────────────────────────────────────
   Dummy receipt data
───────────────────────────────────────── */
const RECEIPT_ROWS = [
  {
    date: '18/03/2023',
    amount: '150000000.00',
    maturityDate: '23/05/2024',
    bal: '150000000.00',
    maturityAmt: '150000000.00',
    rate: '8.1',
    period: '5',
  },
];

/* ─────────────────────────────────────────
   Close Types
───────────────────────────────────────── */
const CLOSE_TYPES = [
  'AFTER MATURITY CLOSURE',
  'PREMATURE CLOSURE',
  'TRANSFER CLOSURE',
];

const CAL_TYPES = ['--select--', 'Simple', 'Compound', 'Quarterly'];
const INT_TYPES = ['--Select--', 'Monthly', 'Quarterly', 'On Maturity'];

/* ─────────────────────────────────────────
   Styles — scoped inline so they don't
   conflict with existing project CSS
───────────────────────────────────────── */
const S = {
  wrap: {
    padding: '20px 24px',
    fontFamily: 'inherit',
  },
  card: {
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    background: 'var(--navy, #0f2044)',
    color: '#fff',
    padding: '10px 18px',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.3,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  cardBody: {
    padding: '16px 18px',
  },

  /* radio tab row */
  radioRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    padding: '12px 0',
    borderBottom: '1px solid #e8ecf2',
    marginBottom: 4,
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    color: '#344563',
  },
  radioInput: {
    accentColor: 'var(--navy, #0f2044)',
    width: 14,
    height: 14,
    cursor: 'pointer',
  },

  /* section label inside card */
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--navy, #0f2044)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '1px solid #dde3ef',
    paddingBottom: 4,
    marginBottom: 12,
    marginTop: 4,
  },

  /* form grid */
  grid: (cols = 3) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '10px 18px',
  }),
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px 18px',
  },

  /* field */
  fg: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  input: (readonly = false) => ({
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: readonly ? '#f4f6fb' : '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }),
  inputHighlight: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#fff9e6',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },

  /* inline pair: code + name */
  pair: {
    display: 'flex',
    gap: 6,
  },
  codeInput: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#f4f6fb',
    outline: 'none',
    width: 72,
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  nameInput: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#f4f6fb',
    outline: 'none',
    flex: 1,
    boxSizing: 'border-box',
  },
  intAccInput: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#fff9ef',
    outline: 'none',
    width: 64,
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  intAccName: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#fff9ef',
    outline: 'none',
    flex: 1,
    boxSizing: 'border-box',
  },

  /* period pair */
  periodWrap: { display: 'flex', gap: 6 },
  periodNum: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: '#f4f6fb',
    outline: 'none',
    width: 56,
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  periodDays: {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#94a3b8',
    background: '#f4f6fb',
    outline: 'none',
    flex: 1,
    boxSizing: 'border-box',
  },

  /* buttons */
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 0 2px',
  },
  btn: (variant = 'primary') => {
    const base = {
      height: 32,
      borderRadius: 4,
      border: 'none',
      padding: '0 16px',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
    };
    if (variant === 'primary')
      return { ...base, background: 'var(--navy, #0f2044)', color: '#fff' };
    if (variant === 'teal')
      return { ...base, background: '#009fa6', color: '#fff' };
    if (variant === 'gold')
      return { ...base, background: 'var(--gold, #c8a84b)', color: '#fff' };
    if (variant === 'danger')
      return { ...base, background: '#ef4444', color: '#fff' };
    if (variant === 'outline')
      return { ...base, background: '#f1f5f9', color: '#344563', border: '1px solid #d0d7e4' };
    return base;
  },

  /* receipt table */
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 12,
  },
  th: {
    background: 'var(--navy, #0f2044)',
    color: '#fff',
    padding: '8px 10px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: 0.2,
  },
  td: {
    padding: '7px 10px',
    borderBottom: '1px solid #e8ecf2',
    color: '#334155',
  },
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function TermDepositClose({ onNavigate }) {
  const [mode, setMode] = useState('close'); // 'close' | 'renewal' | 'interest'

  /* ── Investment header fields ── */
  const [inv, setInv] = useState({
    prdCode: '102',
    prdName: 'AXIS BANK',
    acNo: '1',
    acName: 'AXIS BANK',
    trfPrdCd: '',
    trfPrdName: '',
    intAccNo: '102',
    intAccName: 'IRD - IRD INTEREST RECD',
    closeType: 'AFTER MATURITY CLOSURE',
    trfAcNo: '',
  });

  /* ── Previous cert fields ── */
  const [prev, setPrev] = useState({
    investmentAmt: '150000000.00',
    openingDate: '18/03/2023',
    rate: '8.1',
    periodM: '5',
    periodD: 'Days',
    maturityAmt: '150000000.00',
    calType: '--select--',
    intReceived: '0',
    intProvision: '0',
    tdsDeduct: '0',
    tdsProv: '0',
    lastIntDate: '01/01/1900',
    dueDate: '23-05-2024',
    totalIntCalc: '0',
    total: '150000000.00',
    netAmount: '150000000.00',
  });

  /* ── New cert fields (renewal only) ── */
  const [newCert, setNewCert] = useState({
    investmentAmount: '150000000.00',
    asOfDate: '18/03/2023',
    intRate: '8.1',
    periodM: '5',
    periodD: 'Days',
    matValue: '150000000.00',
    calType: '--select--',
    intReceived: '0',
    intProvision: '0',
    tdsDeduct: '0',
    tdsProv: '0',
    intType: '--Select--',
    totalIntCalc: '0',
    netAmount: '150000000.00',
    matureDate: '23/05/2024',
  });

  const handleInv = (k, v) => setInv(p => ({ ...p, [k]: v }));
  const handlePrev = (k, v) => setPrev(p => ({ ...p, [k]: v }));
  const handleNew = (k, v) => setNewCert(p => ({ ...p, [k]: v }));

  const handleClearAll = () => {
    setPrev({
      investmentAmt: '', openingDate: '', rate: '', periodM: '', periodD: 'Days',
      maturityAmt: '', calType: '--select--', intReceived: '0', intProvision: '0',
      tdsDeduct: '0', tdsProv: '0', lastIntDate: '', dueDate: '',
      totalIntCalc: '0', total: '', netAmount: '',
    });
    setNewCert({
      investmentAmount: '', asOfDate: '', intRate: '', periodM: '', periodD: 'Days',
      matValue: '', calType: '--select--', intReceived: '0', intProvision: '0',
      tdsDeduct: '0', tdsProv: '0', intType: '--Select--',
      totalIntCalc: '0', netAmount: '', matureDate: '',
    });
  };

  const handleSubmit = () => {
    alert('✅ Term Deposit Closure submitted for Checker approval.');
  };

  return (
    <div style={S.wrap}>

      {/* ── Page Title ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <FileX size={20} color="var(--navy, #0f2044)" strokeWidth={2.5} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy, #0f2044)' }}>
            Investment Closure / Renewal
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            Term Deposit Close · FD &amp; Bonds
          </div>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div style={S.card}>

        {/* radio tabs */}
        <div style={S.radioRow}>
          {[
            { val: 'close',    label: 'Investment Close' },
            { val: 'renewal',  label: 'Investment Renewal' },
            { val: 'interest', label: 'Interest Prov / Received' },
          ].map(opt => (
            <label key={opt.val} style={S.radioLabel}>
              <input
                type="radio"
                style={S.radioInput}
                checked={mode === opt.val}
                onChange={() => setMode(opt.val)}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div style={S.cardBody}>

          {/* ── Investment Section ── */}
          <div style={S.sectionLabel}>Investment</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 28px', marginBottom: 18 }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Prd Code */}
              <div style={S.fg}>
                <span style={S.label}>Prd Code</span>
                <div style={S.pair}>
                  <input style={S.codeInput} value={inv.prdCode}
                    onChange={e => handleInv('prdCode', e.target.value)} />
                  <input style={S.nameInput} value={inv.prdName}
                    onChange={e => handleInv('prdName', e.target.value)} />
                </div>
              </div>
              {/* A/C No */}
              <div style={S.fg}>
                <span style={S.label}>A/C No.</span>
                <div style={S.pair}>
                  <input style={S.codeInput} value={inv.acNo}
                    onChange={e => handleInv('acNo', e.target.value)} />
                  <input style={S.nameInput} value={inv.acName}
                    onChange={e => handleInv('acName', e.target.value)} />
                </div>
              </div>
              {/* Trf PrCd */}
              <div style={S.fg}>
                <span style={S.label}>Trf PrCd</span>
                <div style={S.pair}>
                  <input
                    style={{ ...S.codeInput, background: '#e8f5e9', color: '#166534' }}
                    placeholder="Prod Code"
                    value={inv.trfPrdCd}
                    onChange={e => handleInv('trfPrdCd', e.target.value)}
                  />
                  <input style={{ ...S.nameInput, background: '#fff' }}
                    value={inv.trfPrdName}
                    onChange={e => handleInv('trfPrdName', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Int A/C No */}
              <div style={S.fg}>
                <span style={S.label}>Int A/C No.</span>
                <div style={S.pair}>
                  <input style={S.intAccInput} value={inv.intAccNo}
                    onChange={e => handleInv('intAccNo', e.target.value)} />
                  <input style={S.intAccName} value={inv.intAccName}
                    onChange={e => handleInv('intAccName', e.target.value)} />
                </div>
              </div>
              {/* Close Type */}
              <div style={S.fg}>
                <span style={S.label}>Close Type</span>
                <select style={S.select} value={inv.closeType}
                  onChange={e => handleInv('closeType', e.target.value)}>
                  {CLOSE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              {/* Trf A/C No */}
              <div style={S.fg}>
                <span style={S.label}>Trf A/C No.</span>
                <input style={S.input(false)} placeholder="A/C No."
                  value={inv.trfAcNo}
                  onChange={e => handleInv('trfAcNo', e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── Previous Certificate Details ── */}
          <div style={S.sectionLabel}>Previous Certificate Details</div>

          <div style={S.grid(3)}>
            {/* Col 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="Investment Amt" value={prev.investmentAmt}
                onChange={v => handlePrev('investmentAmt', v)} readonly={mode === 'interest'} />
              <Field label="Opening Date" value={prev.openingDate}
                onChange={v => handlePrev('openingDate', v)} />
              <Field label="Rate" value={prev.rate}
                onChange={v => handlePrev('rate', v)} />
              <div style={S.fg}>
                <span style={S.label}>Period (M/D)</span>
                <div style={S.periodWrap}>
                  <input style={S.periodNum} value={prev.periodM}
                    onChange={e => handlePrev('periodM', e.target.value)} />
                  <input style={S.periodDays} value={prev.periodD} readOnly />
                </div>
              </div>
              <Field label="Maturity Amt" value={prev.maturityAmt}
                onChange={v => handlePrev('maturityAmt', v)} />
            </div>

            {/* Col 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={S.fg}>
                <span style={S.label}>Cal Type</span>
                <select style={S.select} value={prev.calType}
                  onChange={e => handlePrev('calType', e.target.value)}>
                  {CAL_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field label="Int Received" value={prev.intReceived}
                onChange={v => handlePrev('intReceived', v)} />
              <Field label="Int Provision" value={prev.intProvision}
                onChange={v => handlePrev('intProvision', v)} />
              <Field label="TDS Deduct" value={prev.tdsDeduct}
                onChange={v => handlePrev('tdsDeduct', v)} />
              <Field label="TDS to Provi" value={prev.tdsProv}
                onChange={v => handlePrev('tdsProv', v)} />
            </div>

            {/* Col 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="Last Int Date" value={prev.lastIntDate}
                onChange={v => handlePrev('lastIntDate', v)} />
              <Field label="Due Date" value={prev.dueDate}
                onChange={v => handlePrev('dueDate', v)} />
              <Field label="Total Int Calculation" value={prev.totalIntCalc}
                onChange={v => handlePrev('totalIntCalc', v)} />
              <Field label="Total" value={prev.total}
                onChange={v => handlePrev('total', v)} highlight />
              <Field label="Net Amount" value={prev.netAmount}
                onChange={v => handlePrev('netAmount', v)} />
            </div>
          </div>

          {/* ── Certificate Details (New Investment) — Renewal only ── */}
          {mode === 'renewal' && (
            <>
              <div style={{ ...S.sectionLabel, marginTop: 20 }}>
                Certificate Details (New Investment)
              </div>
              <div style={S.grid(3)}>
                {/* Col 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Field label="Investment Amount" value={newCert.investmentAmount}
                    onChange={v => handleNew('investmentAmount', v)} />
                  <Field label="AS Of Date" value={newCert.asOfDate}
                    onChange={v => handleNew('asOfDate', v)} />
                  <Field label="Int. Rate" value={newCert.intRate}
                    onChange={v => handleNew('intRate', v)} />
                  <div style={S.fg}>
                    <span style={S.label}>Period (M/D)</span>
                    <div style={S.periodWrap}>
                      <input style={S.periodNum} value={newCert.periodM}
                        onChange={e => handleNew('periodM', e.target.value)} />
                      <input style={S.periodDays} value={newCert.periodD} readOnly />
                    </div>
                  </div>
                  <Field label="Mat. Value" value={newCert.matValue}
                    onChange={v => handleNew('matValue', v)} />
                </div>

                {/* Col 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={S.fg}>
                    <span style={S.label}>Cal Type</span>
                    <select style={S.select} value={newCert.calType}
                      onChange={e => handleNew('calType', e.target.value)}>
                      {CAL_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <Field label="Int Received" value={newCert.intReceived}
                    onChange={v => handleNew('intReceived', v)} />
                  <Field label="Int Provision" value={newCert.intProvision}
                    onChange={v => handleNew('intProvision', v)} />
                  <Field label="TDS Deduct" value={newCert.tdsDeduct}
                    onChange={v => handleNew('tdsDeduct', v)} />
                  <Field label="TDS to Provi" value={newCert.tdsProv}
                    onChange={v => handleNew('tdsProv', v)} />
                </div>

                {/* Col 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={S.fg}>
                    <span style={S.label}>Int Type</span>
                    <select style={S.select} value={newCert.intType}
                      onChange={e => handleNew('intType', e.target.value)}>
                      {INT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <Field label="Total Int Calculation" value={newCert.totalIntCalc}
                    onChange={v => handleNew('totalIntCalc', v)} highlight />
                  <Field label="Net Amount" value={newCert.netAmount}
                    onChange={v => handleNew('netAmount', v)} />
                  <Field label="Mature Date" value={newCert.matureDate}
                    onChange={v => handleNew('matureDate', v)} />
                </div>
              </div>
            </>
          )}

          {/* ── Action Buttons ── */}
          <div style={S.btnRow}>
            <button style={S.btn('teal')} onClick={() => alert('Voucher View')}>
              <Printer size={13} /> Voucher View
            </button>
            <button style={S.btn('primary')} onClick={handleSubmit}>
              <CheckCircle2 size={13} /> Submit
            </button>
            <button style={S.btn('outline')} onClick={handleClearAll}>
              Clear All
            </button>
            <button style={S.btn('outline')} onClick={() => onNavigate?.('dashboard')}>
              Exit
            </button>
            <button style={S.btn('outline')} onClick={() => onNavigate?.('fd_term_deposit_receipt')}>
              Back
            </button>
            <button style={S.btn('gold')} onClick={() => alert('Provision Posted successfully.')}>
              <RefreshCw size={13} /> Provision Post
            </button>
          </div>

        </div>{/* cardBody */}
      </div>{/* card */}

      {/* ── Receipt Details ── */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          Receipt Details
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead>
              <tr>
                {['Date', 'Amount', 'Maturity Date', 'Bal', 'Maturity Amt', 'Rate', 'Period'].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECEIPT_ROWS.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafd' : '#fff' }}>
                  <td style={S.td}>{row.date}</td>
                  <td style={S.td}>{row.amount}</td>
                  <td style={S.td}>{row.maturityDate}</td>
                  <td style={S.td}>{row.bal}</td>
                  <td style={S.td}>{row.maturityAmt}</td>
                  <td style={S.td}>{row.rate}</td>
                  <td style={S.td}>{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────
   Helper: single form field
───────────────────────────────────────── */
function Field({ label, value, onChange, readonly = false, highlight = false }) {
  const base = {
    height: 32,
    border: '1px solid #d0d7e4',
    borderRadius: 4,
    padding: '0 8px',
    fontSize: 12,
    color: '#1e293b',
    background: highlight ? '#fff3e0' : readonly ? '#f4f6fb' : '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{
        fontSize: 10, fontWeight: 600, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: 0.4,
      }}>
        {label}
      </span>
      <input
        style={base}
        value={value}
        readOnly={readonly}
        onChange={e => !readonly && onChange?.(e.target.value)}
      />
    </div>
  );
}