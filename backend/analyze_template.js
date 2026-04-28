const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'Template', 'RptGInv_Reg.xlsx');
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    console.log('SHEET_INFO_START');
    console.log('Sheet Name:', sheetName);
    console.log('Merges:', JSON.stringify(worksheet['!merges']));
    console.log('Cols:', JSON.stringify(worksheet['!cols']));
    console.log('Rows:', JSON.stringify(worksheet['!rows']));

    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('DATA_START');
    data.slice(0, 15).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, JSON.stringify(row));
    });
    console.log('SHEET_INFO_END');
} catch (e) {
    console.error('Error reading excel:', e);
}
