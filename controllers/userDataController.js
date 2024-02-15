// userData.controller.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ฟังก์ชันสำหรับการดึงข้อมูล UserData จากฐานข้อมูล
const getUserData = async (req, res) => {
    try {
      const userData = await prisma.userData.findFirst({   
        where: {
          userId: 1
        },
        include: {
          user: true
        }
      });
  
      if (!userData) {
        return res.status(404).json({ error: 'User data not found' });
      }
  
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };;

// ฟังก์ชันสำหรับการสร้างข้อมูล UserData
const createUserData = async (req, res) => {
  const { userId, balance } = req.body;
  try {
    const userData = await prisma.userData.create({
      data: {
        userId: parseInt(userId),
        balance: parseFloat(balance),
      },
    });
    res.status(201).json(userData);
  } catch (error) {
    console.error('Error creating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserData,
  createUserData,
};
