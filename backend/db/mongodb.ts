import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

let client: MongoClient | null = null;
let database: Db | null = null;
let isConnected = false;

export function isMongoDBConnected(): boolean {
  return isConnected && database !== null;
}

export async function connectMongoDB(): Promise<Db> {
  if (database && client && isConnected) {
    return database;
  }

  const uri = config.mongoUri;
  const dbName = config.dbName;

  try {
    // Standard MongoClient initialization for MongoDB Atlas & local instances
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(dbName);
    isConnected = true;

    // Create unique index on phone for users collection
    await database.collection('users').createIndex({ phone: 1 }, { unique: true });
    // Create index on createdAt for alerts collection
    await database.collection('alerts').createIndex({ createdAt: -1 });

    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${dbName}`);

    return database;
  } catch (error: any) {
    isConnected = false;
    console.error('❌ Failed to connect to MongoDB:', error?.message || error);
    if (error?.message?.includes('SSL') || error?.message?.includes('tlsv1') || error?.message?.includes('alert')) {
      console.error('👉 TIP: MongoDB Atlas SSL Alert 80 is usually caused by:');
      console.error('   1. MongoDB Atlas Network Access: Make sure IP 0.0.0.0/0 (Allow Access from Anywhere) is active in Atlas.');
      console.error('   2. Special characters in MongoDB password: Ensure password characters like @, :, #, etc. are URL-encoded.');
      console.error('   3. Verify MONGODB_URI starts with mongodb+srv:// on Render.');
    }
    throw error;
  }
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
    isConnected = false;
    console.log('MongoDB connection closed.');
  }
}