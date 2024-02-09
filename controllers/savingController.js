// controllers/savingController.js

const db = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const savings = await db.saving.findMany({
      where: { userId: req.user.id }
    });
    res.send({ savings });
  } catch (error) {
    next(error);
  }
};

exports.createSaving = async (req, res, next) => {
  try {
    const { goalName, targetAmount, currentAmount } = req.body;
    const newSaving = await db.saving.create({
      data: {
        userId: req.user.id,
        goalName,
        targetAmount,
        currentAmount
      }
    });
    res.status(201).json({ saving: newSaving });
  } catch (error) {
    next(error);
  }
};

exports.updateSaving = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goalName, targetAmount, currentAmount } = req.body;
    const updatedSaving = await db.saving.update({
      where: { id: parseInt(id) },
      data: {
        goalName,
        targetAmount,
        currentAmount
      }
    });
    res.json({ saving: updatedSaving });
  } catch (error) {
    next(error);
  }
};

exports.deleteSaving = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.saving.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
