// routes/savingRoute.js

const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');
const authenticate = require('../middlewares/authenticate');

// Endpoint: /savings
router.get('/', authenticate, savingController.getByUser);
router.post('/', authenticate, savingController.createSaving);
router.put('/:id', authenticate, savingController.updateSaving);
router.delete('/:id', authenticate, savingController.deleteSaving);

module.exports = router;
