// controllers/budgetController.js

const db = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const budgets = await db.budget.findMany({
      where: { userId: req.user.id }
    });
    res.json( budgets );
  } catch (error) {
    next(error);
  }
};

exports.createBudget = async (req, res, next) => {
  try {
    const { category, plannedAmount, actualAmount } = req.body;

    // console.log(req.body);
    const budget = await db.budget.create({
      data: {
        userId: req.user.id,
        category,
        plannedAmount: parseFloat(plannedAmount),
        actualAmount: parseFloat(actualAmount)
      }
    });
    res.json(budget);
  } catch (error) {
    next(error);
  }
};

exports.updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, plannedAmount, actualAmount } = req.body;
    const updatedBudget = await db.budget.update({
      where: { id: parseInt(id) },
      data: {
        category,
        plannedAmount: parseFloat(plannedAmount),
        actualAmount
      }
    });
    res.json({ budget: updatedBudget });
  } catch (error) {
    next(error);
  }
};

exports.deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.budget.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
