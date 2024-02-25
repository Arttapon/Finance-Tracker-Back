const express = require('express');
const router = express.Router();
const FinancialPlan = require('../controllers/FNCPlanController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /financialplans
router.get('/', authenticate, FinancialPlan.getFinancialPlans);
router.get('/:id', authenticate, FinancialPlan.getPlansById);
router.post('/', authenticate, FinancialPlan.createFinancialPlan);
router.put('/:id', authenticate, FinancialPlan.updateFinancialPlan);
router.delete('/:id', authenticate, FinancialPlan.deleteFinancialPlan);

module.exports = router;
