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
    },
    // Scan all routes for documentation
    apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
