// routes/profileRoute.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /profile
router.get('/', authenticate, profileController.getProfile);
router.post('/', authenticate, profileController.createProfile);
router.put('/', authenticate, profileController.updateProfile);
router.delete('/', authenticate, profileController.deleteProfile);

module.exports = router;
