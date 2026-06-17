const { sendResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return sendResponse(res, statusCode, false, null, message);
};

module.exports = errorHandler;
