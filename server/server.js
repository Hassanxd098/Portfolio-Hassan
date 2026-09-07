import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  await connectDB();

  const server = app.listen(config.PORT, () => {
    logger.info(`⚡ Hassan Portfolio REST API Server running on port http://localhost:${config.PORT}`);
    logger.info(`🚀 API Health endpoint available at http://localhost:${config.PORT}/api/v1/health`);
  });

  const handleExit = () => {
    server.close(() => {
      logger.info('Server process terminated.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleExit);
  process.on('SIGINT', handleExit);
};

startServer();
