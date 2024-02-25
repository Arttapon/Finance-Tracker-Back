// userDataRoute.js
const authenticate = require('../middlewares/authenticate')
const express = require('express');
const router = express.Router();
const { getUserData, createUserData, createTransaction } = require('../controllers/userDataController'); // เพิ่ม createTransaction ที่นี่

// เส้นทาง GET เพื่อดึงข้อมูล UserData
router.get('/:id',authenticate, getUserData);

// เส้นทาง POST เพื่อสร้างข้อมูล UserData
router.post('/', createUserData);

// เส้นทาง POST เพื่อสร้าง transaction
router.post('/transaction', createTransaction);

module.exports = router;
