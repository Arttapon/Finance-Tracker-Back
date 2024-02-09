// routes/dataSharingRoute.js

const express = require('express');
const router = express.Router();
const dataSharingController = require('../controllers/dataSharingController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /datasharing
router.post('/', authenticate, dataSharingController.shareData);

module.exports = router;
