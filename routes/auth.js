// ในไฟล์ routes/auth.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authController = require('../controllers/authController');

// Endpoint: /auth/login
router.post('/login', authController.login);

// Endpoint: /auth/register
router.post('/register', authController.register);

// ให้ /auth/me ใช้ middleware authenticate
router.get('/me', authenticate, authController.getMe);

module.exports = router;
