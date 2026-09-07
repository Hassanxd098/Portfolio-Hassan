import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

export let isConnected = false;

export const connectDB = async () => {
  if (!config.MONGODB_URI) {
    logger.warn('MONGODB_URI not provided. Server will run with in-memory fallback dataset.');
    return false;
  }
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return true;
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    logger.warn('Falling back to in-memory datasets for portfolio server API.');
    isConnected = false;
    return false;
  }
};
