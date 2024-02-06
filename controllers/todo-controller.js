const db = require('../models/db')

exports.getByUser = async (req, res, next) => {
  try {
    const todos = await db.todo.findMany({
      where : { userId : req.user.id}
    })
    res.send({todos})
  } catch (error) {
    next(error)
  }

}