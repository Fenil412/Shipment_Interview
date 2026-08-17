/**
 * Not Found Middleware
 * Returns a 404 response for any unmatched route.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = notFound;
