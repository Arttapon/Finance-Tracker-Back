const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const expenseController = require('../controllers/expenseController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /incomes
router.post('/incomes', authenticate, incomeController.createIncome);
router.get('/incomes', authenticate, incomeController.getAllIncomeByUser);
router.put('/incomes/:id', authenticate, incomeController.updateIncome);
router.delete('/incomes/:id', authenticate, incomeController.deleteIncome);

// Endpoint: /expenses
router.post('/expenses', authenticate, expenseController.createExpense);
router.get('/expenses', authenticate, expenseController.getAllExpenseByUser);
router.put('/expenses/:id', authenticate, expenseController.updateExpense);
router.delete('/expenses/:id', authenticate, expenseController.deleteExpense);

module.exports = router;
