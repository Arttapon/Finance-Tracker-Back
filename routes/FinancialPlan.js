const express = require('express');
const router = express.Router();
const FinancialPlan = require('../controllers/FNCPlanController');
const authenticate = require('../middlewares/authenticate');

// เรียกใช้ middleware authenticate เพื่อตรวจสอบการยืนยันตัวตนของผู้ใช้
// หากไม่ได้ยืนยันตัวตนจะไม่สามารถเข้าถึง endpoint นี้ได้
// โดยจะต้องมีการส่ง token ผ่าน header ของ request ไปยังเซิร์ฟเวอร์เพื่อยืนยันตัวตน
router.get('/', authenticate, FinancialPlan.getFinancialPlans);
router.get('/user', authenticate, FinancialPlan.getPlansById);
router.get('/deposit/:id', authenticate, FinancialPlan.getDepositByID);
router.get('/edit/:id', authenticate, FinancialPlan.getDepositByID);
router.post('/', authenticate, FinancialPlan.createFinancialPlan);
router.patch('/:id', authenticate, FinancialPlan.updateFinancialPlan);
router.delete('/:id', authenticate, FinancialPlan.deleteFinancialPlan);

module.exports = router;
