const express = require('express');
const router = express.Router();
const financialPlanController = require('../controllers/FNCPlanController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /financialplans
router.get('/', authenticate, financialPlanController.getFinancialPlans);
router.post('/', authenticate, financialPlanController.createFinancialPlan);
router.put('/:id', authenticate, financialPlanController.updateFinancialPlan);
router.delete('/:id', authenticate, financialPlanController.deleteFinancialPlan);

module.exports = router;
