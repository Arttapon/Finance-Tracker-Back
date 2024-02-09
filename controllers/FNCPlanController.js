// controllers/financialPlanController.js

const db = require('../models/db');

exports.getFinancialPlans = async (req, res, next) => {
  try {
    const financialPlans = await db.financialPlan.findMany({
      where: { userId: req.user.id }
    });
    res.send({ financialPlans });
  } catch (error) {
    next(error);
  }
};

exports.createFinancialPlan = async (req, res, next) => {
  try {
    const { goalName, targetAmount, currentAmount } = req.body;
    const newFinancialPlan = await db.financialPlan.create({
      data: {
        userId: req.user.id,
        goalName,
        targetAmount,
        currentAmount
      }
    });
    res.status(201).json({ financialPlan: newFinancialPlan });
  } catch (error) {
    next(error);
  }
};

exports.updateFinancialPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goalName, targetAmount, currentAmount } = req.body;
    const updatedFinancialPlan = await db.financialPlan.update({
      where: { id: parseInt(id) },
      data: {
        goalName,
        targetAmount,
        currentAmount
      }
    });
    res.json({ financialPlan: updatedFinancialPlan });
  } catch (error) {
    next(error);
  }
};

exports.deleteFinancialPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.financialPlan.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
