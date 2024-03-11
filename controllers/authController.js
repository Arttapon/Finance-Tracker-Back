//back/controllers//authController

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require("../models/db");

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้ใหม่
module.exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;
  try {
    // ตรวจสอบความถูกต้องของข้อมูลที่รับมา
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    // เข้ารหัส password และเตรียมข้อมูลสำหรับการเพิ่มผู้ใช้ใหม่
    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      username,
      password : hashedPassword,
      email
    };

    // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูลและส่งข้อความสำเร็จกลับ
    const rs = await db.User.create({ data })
    res.json({ msg: 'Register successful' })
  } catch (err) {
    next(err);
  }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
module.exports.login = async (req, res, next) => {
  const {username, password} = req.body
  try {
    // ตรวจสอบความถูกต้องของข้อมูลที่รับมา
    if( !(username.trim() && password.trim()) ) {
      throw new Error('username or password must not blank')
    }
    // ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ชื่อผู้ใช้
    const user = await db.user.findFirstOrThrow({ where : { username }})
    // เปรียบเทียบรหัสผ่าน
    const pwOk = await bcrypt.compare(password, user.password)
    if(!pwOk) {
      throw new Error('invalid login')
    }
    // ออก JWT token และส่งกลับ
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({token : token})
  }catch(err) {
    next(err)
  }
};

// ฟังก์ชันสำหรับการเรียกดูข้อมูลผู้ใช้ปัจจุบัน
module.exports.getMe = (req, res, next) => {
  // ตอนนี้ req.user คือ user ที่ได้มาจาก middleware authenticate
  res.json( req.user );
};
