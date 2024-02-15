// userData.router.js
const express = require('express');
const router = express.Router();
const { getUserData, createUserData } = require('../controllers/userDataController');

// เส้นทาง GET เพื่อดึงข้อมูล UserData
router.get('/:userId', getUserData);

// เส้นทาง POST เพื่อสร้างข้อมูล UserData
router.post('/', createUserData);

module.exports = router;
