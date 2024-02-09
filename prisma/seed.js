const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const password = bcrypt.hashSync('12345', 10);

const userData = [
  { username: 'usertest2', password: password, email: 'test1@gmail.com' }

];

const incomeExpenseData = [
  { userId: 3, category: 'FREELANCE', amount: 1500.0, details: 'Freelance Work' },
  // Add more income and expense data as needed
];

const budgetData = [
  { userId: 2, category: 'GROCERIES', plannedAmount: 300.0, actualAmount: 250.0 },

  // Add more budget data as needed
];

const financialPlanData = [
  { userId: 1, goalName: 'Retirement Fund', targetAmount: 1000000.0, currentAmount: 50000.0 },
  // Add more financial plan data as needed
];


// Add more seed data for other tables (Saving, Investment, FinancialPlan, etc.) if necessary

const run = async () => {
  for (const user of userData) {
    await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
  }

  for (const data of incomeExpenseData) {
    await prisma.income.create({
      data: {
        userId: data.userId,
        category: data.category,
        amount: data.amount,
        details: data.details
      },
    });
  }

  for (const data of budgetData) {
    await prisma.budget.create({
      data: {
        userId: data.userId,
        category: data.category,
        plannedAmount: data.plannedAmount,
        actualAmount: data.actualAmount
      },
    });
  }

  for (const data of financialPlanData) {
    await prisma.financialPlan.create({
      data: {
        userId: data.userId,
        goalName: data.goalName,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount
      },
    });
  }

  // Add similar loops for other tables if needed

  console.log('Seed completed successfully!');
  await prisma.$disconnect();
};

run();
