const globalErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = { globalErrorHandler };
