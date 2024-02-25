// userData.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ฟังก์ชันสำหรับการดึงข้อมูล UserData จากฐานข้อมูล
const getUserData = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = await prisma.userData.findFirst({   
        where: {
          id: Number(id)
        },
      });
  
      if (!userData) {
        return res.status(404).json({ error: 'User data not found' });
      }
  
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// ฟังก์ชันสำหรับการสร้างข้อมูล UserData
const createUserData = async (req, res) => {
  const { userId, balance, transactionType, amount } = req.body;
  try {
    const userData = await prisma.userData.create({
      data: {
        userId: Number(userId),
        balance: Number(balance),
        transactionType: transactionType,
        amount: Number(amount)
      },
    });
    res.status(201).json(userData);
  } catch (error) {
    console.error('Error creating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ฟังก์ชันสำหรับการสร้าง transaction
const createTransaction = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount,
        type
      }
    });
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

module.exports = {  
  getUserData,
  createUserData,
  createTransaction
};
