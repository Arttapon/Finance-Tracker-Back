// controllers/profileController.js

const db = require('../models/db');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await db.profile.findUnique({
      where: { userId: req.user.id }
    });
    res.send({ profile });
  } catch (error) {
    next(error);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const { fullName, profileImage, coverImage } = req.body;
    const newProfile = await db.profile.create({
      data: {
        userId: req.user.id,
        fullName,
        profileImage,
        coverImage
      }
    });
    res.status(201).json({ profile: newProfile });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { fullName, profileImage, coverImage } = req.body;
    const updatedProfile = await db.profile.update({
      where: { userId: req.user.id },
      data: {
        fullName,
        profileImage,
        coverImage
      }
    });
    res.json({ profile: updatedProfile });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    await db.profile.delete({
      where: { userId: req.user.id }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
