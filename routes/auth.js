// finance-tracker/back/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint: /auth/login
router.post('/login', authController.login);

// Endpoint: /auth/register
router.post('/register', authController.register);

module.exports = router;
