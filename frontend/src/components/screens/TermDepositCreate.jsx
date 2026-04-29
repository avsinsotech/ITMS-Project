
// // // import { useState, useEffect, useRef } from 'react';

// // // const API_BASE = 'http://localhost:8020/api/investment-master';

// // // const EMPTY_FORM = {
// // //   investmentType:   'INV',
// // //   productCode:      '',
// // //   productName:      '',
// // //   acNo:             '1',
// // //   bankName:         '',
// // //   bankCode:         0,
// // //   branchName:       '',
// // //   branchCode:       0,
// // //   accNo:            '',
// // //   receiptNo:        '',
// // //   receiptName:      '',
// // //   boardResNo:       '',
// // //   boardMeetingDate: '',
// // //   openingDate:      '',
// // //   icProdCode:       '',
// // //   icProdName:       '',
// // //   irProdCode:       '',
// // //   irProdName:       '',
// // //   irAccNum:         '1',
// // //   irCustName:       '',
// // // };

// // // const css = `
// // //   .im-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
// // //   .im-wrap {
// // //     font-family: 'Segoe UI', Arial, sans-serif;
// // //     font-size: 12px; color: #222; width: 100%;
// // //     background: #fff; border: 1px solid #b0c4de;
// // //     display: flex; flex-direction: column;
// // //   }
// // //   .im-title {
// // //     background: #1565c0; color: #fff; font-weight: 700;
// // //     font-size: 13px; padding: 7px 14px; flex-shrink: 0;
// // //   }
// // //   .im-actionbar {
// // //     background: #dce8f5; border-bottom: 1px solid #b0c4de;
// // //     padding: 5px 10px; display: flex; align-items: center;
// // //     justify-content: space-between; flex-shrink: 0; gap: 8px;
// // //   }
// // //   .im-actionbar-left { display: flex; gap: 3px; flex-wrap: wrap; }
// // //   .im-activity { font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap; }
// // //   .im-abtn {
// // //     display: inline-flex; align-items: center; gap: 3px;
// // //     padding: 3px 10px; font-size: 11.5px; font-weight: 600;
// // //     border: 1px solid #90aac8; border-radius: 3px;
// // //     background: #eaf1fb; color: #1a3a6b; cursor: pointer; white-space: nowrap;
// // //   }
// // //   .im-abtn:hover { background: #c8d8ee; }
// // //   .im-abtn.active { background: #1565c0; color: #fff; border-color: #0d47a1; }
// // //   .im-form {
// // //     padding: 12px 16px 10px; border: 1px solid #c8d8ee;
// // //     margin: 8px; border-radius: 2px; background: #fff; flex: 1;
// // //   }
// // //   .im-row { display: flex; align-items: center; margin-bottom: 7px; width: 100%; }
// // //   .im-label { width: 150px; flex-shrink: 0; font-size: 12px; color: #222; white-space: nowrap; padding-right: 8px; }
// // //   .im-label .req { color: #d32f2f; }
// // //   .im-fields { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
// // //   .im-input, .im-select {
// // //     height: 26px; border: 1px solid #b0bec5; border-radius: 2px;
// // //     padding: 0 7px; font-size: 12px; color: #333;
// // //     background: #fff; outline: none; font-family: inherit;
// // //   }
// // //   .im-input:focus, .im-select:focus { border-color: #1565c0; }
// // //   .im-input.shaded { background: #edf3fb; }
// // //   .im-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
// // //   .im-select-full { flex: 1; min-width: 0; }
// // //   .im-w70  { width: 70px;  flex-shrink: 0; }
// // //   .im-w90  { width: 90px;  flex-shrink: 0; }
// // //   .im-w110 { width: 110px; flex-shrink: 0; }
// // //   .im-w130 { width: 130px; flex-shrink: 0; }
// // //   .im-grow { flex: 1; min-width: 0; }
// // //   .im-srch { position: relative; display: inline-flex; align-items: center; flex: 1; min-width: 0; }
// // //   .im-srch .im-input { width: 100%; padding-right: 22px; }
// // //   .im-srch-ic { position: absolute; right: 6px; font-size: 11px; color: #888; pointer-events: none; }
// // //   .im-inline-lbl { font-size: 12px; color: #222; white-space: nowrap; flex-shrink: 0; padding: 0 4px; }
// // //   .im-divider { border: none; border-top: 1px solid #d0dcea; margin: 8px 0; }
// // //   .im-gl-hdr {
// // //     color: #1565c0; font-weight: 700; font-size: 11.5px;
// // //     text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;
// // //   }
// // //   .im-btnbar {
// // //     background: #dce8f5; border-top: 1px solid #b0c4de;
// // //     padding: 8px; display: flex; gap: 6px; justify-content: center; flex-shrink: 0;
// // //   }
// // //   .im-btn {
// // //     padding: 5px 22px; font-size: 12.5px; font-weight: 600;
// // //     border-radius: 3px; border: none; cursor: pointer; font-family: inherit;
// // //   }
// // //   .im-btn-blue { background: #1565c0; color: #fff; }
// // //   .im-btn-blue:hover { background: #0d47a1; }
// // //   .im-btn-grey { background: #d0d8e4; color: #333; }
// // //   .im-btn-grey:hover { background: #b8c4d4; }
// // //   .im-btn-red  { background: #e53935; color: #fff; }
// // //   .im-btn-red:hover { background: #b71c1c; }
// // //   .im-btn:disabled { opacity: 0.6; cursor: not-allowed; }
// // //   .im-dropdown {
// // //     position: absolute; top: 100%; left: 0; right: 0; z-index: 999;
// // //     background: #fff; border: 1px solid #90aac8; border-top: none;
// // //     max-height: 160px; overflow-y: auto;
// // //     box-shadow: 0 4px 8px rgba(0,0,0,0.12);
// // //   }
// // //   .im-dd-item {
// // //     padding: 5px 8px; font-size: 11.5px; cursor: pointer; color: #222;
// // //     border-bottom: 1px solid #eef2f7;
// // //   }
// // //   .im-dd-item:hover { background: #e8f0fb; }
// // //   .im-dd-empty { padding: 6px 8px; font-size: 11px; color: #888; }
// // //   .im-status {
// // //     font-size: 11px; padding: 4px 8px; margin: 0 8px 4px;
// // //     border-radius: 3px; text-align: center;
// // //   }
// // //   .im-status.error   { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }
// // //   .im-status.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
// // //   .im-status.loading { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }
// // //   .im-fetching { font-size: 11px; color: #1565c0; font-style: italic; padding: 0 4px; }
// // // `;

// // // // ── Sub-components ──────────────────────────────────────────────────────────

// // // function Row({ label, required, hidden, children }) {
// // //   if (hidden) return null;
// // //   return (
// // //     <div className="im-row">
// // //       <div className="im-label">
// // //         {label}{required && <span className="req"> *</span>}
// // //       </div>
// // //       <div className="im-fields">{children}</div>
// // //     </div>
// // //   );
// // // }

// // // function GLSearchInput({ value, onChange, onSelect, placeholder }) {
// // //   const [results, setResults] = useState([]);
// // //   const [open, setOpen]       = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const timerRef = useRef(null);
// // //   const wrapRef  = useRef(null);

// // //   useEffect(() => {
// // //     const handler = (e) => {
// // //       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
// // //     };
// // //     document.addEventListener('mousedown', handler);
// // //     return () => document.removeEventListener('mousedown', handler);
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     const val = e.target.value;
// // //     onChange(val);
// // //     clearTimeout(timerRef.current);
// // //     if (val.trim().length < 1) { setResults([]); setOpen(false); return; }
// // //     timerRef.current = setTimeout(async () => {
// // //       setLoading(true);
// // //       try {
// // //         const res  = await fetch(`${API_BASE}/gl/search-name?name=${encodeURIComponent(val)}`);
// // //         const json = await res.json();
// // //         setResults(json.success ? json.data : []);
// // //         setOpen(true);
// // //       } catch { setResults([]); }
// // //       finally { setLoading(false); }
// // //     }, 300);
// // //   };

// // //   return (
// // //     <div className="im-srch" ref={wrapRef} style={{ position: 'relative' }}>
// // //       <input
// // //         className="im-input"
// // //         style={{ width: '100%', paddingRight: 22 }}
// // //         value={value}
// // //         onChange={handleChange}
// // //         placeholder={placeholder}
// // //       />
// // //       <span className="im-srch-ic">{loading ? '⏳' : '🔍'}</span>
// // //       {open && (
// // //         <div className="im-dropdown">
// // //           {results.length === 0
// // //             ? <div className="im-dd-empty">No results</div>
// // //             : results.map((r, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="im-dd-item"
// // //                 onMouseDown={() => { onSelect(r); setOpen(false); }}
// // //               >
// // //                 <strong>{r.GLCODE}</strong> — {r.GLNAME}
// // //               </div>
// // //             ))
// // //           }
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function GLCodeInput({ value, onChange, onFound, className }) {
// // //   const lookup = async (code) => {
// // //     if (!code) return;
// // //     try {
// // //       const res  = await fetch(`${API_BASE}/gl/search?code=${encodeURIComponent(code)}`);
// // //       const json = await res.json();
// // //       if (json.success && json.data?.length > 0) onFound(json.data[0]);
// // //     } catch {}
// // //   };
// // //   return (
// // //     <input
// // //       className={`im-input shaded ${className || ''}`}
// // //       value={value}
// // //       onChange={(e) => onChange(e.target.value)}
// // //       onBlur={(e)  => lookup(e.target.value)}
// // //       onKeyDown={(e) => e.key === 'Enter' && lookup(value)}
// // //       placeholder="Code"
// // //     />
// // //   );
// // // }

// // // // ── Main Component ──────────────────────────────────────────────────────────

// // // export default function TermDepositCreate({ onNavigate }) {
// // //   const [mode,       setMode]       = useState('add_new');
// // //   const [form,       setForm]       = useState(EMPTY_FORM);
// // //   const [status,     setStatus]     = useState(null);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [fetching,   setFetching]   = useState(false);
// // //   const isNew = mode === 'add_new';

// // //   // ── Add New: auto-fetch GLCODE (MAX+1), fix receipt/acc to 1 (UNCHANGED) ──
// // //   useEffect(() => {
// // //     if (mode !== 'add_new') return;

// // //     setForm(f => ({ ...f, receiptNo: '1', acNo: '1', accNo: '1' }));
// // //     setFetching(true);

// // //     (async () => {
// // //       try {
// // //         const res  = await fetch(`${API_BASE}/defaults?brcd=1`);
// // //         const json = await res.json();
// // //         if (json.success) {
// // //           setForm(f => ({
// // //             ...f,
// // //             productCode: String(json.data.nextGLCode),
// // //             receiptNo:   '1',
// // //             acNo:        '1',
// // //             accNo:       '1',
// // //           }));
// // //         } else {
// // //           setStatus({ type: 'error', msg: 'Failed to fetch next GL Code.' });
// // //         }
// // //       } catch {
// // //         setStatus({ type: 'error', msg: 'Could not reach server to load GL Code.' });
// // //       } finally {
// // //         setFetching(false);
// // //       }
// // //     })();
// // //   }, [mode]);

// // //   // ── Add Existing: fetch GL name + next counters when user enters a GLCODE ──
// // //   const fetchExistingDefaults = async (glCode) => {
// // //     if (!glCode || mode !== 'add_existing') return;
// // //     setFetching(true);
// // //     setStatus(null);
// // //     try {
// // //       const res  = await fetch(`${API_BASE}/existing-defaults?glCode=${encodeURIComponent(glCode)}`);
// // //       const json = await res.json();
// // //       if (json.success) {
// // //         setForm(f => ({
// // //           ...f,
// // //           productCode: String(json.data.glCode),
// // //           productName: json.data.glName,
// // //           receiptNo:   String(json.data.nextReceiptNo),
// // //           accNo:       String(json.data.nextAccNo),
// // //           // ── CHANGED: irAccNum also gets the same DB-driven counter ──
// // //           irAccNum:    String(json.data.nextAccNo),
// // //         }));
// // //       } else {
// // //         setStatus({ type: 'error', msg: json.message || 'GL Code not found.' });
// // //         setForm(f => ({ ...f, productName: '', receiptNo: '', accNo: '', irAccNum: '' }));
// // //       }
// // //     } catch {
// // //       setStatus({ type: 'error', msg: 'Could not reach server.' });
// // //     } finally {
// // //       setFetching(false);
// // //     }
// // //   };

// // //   const switchMode = (m) => { setMode(m); setForm(EMPTY_FORM); setStatus(null); };

// // //   const set  = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
// // //   const setE = (field) => (e)   => set(field)(e.target.value);

// // //   // ── Submit ────────────────────────────────────────────────────────────
// // //   const handleCreate = async () => {
// // //     if (!form.bankName)    return setStatus({ type: 'error', msg: 'Bank Name is required.' });
// // //     if (!form.openingDate) return setStatus({ type: 'error', msg: 'Opening Date is required.' });
// // //     if (!form.icProdCode)  return setStatus({ type: 'error', msg: 'Interest Credit GL Product Code is required.' });
// // //     if (!form.irProdCode)  return setStatus({ type: 'error', msg: 'Interest Receivable GL Product Code is required.' });
// // //     if (!form.irAccNum)    return setStatus({ type: 'error', msg: 'Interest Receivable Account Number is required.' });

// // //     // Add Existing: must have a valid GL code entered
// // //     if (!isNew && !form.productCode)
// // //       return setStatus({ type: 'error', msg: 'Please enter a valid GL Product Code.' });

// // //     setStatus({ type: 'loading', msg: 'Submitting…' });
// // //     setSubmitting(true);

// // //     try {
// // //       const endpoint = isNew
// // //         ? `${API_BASE}/create`
// // //         : `${API_BASE}/create-existing`;

// // //       const payload = isNew
// // //         ? {
// // //             // ── Add New payload (UNCHANGED) ──────────────────────────
// // //             investmentType: form.investmentType,
// // //             productCode:    form.productCode,
// // //             productName:    form.productName,
// // //             bankName:       form.bankName,
// // //             bankCode:       form.bankCode  || 0,
// // //             branchName:     form.branchName,
// // //             branchCode:     form.branchCode || 0,
// // //             receiptName:    form.receiptName,
// // //             boardResNo:     form.boardResNo      || null,
// // //             boardMeetDate:  form.boardMeetingDate || null,
// // //             openingDate:    form.openingDate,
// // //             icProdCode:     form.icProdCode,
// // //             icProdName:     form.icProdName,
// // //             irProdCode:     form.irProdCode,
// // //             irProdName:     form.irProdName,
// // //             irAccNum:       form.irAccNum,
// // //             irCustName:     form.irCustName,
// // //             brcd:           1,
// // //           }
// // //         : {
// // //             // ── Add Existing payload ─────────────────────────────────
// // //             glCode:         form.productCode,
// // //             investmentType: form.investmentType,
// // //             productName:    form.productName,
// // //             bankName:       form.bankName,
// // //             bankCode:       form.bankCode  || 0,
// // //             branchName:     form.branchName,
// // //             branchCode:     form.branchCode || 0,
// // //             receiptName:    form.receiptName,
// // //             boardResNo:     form.boardResNo      || null,
// // //             boardMeetDate:  form.boardMeetingDate || null,
// // //             openingDate:    form.openingDate,
// // //             icProdCode:     form.icProdCode,
// // //             icProdName:     form.icProdName,
// // //             irProdCode:     form.irProdCode,
// // //             irProdName:     form.irProdName,
// // //             irAccNum:       form.irAccNum,   // now carries the DB-driven accNo value
// // //             irCustName:     form.irCustName,
// // //             brcd:           1,
// // //           };

// // //       const res  = await fetch(endpoint, {
// // //         method:  'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body:    JSON.stringify(payload),
// // //       });
// // //       const json = await res.json();

// // //       if (json.success) {
// // //         const d = json.data;
// // //         setStatus({
// // //           type: 'success',
// // //           msg:  `✅ ${d.message} | GL: ${d.glCode} | Receipt: ${d.receiptNo} | Acc: ${d.custAccno}`,
// // //         });
// // //         setMode(mode);
// // //         setForm({ ...EMPTY_FORM });
// // //       } else {
// // //         setStatus({ type: 'error', msg: json.message || 'Operation failed.' });
// // //       }
// // //     } catch (err) {
// // //       setStatus({ type: 'error', msg: `Network error: ${err.message}` });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   // ── Render ────────────────────────────────────────────────────────────
// // //   return (
// // //     <>
// // //       <style>{css}</style>
// // //       <div className="im-wrap">

// // //         {/* Title */}
// // //         <div className="im-title">Investment Master</div>

// // //         {/* Action bar */}
// // //         <div className="im-actionbar">
// // //           <div className="im-actionbar-left">
// // //             {[
// // //               { label: '★ Add New',      m: 'add_new'      },
// // //               { label: '★ Add Existing', m: 'add_existing' },
// // //             ].map(({ label, m }) => (
// // //               <button
// // //                 key={m}
// // //                 className={`im-abtn${mode === m ? ' active' : ''}`}
// // //                 onClick={() => switchMode(m)}
// // //               >
// // //                 {label}
// // //               </button>
// // //             ))}
// // //             {['⊙ Modify', '✎ Delete', '✦ Authorise', '✦ View'].map(l => (
// // //               <button key={l} className="im-abtn">{l}</button>
// // //             ))}
// // //           </div>
// // //           <div className="im-activity">
// // //             Activity Perform : {isNew ? 'ADD' : 'Add Existing'}
// // //           </div>
// // //         </div>

// // //         {/* Status banner */}
// // //         {status && <div className={`im-status ${status.type}`}>{status.msg}</div>}

// // //         {/* Form */}
// // //         <div className="im-form">

// // //           {/* Investment Type */}
// // //           <Row label="Investment Type" required>
// // //             <select
// // //               className="im-select im-select-full"
// // //               value={form.investmentType}
// // //               onChange={setE('investmentType')}
// // //             >
// // //               <option value="">--Select--</option>
// // //               <option value="INV">INVESTMENT TERM DEPOSIT</option>
// // //               <option value="bonds">BONDS / DEBENTURES</option>
// // //               <option value="gsec">GOVERNMENT SECURITIES</option>
// // //             </select>
// // //           </Row>

// // //           {/* Product Code row */}
// // //           <Row label="Product Code" required>
// // //             {isNew ? (
// // //               <input
// // //                 className="im-input shaded im-w90"
// // //                 value={fetching ? 'Loading…' : form.productCode}
// // //                 readOnly
// // //                 title="Auto-generated: MAX(GLCODE) + 1"
// // //               />
// // //             ) : (
// // //               <input
// // //                 className="im-input im-w90"
// // //                 placeholder="Enter GL Code"
// // //                 value={form.productCode}
// // //                 onChange={setE('productCode')}
// // //                 onBlur={(e)    => fetchExistingDefaults(e.target.value)}
// // //                 onKeyDown={(e) => e.key === 'Enter' && fetchExistingDefaults(form.productCode)}
// // //               />
// // //             )}
// // //             <input
// // //               className="im-input im-grow"
// // //               placeholder={isNew ? 'Enter Product Name *' : 'Auto-filled from GL Code'}
// // //               value={fetching && !isNew ? 'Loading…' : form.productName}
// // //               onChange={isNew ? setE('productName') : undefined}
// // //               readOnly={!isNew}
// // //             />
// // //             <span className="im-inline-lbl">A/C No</span>
// // //             <input
// // //               className="im-input shaded im-w70"
// // //               value={isNew ? form.acNo : (form.accNo || '')}
// // //               readOnly
// // //               title={isNew ? 'Default: 1' : 'Auto: MAX(CustAccno) + 1 for this GL'}
// // //             />
// // //           </Row>

// // //           {/* Bank / Branch */}
// // //           <Row label={isNew ? 'Investment Bank' : 'Bank Name'} required>
// // //             <input
// // //               className="im-input im-grow"
// // //               placeholder="BANK NAME"
// // //               value={form.bankName}
// // //               onChange={setE('bankName')}
// // //             />
// // //             <input
// // //               className="im-input im-grow"
// // //               placeholder="BRANCH NAME"
// // //               value={form.branchName}
// // //               onChange={setE('branchName')}
// // //             />
// // //           </Row>

// // //           {/* Acc No row — Add Existing only */}
// // //           <Row label="Acc No" hidden={isNew}>
// // //             <input
// // //               className="im-input shaded im-w110"
// // //               placeholder="Auto-generated"
// // //               value={form.accNo}
// // //               readOnly
// // //               title="Auto: MAX(CustAccno) + 1 for this GL"
// // //             />
// // //           </Row>

// // //           {/* Receipt No */}
// // //           <Row label="Receipt No" required>
// // //             <input
// // //               className="im-input shaded im-w90"
// // //               value={isNew ? form.receiptNo : (form.receiptNo || '')}
// // //               readOnly
// // //               title={isNew ? 'Default: 1' : 'Auto: MAX(ReceiptNo) + 1 for this GL'}
// // //             />
// // //             <input
// // //               className="im-input im-grow"
// // //               placeholder="ENTER RECEIPT NAME HERE"
// // //               value={form.receiptName}
// // //               onChange={setE('receiptName')}
// // //             />
// // //           </Row>

// // //           {/* Board Resolution */}
// // //           <Row label="Board Resolution No">
// // //             <input
// // //               className="im-input im-w130"
// // //               placeholder="Board Resolution No"
// // //               value={form.boardResNo}
// // //               onChange={setE('boardResNo')}
// // //             />
// // //             <span className="im-inline-lbl">Board Meeting Date</span>
// // //             <input
// // //               className="im-input im-grow"
// // //               type="date"
// // //               value={form.boardMeetingDate}
// // //               onChange={setE('boardMeetingDate')}
// // //             />
// // //           </Row>

// // //           {/* Opening Date */}
// // //           <Row label="Opening Date" required>
// // //             <input
// // //               className="im-input im-w130"
// // //               type="date"
// // //               value={form.openingDate}
// // //               onChange={setE('openingDate')}
// // //             />
// // //           </Row>

// // //           <hr className="im-divider" />

// // //           {/* Interest Credit GL */}
// // //           <div className="im-gl-hdr">Interest Credit GL :</div>
// // //           <Row label="Product Code :" required>
// // //             <GLCodeInput
// // //               value={form.icProdCode}
// // //               onChange={set('icProdCode')}
// // //               onFound={(r) => setForm(f => ({
// // //                 ...f,
// // //                 icProdCode: String(r.GLCODE),
// // //                 icProdName: r.GLNAME,
// // //               }))}
// // //               className="im-w90"
// // //             />
// // //             <GLSearchInput
// // //               value={form.icProdName}
// // //               onChange={set('icProdName')}
// // //               onSelect={(r) => setForm(f => ({
// // //                 ...f,
// // //                 icProdCode: String(r.GLCODE),
// // //                 icProdName: r.GLNAME,
// // //               }))}
// // //               placeholder="Search Product Name"
// // //             />
// // //           </Row>

// // //           {/* Interest Receivable GL */}
// // //           <div className="im-gl-hdr" style={{ marginTop: 4 }}>Interest Receivable GL :</div>
// // //           <Row label="Product Code :" required>
// // //             <GLCodeInput
// // //               value={form.irProdCode}
// // //               onChange={set('irProdCode')}
// // //               onFound={(r) => setForm(f => ({
// // //                 ...f,
// // //                 irProdCode: String(r.GLCODE),
// // //                 irProdName: r.GLNAME,
// // //               }))}
// // //               className="im-w90"
// // //             />
// // //             <GLSearchInput
// // //               value={form.irProdName}
// // //               onChange={set('irProdName')}
// // //               onSelect={(r) => setForm(f => ({
// // //                 ...f,
// // //                 irProdCode: String(r.GLCODE),
// // //                 irProdName: r.GLNAME,
// // //               }))}
// // //               placeholder="Search Product Name"
// // //             />
// // //             <span className="im-inline-lbl">
// // //               Account Number : <span className="req">*</span>
// // //             </span>

// // //             {/* ── CHANGED: DB-driven in Add Existing, user-editable in Add New ── */}
// // //             <input
// // //               className="im-input shaded im-w90"
// // //               placeholder="Acc No"
// // //               value={isNew ? form.irAccNum : (form.accNo || '')}
// // //               onChange={isNew ? setE('irAccNum') : undefined}
// // //               readOnly={!isNew}
// // //               title={isNew ? '' : 'Auto: MAX(CustAccno) + 1 for this GL'}
// // //             />

// // //             <GLSearchInput
// // //               value={form.irCustName}
// // //               onChange={set('irCustName')}
// // //               onSelect={(r) => setForm(f => ({ ...f, irCustName: r.GLNAME }))}
// // //               placeholder="SEARCH CUSTOMER"
// // //             />
// // //           </Row>

// // //         </div>

// // //         {/* Bottom buttons */}
// // //         <div className="im-btnbar">
// // //           <button
// // //             className="im-btn im-btn-blue"
// // //             onClick={handleCreate}
// // //             disabled={submitting || fetching}
// // //           >
// // //             {submitting ? 'Saving…' : isNew ? 'Create' : 'Add Existing'}
// // //           </button>
// // //           <button
// // //             className="im-btn im-btn-grey"
// // //             onClick={() => { switchMode(mode); setStatus(null); }}
// // //           >
// // //             Clear All
// // //           </button>
// // //           <button
// // //             className="im-btn im-btn-red"
// // //             onClick={() => onNavigate?.('fd_bonds')}
// // //           >
// // //             Exit
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </>
// // //   );
// // // }

// // import { useState, useEffect, useRef } from 'react';

// // const API_BASE = 'http://localhost:8020/api/investment-master';

// // const EMPTY_FORM = {
// //   investmentType:   'INV',
// //   productCode:      '',
// //   productName:      '',
// //   acNo:             '1',
// //   bankName:         '',
// //   bankCode:         0,
// //   branchName:       '',
// //   branchCode:       0,
// //   accNo:            '',
// //   receiptNo:        '',
// //   receiptName:      '',
// //   boardResNo:       '',
// //   boardMeetingDate: '',
// //   openingDate:      '',
// //   icProdCode:       '',
// //   icProdName:       '',
// //   irProdCode:       '',
// //   irProdName:       '',
// //   irAccNum:         '1',
// //   irCustName:       '',
// // };

// // // ── Sample grid data (replace with API fetch in production) ──
// // const SAMPLE_RECORDS = [
// //   { subglCode: '56001', bankName: 'SBI',   acNo: '1', receiptNo: '1', name: '2563/52',    openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: '2563/52',    boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
// //   { subglCode: '56002', bankName: 'SDFGH', acNo: '1', receiptNo: '1', name: 'GHHH',       openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'GHHH',       boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
// //   { subglCode: '56003', bankName: 'BOI',   acNo: '1', receiptNo: '1', name: 'RECIEPTBOI', openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'RECIEPTBOI', boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
// // ];

// // const css = `
// //   .im-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
// //   .im-wrap {
// //     font-family: 'Segoe UI', Arial, sans-serif;
// //     font-size: 12px; color: #222; width: 100%;
// //     background: #fff; border: 1px solid #b0c4de;
// //     display: flex; flex-direction: column;
// //   }
// //   .im-title {
// //     background: #1565c0; color: #fff; font-weight: 700;
// //     font-size: 13px; padding: 7px 14px; flex-shrink: 0;
// //   }
// //   .im-actionbar {
// //     background: #dce8f5; border-bottom: 1px solid #b0c4de;
// //     padding: 5px 10px; display: flex; align-items: center;
// //     justify-content: space-between; flex-shrink: 0; gap: 8px;
// //   }
// //   .im-actionbar-left { display: flex; gap: 3px; flex-wrap: wrap; }
// //   .im-activity { font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap; }
// //   .im-abtn {
// //     display: inline-flex; align-items: center; gap: 3px;
// //     padding: 3px 10px; font-size: 11.5px; font-weight: 600;
// //     border: 1px solid #90aac8; border-radius: 3px;
// //     background: #eaf1fb; color: #1a3a6b; cursor: pointer; white-space: nowrap;
// //   }
// //   .im-abtn:hover { background: #c8d8ee; }
// //   .im-abtn.active { background: #1565c0; color: #fff; border-color: #0d47a1; }
// //   .im-form {
// //     padding: 12px 16px 10px; border: 1px solid #c8d8ee;
// //     margin: 8px; border-radius: 2px; background: #fff; flex: 1;
// //   }
// //   .im-row { display: flex; align-items: center; margin-bottom: 7px; width: 100%; }
// //   .im-label { width: 150px; flex-shrink: 0; font-size: 12px; color: #222; white-space: nowrap; padding-right: 8px; }
// //   .im-label .req { color: #d32f2f; }
// //   .im-fields { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
// //   .im-input, .im-select {
// //     height: 26px; border: 1px solid #b0bec5; border-radius: 2px;
// //     padding: 0 7px; font-size: 12px; color: #333;
// //     background: #fff; outline: none; font-family: inherit;
// //   }
// //   .im-input:focus, .im-select:focus { border-color: #1565c0; }
// //   .im-input.shaded { background: #edf3fb; }
// //   .im-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
// //   .im-select-full { flex: 1; min-width: 0; }
// //   .im-w70  { width: 70px;  flex-shrink: 0; }
// //   .im-w90  { width: 90px;  flex-shrink: 0; }
// //   .im-w110 { width: 110px; flex-shrink: 0; }
// //   .im-w130 { width: 130px; flex-shrink: 0; }
// //   .im-grow { flex: 1; min-width: 0; }
// //   .im-srch { position: relative; display: inline-flex; align-items: center; flex: 1; min-width: 0; }
// //   .im-srch .im-input { width: 100%; padding-right: 22px; }
// //   .im-srch-ic { position: absolute; right: 6px; font-size: 11px; color: #888; pointer-events: none; }
// //   .im-inline-lbl { font-size: 12px; color: #222; white-space: nowrap; flex-shrink: 0; padding: 0 4px; }
// //   .im-divider { border: none; border-top: 1px solid #d0dcea; margin: 8px 0; }
// //   .im-gl-hdr {
// //     color: #1565c0; font-weight: 700; font-size: 11.5px;
// //     text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;
// //   }
// //   .im-btnbar {
// //     background: #dce8f5; border-top: 1px solid #b0c4de;
// //     padding: 8px; display: flex; gap: 6px; justify-content: center; flex-shrink: 0;
// //   }
// //   .im-btn {
// //     padding: 5px 22px; font-size: 12.5px; font-weight: 600;
// //     border-radius: 3px; border: none; cursor: pointer; font-family: inherit;
// //   }
// //   .im-btn-blue   { background: #1565c0; color: #fff; }
// //   .im-btn-blue:hover   { background: #0d47a1; }
// //   .im-btn-green  { background: #2e7d32; color: #fff; }
// //   .im-btn-green:hover  { background: #1b5e20; }
// //   .im-btn-grey   { background: #d0d8e4; color: #333; }
// //   .im-btn-grey:hover   { background: #b8c4d4; }
// //   .im-btn-red    { background: #e53935; color: #fff; }
// //   .im-btn-red:hover    { background: #b71c1c; }
// //   .im-btn:disabled { opacity: 0.6; cursor: not-allowed; }
// //   .im-dropdown {
// //     position: absolute; top: 100%; left: 0; right: 0; z-index: 999;
// //     background: #fff; border: 1px solid #90aac8; border-top: none;
// //     max-height: 160px; overflow-y: auto;
// //     box-shadow: 0 4px 8px rgba(0,0,0,0.12);
// //   }
// //   .im-dd-item {
// //     padding: 5px 8px; font-size: 11.5px; cursor: pointer; color: #222;
// //     border-bottom: 1px solid #eef2f7;
// //   }
// //   .im-dd-item:hover { background: #e8f0fb; }
// //   .im-dd-empty { padding: 6px 8px; font-size: 11px; color: #888; }
// //   .im-status {
// //     font-size: 11px; padding: 4px 8px; margin: 0 8px 4px;
// //     border-radius: 3px; text-align: center;
// //   }
// //   .im-status.error   { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }
// //   .im-status.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
// //   .im-status.loading { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }

// //   /* ── Grid ── */
// //   .im-grid-wrap {
// //     margin: 0 8px 8px; border: 1px solid #b0c4de; border-radius: 2px; overflow: hidden;
// //   }
// //   table.im-grid { width: 100%; border-collapse: collapse; font-size: 12px; }
// //   table.im-grid thead tr { background: #1565c0; }
// //   table.im-grid thead th {
// //     padding: 6px 10px; text-align: left; color: #fff;
// //     font-size: 11px; font-weight: 600; letter-spacing: 0.4px;
// //     text-transform: uppercase; white-space: nowrap;
// //   }
// //   table.im-grid tbody tr { border-bottom: 1px solid #eef1f8; }
// //   table.im-grid tbody tr:nth-child(even) { background: #f3f6fb; }
// //   table.im-grid tbody tr:nth-child(odd)  { background: #fff; }
// //   table.im-grid tbody tr.im-grid-sel     { background: #dce8f5 !important; outline: 1px solid #1565c0; }
// //   table.im-grid tbody tr:hover           { background: #eaf1fb !important; cursor: pointer; }
// //   table.im-grid tbody td { padding: 5px 10px; color: #222; }
// //   table.im-grid tbody td.mono { font-family: monospace; font-weight: 700; color: #1565c0; }

// //   .im-sel-btn {
// //     width: 20px; height: 20px; border: 1px solid #90aac8;
// //     border-radius: 3px; background: #eaf1fb; color: #1565c0;
// //     font-size: 14px; font-weight: 700; line-height: 1;
// //     cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
// //     padding: 0;
// //   }
// //   .im-sel-btn.sel { background: #1565c0; color: #fff; border-color: #0d47a1; }

// //   .im-modify-banner {
// //     background: #fff8e1; border: 1px solid #ffe082;
// //     margin: 0 8px 4px; padding: 4px 10px;
// //     font-size: 11px; color: #e65100; font-weight: 600;
// //     border-radius: 3px; display: flex; align-items: center; gap: 6px;
// //   }
// // `;

// // // ── Sub-components ──────────────────────────────────────────────────────────

// // function Row({ label, required, hidden, children }) {
// //   if (hidden) return null;
// //   return (
// //     <div className="im-row">
// //       <div className="im-label">
// //         {label}{required && <span className="req"> *</span>}
// //       </div>
// //       <div className="im-fields">{children}</div>
// //     </div>
// //   );
// // }

// // function GLSearchInput({ value, onChange, onSelect, placeholder }) {
// //   const [results, setResults] = useState([]);
// //   const [open, setOpen]       = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const timerRef = useRef(null);
// //   const wrapRef  = useRef(null);

// //   useEffect(() => {
// //     const handler = (e) => {
// //       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
// //     };
// //     document.addEventListener('mousedown', handler);
// //     return () => document.removeEventListener('mousedown', handler);
// //   }, []);

// //   const handleChange = (e) => {
// //     const val = e.target.value;
// //     onChange(val);
// //     clearTimeout(timerRef.current);
// //     if (val.trim().length < 1) { setResults([]); setOpen(false); return; }
// //     timerRef.current = setTimeout(async () => {
// //       setLoading(true);
// //       try {
// //         const res  = await fetch(`${API_BASE}/gl/search-name?name=${encodeURIComponent(val)}`);
// //         const json = await res.json();
// //         setResults(json.success ? json.data : []);
// //         setOpen(true);
// //       } catch { setResults([]); }
// //       finally { setLoading(false); }
// //     }, 300);
// //   };

// //   return (
// //     <div className="im-srch" ref={wrapRef} style={{ position: 'relative' }}>
// //       <input
// //         className="im-input"
// //         style={{ width: '100%', paddingRight: 22 }}
// //         value={value}
// //         onChange={handleChange}
// //         placeholder={placeholder}
// //       />
// //       <span className="im-srch-ic">{loading ? '⏳' : '🔍'}</span>
// //       {open && (
// //         <div className="im-dropdown">
// //           {results.length === 0
// //             ? <div className="im-dd-empty">No results</div>
// //             : results.map((r, i) => (
// //               <div
// //                 key={i}
// //                 className="im-dd-item"
// //                 onMouseDown={() => { onSelect(r); setOpen(false); }}
// //               >
// //                 <strong>{r.GLCODE}</strong> — {r.GLNAME}
// //               </div>
// //             ))
// //           }
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function GLCodeInput({ value, onChange, onFound, className }) {
// //   const lookup = async (code) => {
// //     if (!code) return;
// //     try {
// //       const res  = await fetch(`${API_BASE}/gl/search?code=${encodeURIComponent(code)}`);
// //       const json = await res.json();
// //       if (json.success && json.data?.length > 0) onFound(json.data[0]);
// //     } catch {}
// //   };
// //   return (
// //     <input
// //       className={`im-input shaded ${className || ''}`}
// //       value={value}
// //       onChange={(e) => onChange(e.target.value)}
// //       onBlur={(e)  => lookup(e.target.value)}
// //       onKeyDown={(e) => e.key === 'Enter' && lookup(value)}
// //       placeholder="Code"
// //     />
// //   );
// // }

// // // ── Main Component ──────────────────────────────────────────────────────────

// // export default function TermDeposit({ onNavigate }) {
// //   const [mode,        setMode]        = useState('add_new');
// //   const [form,        setForm]        = useState(EMPTY_FORM);
// //   const [status,      setStatus]      = useState(null);
// //   const [submitting,  setSubmitting]  = useState(false);
// //   const [fetching,    setFetching]    = useState(false);
// //   const [records,     setRecords]     = useState(SAMPLE_RECORDS);
// //   const [selectedRow, setSelectedRow] = useState(null); // index of selected grid row

// //   const isNew      = mode === 'add_new';
// //   const isExisting = mode === 'add_existing';
// //   const isModify   = mode === 'modify';

// //   // ── Fetch records for Modify grid ──
// //   useEffect(() => {
// //     if (mode === 'modify') {
// //       // In production: fetch(`${API_BASE}/list`).then(...).then(setRecords)
// //       setRecords(SAMPLE_RECORDS);
// //       setSelectedRow(null);
// //       setForm(EMPTY_FORM);
// //     }
// //   }, [mode]);

// //   // ── Add New: auto-fetch GLCODE (MAX+1) ──
// //   useEffect(() => {
// //     if (mode !== 'add_new') return;
// //     setForm(f => ({ ...f, receiptNo: '1', acNo: '1', accNo: '1' }));
// //     setFetching(true);
// //     (async () => {
// //       try {
// //         const res  = await fetch(`${API_BASE}/defaults?brcd=1`);
// //         const json = await res.json();
// //         if (json.success) {
// //           setForm(f => ({ ...f, productCode: String(json.data.nextGLCode), receiptNo: '1', acNo: '1', accNo: '1' }));
// //         } else {
// //           setStatus({ type: 'error', msg: 'Failed to fetch next GL Code.' });
// //         }
// //       } catch {
// //         setStatus({ type: 'error', msg: 'Could not reach server to load GL Code.' });
// //       } finally {
// //         setFetching(false);
// //       }
// //     })();
// //   }, [mode]);

// //   // ── Add Existing: fetch GL defaults on GLCODE entry ──
// //   const fetchExistingDefaults = async (glCode) => {
// //     if (!glCode || mode !== 'add_existing') return;
// //     setFetching(true);
// //     setStatus(null);
// //     try {
// //       const res  = await fetch(`${API_BASE}/existing-defaults?glCode=${encodeURIComponent(glCode)}`);
// //       const json = await res.json();
// //       if (json.success) {
// //         setForm(f => ({
// //           ...f,
// //           productCode: String(json.data.glCode),
// //           productName: json.data.glName,
// //           receiptNo:   String(json.data.nextReceiptNo),
// //           accNo:       String(json.data.nextAccNo),
// //           irAccNum:    String(json.data.nextAccNo),
// //         }));
// //       } else {
// //         setStatus({ type: 'error', msg: json.message || 'GL Code not found.' });
// //         setForm(f => ({ ...f, productName: '', receiptNo: '', accNo: '', irAccNum: '' }));
// //       }
// //     } catch {
// //       setStatus({ type: 'error', msg: 'Could not reach server.' });
// //     } finally {
// //       setFetching(false);
// //     }
// //   };

// //   // ── Select a row in Modify grid → populate form ──
// //   const handleGridSelect = (rec, idx) => {
// //     if (selectedRow === idx) {
// //       // Deselect
// //       setSelectedRow(null);
// //       setForm(EMPTY_FORM);
// //       return;
// //     }
// //     setSelectedRow(idx);
// //     setStatus(null);
// //     setForm({
// //       investmentType:   rec.investmentType   || 'INV',
// //       productCode:      rec.subglCode        || '',
// //       productName:      rec.name             || '',
// //       acNo:             rec.acNo             || '1',
// //       bankName:         rec.bankName         || '',
// //       bankCode:         rec.bankCode         || 0,
// //       branchName:       rec.branchName       || '',
// //       branchCode:       rec.branchCode       || 0,
// //       accNo:            rec.acNo             || '',
// //       receiptNo:        rec.receiptNo        || '',
// //       receiptName:      rec.receiptName      || rec.name || '',
// //       boardResNo:       rec.boardResNo       || '',
// //       boardMeetingDate: rec.boardMeetingDate || '',
// //       openingDate:      rec.openingDate      || '',
// //       icProdCode:       rec.icProdCode       || '',
// //       icProdName:       rec.icProdName       || '',
// //       irProdCode:       rec.irProdCode       || '',
// //       irProdName:       rec.irProdName       || '',
// //       irAccNum:         rec.irAccNum         || rec.acNo || '1',
// //       irCustName:       rec.irCustName       || '',
// //     });
// //   };

// //   const switchMode = (m) => {
// //     setMode(m);
// //     setForm(EMPTY_FORM);
// //     setStatus(null);
// //     setSelectedRow(null);
// //   };

// //   const set  = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
// //   const setE = (field) => (e)   => set(field)(e.target.value);

// //   // ── Submit / Modify ──
// //   const handleCreate = async () => {
// //     if (!form.bankName)    return setStatus({ type: 'error', msg: 'Bank Name is required.' });
// //     if (!form.openingDate) return setStatus({ type: 'error', msg: 'Opening Date is required.' });
// //     if (!form.icProdCode)  return setStatus({ type: 'error', msg: 'Interest Credit GL Product Code is required.' });
// //     if (!form.irProdCode)  return setStatus({ type: 'error', msg: 'Interest Receivable GL Product Code is required.' });

// //     if (isModify && selectedRow === null)
// //       return setStatus({ type: 'error', msg: 'Please select a record from the grid to modify.' });

// //     if (!isNew && !form.productCode)
// //       return setStatus({ type: 'error', msg: 'Please enter a valid GL Product Code.' });

// //     setStatus({ type: 'loading', msg: isModify ? 'Updating…' : 'Submitting…' });
// //     setSubmitting(true);

// //     try {
// //       const endpoint = isNew
// //         ? `${API_BASE}/create`
// //         : isExisting
// //           ? `${API_BASE}/create-existing`
// //           : `${API_BASE}/modify`;

// //       const payload = {
// //         investmentType: form.investmentType,
// //         glCode:         form.productCode,
// //         productCode:    form.productCode,
// //         productName:    form.productName,
// //         bankName:       form.bankName,
// //         bankCode:       form.bankCode  || 0,
// //         branchName:     form.branchName,
// //         branchCode:     form.branchCode || 0,
// //         receiptNo:      form.receiptNo,
// //         receiptName:    form.receiptName,
// //         boardResNo:     form.boardResNo      || null,
// //         boardMeetDate:  form.boardMeetingDate || null,
// //         openingDate:    form.openingDate,
// //         icProdCode:     form.icProdCode,
// //         icProdName:     form.icProdName,
// //         irProdCode:     form.irProdCode,
// //         irProdName:     form.irProdName,
// //         irAccNum:       form.irAccNum,
// //         irCustName:     form.irCustName,
// //         brcd:           1,
// //       };

// //       const res  = await fetch(endpoint, {
// //         method:  'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body:    JSON.stringify(payload),
// //       });
// //       const json = await res.json();

// //       if (json.success) {
// //         const d = json.data;
// //         setStatus({
// //           type: 'success',
// //           msg: isModify
// //             ? `✅ Record GL: ${form.productCode} updated successfully.`
// //             : `✅ ${d.message} | GL: ${d.glCode} | Receipt: ${d.receiptNo} | Acc: ${d.custAccno}`,
// //         });
// //         setForm(EMPTY_FORM);
// //         setSelectedRow(null);
// //         // Refresh grid in modify mode
// //         if (isModify) setRecords(SAMPLE_RECORDS);
// //       } else {
// //         setStatus({ type: 'error', msg: json.message || 'Operation failed.' });
// //       }
// //     } catch (err) {
// //       setStatus({ type: 'error', msg: `Network error: ${err.message}` });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // ── Label for primary action button ──
// //   const primaryBtnLabel = submitting
// //     ? (isModify ? 'Updating…' : 'Saving…')
// //     : isNew
// //       ? 'Create'
// //       : isExisting
// //         ? 'Add Existing'
// //         : 'Modify';

// //   // ── Render ────────────────────────────────────────────────────────────
// //   return (
// //     <>
// //       <style>{css}</style>
// //       <div className="im-wrap">

// //         {/* Title */}
// //         <div className="im-title">Investment Master</div>

// //         {/* Action bar */}
// //         <div className="im-actionbar">
// //           <div className="im-actionbar-left">
// //             {[
// //               { label: '★ Add New',      m: 'add_new'      },
// //               { label: '★ Add Existing', m: 'add_existing' },
// //               { label: '⊙ Modify',       m: 'modify'       },
// //             ].map(({ label, m }) => (
// //               <button
// //                 key={m}
// //                 className={`im-abtn${mode === m ? ' active' : ''}`}
// //                 onClick={() => switchMode(m)}
// //               >
// //                 {label}
// //               </button>
// //             ))}
// //             {['✎ Delete', '✦ Authorise', '✦ View'].map(l => (
// //               <button key={l} className="im-abtn">{l}</button>
// //             ))}
// //           </div>
// //           <div className="im-activity">
// //             Activity Perform : {isNew ? 'ADD' : isExisting ? 'Add Existing' : 'MODIFY'}
// //           </div>
// //         </div>

// //         {/* Modify banner */}
// //         {isModify && selectedRow !== null && (
// //           <div className="im-modify-banner">
// //             ✎ Modifying: SubGL {records[selectedRow]?.subglCode} | {records[selectedRow]?.bankName} — click a different row to switch, or Clear All to reset.
// //           </div>
// //         )}
// //         {isModify && selectedRow === null && (
// //           <div className="im-modify-banner" style={{ color: '#1565c0', background: '#e3f2fd', borderColor: '#90caf9' }}>
// //             ℹ Click the <strong>+</strong> icon on any row below to load it for modification.
// //           </div>
// //         )}

// //         {/* Status banner */}
// //         {status && <div className={`im-status ${status.type}`}>{status.msg}</div>}

// //         {/* Form */}
// //         <div className="im-form">

// //           {/* Investment Type */}
// //           <Row label="Investment Type" required>
// //             <select
// //               className="im-select im-select-full"
// //               value={form.investmentType}
// //               onChange={setE('investmentType')}
// //               disabled={isModify && selectedRow === null}
// //             >
// //               <option value="">--Select--</option>
// //               <option value="INV">INVESTMENT TERM DEPOSIT</option>
// //               <option value="bonds">BONDS / DEBENTURES</option>
// //               <option value="gsec">GOVERNMENT SECURITIES</option>
// //             </select>
// //           </Row>

// //           {/* Product Code */}
// //           <Row label="Product Code" required>
// //             {isNew ? (
// //               <input
// //                 className="im-input shaded im-w90"
// //                 value={fetching ? 'Loading…' : form.productCode}
// //                 readOnly
// //                 title="Auto-generated: MAX(GLCODE) + 1"
// //               />
// //             ) : isModify ? (
// //               <input
// //                 className="im-input shaded im-w90"
// //                 value={form.productCode}
// //                 readOnly
// //                 title="Populated from selected record"
// //               />
// //             ) : (
// //               <input
// //                 className="im-input im-w90"
// //                 placeholder="Enter GL Code"
// //                 value={form.productCode}
// //                 onChange={setE('productCode')}
// //                 onBlur={(e)    => fetchExistingDefaults(e.target.value)}
// //                 onKeyDown={(e) => e.key === 'Enter' && fetchExistingDefaults(form.productCode)}
// //               />
// //             )}
// //             <input
// //               className="im-input im-grow"
// //               placeholder={isNew ? 'Enter Product Name *' : 'Auto-filled from GL Code'}
// //               value={fetching && !isNew ? 'Loading…' : form.productName}
// //               onChange={isNew || isModify ? setE('productName') : undefined}
// //               readOnly={!isNew && !isModify}
// //             />
// //             <span className="im-inline-lbl">A/C No</span>
// //             <input
// //               className="im-input shaded im-w70"
// //               value={isNew ? form.acNo : (form.accNo || '')}
// //               readOnly
// //               title={isNew ? 'Default: 1' : 'Auto: MAX(CustAccno) + 1 for this GL'}
// //             />
// //           </Row>

// //           {/* Bank / Branch */}
// //           <Row label={isNew ? 'Investment Bank' : 'Bank Name'} required>
// //             <input
// //               className="im-input im-grow"
// //               placeholder="BANK NAME"
// //               value={form.bankName}
// //               onChange={setE('bankName')}
// //             />
// //             <input
// //               className="im-input im-grow"
// //               placeholder="BRANCH NAME"
// //               value={form.branchName}
// //               onChange={setE('branchName')}
// //             />
// //           </Row>

// //           {/* Acc No — Add Existing only */}
// //           <Row label="Acc No" hidden={isNew || isModify}>
// //             <input
// //               className="im-input shaded im-w110"
// //               placeholder="Auto-generated"
// //               value={form.accNo}
// //               readOnly
// //               title="Auto: MAX(CustAccno) + 1 for this GL"
// //             />
// //           </Row>

// //           {/* Receipt No */}
// //           <Row label="Receipt No" required>
// //             <input
// //               className="im-input shaded im-w90"
// //               value={isNew ? form.receiptNo : (form.receiptNo || '')}
// //               readOnly
// //               title={isNew ? 'Default: 1' : 'Auto: MAX(ReceiptNo) + 1 for this GL'}
// //             />
// //             <input
// //               className="im-input im-grow"
// //               placeholder="ENTER RECEIPT NAME HERE"
// //               value={form.receiptName}
// //               onChange={setE('receiptName')}
// //             />
// //           </Row>

// //           {/* Board Resolution */}
// //           <Row label="Board Resolution No">
// //             <input
// //               className="im-input im-w130"
// //               placeholder="Board Resolution No"
// //               value={form.boardResNo}
// //               onChange={setE('boardResNo')}
// //             />
// //             <span className="im-inline-lbl">Board Meeting Date</span>
// //             <input
// //               className="im-input im-grow"
// //               type="date"
// //               value={form.boardMeetingDate}
// //               onChange={setE('boardMeetingDate')}
// //             />
// //           </Row>

// //           {/* Opening Date */}
// //           <Row label="Opening Date" required>
// //             <input
// //               className="im-input im-w130"
// //               type="date"
// //               value={form.openingDate}
// //               onChange={setE('openingDate')}
// //             />
// //           </Row>

// //           <hr className="im-divider" />

// //           {/* Interest Credit GL */}
// //           <div className="im-gl-hdr">Interest Credit GL :</div>
// //           <Row label="Product Code :" required>
// //             <GLCodeInput
// //               value={form.icProdCode}
// //               onChange={set('icProdCode')}
// //               onFound={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
// //               className="im-w90"
// //             />
// //             <GLSearchInput
// //               value={form.icProdName}
// //               onChange={set('icProdName')}
// //               onSelect={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
// //               placeholder="Search Product Name"
// //             />
// //           </Row>

// //           {/* Interest Receivable GL */}
// //           <div className="im-gl-hdr" style={{ marginTop: 4 }}>Interest Receivable GL :</div>
// //           <Row label="Product Code :" required>
// //             <GLCodeInput
// //               value={form.irProdCode}
// //               onChange={set('irProdCode')}
// //               onFound={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
// //               className="im-w90"
// //             />
// //             <GLSearchInput
// //               value={form.irProdName}
// //               onChange={set('irProdName')}
// //               onSelect={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
// //               placeholder="Search Product Name"
// //             />
// //             <span className="im-inline-lbl">
// //               Account Number : <span className="req">*</span>
// //             </span>
// //             <input
// //               className="im-input shaded im-w90"
// //               placeholder="Acc No"
// //               value={isNew ? form.irAccNum : (form.accNo || '')}
// //               onChange={isNew ? setE('irAccNum') : undefined}
// //               readOnly={!isNew}
// //               title={isNew ? '' : 'Auto: MAX(CustAccno) + 1 for this GL'}
// //             />
// //             <GLSearchInput
// //               value={form.irCustName}
// //               onChange={set('irCustName')}
// //               onSelect={(r) => setForm(f => ({ ...f, irCustName: r.GLNAME }))}
// //               placeholder="SEARCH CUSTOMER"
// //             />
// //           </Row>

// //         </div>

// //         {/* Bottom buttons */}
// //         <div className="im-btnbar">
// //           <button
// //             className={`im-btn ${isModify ? 'im-btn-green' : 'im-btn-blue'}`}
// //             onClick={handleCreate}
// //             disabled={submitting || fetching || (isModify && selectedRow === null)}
// //           >
// //             {primaryBtnLabel}
// //           </button>
// //           <button
// //             className="im-btn im-btn-grey"
// //             onClick={() => { switchMode(mode); setStatus(null); }}
// //           >
// //             Clear All
// //           </button>
// //           <button
// //             className="im-btn im-btn-red"
// //             onClick={() => onNavigate?.('fd_bonds')}
// //           >
// //             Exit
// //           </button>
// //         </div>

// //         {/* ── Modify Grid — only shown in modify mode ── */}
// //         {isModify && (
// //           <div className="im-grid-wrap">
// //             <table className="im-grid">
// //               <thead>
// //                 <tr>
// //                   <th style={{ width: 50 }}>Select</th>
// //                   <th>SUBGLCode</th>
// //                   <th>Bank Name</th>
// //                   <th>A/C No</th>
// //                   <th>ReceiptNo</th>
// //                   <th>Name</th>
// //                   <th>OpeningDate</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {records.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: '12px' }}>
// //                       No records found.
// //                     </td>
// //                   </tr>
// //                 ) : records.map((rec, i) => {
// //                   const isSel = selectedRow === i;
// //                   return (
// //                     <tr
// //                       key={i}
// //                       className={isSel ? 'im-grid-sel' : ''}
// //                       onClick={() => handleGridSelect(rec, i)}
// //                     >
// //                       <td>
// //                         <button
// //                           className={`im-sel-btn${isSel ? ' sel' : ''}`}
// //                           onClick={(e) => { e.stopPropagation(); handleGridSelect(rec, i); }}
// //                           title={isSel ? 'Deselect' : 'Load for modification'}
// //                         >
// //                           {isSel ? '✓' : '+'}
// //                         </button>
// //                       </td>
// //                       <td className="mono">{rec.subglCode}</td>
// //                       <td>{rec.bankName}</td>
// //                       <td>{rec.acNo}</td>
// //                       <td>{rec.receiptNo}</td>
// //                       <td>{rec.name}</td>
// //                       <td>{rec.openingDate}</td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //       </div>
// //     </>
// //   );
// // }
// import { useState, useEffect, useRef } from 'react';

// const API_BASE = 'http://localhost:8020/api/investment-master';

// const EMPTY_FORM = {
//   investmentType:   'INV',
//   productCode:      '',
//   productName:      '',
//   acNo:             '1',
//   bankName:         '',
//   bankCode:         0,
//   branchName:       '',
//   branchCode:       0,
//   accNo:            '',
//   receiptNo:        '',
//   receiptName:      '',
//   boardResNo:       '',
//   boardMeetingDate: '',
//   openingDate:      '',
//   icProdCode:       '',
//   icProdName:       '',
//   irProdCode:       '',
//   irProdName:       '',
//   irAccNum:         '1',
//   irCustName:       '',
// };

// // ── Sample grid data (replace with API fetch in production) ──
// const SAMPLE_RECORDS = [
//   { subglCode: '56001', bankName: 'SBI',   acNo: '1', receiptNo: '1', name: '2563/52',    openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: '2563/52',    boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
//   { subglCode: '56002', bankName: 'SDFGH', acNo: '1', receiptNo: '1', name: 'GHHH',       openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'GHHH',       boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
//   { subglCode: '56003', bankName: 'BOI',   acNo: '1', receiptNo: '1', name: 'RECIEPTBOI', openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'RECIEPTBOI', boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '' },
// ];

// const css = `
//   .im-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
//   .im-wrap {
//     font-family: 'Segoe UI', Arial, sans-serif;
//     font-size: 12px; color: #222; width: 100%;
//     background: #fff; border: 1px solid #b0c4de;
//     display: flex; flex-direction: column;
//   }
//   .im-title {
//     background: #1565c0; color: #fff; font-weight: 700;
//     font-size: 13px; padding: 7px 14px; flex-shrink: 0;
//   }
//   .im-actionbar {
//     background: #dce8f5; border-bottom: 1px solid #b0c4de;
//     padding: 5px 10px; display: flex; align-items: center;
//     justify-content: space-between; flex-shrink: 0; gap: 8px;
//   }
//   .im-actionbar-left { display: flex; gap: 3px; flex-wrap: wrap; }
//   .im-activity { font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap; }
//   .im-abtn {
//     display: inline-flex; align-items: center; gap: 3px;
//     padding: 3px 10px; font-size: 11.5px; font-weight: 600;
//     border: 1px solid #90aac8; border-radius: 3px;
//     background: #eaf1fb; color: #1a3a6b; cursor: pointer; white-space: nowrap;
//   }
//   .im-abtn:hover { background: #c8d8ee; }
//   .im-abtn.active        { background: #1565c0; color: #fff; border-color: #0d47a1; }
//   .im-abtn.active-red    { background: #c62828; color: #fff; border-color: #b71c1c; }
//   .im-abtn.active-green  { background: #2e7d32; color: #fff; border-color: #1b5e20; }
//   .im-abtn.active-teal   { background: #00695c; color: #fff; border-color: #004d40; }
//   .im-form {
//     padding: 12px 16px 10px; border: 1px solid #c8d8ee;
//     margin: 8px; border-radius: 2px; background: #fff; flex: 1;
//   }
//   .im-row { display: flex; align-items: center; margin-bottom: 7px; width: 100%; }
//   .im-label { width: 150px; flex-shrink: 0; font-size: 12px; color: #222; white-space: nowrap; padding-right: 8px; }
//   .im-label .req { color: #d32f2f; }
//   .im-fields { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
//   .im-input, .im-select {
//     height: 26px; border: 1px solid #b0bec5; border-radius: 2px;
//     padding: 0 7px; font-size: 12px; color: #333;
//     background: #fff; outline: none; font-family: inherit;
//   }
//   .im-input:focus, .im-select:focus { border-color: #1565c0; }
//   .im-input.shaded { background: #edf3fb; }
//   .im-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
//   .im-input.readonly-view { background: #f8f9fa; color: #444; cursor: default; border-color: #cdd6e0; }
//   .im-select-full { flex: 1; min-width: 0; }
//   .im-w70  { width: 70px;  flex-shrink: 0; }
//   .im-w90  { width: 90px;  flex-shrink: 0; }
//   .im-w110 { width: 110px; flex-shrink: 0; }
//   .im-w130 { width: 130px; flex-shrink: 0; }
//   .im-grow { flex: 1; min-width: 0; }
//   .im-srch { position: relative; display: inline-flex; align-items: center; flex: 1; min-width: 0; }
//   .im-srch .im-input { width: 100%; padding-right: 22px; }
//   .im-srch-ic { position: absolute; right: 6px; font-size: 11px; color: #888; pointer-events: none; }
//   .im-inline-lbl { font-size: 12px; color: #222; white-space: nowrap; flex-shrink: 0; padding: 0 4px; }
//   .im-divider { border: none; border-top: 1px solid #d0dcea; margin: 8px 0; }
//   .im-gl-hdr {
//     color: #1565c0; font-weight: 700; font-size: 11.5px;
//     text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;
//   }
//   .im-btnbar {
//     background: #dce8f5; border-top: 1px solid #b0c4de;
//     padding: 8px; display: flex; gap: 6px; justify-content: center; flex-shrink: 0;
//   }
//   .im-btn {
//     padding: 5px 22px; font-size: 12.5px; font-weight: 600;
//     border-radius: 3px; border: none; cursor: pointer; font-family: inherit;
//   }
//   .im-btn-blue   { background: #1565c0; color: #fff; }
//   .im-btn-blue:hover   { background: #0d47a1; }
//   .im-btn-green  { background: #2e7d32; color: #fff; }
//   .im-btn-green:hover  { background: #1b5e20; }
//   .im-btn-grey   { background: #d0d8e4; color: #333; }
//   .im-btn-grey:hover   { background: #b8c4d4; }
//   .im-btn-red    { background: #e53935; color: #fff; }
//   .im-btn-red:hover    { background: #b71c1c; }
//   .im-btn-amber  { background: #f57c00; color: #fff; }
//   .im-btn-amber:hover  { background: #e65100; }
//   .im-btn:disabled { opacity: 0.6; cursor: not-allowed; }
//   .im-dropdown {
//     position: absolute; top: 100%; left: 0; right: 0; z-index: 999;
//     background: #fff; border: 1px solid #90aac8; border-top: none;
//     max-height: 160px; overflow-y: auto;
//     box-shadow: 0 4px 8px rgba(0,0,0,0.12);
//   }
//   .im-dd-item {
//     padding: 5px 8px; font-size: 11.5px; cursor: pointer; color: #222;
//     border-bottom: 1px solid #eef2f7;
//   }
//   .im-dd-item:hover { background: #e8f0fb; }
//   .im-dd-empty { padding: 6px 8px; font-size: 11px; color: #888; }
//   .im-status {
//     font-size: 11px; padding: 4px 8px; margin: 0 8px 4px;
//     border-radius: 3px; text-align: center;
//   }
//   .im-status.error   { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }
//   .im-status.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
//   .im-status.loading { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }

//   /* ── Grid ── */
//   .im-grid-wrap {
//     margin: 0 8px 8px; border: 1px solid #b0c4de; border-radius: 2px; overflow: hidden;
//   }
//   table.im-grid { width: 100%; border-collapse: collapse; font-size: 12px; }
//   table.im-grid thead tr { background: #1565c0; }
//   table.im-grid thead th {
//     padding: 6px 10px; text-align: left; color: #fff;
//     font-size: 11px; font-weight: 600; letter-spacing: 0.4px;
//     text-transform: uppercase; white-space: nowrap;
//   }
//   table.im-grid tbody tr { border-bottom: 1px solid #eef1f8; }
//   table.im-grid tbody tr:nth-child(even) { background: #f3f6fb; }
//   table.im-grid tbody tr:nth-child(odd)  { background: #fff; }
//   table.im-grid tbody tr.im-grid-sel     { background: #dce8f5 !important; outline: 1px solid #1565c0; }
//   table.im-grid tbody tr.im-grid-sel-red { background: #ffebee !important; outline: 1px solid #e53935; }
//   table.im-grid tbody tr.im-grid-sel-green { background: #e8f5e9 !important; outline: 1px solid #2e7d32; }
//   table.im-grid tbody tr.im-grid-sel-teal { background: #e0f2f1 !important; outline: 1px solid #00695c; }
//   table.im-grid tbody tr:hover           { background: #eaf1fb !important; cursor: pointer; }
//   table.im-grid tbody td { padding: 5px 10px; color: #222; }
//   table.im-grid tbody td.mono { font-family: monospace; font-weight: 700; color: #1565c0; }

//   .im-sel-btn {
//     width: 20px; height: 20px; border: 1px solid #90aac8;
//     border-radius: 3px; background: #eaf1fb; color: #1565c0;
//     font-size: 14px; font-weight: 700; line-height: 1;
//     cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
//     padding: 0;
//   }
//   .im-sel-btn.sel          { background: #1565c0; color: #fff; border-color: #0d47a1; }
//   .im-sel-btn.del          { background: #ffebee; color: #c62828; border-color: #ef9a9a; }
//   .im-sel-btn.del.sel      { background: #c62828; color: #fff; border-color: #b71c1c; }
//   .im-sel-btn.auth         { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
//   .im-sel-btn.auth.sel     { background: #2e7d32; color: #fff; border-color: #1b5e20; }
//   .im-sel-btn.view-btn     { background: #e0f2f1; color: #00695c; border-color: #80cbc4; }
//   .im-sel-btn.view-btn.sel { background: #00695c; color: #fff; border-color: #004d40; }

//   .im-modify-banner {
//     margin: 0 8px 4px; padding: 4px 10px;
//     font-size: 11px; font-weight: 600;
//     border-radius: 3px; display: flex; align-items: center; gap: 6px;
//     border: 1px solid;
//   }
//   .im-banner-default { background: #fff8e1; color: #e65100; border-color: #ffe082; }
//   .im-banner-info    { background: #e3f2fd; color: #1565c0; border-color: #90caf9; }
//   .im-banner-red     { background: #ffebee; color: #c62828; border-color: #ef9a9a; }
//   .im-banner-green   { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
//   .im-banner-teal    { background: #e0f2f1; color: #00695c; border-color: #80cbc4; }
// `;

// // ── Sub-components ──────────────────────────────────────────────────────────

// function Row({ label, required, hidden, children }) {
//   if (hidden) return null;
//   return (
//     <div className="im-row">
//       <div className="im-label">
//         {label}{required && <span className="req"> *</span>}
//       </div>
//       <div className="im-fields">{children}</div>
//     </div>
//   );
// }

// function GLSearchInput({ value, onChange, onSelect, placeholder, readOnly }) {
//   const [results, setResults] = useState([]);
//   const [open, setOpen]       = useState(false);
//   const [loading, setLoading] = useState(false);
//   const timerRef = useRef(null);
//   const wrapRef  = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   const handleChange = (e) => {
//     if (readOnly) return;
//     const val = e.target.value;
//     onChange(val);
//     clearTimeout(timerRef.current);
//     if (val.trim().length < 1) { setResults([]); setOpen(false); return; }
//     timerRef.current = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res  = await fetch(`${API_BASE}/gl/search-name?name=${encodeURIComponent(val)}`);
//         const json = await res.json();
//         setResults(json.success ? json.data : []);
//         setOpen(true);
//       } catch { setResults([]); }
//       finally { setLoading(false); }
//     }, 300);
//   };

//   return (
//     <div className="im-srch" ref={wrapRef} style={{ position: 'relative' }}>
//       <input
//         className={`im-input${readOnly ? ' readonly-view' : ''}`}
//         style={{ width: '100%', paddingRight: 22 }}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         readOnly={readOnly}
//       />
//       <span className="im-srch-ic">{loading ? '⏳' : '🔍'}</span>
//       {open && !readOnly && (
//         <div className="im-dropdown">
//           {results.length === 0
//             ? <div className="im-dd-empty">No results</div>
//             : results.map((r, i) => (
//               <div
//                 key={i}
//                 className="im-dd-item"
//                 onMouseDown={() => { onSelect(r); setOpen(false); }}
//               >
//                 <strong>{r.GLCODE}</strong> — {r.GLNAME}
//               </div>
//             ))
//           }
//         </div>
//       )}
//     </div>
//   );
// }

// function GLCodeInput({ value, onChange, onFound, className, readOnly }) {
//   const lookup = async (code) => {
//     if (!code || readOnly) return;
//     try {
//       const res  = await fetch(`${API_BASE}/gl/search?code=${encodeURIComponent(code)}`);
//       const json = await res.json();
//       if (json.success && json.data?.length > 0) onFound(json.data[0]);
//     } catch {}
//   };
//   return (
//     <input
//       className={`im-input${readOnly ? ' readonly-view' : ' shaded'} ${className || ''}`}
//       value={value}
//       onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
//       onBlur={readOnly ? undefined : (e)  => lookup(e.target.value)}
//       onKeyDown={readOnly ? undefined : (e) => e.key === 'Enter' && lookup(value)}
//       placeholder="Code"
//       readOnly={readOnly}
//     />
//   );
// }

// // ── Shared Grid Component ───────────────────────────────────────────────────

// function RecordGrid({ records, selectedRow, onSelect, selBtnClass, selRowClass }) {
//   return (
//     <div className="im-grid-wrap">
//       <table className="im-grid">
//         <thead>
//           <tr>
//             <th style={{ width: 50 }}>Select</th>
//             <th>SUBGLCode</th>
//             <th>Bank Name</th>
//             <th>A/C No</th>
//             <th>ReceiptNo</th>
//             <th>Name</th>
//             <th>OpeningDate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr>
//               <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: '12px' }}>
//                 No records found.
//               </td>
//             </tr>
//           ) : records.map((rec, i) => {
//             const isSel = selectedRow === i;
//             return (
//               <tr
//                 key={i}
//                 className={isSel ? selRowClass : ''}
//                 onClick={() => onSelect(rec, i)}
//               >
//                 <td>
//                   <button
//                     className={`im-sel-btn ${selBtnClass}${isSel ? ' sel' : ''}`}
//                     onClick={(e) => { e.stopPropagation(); onSelect(rec, i); }}
//                     title={isSel ? 'Deselect' : 'Load record'}
//                   >
//                     {isSel ? '✓' : '+'}
//                   </button>
//                 </td>
//                 <td className="mono">{rec.subglCode}</td>
//                 <td>{rec.bankName}</td>
//                 <td>{rec.acNo}</td>
//                 <td>{rec.receiptNo}</td>
//                 <td>{rec.name}</td>
//                 <td>{rec.openingDate}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ── Main Component ──────────────────────────────────────────────────────────

// export default function TermDepositCreate({ onNavigate }) {
//   const [mode,        setMode]        = useState('add_new');
//   const [form,        setForm]        = useState(EMPTY_FORM);
//   const [status,      setStatus]      = useState(null);
//   const [submitting,  setSubmitting]  = useState(false);
//   const [fetching,    setFetching]    = useState(false);
//   const [records,     setRecords]     = useState(SAMPLE_RECORDS);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const isNew      = mode === 'add_new';
//   const isExisting = mode === 'add_existing';
//   const isModify   = mode === 'modify';
//   const isDelete   = mode === 'delete';
//   const isAuth     = mode === 'authorise';
//   const isView     = mode === 'view';

//   // Modes that show grid and load form on row select
//   const isGridMode = isModify || isDelete || isAuth || isView;

//   // Form is fully read-only (no edits allowed)
//   const isReadOnly = isView || isDelete || isAuth;

//   // ── Fetch records for grid-based modes ──
//   useEffect(() => {
//     if (isGridMode) {
//       // In production: fetch(`${API_BASE}/list`).then(...).then(setRecords)
//       setRecords(SAMPLE_RECORDS);
//       setSelectedRow(null);
//       setForm(EMPTY_FORM);
//     }
//   }, [mode]);

//   // ── Add New: auto-fetch GLCODE (MAX+1) ──
//   useEffect(() => {
//     if (mode !== 'add_new') return;
//     setForm(f => ({ ...f, receiptNo: '1', acNo: '1', accNo: '1' }));
//     setFetching(true);
//     (async () => {
//       try {
//         const res  = await fetch(`${API_BASE}/defaults?brcd=1`);
//         const json = await res.json();
//         if (json.success) {
//           setForm(f => ({ ...f, productCode: String(json.data.nextGLCode), receiptNo: '1', acNo: '1', accNo: '1' }));
//         } else {
//           setStatus({ type: 'error', msg: 'Failed to fetch next GL Code.' });
//         }
//       } catch {
//         setStatus({ type: 'error', msg: 'Could not reach server to load GL Code.' });
//       } finally {
//         setFetching(false);
//       }
//     })();
//   }, [mode]);

//   // ── Add Existing: fetch GL defaults on GLCODE entry ──
//   const fetchExistingDefaults = async (glCode) => {
//     if (!glCode || mode !== 'add_existing') return;
//     setFetching(true);
//     setStatus(null);
//     try {
//       const res  = await fetch(`${API_BASE}/existing-defaults?glCode=${encodeURIComponent(glCode)}`);
//       const json = await res.json();
//       if (json.success) {
//         setForm(f => ({
//           ...f,
//           productCode: String(json.data.glCode),
//           productName: json.data.glName,
//           receiptNo:   String(json.data.nextReceiptNo),
//           accNo:       String(json.data.nextAccNo),
//           irAccNum:    String(json.data.nextAccNo),
//         }));
//       } else {
//         setStatus({ type: 'error', msg: json.message || 'GL Code not found.' });
//         setForm(f => ({ ...f, productName: '', receiptNo: '', accNo: '', irAccNum: '' }));
//       }
//     } catch {
//       setStatus({ type: 'error', msg: 'Could not reach server.' });
//     } finally {
//       setFetching(false);
//     }
//   };

//   // ── Select a row in grid → populate form (shared by Modify / Delete / Authorise / View) ──
//   const handleGridSelect = (rec, idx) => {
//     if (selectedRow === idx) {
//       // Deselect
//       setSelectedRow(null);
//       setForm(EMPTY_FORM);
//       return;
//     }
//     setSelectedRow(idx);
//     setStatus(null);
//     setForm({
//       investmentType:   rec.investmentType   || 'INV',
//       productCode:      rec.subglCode        || '',
//       productName:      rec.name             || '',
//       acNo:             rec.acNo             || '1',
//       bankName:         rec.bankName         || '',
//       bankCode:         rec.bankCode         || 0,
//       branchName:       rec.branchName       || '',
//       branchCode:       rec.branchCode       || 0,
//       accNo:            rec.acNo             || '',
//       receiptNo:        rec.receiptNo        || '',
//       receiptName:      rec.receiptName      || rec.name || '',
//       boardResNo:       rec.boardResNo       || '',
//       boardMeetingDate: rec.boardMeetingDate || '',
//       openingDate:      rec.openingDate      || '',
//       icProdCode:       rec.icProdCode       || '',
//       icProdName:       rec.icProdName       || '',
//       irProdCode:       rec.irProdCode       || '',
//       irProdName:       rec.irProdName       || '',
//       irAccNum:         rec.irAccNum         || rec.acNo || '1',
//       irCustName:       rec.irCustName       || '',
//     });
//   };

//   const switchMode = (m) => {
//     setMode(m);
//     setForm(EMPTY_FORM);
//     setStatus(null);
//     setSelectedRow(null);
//   };

//   const set  = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
//   const setE = (field) => (e)   => set(field)(e.target.value);

//   // ── Primary action handler ──
//   const handlePrimaryAction = async () => {
//     // Grid-mode: must select a row first
//     if (isGridMode && selectedRow === null)
//       return setStatus({ type: 'error', msg: 'Please select a record from the grid first.' });

//     // ── Delete ──
//     if (isDelete) {
//       setStatus({ type: 'loading', msg: 'Deleting record…' });
//       setSubmitting(true);
//       try {
//         const res  = await fetch(`${API_BASE}/delete`, {
//           method:  'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body:    JSON.stringify({ glCode: form.productCode, brcd: 1 }),
//         });
//         const json = await res.json();
//         if (json.success) {
//           setStatus({ type: 'success', msg: `✅ Record GL: ${form.productCode} deleted successfully.` });
//           setRecords(r => r.filter((_, i) => i !== selectedRow));
//           setSelectedRow(null);
//           setForm(EMPTY_FORM);
//         } else {
//           setStatus({ type: 'error', msg: json.message || 'Delete failed.' });
//         }
//       } catch (err) {
//         setStatus({ type: 'error', msg: `Network error: ${err.message}` });
//       } finally {
//         setSubmitting(false);
//       }
//       return;
//     }

//     // ── Authorise ──
//     if (isAuth) {
//       setStatus({ type: 'loading', msg: 'Authorising record…' });
//       setSubmitting(true);
//       try {
//         const res  = await fetch(`${API_BASE}/authorise`, {
//           method:  'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body:    JSON.stringify({ glCode: form.productCode, brcd: 1 }),
//         });
//         const json = await res.json();
//         if (json.success) {
//           setStatus({ type: 'success', msg: `✅ Record GL: ${form.productCode} authorised successfully.` });
//           setSelectedRow(null);
//           setForm(EMPTY_FORM);
//         } else {
//           setStatus({ type: 'error', msg: json.message || 'Authorisation failed.' });
//         }
//       } catch (err) {
//         setStatus({ type: 'error', msg: `Network error: ${err.message}` });
//       } finally {
//         setSubmitting(false);
//       }
//       return;
//     }

//     // ── Add New / Add Existing / Modify (original logic) ──
//     if (!form.bankName)    return setStatus({ type: 'error', msg: 'Bank Name is required.' });
//     if (!form.openingDate) return setStatus({ type: 'error', msg: 'Opening Date is required.' });
//     if (!form.icProdCode)  return setStatus({ type: 'error', msg: 'Interest Credit GL Product Code is required.' });
//     if (!form.irProdCode)  return setStatus({ type: 'error', msg: 'Interest Receivable GL Product Code is required.' });

//     if (isModify && selectedRow === null)
//       return setStatus({ type: 'error', msg: 'Please select a record from the grid to modify.' });

//     if (!isNew && !form.productCode)
//       return setStatus({ type: 'error', msg: 'Please enter a valid GL Product Code.' });

//     setStatus({ type: 'loading', msg: isModify ? 'Updating…' : 'Submitting…' });
//     setSubmitting(true);

//     try {
//       const endpoint = isNew
//         ? `${API_BASE}/create`
//         : isExisting
//           ? `${API_BASE}/create-existing`
//           : `${API_BASE}/modify`;

//       const payload = {
//         investmentType: form.investmentType,
//         glCode:         form.productCode,
//         productCode:    form.productCode,
//         productName:    form.productName,
//         bankName:       form.bankName,
//         bankCode:       form.bankCode  || 0,
//         branchName:     form.branchName,
//         branchCode:     form.branchCode || 0,
//         receiptNo:      form.receiptNo,
//         receiptName:    form.receiptName,
//         boardResNo:     form.boardResNo      || null,
//         boardMeetDate:  form.boardMeetingDate || null,
//         openingDate:    form.openingDate,
//         icProdCode:     form.icProdCode,
//         icProdName:     form.icProdName,
//         irProdCode:     form.irProdCode,
//         irProdName:     form.irProdName,
//         irAccNum:       form.irAccNum,
//         irCustName:     form.irCustName,
//         brcd:           1,
//         stage: isNew ? 1001 : isExisting ? 1001 : isModify ? 1002 : 1001,
//       };

//       const res  = await fetch(endpoint, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify(payload),
//       });
//       const json = await res.json();

//       if (json.success) {
//         const d = json.data;
//         setStatus({
//           type: 'success',
//           msg: isModify
//             ? `✅ Record GL: ${form.productCode} updated successfully.`
//             : `✅ ${d.message} | GL: ${d.glCode} | Receipt: ${d.receiptNo} | Acc: ${d.custAccno}`,
//         });
//         setForm(EMPTY_FORM);
//         setSelectedRow(null);
//         if (isModify) setRecords(SAMPLE_RECORDS);
//       } else {
//         setStatus({ type: 'error', msg: json.message || 'Operation failed.' });
//       }
//     } catch (err) {
//       setStatus({ type: 'error', msg: `Network error: ${err.message}` });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Activity label ──
//   const activityLabel = isNew
//     ? 'ADD'
//     : isExisting
//       ? 'Add Existing'
//       : isModify
//         ? 'MODIFY'
//         : isDelete
//           ? 'DELETE'
//           : isAuth
//             ? 'AUTHORISE'
//             : 'VIEW';

//   // ── Primary button label ──
//   const primaryBtnLabel = submitting
//     ? (isDelete ? 'Deleting…' : isAuth ? 'Authorising…' : isModify ? 'Updating…' : 'Saving…')
//     : isNew
//       ? 'Create'
//       : isExisting
//         ? 'Add Existing'
//         : isModify
//           ? 'Modify'
//           : isDelete
//             ? 'Delete'
//             : 'Authorise';

//   // ── Primary button CSS class ──
//   const primaryBtnCss = isDelete
//     ? 'im-btn-red'
//     : isAuth
//       ? 'im-btn-green'
//       : isModify
//         ? 'im-btn-green'
//         : 'im-btn-blue';

//   // ── Grid row / button highlight classes ──
//   const selBtnClass = isDelete ? 'del' : isAuth ? 'auth' : isView ? 'view-btn' : '';
//   const selRowClass = isDelete
//     ? 'im-grid-sel-red'
//     : isAuth
//       ? 'im-grid-sel-green'
//       : isView
//         ? 'im-grid-sel-teal'
//         : 'im-grid-sel';

//   // ── Banner ──
//   const getBanner = () => {
//     if (!isGridMode) return null;
//     if (selectedRow !== null) {
//       const rec = records[selectedRow];
//       if (!rec) return null;
//       const base = `SubGL ${rec.subglCode} | ${rec.bankName}`;
//       if (isDelete)  return { cls: 'im-banner-red',   msg: `🗑 Selected for deletion: ${base} — click Delete to confirm.` };
//       if (isAuth)    return { cls: 'im-banner-green',  msg: `✦ Selected for authorisation: ${base} — click Authorise to confirm.` };
//       if (isView)    return { cls: 'im-banner-teal',   msg: `👁 Viewing: ${base} — form is read-only.` };
//       return { cls: 'im-banner-default', msg: `✎ Modifying: ${base} — click a different row to switch, or Clear All to reset.` };
//     }
//     const icons = { modify: 'ℹ', delete: '🗑', authorise: '✦', view: '👁' };
//     const msgs  = {
//       modify:    'Click the + icon on any row below to load it for modification.',
//       delete:    'Click the + icon on any row below to select a record for deletion.',
//       authorise: 'Click the + icon on any row below to select a record for authorisation.',
//       view:      'Click the + icon on any row below to view its details.',
//     };
//     const clss  = { modify: 'im-banner-info', delete: 'im-banner-red', authorise: 'im-banner-green', view: 'im-banner-teal' };
//     return { cls: clss[mode] || 'im-banner-info', msg: `${icons[mode]} ${msgs[mode]}` };
//   };

//   const banner = getBanner();

//   // ── Render ────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{css}</style>
//       <div className="im-wrap">

//         {/* Title */}
//         <div className="im-title">Investment Master</div>

//         {/* Action bar */}
//         <div className="im-actionbar">
//           <div className="im-actionbar-left">
//             {[
//               { label: '★ Add New',      m: 'add_new',   ac: 'active'       },
//               { label: '★ Add Existing', m: 'add_existing', ac: 'active'    },
//               { label: '⊙ Modify',       m: 'modify',    ac: 'active'       },
//               { label: '✎ Delete',       m: 'delete',    ac: 'active-red'   },
//               { label: '✦ Authorise',    m: 'authorise', ac: 'active-green' },
//               { label: '✦ View',         m: 'view',      ac: 'active-teal'  },
//             ].map(({ label, m, ac }) => (
//               <button
//                 key={m}
//                 className={`im-abtn${mode === m ? ` ${ac}` : ''}`}
//                 onClick={() => switchMode(m)}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//           <div className="im-activity">
//             Activity Perform : {activityLabel}
//           </div>
//         </div>

//         {/* Banner */}
//         {banner && (
//           <div className={`im-modify-banner ${banner.cls}`}>
//             {banner.msg}
//           </div>
//         )}

//         {/* Status banner */}
//         {status && <div className={`im-status ${status.type}`}>{status.msg}</div>}

//         {/* Form */}
//         <div className="im-form">

//           {/* Investment Type */}
//           <Row label="Investment Type" required>
//             <select
//               className="im-select im-select-full"
//               value={form.investmentType}
//               onChange={isReadOnly ? undefined : setE('investmentType')}
//               disabled={isReadOnly || (isGridMode && selectedRow === null)}
//             >
//               <option value="">--Select--</option>
//               <option value="INV">INVESTMENT TERM DEPOSIT</option>
//               <option value="bonds">BONDS / DEBENTURES</option>
//               <option value="gsec">GOVERNMENT SECURITIES</option>
//             </select>
//           </Row>

//           {/* Product Code */}
//           <Row label="Product Code" required>
//             {isNew ? (
//               <input
//                 className="im-input shaded im-w90"
//                 value={fetching ? 'Loading…' : form.productCode}
//                 readOnly
//                 title="Auto-generated: MAX(GLCODE) + 1"
//               />
//             ) : isExisting ? (
//               <input
//                 className="im-input im-w90"
//                 placeholder="Enter GL Code"
//                 value={form.productCode}
//                 onChange={setE('productCode')}
//                 onBlur={(e)    => fetchExistingDefaults(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && fetchExistingDefaults(form.productCode)}
//               />
//             ) : (
//               // Modify / Delete / Authorise / View — populated from grid
//               <input
//                 className="im-input shaded im-w90"
//                 value={form.productCode}
//                 readOnly
//                 title="Populated from selected record"
//               />
//             )}
//             <input
//               className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
//               placeholder={isNew ? 'Enter Product Name *' : 'Auto-filled from GL Code'}
//               value={fetching && isExisting ? 'Loading…' : form.productName}
//               onChange={(isNew && !isReadOnly) || (isModify) ? setE('productName') : undefined}
//               readOnly={isReadOnly || isExisting}
//             />
//             <span className="im-inline-lbl">A/C No</span>
//             <input
//               className="im-input shaded im-w70"
//               value={isNew ? form.acNo : (form.accNo || '')}
//               readOnly
//               title={isNew ? 'Default: 1' : 'Auto: MAX(CustAccno) + 1 for this GL'}
//             />
//           </Row>

//           {/* Bank / Branch */}
//           <Row label={isNew ? 'Investment Bank' : 'Bank Name'} required>
//             <input
//               className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
//               placeholder="BANK NAME"
//               value={form.bankName}
//               onChange={isReadOnly ? undefined : setE('bankName')}
//               readOnly={isReadOnly}
//             />
//             <input
//               className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
//               placeholder="BRANCH NAME"
//               value={form.branchName}
//               onChange={isReadOnly ? undefined : setE('branchName')}
//               readOnly={isReadOnly}
//             />
//           </Row>

//           {/* Acc No — Add Existing only */}
//           <Row label="Acc No" hidden={isNew || isModify || isDelete || isAuth || isView}>
//             <input
//               className="im-input shaded im-w110"
//               placeholder="Auto-generated"
//               value={form.accNo}
//               readOnly
//               title="Auto: MAX(CustAccno) + 1 for this GL"
//             />
//           </Row>

//           {/* Receipt No */}
//           <Row label="Receipt No" required>
//             <input
//               className="im-input shaded im-w90"
//               value={isNew ? form.receiptNo : (form.receiptNo || '')}
//               readOnly
//               title={isNew ? 'Default: 1' : 'Auto: MAX(ReceiptNo) + 1 for this GL'}
//             />
//             <input
//               className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
//               placeholder="ENTER RECEIPT NAME HERE"
//               value={form.receiptName}
//               onChange={isReadOnly ? undefined : setE('receiptName')}
//               readOnly={isReadOnly}
//             />
//           </Row>

//           {/* Board Resolution */}
//           <Row label="Board Resolution No">
//             <input
//               className={`im-input im-w130${isReadOnly ? ' readonly-view' : ''}`}
//               placeholder="Board Resolution No"
//               value={form.boardResNo}
//               onChange={isReadOnly ? undefined : setE('boardResNo')}
//               readOnly={isReadOnly}
//             />
//             <span className="im-inline-lbl">Board Meeting Date</span>
//             <input
//               className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
//               type={isReadOnly ? 'text' : 'date'}
//               value={form.boardMeetingDate}
//               onChange={isReadOnly ? undefined : setE('boardMeetingDate')}
//               readOnly={isReadOnly}
//             />
//           </Row>

//           {/* Opening Date */}
//           <Row label="Opening Date" required>
//             <input
//               className={`im-input im-w130${isReadOnly ? ' readonly-view' : ''}`}
//               type={isReadOnly ? 'text' : 'date'}
//               value={form.openingDate}
//               onChange={isReadOnly ? undefined : setE('openingDate')}
//               readOnly={isReadOnly}
//             />
//           </Row>

//           <hr className="im-divider" />

//           {/* Interest Credit GL */}
//           <div className="im-gl-hdr">Interest Credit GL :</div>
//           <Row label="Product Code :" required>
//             <GLCodeInput
//               value={form.icProdCode}
//               onChange={set('icProdCode')}
//               onFound={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
//               className="im-w90"
//               readOnly={isReadOnly}
//             />
//             <GLSearchInput
//               value={form.icProdName}
//               onChange={set('icProdName')}
//               onSelect={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
//               placeholder="Search Product Name"
//               readOnly={isReadOnly}
//             />
//           </Row>

//           {/* Interest Receivable GL */}
//           <div className="im-gl-hdr" style={{ marginTop: 4 }}>Interest Receivable GL :</div>
//           <Row label="Product Code :" required>
//             <GLCodeInput
//               value={form.irProdCode}
//               onChange={set('irProdCode')}
//               onFound={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
//               className="im-w90"
//               readOnly={isReadOnly}
//             />
//             <GLSearchInput
//               value={form.irProdName}
//               onChange={set('irProdName')}
//               onSelect={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
//               placeholder="Search Product Name"
//               readOnly={isReadOnly}
//             />
//             <span className="im-inline-lbl">
//               Account Number : {!isView && <span className="req">*</span>}
//             </span>
//             <input
//               className="im-input shaded im-w90"
//               placeholder="Acc No"
//               value={isNew ? form.irAccNum : (form.accNo || '')}
//               onChange={isNew && !isReadOnly ? setE('irAccNum') : undefined}
//               readOnly={!isNew || isReadOnly}
//               title={isNew ? '' : 'Auto: MAX(CustAccno) + 1 for this GL'}
//             />
//             <GLSearchInput
//               value={form.irCustName}
//               onChange={set('irCustName')}
//               onSelect={(r) => setForm(f => ({ ...f, irCustName: r.GLNAME }))}
//               placeholder="SEARCH CUSTOMER"
//               readOnly={isReadOnly}
//             />
//           </Row>

//         </div>

//         {/* Bottom buttons */}
//         <div className="im-btnbar">
//           {/* Primary action — hidden for View (nothing to submit) */}
//           {!isView && (
//             <button
//               className={`im-btn ${primaryBtnCss}`}
//               onClick={handlePrimaryAction}
//               disabled={submitting || fetching || (isGridMode && selectedRow === null)}
//             >
//               {primaryBtnLabel}
//             </button>
//           )}
//           <button
//             className="im-btn im-btn-grey"
//             onClick={() => { switchMode(mode); setStatus(null); }}
//           >
//             Clear All
//           </button>
//           <button
//             className="im-btn im-btn-red"
//             onClick={() => onNavigate?.('fd_bonds')}
//           >
//             Exit
//           </button>
//         </div>

//         {/* ── Grid — shown for Modify, Delete, Authorise, View ── */}
//         {isGridMode && (
//           <RecordGrid
//             records={records}
//             selectedRow={selectedRow}
//             onSelect={handleGridSelect}
//             selBtnClass={selBtnClass}
//             selRowClass={selRowClass}
//           />
//         )}

//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef } from 'react';

const API_BASE = 'http://localhost:8020/api/investment-master';

const EMPTY_FORM = {
  investmentType:   'INV',
  productCode:      '',
  productName:      '',
  acNo:             '1',
  bankName:         '',
  bankCode:         0,
  branchName:       '',
  branchCode:       0,
  accNo:            '',
  receiptNo:        '',
  receiptName:      '',
  boardResNo:       '',
  boardMeetingDate: '',
  openingDate:      '',
  icProdCode:       '',
  icProdName:       '',
  irProdCode:       '',
  irProdName:       '',
  irAccNum:         '1',
  irCustName:       '',
};

// Stage constants
const STAGE = {
  ADD_NEW:   1001,
  MODIFY:    1002,
  AUTHORISE: 1003,
  DELETE:    1004,
};

// ── Sample grid data (replace with API fetch in production) ──
const SAMPLE_RECORDS = [
  { subglCode: '56001', bankName: 'SBI',   acNo: '1', receiptNo: '1', name: '2563/52',    openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: '2563/52',    boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '', stage: 1001 },
  { subglCode: '56002', bankName: 'SDFGH', acNo: '1', receiptNo: '1', name: 'GHHH',       openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'GHHH',       boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '', stage: 1001 },
  { subglCode: '56003', bankName: 'BOI',   acNo: '1', receiptNo: '1', name: 'RECIEPTBOI', openingDate: '04/06/2024', bankCode: 0, branchName: '', branchCode: 0, receiptName: 'RECIEPTBOI', boardResNo: '', boardMeetingDate: '', investmentType: 'INV', icProdCode: '', icProdName: '', irProdCode: '', irProdName: '', irAccNum: '1', irCustName: '', stage: 1002 },
];

const css = `
  .im-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .im-wrap {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12px; color: #222; width: 100%;
    background: #fff; border: 1px solid #b0c4de;
    display: flex; flex-direction: column;
  }
  .im-title {
    background: #1565c0; color: #fff; font-weight: 700;
    font-size: 13px; padding: 7px 14px; flex-shrink: 0;
  }
  .im-actionbar {
    background: #dce8f5; border-bottom: 1px solid #b0c4de;
    padding: 5px 10px; display: flex; align-items: center;
    justify-content: space-between; flex-shrink: 0; gap: 8px;
  }
  .im-actionbar-left { display: flex; gap: 3px; flex-wrap: wrap; }
  .im-activity { font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap; }
  .im-abtn {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 3px 10px; font-size: 11.5px; font-weight: 600;
    border: 1px solid #90aac8; border-radius: 3px;
    background: #eaf1fb; color: #1a3a6b; cursor: pointer; white-space: nowrap;
  }
  .im-abtn:hover { background: #c8d8ee; }
  .im-abtn.active        { background: #1565c0; color: #fff; border-color: #0d47a1; }
  .im-abtn.active-red    { background: #c62828; color: #fff; border-color: #b71c1c; }
  .im-abtn.active-green  { background: #2e7d32; color: #fff; border-color: #1b5e20; }
  .im-abtn.active-teal   { background: #00695c; color: #fff; border-color: #004d40; }
  .im-form {
    padding: 12px 16px 10px; border: 1px solid #c8d8ee;
    margin: 8px; border-radius: 2px; background: #fff; flex: 1;
  }
  .im-row { display: flex; align-items: center; margin-bottom: 7px; width: 100%; }
  .im-label { width: 150px; flex-shrink: 0; font-size: 12px; color: #222; white-space: nowrap; padding-right: 8px; }
  .im-label .req { color: #d32f2f; }
  .im-fields { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
  .im-input, .im-select {
    height: 26px; border: 1px solid #b0bec5; border-radius: 2px;
    padding: 0 7px; font-size: 12px; color: #333;
    background: #fff; outline: none; font-family: inherit;
  }
  .im-input:focus, .im-select:focus { border-color: #1565c0; }
  .im-input.shaded { background: #edf3fb; }
  .im-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
  .im-input.readonly-view { background: #f8f9fa; color: #444; cursor: default; border-color: #cdd6e0; }
  .im-select-full { flex: 1; min-width: 0; }
  .im-w70  { width: 70px;  flex-shrink: 0; }
  .im-w90  { width: 90px;  flex-shrink: 0; }
  .im-w110 { width: 110px; flex-shrink: 0; }
  .im-w130 { width: 130px; flex-shrink: 0; }
  .im-grow { flex: 1; min-width: 0; }
  .im-srch { position: relative; display: inline-flex; align-items: center; flex: 1; min-width: 0; }
  .im-srch .im-input { width: 100%; padding-right: 22px; }
  .im-srch-ic { position: absolute; right: 6px; font-size: 11px; color: #888; pointer-events: none; }
  .im-inline-lbl { font-size: 12px; color: #222; white-space: nowrap; flex-shrink: 0; padding: 0 4px; }
  .im-divider { border: none; border-top: 1px solid #d0dcea; margin: 8px 0; }
  .im-gl-hdr {
    color: #1565c0; font-weight: 700; font-size: 11.5px;
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;
  }
  .im-btnbar {
    background: #dce8f5; border-top: 1px solid #b0c4de;
    padding: 8px; display: flex; gap: 6px; justify-content: center; flex-shrink: 0;
  }
  .im-btn {
    padding: 5px 22px; font-size: 12.5px; font-weight: 600;
    border-radius: 3px; border: none; cursor: pointer; font-family: inherit;
  }
  .im-btn-blue   { background: #1565c0; color: #fff; }
  .im-btn-blue:hover   { background: #0d47a1; }
  .im-btn-green  { background: #2e7d32; color: #fff; }
  .im-btn-green:hover  { background: #1b5e20; }
  .im-btn-grey   { background: #d0d8e4; color: #333; }
  .im-btn-grey:hover   { background: #b8c4d4; }
  .im-btn-red    { background: #e53935; color: #fff; }
  .im-btn-red:hover    { background: #b71c1c; }
  .im-btn-amber  { background: #f57c00; color: #fff; }
  .im-btn-amber:hover  { background: #e65100; }
  .im-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .im-dropdown {
    position: absolute; top: 100%; left: 0; right: 0; z-index: 999;
    background: #fff; border: 1px solid #90aac8; border-top: none;
    max-height: 160px; overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0,0,0,0.12);
  }
  .im-dd-item {
    padding: 5px 8px; font-size: 11.5px; cursor: pointer; color: #222;
    border-bottom: 1px solid #eef2f7;
  }
  .im-dd-item:hover { background: #e8f0fb; }
  .im-dd-empty { padding: 6px 8px; font-size: 11px; color: #888; }
  .im-status {
    font-size: 11px; padding: 4px 8px; margin: 0 8px 4px;
    border-radius: 3px; text-align: center;
  }
  .im-status.error   { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }
  .im-status.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
  .im-status.loading { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }

  /* ── Stage badge ── */
  .im-stage-badge {
    display: inline-block; padding: 1px 7px; border-radius: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.3px;
  }
  .stage-1001 { background: #fff8e1; color: #e65100; border: 1px solid #ffe082; }
  .stage-1002 { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }
  .stage-1003 { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
  .stage-1004 { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }

  /* ── Grid ── */
  .im-grid-wrap {
    margin: 0 8px 8px; border: 1px solid #b0c4de; border-radius: 2px; overflow: hidden;
  }
  table.im-grid { width: 100%; border-collapse: collapse; font-size: 12px; }
  table.im-grid thead tr { background: #1565c0; }
  table.im-grid thead th {
    padding: 6px 10px; text-align: left; color: #fff;
    font-size: 11px; font-weight: 600; letter-spacing: 0.4px;
    text-transform: uppercase; white-space: nowrap;
  }
  table.im-grid tbody tr { border-bottom: 1px solid #eef1f8; }
  table.im-grid tbody tr:nth-child(even) { background: #f3f6fb; }
  table.im-grid tbody tr:nth-child(odd)  { background: #fff; }
  table.im-grid tbody tr.im-grid-sel     { background: #dce8f5 !important; outline: 1px solid #1565c0; }
  table.im-grid tbody tr.im-grid-sel-red { background: #ffebee !important; outline: 1px solid #e53935; }
  table.im-grid tbody tr.im-grid-sel-green { background: #e8f5e9 !important; outline: 1px solid #2e7d32; }
  table.im-grid tbody tr.im-grid-sel-teal { background: #e0f2f1 !important; outline: 1px solid #00695c; }
  table.im-grid tbody tr:hover           { background: #eaf1fb !important; cursor: pointer; }
  table.im-grid tbody td { padding: 5px 10px; color: #222; }
  table.im-grid tbody td.mono { font-family: monospace; font-weight: 700; color: #1565c0; }

  .im-sel-btn {
    width: 20px; height: 20px; border: 1px solid #90aac8;
    border-radius: 3px; background: #eaf1fb; color: #1565c0;
    font-size: 14px; font-weight: 700; line-height: 1;
    cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
    padding: 0;
  }
  .im-sel-btn.sel          { background: #1565c0; color: #fff; border-color: #0d47a1; }
  .im-sel-btn.del          { background: #ffebee; color: #c62828; border-color: #ef9a9a; }
  .im-sel-btn.del.sel      { background: #c62828; color: #fff; border-color: #b71c1c; }
  .im-sel-btn.auth         { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
  .im-sel-btn.auth.sel     { background: #2e7d32; color: #fff; border-color: #1b5e20; }
  .im-sel-btn.view-btn     { background: #e0f2f1; color: #00695c; border-color: #80cbc4; }
  .im-sel-btn.view-btn.sel { background: #00695c; color: #fff; border-color: #004d40; }

  .im-modify-banner {
    margin: 0 8px 4px; padding: 4px 10px;
    font-size: 11px; font-weight: 600;
    border-radius: 3px; display: flex; align-items: center; gap: 6px;
    border: 1px solid;
  }
  .im-banner-default { background: #fff8e1; color: #e65100; border-color: #ffe082; }
  .im-banner-info    { background: #e3f2fd; color: #1565c0; border-color: #90caf9; }
  .im-banner-red     { background: #ffebee; color: #c62828; border-color: #ef9a9a; }
  .im-banner-green   { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
  .im-banner-teal    { background: #e0f2f1; color: #00695c; border-color: #80cbc4; }
`;

// ── Stage label helper ──────────────────────────────────────────────────────
function StageBadge({ stage }) {
  const map = {
    1001: { label: 'Pending (1001)',    cls: 'stage-1001' },
    1002: { label: 'Modified (1002)',   cls: 'stage-1002' },
    1003: { label: 'Authorised (1003)', cls: 'stage-1003' },
    1004: { label: 'Deleted (1004)',    cls: 'stage-1004' },
  };
  const entry = map[stage];
  if (!entry) return <span>{stage ?? '—'}</span>;
  return <span className={`im-stage-badge ${entry.cls}`}>{entry.label}</span>;
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Row({ label, required, hidden, children }) {
  if (hidden) return null;
  return (
    <div className="im-row">
      <div className="im-label">
        {label}{required && <span className="req"> *</span>}
      </div>
      <div className="im-fields">{children}</div>
    </div>
  );
}

function GLSearchInput({ value, onChange, onSelect, placeholder, readOnly }) {
  const [results, setResults] = useState([]);
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const wrapRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (e) => {
    if (readOnly) return;
    const val = e.target.value;
    onChange(val);
    clearTimeout(timerRef.current);
    if (val.trim().length < 1) { setResults([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res  = await fetch(`${API_BASE}/gl/search-name?name=${encodeURIComponent(val)}`);
        const json = await res.json();
        setResults(json.success ? json.data : []);
        setOpen(true);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
  };

  return (
    <div className="im-srch" ref={wrapRef} style={{ position: 'relative' }}>
      <input
        className={`im-input${readOnly ? ' readonly-view' : ''}`}
        style={{ width: '100%', paddingRight: 22 }}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <span className="im-srch-ic">{loading ? '⏳' : '🔍'}</span>
      {open && !readOnly && (
        <div className="im-dropdown">
          {results.length === 0
            ? <div className="im-dd-empty">No results</div>
            : results.map((r, i) => (
              <div
                key={i}
                className="im-dd-item"
                onMouseDown={() => { onSelect(r); setOpen(false); }}
              >
                <strong>{r.GLCODE}</strong> — {r.GLNAME}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

function GLCodeInput({ value, onChange, onFound, className, readOnly }) {
  const lookup = async (code) => {
    if (!code || readOnly) return;
    try {
      const res  = await fetch(`${API_BASE}/gl/search?code=${encodeURIComponent(code)}`);
      const json = await res.json();
      if (json.success && json.data?.length > 0) onFound(json.data[0]);
    } catch {}
  };
  return (
    <input
      className={`im-input${readOnly ? ' readonly-view' : ' shaded'} ${className || ''}`}
      value={value}
      onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
      onBlur={readOnly ? undefined : (e)  => lookup(e.target.value)}
      onKeyDown={readOnly ? undefined : (e) => e.key === 'Enter' && lookup(value)}
      placeholder="Code"
      readOnly={readOnly}
    />
  );
}

// ── Shared Grid Component ───────────────────────────────────────────────────

function RecordGrid({ records, selectedRow, onSelect, selBtnClass, selRowClass }) {
  return (
    <div className="im-grid-wrap">
      <table className="im-grid">
        <thead>
          <tr>
            <th style={{ width: 50 }}>Select</th>
            <th>SUBGLCode</th>
            <th>Bank Name</th>
            <th>A/C No</th>
            <th>ReceiptNo</th>
            <th>Name</th>
            <th>OpeningDate</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', color: '#888', padding: '12px' }}>
                No records found.
              </td>
            </tr>
          ) : records.map((rec, i) => {
            const isSel = selectedRow === i;
            return (
              <tr
                key={i}
                className={isSel ? selRowClass : ''}
                onClick={() => onSelect(rec, i)}
              >
                <td>
                  <button
                    className={`im-sel-btn ${selBtnClass}${isSel ? ' sel' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onSelect(rec, i); }}
                    title={isSel ? 'Deselect' : 'Load record'}
                  >
                    {isSel ? '✓' : '+'}
                  </button>
                </td>
                <td className="mono">{rec.subglCode}</td>
                <td>{rec.bankName}</td>
                <td>{rec.acNo}</td>
                <td>{rec.receiptNo}</td>
                <td>{rec.name}</td>
                <td>{rec.openingDate}</td>
                <td><StageBadge stage={rec.stage} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function TermDepositCreate({ onNavigate }) {
  const [mode,        setMode]        = useState('add_new');
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [status,      setStatus]      = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [fetching,    setFetching]    = useState(false);
  const [records,     setRecords]     = useState(SAMPLE_RECORDS);
  const [selectedRow, setSelectedRow] = useState(null);

  const isNew      = mode === 'add_new';
  const isExisting = mode === 'add_existing';
  const isModify   = mode === 'modify';
  const isDelete   = mode === 'delete';
  const isAuth     = mode === 'authorise';
  const isView     = mode === 'view';

  // Modes that show grid and load form on row select
  const isGridMode = isModify || isDelete || isAuth || isView;

  // Form is fully read-only (no edits allowed)
  const isReadOnly = isView || isDelete || isAuth;

  // ── Fetch records for grid-based modes ──
  useEffect(() => {
    if (isGridMode) {
      // In production: fetch(`${API_BASE}?brcd=1`).then(r => r.json()).then(j => setRecords(j.data))
      setRecords(SAMPLE_RECORDS);
      setSelectedRow(null);
      setForm(EMPTY_FORM);
    }
  }, [mode]);

  // ── Add New: auto-fetch GLCODE (MAX+1) ──
  useEffect(() => {
    if (mode !== 'add_new') return;
    setForm(f => ({ ...f, receiptNo: '1', acNo: '1', accNo: '1' }));
    setFetching(true);
    (async () => {
      try {
        const res  = await fetch(`${API_BASE}/defaults?brcd=1`);
        const json = await res.json();
        if (json.success) {
          setForm(f => ({ ...f, productCode: String(json.data.nextGLCode), receiptNo: '1', acNo: '1', accNo: '1' }));
        } else {
          setStatus({ type: 'error', msg: 'Failed to fetch next GL Code.' });
        }
      } catch {
        setStatus({ type: 'error', msg: 'Could not reach server to load GL Code.' });
      } finally {
        setFetching(false);
      }
    })();
  }, [mode]);

  // ── Add Existing: fetch GL defaults on GLCODE entry ──
  const fetchExistingDefaults = async (glCode) => {
    if (!glCode || mode !== 'add_existing') return;
    setFetching(true);
    setStatus(null);
    try {
      const res  = await fetch(`${API_BASE}/existing-defaults?glCode=${encodeURIComponent(glCode)}`);
      const json = await res.json();
      if (json.success) {
        setForm(f => ({
          ...f,
          productCode: String(json.data.glCode),
          productName: json.data.glName,
          receiptNo:   String(json.data.nextReceiptNo),
          accNo:       String(json.data.nextAccNo),
          irAccNum:    String(json.data.nextAccNo),
        }));
      } else {
        setStatus({ type: 'error', msg: json.message || 'GL Code not found.' });
        setForm(f => ({ ...f, productName: '', receiptNo: '', accNo: '', irAccNum: '' }));
      }
    } catch {
      setStatus({ type: 'error', msg: 'Could not reach server.' });
    } finally {
      setFetching(false);
    }
  };

  // ── Select a row in grid → populate form ──
  const handleGridSelect = (rec, idx) => {
    if (selectedRow === idx) {
      setSelectedRow(null);
      setForm(EMPTY_FORM);
      return;
    }
    setSelectedRow(idx);
    setStatus(null);
    setForm({
      investmentType:   rec.investmentType   || 'INV',
      productCode:      rec.subglCode        || '',
      productName:      rec.name             || '',
      acNo:             rec.acNo             || '1',
      bankName:         rec.bankName         || '',
      bankCode:         rec.bankCode         || 0,
      branchName:       rec.branchName       || '',
      branchCode:       rec.branchCode       || 0,
      accNo:            rec.acNo             || '',
      receiptNo:        rec.receiptNo        || '',
      receiptName:      rec.receiptName      || rec.name || '',
      boardResNo:       rec.boardResNo       || '',
      boardMeetingDate: rec.boardMeetingDate || '',
      openingDate:      rec.openingDate      || '',
      icProdCode:       rec.icProdCode       || '',
      icProdName:       rec.icProdName       || '',
      irProdCode:       rec.irProdCode       || '',
      irProdName:       rec.irProdName       || '',
      irAccNum:         rec.irAccNum         || rec.acNo || '1',
      irCustName:       rec.irCustName       || '',
    });
  };

  const switchMode = (m) => {
    setMode(m);
    setForm(EMPTY_FORM);
    setStatus(null);
    setSelectedRow(null);
  };

  const set  = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
  const setE = (field) => (e)   => set(field)(e.target.value);

  // ── Primary action handler ──
  const handlePrimaryAction = async () => {
    if (isGridMode && selectedRow === null)
      return setStatus({ type: 'error', msg: 'Please select a record from the grid first.' });

    // ── Delete → Stage 1004 ──
    if (isDelete) {
      setStatus({ type: 'loading', msg: 'Deleting record… (Stage → 1004)' });
      setSubmitting(true);
      try {
        const res  = await fetch(`${API_BASE}/delete`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            glCode: form.productCode,
            brcd:   1,
            stage:  STAGE.DELETE,          // 1004
          }),
        });
        const json = await res.json();
        if (json.success) {
          setStatus({ type: 'success', msg: `✅ Record GL: ${form.productCode} soft-deleted. Stage set to 1004.` });
          // Update local record's stage to reflect change
          setRecords(r => r.map((rec, i) =>
            i === selectedRow ? { ...rec, stage: STAGE.DELETE } : rec
          ));
          setSelectedRow(null);
          setForm(EMPTY_FORM);
        } else {
          setStatus({ type: 'error', msg: json.message || 'Delete failed.' });
        }
      } catch (err) {
        setStatus({ type: 'error', msg: `Network error: ${err.message}` });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ── Authorise → Stage 1003 ──
    if (isAuth) {
      setStatus({ type: 'loading', msg: 'Authorising record… (Stage → 1003)' });
      setSubmitting(true);
      try {
        const res  = await fetch(`${API_BASE}/authorise`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            glCode: form.productCode,
            brcd:   1,
            stage:  STAGE.AUTHORISE,       // 1003
          }),
        });
        const json = await res.json();
        if (json.success) {
          setStatus({ type: 'success', msg: `✅ Record GL: ${form.productCode} authorised. Stage set to 1003.` });
          setRecords(r => r.map((rec, i) =>
            i === selectedRow ? { ...rec, stage: STAGE.AUTHORISE } : rec
          ));
          setSelectedRow(null);
          setForm(EMPTY_FORM);
        } else {
          setStatus({ type: 'error', msg: json.message || 'Authorisation failed.' });
        }
      } catch (err) {
        setStatus({ type: 'error', msg: `Network error: ${err.message}` });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ── Add New / Add Existing / Modify — shared validations ──
    if (!form.bankName)    return setStatus({ type: 'error', msg: 'Bank Name is required.' });
    if (!form.openingDate) return setStatus({ type: 'error', msg: 'Opening Date is required.' });
    if (!form.icProdCode)  return setStatus({ type: 'error', msg: 'Interest Credit GL Product Code is required.' });
    if (!form.irProdCode)  return setStatus({ type: 'error', msg: 'Interest Receivable GL Product Code is required.' });

    if (isModify && selectedRow === null)
      return setStatus({ type: 'error', msg: 'Please select a record from the grid to modify.' });

    if (!isNew && !form.productCode)
      return setStatus({ type: 'error', msg: 'Please enter a valid GL Product Code.' });

    // ── Modify → Stage 1002 ──
    if (isModify) {
      setStatus({ type: 'loading', msg: 'Updating record… (Stage → 1002)' });
      setSubmitting(true);
      try {
        const payload = {
          glCode:         form.productCode,
          investmentType: form.investmentType,
          productName:    form.productName,
          bankName:       form.bankName,
          bankCode:       form.bankCode  || 0,
          branchName:     form.branchName,
          branchCode:     form.branchCode || 0,
          receiptName:    form.receiptName,
          boardResNo:     form.boardResNo      || null,
          boardMeetDate:  form.boardMeetingDate || null,
          openingDate:    form.openingDate,
          icProdCode:     form.icProdCode,
          icProdName:     form.icProdName,
          irProdCode:     form.irProdCode,
          irProdName:     form.irProdName,
          irAccNum:       form.irAccNum,
          irCustName:     form.irCustName,
          stage:          STAGE.MODIFY,        // 1002
          brcd:           1,
        };
        const res  = await fetch(`${API_BASE}/modify`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setStatus({ type: 'success', msg: `✅ Record GL: ${form.productCode} updated. Stage set to 1002.` });
          setRecords(r => r.map((rec, i) =>
            i === selectedRow ? { ...rec, stage: STAGE.MODIFY, bankName: form.bankName, name: form.productName || rec.name } : rec
          ));
          setSelectedRow(null);
          setForm(EMPTY_FORM);
        } else {
          setStatus({ type: 'error', msg: json.message || 'Modify failed.' });
        }
      } catch (err) {
        setStatus({ type: 'error', msg: `Network error: ${err.message}` });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // ── Add New → Stage 1001 ──
    // ── Add Existing → Stage 1001 ──
    setStatus({ type: 'loading', msg: 'Submitting… (Stage → 1001)' });
    setSubmitting(true);

    try {
      const endpoint = isNew
        ? `${API_BASE}/create`
        : `${API_BASE}/create-existing`;

      const payload = {
        investmentType: form.investmentType,
        glCode:         form.productCode,
        productCode:    form.productCode,
        productName:    form.productName,
        bankName:       form.bankName,
        bankCode:       form.bankCode  || 0,
        branchName:     form.branchName,
        branchCode:     form.branchCode || 0,
        receiptNo:      form.receiptNo,
        receiptName:    form.receiptName,
        boardResNo:     form.boardResNo      || null,
        boardMeetDate:  form.boardMeetingDate || null,
        openingDate:    form.openingDate,
        icProdCode:     form.icProdCode,
        icProdName:     form.icProdName,
        irProdCode:     form.irProdCode,
        irProdName:     form.irProdName,
        irAccNum:       form.irAccNum,
        irCustName:     form.irCustName,
        stage:          STAGE.ADD_NEW,       // 1001
        brcd:           1,
      };

      const res  = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        const d = json.data;
        setStatus({
          type: 'success',
          msg: `✅ ${d.message} | GL: ${d.glCode} | Receipt: ${d.receiptNo} | Acc: ${d.custAccno} | Stage: 1001`,
        });
        setForm(EMPTY_FORM);
        setSelectedRow(null);
      } else {
        setStatus({ type: 'error', msg: json.message || 'Operation failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: `Network error: ${err.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Activity label ──
  const activityLabel = isNew
    ? `ADD (Stage: ${STAGE.ADD_NEW})`
    : isExisting
      ? `Add Existing (Stage: ${STAGE.ADD_NEW})`
      : isModify
        ? `MODIFY (Stage: ${STAGE.MODIFY})`
        : isDelete
          ? `DELETE (Stage: ${STAGE.DELETE})`
          : isAuth
            ? `AUTHORISE (Stage: ${STAGE.AUTHORISE})`
            : 'VIEW';

  // ── Primary button label ──
  const primaryBtnLabel = submitting
    ? (isDelete ? 'Deleting…' : isAuth ? 'Authorising…' : isModify ? 'Updating…' : 'Saving…')
    : isNew
      ? 'Create'
      : isExisting
        ? 'Add Existing'
        : isModify
          ? 'Modify'
          : isDelete
            ? 'Delete'
            : 'Authorise';

  // ── Primary button CSS class ──
  const primaryBtnCss = isDelete
    ? 'im-btn-red'
    : isAuth
      ? 'im-btn-green'
      : isModify
        ? 'im-btn-green'
        : 'im-btn-blue';

  // ── Grid row / button highlight classes ──
  const selBtnClass = isDelete ? 'del' : isAuth ? 'auth' : isView ? 'view-btn' : '';
  const selRowClass = isDelete
    ? 'im-grid-sel-red'
    : isAuth
      ? 'im-grid-sel-green'
      : isView
        ? 'im-grid-sel-teal'
        : 'im-grid-sel';

  // ── Banner ──
  const getBanner = () => {
    if (!isGridMode) return null;
    if (selectedRow !== null) {
      const rec = records[selectedRow];
      if (!rec) return null;
      const base = `SubGL ${rec.subglCode} | ${rec.bankName}`;
      if (isDelete)  return { cls: 'im-banner-red',   msg: `🗑 Selected for deletion: ${base} — Stage will be set to 1004. Click Delete to confirm.` };
      if (isAuth)    return { cls: 'im-banner-green',  msg: `✦ Selected for authorisation: ${base} — Stage will be set to 1003. Click Authorise to confirm.` };
      if (isView)    return { cls: 'im-banner-teal',   msg: `👁 Viewing: ${base} — form is read-only.` };
      return { cls: 'im-banner-default', msg: `✎ Modifying: ${base} — Stage will be set to 1002 on save. Click a different row to switch, or Clear All to reset.` };
    }
    const icons = { modify: 'ℹ', delete: '🗑', authorise: '✦', view: '👁' };
    const msgs  = {
      modify:    'Click the + icon on any row below to load it for modification. (Stage → 1002)',
      delete:    'Click the + icon on any row below to select a record for deletion. (Stage → 1004)',
      authorise: 'Click the + icon on any row below to select a record for authorisation. (Stage → 1003)',
      view:      'Click the + icon on any row below to view its details.',
    };
    const clss  = { modify: 'im-banner-info', delete: 'im-banner-red', authorise: 'im-banner-green', view: 'im-banner-teal' };
    return { cls: clss[mode] || 'im-banner-info', msg: `${icons[mode]} ${msgs[mode]}` };
  };

  const banner = getBanner();

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="im-wrap">

        {/* Title */}
        <div className="im-title">Investment Master</div>

        {/* Action bar */}
        <div className="im-actionbar">
          <div className="im-actionbar-left">
            {[
              { label: '★ Add New',      m: 'add_new',      ac: 'active'       },
              { label: '★ Add Existing', m: 'add_existing', ac: 'active'       },
              { label: '⊙ Modify',       m: 'modify',       ac: 'active'       },
              { label: '✎ Delete',       m: 'delete',       ac: 'active-red'   },
              { label: '✦ Authorise',    m: 'authorise',    ac: 'active-green' },
              { label: '✦ View',         m: 'view',         ac: 'active-teal'  },
            ].map(({ label, m, ac }) => (
              <button
                key={m}
                className={`im-abtn${mode === m ? ` ${ac}` : ''}`}
                onClick={() => switchMode(m)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="im-activity">
            Activity Perform : {activityLabel}
          </div>
        </div>

        {/* Banner */}
        {banner && (
          <div className={`im-modify-banner ${banner.cls}`}>
            {banner.msg}
          </div>
        )}

        {/* Status banner */}
        {status && <div className={`im-status ${status.type}`}>{status.msg}</div>}

        {/* Form */}
        <div className="im-form">

          {/* Investment Type */}
          <Row label="Investment Type" required>
            <select
              className="im-select im-select-full"
              value={form.investmentType}
              onChange={isReadOnly ? undefined : setE('investmentType')}
              disabled={isReadOnly || (isGridMode && selectedRow === null)}
            >
              <option value="">--Select--</option>
              <option value="INV">INVESTMENT TERM DEPOSIT</option>
              <option value="bonds">BONDS / DEBENTURES</option>
              <option value="gsec">GOVERNMENT SECURITIES</option>
            </select>
          </Row>

          {/* Product Code */}
          <Row label="Product Code" required>
            {isNew ? (
              <input
                className="im-input shaded im-w90"
                value={fetching ? 'Loading…' : form.productCode}
                readOnly
                title="Auto-generated: MAX(GLCODE) + 1"
              />
            ) : isExisting ? (
              <input
                className="im-input im-w90"
                placeholder="Enter GL Code"
                value={form.productCode}
                onChange={setE('productCode')}
                onBlur={(e)    => fetchExistingDefaults(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchExistingDefaults(form.productCode)}
              />
            ) : (
              <input
                className="im-input shaded im-w90"
                value={form.productCode}
                readOnly
                title="Populated from selected record"
              />
            )}
            <input
              className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
              placeholder={isNew ? 'Enter Product Name *' : 'Auto-filled from GL Code'}
              value={fetching && isExisting ? 'Loading…' : form.productName}
              onChange={(isNew && !isReadOnly) || isModify ? setE('productName') : undefined}
              readOnly={isReadOnly || isExisting}
            />
            <span className="im-inline-lbl">A/C No</span>
            <input
              className="im-input shaded im-w70"
              value={isNew ? form.acNo : (form.accNo || '')}
              readOnly
              title={isNew ? 'Default: 1' : 'Auto: MAX(CustAccno) + 1 for this GL'}
            />
          </Row>

          {/* Bank / Branch */}
          <Row label={isNew ? 'Investment Bank' : 'Bank Name'} required>
            <input
              className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
              placeholder="BANK NAME"
              value={form.bankName}
              onChange={isReadOnly ? undefined : setE('bankName')}
              readOnly={isReadOnly}
            />
            <input
              className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
              placeholder="BRANCH NAME"
              value={form.branchName}
              onChange={isReadOnly ? undefined : setE('branchName')}
              readOnly={isReadOnly}
            />
          </Row>

          {/* Acc No — Add Existing only */}
          <Row label="Acc No" hidden={isNew || isModify || isDelete || isAuth || isView}>
            <input
              className="im-input shaded im-w110"
              placeholder="Auto-generated"
              value={form.accNo}
              readOnly
              title="Auto: MAX(CustAccno) + 1 for this GL"
            />
          </Row>

          {/* Receipt No */}
          <Row label="Receipt No" required>
            <input
              className="im-input shaded im-w90"
              value={isNew ? form.receiptNo : (form.receiptNo || '')}
              readOnly
              title={isNew ? 'Default: 1' : 'Auto: MAX(ReceiptNo) + 1 for this GL'}
            />
            <input
              className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
              placeholder="ENTER RECEIPT NAME HERE"
              value={form.receiptName}
              onChange={isReadOnly ? undefined : setE('receiptName')}
              readOnly={isReadOnly}
            />
          </Row>

          {/* Board Resolution */}
          <Row label="Board Resolution No">
            <input
              className={`im-input im-w130${isReadOnly ? ' readonly-view' : ''}`}
              placeholder="Board Resolution No"
              value={form.boardResNo}
              onChange={isReadOnly ? undefined : setE('boardResNo')}
              readOnly={isReadOnly}
            />
            <span className="im-inline-lbl">Board Meeting Date</span>
            <input
              className={`im-input im-grow${isReadOnly ? ' readonly-view' : ''}`}
              type={isReadOnly ? 'text' : 'date'}
              value={form.boardMeetingDate}
              onChange={isReadOnly ? undefined : setE('boardMeetingDate')}
              readOnly={isReadOnly}
            />
          </Row>

          {/* Opening Date */}
          <Row label="Opening Date" required>
            <input
              className={`im-input im-w130${isReadOnly ? ' readonly-view' : ''}`}
              type={isReadOnly ? 'text' : 'date'}
              value={form.openingDate}
              onChange={isReadOnly ? undefined : setE('openingDate')}
              readOnly={isReadOnly}
            />
          </Row>

          <hr className="im-divider" />

          {/* Interest Credit GL */}
          <div className="im-gl-hdr">Interest Credit GL :</div>
          <Row label="Product Code :" required>
            <GLCodeInput
              value={form.icProdCode}
              onChange={set('icProdCode')}
              onFound={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
              className="im-w90"
              readOnly={isReadOnly}
            />
            <GLSearchInput
              value={form.icProdName}
              onChange={set('icProdName')}
              onSelect={(r) => setForm(f => ({ ...f, icProdCode: String(r.GLCODE), icProdName: r.GLNAME }))}
              placeholder="Search Product Name"
              readOnly={isReadOnly}
            />
          </Row>

          {/* Interest Receivable GL */}
          <div className="im-gl-hdr" style={{ marginTop: 4 }}>Interest Receivable GL :</div>
          <Row label="Product Code :" required>
            <GLCodeInput
              value={form.irProdCode}
              onChange={set('irProdCode')}
              onFound={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
              className="im-w90"
              readOnly={isReadOnly}
            />
            <GLSearchInput
              value={form.irProdName}
              onChange={set('irProdName')}
              onSelect={(r) => setForm(f => ({ ...f, irProdCode: String(r.GLCODE), irProdName: r.GLNAME }))}
              placeholder="Search Product Name"
              readOnly={isReadOnly}
            />
            <span className="im-inline-lbl">
              Account Number : {!isView && <span className="req">*</span>}
            </span>
            <input
              className="im-input shaded im-w90"
              placeholder="Acc No"
              value={isNew ? form.irAccNum : (form.accNo || '')}
              onChange={isNew && !isReadOnly ? setE('irAccNum') : undefined}
              readOnly={!isNew || isReadOnly}
              title={isNew ? '' : 'Auto: MAX(CustAccno) + 1 for this GL'}
            />
            <GLSearchInput
              value={form.irCustName}
              onChange={set('irCustName')}
              onSelect={(r) => setForm(f => ({ ...f, irCustName: r.GLNAME }))}
              placeholder="SEARCH CUSTOMER"
              readOnly={isReadOnly}
            />
          </Row>

        </div>

        {/* Bottom buttons */}
        <div className="im-btnbar">
          {!isView && (
            <button
              className={`im-btn ${primaryBtnCss}`}
              onClick={handlePrimaryAction}
              disabled={submitting || fetching || (isGridMode && selectedRow === null)}
            >
              {primaryBtnLabel}
            </button>
          )}
          <button
            className="im-btn im-btn-grey"
            onClick={() => { switchMode(mode); setStatus(null); }}
          >
            Clear All
          </button>
          <button
            className="im-btn im-btn-red"
            onClick={() => onNavigate?.('fd_bonds')}
          >
            Exit
          </button>
        </div>

        {/* ── Grid — shown for Modify, Delete, Authorise, View ── */}
        {isGridMode && (
          <RecordGrid
            records={records}
            selectedRow={selectedRow}
            onSelect={handleGridSelect}
            selBtnClass={selBtnClass}
            selRowClass={selRowClass}
          />
        )}

      </div>
    </>
  );
}