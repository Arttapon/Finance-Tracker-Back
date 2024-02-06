//back/middlewares/authenticate.js
const jwt = require('jsonwebtoken')
const db = require("../models/db");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error('Unauthorized');
    }
    if (!authorization.startsWith('Bearer')) {
      throw new Error('Unauthorized');
    }
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await db.user.findFirstOrThrow({ where: { id: payload.id } });
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
