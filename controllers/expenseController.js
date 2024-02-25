const db = require('../models/db');

exports.createExpense = async (req, res, next) => {
  try {
    const { category, amount, details } = req.body;
    const newExpense = await db.expense.create({
      data: {
        userId: req.user.id,
        category,
        amount,
        details
      }
    });
    res.status(201).json({ expense: newExpense });
  } catch (error) {
    next(error);
  }
};

exports.getAllExpenseByUser = async (req, res, next) => {
  try {
    const expenses = await db.expense.findFirst({
      where: { userId: req.user.id }
    });
    res.send({ expenses });
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, amount, details } = req.body;
    const updatedExpense = await db.expense.update({
      where: { id: parseInt(id) },
      data: {
        category,
        amount,
        details
      }
    });
    res.json({ expense: updatedExpense });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.expense.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
