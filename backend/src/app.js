// const express = require('express');
// const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpecs = require('./config/swagger');
// const purchaseRoutes = require('./routes/purchaseRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/purchase', purchaseRoutes);

// // Swagger Documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// module.exports = app;
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Core Routes
const purchaseRoutes = require('./routes/purchaseRoutes');
const fdRoutes = require('./routes/fdRoutes');  
const bondRoutes = require('./routes/bondRoutes');  
const callMoneyRoutes = require('./routes/callMoneyRoutes');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const gsecRoutes = require('./routes/gsecRoutes');

// Mutual Fund Master Routes
const amcRoutes = require('./routes/Amcroutes');
const schemeRoutes = require('./routes/Schemeroutes');
const shiftingRoutes = require('./routes/shiftingRoutes');
const distributorRoutes = require('./routes/Distributorroutes');


// ── New: Investment Master (Term Deposit Add New / Add Existing) ─────────────
const investmentMasterRoutes = require('./routes/investmentMasterRoutes');

const termDepositRoutes = require('./routes/termDepositRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Registration
app.use('/api/purchase', purchaseRoutes);
app.use('/api/fd', fdRoutes);          
app.use('/api/bond', bondRoutes); 
app.use('/api/call-money', callMoneyRoutes);
app.use('/api/auth', authRoutes);

// Mutual Fund Master Routes
app.use('/api/amc', amcRoutes);
app.use('/api/scheme', schemeRoutes);
app.use('/api/distributor', distributorRoutes);
app.use('/api/shifting', shiftingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/gsec', gsecRoutes);

// Investment Master — Term Deposit Add New / Add Existing
app.use('/api/investment-master',  investmentMasterRoutes);

app.use('/api/term-deposit', termDepositRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[App Error]: ${err.stack || err.message}`);
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || 'Internal Server Error' 
    });
});

module.exports = app;
