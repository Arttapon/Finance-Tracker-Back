const db = require('../models/db');

exports.createIncome = async (req, res, next) => {
  try {
    const { category, amount, details } = req.body;
    const newIncome = await db.income.create({
      data: {
        userId: req.user.id,
        category,
        amount,
        details
      }
    });
    res.status(201).json({ income: newIncome });
  } catch (error) {
    next(error);
  }
};

exports.getAllIncomeByUser = async (req, res, next) => {
  try {
    const incomes = await db.income.findFirst({
      where: { userId: req.user.id }
    });
    res.send({ incomes });
  } catch (error) {
    next(error);
  }
};

exports.updateIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, amount, details } = req.body;
    const updatedIncome = await db.income.update({
      where: { id: parseInt(id) },
      data: {
        category,
        amount,
        details
      }
    });
    res.json({ income: updatedIncome });
  } catch (error) {
    next(error);
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.income.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
