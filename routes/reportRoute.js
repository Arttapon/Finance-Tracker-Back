// routes/reportRoute.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /reports
router.post('/', authenticate, reportController.createReport);

module.exports = router;
