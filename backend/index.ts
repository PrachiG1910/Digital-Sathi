import express from 'express';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { connectMongoDB, isMongoDBConnected } from './db/mongodb';
import { db } from './db/database';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { ttsRouter } from './routes/tts';
import { curriculumRouter } from './routes/curriculum';
import { aiRouter } from './routes/ai';
import { emergencyRouter } from './routes/emergency';

const app = express();

// Basic Middlewares
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Ensure MongoDB connection for all /api requests
app.use(['/api', '/auth', '/users', '/tts', '/curriculum', '/ai', '/help'], async (req, res, next) => {
  try {
    await connectMongoDB();
  } catch (error: any) {
    console.error('Database connection error in API route middleware:', error?.message || error);
  }
  next();
});

// Request logging in development
if (config.isDev) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}

// Health check endpoint (accessible at both /api/health and /health)
const healthHandler = (req: express.Request, res: express.Response) => {
  const dbConnected = isMongoDBConnected();
  res.status(200).json({
    status: dbConnected ? 'online' : 'degraded',
    appName: 'Digital Sathi Backend',
    version: '2.0.0',
    database: {
      type: 'MongoDB',
      dbName: config.dbName,
      status: dbConnected ? 'connected' : 'disconnected',
    },
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      userPersistence: true,
      audioTTSProxy: true,
      curriculumAPI: true,
      aiGuide: !!config.geminiApiKey,
      emergencyAlerts: true,
    },
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Mount API routes with and without /api prefix to handle all Vercel rewrite patterns
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);

app.use('/api/users', usersRouter);
app.use('/users', usersRouter);

app.use('/api/tts', ttsRouter);
app.use('/tts', ttsRouter);

app.use('/api/curriculum', curriculumRouter);
app.use('/curriculum', curriculumRouter);

app.use('/api/ai', aiRouter);
app.use('/ai', aiRouter);

app.use('/api/help', emergencyRouter);
app.use('/help', emergencyRouter);

// Serve static frontend in production if dist/ folder exists (for unified Node deployment)
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback for HTML5 routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/auth/') || req.path.startsWith('/users/')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling
app.use(errorHandler);

// Start server listener only when executed directly (standalone Node / Render), not in serverless
async function startServer() {
  const server = app.listen(config.port, config.host, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Digital Sathi Backend running on http://${config.host}:${config.port}`);
    console.log(`📦 MongoDB Database: ${config.dbName}`);
    console.log(`📡 Health Check:     http://localhost:${config.port}/api/health`);
    console.log(`👥 Users API:        http://localhost:${config.port}/api/users`);
    console.log(`🗣️ TTS Audio:        http://localhost:${config.port}/api/tts`);
    console.log(`🤖 AI Sathi:         http://localhost:${config.port}/api/ai/ask`);
    console.log(`=======================================================`);
  });

  console.log('Connecting to MongoDB...');
  try {
    await connectMongoDB();
    await db.migrateLegacyData();
  } catch (error: any) {
    console.error('⚠️ Initial database connection attempt failed:', error?.message || error);
    console.warn('⚡ The HTTP server remains online to respond to health checks.');
    console.warn('🔄 Retrying MongoDB connection in background...');

    const retryInterval = setInterval(async () => {
      try {
        await connectMongoDB();
        await db.migrateLegacyData();
        clearInterval(retryInterval);
      } catch {
        // Continue retrying periodically
      }
    }, 10000);
  }

  return server;
}

const isServerlessRuntime =
  process.env.VERCEL === '1' ||
  Boolean(process.env.VERCEL_ENV) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.NOW_REGION);

if (!isServerlessRuntime) {
  startServer();
}

export default app;
