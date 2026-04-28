import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
    Briefcase, Loader2, ArrowLeft, ShieldCheck, CheckCircle2,
    TrendingDown, Trash2, FileSpreadsheet, Search, Filter,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { getPurchases, authorizePurchases, deletePurchase, uploadPurchaseExcel, getPurchasesByPostset, getProductCode } from '../../services/api';

export default function GSecSell({ onNavigate }) {
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'authorized'

    // -- AUTHORIZED DEALS STATE --
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('list');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isAuthorizing, setIsAuthorizing] = useState(false);

    // -- VOUCHER VIEW STATE --
    const [searchPostset, setSearchPostset] = useState('');
    const [voucherRecords, setVoucherRecords] = useState([]);

    // -- PAGINATION STATE --
    const ROWS_PER_PAGE = 9;
    const [uploadPage, setUploadPage] = useState(1);
    const [authPage, setAuthPage] = useState(1);

    // -- EXCEL UPLOAD STATE --
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const [headers, setHeaders] = useState([]);

    // -- TRADE TYPE FILTER --
    const [tradeTypeFilter, setTradeTypeFilter] = useState('SELL');

    // -- FETCH AUTHORIZED DEALS --
    const fetchAuthorizedDeals = async () => {
        try {
            setLoading(true);
            const data = await getPurchases();
            const filtered = data.filter(r => {
                const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
                const stageVal = stageKey ? String(r[stageKey]).trim() : '';
                const estatus = r.Estatus ? String(r.Estatus).trim() : '';
                return stageVal === '1003' || estatus === '2';
            });
            setRecords(filtered);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUploadDeals = async () => {
        try {
            setLoading(true);
            const data = await getPurchases();
            const filtered = data.filter(r => {
                const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
                const stageVal = stageKey ? String(r[stageKey]).trim() : '';
                return stageVal === '1001';
            });

            const uploadTime = new Date().toLocaleString();
            const syncedData = filtered.map((r, i) => ({
                ...r,
                __id: `DB-${r.id || i}`,
                "Upload Time": r.Entrydate ? new Date(r.Entrydate).toLocaleString() : uploadTime,
                "Source File": (r.FileName || r.filename) || 'Database'
            }));

            setExcelData(syncedData);
            if (syncedData.length > 0) {
                const allKeys = new Set(['Acc_No']);
                syncedData.forEach(row => {
                    Object.keys(row).forEach(k => {
                        if (k !== 'id' && !k.startsWith('__')) allKeys.add(k);
                    });
                });
                setHeaders(Array.from(allKeys));
            }
        } catch (err) {
            console.error("Fetch upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'authorized') {
            fetchAuthorizedDeals();
        } else if (activeTab === 'upload') {
            fetchUploadDeals();
        }
    }, [activeTab]);

    // -- VOUCHER LOGIC --
    const handleSearchVoucher = async () => {
        if (!searchPostset.trim()) return;
        setLoading(true);
        try {
            const data = await getPurchasesByPostset(searchPostset.trim());
            setVoucherRecords(data);
        } catch (err) {
            console.error("Voucher search error:", err);
            alert("Error fetching voucher data. Please check the Set Number.");
        } finally {
            setLoading(false);
        }
    };

    // -- UPLOAD LOGIC --
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            setIsScanning(true);

            try {
                await uploadPurchaseExcel(file);

                const dbRecords = await getPurchases();
                const filteredRecords = dbRecords.filter(r => {
                    const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
                    const stageVal = stageKey ? String(r[stageKey]).trim() : '';
                    return stageVal === '1001';
                });

                const uploadTime = new Date().toLocaleString();
                const syncedData = filteredRecords.map((r, i) => ({
                    ...r,
                    __id: `DB-${r.id || i}`,
                    "Upload Time": r.Entrydate ? new Date(r.Entrydate).toLocaleString() : uploadTime,
                    "Source File": (r.FileName || r.filename) || file.name
                }));

                setExcelData(syncedData);
                if (syncedData.length > 0) {
                    const allKeys = new Set(['Acc_No']);
                    syncedData.forEach(row => {
                        Object.keys(row).forEach(k => {
                            if (k !== 'id' && !k.startsWith('__')) allKeys.add(k);
                        });
                    });
                    setHeaders(Array.from(allKeys));
                }
                setIsScanning(false);
                alert(`Successfully synced with Database. Showing ${syncedData.length} records.`);
            } catch (err) {
                console.error("Database sync failed:", err);
                // Fallback local parsing
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const json = XLSX.utils.sheet_to_json(worksheet, { raw: true });

                        if (json.length === 0) {
                            alert("The uploaded excel sheet is empty.");
                            setIsScanning(false);
                            return;
                        }

                        const formatValue = (val) => {
                            if (val === null || val === undefined) return '';
                            if (val instanceof Date) {
                                const yyyy = val.getFullYear();
                                const mm = String(val.getMonth() + 1).padStart(2, '0');
                                const dd = String(val.getDate()).padStart(2, '0');
                                return `${yyyy}-${mm}-${dd}`;
                            }
                            return String(val);
                        };

                        const allKeys = new Set();
                        json.forEach(row => {
                            Object.keys(row).forEach(key => allKeys.add(key));
                        });
                        const uploadTime = new Date().toLocaleString();
                        const sourceFile = file.name;
                        const keys = Array.from(allKeys);

                        const dataWithIds = json.map((row, index) => {
                            const formattedRow = {
                                __id: `REC-${Date.now()}-${index}`,
                                "Upload Time": uploadTime,
                                "Source File": sourceFile
                            };
                            keys.forEach(key => {
                                formattedRow[key] = formatValue(row[key]);
                            });
                            return formattedRow;
                        });

                        setExcelData(prev => {
                            const filtered = prev.filter(r => r["Source File"] !== sourceFile);
                            return [...filtered, ...dataWithIds];
                        });

                        setHeaders(prev => Array.from(new Set([...prev, "Upload Time", "Source File", ...keys])));
                        setIsScanning(false);
                    } catch (error) {
                        console.error("Excel processing error:", error);
                        setIsScanning(false);
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        }
    };

    // -- ACTIONS --
    const formatNum = (num) => {
        if (!num) return '₹0';
        const val = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    const handleViewRecord = (record) => {
        setSelectedRecord(record);
        setViewMode('form');
    };

    const handleDelete = async (record) => {
        if (window.confirm(`Are you sure you want to delete sell placement ${record.Trade_Number || record.id || record.__id}?`)) {
            setLoading(true);
            try {
                if (record.id) {
                    await deletePurchase(record.id);
                    alert("✅ Sell placement deleted successfully.");
                    if (activeTab === 'authorized') {
                        setRecords(prev => prev.filter(r => r.id !== record.id));
                    }
                    setExcelData(prev => prev.filter(r => r.id !== record.id));
                } else {
                    setExcelData(prev => prev.filter(r => r.__id !== record.__id));
                }
            } catch (err) {
                alert(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAuthorize = async () => {
        if (!selectedRecord?.id) {
            alert("⚠️ Error: Selected record is missing a database ID.");
            return;
        }

        setIsAuthorizing(true);
        try {
            await authorizePurchases([selectedRecord.id], selectedRecord);
            alert(`✅ Sell Deal Authorized Successfully!\nSet Number: ${selectedRecord.id}\nRecord moved to Authorized Portfolio (Stage 1003).`);
            setViewMode('list');
            if (activeTab === 'authorized') {
                fetchAuthorizedDeals();
            } else {
                // Refresh excel grid DB sync
                const dbRecords = await getPurchases();
                const filteredRecords = dbRecords.filter(r => {
                    const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
                    const stageVal = stageKey ? String(r[stageKey]).trim() : '';
                    return stageVal === '1001';
                });
                const uploadTime = new Date().toLocaleString();
                const syncedData = filteredRecords.map((r, i) => ({
                    ...r,
                    __id: `DB-${r.id || i}`,
                    "Upload Time": r.Entrydate ? new Date(r.Entrydate).toLocaleString() : uploadTime,
                    "Source File": (r.FileName || r.filename) || 'Database Sync'
                }));
                setExcelData(syncedData);
                if (syncedData.length > 0) {
                    const allKeys = new Set(['Acc_No']);
                    syncedData.forEach(row => {
                        Object.keys(row).forEach(k => {
                            if (k !== 'id' && !k.startsWith('__')) allKeys.add(k);
                        });
                    });
                    setHeaders(Array.from(allKeys));
                }
            }
        } catch (err) {
            console.error("Authorization failed:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setIsAuthorizing(false);
        }
    };

    const getFieldType = (key) => {
        const k = (key || '').toLowerCase();
        if (k.includes('date')) return 'date';
        if (k.includes('amount') || k.includes('value') || k.includes('price')) return 'number';
        return 'text';
    };

    // -- FILTERED DATA CALCULATIONS --
    const getTradeType = (r) => {
        return (r.Trade_Type || r.trade_type || '').toString().toUpperCase();
    };

    const filteredExcelData = excelData.filter(r => getTradeType(r) === tradeTypeFilter);
    const filteredAuthorizedRecords = records.filter(r => getTradeType(r) === tradeTypeFilter);

    const totals = filteredAuthorizedRecords.reduce((acc, inv) => {
        const amt = parseFloat((inv.Amount || '0').replace(/,/g, '')) || 0;
        acc.count += 1;
        acc.total += amt;
        return acc;
    }, { count: 0, total: 0 });

    const handleFieldChange = (key, val) => {
        setSelectedRecord(prev => ({ ...prev, [key]: val }));
    };

    const getVal = (obj, ...keys) => {
        if (!obj) return '';
        for (const key of keys) {
            if (obj[key] !== undefined) return obj[key];
            const lowerKey = key.toLowerCase().trim();
            const foundKey = Object.keys(obj).find(k => k.toLowerCase().trim() === lowerKey);
            if (foundKey) return obj[foundKey];
        }
        return '';
    };

    // Render form view
    if (viewMode === 'form' && selectedRecord) {
        const displayFields = Object.keys(selectedRecord).filter(k => k !== 'id' && !k.startsWith('__'));
        const isBuy = selectedRecord.Trade_Type?.toString().toUpperCase() === 'BUY';
        const isSell = selectedRecord.Trade_Type?.toString().toUpperCase() === 'SELL';
        const isCustomLayout = isBuy || isSell;

        const renderF = (label, value, flex = '1', bgColor = '#fff', width = '250px', keyName = null) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: flex }}>
                <label style={{ fontSize: '10px', fontWeight: '500', color: '#1a202c', width: '115px', flexShrink: 0 }}>
                    {label} <span style={{ color: '#e53e3e' }}>*</span>
                </label>
                {label === 'Category' || label === 'SLR' || label === 'Counter Type' || label === 'Sec Type' ? (
                    <select
                        className="form-select"
                        disabled={activeTab === 'authorized'}
                        value={value || ''}
                        onChange={async (e) => {
                            const val = e.target.value;
                            handleFieldChange(keyName || label, val);
                            if (label === 'Sec Type') {
                                try {
                                    const result = await getProductCode(val);
                                    handleFieldChange('ProdCode', result.GLCODE);
                                    handleFieldChange('Subglcode', result.SUBGLCODE);
                                    handleFieldChange('Purchase Book', result.SUBGLCODE);
                                } catch (err) {
                                    console.error("ProdCode fetch failed:", err);
                                }
                            }
                        }}
                        style={{
                            width: width, padding: '4px 8px', borderRadius: '2px', fontSize: '11px',
                            background: bgColor, border: '1px solid #cbd5e0', color: '#1a202c',
                            appearance: 'none', height: '24px', flexShrink: 0
                        }}
                    >
                        <option value="">--Select--</option>
                        {label === 'Sec Type' && (
                            <>
                                <option value="STATE SECURITY PRINCIPAL ACCOUNT">STATE SECURITY PRINCIPAL ACCOUNT</option>
                                <option value="CENTRAL SECURITY PRINCIPAL ACCOUNT">CENTRAL SECURITY PRINCIPAL ACCOUNT</option>
                                <option value="TREASURY BILLS (IN G SEC WITH HDFC)">TREASURY BILLS (IN G SEC WITH HDFC)</option>
                                <option value="PSU BONDS">PSU BONDS</option>
                                <option value="FD INVESTMENT">FD INVESTMENT</option>
                            </>
                        )}
                        {label === 'Counter Type' && (
                            <>
                                <option value="CounterParty1">CounterParty1</option>
                                <option value="NDS-OM">NDS-OM</option>
                            </>
                        )}
                        {label === 'Category' && (
                            <>
                                <option value="AFS">AFS</option>
                                <option value="HTM">HTM</option>
                                <option value="HFT">HFT</option>
                            </>
                        )}
                        {label === 'SLR' && (
                            <>
                                <option value="SLR">SLR</option>
                                <option value="Non SLR">Non SLR</option>
                            </>
                        )}
                        {value && !['STATE SECURITY PRINCIPAL ACCOUNT', 'CENTRAL SECURITY PRINCIPAL ACCOUNT', 'TREASURY BILLS (IN G SEC WITH HDFC)', 'PSU BONDS', 'FD INVESTMENT', 'CounterParty1', 'NDS-OM', 'AFS', 'HTM', 'HFT', 'SLR', 'Non SLR'].includes(value) ? (
                            <option value={value}>{value}</option>
                        ) : null}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={value ?? ''}
                        onChange={(e) => handleFieldChange(keyName || label, e.target.value)}
                        readOnly={activeTab === 'authorized'}
                        style={{
                            width: width, padding: '4px 8px', borderRadius: '2px', fontSize: '11px', flexShrink: 0,
                            background: bgColor, border: '1px solid #cbd5e0', color: '#1a202c', height: '24px'
                        }}
                    />
                )}
            </div>
        );

        const renderI = (value, flex = '1', bgColor = '#fff', width = '250px', keyName = null) => (
            <input
                type="text"
                value={value ?? ''}
                onChange={(e) => keyName && handleFieldChange(keyName, e.target.value)}
                readOnly={activeTab === 'authorized'}
                style={{
                    width: width, padding: '4px 8px', borderRadius: '2px', fontSize: '11px', flexShrink: 0,
                    background: bgColor, border: '1px solid #cbd5e0', color: '#1a202c', height: '24px'
                }}
            />
        );

        return (
            <div className="card">
                <div className="card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="btn-sm outline" style={{ padding: '8px' }} onClick={() => setViewMode('list')} disabled={isAuthorizing}>
                            <ArrowLeft size={16} />
                        </button>
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck size={18} /> Sell Deal Authorization
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span className="badge slr">{selectedRecord.Trade_Number || selectedRecord.__id}</span>
                        {(selectedRecord.Acc_No || selectedRecord.acc_no) && <span className="badge htm">{selectedRecord.Acc_No || selectedRecord.acc_no}</span>}
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-section">

                        {isCustomLayout ? (
                            <div style={{ border: '1px solid #90cdf4', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ background: '#4299e1', color: '#fff', padding: '6px 12px', fontSize: '12px', fontWeight: '600' }}>
                                    Deal Pad for Bonds & Securities
                                </div>
                                <div style={{ padding: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Sec Type', selectedRecord['Sec Type'] || selectedRecord['Sec_Type'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('ProdCode', selectedRecord['ProdCode'], '1', '#fae8e8')}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Type', selectedRecord['Trade_Type'])}</div>
                                        <div style={{ flex: 1 }}></div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                                            {renderF('Member', selectedRecord['Member'], '0')}
                                            {renderI(selectedRecord['Member_Name'] || selectedRecord['MemberName'] || 'RAJGURUNAGAR SAHAKARI BANK LIMITED', '0', '#fff', '400px', (selectedRecord['Member_Name'] ? 'Member_Name' : 'MemberName'))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                                            {renderF('Users', selectedRecord['Users'], '0')}
                                            {renderI(selectedRecord['User_Name'] || selectedRecord['UserName'] || 'TAKALKAR A B', '0', '#fff', '400px', (selectedRecord['User_Name'] ? 'User_Name' : 'UserName'))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Market', getVal(selectedRecord, 'Market'))}</div>
                                        <div style={{ flex: 1 }}>{renderF('SubMarket', getVal(selectedRecord, 'SubMarket', 'Sub_Market', 'Sub Market'))}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Order No', getVal(selectedRecord, 'Order No', 'Order_No', 'Order Number', 'Order_Number'))}</div>
                                        <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                                            {renderF('Trade_Date', getVal(selectedRecord, 'Trade_Date', 'Trade Date'), '0', '#fff', '150px')}
                                            {renderI(getVal(selectedRecord, 'Trade_Time', 'Time', 'Trade Time') || '15:33:08', '0', '#fff', '92px', 'Trade_Time')}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Number', selectedRecord['Trade_Number'])}</div>
                                        <div style={{ flex: 1 }}></div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Settlement_Type', selectedRecord['Settlement_Type'] || selectedRecord['Settlement Type'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Settlement_Date', selectedRecord['Settlement_Date'] || selectedRecord['Settlement Date'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('ISIN', selectedRecord['ISIN'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Genspec', selectedRecord['Genspec'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Security', selectedRecord['Security'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Maturity_Date', selectedRecord['Maturity_Date'] || selectedRecord['Maturity Date'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Amount', selectedRecord['Amount'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Price', selectedRecord['Trade_Price'] || selectedRecord['Trade Price'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Rate', getVal(selectedRecord, 'Trade_Rate', 'Trade Rate', 'Rate', 'Trade_Price', 'Trade Price'))}</div>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Yield', getVal(selectedRecord, 'Trade_Yield', 'Trade Yield', 'Yield'))}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Trade_Amount', getVal(selectedRecord, 'Trade_Amount', 'Trade Amount'))}</div>
                                        <div style={{ flex: 1 }}>{renderF('LastIntDate', getVal(selectedRecord, 'LastIntDate', 'Last_Int_Date', 'Last Int Date', 'Last_Interest_Date', 'last payment interest payment date', 'Last_Interest_Payment_Date'))}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Period', getVal(selectedRecord, 'Period', 'Tenure', 'Days', 'no. of broken period days', 'Number_of_Broken_Period_Days'))}</div>
                                        <div style={{ flex: 1 }}>{renderF('Accrued_Interest', getVal(selectedRecord, 'Accrued_Interest', 'Accrued Interest', 'AccruedInt'))}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Sett_Consideration', selectedRecord['Sett_Consideration'] || selectedRecord['Sett Consideration'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Calculated_Int', selectedRecord['Calculated_Int'] || selectedRecord['Calculated Int'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Constituent', selectedRecord['Constituent'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('Constituent_Number', selectedRecord['Constituent_Number'] || selectedRecord['Constituent Number'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Purchase Book', getVal(selectedRecord, 'Purchase Book', 'Purchase_Book', 'Book', 'Portfolio'), '1', isSell ? '#fae8e8' : '#fff')}</div>                    <div style={{ flex: 1 }}>{renderF('Portfolio', getVal(selectedRecord, 'Portfolio', 'Portfolio_Name', 'Portfolio Name'))}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('AccNo', getVal(selectedRecord, 'AccNo', 'Acc_No', 'Acc No'), '1', '#fae8e8', '250px', 'Acc_No')}</div>
                                        <div style={{ flex: 1 }}>{renderF('Counter Type', selectedRecord['Counter Type'] || selectedRecord['Counter_Type'])}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>{renderF('Category', selectedRecord['Category'])}</div>
                                        <div style={{ flex: 1 }}>{renderF('SLR', selectedRecord['SLR'])}</div>
                                    </div>
                                    {isSell && (
                                        <>
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div style={{ flex: 1 }}>{renderF('Holding Positions', selectedRecord['Holding Positions'], '1', '#fae8e8')}</div>
                                                <div style={{ flex: 1 }}>{renderF('Face Value', selectedRecord['Face Value'], '1', '#fae8e8')}</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div style={{ flex: 1 }}>{renderF('Average Amt', selectedRecord['Average Amt'], '1', '#fae8e8')}</div>
                                                <div style={{ flex: 1 }}>{renderF('Accrued Int', selectedRecord['Accrued Int'], '1', '#fae8e8')}</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div style={{ flex: 1 }}>{renderF('Profit / Loss Int', selectedRecord['Profit / Loss Int'] || selectedRecord['Profit/Loss Int'], '1', '#fae8e8')}</div>
                                                <div style={{ flex: 1 }}>{renderF('Rec. Int', selectedRecord['Rec. Int'], '1', '#fae8e8')}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '24px', rowGap: '12px' }}>
                                {displayFields.map(header => (
                                    <div key={header} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '600', color: '#4a5568', width: '110px', textAlign: 'right', flexShrink: 0, lineHeight: '1.2' }}>
                                            {header.replace(/_/g, ' ')}
                                        </label>
                                        <input
                                            className="form-input"
                                            type={getFieldType(header)}
                                            defaultValue={selectedRecord[header]?.toString() || ''}
                                            readOnly={activeTab === 'authorized'}
                                            style={activeTab === 'authorized'
                                                ? { background: 'var(--gray-50)', cursor: 'default', flex: 1, padding: '6px 10px', borderRadius: '4px', fontSize: '11px', minWidth: 0 }
                                                : { flex: 1, padding: '6px 10px', borderRadius: '4px', fontSize: '11px', minWidth: 0 }
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {activeTab !== 'authorized' && (
                        <div className="alert-banner info" style={{ marginTop: '20px' }}>
                            <ShieldCheck size={16} /> <strong>Data Integrity Check:</strong> Please verify the auto-populated fields before authorization.
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                        <button className="btn-sm outline" onClick={() => setViewMode('list')} disabled={isAuthorizing}>Close</button>
                        {activeTab !== 'authorized' && (
                            <button
                                className="btn-sm gold"
                                style={{ minWidth: '160px', background: 'var(--success)', borderColor: 'var(--success)', color: '#fff' }}
                                onClick={handleAuthorize}
                                disabled={isAuthorizing}
                            >
                                {isAuthorizing ? <Loader2 size={14} className="animate-spin" /> : <><CheckCircle2 size={14} style={{ marginRight: '8px' }} /> Confirm Authorization</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
                style={{ display: 'none' }}
            />

            <div className="rbi-info-box">
                <div className="rbi-header">
                    <span className="rbi-tag">RBI</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>G-Sec Sell Deals — NDS-OM Settlement | Capital Gains | SGL Transfer</span>
                </div>
                <div className="rbi-text">Sell deals must be executed on NDS-OM. Profit/Loss on sale of investments should be recognized in the P&L account. Securities sold from HTM category are subject to RBI's 5% ceiling of the book value of investments held in HTM at the beginning of the year.</div>
            </div>

            {/* TABS + ACTION BUTTON */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div className="tab-bar" style={{ marginBottom: 0 }}>
                    <div
                        className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upload')}
                    >
                        <FileSpreadsheet size={14} />
                        Upload Excel
                    </div>
                    <div
                        className={`tab ${activeTab === 'authorized' ? 'active' : ''}`}
                        onClick={() => setActiveTab('authorized')}
                    >
                        <ShieldCheck size={14} />
                        Authorized Records
                    </div>
                    <div
                        className={`tab ${activeTab === 'voucher' ? 'active' : ''}`}
                        onClick={() => setActiveTab('voucher')}
                    >
                        <Search size={14} />
                        Voucher View
                    </div>
                </div>
                {activeTab === 'upload' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: '600', border: '1.5px solid var(--navy)',
                                background: 'rgba(31, 56, 100, 0.06)', color: 'var(--navy)',
                                transition: 'all 0.2s'
                            }}
                            onClick={handleUploadClick}
                            disabled={isScanning}
                            onMouseEnter={e => { e.target.style.background = 'var(--navy)'; e.target.style.color = '#fff'; }}
                            onMouseLeave={e => { e.target.style.background = 'rgba(31, 56, 100, 0.06)'; e.target.style.color = 'var(--navy)'; }}
                        >
                            {isScanning ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
                            New purchace/upload excel
                        </button>
                    </div>
                )}
            </div>

            {activeTab === 'voucher' ? (
                <div className="card">
                    <div className="card-header">
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Search size={16} /> Purchase Set View
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="alert-banner info" style={{ marginBottom: '20px' }}>
                            <Search size={16} /> Enter a Set Number (Postset) to view all corresponding purchase records.
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '20px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Set No. (Postset)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={searchPostset}
                                    onChange={(e) => setSearchPostset(e.target.value)}
                                    placeholder="e.g. 2"
                                />
                            </div>
                            <button
                                className="btn-sm gold"
                                style={{ height: '36px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                onClick={handleSearchVoucher}
                                disabled={loading}
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                Search
                            </button>
                        </div>

                        <div className="table-responsive">
                            <table className="data-table density-high">
                                <thead>
                                    <tr>
                                        <th>Cash_R</th>
                                        <th>Receipt</th>
                                        <th>View</th>
                                        <th>On Date</th>
                                        <th>SetNo</th>
                                        <th>PrCode</th>
                                        <th>AccNo</th>
                                        <th>Name</th>
                                        <th>Particulars</th>
                                        <th style={{ textAlign: 'right' }}>Amount</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Maker</th>
                                        <th>Checker</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voucherRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan="15" style={{ textAlign: 'center', padding: '30px', color: 'var(--gray-400)' }}>
                                                No records found. Please search for a valid Set Number.
                                            </td>
                                        </tr>
                                    ) : (
                                        voucherRecords.map((r, i) => (
                                            <tr key={i}>
                                                <td>-</td>
                                                <td>-</td>
                                                <td style={{ color: 'var(--gold)', fontWeight: 'bold', cursor: 'pointer' }}>+</td>
                                                <td>{r.Entrydate ? new Date(r.Entrydate).toLocaleDateString('en-GB') : (r.Trade_Date || '-')}</td>
                                                <td>{r.postset || r.Postset || searchPostset}</td>
                                                <td>{r.PrCode || '-'}</td>
                                                <td>{r.Acc_No || r.AccNo || '-'}</td>
                                                <td>{r.Member || r.Security || '-'}</td>
                                                <td>Sell_Of_{r.Security || '-'}</td>
                                                <td style={{ textAlign: 'right' }}>{r.Amount ? parseFloat(r.Amount).toFixed(2) : '-'}</td>
                                                <td>Cr</td>
                                                <td>AUTHORIZED</td>
                                                <td>ADMIN</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : activeTab === 'upload' ? (
                <div className="card">
                    <div className="card-header" style={{ padding: '10px 18px', borderBottom: '1px solid var(--gray-100)' }}>
                        <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileSpreadsheet size={16} /> Excel Data Upload
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                <Filter size={12} color="#64748b" />
                                <select
                                    value={tradeTypeFilter}
                                    onChange={(e) => {
                                        setTradeTypeFilter(e.target.value);
                                        setUploadPage(1);
                                    }}
                                    style={{
                                        border: 'none', background: 'transparent', fontSize: '11px', fontWeight: '600',
                                        color: 'var(--navy)', outline: 'none', cursor: 'pointer', padding: '2px 0'
                                    }}
                                >
                                    <option value="BUY">BUY DEALS</option>
                                    <option value="SELL">SELL DEALS</option>
                                </select>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
                                {filteredExcelData.length > 0 ? `${filteredExcelData.length} records loaded` : 'No data'}
                            </span>
                        </div>
                    </div>
                    <div className="card-body" style={{ padding: 0, minHeight: '400px' }}>
                        {isScanning ? (
                            <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                <Loader2 size={48} className="animate-spin" style={{ margin: '0 auto 20px', color: 'var(--gold)' }} />
                                <h3>Parsing Dataset...</h3>
                                <p style={{ color: 'var(--gray-400)' }}>Generating dynamic grid layout</p>
                            </div>
                        ) : excelData.length > 0 ? (
                            <>
                                <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', border: '1px solid var(--gray-100)', borderRadius: '8px' }}>
                                    <table className="data-table density-high" style={{ minWidth: 'max-content' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ position: 'sticky', left: 0, zIndex: 11, background: 'var(--gray-50)' }}>ID</th>
                                                {headers.map(header => (
                                                    <th key={header}>{header}</th>
                                                ))}
                                                <th style={{ textAlign: 'center', position: 'sticky', right: 0, zIndex: 11, background: 'var(--gray-50)' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredExcelData.slice((uploadPage - 1) * ROWS_PER_PAGE, uploadPage * ROWS_PER_PAGE).map(record => (
                                                <tr key={record.__id}>
                                                    <td style={{ position: 'sticky', left: 0, zIndex: 10, background: '#fff' }}><code>{record.__id}</code></td>
                                                    {headers.map(header => (
                                                        <td key={header}>{record[header]?.toString() || '-'}</td>
                                                    ))}
                                                    <td style={{ position: 'sticky', right: 0, zIndex: 10, background: '#fff' }}>
                                                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                                            <button className="btn-sm teal" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleViewRecord(record)}>
                                                                Select
                                                            </button>
                                                            <button className="btn-sm outline" style={{ padding: '4px 8px', color: 'var(--danger)' }} onClick={() => handleDelete(record)}>
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* PAGINATION */}
                                {filteredExcelData.length > ROWS_PER_PAGE && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
                                        <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                                            Showing {(uploadPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(uploadPage * ROWS_PER_PAGE, filteredExcelData.length)} of {filteredExcelData.length} records
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setUploadPage(1)} disabled={uploadPage === 1}><ChevronsLeft size={14} /></button>
                                            <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setUploadPage(p => Math.max(1, p - 1))} disabled={uploadPage === 1}><ChevronLeft size={14} /></button>
                                            {Array.from({ length: Math.ceil(filteredExcelData.length / ROWS_PER_PAGE) }, (_, i) => i + 1).map(pg => (
                                                <button key={pg} className={`btn-sm ${pg === uploadPage ? 'gold' : 'outline'}`} style={{ padding: '4px 10px', fontSize: '11px', minWidth: '30px' }} onClick={() => setUploadPage(pg)}>{pg}</button>
                                            ))}
                                            <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setUploadPage(p => Math.min(Math.ceil(filteredExcelData.length / ROWS_PER_PAGE), p + 1))} disabled={uploadPage === Math.ceil(filteredExcelData.length / ROWS_PER_PAGE)}><ChevronRight size={14} /></button>
                                            <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setUploadPage(Math.ceil(filteredExcelData.length / ROWS_PER_PAGE))} disabled={uploadPage === Math.ceil(filteredExcelData.length / ROWS_PER_PAGE)}><ChevronsRight size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                                <FileSpreadsheet size={64} style={{ color: 'var(--gray-200)', margin: '0 auto 20px auto' }} />
                                <h3 style={{ color: 'var(--navy)' }}>Excel Repository Empty</h3>
                                <p style={{ color: 'var(--gray-400)', maxWidth: '400px', margin: '10px auto' }}>
                                    Upload any Excel file containing Sell Deals. All columns and rows will be rendered dynamically for processing.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="report-cards">
                        <div className="report-card"><div className="rc-label">Authorized Sells</div><div className="rc-value">{totals.count}</div></div>
                        <div className="report-card"><div className="rc-label">Total Face Value</div><div className="rc-value">{formatNum(totals.total)}</div></div>
                        <div className="report-card"><div className="rc-label">Auth. Workflow</div><div className="rc-value">Stage 1003</div></div>
                        <div className="report-card"><div className="rc-label">System Mode</div><div className="rc-value">Maker/Checker</div></div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <TrendingDown size={16} /> G-Sec Sell Placements (Authorized Records)
                            </span>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                    <Filter size={12} color="#64748b" />
                                    <select
                                        value={tradeTypeFilter}
                                        onChange={(e) => {
                                            setTradeTypeFilter(e.target.value);
                                            setAuthPage(1);
                                        }}
                                        style={{
                                            border: 'none', background: 'transparent', fontSize: '11px', fontWeight: '600',
                                            color: 'var(--navy)', outline: 'none', cursor: 'pointer', padding: '2px 0'
                                        }}
                                    >
                                        <option value="BUY">BUY DEALS</option>
                                        <option value="SELL">SELL DEALS</option>
                                    </select>
                                </div>
                                <button className="btn-sm outline">Export</button>
                            </div>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            {loading ? (
                                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                    <Loader2 className="animate-spin" size={24} color="var(--gold)" style={{ margin: '0 auto' }} />
                                </div>
                            ) : (
                                <>
                                    <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
                                        <table className="data-table density-high" style={{ minWidth: 'max-content' }}>
                                            <thead>
                                                <tr>
                                                    <th>Deal ID</th><th>Security</th><th>ISIN</th><th>Amount (FV)</th><th>Price</th>
                                                    <th>Consideration</th><th>Trade Date</th><th>Counterparty</th><th>Status</th><th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAuthorizedRecords.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="10" style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '20px' }}>No authorized {tradeTypeFilter.toLowerCase()} deals found.</td>
                                                    </tr>
                                                ) : (
                                                    filteredAuthorizedRecords.slice((authPage - 1) * 7, authPage * 7).map((inv) => (
                                                        <tr key={inv.id}>
                                                            <td>{inv.Trade_Number?.toString().slice(-7)}</td>
                                                            <td><b>{inv.Security}</b></td>
                                                            <td>{inv.ISIN}</td>
                                                            <td style={{ textAlign: 'right' }}>{formatNum(inv.Amount)}</td>
                                                            <td style={{ textAlign: 'right' }}>{inv.Trade_Yield}%</td>
                                                            <td style={{ textAlign: 'right' }}>{formatNum(inv.Sett_Consideration)}</td>
                                                            <td>{inv.Trade_Date}</td>
                                                            <td>{inv.Member || '-'}</td>
                                                            <td><span className="badge active">Authorized (1003)</span></td>
                                                            <td>
                                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                                    <button className="btn-sm teal" style={{ padding: '4px 10px' }} onClick={() => handleViewRecord(inv)}>View</button>
                                                                    <button className="btn-sm outline" style={{ padding: '4px 8px', color: 'var(--danger)' }} onClick={() => handleDelete(inv)}><Trash2 size={12} /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {records.length > 7 && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'var(--gray-50)' }}>
                                            <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                                                Showing {(authPage - 1) * 7 + 1}–{Math.min(authPage * 7, records.length)} of {records.length} records
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setAuthPage(1)} disabled={authPage === 1}><ChevronsLeft size={14} /></button>
                                                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setAuthPage(p => Math.max(1, p - 1))} disabled={authPage === 1}><ChevronLeft size={14} /></button>
                                                {Array.from({ length: Math.ceil(records.length / 7) }, (_, i) => i + 1).map(pg => (
                                                    <button key={pg} className={`btn-sm ${pg === authPage ? 'gold' : 'outline'}`} style={{ padding: '4px 10px', fontSize: '11px', minWidth: '30px' }} onClick={() => setAuthPage(pg)}>{pg}</button>
                                                ))}
                                                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setAuthPage(p => Math.min(Math.ceil(records.length / 7), p + 1))} disabled={authPage === Math.ceil(records.length / 7)}><ChevronRight size={14} /></button>
                                                <button className="btn-sm outline" style={{ padding: '4px 6px' }} onClick={() => setAuthPage(Math.ceil(records.length / 7))} disabled={authPage === Math.ceil(records.length / 7)}><ChevronsRight size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
