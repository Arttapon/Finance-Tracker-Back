// controllers/interestCalculationController.js

const db = require('../models/db');

exports.calculateInterest = async (req, res, next) => {
  try {
    const { principalAmount, interestRate, timePeriod } = req.body;
    const calculatedInterest = (principalAmount * interestRate * timePeriod) / 100;
    const newInterestCalculation = await db.interestCalculation.create({
      data: {
        userId: req.user.id,
        principalAmount,
        interestRate,
        timePeriod,
        calculatedInterest
      }
    });
    res.status(201).json({ interestCalculation: newInterestCalculation });
  } catch (error) {
    next(error);
  }
};
