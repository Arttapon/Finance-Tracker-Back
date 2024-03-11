// controllers/budgetController.js

const { budget } = require('../models/db');

exports.getByUser = async (req, res, next) => {
  try {
    const budgets = await budget.findMany({
      where: { userId: req.user.id }
    });
    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

exports.createBudget = async (req, res) => {
  try {
    const { category, BudgetAmount } = req.body;
    if (!BudgetAmount) {
      throw new Error('Planned Amount is required');
    }
    const newBudget = await budget.create({
      data: {
        userId: req.user.id,
        category,
        BudgetAmount: parseFloat(BudgetAmount),
        Used: 0 // ตั้งค่า Used เป็น 0 หรือค่าเริ่มต้นตามความเหมาะสม
      }
    });    
    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is missing' });
    }
    const { category, BudgetAmount, newBudget } = req.body;
    console.log(newBudget);

    const existingBudget = await budget.findUnique({ where: { id: parseInt(id) } });
    if (!existingBudget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    const updatedUsed = existingBudget.Used + newBudget;

    const updatedBudget = await budget.update({
      where: { id: parseInt(id) },
      data: {
        Used: updatedUsed // กำหนดค่า Used ที่มีชนิดข้อมูลเป็น Float
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
    await budget.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
