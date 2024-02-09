// controllers/investmentController.js

const db = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const investments = await db.investment.findMany({
      where: { userId: req.user.id }
    });
    res.send({ investments });
  } catch (error) {
    next(error);
  }
};

exports.createInvestment = async (req, res, next) => {
  try {
    const { recommendation } = req.body;
    const newInvestment = await db.investment.create({
      data: {
        userId: req.user.id,
        recommendation
      }
    });
    res.status(201).json({ investment: newInvestment });
  } catch (error) {
    next(error);
  }
};

exports.deleteInvestment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.investment.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
