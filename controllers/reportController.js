// controllers/reportController.js

const db = require('../models/db');

exports.createReport = async (req, res, next) => {
  try {
    const { reportType, reportData } = req.body;
    const newReport = await db.report.create({
      data: {
        userId: req.user.id,
        reportType,
        reportData
      }
    });
    res.status(201).json({ report: newReport });
  } catch (error) {
    next(error);
  }
};
