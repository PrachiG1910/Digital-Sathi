import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let client: MongoClient | null = null;
let database: Db | null = null;
let clientPromise: Promise<Db> | null = null;
let isConnected = false;

export function isMongoDBConnected(): boolean {
  return isConnected && database !== null;
}

export async function connectMongoDB(): Promise<Db | null> {
  if (database && client && isConnected) {
    return database;
  }

  const uri = config.mongoUri;
  const dbName = config.dbName;

  const isLocalUri = !uri || uri.includes('127.0.0.1') || uri.includes('localhost');
  const isServerlessOrCloud =
    process.env.VERCEL === '1' ||
    Boolean(process.env.VERCEL_ENV) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    Boolean(process.env.NOW_REGION) ||
    process.env.NODE_ENV === 'production';

  // In production / Vercel, prevent trying to connect to non-existent local loopback
  if (isLocalUri && isServerlessOrCloud) {
    console.warn('[MongoDB] MONGODB_URI is not set in Vercel Environment Variables. Please configure MONGODB_URI in Vercel dashboard.');
    return null;
  }

  if (clientPromise) {
    try {
      return await clientPromise;
    } catch {
      clientPromise = null;
    }
  }

  clientPromise = (async () => {
    try {
      console.log('[AUTH] Connecting to MongoDB Atlas...');
      const newClient = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });

      await newClient.connect();
      client = newClient;
      database = newClient.db(dbName);
      isConnected = true;

      try {
        await database.collection('users').createIndex({ phone: 1 }, { unique: true });
        await database.collection('alerts').createIndex({ createdAt: -1 });
      } catch {
        // Indexes already created
      }

      console.log('✅ [AUTH] MongoDB connection successful to:', dbName);
      return database;
    } catch (error: any) {
      isConnected = false;
      client = null;
      database = null;
      clientPromise = null;
      console.error('❌ [AUTH] MongoDB connection failed:', error?.message || error);
      return null;
    }
  })();

  return clientPromise;
}

export function getDB(): Db {
  if (!database || !isConnected) {
    throw new Error('MongoDB is not connected. Please check MONGODB_URI.');
  }
  return database;
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    database = null;
    clientPromise = null;
    isConnected = false;
    console.log('[AUTH] MongoDB connection closed.');
  }
}