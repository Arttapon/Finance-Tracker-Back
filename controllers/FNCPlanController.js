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
    const id = req.user.id
    if (id !== '') {
      const gPlans = await db.financialPlan.findMany({
        where: {
          userId: id,
         },
      });
      res.send(gPlans);
    } else {
      console.log("ไม่พบ ID")
    }
  } catch (error) {
    next(error);
    // console.log(error)
  }
};

exports.getDepositByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== '') {
      const gPlans = await db.financialPlan.findMany({
        where: {
          id: Number(id),
         },
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
    if (!id) {
      return res.status(400).json({ error: 'ID is missing' });
    }
    const { PlanName, targetAmount, amountToCollect, newValue } = req.body;
    // console.log(newValue);
    
    const existingFinancialPlan = await db.financialPlan.findFirst({
      where: { id: Number(id) }
    });

    const updatedCurrentAmount = existingFinancialPlan.currentAmount + newValue;

    if (!existingFinancialPlan) {
      return res.status(404).json({ error: 'Financial plan not found' });
    }

    const updatedFinancialPlan = await db.financialPlan.update({
      where: { id: Number(id) },
      data: {
        PlanName,
        targetAmount,
        currentAmount: updatedCurrentAmount,
        amountToCollect
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
