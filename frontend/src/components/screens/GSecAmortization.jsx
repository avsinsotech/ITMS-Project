import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export default function GSecAmortization() {
    const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data generation matching the provided screenshot columns exactly
    const generateDummyData = () => {
        return [
            { srNo: 1, purchaseDate: '21/01/2015', isin: 'IN2220140171', description: '8.24% SDL MH 2024', maturityDate: '24/12/2024', category: 'Held To Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '97', recSrNo: '9456', faceValue: 10000000.00, rate: 101.56, bookValue: 10465000.00, intRec: 7638022.00, remainingYear: 1, diffAmount: 465000.00, amortizationAmount: 465000.00, applicable: 'Applicable' },
            { srNo: 2, purchaseDate: '20/12/2018', isin: 'IN1520150047', description: '08.23 GUJARAT SDL 2025', maturityDate: '09/09/2025', category: 'Held To Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '113', recSrNo: '5758', faceValue: 10000000.00, rate: 101.16, bookValue: 10116000.00, intRec: 9103294.00, remainingYear: 2, diffAmount: 116000.00, amortizationAmount: 58000.00, applicable: 'Applicable' },
            { srNo: 3, purchaseDate: '31/05/2019', isin: 'IN2220140163', description: '08.16 MAHARASHTRA SDL 2024', maturityDate: '10/12/2024', category: 'Held To Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '129', recSrNo: '10802', faceValue: 25000000.00, rate: 102.45, bookValue: 25611600.00, intRec: 19233800.00, remainingYear: 1, diffAmount: 611600.00, amortizationAmount: 611600.00, applicable: 'Applicable' },
            { srNo: 4, purchaseDate: '13/12/2021', isin: 'IN2220150055', description: '08.28 MAHARASHTRA SDL 2025', maturityDate: '29/07/2025', category: 'Available For Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '132', recSrNo: '17427', faceValue: 4430000.00, rate: 103.14, bookValue: 4569070.99, intRec: 1897192.00, remainingYear: 2, diffAmount: 139070.99, amortizationAmount: 69535.50, applicable: 'Applicable' },
            { srNo: 5, purchaseDate: '07/08/2016', isin: 'IN3120150179', description: '8.27% TN 2026', maturityDate: '13/01/2026', category: 'Held To Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '134', recSrNo: '405', faceValue: 10000000.00, rate: 103.08, bookValue: 10348500.00, intRec: 10103183.00, remainingYear: 3, diffAmount: 348500.00, amortizationAmount: 116166.67, applicable: 'Applicable' },
            { srNo: 6, purchaseDate: '07/08/2016', isin: 'IN2120150072', description: '8.27% MP 2025', maturityDate: '23/12/2025', category: 'Available For Maturity', holdingType: 'SLR', head: '416', prodcode: '416', cbsAccountNo: '135', recSrNo: '406', faceValue: 7500000.00, rate: 103.06, bookValue: 7760100.00, intRec: 7611846.00, remainingYear: 3, diffAmount: 260100.00, amortizationAmount: 86700.00, applicable: 'Applicable' }
        ];
    }

    const handleReport = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            openReportWindow(generateDummyData());
        }, 500);
    };

    const openReportWindow = (data) => {
        const formattedDate = asOnDate.split('-').reverse().join('/');
        
        // Build HTML for the new window to exactly match the requested layout but with premium styling
        const html = `
            <html>
                <head>
                    <title>Amortization Report</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Inter', sans-serif; font-size: 10px; padding: 0; margin: 0; color: #333; background: #f4f7f9; }
                        .report-container { margin: 10px auto; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: calc(100% - 20px); box-sizing: border-box; }
                        
                        /* Toolbar Styling */
                        .toolbar { background: #1a2942; padding: 10px 15px; display: flex; gap: 10px; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(26, 41, 66, 0.15); position: sticky; left: 0; top: 0; z-index: 10; }
                        .btn { padding: 6px 12px; cursor: pointer; border: none; background: rgba(255,255,255,0.1); color: #fff; border-radius: 4px; font-size: 11px; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
                        .btn:hover { background: rgba(255,255,255,0.2); transform: translateY(-1px); }
                        .btn-gold { background: #d4af37; color: #1a2942; }
                        .btn-gold:hover { background: #ebd575; }
                        
                        /* Header Styling */
                        .header-bar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; border-bottom: 1px solid #f0f4f8; padding-bottom: 10px; }
                        .header-info { font-size: 10px; line-height: 1.4; color: #64748b; }
                        .header-info strong { color: #0f172a; font-size: 11px; font-weight: 700; }
                        
                        .title-container { text-align: center; margin-bottom: 15px; }
                        .title { font-size: 16px; font-weight: 700; color: #1a2942; margin: 0 0 2px 0; letter-spacing: 0.2px; }
                        .subtitle { font-size: 11px; color: #64748b; font-weight: 500; }
                        
                        /* Table Styling - Ultra Compact */
                        table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 9px; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; table-layout: auto; }
                        th, td { border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 4px 4px; text-align: right; word-wrap: break-word; }
                        th:last-child, td:last-child { border-right: none; }
                        tbody tr:last-child td { border-bottom: none; }
                        
                        th { background: #f8fafc; color: #475569; font-weight: 700; text-align: center; text-transform: uppercase; font-size: 8px; letter-spacing: 0px; line-height: 1.2; vertical-align: middle; }
                        tbody tr:hover { background-color: #f1f5f9; }
                        tbody tr:nth-child(even) { background-color: #fcfcfc; }
                        
                        .text-left { text-align: left; }
                        .text-center { text-align: center; }
                        .group-header { background: #f1f5f9 !important; color: #0f172a; font-weight: 700; font-size: 10px; text-align: left; padding: 8px 8px; border-top: 2px solid #e2e8f0; }
                        
                        /* Column Highlights */
                        .highlight-col { font-weight: 600; color: #0f172a; background: rgba(212, 175, 55, 0.05); }
                        .amount-col { font-family: 'Courier New', Courier, monospace; font-weight: 600; font-size: 9.5px; letter-spacing: -0.3px; }
                        
                        /* Adjust specific column wrapping */
                        td.desc-col { max-width: 120px; white-space: normal; text-align: left; font-weight: 500; line-height: 1.2; }
                        td.font-mono { max-width: 90px; }

                        
                        /* Print CSS */
                        @media print {
                            #no-print { display: none; }
                            body { background: #fff; padding: 0; }
                            .report-container { box-shadow: none; margin: 0; padding: 0; max-width: 100%; border: none; }
                            table { border: 1px solid #000; border-radius: 0; }
                            th, td { border-color: #000; padding: 6px 4px; }
                            .group-header { background: #e0e0e0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                            th { background: #f0f0f0 !important; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                            .highlight-col { background: transparent; }
                        }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
                    <script>
                        const reportData = ${JSON.stringify(data)};
                        const asOnDate = '${asOnDate}';
                        const formattedDate = '${formattedDate}';

                        async function exportToExcel() {
                            const workbook = new ExcelJS.Workbook();
                            const ws = workbook.addWorksheet('Amortization Report', { views: [{ showGridLines: false }] });
                            
                            const headerFont = { name: 'Arial', size: 9 };
                            const titleFont = { name: 'Arial', size: 10, bold: true };
                            const dataFont = { name: 'Arial', size: 8 };
                            const thinBorder = { style: 'thin', color: { argb: 'FF000000' } };
                            const allBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

                            ws.mergeCells('A1:J1');
                            ws.getCell('A1').value = 'Bank Name : DEMO BANK';
                            ws.getCell('A1').font = headerFont;

                            ws.mergeCells('K2:S2');
                            ws.getCell('K2').value = 'Print Date : ' + new Date().toLocaleString();
                            ws.getCell('K2').font = headerFont;
                            ws.getCell('K2').alignment = { horizontal: 'right' };

                            ws.mergeCells('A4:J4');
                            ws.getCell('A4').value = 'Branch Name: HEAD OFFICE';
                            ws.getCell('A4').font = headerFont;

                            ws.mergeCells('K5:S5');
                            ws.getCell('K5').value = 'Print UserID: AVS';
                            ws.getCell('K5').font = headerFont;
                            ws.getCell('K5').alignment = { horizontal: 'right' };

                            ws.mergeCells('A8:S8');
                            ws.getCell('A8').value = 'Central Government Securities - Amortization Report As On ' + formattedDate;
                            ws.getCell('A8').font = titleFont;
                            ws.getCell('A8').alignment = { horizontal: 'center' };

                            const cols = ['Sr No', 'Purchase Date', 'ISIN Code', 'Description', 'Maturity Date', 'Category', 'Holding Type', 'Head', 'Prodcode', 'CBS AccountNo', 'RecSrNo', 'Face Value', 'Rate', 'Book Value', 'Int Rec', 'Rem Years', 'Diff Amount', 'Amort Amount', 'Status'];
                            const widths = [5, 12, 15, 25, 12, 15, 10, 8, 8, 12, 8, 15, 8, 15, 12, 8, 15, 15, 10];
                            ws.columns = widths.map(w => ({ width: w }));

                            const HEADER_ROW = 11;
                            cols.forEach((col, i) => {
                                const cell = ws.getCell(HEADER_ROW, i + 1);
                                cell.value = col;
                                cell.font = { name: 'Arial', size: 8, bold: true };
                                cell.border = allBorders;
                                cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                            });

                            ws.mergeCells(12, 1, 12, 19);
                            const groupCell = ws.getCell(12, 1);
                            groupCell.value = 'STATE GOV. SEC.';
                            groupCell.font = { name: 'Arial', size: 8, bold: true };
                            groupCell.border = allBorders;

                            let currentRow = 13;
                            let totalFace = 0, totalBook = 0, totalDiff = 0, totalAmort = 0;

                            reportData.forEach(r => {
                                const values = [r.srNo, r.purchaseDate, r.isin, r.description, r.maturityDate, r.category, r.holdingType, r.head, r.prodcode, r.cbsAccountNo, r.recSrNo, r.faceValue, r.rate, r.bookValue, r.intRec, r.remainingYear, r.diffAmount, r.amortizationAmount, r.applicable];
                                values.forEach((val, i) => {
                                    const cell = ws.getCell(currentRow, i + 1);
                                    cell.value = val;
                                    cell.font = dataFont;
                                    cell.border = allBorders;
                                    if (i >= 11 && i !== 12 && i !== 15 && i !== 18) cell.numFmt = '#,##0.00';
                                });
                                totalFace += r.faceValue; totalBook += r.bookValue; totalDiff += r.diffAmount; totalAmort += r.amortizationAmount;
                                currentRow++;
                            });

                            ws.mergeCells(currentRow, 1, currentRow, 11);
                            const totLabel = ws.getCell(currentRow, 1);
                            totLabel.value = 'GRAND TOTAL:';
                            totLabel.font = { name: 'Arial', size: 8, bold: true };
                            totLabel.alignment = { horizontal: 'right' };
                            for(let i=1; i<=11; i++) ws.getCell(currentRow, i).border = allBorders;

                            const sums = { 12: totalFace, 14: totalBook, 17: totalDiff, 18: totalAmort };
                            for(let i=12; i<=19; i++) {
                                const cell = ws.getCell(currentRow, i);
                                cell.border = allBorders;
                                if (sums[i] !== undefined) {
                                    cell.value = sums[i];
                                    cell.font = { name: 'Arial', size: 8, bold: true };
                                    cell.numFmt = '#,##0.00';
                                }
                            }

                            const buffer = await workbook.xlsx.writeBuffer();
                            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'Amortization_Report_' + asOnDate + '.xlsx';
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }

                        function exportToPDF() {
                            const { jsPDF } = window.jspdf;
                            const doc = new jsPDF('landscape');
                            const pageWidth = doc.internal.pageSize.getWidth();
                            
                            doc.setFontSize(7);
                            doc.setTextColor(0);
                            doc.text('Bank Name  : DEMO BANK', 14, 15);
                            doc.text('Branch Name: HEAD OFFICE', 14, 22);
                            doc.text('Print Date : ' + new Date().toLocaleString(), pageWidth - 80, 15);
                            doc.text('Print UserID: AVS', pageWidth - 80, 22);
                            
                            doc.setFontSize(14);
                            doc.setFont(undefined, 'bold');
                            doc.text('Amortization Report As On ' + formattedDate, pageWidth / 2, 13, { align: 'center' });

                            const cols = ['Sr No', 'Purchase Date', 'ISIN', 'Description', 'Maturity', 'Category', 'Holding', 'Head', 'Prodcode', 'CBS Acc', 'RecSrNo', 'Face Value', 'Rate', 'Book Value', 'Int Rec', 'Yrs', 'Diff Amt', 'Amort Amt', 'Status'];
                            const body = [];
                            body.push([{ content: 'STATE GOV. SEC.', colSpan: cols.length, styles: { fillColor: [220, 235, 255], textColor: [31, 56, 100], fontStyle: 'bold', halign: 'center', fontSize: 8 } }]);

                            let totalFace = 0, totalBook = 0, totalDiff = 0, totalAmort = 0;

                            reportData.forEach(r => {
                                totalFace += r.faceValue; totalBook += r.bookValue; totalDiff += r.diffAmount; totalAmort += r.amortizationAmount;
                                body.push([
                                    r.srNo, r.purchaseDate, r.isin, r.description, r.maturityDate, r.category, r.holdingType, r.head, r.prodcode, r.cbsAccountNo, r.recSrNo,
                                    r.faceValue.toLocaleString('en-IN', {minimumFractionDigits: 2}),
                                    r.rate.toFixed(2),
                                    r.bookValue.toLocaleString('en-IN', {minimumFractionDigits: 2}),
                                    r.intRec.toLocaleString('en-IN', {minimumFractionDigits: 2}),
                                    r.remainingYear,
                                    r.diffAmount.toLocaleString('en-IN', {minimumFractionDigits: 2}),
                                    r.amortizationAmount.toLocaleString('en-IN', {minimumFractionDigits: 2}),
                                    r.applicable
                                ]);
                            });

                            const totalRow = Array(cols.length).fill('');
                            totalRow[3] = 'GRAND TOTAL';
                            totalRow[11] = totalFace.toLocaleString('en-IN', {minimumFractionDigits: 2});
                            totalRow[13] = totalBook.toLocaleString('en-IN', {minimumFractionDigits: 2});
                            totalRow[16] = totalDiff.toLocaleString('en-IN', {minimumFractionDigits: 2});
                            totalRow[17] = totalAmort.toLocaleString('en-IN', {minimumFractionDigits: 2});

                            body.push(totalRow.map(v => ({ content: v, styles: { fontStyle: 'bold', fillColor: [21, 128, 61], textColor: [255, 255, 255], fontSize: 7 } })));

                            doc.autoTable({
                                head: [cols],
                                body: body,
                                startY: 28,
                                theme: 'grid',
                                styles: { fontSize: 6, cellPadding: 1, overflow: 'linebreak', lineColor: [226, 232, 240] },
                                headStyles: { fillColor: [31, 56, 100], textColor: [255, 255, 255], fontStyle: 'bold', lineWidth: 0.1, halign: 'center' },
                                columnStyles: { 11: { halign: 'right' }, 12: { halign: 'right' }, 13: { halign: 'right' }, 14: { halign: 'right' }, 16: { halign: 'right' }, 17: { halign: 'right' } }
                            });

                            doc.save('Amortization_Report_' + asOnDate + '.pdf');
                        }
                    </script>
                </head>
                <body>
                    <div class="report-container">
                        <div class="toolbar" id="no-print">
                            <button class="btn btn-gold" onclick="exportToPDF()">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                Print / PDF
                            </button>
                            <button class="btn" onclick="exportToExcel()">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                Export to Excel
                            </button>
                        </div>
                        
                        <div class="header-bar">
                            <div class="header-info text-left">
                                <strong>DEMO BANK</strong><br/>
                                Branch : HEAD OFFICE
                            </div>
                            <div class="header-info" style="text-align: right;">
                                <strong>Print Date :</strong> ${new Date().toLocaleString('en-US', { hour12: true, dateStyle: 'medium', timeStyle: 'short' })}<br/>
                                <strong>Print User :</strong> AVS
                            </div>
                        </div>
                        
                        <div class="title-container">
                            <div class="title">Central Government Securities</div>
                            <div class="subtitle">Amortization Report As On ${formattedDate}</div>
                        </div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr.<br/>No.</th>
                                    <th>Purchase<br/>Date</th>
                                    <th>ISIN Code</th>
                                    <th>Description</th>
                                    <th>Maturity<br/>Date</th>
                                    <th>Category</th>
                                    <th>Holding<br/>Type</th>
                                    <th>Head</th>
                                    <th>Prodcode</th>
                                    <th>CBS<br/>AccountNo</th>
                                    <th>RecSrNo</th>
                                    <th>Face Value</th>
                                    <th>Rate</th>
                                    <th>Book Value</th>
                                    <th>Int. Rec.</th>
                                    <th>Rem.<br/>Years</th>
                                    <th>Diff Amount</th>
                                    <th class="highlight-col">Amortization<br/>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="19" class="group-header">State Gov. Sec.</td>
                                </tr>
                                ${data.map(r => `
                                <tr>
                                    <td class="text-center">${r.srNo}</td>
                                    <td class="text-center">${r.purchaseDate}</td>
                                    <td class="text-left font-mono">${r.isin}</td>
                                    <td class="desc-col">${r.description}</td>
                                    <td class="text-center">${r.maturityDate}</td>
                                    <td class="text-left">${r.category}</td>
                                    <td class="text-left">${r.holdingType}</td>
                                    <td class="text-center">${r.head}</td>
                                    <td class="text-center">${r.prodcode}</td>
                                    <td class="text-center">${r.cbsAccountNo}</td>
                                    <td class="text-center">${r.recSrNo}</td>
                                    <td class="amount-col">${r.faceValue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td class="amount-col">${r.rate.toFixed(2)}</td>
                                    <td class="amount-col">${r.bookValue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td class="amount-col">${r.intRec.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td class="text-center" style="font-weight:600;">${r.remainingYear}</td>
                                    <td class="amount-col">${r.diffAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td class="amount-col highlight-col">${r.amortizationAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td class="text-center">
                                        <span style="background: ${r.applicable === 'Applicable' ? '#dcfce7' : '#fee2e2'}; color: ${r.applicable === 'Applicable' ? '#166534' : '#991b1b'}; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">
                                            ${r.applicable}
                                        </span>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </body>
            </html>
        `;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };

    return (
        <div className="screen-container">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', margin: 0 }}>Amortization Processing</h2>
                <span className="badge slr" style={{ fontSize: '9px', padding: '2px 8px' }}>COMPLIANCE</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--gray-400)' }}>Home › G-Sec › Valuation & Compliance › Amortization</span>
            </div>

            <div className="rbi-info-box">
                <div className="rbi-header">
                    <span className="rbi-tag">PROCESS INFO</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navy)' }}>HTM Premium Amortization</span>
                </div>
                <div className="rbi-text">Securities held under HTM category acquired at a premium to face value must have their premium amortized over the remaining life of the security. Use this module to calculate and apply the amortization amount for the given period.</div>
            </div>

            {/* Report Form - Compact and matching System Style */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <div className="card-header" style={{ background: 'var(--navy)', color: '#fff', padding: '8px 16px' }}>
                    <span className="card-title" style={{ color: '#fff', fontSize: '13px' }}>Report</span>
                </div>
                <div className="card-body" style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <div className="form-group" style={{ marginBottom: 0, flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                            <label className="form-label" style={{ fontSize: '11px', fontWeight: '600', margin: 0 }}>As On Date <span style={{ color: 'var(--danger)' }}>*</span></label>
                            <input 
                                type="date" 
                                className="form-input" 
                                value={asOnDate} 
                                onChange={(e) => setAsOnDate(e.target.value)}
                                style={{ width: '180px', height: '32px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', borderTop: '1px dotted var(--border)', paddingTop: '16px', gap: '12px' }}>
                        <button 
                            className="btn-sm" 
                            onClick={handleReport}
                            disabled={isLoading}
                            style={{ 
                                background: 'var(--navy)',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 30px', 
                                borderRadius: '4px', 
                                cursor: 'pointer',
                                fontWeight: '700', 
                                fontSize: '12px',
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px'
                            }}
                        >
                            {isLoading ? 'Processing...' : <><FileText size={14} /> Report</>}
                        </button>

                        <button 
                            className="btn-sm gold" 
                            style={{ 
                                padding: '8px 30px', 
                                borderRadius: '4px', 
                                cursor: 'pointer',
                                fontWeight: '700', 
                                fontSize: '12px',
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px'
                            }}
                        >
                            <CheckCircle size={14} /> Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
