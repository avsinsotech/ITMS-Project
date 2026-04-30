import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Hash, Layers, ListFilter, Download, 
  PieChart, History, Loader2, AlertCircle, FileSpreadsheet,
  Search, ShieldCheck 
} from 'lucide-react';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getGSecurityReport } from '../../services/reportService';

const HoldingRegister = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    type: 'All',
    selection: 'All',
    asOnDate: new Date().toISOString().split('T')[0],
    isinCode: '',
    category: ''
  });

  const [reportData, setReportData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [groupBy, setGroupBy] = useState('category'); // 'category' or 'type'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const displayColumns = [
    { label: 'Sr. No.', key: '__sr_no' },
    { label: 'Purchase Date', key: 'DATE_PURCHASE', alias: ['Trade_Date', 'PURCHASE_DATE', 'TRADE_DATE', 'PurchaseDate'] },
    { label: 'Acc No', key: 'GLCODE', alias: ['Acc_No', 'ACC_NO', 'AccountNo', 'ACCOUNTNO', 'GLCODE', 'ACCNO'] },
    { label: 'ISIN Code', key: 'ISIN', alias: ['isin', 'IsinCode', 'ISINCODE', 'ISIN_CODE'] },
    { label: 'Description', key: 'description', alias: ['SECURITY_NAME', 'Sec_Name', 'SEC_NAME', 'Description', 'DESCRIPTION'] },
    { label: 'Maturity Date', key: 'MATURITY_DATE', alias: ['MATURITY_DATE', 'MaturityDate', 'MAT_DATE', 'Mat_Date'] },
    { label: 'Category', key: 'category', alias: ['CATEGORY', 'category', 'CLASS', 'Classification'] },
    { label: 'Holding Type', key: 'glname', alias: ['GLNAME', 'Holding_Type', 'HOLDING_TYPE', 'HoldingType', 'GL_Name'] },
    { label: 'CBS AccountNo', key: 'ACCNO', alias: ['CBS_ACCOUNTNO', 'CBSAccountNo', 'CBS_Account', 'CBSAccNo', 'CBSACCNO'] },
    { label: 'RecSrNo', key: 'RECSRNO', alias: ['RECSRNO', 'Rec_Sr_No', 'RecNo', 'RECNO', 'SrNo', 'SRNO'] },
    { label: 'Face Value', key: 'FACE_VALUE', alias: ['FACE_VALUE', 'FaceValue', 'FACEVALUE', 'FVAL', 'Face_Amt'] },
    { label: 'Rate', key: 'PURCHASE_RATE', alias: ['RATE', 'rate', 'Coupon', 'COUPON', 'CouponRate', 'PURCHASE_RATE'] },
    { label: 'Book Value', key: 'BOOK_VALUE', alias: ['BOOK_VALUE', 'BookValue', 'BOOKVALUE', 'BVAL', 'Book_Amt'] },
    { label: 'Int. Rec.', key: 'Accrud_Int', alias: ['INT_REC', 'Accrud_Int', 'Accrued_Int', 'INTEREST_REC', 'IntRec', 'Interest_Receivable'] }
  ];


  const getVal = (row, colConfig) => {
    if (!row) return '-';
    if (colConfig.key === '__sr_no') return null;
    
    // 1. Direct match
    if (row[colConfig.key] !== undefined) return row[colConfig.key];
    
    // 2. Alias match
    if (colConfig.alias) {
      for (const a of colConfig.alias) {
        if (row[a] !== undefined) return row[a];
      }
    }
    
    // 3. Case-insensitive search
    const lowerKey = colConfig.key.toLowerCase();
    const foundKey = Object.keys(row).find(k => k.toLowerCase() === lowerKey);
    if (foundKey) return row[foundKey];
    
    // 4. Loose Match (Containment)
    const labelLower = colConfig.label.toLowerCase().replace(/[\s\.]/g, '');
    const looseMatch = Object.keys(row).find(k => {
      const kl = k.toLowerCase().replace(/[\s_]/g, '');
      return kl.includes(labelLower) || labelLower.includes(kl);
    });
    if (looseMatch) return row[looseMatch];

    return '-';
  };

  const categories = Object.keys(groupedData);
  const currentCategory = categories[currentCategoryIndex];
  const currentRows = currentCategory ? groupedData[currentCategory] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const performGrouping = (data, mode) => {
    return data.reduce((acc, row) => {
      let key = 'General';
      if (mode === 'category') {
        key = row.category || row.Category || 'General';
      } else {
        key = row.glname || row.GLNAME || 'Other';
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(row);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (reportData.length > 0) {
      const grouped = performGrouping(reportData, groupBy);
      setGroupedData(grouped);
      setCurrentCategoryIndex(0);
    }
  }, [groupBy]);

  const fetchReport = async (reportType) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      if (reportType === 'ALL') endpoint = 'details';
      else if (reportType === 'AllSummary') endpoint = 'summary';
      else if (reportType === 'DateWise') endpoint = 'date-wise'; 

      const params = {
        wDate: formData.asOnDate,
        prdcode: formData.type === 'All' ? '' : formData.type,
        isin: formData.selection === 'All' ? '' : formData.isinCode,
        category: formData.category || '0'
      };

      const data = await getGSecurityReport(endpoint, params);
      
      const sortedData = [...data].sort((a, b) => {
        const typeA = (a.glname || a.GLNAME || '').toString();
        const typeB = (b.glname || b.GLNAME || '').toString();
        return typeA.localeCompare(typeB);
      });

      setReportData(sortedData);
      const grouped = performGrouping(sortedData, groupBy);
      setGroupedData(grouped);
      setCurrentCategoryIndex(0);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(err.message || 'Failed to fetch report data.');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    if (reportData.length === 0) {
      alert('No data available to export.');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Holding Report', {
      views: [{ showGridLines: false }]
    });

    // --- Column Widths (matching template) ---
    ws.columns = [
      { width: 6 },   // A(1) - Sr No
      { width: 5 },   // B(2) - PurchaseDate part
      { width: 3 },   // C(3)
      { width: 3 },   // D(4)
      { width: 3 },   // E(5)
      { width: 8 },   // F(6) - Acc No
      { width: 14 },  // G(7) - ISIN Code
      { width: 30 },  // H(8) - Description
      { width: 12 },  // I(9) - Maturity Date
      { width: 12 },  // J(10) - Category
      { width: 3 },   // K(11)
      { width: 1 },   // L(12)
      { width: 8 },   // M(13) - Holding Type
      { width: 3 },   // N(14)
      { width: 8 },   // O(15) - CBS AccNo
      { width: 3 },   // P(16)
      { width: 3 },   // Q(17)
      { width: 3 },   // R(18)
      { width: 8 },   // S(19) - RecSrNo
      { width: 12 },  // T(20) - Face Value
      { width: 3 },   // U(21)
      { width: 3 },   // V(22)
      { width: 8 },   // W(23) - Rate
      { width: 12 },  // X(24) - Book Value
      { width: 10 },  // Y(25) - Int Rec
      { width: 3 },   // Z(26)
    ];

    const headerFont = { name: 'Arial', size: 9 };
    const titleFont = { name: 'Arial', size: 10, bold: true };
    const dataFont = { name: 'Arial', size: 8 };
    const thinBorder = { style: 'thin', color: { argb: 'FF000000' } };
    const allBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

    // ==================== HEADER SECTION (10 rows, no gridlines) ====================

    // Row 1: Bank Name (left)
    ws.mergeCells('A1:M1');
    const bankLabelCell = ws.getCell('A1');
    bankLabelCell.value = 'Bank Name : DEMO BANK';
    bankLabelCell.font = headerFont;
    bankLabelCell.alignment = { vertical: 'middle' };

    // Row 2: Print Date (right side)
    const now = new Date();
    ws.mergeCells('N2:Z2');
    const dateLabelCell = ws.getCell('N2');
    dateLabelCell.value = `Print Date : ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    dateLabelCell.font = headerFont;
    dateLabelCell.alignment = { vertical: 'middle' };

    // Row 4: Branch Name (left)
    ws.mergeCells('A4:M4');
    const branchLabelCell = ws.getCell('A4');
    branchLabelCell.value = 'Branch Name: HEAD OFFICE';
    branchLabelCell.font = headerFont;
    branchLabelCell.alignment = { vertical: 'middle' };

    // Row 5: Print UserID (right side)
    ws.mergeCells('N5:Z5');
    const userLabelCell = ws.getCell('N5');
    userLabelCell.value = 'Print UserID: AVS';
    userLabelCell.font = headerFont;
    userLabelCell.alignment = { vertical: 'middle' };

    // Row 8: Title (centered across full width)
    ws.mergeCells('A8:Z8');
    const titleCell = ws.getCell('A8');
    titleCell.value = `As On Holding Position ${formData.asOnDate}`;
    titleCell.font = titleFont;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // ==================== COLUMN HEADERS (Row 11) ====================
    const HEADER_ROW = 11;
    const colMap = [
      { col: 1, label: 'Sr.\nNo.', mergeEnd: null },
      { col: 2, label: 'Purchase\nDate', mergeEnd: 5 },
      { col: 6, label: 'Acc No', mergeEnd: null },
      { col: 7, label: 'ISIN Code', mergeEnd: null },
      { col: 8, label: 'Description', mergeEnd: null },
      { col: 9, label: 'Maturity Date', mergeEnd: null },
      { col: 10, label: 'Category', mergeEnd: 11 },
      { col: 13, label: 'Holding Type', mergeEnd: 14 },
      { col: 15, label: 'CBS AccountNo', mergeEnd: 18 },
      { col: 19, label: 'RecSrNo', mergeEnd: null },
      { col: 20, label: 'Face Value', mergeEnd: 22 },
      { col: 23, label: 'Rate', mergeEnd: null },
      { col: 24, label: 'Book Value', mergeEnd: null },
      { col: 25, label: 'Int. Rec.', mergeEnd: 26 },
    ];

    colMap.forEach(({ col, label, mergeEnd }) => {
      if (mergeEnd) {
        ws.mergeCells(HEADER_ROW, col, HEADER_ROW, mergeEnd);
      }
      const cell = ws.getCell(HEADER_ROW, col);
      cell.value = label;
      cell.font = { name: 'Arial', size: 8, bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = allBorders;
      // Fill merged cells borders
      if (mergeEnd) {
        for (let c = col; c <= mergeEnd; c++) {
          ws.getCell(HEADER_ROW, c).border = allBorders;
        }
      }
    });

    // ==================== DATA ROWS ====================
    let currentRow = HEADER_ROW + 1;
    let grandFace = 0, grandBook = 0, grandInt = 0;

    // Helper: write a data row with merges and borders
    const writeDataRow = (rowNum, values, isBold = false, isCategory = false) => {
      // Define the column groups with merges
      const dataColMap = [
        { col: 1, mergeEnd: null },   // Sr No
        { col: 2, mergeEnd: 5 },      // Purchase Date
        { col: 6, mergeEnd: null },   // Acc No
        { col: 7, mergeEnd: null },   // ISIN
        { col: 8, mergeEnd: null },   // Description
        { col: 9, mergeEnd: null },   // Maturity Date
        { col: 10, mergeEnd: 11 },    // Category
        { col: 13, mergeEnd: 14 },    // Holding Type
        { col: 15, mergeEnd: 18 },    // CBS AccountNo
        { col: 19, mergeEnd: null },  // RecSrNo
        { col: 20, mergeEnd: 22 },    // Face Value
        { col: 23, mergeEnd: null },  // Rate
        { col: 24, mergeEnd: null },  // Book Value
        { col: 25, mergeEnd: 26 },    // Int Rec
      ];

      if (isCategory) {
        // Category header spans entire row
        ws.mergeCells(rowNum, 1, rowNum, 26);
        const cell = ws.getCell(rowNum, 1);
        cell.value = values[0];
        cell.font = { name: 'Arial', size: 8, bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        for (let c = 1; c <= 26; c++) {
          ws.getCell(rowNum, c).border = allBorders;
        }
        return;
      }

      dataColMap.forEach(({ col, mergeEnd }, idx) => {
        if (mergeEnd) {
          ws.mergeCells(rowNum, col, rowNum, mergeEnd);
        }
        const cell = ws.getCell(rowNum, col);
        cell.value = values[idx] !== undefined ? values[idx] : '';
        cell.font = isBold ? { name: 'Arial', size: 8, bold: true } : dataFont;
        cell.alignment = { vertical: 'middle' };
        cell.border = allBorders;
        if (mergeEnd) {
          for (let c = col; c <= mergeEnd; c++) {
            ws.getCell(rowNum, c).border = allBorders;
          }
        }
      });
    };

    // Helper: write a total row
    const writeTotalRow = (rowNum, label, faceVal, bookVal, intVal) => {
      // Merge label across first 19 cols
      ws.mergeCells(rowNum, 1, rowNum, 19);
      const labelCell = ws.getCell(rowNum, 1);
      labelCell.value = label;
      labelCell.font = { name: 'Arial', size: 8, bold: true };
      labelCell.alignment = { horizontal: 'right', vertical: 'middle' };
      for (let c = 1; c <= 19; c++) ws.getCell(rowNum, c).border = allBorders;

      // Face Value
      ws.mergeCells(rowNum, 20, rowNum, 22);
      const faceCell = ws.getCell(rowNum, 20);
      faceCell.value = faceVal;
      faceCell.font = { name: 'Arial', size: 8, bold: true };
      faceCell.alignment = { vertical: 'middle' };
      for (let c = 20; c <= 22; c++) ws.getCell(rowNum, c).border = allBorders;

      // Rate (col 23) - empty
      ws.getCell(rowNum, 23).border = allBorders;

      // Book Value (col 24)
      const bookCell = ws.getCell(rowNum, 24);
      bookCell.value = bookVal;
      bookCell.font = { name: 'Arial', size: 8, bold: true };
      bookCell.alignment = { vertical: 'middle' };
      bookCell.border = allBorders;

      // Int Rec
      ws.mergeCells(rowNum, 25, rowNum, 26);
      const intCell = ws.getCell(rowNum, 25);
      intCell.value = intVal;
      intCell.font = { name: 'Arial', size: 8, bold: true };
      intCell.alignment = { vertical: 'middle' };
      for (let c = 25; c <= 26; c++) ws.getCell(rowNum, c).border = allBorders;
    };

    Object.keys(groupedData).forEach(groupName => {
      // Category Header Row
      writeDataRow(currentRow, [groupName.toUpperCase()], true, true);
      currentRow++;

      let groupFace = 0, groupBook = 0, groupInt = 0;

      groupedData[groupName].forEach((row, idx) => {
        const faceVal = parseFloat(getVal(row, displayColumns[10])) || 0;
        const bookVal = parseFloat(getVal(row, displayColumns[12])) || 0;
        const intRec = parseFloat(getVal(row, displayColumns[13])) || 0;
        groupFace += faceVal;
        groupBook += bookVal;
        groupInt += intRec;

        writeDataRow(currentRow, [
          idx + 1,                                    // Sr No
          getVal(row, displayColumns[1]),              // Purchase Date
          getVal(row, displayColumns[2]),              // Acc No
          getVal(row, displayColumns[3]),              // ISIN Code
          getVal(row, displayColumns[4]),              // Description
          getVal(row, displayColumns[5]),              // Maturity Date
          getVal(row, displayColumns[6]),              // Category
          getVal(row, displayColumns[7]),              // Holding Type
          getVal(row, displayColumns[8]),              // CBS AccountNo
          getVal(row, displayColumns[9]),              // RecSrNo
          faceVal,                                     // Face Value
          parseFloat(getVal(row, displayColumns[11])) || 0, // Rate
          bookVal,                                     // Book Value
          intRec,                                      // Int Rec
        ]);
        currentRow++;
      });

      // Subtotal Row
      writeTotalRow(currentRow, 'Total :', groupFace, groupBook, groupInt);
      currentRow++;

      grandFace += groupFace;
      grandBook += groupBook;
      grandInt += groupInt;
    });

    // Grand Total Row
    writeTotalRow(currentRow, 'GRAND TOTAL :', grandFace, grandBook, grandInt);

    // ==================== DOWNLOAD ====================
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Holding_Report_${formData.asOnDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };





  const exportToPDF = () => {
    if (reportData.length === 0) {
      alert('No data available to export.');
      return;
    }
    
    try {
      const doc = new jsPDF('landscape');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header Information matching legacy screenshots
      doc.setFontSize(7);
      doc.setTextColor(0);
      doc.text('Bank Name  : DEMO BANK', 14, 15);
      doc.text('Branch Name: HEAD OFFICE', 14, 22);
      
      doc.text(`Print Date : ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - 80, 15);
      doc.text('Print UserID: AVS', pageWidth - 80, 22);
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`As On Holding Position ${formData.asOnDate}`, pageWidth / 2.2, 13, { align: 'center' });

      const tableColumn = displayColumns.map(c => c.label.toUpperCase());
      const body = [];
      
     // Remove initial gap after main header (it was adding extra space)
      body.push([{ 
      content: '', 
      colSpan: displayColumns.length, 
      styles: { minCellHeight: 4, fillColor: [255, 255, 255], lineWidth: 0 } 
       }]);

      let grandFace = 0;
      let grandBook = 0;
      let grandInt = 0;

      Object.keys(groupedData).forEach(groupName => {
        // Group Header Row
        body.push([
          { 
            content: groupName.toUpperCase(), 
            colSpan: displayColumns.length, 
            styles: { 
              fillColor: [220, 235, 255], // Light Blue (Sub heading)
              textColor: [31, 56, 100], // Navy Text
              fontStyle: 'bold', 
              halign: 'center',
              fontSize: 8 
            } 
          }
        ]);

        let groupFace = 0;
        let groupBook = 0;
        let groupInt = 0;

        groupedData[groupName].forEach((row, idx) => {
          const rowData = displayColumns.map(col => {
            if (col.key === '__sr_no') return (idx + 1).toString();
            const v = getVal(row, col);
            
            if (col.label === 'Face Value') groupFace += (parseFloat(v) || 0);
            if (col.label === 'Book Value') groupBook += (parseFloat(v) || 0);
            if (col.label === 'Int. Rec.') groupInt += (parseFloat(v) || 0);

            if (typeof v === 'number' && (col.label.includes('Value') || col.label === 'Rate' || col.label.includes('Int'))) {
              return v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return (v === null || v === undefined) ? '-' : v.toString();
          });
          body.push(rowData);
        });

        // Subtotal Row
        const subtotalRow = displayColumns.map(col => {
          if (col.label === 'Description') return `Total: ${groupName}`;
          if (col.label === 'Face Value') return groupFace.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (col.label === 'Book Value') return groupBook.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (col.label === 'Int. Rec.') return groupInt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          return '';
        });
        body.push(subtotalRow.map(v => ({ 
          content: v, 
          styles: { 
            fontStyle: 'bold', 
            fillColor: [240, 249, 255], // Very Light Blue
            textColor: [30, 58, 138] // Deep Blue
          } 
        })));

        // Add a blank gap row between categories
        body.push([{ 
          content: '', 
          colSpan: displayColumns.length, 
          styles: { minCellHeight: 5, fillColor: [255, 255, 255], lineWidth: 0 } 
        }]);

        grandFace += groupFace;
        grandBook += groupBook;
        grandInt += groupInt;
      });

      // Grand Total Row
      const grandTotalRow = displayColumns.map(col => {
        if (col.label === 'Description') return 'GRAND TOTAL';
        if (col.label === 'Face Value') return grandFace.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (col.label === 'Book Value') return grandBook.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (col.label === 'Int. Rec.') return grandInt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return '';
      });
      body.push(grandTotalRow.map(v => ({ 
        content: v, 
        styles: { 
          fontStyle: 'bold', 
          fillColor: [21, 128, 61], // Success Green
          textColor: [255, 255, 255],
          fontSize: 8
        } 
      })));

      autoTable(doc, {
        head: [tableColumn],
        body: body,
        startY: 28,
        theme: 'grid',
        styles: { fontSize: 6, cellPadding: 1, overflow: 'linebreak', lineColor: [226, 232, 240] },
        headStyles: { 
          fillColor: [31, 56, 100], // Dark Navy (Main heading)
          textColor: [255, 255, 255], 
          fontStyle: 'bold', 
          lineWidth: 0.1,
          halign: 'center'
        },
        columnStyles: {
          10: { halign: 'right' }, // Face Value
          11: { halign: 'right' }, // Rate
          12: { halign: 'right' }, // Book Value
          13: { halign: 'right' }, // Int Rec
        }
      });

      doc.save(`Holding_Report_${formData.asOnDate}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to generate PDF. Please check the console for details.');
    }
  };

  const renderField = (label, icon, content) => (
    <div className="form-group" style={{ marginBottom: '0px' }}>
      <label className="form-label" style={{ 
        display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', 
        fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px'
      }}>
        {icon} {label}
      </label>
      {content}
    </div>
  );

  return (
    <div className="holding-register-container" style={{ padding: '20px', background: '#f1f5f9', minHeight: '100vh' }}>
      <div className="card shadow-sm" style={{ border: 'none', borderRadius: '8px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '20px 24px', background: 'var(--navy)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--gold)" /> Investment Register Report
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
             <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>TOTAL RECORDS</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{reportData.length}</div>
             </div>
             <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>PORTFOLIO VALUE</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--gold)' }}>
                  ₹{reportData.reduce((acc, row) => acc + (parseFloat(row.Face_Value || row.FACE_VALUE) || 0), 0).toLocaleString('en-IN')}
                </div>
             </div>
          </div>
        </div>

        <div className="card-body" style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {renderField('Investment Type', <Layers size={14} />, (
                <select name="type" value={formData.type} onChange={handleChange} className="form-select" style={{ height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                  <option value="All">All Instruments</option>
                  <option value="G-Sec">G-Sec</option>
                  <option value="SDL">SDL</option>
                  <option value="T-Bills">T-Bills</option>
                  <option value="Corporate">Corporate Bonds</option>
                </select>
              ))}
              {renderField('Category', <Layers size={14} />, (
                <select name="category" value={formData.category} onChange={handleChange} className="form-select" style={{ height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                  <option value="0">All Categories</option>
                  <option value="HTM">HTM</option>
                  <option value="AFS">AFS</option>
                  <option value="HFT">HFT</option>
                </select>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {renderField('As On Date', <Calendar size={14} />, (
                <input type="date" name="asOnDate" value={formData.asOnDate} onChange={handleChange} className="form-input" style={{ height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
              ))}
              {renderField('ISIN Search', <Hash size={14} />, (
                <input type="text" name="isinCode" value={formData.isinCode} onChange={handleChange} placeholder="Enter ISIN..." className="form-input" disabled={formData.selection === 'All'} style={{ height: '40px', background: formData.selection === 'All' ? '#f1f5f9' : '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
              ))}
            </div>
            <div style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              {renderField('Report Scope', <ListFilter size={14} />, (
                <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
                  {['All', 'Specific', 'Group wise'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: 'var(--navy)' }}>
                      <input type="radio" name="selection" value={opt} checked={formData.selection === opt} onChange={handleChange} style={{ accentColor: 'var(--navy)', width: '18px', height: '18px' }} />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '6px', color: '#b91c1c', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div style={{ marginTop: '32px', padding: '20px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn-primary" disabled={loading} onClick={() => fetchReport('ALL')} style={{ background: 'var(--navy)', padding: '12px 28px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', borderRadius: '6px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} G-Sec Holding Detail
            </button>
            <button className="btn-primary" disabled={loading} onClick={() => fetchReport('AllSummary')} style={{ background: '#059669', padding: '12px 28px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', borderRadius: '6px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <PieChart size={16} />} Holding Summary
            </button>
            <button className="btn-primary" disabled={loading} onClick={() => fetchReport('DateWise')} style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '12px 28px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', borderRadius: '6px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <History size={16} />} Date Wise Position
            </button>
            <div style={{ width: '2px', background: '#e2e8f0', margin: '0 10px' }} />
            <button className="btn-outline" style={{ padding: '12px 28px', fontSize: '14px', fontWeight: '700', borderRadius: '6px', color: '#dc2626', background: '#fff' }} onClick={() => onNavigate('dashboard')}>Exit</button>
          </div>
        </div>
      </div>

      {reportData.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={exportToExcel} className="btn-sm" style={{ background: '#166534', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <FileSpreadsheet size={16} /> Export to Excel
            </button>
            <button onClick={exportToPDF} className="btn-sm" style={{ background: '#991b1b', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <FileText size={16} /> Export to PDF
            </button>
          </div>
          <div style={{ display: 'flex', background: '#fff', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <button onClick={() => setGroupBy('category')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: groupBy === 'category' ? 'var(--navy)' : 'transparent', color: groupBy === 'category' ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Category Wise</button>
            <button onClick={() => setGroupBy('type')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: groupBy === 'type' ? 'var(--navy)' : 'transparent', color: groupBy === 'type' ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Type Wise</button>
          </div>
        </div>
      )}


      <div className="card shadow-sm" style={{ marginTop: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: '#fcfcfd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {currentCategory ? `${groupBy.toUpperCase()}: ${currentCategory}` : 'Report Results'}
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {currentCategory ? `Showing ${currentRows.length} of ${reportData.length} total records` : `Total Records: ${reportData.length}`}
            </span>
          </div>

          {categories.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>JUMP TO:</span>
                <select value={currentCategoryIndex} onChange={(e) => setCurrentCategoryIndex(parseInt(e.target.value))} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: '600', border: '1px solid #e2e8f0', borderRadius: '4px', background: '#fff', color: 'var(--navy)' }}>
                  {categories.map((cat, idx) => (
                    <option key={cat} value={idx}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setCurrentCategoryIndex(prev => Math.max(0, prev - 1))} disabled={currentCategoryIndex === 0} style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid #e2e8f0', background: currentCategoryIndex === 0 ? '#f8fafc' : '#fff', fontSize: '13px', fontWeight: '700', cursor: currentCategoryIndex === 0 ? 'not-allowed' : 'pointer', color: currentCategoryIndex === 0 ? '#cbd5e1' : 'var(--navy)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ListFilter size={14} /> Previous
                </button>
                <div style={{ padding: '8px 16px', background: 'var(--navy)', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: '800', minWidth: '80px', textAlign: 'center' }}>
                  {currentCategoryIndex + 1} / {categories.length}
                </div>
                <button onClick={() => setCurrentCategoryIndex(prev => Math.min(categories.length - 1, prev + 1))} disabled={currentCategoryIndex === categories.length - 1} style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid #e2e8f0', background: currentCategoryIndex === categories.length - 1 ? '#f8fafc' : '#fff', fontSize: '13px', fontWeight: '700', cursor: currentCategoryIndex === categories.length - 1 ? 'not-allowed' : 'pointer', color: currentCategoryIndex === categories.length - 1 ? '#cbd5e1' : 'var(--navy)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Next <ListFilter size={14} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            </div>
          )}
        </div>        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="data-table density-high" style={{ minWidth: '1500px', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                {displayColumns.map((col) => (
                  <th key={col.key} style={{ fontSize: '11px', padding: '12px 16px', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #f1f5f9', textAlign: (col.label.includes('Value') || col.label === 'Rate') ? 'right' : 'left', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="100%" style={{ textAlign: 'center', padding: '80px' }}>
                    <Loader2 size={40} className="animate-spin" style={{ color: 'var(--navy)', margin: '0 auto' }} />
                    <div style={{ marginTop: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Processing Data...</div>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="100%" style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: '14px' }}>
                    No report data available for this selection.
                  </td>
                </tr>
              ) : (
                currentRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                    {displayColumns.map((col, ci) => {
                      const val = col.key === '__sr_no' ? (idx + 1) : getVal(row, col);
                      const isNumeric = col.label.includes('Value') || col.label === 'Rate' || col.label.includes('Int');
                      return (
                        <td key={ci} style={{ fontSize: '12px', padding: '10px 16px', textAlign: isNumeric ? 'right' : 'left', color: '#1e293b', whiteSpace: 'nowrap', borderRight: '1px solid #f8fafc' }}>
                          {isNumeric && typeof val === 'number' ? (
                             <span style={{ fontWeight: col.label.includes('Value') ? '600' : 'normal', color: col.label.includes('Value') ? 'var(--navy)' : '#1e293b' }}>
                               {val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                             </span>
                          ) : (val?.toString() || '-')}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {currentRows.length > 0 && (
          <div style={{ padding: '20px 24px', background: '#f0f9ff', borderTop: '2px solid #bae6fd', display: 'flex', gap: '48px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ padding: '8px', background: '#fff', borderRadius: '6px', border: '1px solid #bae6fd', color: '#0369a1' }}>
                <PieChart size={20} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category Face Value</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--navy)' }}>
                  ₹{currentRows.reduce((acc, row) => acc + (parseFloat(getVal(row, displayColumns.find(c => c.label === 'Face Value'))) || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            <div style={{ width: '1px', height: '30px', background: '#bae6fd' }} />
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ padding: '8px', background: '#fff', borderRadius: '6px', border: '1px solid #bbf7d0', color: '#15803d' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category Book Value</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#15803d' }}>
                  ₹{currentRows.reduce((acc, row) => acc + (parseFloat(getVal(row, displayColumns.find(c => c.label === 'Book Value'))) || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingRegister;