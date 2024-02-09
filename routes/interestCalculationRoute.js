// routes/interestCalculationRoute.js

const express = require('express');
const router = express.Router();
const interestCalculationController = require('../controllers/interestCalculationController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /interestcalculations
router.post('/', authenticate, interestCalculationController.calculateInterest);

module.exports = router;
