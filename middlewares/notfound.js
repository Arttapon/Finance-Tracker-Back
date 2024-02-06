// finance-tracker/back/middlewares/notfound.js

const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
  };
  
  module.exports = notFoundMiddleware;
  
  