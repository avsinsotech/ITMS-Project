const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Debug',
            version: '1.0.0',
        },
    },
    apis: [path.join(__dirname, '../server.js')],
};

try {
    const specs = swaggerJsdoc(options);
    console.log(JSON.stringify(specs, null, 2));
} catch (err) {
    console.error('Error generating swagger: ', err);
}
