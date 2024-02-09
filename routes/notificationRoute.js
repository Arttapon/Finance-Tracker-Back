// routes/notificationRoute.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /notifications
router.post('/', authenticate, notificationController.sendNotification);

module.exports = router;
