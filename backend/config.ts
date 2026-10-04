import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const rawMongoUri = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017').trim();
const cleanMongoUri = rawMongoUri.replace(/^["']|["']$/g, '').trim();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, ''),
  appUrl: (process.env.APP_URL || 'http://localhost:3000').trim().replace(/^["']|["']$/g, ''),
  mongoUri: cleanMongoUri,
  dbName: (process.env.MONGODB_DB_NAME || 'digital_sathi').trim().replace(/^["']|["']$/g, ''),
  dbFilePath: path.resolve(process.cwd(), 'data', 'ds_database.json'),
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};
