const express = require('express');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/notfound');
const errorMiddleware = require('./middlewares/error');
const authMiddleware = require('./routes/auth');
const profileRoutes = require('./routes/profileRoute');
const IncomeExpense = require('./routes/IncomeExpense');
const budgetRoutes = require('./routes/budgetRoute');
const savingRoutes = require('./routes/savingRoute'); 
const investmentRoutes = require('./routes/investmentRoute');
const interestCalculationRoutes = require('./routes/interestCalculationRoute');
const dataSharingRoutes = require('./routes/dataSharingRoute');
const reportRoutes = require('./routes/reportRoute');
const notificationRoutes = require('./routes/notificationRoute');
const FinancialPlan = require('./routes/FinancialPlan');
const prisma = require('./models/db');

const app = express();
const PORT = process.env.PORT || 1112;

// Middleware for receiving JSON data from the request body
app.use(express.json());

// Middleware to allow CORS
app.use(cors());

// Middleware to connect Prisma Client to the request object
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Endpoint to check if the Express server is working correctly
app.get('/', (req, res) => {
  res.send('Welcome to Finance Tracker API');
});

// Use /auth route from authMiddleware
app.use('/auth', authMiddleware);

// Use profile routes
app.use('/profile', profileRoutes);

// Use /financialplans route from financialPlanRouter
app.use('/api', FinancialPlan);

// Use income routes
app.use('/incomeExpenses', IncomeExpense);

// Use saving routes
app.use('/saving', savingRoutes);

// Use investment routes
app.use('/invesment', investmentRoutes);

// Use interestCalculation, dataSharing, report, and notification routes
app.use('/api/interestcalculations', interestCalculationRoutes);
app.use('/api/datasharing', dataSharingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Use budget routes
app.use('/butget', budgetRoutes);

// Middleware notFound when no route is found
app.use(notFoundMiddleware);

// Middleware error when an error occurs
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
