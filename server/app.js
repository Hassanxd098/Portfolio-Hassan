import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiLimiter } from './middleware/rateLimiter.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import routes from './routes/index.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
}));

// Logger & Parsers
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiting
app.use('/api/v1', apiLimiter);

// API v1 Routes
app.use('/api/v1', routes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Resource path '${req.originalUrl}' not found on this server.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
