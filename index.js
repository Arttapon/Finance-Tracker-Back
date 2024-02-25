const express = require('express');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/notfound');
const errorMiddleware = require('./middlewares/error');
const authMiddleware = require('./routes/auth');
const profileRoutes = require('./routes/profileRoute');
const IncomeExpense = require('./routes/IncomeExpense');
const budgetRoutes = require('./routes/budgetRoute');
const dataSharingRoutes = require('./routes/dataSharingRoute');
const FinancialPlan = require('./routes/FinancialPlan');
const userDataRouter = require('./routes/userDataRoute');
const prisma = require('./models/db');

const app = express();
const PORT = process.env.PORT || 6969;

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

// เส้นทางสำหรับข้อมูล UserData
app.use('/userData', userDataRouter);

// Use /auth route from authMiddleware
app.use('/auth', authMiddleware);

// Use profile routes
app.use('/profile', profileRoutes);

// Use /financialplans route from financialPlanRouter
app.use('/FinancialPlan', FinancialPlan);

// Use income routes
app.use('/IncomeExpenses', IncomeExpense);

// Use dataSharing routes
app.use('/datasharing', dataSharingRoutes);

// Use budget routes
app.use('/budget', budgetRoutes);
// app.get('/budget', (req, res, next) => {
//   res.json('Hello World')
// });

// Middleware notFound when no route is found
app.use(notFoundMiddleware);

// Middleware error when an error occurs
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
