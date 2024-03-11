const jwt = require('jsonwebtoken')
const db = require("../models/db");

// Middleware นี้ใช้ในการตรวจสอบการยืนยันตัวตนของผู้ใช้
// โดยการตรวจสอบ Token JWT ที่ถูกส่งมาในหัวข้อของคำขอ (request headers)
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // ตรวจสอบว่ามีการส่ง Token JWT มาหรือไม่ หากไม่มีจะส่งข้อความ 'Unauthorized' กลับไป
    if (!authorization) {
      throw new Error('Unauthorized');
    }
    // ตรวจสอบว่า Token JWT มีรูปแบบที่ถูกต้องหรือไม่ หากไม่ถูกต้องจะส่งข้อความ 'Unauthorized' กลับไป
    if (!authorization.startsWith('Bearer')) {
      throw new Error('Unauthorized');
    }
    // แยกส่วนของ Token JWT ออกมา
    const token = authorization.split(' ')[1];
    // ตรวจสอบความถูกต้องของ Token JWT และดึงข้อมูล payload ออกมา
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // ค้นหาข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ id ที่ได้จาก payload
    const user = await db.user.findFirstOrThrow({ where: { id: payload.id } });
    // ลบข้อมูลรหัสผ่านออกเนื่องจากไม่ควรส่งข้อมูลรหัสผ่านกลับไปยังผู้ใช้
    delete user.password;
    // เก็บข้อมูลผู้ใช้ลงใน request object เพื่อให้สามารถเข้าถึงได้ใน middleware หรือ controller ต่อไป
    req.user = user;
    // ส่ง request ไปยัง middleware หรือ controller ต่อไป
    next();
  } catch (err) {
    // หากเกิดข้อผิดพลาดในการตรวจสอบหรือดึงข้อมูลผู้ใช้จะส่งข้อผิดพลาดนั้นกลับไป
    next(err);
  }
};
