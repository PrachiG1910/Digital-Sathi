import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const authRouter = Router();

// Indian 10-digit mobile number pattern: starts with 6-9, followed by 9 digits
const PHONE_REGEX = /^[6-9]\d{9}$/;

// POST /api/auth/register or /auth/register
authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, language, voiceRate, fontSize } = req.body;

    const cleanName = (name || '').trim().replace(/\s+/g, ' ');
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

    if (cleanName.length < 2) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid name with at least 2 characters.',
      });
      return;
    }

    if (!PHONE_REGEX.test(cleanPhone)) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).',
      });
      return;
    }

    console.log(`[AUTH] Register request received for phone ending in ***${cleanPhone.slice(-4)}`);

    const validLang = ['hi', 'mr', 'en'].includes(language) ? language : 'hi';
    const user = await db.createUser({
      phone: cleanPhone,
      name: cleanName,
      language: validLang,
      voiceRate: typeof voiceRate === 'number' ? voiceRate : 0.85,
      fontSize: ['normal', 'large', 'xlarge'].includes(fontSize) ? fontSize : 'large',
    });

    console.log(`[AUTH] User insert/upsert successful in MongoDB for ***${cleanPhone.slice(-4)}`);

    res.status(200).json({
      success: true,
      message: 'Profile saved to database successfully',
      profile: user,
    });
  } catch (error: any) {
    console.error('[AUTH] Registration error:', error?.message || error);
    res.status(500).json({
      success: false,
      error: error.message || 'Database registration failed. Please check MONGODB_URI in Vercel settings.',
    });
  }
});

// POST /api/auth/login or /auth/login
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

    if (!PHONE_REGEX.test(cleanPhone)) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
      return;
    }

    console.log(`[AUTH] Login request received for phone ending in ***${cleanPhone.slice(-4)}`);

    const user = await db.getUser(cleanPhone);
    if (!user) {
      console.log(`[AUTH] User lookup returned null for ***${cleanPhone.slice(-4)}`);
      res.status(404).json({
        success: false,
        error: 'No profile found for this mobile number. Please create a profile first.',
      });
      return;
    }

    // Update lastLoginAt
    const updated = await db.updateUser(cleanPhone, {
      lastLoginAt: new Date().toISOString(),
    });

    console.log(`[AUTH] Login successful for existing user ***${cleanPhone.slice(-4)} (no duplicate created)`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      profile: updated || user,
    });
  } catch (error: any) {
    console.error('[AUTH] Login error:', error?.message || error);
    res.status(500).json({
      success: false,
      error: error.message || 'Database login failed',
    });
  }
});

// GET /api/auth/check/:phone or /auth/check/:phone
authRouter.get('/check/:phone', async (req: Request, res: Response): Promise<void> => {
  try {
    const cleanPhone = (req.params.phone || '').replace(/\D/g, '').slice(-10);
    const isValid = PHONE_REGEX.test(cleanPhone);
    if (!isValid) {
      res.status(400).json({ success: false, isValid: false, exists: false });
      return;
    }

    const user = await db.getUser(cleanPhone);
    res.status(200).json({
      success: true,
      isValid: true,
      exists: !!user,
      name: user?.name,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
