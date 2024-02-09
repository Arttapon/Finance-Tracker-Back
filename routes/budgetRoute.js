// routes/budgetRoute.js

const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /budgets
router.get('/', authenticate, budgetController.getByUser);
router.post('/', authenticate, budgetController.createBudget);
router.put('/:id', authenticate, budgetController.updateBudget);
router.delete('/:id', authenticate, budgetController.deleteBudget);

module.exports = router;
