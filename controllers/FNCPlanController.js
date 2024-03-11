// // controllers/financialPlanController.js

// const db = require('../models/db');

// exports.getFinancialPlans = async (req, res, next) => {
//   try {
//     const financialPlans = await db.financialPlan.findMany({
//       where: { userId: req.user.id }
//     });
//     res.send({ financialPlans });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getPlansById = async (req, res, next) => {
//   try {
//     const id = req.user.id
//     if (id !== '') {
//       const gPlans = await db.financialPlan.findMany({
//         where: {
//           userId: id,
//          },
//       });
//       res.send(gPlans);
//     } else {
//       console.log("ไม่พบ ID")
//     }
//   } catch (error) {
//     next(error);
//     // console.log(error)
//   }
// };

// exports.getDepositByID = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (id !== '') {
//       const gPlans = await db.financialPlan.findMany({
//         where: {
//           id: Number(id),
//          },
//       });
//       res.send(gPlans);
//     } else {
//       console.log("ไม่พบ ID")
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.createFinancialPlan = async (req, res, next) => {
//   try {
//     const { PlanName, targetAmount, currentAmount, amountToCollect, collectionFrequency } = req.body;
//     const newFinancialPlan = await db.financialPlan.create({
//       data: {
//         userId: req.user.id,
//         PlanName,
//         targetAmount: Number(targetAmount),
//         currentAmount:  Number(currentAmount),
//         amountToCollect: Number(amountToCollect),
//         collectionFrequency
//       }
//     });
//     res.status(201).json({ financialPlan: newFinancialPlan });
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// };

// exports.updateFinancialPlan = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ error: 'ID is missing' });
//     }

//     const { PlanName, targetAmount, amountToCollect } = req.body;
//     const existingFinancialPlan = await db.financialPlan.findFirst({
//       where: { id: Number(id) }
//     });

//     if (!existingFinancialPlan) {
//       return res.status(404).json({ error: 'Financial plan not found' });
//     }

//     const updatedFinancialPlan = await db.financialPlan.update({
//       where: { id: Number(id) },
//       data: {
//         PlanName,
//         targetAmount,
//         amountToCollect
//       }
//     });

//     res.json({ financialPlan: updatedFinancialPlan });
//   } catch (error) {
//     next(error);
//   }
// };

// // exports.updateCurrentAmount = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     if (!id) {
// //       return res.status(400).json({ error: 'ID is missing' });
// //     }

// //     const { newValue } = req.body;
// //     console.log(newValue);
// //     const existingFinancialPlan = await db.financialPlan.findFirst({
// //       where: { id: Number(id) }
// //     });


// //     if (!existingFinancialPlan) {
// //       return res.status(404).json({ error: 'Financial plan not found' });
// //     }

// //     const updatedCurrentAmount = existingFinancialPlan.currentAmount + newValue;

// //     const updatedFinancialPlan = await db.financialPlan.update({
// //       where: { id: Number(id) },
// //       data: {
// //         currentAmount: updatedCurrentAmount
// //       }
// //     });

// //     res.json({ financialPlan: updatedFinancialPlan });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// exports.updateCurrentAmount = async (req, res, next) => {
//   try {
//       const { id } = req.params;
//       const { currentAmount } = req.body;

//       // อัปเดต currentAmount ของแผนการเงินที่มี id ตรงกับ id ที่ระบุ
//       const updatedFinancialPlan = await db.financialPlan.update({
//           where: { id: Number(id) },
//           data: {
//               currentAmount: currentAmount
//           }
//       });

//       res.json({ financialPlan: updatedFinancialPlan });
//   } catch (error) {
//       next(error);
//   }
// };



// exports.deleteFinancialPlan = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await db.financialPlan.delete({
//       where: { id: parseInt(id) }
//     });
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };





// // controllers/financialPlanController.js

// const db = require('../models/db');

// exports.getFinancialPlans = async (req, res, next) => {
//   try {
//     const financialPlans = await db.financialPlan.findMany({
//       where: { userId: req.user.id }
//     });
//     res.send({ financialPlans });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getPlansById = async (req, res, next) => {
//   try {
//     const id = req.user.id
//     if (id !== '') {
//       const gPlans = await db.financialPlan.findMany({
//         where: {
//           userId: id,
//          },
//       });
//       res.send(gPlans);
//     } else {
//       console.log("ไม่พบ ID")
//     }
//   } catch (error) {
//     next(error);
//     // console.log(error)
//   }
// };

// exports.getDepositByID = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (id !== '') {
//       const gPlans = await db.financialPlan.findMany({
//         where: {
//           id: Number(id),
//          },
//       });
//       res.send(gPlans);
//     } else {
//       console.log("ไม่พบ ID")
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.createFinancialPlan = async (req, res, next) => {
//   try {
//     const { PlanName, targetAmount, currentAmount, amountToCollect, collectionFrequency } = req.body;
//     const newFinancialPlan = await db.financialPlan.create({
//       data: {
//         userId: req.user.id,
//         PlanName,
//         targetAmount: Number(targetAmount),
//         currentAmount:  Number(currentAmount),
//         amountToCollect: Number(amountToCollect),
//         collectionFrequency
//       }
//     });
//     res.status(201).json({ financialPlan: newFinancialPlan });
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// };

// exports.updateFinancialPlan = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ error: 'ID is missing' });
//     }
//     const { PlanName, targetAmount, currentAmount,  amountToCollect, newValue} = req.body;
//     // const { newValue } = req.body;
//     // console.log(newValue);
//     // console.log(currentAmount);

//     const existingFinancialPlan = await db.financialPlan.findFirst({
//       where: { userId: req.user.id }
//     });    
//     // console.log(existingFinancialPlan);

//     const updatedCurrentAmount = existingFinancialPlan.currentAmount + parseInt(currentAmount);

//     // console.log(typeof updatedCurrentAmount);

//     const value = parseFloat(updatedCurrentAmount)
//     // console.log(value);

//     if (!existingFinancialPlan) {
//       return res.status(404).json({ error: 'Financial plan not found' });
//     }

//     const updatedFinancialPlan = await db.financialPlan.update({
//       where: { id: existingFinancialPlan.id },
//       data: {
//         PlanName: PlanName,
//         targetAmount: targetAmount,
//         currentAmount: value,
//         amountToCollect: amountToCollect

//       }
//     });

//     res.json({ financialPlan: updatedFinancialPlan });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteFinancialPlan = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await db.financialPlan.delete({
//       where: { id: parseInt(id) }
//     });
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };


// controllers/financialPlanController.js

const db = require('../models/db');

exports.getFinancialPlans = async (req, res, next) => {
  try {
    const financialPlans = await db.financialPlan.findMany({
      where: { userId: req.user.id }
    });
    res.send({ financialPlans });
  } catch (error) {
    next(error);
  }
};

exports.getPlansById = async (req, res, next) => {
  try {
    const id = req.user.id
    if (id !== '') {
      const gPlans = await db.financialPlan.findMany({
        where: {
          userId: id,
        },
      });
      res.send(gPlans);
    } else {
      console.log("ไม่พบ ID")
    }
  } catch (error) {
    next(error);
    // console.log(error)
  }
};

exports.getDepositByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== '') {
      const gPlans = await db.financialPlan.findMany({
        where: {
          id: Number(id),
        },
      });
      res.send(gPlans);
    } else {
      console.log("ไม่พบ ID")
    }
  } catch (error) {
    next(error);
  }
};

exports.createFinancialPlan = async (req, res, next) => {
  try {
    const { PlanName, targetAmount, currentAmount, amountToCollect, collectionFrequency } = req.body;
    const newFinancialPlan = await db.financialPlan.create({
      data: {
        userId: req.user.id,
        PlanName,
        targetAmount: Number(targetAmount),
        currentAmount: Number(currentAmount),
        amountToCollect: Number(amountToCollect),
        collectionFrequency
      }
    });
    res.status(201).json({ financialPlan: newFinancialPlan });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.updateFinancialPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is missing' });
    }
    const { PlanName, targetAmount, amountToCollect, newValue } = req.body;
    // console.log(newValue);

    const existingFinancialPlan = await db.financialPlan.findFirst({
      where: { id: Number(id) }
    });

    const updatedCurrentAmount = existingFinancialPlan.currentAmount + newValue;

    if (!existingFinancialPlan) {
      return res.status(404).json({ error: 'Financial plan not found' });
    }

    const updatedFinancialPlan = await db.financialPlan.update({
      where: { id: Number(id) },
      data: {
        PlanName,
        targetAmount,
        // currentAmount: updatedCurrentAmount,
        amountToCollect
      }
    });

    res.json({ financialPlan: updatedFinancialPlan });
  } catch (error) {
    next(error);
  }
};


exports.updateCurrentAmount = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is missing' });
    }

    const { newValue } = req.body;
    console.log(newValue);
    const existingFinancialPlan = await db.financialPlan.findFirst({
      where: { id: Number(id) }
    });


    if (!existingFinancialPlan) {
      return res.status(404).json({ error: 'Financial plan not found' });
    }

    const updatedCurrentAmount = existingFinancialPlan.currentAmount + newValue;

    const updatedFinancialPlan = await db.financialPlan.update({
      where: { id: Number(id) },
      data: {
        currentAmount: updatedCurrentAmount
      }
    });

    res.json({ financialPlan: updatedFinancialPlan });
  } catch (error) {
    next(error);
  }
};



exports.deleteFinancialPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.financialPlan.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};