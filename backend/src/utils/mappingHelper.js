/**
 * High-Precision Mapping Helper
 * Specifically tuned for headers like "Amount (Rs)", "Trade Amount (Rs)", etc.
 */
const getValFuzzy = (row, fieldName) => {
    const keys = Object.keys(row);
    const lowerField = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 1. Try normalized exact match first
    let match = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === lowerField);
    
    // 2. Strict Pattern Matching for High-Risk Fields
    if (!match) {
        const lowerName = fieldName.toLowerCase();
        
        if (lowerName === 'amount') {
            // Must contain "amount" and "(rs)" or be exactly "amount"
            match = keys.find(k => {
                const kl = k.toLowerCase();
                return kl === 'amount' || (kl.includes('amount') && kl.includes('rs'));
            });
        }
        else if (lowerName === 'trade_price') {
            match = keys.find(k => k.toLowerCase().includes('trade') && k.toLowerCase().includes('price'));
        }
        else if (lowerName === 'trade_yield') {
            match = keys.find(k => k.toLowerCase().includes('yield'));
        }
        else if (lowerName === 'trade_amount') {
            // Must contain BOTH "trade" and "amount" to avoid matching Settlement Type/Consideration
            match = keys.find(k => k.toLowerCase().includes('trade') && k.toLowerCase().includes('amount'));
        }
        else if (lowerName === 'accrued_interest') {
            match = keys.find(k => k.toLowerCase().includes('accrued'));
        }
        else if (lowerName === 'sett_consideration') {
            // Must contain BOTH "sett" and "consideration"
            match = keys.find(k => k.toLowerCase().includes('sett') && k.toLowerCase().includes('consideration'));
        }
        else if (lowerName === 'settlement_type') {
            // Specific for T+1, T+0 etc
            match = keys.find(k => k.toLowerCase().includes('settlement') && k.toLowerCase().includes('type'));
        }
        else if (lowerName === 'settlement_date') {
            match = keys.find(k => k.toLowerCase().includes('settlement') && k.toLowerCase().includes('date'));
        }
    }

    const val = match ? row[match] : null;
    return val !== undefined && val !== null ? val.toString().trim() : '';
};

module.exports = {
    getValFuzzy
};
