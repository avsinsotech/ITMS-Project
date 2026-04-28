import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  UploadCloud, File, X, CheckCircle2, ArrowLeft,
  Search, FolderPlus, Database, Calendar,
  ExternalLink, Filter, FolderSearch, Loader2,
  HardDrive, Table, FileSpreadsheet, Eye, Trash2,
  ShieldCheck, ArrowRight
} from 'lucide-react';
import { uploadPurchaseExcel, getPurchases, authorizePurchases, deletePurchase } from '../../services/api';

export default function FileUpload({ onNavigate }) {
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('excel-grid');
  const fileInputRef = useRef(null);

  // Excel Data state — initialised from localStorage so data survives navigation
  const [selectedFileName, setSelectedFileName] = useState(
    () => localStorage.getItem('gsec_excel_filename') || null
  );
  const [excelData, setExcelData] = useState(
    () => {
      const saved = localStorage.getItem('gsec_excel_data');
      return saved ? JSON.parse(saved) : [];
    }
  );
  const [headers, setHeaders] = useState(
    () => {
      const saved = localStorage.getItem('gsec_excel_headers');
      return saved ? JSON.parse(saved) : [];
    }
  );

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('gsec_excel_data', JSON.stringify(excelData));
  }, [excelData]);

  useEffect(() => {
    localStorage.setItem('gsec_excel_headers', JSON.stringify(headers));
  }, [headers]);

  useEffect(() => {
    if (selectedFileName) {
      localStorage.setItem('gsec_excel_filename', selectedFileName);
    } else {
      localStorage.removeItem('gsec_excel_filename');
    }
  }, [selectedFileName]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'

  // Initial Fetch: Ensure we show current 1001 records from DB on load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsScanning(true);
        const dbRecords = await getPurchases();
        
        // Robust filter: Handles potential case differences and type mismatches
        const filtered = dbRecords.filter(r => {
          const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
          const stageVal = stageKey ? String(r[stageKey]).trim() : '';
          return stageVal === '1001';
        });

        if (dbRecords.length > 0 && filtered.length === 0) {
          console.warn("Records found in DB, but none matched Stage 1001. Found stages:", [...new Set(dbRecords.map(r => r.Stage || r.stage))]);
        }
        
        const uploadTime = new Date().toLocaleString();
        const syncedData = filtered.map((r, i) => ({ 
          ...r, 
          __id: `DB-${r.id || i}`,
          "Upload Time": r.Entrydate ? new Date(r.Entrydate).toLocaleString() : uploadTime,
          "Source File": (r.FileName || r.filename) || 'Database Sync'
        }));
        
        setExcelData(syncedData);
        if (syncedData.length > 0) {
          setHeaders(Object.keys(syncedData[0]).filter(k => k !== 'id' && !k.startsWith('__')));
        }
      } catch (err) {
        console.error("Initial fetch failed:", err);
      } finally {
        setIsScanning(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setIsScanning(true);

      // 1. Backend Integration: Upload to Database
      try {
        await uploadPurchaseExcel(file);
        console.log("Successfully synced with database.");
        
        // RE-FETCH from database to get real IDs for authorization
        const dbRecords = await getPurchases();
        
        // FILTER: Only show records with Stage 1001 (Robust)
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
          setHeaders(Object.keys(syncedData[0]).filter(k => k !== 'id' && !k.startsWith('__')));
        }
        setIsScanning(false);
        setActiveTab('excel-grid');
        alert(`Successfully synced with Database. Showing ${syncedData.length} records with Stage 1001.`);
        return; // Skip local parsing if DB sync is successful
      } catch (err) {
        console.error("Database sync failed:", err);
        // We still continue with local parsing so the user sees the UI they want
      }

      // 2. Local Parsing for UI Grid (Fallback)
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
          const extendedKeys = ["Upload Time", "Source File", ...keys];

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

          // Deduplication: Remove old records from the same file before adding new ones
          setExcelData(prev => {
            const filtered = prev.filter(r => r["Source File"] !== sourceFile);
            return [...filtered, ...dataWithIds];
          });

          setHeaders(prev => Array.from(new Set([...prev, "Upload Time", "Source File", ...keys])));
          setIsScanning(false);
          setActiveTab('excel-grid');
          alert(`Successfully processed ${file.name}. cumulative records: ${excelData.length + dataWithIds.length}`);
        } catch (error) {
          console.error("Excel processing error:", error);
          setIsScanning(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const deleteRecord = async (record) => {
    if (window.confirm(`Are you sure you want to delete record ${record.Trade_Number || record.__id}?`)) {
      if (record.id) {
        setIsScanning(true);
        try {
          await deletePurchase(record.id);
          alert("✅ Record deleted permanently from database.");
          setExcelData(prev => prev.filter(r => r.id !== record.id));
        } catch (err) {
          alert(`Error deleting record: ${err.message}`);
        } finally {
          setIsScanning(false);
        }
      } else {
        // Local only record
        setExcelData(prev => prev.filter(r => r.__id !== record.__id));
      }
    }
  };

  const selectRecord = (record) => {
    setSelectedRecord(record);
    setViewMode('form');
  };

  const handleAuthorize = async () => {
    if (selectedRecord?.id) {
      console.log("Authorizing record with ID:", selectedRecord.id);
      setIsScanning(true);
      try {
        await authorizePurchases([selectedRecord.id]);
        alert(`✅ Transaction Authorized Successfully!\nSet Number Generated for ID: ${selectedRecord.id}`);
        
        // Refresh data to show updated state (e.g., stage or postset)
        const data = await getPurchases();
        const filtered = data.filter(r => {
          const stageKey = Object.keys(r).find(k => k.toLowerCase() === 'stage');
          const stageVal = stageKey ? String(r[stageKey]).trim() : '';
          return stageVal === '1001';
        });
        const syncedData = filtered.map((r, i) => ({ ...r, __id: `DB-${r.id || i}` }));
        setExcelData(syncedData);
      } catch (err) {
        alert(`Database Authorization Error: ${err.message}`);
      } finally {
        setIsScanning(false);
        setViewMode('list');
        setSelectedRecord(null);
      }
    } else {
      alert("⚠️ Error: Cannot authorize record without a database ID. Please ensure the file was correctly synced.");
      setViewMode('list');
      setSelectedRecord(null);
    }
  };

  const getFieldType = (key, value) => {
    const k = key.toLowerCase();
    if (k.includes('date')) return 'date';
    if (k.includes('amount') || k.includes('value') || k.includes('price')) return 'number';
    return 'text';
  };

  return (
    <div className="file-upload-screen">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls, .csv"
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-sm outline" style={{ padding: '8px' }} onClick={() => viewMode === 'form' ? setViewMode('list') : onNavigate('gsec')}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="topbar-title" style={{ margin: 0 }}>
              {viewMode === 'form' ? 'G-Sec Investment Authorization' : 'G-Sec Excel Data Management'}
            </h2>
            <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
              {viewMode === 'form' ? `Authorizing record: ${selectedRecord?.__id}` : (selectedFileName ? `Source: ${selectedFileName}` : 'Upload excel file to import transaction records')}
            </div>
          </div>
        </div>

        {viewMode === 'list' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-sm gold" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleUploadClick} disabled={isScanning}>
              {isScanning ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
              Upload Excel
            </button>
            <button className="btn-sm outline" style={{ color: 'var(--danger)' }} onClick={() => {
              setExcelData([]);
              setHeaders([]);
              setSelectedFileName(null);
              localStorage.removeItem('gsec_excel_data');
              localStorage.removeItem('gsec_excel_headers');
              localStorage.removeItem('gsec_excel_filename');
            }}>
              Clear Data
            </button>
          </div>
        )}
      </div>

      {viewMode === 'list' ? (
        <>
          <div className="report-cards-5">
            <div className="report-card"><div className="rc-label">Total Records</div><div className="rc-value">{excelData.length}</div></div>
            <div className="report-card"><div className="rc-label">Total Columns</div><div className="rc-value">{headers.length}</div></div>
            <div className="report-card"><div className="rc-label">Import Status</div><div className="rc-value" style={{ color: excelData.length > 0 ? 'var(--success)' : 'var(--gray-400)' }}>{excelData.length > 0 ? 'SYNCED' : 'WAITING'}</div></div>
            <div className="report-card"><div className="rc-label">System Mode</div><div className="rc-value">DATABASE</div></div>
            <div className="report-card" style={{ borderLeft: selectedFileName ? '3px solid var(--success)' : '3px solid var(--gray-300)' }}>
              <div className="rc-label">Current File</div>
              <div className="rc-value" style={{ color: selectedFileName ? 'var(--success)' : 'var(--gray-400)', fontSize: '10px', marginTop: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedFileName || 'NO FILE'}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" style={{ padding: '0 18px', borderBottom: 'none' }}>
              <div className="tab-bar" style={{ marginBottom: 0, background: 'transparent', padding: 0 }}>
                <div className={`tab active`}>
                  Dynamic Data Grid {excelData.length > 0 && <span className="nav-badge" style={{ position: 'static', marginLeft: '6px' }}>{excelData.length}</span>}
                </div>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', padding: '10px 0' }}>
                <div className="search-input-wrap" style={{ width: '200px', marginBottom: 0 }}>
                  <Search className="search-icon" />
                  <input type="text" placeholder="Filter dynamic records..." style={{ padding: '6px 10px 6px 33px' }} />
                </div>
                <button className="btn-sm outline"><Filter size={14} /></button>
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
                <div className="table-responsive" style={{ maxHeight: '600px' }}>
                  <table className="data-table density-high">
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
                      {excelData.map(record => (
                        <tr key={record.__id}>
                          <td style={{ position: 'sticky', left: 0, zIndex: 10, background: '#fff' }}><code>{record.__id}</code></td>
                          {headers.map(header => (
                            <td key={header}>{record[header]?.toString() || '-'}</td>
                          ))}
                          <td style={{ position: 'sticky', right: 0, zIndex: 10, background: '#fff' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button className="btn-sm teal" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => selectRecord(record)}>
                                Select
                              </button>
                              <button className="btn-sm outline" style={{ padding: '4px 8px', color: 'var(--danger)' }} onClick={() => deleteRecord(record)}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '100px 0', textAlign: 'center' }}>
                  <FileSpreadsheet size={64} style={{ color: 'var(--gray-200)', marginBottom: '20px' }} />
                  <h3 style={{ color: 'var(--navy)' }}>Excel Repository Empty</h3>
                  <p style={{ color: 'var(--gray-400)', maxWidth: '400px', margin: '10px auto' }}>
                    Upload any Excel file. All columns and rows will be rendered dynamically for processing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} /> Dynamic Form Authorization
            </span>
            <span className="badge slr">{selectedRecord?.__id}</span>
          </div>
          <div className="card-body">
            <div className="form-section">
              <div className="form-section-title">Record Information (Auto-fetched)</div>
              <div className="form-grid-3">
                {headers.map(header => (
                  <div className="form-group" key={header}>
                    <label className="form-label">{header}</label>
                    <input
                      className="form-input"
                      type={getFieldType(header, selectedRecord?.[header])}
                      defaultValue={selectedRecord?.[header]?.toString() || ''}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="alert-banner info" style={{ marginTop: '20px' }}>
              <ShieldCheck size={16} /> <strong>Data Integrity Check:</strong> All {headers.length} fields from the Excel row have been auto-populated. Please verify before authorization.
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
              <button className="topbar-btn btn-outline" onClick={() => setViewMode('list')}>Cancel & Return</button>
              <button className="topbar-btn btn-primary" style={{ minWidth: '150px', background: 'var(--success)', borderColor: 'var(--success)' }} onClick={handleAuthorize}>
                Confirm Authorization <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
