import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Home, ChevronRight, Search, Loader2 } from 'lucide-react';
import { getSecuritiesByProdCode, executeShiftingProcess } from '../../services/api';

// Styles moved outside component to prevent re-mounting and focus loss
const formGrid = {
  display: 'grid',
  gridTemplateColumns: '150px 200px 150px 200px 140px 200px',
  gap: '0', alignItems: 'center'
};
const labelStyle = {
  fontSize: '11px', fontWeight: 600, color: 'var(--navy)',
  textAlign: 'right', padding: '6px 8px 6px 4px', whiteSpace: 'nowrap'
};
const cellStyle = { padding: '4px 6px' };
const inputStyle = {
  width: '100%', padding: '5px 8px', fontSize: '11px',
  border: '1px solid var(--border)', borderRadius: '4px',
  background: 'var(--gray-50)', color: 'var(--navy)', boxSizing: 'border-box'
};
const selectStyle = { ...inputStyle, appearance: 'auto' };
const pinkStyle = { ...inputStyle, background: '#ffe0e0' };
const yellowStyle = { ...inputStyle, background: '#fff3cd' };
const thStyle = { padding: '6px 8px', textAlign: 'left', fontSize: '11px', whiteSpace: 'nowrap' };

const L = ({ children }) => <div style={labelStyle}>{children}</div>;
const C = ({ children, col }) => <div style={{ ...cellStyle, gridColumn: col || 'auto' }}>{children}</div>;
const Empty = () => <><div style={cellStyle}></div><div style={cellStyle}></div></>;
export default function CategoryShift() {
  const [form, setForm] = useState({
    id: '', secType: '', prodCode: '', tradeType: '', memberNo: '', memberName: '',
    users: '', userName: '', market: '', subMarket: '', orderNo: '',
    tradeDate: '', tradeTime: '', tradeNumber: '', settlementType: '',
    settlementDate: '', isin: '', genspec: '', security: '', maturityDate: '',
    amount: '', tradePrice: '', tradeRate: '', tradeYield: '', tradeAmount: '',
    lastIntDate: '', period: '', accruedInterest: '', settConsideration: '',
    calculatedInt: '', constituent: '', constituentNumber: '', purchaseBook: '',
    portfolio: '', accNo: '', recSrNo: '', mergeAll: false,
    counterType: '', holdingPositions: '', faceValue: '',
    category: '', averageAmt: '', accruedInt: '',
    slr: '', profitLossInt: '', recInt: '',
    shiftCategory: '', changeCategory: '',
    bookPrice: '', marketPrice: '', bookValue: '', newValue: '',
    shiftProfitLoss: '', shiftAccNo: '', shiftRecSrNo: ''
  });

  const [gridData, setGridData] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);
  const [gridError, setGridError] = useState('');
  const [gridSearch, setGridSearch] = useState('');
  const [lastSearchedProd, setLastSearchedProd] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const gridRef = useRef(null);

  const h = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setForm(p => {
      const updated = { ...p, [name]: finalValue };
      
      // Auto-calculate New Value when Market Price is entered
      if (name === 'marketPrice') {
        const mPrice = parseFloat(finalValue);
        const fValue = parseFloat(updated.faceValue);
        if (!isNaN(mPrice) && !isNaN(fValue)) {
          updated.newValue = (mPrice * (fValue / 100)).toFixed(2);
        } else {
          updated.newValue = '';
        }
      }
      
      return updated;
    });
  };

  // Fetch securities when ProdCode is entered
  const fetchSecurities = useCallback(async (code) => {
    if (!code || code.trim() === '' || code.trim() === lastSearchedProd) return;
    setGridLoading(true);
    setGridError('');
    setGridSearch('');
    setLastSearchedProd(code.trim());
    try {
      const data = await getSecuritiesByProdCode(code.trim());
      setGridData(data);
      if (data.length === 0) setGridError('No records found for this ProdCode.');
    } catch (err) {
      setGridError(err.message);
      setGridData([]);
    } finally {
      setGridLoading(false);
    }
  }, [lastSearchedProd]);

  // Auto-scroll to grid when data loads
  useEffect(() => {
    if (gridData.length > 0 && gridRef.current) {
      setTimeout(() => {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [gridData]);

  // ProdCode blur handler - triggers search
  const handleProdCodeBlur = () => {
    if (form.prodCode.trim() && form.prodCode.trim() !== lastSearchedProd) {
      fetchSecurities(form.prodCode);
    }
  };

  const handleProdCodeKeyDown = (e) => {
    if (e.key === 'Enter') {
      setLastSearchedProd(''); // force re-search
      fetchSecurities(form.prodCode);
    }
  };

  // Select a row from grid → fill form
  const handleSelectRow = (row) => {
    setForm(p => ({
      ...p,
      id: row.ID || row.id || '',
      secType: row.I_Type || '',
      tradeType: row.Trade_Type || '',
      memberNo: row.Member_Number || '',
      memberName: row.Member || '',
      users: row.Users || '',
      userName: row.User_Number || '',
      market: row.Market || '',
      subMarket: row.Sub_Market || '',
      orderNo: row.Order_Number || '',
      tradeDate: row.Trade_Date_FMT || row.Trade_Date || '',
      tradeTime: row.Trade_Time || '',
      tradeNumber: row.Trade_Number || '',
      settlementType: row.Settlement_Type || '',
      settlementDate: row.Settlement_Date_FMT || row.Settlement_Date || '',
      isin: row.ISIN || '',
      genspec: row.Genspec || '',
      security: row.NAME_GOI_SECURITY || row.Security || '',
      maturityDate: row.MATURITY_DATE_FMT || row.MATURITY_DATE || '',
      amount: row.Amount?.toString() || row.FACE_VALUE?.toString() || '',
      tradePrice: row.Trade_Price?.toString() || '',
      tradeRate: row.PURCHASE_RATE?.toString() || row.COUPON_RATE?.toString() || '',
      tradeYield: row.Trade_Yield?.toString() || '',
      tradeAmount: row.TRADE_AMOUNT?.toString() || '',
      lastIntDate: row.Last_Int_Date_FMT || row.Last_Interest_Payment_Date || '',
      period: row.Number_of_Broken_Period_Days?.toString() || '',
      accruedInterest: row.Accrued_Interest?.toString() || '',
      settConsideration: row.Sett_Consideration?.toString() || '',
      calculatedInt: row.accrud_Int?.toString() || '',
      constituent: row.Constituent || '',
      constituentNumber: row.Constituent_Number || '',
      purchaseBook: row.BOOK_VALUE?.toString() || '',
      portfolio: row.Portfolio || '',
      accNo: row.ACCNO?.toString() || '',
      recSrNo: row.RecSrno?.toString() || '',
      counterType: row.CounterParty || '',
      holdingPositions: row.FACE_VALUE?.toString() || '',
      faceValue: row.FACE_VALUE?.toString() || '',
      category: row.CATEGORIES || row.Category || row.Portfolio || '',
      averageAmt: row.PURCHASE_AMOUNT?.toString() || '',
      accruedInt: row.Accrued_Interest?.toString() || '',
      slr: row.SLRType || '',
      profitLossInt: '',
      recInt: row.accrud_Int?.toString() || '',
      bookPrice: row.BOOK_VALUE?.toString() || '',
      bookValue: row.BOOK_VALUE?.toString() || '',
      marketPrice: '',
      newValue: '',
      shiftCategory: row.CATEGORIES || row.Category || row.Portfolio || '',
      changeCategory: '',
      shiftProfitLoss: '',
      shiftAccNo: row.ACCNO?.toString() || '',
      shiftRecSrNo: row.RECSRNO?.toString() || row.RecSrno?.toString() || ''
    }));
    // Scroll back to form top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter grid data based on search
  const filteredGrid = gridData.filter(row => {
    if (!gridSearch.trim()) return true;
    const q = gridSearch.toLowerCase();
    return Object.values(row).some(v =>
      v != null && v.toString().toLowerCase().includes(q)
    );
  });

  const handleSubmit = async () => {
    if (!form.id) {
      setSubmitMessage({ type: 'error', text: 'Please select a record from the grid first.' });
      return;
    }
    if (!form.marketPrice || !form.newValue || !form.changeCategory) {
      setSubmitMessage({ type: 'error', text: 'Market Price, New Value, and Change Category are required fields.' });
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);
    try {
      const data = {
        id: form.id,
        marketPrice: parseFloat(form.marketPrice),
        marketValue: parseFloat(form.newValue),
        classification: form.changeCategory
      };
      const res = await executeShiftingProcess(data);
      if (res.success) {
        setSubmitMessage({ type: 'success', text: 'Shifting process completed successfully!' });
      } else {
        setSubmitMessage({ type: 'error', text: res.message || 'Failed to process shifting.' });
      }
    } catch (err) {
      setSubmitMessage({ type: 'error', text: err.message || 'An error occurred during submission.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--navy)', fontSize: '18px', margin: 0 }}>
          Shifting Process
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--gray-400)' }}>
          <Home size={12} /> Home <ChevronRight size={12} /> G-Sec <ChevronRight size={12} />
          <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Category Shift</span>
        </div>
      </div>

      {/* Main Form */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5a8c)', padding: '8px 14px' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>Shifting Process</span>
        </div>

        <div style={{ ...formGrid, padding: '6px 2px' }}>
          {/* Row 1 */}
          <L>Sec Type*</L>
          <C><select style={selectStyle} name="secType" value={form.secType} onChange={h}>
            <option value="">--Select--</option>
            <option>Central Goverment Sec</option><option>State Goverment Sec</option>
          </select></C>
          <L>ProdCode*</L>
          <C>
            <input
              style={inputStyle}
              name="prodCode"
              value={form.prodCode}
              onChange={h}
              onBlur={handleProdCodeBlur}
              onKeyDown={handleProdCodeKeyDown}
              placeholder="Type code & click away"
            />
          </C>
          <Empty />

          {/* Row 2 */}
          <L>Trade_Type*</L>
          <C><input style={inputStyle} name="tradeType" value={form.tradeType} onChange={h} disabled /></C>
          <Empty /><Empty />

          {/* Row 3 */}
          <L>Member*</L>
          <C><input style={inputStyle} name="memberNo" value={form.memberNo} onChange={h} placeholder="Member No" disabled /></C>
          <C col="3 / 5"><input style={inputStyle} name="memberName" value={form.memberName} onChange={h} placeholder="member Name" disabled /></C>
          <Empty />

          {/* Row 4 */}
          <L>Users*</L>
          <C><input style={inputStyle} name="users" value={form.users} onChange={h} disabled /></C>
          <C col="3 / 5"><input style={inputStyle} name="userName" value={form.userName} onChange={h} placeholder="UserName" disabled /></C>
          <Empty />

          {/* Row 5 */}
          <L>Market*</L>
          <C><input style={inputStyle} name="market" value={form.market} onChange={h} disabled /></C>
          <L>SubMarket*</L>
          <C><input style={inputStyle} name="subMarket" value={form.subMarket} onChange={h} disabled /></C>
          <Empty />

          {/* Row 6 */}
          <L>Order No*</L>
          <C><input style={inputStyle} name="orderNo" value={form.orderNo} onChange={h} disabled /></C>
          <L>Trade_Date*</L>
          <C><input style={inputStyle} name="tradeDate" value={form.tradeDate} onChange={h} disabled /></C>
          <L>Trade_Time</L>
          <C><input style={inputStyle} name="tradeTime" value={form.tradeTime} onChange={h} disabled /></C>

          {/* Row 7 */}
          <L>Trade_Number*</L>
          <C><input style={inputStyle} name="tradeNumber" value={form.tradeNumber} onChange={h} disabled /></C>
          <Empty /><Empty />

          {/* Row 8 */}
          <L>Settlement_Type*</L>
          <C><input style={inputStyle} name="settlementType" value={form.settlementType} onChange={h} disabled /></C>
          <L>Settlement_Date*</L>
          <C><input style={inputStyle} name="settlementDate" value={form.settlementDate} onChange={h} type="date" disabled /></C>
          <Empty />

          {/* Row 9 */}
          <L>ISIN*</L>
          <C><input style={inputStyle} name="isin" value={form.isin} onChange={h} disabled /></C>
          <L>Genspec*</L>
          <C><input style={inputStyle} name="genspec" value={form.genspec} onChange={h} disabled /></C>
          <Empty />

          {/* Row 10 */}
          <L>Security*</L>
          <C><input style={inputStyle} name="security" value={form.security} onChange={h} disabled /></C>
          <L>Maturity_Date*</L>
          <C><input style={inputStyle} name="maturityDate" value={form.maturityDate} onChange={h} disabled /></C>
          <Empty />

          {/* Row 11 */}
          <L>Amount*</L>
          <C><input style={inputStyle} name="amount" value={form.amount} onChange={h} disabled /></C>
          <L>Trade_Price*</L>
          <C><input style={inputStyle} name="tradePrice" value={form.tradePrice} onChange={h} disabled /></C>
          <L>Trade_Rate*</L>
          <C><input style={inputStyle} name="tradeRate" value={form.tradeRate} onChange={h} disabled /></C>

          {/* Row 12 */}
          <L>Trade_Yield*</L>
          <C><input style={inputStyle} name="tradeYield" value={form.tradeYield} onChange={h} disabled /></C>
          <L>Trade_Amount*</L>
          <C><input style={inputStyle} name="tradeAmount" value={form.tradeAmount} onChange={h} disabled /></C>
          <Empty />

          {/* Row 13 */}
          <L>LastIntDate*</L>
          <C><input style={inputStyle} name="lastIntDate" value={form.lastIntDate} onChange={h} type="date" disabled /></C>
          <L>Period*</L>
          <C><input style={inputStyle} name="period" value={form.period} onChange={h} disabled /></C>
          <Empty />

          {/* Row 14 */}
          <L>Accrued_Interest*</L>
          <C><input style={inputStyle} name="accruedInterest" value={form.accruedInterest} onChange={h} disabled /></C>
          <L>Sett_Consideration*</L>
          <C><input style={inputStyle} name="settConsideration" value={form.settConsideration} onChange={h} disabled /></C>
          <L>Calculated_Int*</L>
          <C><input style={inputStyle} name="calculatedInt" value={form.calculatedInt} onChange={h} disabled /></C>

          {/* Row 15 */}
          <L>Constituent*</L>
          <C><input style={inputStyle} name="constituent" value={form.constituent} onChange={h} disabled /></C>
          <L>Constituent_Number*</L>
          <C><input style={inputStyle} name="constituentNumber" value={form.constituentNumber} onChange={h} disabled /></C>
          <L>Purchase Book*</L>
          <C><input style={inputStyle} name="purchaseBook" value={form.purchaseBook} onChange={h} disabled /></C>

          {/* Row 16 */}
          <L>Portfolio*</L>
          <C><input style={inputStyle} name="portfolio" value={form.portfolio} onChange={h} disabled /></C>
          <Empty /><Empty />

          {/* Row 17 */}
          <L>AccNo*</L>
          <C><input style={inputStyle} name="accNo" value={form.accNo} onChange={h} disabled /></C>
          <L>Rec SrNo*</L>
          <C><input style={inputStyle} name="recSrNo" value={form.recSrNo} onChange={h} disabled /></C>
          <C col="5 / 7">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--navy)', cursor: 'pointer' }}>
              <input type="radio" name="mergeAll" checked={form.mergeAll} onChange={() => setForm(p => ({...p, mergeAll: !p.mergeAll}))} /> Merge All
            </label>
          </C>

          {/* Row 18 */}
          <L>Counter Type*</L>
          <C><select style={selectStyle} name="counterType" disabled value={form.counterType} onChange={h}>
            <option value="">--Select--</option>
            <option>CounterParty1</option><option>NDS-OM</option>
          </select></C>
          <L>Holding Positions*</L>
          <C><input style={pinkStyle} name="holdingPositions" value={form.holdingPositions} onChange={h} disabled /></C>
          <L>Face Value*</L>
          <C><input style={inputStyle} name="faceValue" value={form.faceValue} onChange={h} disabled /></C>

          {/* Row 19 */}
          <L>Category*</L>
          <C><select style={selectStyle} name="category" disabled value={form.category} onChange={h}>
            <option value="">--Select--</option>
            <option>AFS</option><option>HTM</option><option>HFT</option>
          </select></C>
          <L>Average Amt*</L>
          <C><input style={pinkStyle} name="averageAmt" value={form.averageAmt} onChange={h} disabled /></C>
          <L>Accrued Int*</L>
          <C><input style={inputStyle} name="accruedInt" value={form.accruedInt} onChange={h} disabled /></C>

          {/* Row 20 */}
          <L>SLR*</L>
          <C><select style={selectStyle} name="slr" disabled value={form.slr} onChange={h}>
            <option value="">--Select--</option>
            <option>SLR</option><option>Non SLR</option>
          </select></C>
          <L>Profit / Loss Int*</L>
          <C><input style={pinkStyle} name="profitLossInt" value={form.profitLossInt} onChange={h} disabled /></C>
          <L>Rec. Int*</L>
          <C><input style={inputStyle} name="recInt" value={form.recInt} onChange={h} disabled /></C>
        </div>
      </div>

      {/* Shifting Details */}
      <div className="card" style={{ marginTop: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ color: 'var(--danger)', fontWeight: 700, fontSize: '12px' }}>Shifting Details :</span>
        </div>
        <div style={{ ...formGrid, padding: '6px 2px' }}>
          <L>Category*</L>
          <C><select style={selectStyle} name="shiftCategory" disabled value={form.shiftCategory} onChange={h}>
            <option value="">--Select--</option>
            <option>AFS</option><option>HTM</option><option>HFT</option>
          </select></C>
          <L>Change Category*</L>
          <C><select style={selectStyle} name="changeCategory" value={form.changeCategory} onChange={h}>
            <option value="">--Select--</option>
            <option>AFS</option><option>HTM</option><option>HFT</option>
          </select></C>
          <Empty />

          <L>Book Price</L>
          <C><input style={inputStyle} name="bookPrice" value={form.bookPrice} onChange={h} disabled /></C>
          <L>Market Price</L>
          <C><input style={inputStyle} name="marketPrice" value={form.marketPrice} onChange={h} /></C>
          <Empty />

          <L>Book Value</L>
          <C><input style={yellowStyle} name="bookValue" value={form.bookValue} onChange={h} disabled /></C>
          <L>New Value</L>
          <C><input style={inputStyle} name="newValue" value={form.newValue} onChange={h} /></C>
          <Empty />

          <L>Profit/Loss Int</L>
          <C><input style={yellowStyle} name="shiftProfitLoss" value={form.shiftProfitLoss} onChange={h} disabled /></C>
          <L>Acc No</L>
          <C><input style={inputStyle} name="shiftAccNo" value={form.shiftAccNo} onChange={h} /></C>
          <L>RecSrNo</L>
          <C><input style={inputStyle} name="shiftRecSrNo" value={form.shiftRecSrNo} onChange={h} /></C>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px', borderTop: '1px solid #e8ecf0' }}>
          {submitMessage && (
            <div style={{
              marginBottom: '10px', fontSize: '12px', padding: '8px 16px', borderRadius: '4px',
              backgroundColor: submitMessage.type === 'error' ? '#fee2e2' : '#dcfce7',
              color: submitMessage.type === 'error' ? '#991b1b' : '#166534',
              border: `1px solid ${submitMessage.type === 'error' ? '#f87171' : '#86efac'}`
            }}>
              {submitMessage.text}
            </div>
          )}
          <button 
            className="topbar-btn btn-gold" 
            onClick={handleSubmit}
            disabled={submitting}
            style={{ padding: '8px 32px', fontWeight: 700, fontSize: '12px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? (
              <><Loader2 size={13} className="lucide-spin" style={{ marginRight: '6px' }} /> Processing...</>
            ) : (
              <><Send size={13} style={{ marginRight: '6px' }} /> Submit</>
            )}
          </button>
        </div>
      </div>

      {/* Securities Grid */}
      {(gridData.length > 0 || gridLoading || gridError) && (
        <div ref={gridRef} className="card" style={{ marginTop: '12px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #2d6a4f, #40916c)', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>
              Securities for ProdCode: {form.prodCode} ({filteredGrid.length} of {gridData.length} records)
            </span>
            {/* Grid Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={13} color="#fff" />
              <input
                type="text"
                placeholder="Search in grid..."
                value={gridSearch}
                onChange={(e) => setGridSearch(e.target.value)}
                style={{
                  padding: '4px 10px', fontSize: '11px', borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)',
                  color: '#fff', width: '200px', outline: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ padding: '0', overflowX: 'auto', maxHeight: '350px', overflowY: 'auto' }}>
            {gridLoading && (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--navy)' }}>
                <Loader2 size={20} /> Loading...
              </div>
            )}
            {gridError && <div style={{ color: 'var(--danger)', fontSize: '11px', padding: '10px' }}>{gridError}</div>}
            {filteredGrid.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ background: 'var(--navy)', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>
                    <th style={thStyle}>Action</th>
                    <th style={thStyle}>ISIN</th>
                    <th style={thStyle}>Security</th>
                    <th style={thStyle}>Acc No</th>
                    <th style={thStyle}>RecSrNo</th>
                    <th style={thStyle}>Purchase Date</th>
                    <th style={thStyle}>Maturity Date</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Face Value</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Rate</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>SLR</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrid.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e8ecf0', background: i % 2 === 0 ? '#fff' : '#f8f9fa', cursor: 'pointer' }}
                      onDoubleClick={() => handleSelectRow(row)}>
                      <td style={{ padding: '5px 8px' }}>
                        <button
                          onClick={() => handleSelectRow(row)}
                          style={{
                            padding: '3px 12px', fontSize: '10px', fontWeight: 700,
                            background: 'var(--gold)', color: 'var(--navy)', border: 'none',
                            borderRadius: '3px', cursor: 'pointer'
                          }}
                        >Select</button>
                      </td>
                      <td style={{ padding: '5px 8px' }}>{row.ISIN}</td>
                      <td style={{ padding: '5px 8px' }}>{row.Security}</td>
                      <td style={{ padding: '5px 8px' }}>{row.ACCNO}</td>
                      <td style={{ padding: '5px 8px' }}>{row.RECSRNO}</td>
                      <td style={{ padding: '5px 8px' }}>{row.DATE_PURCHASE}</td>
                      <td style={{ padding: '5px 8px' }}>{row.MATURITY_DATE}</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right' }}>{Number(row.FACE_VALUE).toLocaleString()}</td>
                      <td style={{ padding: '5px 8px', textAlign: 'right' }}>{row.PURCHASE_RATE || row.COUPON_RATE}</td>
                      <td style={{ padding: '5px 8px' }}>{row.CATEGORIES}</td>
                      <td style={{ padding: '5px 8px' }}>{row.SLRType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '10px' }}>
        AVS InSoTech Private Limited | Investment & Treasury Management System — G-Sec Module v1.0 | © 2026
      </div>

      <style>{`
        /* Remove harsh browser focus outline and replace with subtle glow */
        input:focus, select:focus {
          outline: none !important;
          border-color: #93c5fd !important;
          box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.3) !important;
          background: #fff !important;
        }
      `}</style>
    </div>
  );
}
