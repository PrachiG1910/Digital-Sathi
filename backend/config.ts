import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  dbFilePath: path.resolve(process.cwd(), 'data', 'ds_database.json'),
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};
