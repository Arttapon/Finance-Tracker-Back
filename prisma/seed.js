// prisma/seed.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const password = bcrypt.hashSync('1234', 10);

const userData = [
  { username: 'andy', password: password, email: 'andy@gmail.com' },
  { username: 'abby', password: password, email: 'abby@gmail.com' },
  { username: 'anny', password: password, email: 'anny@gmail.com' },
];

const incomeExpenseData = [
  {
    userId: 1,
    category: 'SALARY',
    amount: 5000.0,
    details: 'Monthly Salary',
  },
  {
    userId: 2,
    category: 'FREELANCE',
    amount: 1500.0,
    details: 'Freelance Work',
  },
  // Add more income and expense data as needed
];

const budgetData = [
  {
    userId: 1,
    category: 'GROCERIES',
    plannedAmount: 300.0,
    actualAmount: 250.0,
  },
  {
    userId: 2,
    category: 'UTILITIES',
    plannedAmount: 150.0,
    actualAmount: 120.0,
  },
  // Add more budget data as needed
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
      data: data,
    });
  }

  for (const data of budgetData) {
    await prisma.budget.create({
      data: data,
    });
  }

  // Add similar loops for other tables if needed

  console.log('Seed completed successfully!');
  await prisma.$disconnect();
};

run();
