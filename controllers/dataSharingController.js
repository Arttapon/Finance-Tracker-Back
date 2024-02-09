// controllers/dataSharingController.js

const db = require('../models/db');

exports.shareData = async (req, res, next) => {
  try {
    const { sharedWithUserId } = req.body;
    const newDataSharing = await db.dataSharing.create({
      data: {
        userId: req.user.id,
        sharedWithUserId
      }
    });
    res.status(201).json({ dataSharing: newDataSharing });
  } catch (error) {
    next(error);
  }
};
