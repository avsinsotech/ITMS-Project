import React, { useState } from 'react';

/* ── Sample bank data ── */
const BANKS = [
  { subgl: '102', acNo: '1', bank: 'AXIS BANK' },
  { subgl: '102', acNo: '2', bank: 'AXIS BANK' },
  { subgl: '103', acNo: '1', bank: 'DCB BANK LTD' },
  { subgl: '103', acNo: '2', bank: 'DCB BANK LTD' },
  { subgl: '103', acNo: '3', bank: 'DCB BANK LTD' },
  { subgl: '104', acNo: '1', bank: 'EQUITAS SMALL FINANCE BANK LTD.' },
  { subgl: '104', acNo: '2', bank: 'EQUITAS SMALL FINANCE BANK LTD.' },
  { subgl: '104', acNo: '3', bank: 'EQUITAS SMALL FINANCE BANK LTD.' },
  { subgl: '104', acNo: '4', bank: 'EQUITAS SMALL FINANCE BANK LTD.' },
  { subgl: '104', acNo: '5', bank: 'EQUITAS SMALL FINANCE BANK LTD.' },
];

const PAGE_SIZE = 8;

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
  }
  .tr-actionbar {
    background: #dce8f5; border-bottom: 1px solid #b0c4de;
    padding: 5px 10px; display: flex; align-items: center;
    justify-content: space-between; flex-shrink: 0; gap: 8px;
  }
  .tr-activity {
    font-size: 11.5px; color: #222; font-weight: 600; white-space: nowrap;
  }
  .tr-form {
    padding: 10px 14px 8px; border: 1px solid #c8d8ee;
    margin: 8px; border-radius: 2px; background: #fff;
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
  .tr-input.shaded { background: #edf3fb; }
  .tr-input[readonly] { background: #f3f6fb; color: #555; cursor: default; }
  .tr-input.pay-readonly { background: #fce8e8; color: #555; cursor: default; }
  .tr-select-w { width: 110px; flex-shrink: 0; }
  .tr-w70  { width: 70px;  flex-shrink: 0; }
  .tr-w90  { width: 90px;  flex-shrink: 0; }
  .tr-w110 { width: 110px; flex-shrink: 0; }
  .tr-w130 { width: 130px; flex-shrink: 0; }
  .tr-w160 { width: 160px; flex-shrink: 0; }
  .tr-w200 { width: 200px; flex-shrink: 0; }
  .tr-grow { flex: 1; min-width: 0; }
  .tr-inline-lbl {
    font-size: 12px; color: #222; white-space: nowrap;
    flex-shrink: 0; padding: 0 4px;
  }
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
  }
  .tr-btn-blue   { background: #1565c0; color: #fff; }
  .tr-btn-blue:hover   { background: #0d47a1; }
  .tr-btn-green  { background: #2e7d32; color: #fff; }
  .tr-btn-green:hover  { background: #1b5e20; }
  .tr-btn-grey   { background: #d0d8e4; color: #333; }
  .tr-btn-grey:hover   { background: #b8c4d4; }
  .tr-btn-red    { background: #e53935; color: #fff; }
  .tr-btn-red:hover    { background: #b71c1c; }

  /* ── Table ── */
  .tr-tbl-wrap {
    margin: 0 8px 8px; border: 1px solid #b0c4de; border-radius: 2px; overflow: hidden;
  }
  .tr-tbl-hdr {
    background: #dce8f5; border-bottom: 1px solid #b0c4de;
    padding: 5px 10px; font-size: 11.5px; font-weight: 700;
    color: #1a3a6b; text-transform: uppercase; letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 8px;
  }
  .tr-tbl-badge {
    background: #b0c4de; color: #1a3a6b; font-size: 10px;
    font-weight: 700; padding: 1px 7px; border-radius: 8px;
  }
  table.tr-tbl { width: 100%; border-collapse: collapse; font-size: 12px; }
  table.tr-tbl thead tr { background: #1565c0; }
  table.tr-tbl thead th {
    padding: 6px 12px; text-align: left; color: #fff;
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; white-space: nowrap;
  }
  table.tr-tbl tbody tr { border-bottom: 1px solid #eef1f8; cursor: pointer; }
  table.tr-tbl tbody tr:nth-child(even) { background: #f3f6fb; }
  table.tr-tbl tbody tr:nth-child(odd)  { background: #fff; }
  table.tr-tbl tbody tr.selected        { background: #dce8f5 !important; outline: 1px solid #1565c0; }
  table.tr-tbl tbody tr:hover           { background: #eaf1fb !important; }
  table.tr-tbl tbody td { padding: 6px 12px; color: #222; }
  table.tr-tbl tbody td.mono { font-family: monospace; font-weight: 700; color: #1565c0; }

  .tr-sel-btn {
    width: 22px; height: 22px; border: 1px solid #90aac8;
    border-radius: 3px; background: #eaf1fb; color: #1565c0;
    font-size: 15px; font-weight: 700; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
  }
  .tr-sel-btn.sel { background: #1565c0; color: #fff; border-color: #0d47a1; }

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
  .tr-srch-ic {
    position: absolute; right: 6px; top: 50%;
    transform: translateY(-50%); font-size: 11px; color: #888; pointer-events: none;
  }

  .tr-mode-badge {
    display: inline-block; font-size: 10px; font-weight: 700;
    padding: 2px 8px; border-radius: 2px; margin-left: 6px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .tr-mode-badge.create { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
  .tr-mode-badge.modify { background: #fff3e0; color: #e65100; border: 1px solid #ffcc80; }
`;

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

const EMPTY_FORM = {
  productCode: '', productName: '', accountNo: '', customerName: '',
  custNo: '', asOfDate: new Date().toLocaleDateString('en-CA'),
  interestPayout: '', depositAmount: '', period: '', periodUnit: 'Months',
  interestRate: '', interestAmount: '', maturityAmount: '', dueDate: '',
  paymentMode: '',
  // payment sub-fields
  paymentNaration: '', paymentAmount: '',
  payProductCode: '', payProductName: '',
  payAccNo: '', payCustName: '', payBalance: '',
  instrumentNo: '', instrumentDate: new Date().toLocaleDateString('en-CA'),
};

// Default naration by mode
const NARATION_DEFAULTS = {
  Cash: 'By Cash',
  Transfer: 'By TRF',
  Cheque: 'TRANSFER',
  PO: '',
};

export default function TermDepositReceipt({ onNavigate }) {
  const [mode, setMode]               = useState('create');
  const [form, setForm]               = useState(EMPTY_FORM);
  const [page, setPage]               = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  const totalPages = Math.ceil(BANKS.length / PAGE_SIZE);
  const pagedBanks = BANKS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  // When payment mode changes, reset sub-fields and set default naration
  const handlePaymentModeChange = (e) => {
    const val = e.target.value;
    setForm(f => ({
      ...f,
      paymentMode: val,
      paymentNaration: NARATION_DEFAULTS[val] ?? '',
      paymentAmount: '',
      payProductCode: '', payProductName: '',
      payAccNo: '', payCustName: '', payBalance: '',
      instrumentNo: '', instrumentDate: new Date().toLocaleDateString('en-CA'),
    }));
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setSelectedRow(null);
    setSelectedBank(null);
    setMode('create');
  };

  const handleSelect = (bank, absIdx) => {
    if (selectedRow === absIdx) {
      setSelectedRow(null);
      setSelectedBank(null);
      setForm(EMPTY_FORM);
      setMode('create');
      return;
    }
    setSelectedRow(absIdx);
    setSelectedBank(bank);
    setMode('modify');
    setForm(f => ({
      ...f,
      productCode:  bank.subgl,
      productName:  bank.bank,
      accountNo:    bank.acNo,
      customerName: '',
      custNo:       '',
    }));
  };

  const handleSubmit = () => {
    alert('Record submitted successfully.');
    handleClear();
  };

  const handleModify = () => {
    alert(`Record ${selectedBank?.subgl} / Acc ${selectedBank?.acNo} updated successfully.`);
    handleClear();
  };

  const isModify = mode === 'modify';
  const pm = form.paymentMode;

  return (
    <>
      <style>{css}</style>
      <div className="tr-wrap">

        {/* ── Title ── */}
        <div className="tr-title">
          Investment Receipt
          <span className={`tr-mode-badge ${isModify ? 'modify' : 'create'}`}>
            {isModify ? '✎ Modify Mode' : '+ Create Mode'}
          </span>
        </div>

        {/* ── Action bar ── */}
        <div className="tr-actionbar">
          <div className="tr-activity">
            {isModify
              ? `Modifying: SubGL ${selectedBank?.subgl} | A/C ${selectedBank?.acNo} | ${selectedBank?.bank}`
              : 'Term Deposit — Create & Review'}
          </div>
          <div style={{ fontSize: 11, color: '#555' }}>
            {isModify
              ? 'Select a different row to switch record, or Clear to exit modify mode.'
              : 'Click + on any row below to modify that record.'}
          </div>
        </div>

        {/* ── Form ── */}
        <div className="tr-form">

          {/* Account Information */}
          <div className="tr-sec-hdr">Account Information</div>

          <Row label="Product Code" required>
            <input
              className={`tr-input tr-w90${isModify ? ' shaded' : ''}`}
              placeholder="e.g. 102"
              value={form.productCode}
              onChange={set('productCode')}
              readOnly={isModify}
            />
            <div className="tr-srch-wrap">
              <input
                className="tr-input"
                placeholder="Search Product Name"
                value={form.productName}
                onChange={set('productName')}
                style={{ width: '100%', paddingRight: 22 }}
              />
              <span className="tr-srch-ic">🔍</span>
            </div>
          </Row>

          <Row label="Account No" required>
            <input
              className={`tr-input tr-w110${isModify ? ' shaded' : ''}`}
              placeholder="Account No"
              value={form.accountNo}
              onChange={set('accountNo')}
              readOnly={isModify}
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
              onChange={set('asOfDate')}
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

          {/* Deposit Details */}
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
              className="tr-input tr-grow"
              type="date"
              value={form.dueDate}
              onChange={set('dueDate')}
            />
          </Row>

          <hr className="tr-divider" />

          {/* ── Payment ── */}
          <div className="tr-sec-hdr">Payment</div>

          {/* Payment Mode — always visible */}
          <Row label="Payment Mode" required>
            <select
              className="tr-select tr-w160"
              value={form.paymentMode}
              onChange={handlePaymentModeChange}
            >
              <option value="">-- Select --</option>
              <option value="Cash">Cash</option>
              <option value="PO">PO</option>
              <option value="Cheque">Cheque</option>
              <option value="Transfer">Transfer</option>
            </select>
          </Row>

          {/* ── CASH: Naration + Amount ── */}
          {pm === 'Cash' && (
            <Row label="Naration" required>
              <input
                className="tr-input tr-w200"
                value={form.paymentNaration}
                onChange={set('paymentNaration')}
              />
              <span className="tr-inline-lbl">
                Amount <span style={{ color: '#d32f2f' }}>*</span>
              </span>
              <input
                className="tr-input tr-w130 pay-readonly"
                placeholder="0"
                value={form.paymentAmount}
                onChange={set('paymentAmount')}
              />
            </Row>
          )}

          {/* ── TRANSFER: Product Code/Name + Acc No/Cust Name + Balance + Naration + Amount ── */}
          {pm === 'Transfer' && (
            <>
              <Row label="Product Code" required>
                <input
                  className="tr-input tr-w110"
                  placeholder="Product Code"
                  value={form.payProductCode}
                  onChange={set('payProductCode')}
                />
                <div className="tr-srch-wrap">
                  <input
                    className="tr-input"
                    placeholder="Search Product Name"
                    value={form.payProductName}
                    onChange={set('payProductName')}
                    style={{ width: '100%', paddingRight: 22 }}
                  />
                  <span className="tr-srch-ic">🔍</span>
                </div>
              </Row>
              <Row label="Acc No / Name" required>
                <input
                  className="tr-input tr-w110"
                  placeholder="Account Number"
                  value={form.payAccNo}
                  onChange={set('payAccNo')}
                />
                <div className="tr-srch-wrap">
                  <input
                    className="tr-input"
                    placeholder="Search Customer Name"
                    value={form.payCustName}
                    onChange={set('payCustName')}
                    style={{ width: '100%', paddingRight: 22 }}
                  />
                  <span className="tr-srch-ic">🔍</span>
                </div>
                <span className="tr-inline-lbl">
                  Balance <span style={{ color: '#d32f2f' }}>*</span>
                </span>
                <input
                  className="tr-input tr-w110"
                  placeholder="Balance"
                  value={form.payBalance}
                  readOnly
                />
              </Row>
              <Row label="Naration" required>
                <input
                  className="tr-input tr-w200"
                  value={form.paymentNaration}
                  onChange={set('paymentNaration')}
                />
                <span className="tr-inline-lbl">
                  Amount <span style={{ color: '#d32f2f' }}>*</span>
                </span>
                <input
                  className="tr-input tr-w130 pay-readonly"
                  placeholder="0"
                  value={form.paymentAmount}
                  onChange={set('paymentAmount')}
                />
              </Row>
            </>
          )}

          {/* ── CHEQUE: Product Code/Name + Acc No/Cust Name + Balance + Instrument No/Date + Naration + Amount ── */}
          {pm === 'Cheque' && (
            <>
              <Row label="Product Code" required>
                <input
                  className="tr-input tr-w110"
                  placeholder="Product Code"
                  value={form.payProductCode}
                  onChange={set('payProductCode')}
                />
                <div className="tr-srch-wrap">
                  <input
                    className="tr-input"
                    placeholder="Search Product Name"
                    value={form.payProductName}
                    onChange={set('payProductName')}
                    style={{ width: '100%', paddingRight: 22 }}
                  />
                  <span className="tr-srch-ic">🔍</span>
                </div>
              </Row>
              <Row label="Acc No / Name" required>
                <input
                  className="tr-input tr-w110"
                  placeholder="Account Number"
                  value={form.payAccNo}
                  onChange={set('payAccNo')}
                />
                <div className="tr-srch-wrap">
                  <input
                    className="tr-input"
                    placeholder="Search Customer Name"
                    value={form.payCustName}
                    onChange={set('payCustName')}
                    style={{ width: '100%', paddingRight: 22 }}
                  />
                  <span className="tr-srch-ic">🔍</span>
                </div>
                <span className="tr-inline-lbl">
                  Balance <span style={{ color: '#d32f2f' }}>*</span>
                </span>
                <input
                  className="tr-input tr-w110"
                  placeholder="Balance"
                  value={form.payBalance}
                  readOnly
                />
              </Row>
              <Row label="Instrument No" required>
                <input
                  className="tr-input tr-w160"
                  placeholder="CHEQUE NUMBER"
                  value={form.instrumentNo}
                  onChange={set('instrumentNo')}
                />
                <span className="tr-inline-lbl">
                  Instrument Date <span style={{ color: '#d32f2f' }}>*</span>
                </span>
                <input
                  className="tr-input tr-grow"
                  type="date"
                  value={form.instrumentDate}
                  onChange={set('instrumentDate')}
                />
              </Row>
              <Row label="Naration" required>
                <input
                  className="tr-input tr-w200"
                  value={form.paymentNaration}
                  onChange={set('paymentNaration')}
                />
                <span className="tr-inline-lbl">
                  Amount <span style={{ color: '#d32f2f' }}>*</span>
                </span>
                <input
                  className="tr-input tr-w130 pay-readonly"
                  placeholder="0"
                  value={form.paymentAmount}
                  onChange={set('paymentAmount')}
                />
              </Row>
            </>
          )}

          {/* PO: no additional fields */}

        </div>

        {/* ── Bottom Buttons ── */}
        <div className="tr-btnbar">
          {isModify ? (
            <button className="tr-btn tr-btn-green" onClick={handleModify}>
              ✎ Modify
            </button>
          ) : (
            <button className="tr-btn tr-btn-blue" onClick={handleSubmit}>
              Submit
            </button>
          )}
          <button className="tr-btn tr-btn-grey" onClick={handleClear}>Clear All</button>
          <button className="tr-btn tr-btn-red" onClick={() => onNavigate?.('fd_bonds')}>Exit</button>
        </div>

        {/* ── Bank Accounts Table ── */}
        <div className="tr-tbl-wrap">
          <div className="tr-tbl-hdr">
            Bank Accounts
            <span className="tr-tbl-badge">{BANKS.length} records</span>
            {isModify && (
              <span style={{
                marginLeft: 'auto', fontSize: 10, color: '#e65100',
                fontWeight: 700, fontStyle: 'italic',
              }}>
                ✎ Modifying row {selectedRow + 1}
              </span>
            )}
          </div>

          <table className="tr-tbl">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>SUBGL Code</th>
                <th>A/C No</th>
                <th>Bank Name</th>
              </tr>
            </thead>
            <tbody>
              {pagedBanks.map((row, i) => {
                const absIdx = (page - 1) * PAGE_SIZE + i;
                const isSel  = selectedRow === absIdx;
                return (
                  <tr
                    key={absIdx}
                    className={isSel ? 'selected' : ''}
                    onClick={() => handleSelect(row, absIdx)}
                  >
                    <td>
                      <button
                        className={`tr-sel-btn${isSel ? ' sel' : ''}`}
                        onClick={e => { e.stopPropagation(); handleSelect(row, absIdx); }}
                        title={isSel ? 'Deselect' : 'Select to modify'}
                      >
                        {isSel ? '✓' : '+'}
                      </button>
                    </td>
                    <td className="mono">{row.subgl}</td>
                    <td>{row.acNo}</td>
                    <td>{row.bank}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="tr-pagination">
            <span>
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, BANKS.length)} of {BANKS.length}
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
                >
                  {p}
                </button>
              ))}
              <button
                className="tr-pg-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >›</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}