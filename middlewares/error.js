// finance-tracker/back/middlewares/error.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = errorMiddleware;
  