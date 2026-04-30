const express = require('express');
const router = express.Router();
const multer = require('multer');
const gsecController = require('../controllers/gsecController');
const authMiddleware = require('../utils/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Apply authMiddleware if needed, but for now let's keep it consistent
router.use(authMiddleware);

router.post('/upload-mtm', upload.single('file'), gsecController.uploadMTMExcel);

module.exports = router;
