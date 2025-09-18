const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("💥", err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
