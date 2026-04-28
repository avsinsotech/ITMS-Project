
// src/app.js
const express      = require('express');
const cors         = require('cors');
const swaggerUi    = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// ── Existing Routes ─────────────────────────────────────────────────────────
const purchaseRoutes       = require('./routes/purchaseRoutes');
const callMoneyRoutes      = require('./routes/callMoneyRoutes');
const authRoutes           = require('./routes/authRoutes');
const amcRoutes            = require('./routes/Amcroutes');
const schemeRoutes         = require('./routes/Schemeroutes');
const distributorRoutes    = require('./routes/Distributorroutes');

// ── New: Investment Master (Term Deposit Add New / Add Existing) ─────────────
const investmentMasterRoutes = require('./routes/investmentMasterRoutes');

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
    origin:             '*',
    methods:            ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders:     ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Route Registration ───────────────────────────────────────────────────────
app.use('/api/purchase',           purchaseRoutes);
app.use('/api/call-money',         callMoneyRoutes);
app.use('/api/auth',               authRoutes);
app.use('/api/amc',                amcRoutes);
app.use('/api/scheme',             schemeRoutes);
app.use('/api/distributor',        distributorRoutes);

// Investment Master — Term Deposit Add New / Add Existing
app.use('/api/investment-master',  investmentMasterRoutes);

// ── Swagger Docs ─────────────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(`[App Error]: ${err.stack || err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;