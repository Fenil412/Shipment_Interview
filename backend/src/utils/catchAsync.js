/**
 * Wraps async route handlers to automatically catch errors
 * and forward them to the Express error middleware via next().
 *
 * Usage:
 *   router.get('/', catchAsync(async (req, res, next) => { ... }));
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
