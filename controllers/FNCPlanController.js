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

exports.getPlansById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== '') {
      const gPlans = await db.financialPlan.findMany({
        where: { userId: Number(id) }
      });
      res.send(gPlans);
    } else {
      console.log("ไม่พบ ID")
    }
  } catch (error) {
    next(error);
  }
};

exports.createFinancialPlan = async (req, res, next) => {
  try {
    const { PlanName, targetAmount, currentAmount, amountToCollect, collectionFrequency } = req.body;
    const newFinancialPlan = await db.financialPlan.create({
      data: {
        userId: req.user.id,
        PlanName,
        targetAmount: Number(targetAmount),
        currentAmount:  Number(currentAmount),
        amountToCollect: Number(amountToCollect),
        collectionFrequency
      }
    });
    res.status(201).json({ financialPlan: newFinancialPlan });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.updateFinancialPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goalName, targetAmount, currentAmount } = req.body;
    const updatedFinancialPlan = await db.financialPlan.update({
      where: { id: Number(id) },
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
