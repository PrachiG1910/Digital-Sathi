import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let client: MongoClient | null = null;
let database: Db | null = null;
let clientPromise: Promise<Db> | null = null;
let isConnected = false;

export function isMongoDBConnected(): boolean {
  return isConnected && database !== null;
}

export async function connectMongoDB(): Promise<Db> {
  if (database && client && isConnected) {
    return database;
  }

  if (clientPromise) {
    return clientPromise;
  }

  const uri = config.mongoUri;
  const dbName = config.dbName;

  clientPromise = (async () => {
    try {
      if (!uri || (process.env.VERCEL === '1' && uri.includes('127.0.0.1'))) {
        throw new Error('MONGODB_URI is not configured in Vercel Environment Variables. Please set MONGODB_URI in Vercel Dashboard.');
      }

      client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });

      console.log('[AUTH] Connecting to MongoDB...');
      await client.connect();
      database = client.db(dbName);
      isConnected = true;

      // Ensure indexes
      try {
        await database.collection('users').createIndex({ phone: 1 }, { unique: true });
        await database.collection('alerts').createIndex({ createdAt: -1 });
      } catch {
        // Indexes already existing or created
      }

      console.log('✅ [AUTH] MongoDB connection successful');
      return database;
    } catch (error: any) {
      isConnected = false;
      clientPromise = null;
      console.error('❌ [AUTH] MongoDB connection failed:', error?.message || error);
      throw error;
    }
  })();

  return clientPromise;
}

export function getDB(): Db {
  if (!database || !isConnected) {
    throw new Error('MongoDB is not connected yet.');
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