// finance-tracker/back/index.js
const express = require('express');
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/notfound');
const errorMiddleware = require('./middlewares/error');
const authMiddleware = require('./routes/auth');
const prisma = require('./models/db'); // Import Prisma Client

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

// Middleware notFound when no route is found
app.use(notFoundMiddleware);

// Middleware error when an error occurs
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
