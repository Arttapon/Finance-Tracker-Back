// controllers/notificationController.js

const db = require('../models/db');

exports.sendNotification = async (req, res, next) => {
  try {
    const { message } = req.body;
    const newNotification = await db.notification.create({
      data: {
        userId: req.user.id,
        message
      }
    });
    res.status(201).json({ notification: newNotification });
  } catch (error) {
    next(error);
  }
};
