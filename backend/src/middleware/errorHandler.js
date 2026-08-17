/**
 * Error Handler Middleware
 * Catches errors passed via next(err) and returns a structured JSON response.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    //success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
