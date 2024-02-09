// routes/investmentRoute.js

const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /investments
router.get('/', authenticate, investmentController.getByUser);
router.post('/', authenticate, investmentController.createInvestment);
router.delete('/:id', authenticate, investmentController.deleteInvestment);

module.exports = router;
