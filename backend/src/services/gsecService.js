const xlsx = require('xlsx');

class GSecService {
    async processMTMExcel(buffer) {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Transform data to match the expected structure in the frontend
        return rawData.map((row, index) => {
            // Helper to get value by fuzzy key matching
            const getVal = (row, keys) => {
                for (const key of keys) {
                    if (row[key] !== undefined) return row[key];
                    // Also try case-insensitive and with/without underscores/spaces
                    const normalizedKey = key.toLowerCase().replace(/[\s_]/g, '');
                    for (const rowKey in row) {
                        if (rowKey.toLowerCase().replace(/[\s_]/g, '') === normalizedKey) {
                            return row[rowKey];
                        }
                    }
                }
                return null;
            };

            return {
                srNo: index + 1,
                isin: getVal(row, ['ISIN']) || '',
                description: getVal(row, ['Description', 'Security', 'NAME_GOI_SECURITY']) || '',
                col4: getVal(row, ['Mat. Days', 'Maturity Days']) || 0,
                maturityDate: getVal(row, ['Maturity Date', 'Maturity']) || '',
                coupon: getVal(row, ['Coupon', 'Coupon Rate', 'COUPON']) || '',
                faceValue: parseFloat(getVal(row, ['Face Value', 'FaceValue', 'AMOUNT'])) || 0,
                price: parseFloat(getVal(row, ['Price', 'Book Price'])) || 0,
                bookValue: parseFloat(getVal(row, ['Book Value', 'BookValue', 'BOOK_VALUE'])) || 0,
                mtmPrice: parseFloat(getVal(row, ['MTM Price', 'MTMPrice', 'Market Price'])) || 0,
                ytm: parseFloat(getVal(row, ['YTM', 'Yield'])) || 0,
                marketValue: parseFloat(getVal(row, ['Market Value', 'MarketValue', 'MTM Value'])) || 0,
                depApp: parseFloat(getVal(row, ['Dep/App', 'Gain/Loss', 'Depreciation'])) || 0
            };
        });
    }
}

module.exports = new GSecService();
