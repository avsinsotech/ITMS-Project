import React, { useState, useMemo, useRef } from 'react';
import { Search, Upload, FileText, Printer, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Download, Loader2, TrendingDown, TrendingUp, CheckCircle2, FileSpreadsheet, Trash2 } from 'lucide-react';
import { uploadMTMExcel } from '../../services/gsecApi';

export default function GSecMTMValuation() {
    const [asOnDate, setAsOnDate] = useState('2024-06-05'); // Default from image
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const fileInputRef = useRef(null);

    // Sample data reconstructed from Image 2
    const SAMPLE_DATA = [
        { srNo: 209, isin: 'IN1020140027', description: '9.21% AP 2024', col4: 88, maturityDate: '23/05/2024', coupon: '9.21%', faceValue: 10000000.00, price: 103.34, bookValue: 10333896.00, mtmPrice: 100.2935, ytm: 6.9862, marketValue: 10029350, depApp: -304546 },
        { srNo: 210, isin: 'IN1020220167', description: '07.90 ANDHRA PRADESH SDL 2034', col4: 881, maturityDate: '01/06/2034', coupon: '07.90', faceValue: 50000000.00, price: 104.18, bookValue: 52090000.00, mtmPrice: 103.5714, ytm: 7.3918, marketValue: 51785700, depApp: -304300 },
    ];

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("⚠️ Please select a file to upload.");
            return;
        }
        
        setIsLoading(true);
        try {
            const result = await uploadMTMExcel(selectedFile);
            setIsUploaded(true);
            setData(result || SAMPLE_DATA);
            
            // After upload, show the report in a new window as requested
            setTimeout(() => {
                handleValuationReport();
            }, 300);
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`❌ Upload failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleValuationReport = () => {
        if (!isUploaded) {
            alert("⚠️ Please upload a file first.");
            return;
        }

        const printWindow = window.open('', '_blank');
        const formattedDate = new Date(asOnDate).toLocaleDateString('en-GB');
        const printDate = new Date().toLocaleString('en-US', { 
            month: 'numeric', day: 'numeric', year: 'numeric', 
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true 
        });

        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Valuation Report - ${asOnDate}</title>
                <style>
                    body { font-family: Arial, sans-serif; font-size: 10px; margin: 10px; color: #000; background: #f0f0f0; }
                    .report-container { background: #fff; padding: 20px; min-height: 100vh; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 1000px; margin: 0 auto; }
                    .header-table { width: 100%; margin-bottom: 20px; border: none; font-size: 11px; }
                    .header-table td { border: none; padding: 4px 0; }
                    .title { text-align: center; font-size: 14px; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                    table.data-table { width: 100%; border-collapse: collapse; border: 1px solid #999; }
                    table.data-table th, table.data-table td { border: 1px solid #999; padding: 4px 6px; text-align: left; }
                    table.data-table th { background-color: #fff; font-weight: bold; }
                    .text-right { text-align: right; }
                    .text-center { text-align: center; }
                    .toolbar { background: #e6e6e6; padding: 4px 10px; border-bottom: 1px solid #ccc; display: flex; align-items: center; gap: 15px; position: sticky; top: 0; z-index: 100; margin-bottom: 10px; }
                    .toolbar button { border: 1px solid #999; background: #f0f0f0; padding: 2px 10px; font-size: 11px; cursor: pointer; }
                    .toolbar input { border: 1px solid #999; padding: 2px 5px; font-size: 11px; width: 100px; }
                    @media print {
                        .toolbar, .no-print { display: none; }
                        body { background: #fff; margin: 0; }
                        .report-container { box-shadow: none; width: 100%; padding: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="toolbar no-print">
                    <button onclick="window.print()">Print</button>
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <button disabled>|&lt;</button>
                        <button disabled>&lt;</button>
                        <input type="text" value="1" readonly style="width: 20px; text-align: center;">
                        <span>of 1</span>
                        <button disabled>&gt;</button>
                        <button disabled>&gt;|</button>
                    </div>
                    <div style="margin-left: auto; display: flex; gap: 5px; align-items: center;">
                        <input type="text" placeholder="Find | Next">
                    </div>
                </div>
                
                <div class="report-container">
                    <table class="header-table">
                        <tr>
                            <td style="width: 100px;"><strong>Bank Name :</strong></td>
                            <td>DEMO BANK</td>
                            <td style="text-align: right; width: 100px;"><strong>Print Date :</strong></td>
                            <td style="width: 180px; text-align: right;">${printDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Branch Name :</strong></td>
                            <td>HEAD OFFICE</td>
                            <td style="text-align: right;"><strong>Print UserId :</strong></td>
                            <td style="text-align: right;">AVS</td>
                        </tr>
                    </table>

                    <div class="title">Valuation Report As On ${formattedDate}</div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th class="text-center">Sr No</th>
                                <th>ISIN</th>
                                <th>Description</th>
                                <th class="text-center">Mat. Days</th>
                                <th class="text-center">Maturity</th>
                                <th class="text-center">Coupon</th>
                                <th class="text-right">Face Value</th>
                                <th class="text-right">Price</th>
                                <th class="text-right">Book Value</th>
                                <th class="text-right">MTM Price</th>
                                <th class="text-right">YTM %</th>
                                <th class="text-right">Market Value</th>
                                <th class="text-right">Dep/App</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(item => `
                                <tr>
                                    <td class="text-center">${item.srNo}</td>
                                    <td>${item.isin}</td>
                                    <td>${item.description}</td>
                                    <td class="text-center">${item.col4}</td>
                                    <td class="text-center">${item.maturityDate}</td>
                                    <td class="text-center">${item.coupon}</td>
                                    <td class="text-right">${item.faceValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">${item.price.toFixed(2)}</td>
                                    <td class="text-right">${item.bookValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">${item.mtmPrice.toFixed(4)}</td>
                                    <td class="text-right">${item.ytm.toFixed(4)}</td>
                                    <td class="text-right">${item.marketValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                    <td class="text-right">${item.depApp.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    const filteredData = useMemo(() => {
        return data.filter(item => 
            item.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    return (
        <div className="screen-container" style={{ padding: '0', maxWidth: '100%' }}>
            {/* Page Title & Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--navy)', borderRadius: '12px', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--gold)' }}>
                        <TrendingDown size={20} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--navy)', margin: 0, fontFamily: "'DM Serif Display', serif" }}>MTM Valuation (G-Sec)</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <span className="badge slr" style={{ fontSize: '9px', padding: '2px 8px', letterSpacing: '0.5px' }}>MARKET TO MARKET</span>
                            <span style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Sync with FIMMDA/FBIL Daily Prices</span>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '1px' }}>Valuation & Compliance</span>
                    <div style={{ fontSize: '11px', color: 'var(--navy)', fontWeight: '600' }}>Investment Treasury › G-Sec › MTM</div>
                </div>
            </div>

            <div className="rbi-info-box" style={{ background: 'linear-gradient(to right, #f0f4ff, #fff)', borderLeft: '4px solid var(--navy)', padding: '15px 20px' }}>
                <div className="rbi-header">
                    <span className="rbi-tag" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>REGULATORY GUIDELINE</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)' }}>Valuation of Government Securities — RBI Master Circular</span>
                </div>
                <p className="rbi-text" style={{ fontSize: '11px', color: 'var(--gray-600)', opacity: 0.8, margin: 0 }}>
                    Investment portfolio of banks should be valued at periodic intervals. For MTM, use prices published by FBIL/FIMMDA. 
                    HTM securities are carried at acquisition cost unless it is more than the face value, in which case the premium should be amortised over the period remaining to maturity.
                </p>
            </div>

            {/* Report Form - Matching System Style but Compact */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <div className="card-header" style={{ background: 'var(--navy)', color: '#fff', padding: '8px 16px' }}>
                    <span className="card-title" style={{ color: '#fff', fontSize: '13px' }}>MTM Report Generation</span>
                </div>
                <div className="card-body" style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '11px', fontWeight: '600' }}>As On Date <span style={{ color: 'var(--danger)' }}>*</span></label>
                            <input 
                                type="date" 
                                className="form-input" 
                                value={asOnDate} 
                                onChange={(e) => setAsOnDate(e.target.value)}
                                style={{ width: '180px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '11px', fontWeight: '600' }}>Select Valuation File <span style={{ color: 'var(--danger)' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ fontSize: '11px', padding: '6px 12px', border: '1.5px solid var(--border)', borderRadius: '8px', background: '#fff' }}
                                />
                                {selectedFile && <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: '600' }}>✓ File Selected</span>}
                            </div>
                        </div>

                        <button 
                            className="btn-sm gold"
                            onClick={handleUpload}
                            disabled={isLoading}
                            style={{ height: '38px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            {isLoading ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : <><Upload size={14} /> Upload & Sync</>}
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px dotted var(--border)', paddingTop: '16px' }}>
                        <button 
                            className="btn-sm" 
                            disabled={!isUploaded}
                            onClick={handleValuationReport}
                            style={{ 
                                background: isUploaded ? 'var(--navy)' : 'var(--gray-200)',
                                color: isUploaded ? '#fff' : 'var(--gray-400)',
                                border: 'none',
                                padding: '8px 40px', 
                                borderRadius: '4px', 
                                cursor: isUploaded ? 'pointer' : 'not-allowed',
                                fontWeight: '700', 
                                fontSize: '13px',
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px'
                            }}
                        >
                            <FileText size={16} /> Print Valuation Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Grid - Enhanced Design */}
            {isUploaded && (
                <div className="card" style={{ marginTop: '30px', boxShadow: 'var(--shadow-md)', border: 'none', animation: 'fadeIn 0.5s ease' }}>
                    <div className="card-header" style={{ padding: '15px 20px', background: '#f8fafc', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '30px', height: '30px', background: 'var(--gold-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--gold)' }}>
                                <TrendingUp size={16} />
                            </div>
                            <span className="card-title" style={{ fontSize: '15px' }}>MTM Summary Overview</span>
                        </div>
                        <div className="search-input-wrap" style={{ width: '380px' }}>
                            <Search className="search-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Filter results by ISIN, Security Name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderRadius: '10px', background: '#fff' }}
                            />
                        </div>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="table-responsive" style={{ border: 'none', maxHeight: '500px' }}>
                            <table className="data-table density-high">
                                <thead>
                                    <tr style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                        <th style={{ textAlign: 'center', width: '50px' }}>#</th>
                                        <th>ISIN</th>
                                        <th>Security Nomenclature</th>
                                        <th style={{ textAlign: 'center' }}>Maturity</th>
                                        <th style={{ textAlign: 'center' }}>Coupon</th>
                                        <th style={{ textAlign: 'right' }}>Face Value</th>
                                        <th style={{ textAlign: 'right' }}>Book Value</th>
                                        <th style={{ textAlign: 'right' }}>MTM Price</th>
                                        <th style={{ textAlign: 'right' }}>Market Value</th>
                                        <th style={{ textAlign: 'right' }}>Dep / App</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, idx) => (
                                        <tr key={idx} style={{ transition: 'background 0.2s' }}>
                                            <td style={{ textAlign: 'center', color: 'var(--gray-400)' }}>{item.srNo}</td>
                                            <td style={{ fontWeight: '700', color: 'var(--navy)' }}>{item.isin}</td>
                                            <td style={{ fontWeight: '600' }}>{item.description}</td>
                                            <td style={{ textAlign: 'center', color: 'var(--gray-600)' }}>{item.maturityDate}</td>
                                            <td style={{ textAlign: 'center', fontWeight: '600' }}>{item.coupon}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '600' }}>{item.faceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td style={{ textAlign: 'right' }}>{item.bookValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td style={{ textAlign: 'right', color: 'var(--gold)', fontWeight: '800' }}>{item.mtmPrice.toFixed(4)}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--navy)' }}>{item.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td style={{ 
                                                textAlign: 'right', fontWeight: '800', 
                                                color: item.depApp < 0 ? 'var(--danger)' : 'var(--success)',
                                                background: item.depApp < 0 ? 'rgba(192, 57, 43, 0.05)' : 'rgba(13, 124, 95, 0.05)'
                                            }}>
                                                {item.depApp.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ padding: '15px 20px', borderTop: '1px solid var(--gray-100)', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: '600' }}>
                                SYSTEM TIMESTAMP: {new Date().toLocaleTimeString()} | RECORDS: {filteredData.length}
                            </span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button className="btn-sm outline" style={{ minWidth: '32px', height: '32px', padding: 0 }} disabled><ChevronsLeft size={14}/></button>
                                <button className="btn-sm outline" style={{ minWidth: '32px', height: '32px', padding: 0 }} disabled><ChevronLeft size={14}/></button>
                                <button className="btn-sm" style={{ minWidth: '32px', height: '32px', background: 'var(--navy)', color: '#fff', padding: 0 }}>1</button>
                                <button className="btn-sm outline" style={{ minWidth: '32px', height: '32px', padding: 0 }} disabled><ChevronRight size={14}/></button>
                                <button className="btn-sm outline" style={{ minWidth: '32px', height: '32px', padding: 0 }} disabled><ChevronsRight size={14}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .screen-container { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .upload-zone:hover {
                    border-color: var(--gold) !important;
                    background: var(--gold-pale) !important;
                }
                .upload-zone.active {
                    border-color: var(--success) !important;
                    background: var(--success-bg) !important;
                }
                .data-table.density-high tr:hover td {
                    background: #f8fafc !important;
                    cursor: default;
                }
                .v2-submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(31,56,100,0.3) !important;
                }
                .v2-submit-btn:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
}
