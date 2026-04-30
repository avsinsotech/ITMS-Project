const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../execution_logs.txt');

class Logger {
    static logSPExecution(spName, parameters, status, resultsCount = 0, error = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            spName,
            parameters,
            status,
            resultsCount,
            error: error ? error.message || error : null
        };

        const logString = `[${timestamp}] EXEC ${spName}\n` +
                          `PARAMS: ${JSON.stringify(parameters)}\n` +
                          `STATUS: ${status}\n` +
                          `RECORDS AFFECTED/RETURNED: ${resultsCount}\n` +
                          (error ? `ERROR: ${JSON.stringify(error)}\n` : '') +
                          `--------------------------------------------------\n`;

        fs.appendFileSync(LOG_FILE, logString);
        console.log(`[LOGGED] SP ${spName} executed.`);
    }
}

module.exports = Logger;