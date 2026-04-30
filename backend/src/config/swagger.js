
// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TREASURY-STABLE-V12-MODULAR',
            version: '1.0.0',
            description: 'Modular API documentation for Investment Treasury systems.',
        },
        servers: [
            {
                url: 'http://localhost:8020',
                description: 'Stabilized Modular Server',
            },
        ],
        tags: [
            { name: 'TermDeposit', description: 'Term Deposit Investment Receipt APIs' },
        ],
    },
    // Scans ALL route files for @swagger JSDoc comments
    apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;