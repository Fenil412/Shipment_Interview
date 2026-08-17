import express from 'express';
import cors from'cors';
import morgan from 'morgan';
import routes from'./routes/apiRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Routes ───────────────────────────────────────────────────
app.use('/', routes);
app.use('/api', routes);

app.use(errorHandler);

// ─── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
