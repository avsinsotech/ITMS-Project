import React, { useState, useEffect, useCallback } from 'react';
import { validateGLCode, createTermDeposit, fetchTermDeposits, updateTermDeposit } from '../../services/termDepositApi';

// ── Constants ────────────────────────────────────────────────────────────────
const BRCD      = 1;   // branch code — replace with auth context value if available
const PAGE_SIZE = 8;

const INTEREST_PAYOUT_MAP = {
    'MONTHLY':     1,
    'QUATERLY':    2,
    'HALF YEARLY': 3,
    'YEARLY':      4,
    'ON MATURITY': 5,
};

const INTEREST_PAYOUT_REVERSE = {
    1: 'MONTHLY',
    2: 'QUATERLY',
    3: 'HALF YEARLY',
    4: 'YEARLY',
    5: 'ON MATURITY',
};

// ── Due date calculation ─────────────────────────────────────────────────────
function calcDueDate(asOfDate, period, periodUnit) {
    if (!asOfDate || !period || isNaN(Number(period)) || Number(period) <= 0) return '';
    const base = new Date(asOfDate);
    if (isNaN(base.getTime())) return '';
    const n = Number(period);
    if (periodUnit === 'Days') {
        base.setDate(base.getDate() + n);
    } else {
        const targetMonth = base.getMonth() + n;
        const targetYear  = base.getFullYear() + Math.floor(targetMonth / 12);
        const month       = targetMonth % 12;
        const lastDay     = new Date(targetYear, month + 1, 0).getDate();
        base.setFullYear(targetYear);
        base.setMonth(month);
        base.setDate(Math.min(base.getDate(), lastDay));
    }
    return base.toLocaleDateString('en-CA');
}

function fmtDisplayDate(val) {
    if (!val) return '';
    const [y, m, d] = val.split('-');
    return `${d}/${m}/${y}`;
}

// ── Styles ───────────────────────────────────────────────────────────────────
const css = `
  .tr-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .tr-wrap {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12px; color: #222; width: 100%;
    background: #fff; border: 1px solid #b0c4de;
    display: flex; flex-direction: column;
  }
  .tr-title {
    background: #1565c0; color: #fff; font-weight: 700;
    font-size: 13px; padding: 7px 14px; flex-shrink: 0;
    display: flex; align-items: center; gap: 8px;
  }
  .tr-actionbar {
    background: #dce8f5; border-bottom: 1px solid #b0c4de;
    padding: 5px 10px; display: flex; align-items: center;
    justify-content: space-between; flex-shrink: 0; gap: 8px;
  }
  .tr-activity { font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap; }
  .tr-form {
    padding: 10px 14px 8px; border: 1px solid #c8d8ee;
    margin: 8px; border-radius: 2px; background: #fff;
  }
  .tr-form.modify-mode {
    border-color: #f57c00;
    background: #fffde7;
  }
  .tr-row { display: flex; align-items: center; margin-bottom: 6px; width: 100%; }
  .tr-label {
    width: 150px; flex-shrink: 0; font-size: 12px; color: #222;
    white-space: nowrap; padding-right: 8px;
  }
  .tr-label .req { color: #d32f2f; }
  .tr-fields { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
  .tr-input, .tr-select {
    height: 26px; border: 1px solid #b0bec5; border-radius: 2px;
    padding: 0 7px; font-size: 12px; color: #333;
    background: #fff; outline: none; font-family: inherit;
  }
  .tr-input:focus, .tr-select:focus { border-color: #1565c0; }
  .tr-input.shaded  { background: #edf3fb; }
  .tr-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
  .tr-input.pay-readonly { background: #fce8e8; color: #555; cursor: default; }
  .tr-input.auto-calc { background: #e0f2f1; color: #00695c; font-weight: 600; cursor: default; border-color: #80cbc4; }
  /* GL validation states */
  .tr-input.gl-valid   { border-color: #2e7d32; background: #f1f8e9; }
  .tr-input.gl-invalid { border-color: #c62828; background: #ffebee; }
  .tr-input.gl-loading { border-color: #f57c00; background: #fff8e1; }

  .tr-select-w { width: 110px; flex-shrink: 0; }
  .tr-w70  { width: 70px;  flex-shrink: 0; }
  .tr-w90  { width: 90px;  flex-shrink: 0; }
  .tr-w110 { width: 110px; flex-shrink: 0; }
  .tr-w130 { width: 130px; flex-shrink: 0; }
  .tr-w160 { width: 160px; flex-shrink: 0; }
  .tr-w200 { width: 200px; flex-shrink: 0; }
  .tr-grow { flex: 1; min-width: 0; }
  .tr-inline-lbl { font-size: 12px; color: #222; white-space: nowrap; flex-shrink: 0; padding: 0 4px; }
  .tr-divider { border: none; border-top: 1px solid #d0dcea; margin: 6px 0; }
  .tr-sec-hdr {
    color: #1565c0; font-weight: 700; font-size: 11.5px;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;
  }
  .tr-btnbar {
    background: #dce8f5; border-top: 1px solid #b0c4de;
    padding: 8px; display: flex; gap: 6px; justify-content: center; flex-shrink: 0;
  }
  .tr-btn {
    padding: 5px 22px; font-size: 12.5px; font-weight: 600;
    border-radius: 3px; border: none; cursor: pointer; font-family: inherit;
    transition: opacity 0.15s;
  }
  .tr-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .tr-btn-blue  { background: #1565c0; color: #fff; }
  .tr-btn-blue:hover:not(:disabled)  { background: #0d47a1; }
  .tr-btn-green { background: #2e7d32; color: #fff; }
  .tr-btn-green:hover:not(:disabled) { background: #1b5e20; }
  .tr-btn-grey  { background: #d0d8e4; color: #333; }
  .tr-btn-grey:hover:not(:disabled)  { background: #b8c4d4; }
  .tr-btn-red   { background: #e53935; color: #fff; }
  .tr-btn-red:hover:not(:disabled)   { background: #b71c1c; }
  .tr-btn-orange { background: #e65100; color: #fff; }
  .tr-btn-orange:hover:not(:disabled) { background: #bf360c; }

  .tr-tbl-wrap { margin: 0 8px 8px; border: 1px solid #b0c4de; border-radius: 2px; overflow: hidden; }
  .tr-tbl-hdr {
    background: #dce8f5; border-bottom: 1px solid #b0c4de;
    padding: 5px 10px; font-size: 11.5px; font-weight: 700;
    color: #1a3a6b; text-transform: uppercase; letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 8px;
  }
  .tr-tbl-badge { background: #b0c4de; color: #1a3a6b; font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 8px; }
  table.tr-tbl { width: 100%; border-collapse: collapse; font-size: 12px; }
  table.tr-tbl thead tr { background: #1565c0; }
  table.tr-tbl thead th {
    padding: 6px 12px; text-align: left; color: #fff;
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; white-space: nowrap;
  }
  table.tr-tbl tbody tr { border-bottom: 1px solid #eef1f8; transition: background 0.12s; }
  table.tr-tbl tbody tr:nth-child(even) { background: #f3f6fb; }
  table.tr-tbl tbody tr:nth-child(odd)  { background: #fff; }
  table.tr-tbl tbody tr:hover           { background: #eaf1fb !important; }
  table.tr-tbl tbody tr.tr-row-active   { background: #fff9c4 !important; }
  table.tr-tbl tbody td { padding: 6px 12px; color: #222; }
  table.tr-tbl tbody td.mono { font-family: monospace; font-weight: 700; color: #1565c0; }

  .tr-expand-btn {
    width: 22px; height: 22px; border-radius: 50%;
    background: #e3f2fd; color: #1565c0;
    border: 1px solid #90caf9; font-weight: 700;
    font-size: 15px; cursor: pointer; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s, transform 0.15s;
    padding: 0;
  }
  .tr-expand-btn:hover { background: #1565c0; color: #fff; transform: scale(1.1); }
  .tr-expand-btn.active { background: #2e7d32; color: #fff; border-color: #1b5e20; }

  .tr-pagination {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 10px; background: #dce8f5; border-top: 1px solid #b0c4de;
    font-size: 11px; color: #555;
  }
  .tr-pg-btns { display: flex; gap: 3px; }
  .tr-pg-btn {
    min-width: 24px; height: 24px; padding: 0 5px;
    border: 1px solid #90aac8; border-radius: 3px;
    background: #eaf1fb; color: #1a3a6b; font-size: 11px; font-weight: 600;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
  }
  .tr-pg-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .tr-pg-btn.active { background: #1565c0; color: #fff; border-color: #0d47a1; }
  .tr-pg-btn:hover:not(:disabled):not(.active) { background: #c8d8ee; }

  .tr-srch-wrap { position: relative; flex: 1; min-width: 0; }
  .tr-srch-wrap .tr-input { width: 100%; padding-right: 22px; }
  .tr-srch-ic { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); font-size: 11px; color: #888; pointer-events: none; }

  .tr-mode-badge {
    display: inline-block; font-size: 10px; font-weight: 700;
    padding: 2px 8px; border-radius: 2px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .tr-mode-badge.create { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
  .tr-mode-badge.modify { background: #fff3e0; color: #e65100; border: 1px solid #ffcc80; }

  .tr-due-hint {
    font-size: 10px; color: #00695c; font-weight: 600;
    background: #e0f2f1; border: 1px solid #80cbc4;
    border-radius: 10px; padding: 1px 8px; margin-left: 4px; white-space: nowrap;
  }

  /* Toast notification */
  .tr-toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    padding: 10px 24px; border-radius: 4px; font-size: 13px; font-weight: 600;
    color: #fff; z-index: 9999; box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    animation: tr-fadein 0.2s ease;
  }
  .tr-toast.success { background: #2e7d32; }
  .tr-toast.error   { background: #c62828; }
  .tr-toast.info    { background: #1565c0; }
  @keyframes tr-fadein { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* GL error message */
  .tr-gl-err { font-size: 10.5px; color: #c62828; margin-left: 4px; font-style: italic; }

  /* Loading spinner */
  .tr-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid #b0c4de; border-top-color: #1565c0; border-radius: 50%; animation: tr-spin 0.6s linear infinite; margin-left: 6px; vertical-align: middle; }
  @keyframes tr-spin { to { transform: rotate(360deg); } }

  .tr-empty-row td { text-align: center; color: #888; padding: 18px; font-style: italic; }

  /* Modify mode banner */
  .tr-modify-banner {
    margin: 0 8px 0; padding: 5px 10px;
    background: #fff3e0; border: 1px solid #ffcc80; border-bottom: none;
    border-radius: 2px 2px 0 0;
    font-size: 11.5px; font-weight: 600; color: #e65100;
    display: flex; align-items: center; gap: 6px;
  }
`;

// ── Sub-components ───────────────────────────────────────────────────────────
function Row({ label, required, children }) {
    return (
        <div className="tr-row">
            <div className="tr-label">
                {label}{required && <span className="req"> *</span>}
            </div>
            <div className="tr-fields">{children}</div>
        </div>
    );
}

function Toast({ toast }) {
    if (!toast) return null;
    return <div className={`tr-toast ${toast.type}`}>{toast.msg}</div>;
}

// ── Initial form state ───────────────────────────────────────────────────────
const EMPTY_FORM = {
    productCode: '', productName: '',
    accountNo: '', customerName: '', custNo: '',
    asOfDate: new Date().toLocaleDateString('en-CA'),
    interestPayout: '',
    depositAmount: '', period: '', periodUnit: 'Months',
    interestRate: '', interestAmount: '', maturityAmount: '', dueDate: '',
    paymentMode: '',
    paymentNaration: '', paymentAmount: '',
    payProductCode: '', payProductName: '',
    payAccNo: '', payCustName: '', payBalance: '',
    instrumentNo: '', instrumentDate: new Date().toLocaleDateString('en-CA'),
};

const NARATION_DEFAULTS = {
    Cash: 'By Cash', Transfer: 'By TRF', Cheque: 'TRANSFER', PO: '',
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function TermDepositReceipt({ onNavigate }) {
    const [form,          setForm]          = useState(EMPTY_FORM);
    const [editingId,     setEditingId]     = useState(null); // null = Create, number = Modify
    const [page,          setPage]          = useState(1);
    const [gridData,      setGridData]      = useState([]);
    const [gridLoading,   setGridLoading]   = useState(false);
    const [submitting,    setSubmitting]    = useState(false);
    const [toast,         setToast]         = useState(null);
    const [glStatus,      setGlStatus]      = useState('idle'); // idle | loading | valid | invalid
    const [glError,       setGlError]       = useState('');
    const [glProductName, setGlProductName] = useState('');

    const totalPages = Math.ceil(gridData.length / PAGE_SIZE);
    const pagedRows  = gridData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // ── Toast helper ─────────────────────────────────────────────────────────
    const showToast = (msg, type = 'success', ms = 3500) => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), ms);
    };

    // ── Load grid on mount ───────────────────────────────────────────────────
    const loadGrid = useCallback(async () => {
        setGridLoading(true);
        try {
            const data = await fetchTermDeposits(BRCD);
            setGridData(data);
            setPage(1);
        } catch (err) {
            showToast(`Failed to load records: ${err.message}`, 'error');
        } finally {
            setGridLoading(false);
        }
    }, []);

    useEffect(() => { loadGrid(); }, [loadGrid]);

    // ── Auto-calculate Due Date (only in Create mode) ────────────────────────
    useEffect(() => {
        if (editingId) return; // don't auto-recalc when modifying
        const due = calcDueDate(form.asOfDate, form.period, form.periodUnit);
        setForm(f => ({ ...f, dueDate: due }));
    }, [form.asOfDate, form.period, form.periodUnit, editingId]);

    // ── Field setter ─────────────────────────────────────────────────────────
    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    // ── GL Code blur — validate against GLMAST ───────────────────────────────
    const handleGLBlur = async () => {
        const code = form.productCode.trim();
        if (!code) { setGlStatus('idle'); setGlError(''); setGlProductName(''); return; }

        setGlStatus('loading');
        setGlError('');
        setGlProductName('');

        const result = await validateGLCode(code);

        if (result.valid && result.data?.length > 0) {
            setGlStatus('valid');
            const glName = result.data[0]?.GLNAME || result.data[0]?.glname || '';
            setGlProductName(glName);
            setForm(f => ({ ...f, productName: glName }));
        } else {
            setGlStatus('invalid');
            setGlError(result.message || `GL Code ${code} is not valid (GLGROUP ≠ INV).`);
            setForm(f => ({ ...f, productName: '' }));
        }
    };

    // ── Payment mode change ──────────────────────────────────────────────────
    const handlePaymentModeChange = (e) => {
        const val = e.target.value;
        setForm(f => ({
            ...f,
            paymentMode: val,
            paymentNaration: NARATION_DEFAULTS[val] ?? '',
            paymentAmount: '', payProductCode: '', payProductName: '',
            payAccNo: '', payCustName: '', payBalance: '',
            instrumentNo: '', instrumentDate: new Date().toLocaleDateString('en-CA'),
        }));
    };

    // ── Clear / Cancel ───────────────────────────────────────────────────────
    const handleClear = () => {
        setForm(EMPTY_FORM);
        setGlStatus('idle');
        setGlError('');
        setGlProductName('');
        setEditingId(null);
    };

    // ── Row expand: clicking + fills form in Modify mode ────────────────────
    const handleRowExpand = (row) => {
        // Toggle off if clicking the same row
        if (editingId === row.ID) {
            handleClear();
            return;
        }

        setEditingId(row.ID);
        setGlStatus('valid');
        setGlError('');
        setGlProductName(row.BankName || '');

        setForm({
            ...EMPTY_FORM,
            productCode:     String(row.SubGlCode   || ''),
            productName:     row.BankName            || '',
            accountNo:       String(row.CustAccNo    || ''),
            customerName:    '',
            custNo:          String(row.CustNo       || ''),
            asOfDate:        row.OpeningDate
                               ? new Date(row.OpeningDate).toLocaleDateString('en-CA')
                               : new Date().toLocaleDateString('en-CA'),
            interestPayout:  INTEREST_PAYOUT_REVERSE[row.IntPayOut] || '',
            depositAmount:   String(row.PrincipleAmt  || ''),
            period:          String(row.Period         || ''),
            periodUnit:      row.PeriodType === 'D' ? 'Days' : 'Months',
            interestRate:    String(row.RateOfInt      || ''),
            interestAmount:  String(row.InterestAmt    || ''),
            maturityAmount:  String(row.MaturityAmt    || ''),
            dueDate:         row.DueDate
                               ? new Date(row.DueDate).toLocaleDateString('en-CA')
                               : '',
            paymentMode:     '',
            paymentNaration: '',
            paymentAmount:   '',
            payProductCode:  '',
            payProductName:  '',
            payAccNo:        '',
            payCustName:     '',
            payBalance:      '',
            instrumentNo:    '',
            instrumentDate:  new Date().toLocaleDateString('en-CA'),
        });

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Submit (Create) ──────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (glStatus === 'invalid') {
            showToast('Invalid Product Code. Please enter a valid GL Code first.', 'error');
            return;
        }
        if (glStatus === 'idle' && form.productCode) {
            showToast('Please tab out of Product Code field to validate it.', 'info');
            return;
        }

        const required = {
            'Product Code':    form.productCode,
            'Account No':      form.accountNo,
            'Interest Payout': form.interestPayout,
            'Deposit Amount':  form.depositAmount,
            'Period':          form.period,
            'Interest Rate':   form.interestRate,
            'Interest Amount': form.interestAmount,
            'Maturity Amount': form.maturityAmount,
            'Payment Mode':    form.paymentMode,
        };
        const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
        if (missing.length) {
            showToast(`Required: ${missing.join(', ')}`, 'error', 5000);
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                brcd:         BRCD,
                custNo:       form.custNo       || form.accountNo,
                custAccNo:    Number(form.accountNo),
                glCode:       Number(form.productCode),
                subGlCode:    form.productCode,
                period:       Number(form.period),
                periodType:   form.periodUnit === 'Days' ? 'D' : 'M',
                rateOfInt:    Number(form.interestRate),
                principleAmt: Number(form.depositAmount),
                interestAmt:  Number(form.interestAmount),
                maturityAmt:  Number(form.maturityAmount),
                intPayOut:    INTEREST_PAYOUT_MAP[form.interestPayout] ?? 4,
                openingDate:  form.asOfDate,
                dueDate:      form.dueDate,
                entryDate:    form.asOfDate,
                paymentMode:  form.paymentMode,
                intTrfSubGl:  form.payProductCode  || '',
                prinTrfSubGl: form.payProductCode  || '',
                intTrfAccNo:  form.payAccNo        || null,
                prinTrfAccNo: form.payAccNo        || null,
            };

            const result = await createTermDeposit(payload);
            showToast(
                `✅ Term Deposit created! Receipt ID: ${result.depositId} | Set No: ${result.setNo}`,
                'success',
                5000
            );
            handleClear();
            await loadGrid();
        } catch (err) {
            showToast(err.message, 'error', 6000);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Modify (Update) ──────────────────────────────────────────────────────
    const handleModify = async () => {
        if (!editingId) return;

        const required = {
            'Interest Payout': form.interestPayout,
            'Deposit Amount':  form.depositAmount,
            'Period':          form.period,
            'Interest Rate':   form.interestRate,
            'Interest Amount': form.interestAmount,
            'Maturity Amount': form.maturityAmount,
        };
        const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
        if (missing.length) {
            showToast(`Required: ${missing.join(', ')}`, 'error', 5000);
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                period:       Number(form.period),
                periodUnit:   form.periodUnit,
                rateOfInt:    Number(form.interestRate),
                principleAmt: Number(form.depositAmount),
                interestAmt:  Number(form.interestAmount),
                maturityAmt:  Number(form.maturityAmount),
                intPayOut:    INTEREST_PAYOUT_MAP[form.interestPayout] ?? 4,
                dueDate:      form.dueDate,
                intTrfSubGl:  form.payProductCode || '',
                prinTrfSubGl: form.payProductCode || '',
                intTrfAccNo:  form.payAccNo       || null,
                prinTrfAccNo: form.payAccNo       || null,
            };

            await updateTermDeposit(editingId, payload);
            showToast('✅ Term Deposit updated successfully!', 'success', 4000);
            handleClear();
            await loadGrid();
        } catch (err) {
            showToast(err.message, 'error', 6000);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Derived ──────────────────────────────────────────────────────────────
    const pm             = form.paymentMode;
    const dueDateDisplay = fmtDisplayDate(form.dueDate);
    const showDueHint    = form.dueDate && form.period && form.asOfDate;
    const isModifyMode   = editingId !== null;

    const glInputClass = `tr-input tr-w90${
        glStatus === 'valid'   ? ' gl-valid'   :
        glStatus === 'invalid' ? ' gl-invalid' :
        glStatus === 'loading' ? ' gl-loading' : ''
    }`;

    return (
        <>
            <style>{css}</style>
            <Toast toast={toast} />
            <div className="tr-wrap">

                {/* Title */}
                <div className="tr-title">
                    Investment Receipt
                    <span className={`tr-mode-badge ${isModifyMode ? 'modify' : 'create'}`}>
                        {isModifyMode ? `✏️ Modify — ID #${editingId}` : '+ Create Mode'}
                    </span>
                </div>

                {/* Action bar */}
                <div className="tr-actionbar">
                    <div className="tr-activity">
                        Term Deposit — {isModifyMode ? 'Modify Record' : 'Create & Review'}
                    </div>
                    <div style={{ fontSize: 11, color: '#555' }}>
                        {isModifyMode
                            ? `Editing record ID #${editingId}. Click "Cancel Edit" to go back to Create mode.`
                            : 'Records saved via Submit appear in the grid below.'}
                    </div>
                </div>

                {/* Modify mode banner */}
                {isModifyMode && (
                    <div className="tr-modify-banner">
                        ✏️ You are modifying Term Deposit record &nbsp;<strong>ID #{editingId}</strong>.
                        &nbsp;Make your changes and click <strong>Modify</strong> to save.
                    </div>
                )}

                {/* Form */}
                <div className={`tr-form${isModifyMode ? ' modify-mode' : ''}`}>

                    <div className="tr-sec-hdr">Account Information</div>

                    <Row label="Product Code" required>
                        <input
                            className={glInputClass}
                            placeholder="e.g. 56015"
                            value={form.productCode}
                            onChange={(e) => {
                                if (isModifyMode) return; // lock in modify mode
                                setForm(f => ({ ...f, productCode: e.target.value, productName: '' }));
                                setGlStatus('idle');
                                setGlError('');
                            }}
                            onBlur={!isModifyMode ? handleGLBlur : undefined}
                            readOnly={isModifyMode}
                        />
                        {glStatus === 'loading' && <span className="tr-spinner" />}
                        {glStatus === 'valid'   && <span style={{ color: '#2e7d32', fontSize: 13 }}>✓</span>}
                        {glStatus === 'invalid' && <span className="tr-gl-err">{glError}</span>}
                        <div className="tr-srch-wrap" style={{ marginLeft: 6 }}>
                            <input
                                className="tr-input"
                                placeholder="Product Name (auto-filled on valid GL)"
                                value={form.productName}
                                onChange={set('productName')}
                                style={{ width: '100%', paddingRight: 22 }}
                                readOnly={glStatus === 'valid' || isModifyMode}
                            />
                            <span className="tr-srch-ic">🔍</span>
                        </div>
                    </Row>

                    <Row label="Account No" required>
                        <input
                            className="tr-input tr-w110"
                            placeholder="Account No"
                            value={form.accountNo}
                            onChange={!isModifyMode ? set('accountNo') : undefined}
                            readOnly={isModifyMode}
                        />
                        <div className="tr-srch-wrap">
                            <input
                                className="tr-input"
                                placeholder="Search Customer Name"
                                value={form.customerName}
                                onChange={set('customerName')}
                                style={{ width: '100%', paddingRight: 22 }}
                            />
                            <span className="tr-srch-ic">🔍</span>
                        </div>
                    </Row>

                    <Row label="As Of Date" required>
                        <input
                            className="tr-input tr-w130"
                            type="date"
                            value={form.asOfDate}
                            onChange={!isModifyMode ? set('asOfDate') : undefined}
                            readOnly={isModifyMode}
                        />
                        <span className="tr-inline-lbl">
                            Interest Payout <span style={{ color: '#d32f2f' }}>*</span>
                        </span>
                        <select
                            className="tr-select tr-w130"
                            value={form.interestPayout}
                            onChange={set('interestPayout')}
                        >
                            <option value="">-- Select --</option>
                            <option>YEARLY</option>
                            <option>HALF YEARLY</option>
                            <option>MONTHLY</option>
                            <option>ON MATURITY</option>
                            <option>QUATERLY</option>
                        </select>
                    </Row>

                    <hr className="tr-divider" />
                    <div className="tr-sec-hdr">Deposit Details</div>

                    <Row label="Deposit Amount (₹)" required>
                        <input
                            className="tr-input tr-w130"
                            placeholder="0.00"
                            value={form.depositAmount}
                            onChange={set('depositAmount')}
                        />
                        <span className="tr-inline-lbl">
                            Period <span style={{ color: '#d32f2f' }}>*</span>
                        </span>
                        <select
                            className="tr-select tr-select-w"
                            value={form.periodUnit}
                            onChange={set('periodUnit')}
                        >
                            <option>Days</option>
                            <option>Months</option>
                        </select>
                        <input
                            className="tr-input tr-w90"
                            placeholder="Value"
                            value={form.period}
                            onChange={set('period')}
                            type="number"
                            min="1"
                        />
                        <span className="tr-inline-lbl">
                            Interest Rate (%) <span style={{ color: '#d32f2f' }}>*</span>
                        </span>
                        <input
                            className="tr-input tr-w90"
                            placeholder="0.00"
                            value={form.interestRate}
                            onChange={set('interestRate')}
                        />
                    </Row>

                    <Row label="Interest Amount (₹)" required>
                        <input
                            className="tr-input tr-w130"
                            placeholder="0.00"
                            value={form.interestAmount}
                            onChange={set('interestAmount')}
                        />
                        <span className="tr-inline-lbl">
                            Maturity Amount (₹) <span style={{ color: '#d32f2f' }}>*</span>
                        </span>
                        <input
                            className="tr-input tr-w130"
                            placeholder="0.00"
                            value={form.maturityAmount}
                            onChange={set('maturityAmount')}
                        />
                        <span className="tr-inline-lbl">
                            Due Date <span style={{ color: '#d32f2f' }}>*</span>
                        </span>
                        <input
                            className={`tr-input tr-grow${!isModifyMode ? ' auto-calc' : ''}`}
                            type="date"
                            value={form.dueDate}
                            readOnly={!isModifyMode}
                            onChange={isModifyMode ? set('dueDate') : undefined}
                            title={form.dueDate
                                ? (isModifyMode
                                    ? 'Edit due date manually in Modify mode'
                                    : `Auto-calculated: ${form.asOfDate} + ${form.period} ${form.periodUnit} = ${dueDateDisplay}`)
                                : 'Fill As Of Date and Period to auto-calculate'}
                        />
                        {showDueHint && !isModifyMode && (
                            <span className="tr-due-hint" title="Auto-calculated">📅 {dueDateDisplay}</span>
                        )}
                        {showDueHint && isModifyMode && (
                            <span className="tr-due-hint" style={{ background: '#fff3e0', borderColor: '#ffcc80', color: '#e65100' }}>
                                📅 {dueDateDisplay}
                            </span>
                        )}
                    </Row>

                    <hr className="tr-divider" />
                    <div className="tr-sec-hdr">Payment</div>

                    <Row label="Payment Mode" required={!isModifyMode}>
                        <select
                            className="tr-select tr-w160"
                            value={form.paymentMode}
                            onChange={handlePaymentModeChange}
                            disabled={isModifyMode}
                        >
                            <option value="">-- Select --</option>
                            <option value="Cash">Cash</option>
                            <option value="PO">PO</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Transfer">Transfer</option>
                            <option value="NEFT">NEFT</option>
                            <option value="RTGS">RTGS</option>
                        </select>
                        {isModifyMode && (
                            <span style={{ fontSize: 11, color: '#888', fontStyle: 'italic', marginLeft: 6 }}>
                                Payment mode cannot be changed after creation.
                            </span>
                        )}
                    </Row>

                    {pm === 'Cash' && (
                        <Row label="Naration" required>
                            <input className="tr-input tr-w200" value={form.paymentNaration} onChange={set('paymentNaration')} />
                            <span className="tr-inline-lbl">Amount <span style={{ color: '#d32f2f' }}>*</span></span>
                            <input className="tr-input tr-w130 pay-readonly" placeholder="0" value={form.paymentAmount} onChange={set('paymentAmount')} />
                        </Row>
                    )}

                    {(pm === 'Transfer' || pm === 'NEFT' || pm === 'RTGS') && (
                        <>
                            <Row label="Product Code" required>
                                <input className="tr-input tr-w110" placeholder="Product Code" value={form.payProductCode} onChange={set('payProductCode')} />
                                <div className="tr-srch-wrap">
                                    <input className="tr-input" placeholder="Search Product Name" value={form.payProductName} onChange={set('payProductName')} style={{ width: '100%', paddingRight: 22 }} />
                                    <span className="tr-srch-ic">🔍</span>
                                </div>
                            </Row>
                            <Row label="Acc No / Name" required>
                                <input className="tr-input tr-w110" placeholder="Account Number" value={form.payAccNo} onChange={set('payAccNo')} />
                                <div className="tr-srch-wrap">
                                    <input className="tr-input" placeholder="Search Customer Name" value={form.payCustName} onChange={set('payCustName')} style={{ width: '100%', paddingRight: 22 }} />
                                    <span className="tr-srch-ic">🔍</span>
                                </div>
                                <span className="tr-inline-lbl">Balance <span style={{ color: '#d32f2f' }}>*</span></span>
                                <input className="tr-input tr-w110" placeholder="Balance" value={form.payBalance} readOnly />
                            </Row>
                            <Row label="Naration" required>
                                <input className="tr-input tr-w200" value={form.paymentNaration} onChange={set('paymentNaration')} />
                                <span className="tr-inline-lbl">Amount <span style={{ color: '#d32f2f' }}>*</span></span>
                                <input className="tr-input tr-w130 pay-readonly" placeholder="0" value={form.paymentAmount} onChange={set('paymentAmount')} />
                            </Row>
                        </>
                    )}

                    {pm === 'Cheque' && (
                        <>
                            <Row label="Product Code" required>
                                <input className="tr-input tr-w110" placeholder="Product Code" value={form.payProductCode} onChange={set('payProductCode')} />
                                <div className="tr-srch-wrap">
                                    <input className="tr-input" placeholder="Search Product Name" value={form.payProductName} onChange={set('payProductName')} style={{ width: '100%', paddingRight: 22 }} />
                                    <span className="tr-srch-ic">🔍</span>
                                </div>
                            </Row>
                            <Row label="Acc No / Name" required>
                                <input className="tr-input tr-w110" placeholder="Account Number" value={form.payAccNo} onChange={set('payAccNo')} />
                                <div className="tr-srch-wrap">
                                    <input className="tr-input" placeholder="Search Customer Name" value={form.payCustName} onChange={set('payCustName')} style={{ width: '100%', paddingRight: 22 }} />
                                    <span className="tr-srch-ic">🔍</span>
                                </div>
                                <span className="tr-inline-lbl">Balance <span style={{ color: '#d32f2f' }}>*</span></span>
                                <input className="tr-input tr-w110" placeholder="Balance" value={form.payBalance} readOnly />
                            </Row>
                            <Row label="Instrument No" required>
                                <input className="tr-input tr-w160" placeholder="CHEQUE NUMBER" value={form.instrumentNo} onChange={set('instrumentNo')} />
                                <span className="tr-inline-lbl">Instrument Date <span style={{ color: '#d32f2f' }}>*</span></span>
                                <input className="tr-input tr-grow" type="date" value={form.instrumentDate} onChange={set('instrumentDate')} />
                            </Row>
                            <Row label="Naration" required>
                                <input className="tr-input tr-w200" value={form.paymentNaration} onChange={set('paymentNaration')} />
                                <span className="tr-inline-lbl">Amount <span style={{ color: '#d32f2f' }}>*</span></span>
                                <input className="tr-input tr-w130 pay-readonly" placeholder="0" value={form.paymentAmount} onChange={set('paymentAmount')} />
                            </Row>
                        </>
                    )}

                </div>

                {/* Bottom Buttons */}
                <div className="tr-btnbar">
                    {isModifyMode ? (
                        <button
                            className="tr-btn tr-btn-orange"
                            onClick={handleModify}
                            disabled={submitting}
                        >
                            {submitting ? '⏳ Updating…' : '✏️ Modify'}
                        </button>
                    ) : (
                        <button
                            className="tr-btn tr-btn-blue"
                            onClick={handleSubmit}
                            disabled={submitting || glStatus === 'loading' || glStatus === 'invalid'}
                        >
                            {submitting ? '⏳ Submitting…' : 'Submit'}
                        </button>
                    )}
                    <button
                        className="tr-btn tr-btn-grey"
                        onClick={handleClear}
                        disabled={submitting}
                    >
                        {isModifyMode ? 'Cancel Edit' : 'Clear All'}
                    </button>
                    <button
                        className="tr-btn tr-btn-red"
                        onClick={() => onNavigate?.('fd_bonds')}
                        disabled={submitting}
                    >
                        Exit
                    </button>
                </div>

                {/* Grid — simplified: + | SubGL Code | A/C No | Bank Name */}
                <div className="tr-tbl-wrap">
                    <div className="tr-tbl-hdr">
                        Term Deposit Records
                        <span className="tr-tbl-badge">{gridData.length} records</span>
                        {gridLoading && <span className="tr-spinner" />}
                        <button
                            style={{
                                marginLeft: 'auto', fontSize: 10, background: '#b0c4de',
                                border: 'none', borderRadius: 3, padding: '2px 8px',
                                cursor: 'pointer', fontWeight: 700, color: '#1a3a6b',
                            }}
                            onClick={loadGrid}
                            disabled={gridLoading}
                            title="Refresh grid"
                        >
                            ↻ Refresh
                        </button>
                    </div>

                    <table className="tr-tbl">
                        <thead>
                            <tr>
                                <th style={{ width: 44, textAlign: 'center' }}></th>
                                <th>SubGL Code</th>
                                <th>A/C No</th>
                                <th>Prooduct Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedRows.length === 0 ? (
                                <tr className="tr-empty-row">
                                    <td colSpan={4}>
                                        {gridLoading
                                            ? 'Loading records…'
                                            : 'No records found. Submit a term deposit to see it here.'}
                                    </td>
                                </tr>
                            ) : (
                                pagedRows.map((row, i) => (
                                    <tr
                                        key={row.ID || i}
                                        className={editingId === row.ID ? 'tr-row-active' : ''}
                                    >
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className={`tr-expand-btn${editingId === row.ID ? ' active' : ''}`}
                                                onClick={() => handleRowExpand(row)}
                                                title={editingId === row.ID
                                                    ? 'Click to deselect and go back to Create mode'
                                                    : 'Load this record into the form for editing'}
                                            >
                                                {editingId === row.ID ? '✓' : '+'}
                                            </button>
                                        </td>
                                        <td className="mono">{row.SubGlCode}</td>
                                        <td>{row.CustAccNo}</td>
                                        <td>
                                            {row.BankName
                                                ? row.BankName
                                                : <span style={{ color: '#aaa', fontStyle: 'italic' }}>—</span>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="tr-pagination">
                            <span>
                                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, gridData.length)} of {gridData.length}
                            </span>
                            <div className="tr-pg-btns">
                                <button
                                    className="tr-pg-btn"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        className={`tr-pg-btn${p === page ? ' active' : ''}`}
                                        onClick={() => setPage(p)}
                                    >{p}</button>
                                ))}
                                <button
                                    className="tr-pg-btn"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                >›</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}