// controllers/budgetController.js

const db = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const budgets = await db.budget.findMany({
      where: { userId: req.user.id }
    });
    res.send({ budgets });
  } catch (error) {
    next(error);
  }
};

exports.createBudget = async (req, res, next) => {
  try {
    const { category, plannedAmount, actualAmount } = req.body;
    const newBudget = await db.budget.create({
      data: {
        userId: req.user.id,
        category,
        plannedAmount,
        actualAmount
      }
    });
    res.status(201).json({ budget: newBudget });
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
        plannedAmount,
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
