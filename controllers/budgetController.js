// controllers/budgetController.js

const db = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const budgets = await db.budget.findMany({
      where: { userId: req.user.id }
    });
    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

exports.createBudget = async (req, res) => {
  try {
    const { category, plannedAmount } = req.body; // เปลี่ยนเป็น plannedAmount และ category
    // ตรวจสอบค่า plannedAmount ใน req.body
    if (!plannedAmount) {
      throw new Error('Planned Amount is required'); // ถ้าไม่มีให้ throw Error
    }
    const budget = await db.budget.create({
      data: {
        userId: req.user.id, // หรือคุณสามารถใช้ req.user.id ได้ตามความเหมาะสม
        category,
        BudgetAmount: parseFloat(plannedAmount) // แปลง Planned Amount เป็น Float
      }
    });
    res.status(201).json(budget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, plannedAmount } = req.body; // เปลี่ยนเป็น plannedAmount และ category
    const updatedBudget = await db.budget.update({
      where: { id },
      data: {
        category,
        BudgetAmount: parseFloat(plannedAmount), // แปลง Planned Amount เป็น Float
      }
    });
    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

