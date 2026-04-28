const app = require('./src/app');
require('dotenv').config();

const port = process.env.PORT || 5080;

const server = app.listen(port, () => {
    console.log('──────────────────────────────────────────────────');
    console.log(`🚀 TREASURY BACKEND V12 RUNNING ON PORT ${port}`);
    console.log(`📄 Swagger UI: http://localhost:${port}/api-docs`);
    console.log('──────────────────────────────────────────────────');
});

// Better error handling for startup
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Please check if the server is already running.`);
        process.exit(1);
    } else {
        console.error(`❌ Server startup error: ${err.message}`);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Closed remaining connections.');
        process.exit(0);
    });
});
