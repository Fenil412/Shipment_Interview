/**
 * Custom Application Error class
 * Allows you to throw errors with a custom status code anywhere in the app.
 *
 * Usage:
 *   throw new AppError('Resource not found', 404);
 */
class AppError extends Error {
  constructor(message, statusCode,errorCode = 'VALIDATION_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
