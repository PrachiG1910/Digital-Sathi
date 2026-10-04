import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectMongoDB(): Promise<Db> {
  if (database && client) {
    return database;
  }

  const uri = config.mongoUri;
  const dbName = config.dbName;

  try {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    database = client.db(dbName);

    // Create unique index on phone for users collection
    await database.collection('users').createIndex({ phone: 1 }, { unique: true });
    // Create index on createdAt for alerts collection
    await database.collection('alerts').createIndex({ createdAt: -1 });

    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${dbName}`);

    return database;
  } catch (error: any) {
    console.error('❌ Failed to connect to MongoDB:', error?.message || error);
    throw error;
  }
}

export function getDB(): Db {
  if (!database) {
    throw new Error('MongoDB is not connected yet. Ensure connectMongoDB() is called during server startup.');
  }
  return database;
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    database = null;
    console.log('MongoDB connection closed.');
  }
}