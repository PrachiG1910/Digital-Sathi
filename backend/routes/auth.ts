import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const authRouter = Router();

// Indian 10-digit mobile number pattern: starts with 6-9, followed by 9 digits
const PHONE_REGEX = /^[6-9]\d{9}$/;

// POST /api/auth/register
authRouter.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, language, voiceRate, fontSize } = req.body;

    const cleanName = (name || '').trim();
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

    const validLang = ['hi', 'mr', 'en'].includes(language) ? language : 'hi';
    const user = await db.createUser({
      phone: cleanPhone,
      name: cleanName,
      language: validLang,
      voiceRate: typeof voiceRate === 'number' ? voiceRate : 0.85,
      fontSize: ['normal', 'large', 'xlarge'].includes(fontSize) ? fontSize : 'large',
    });

    res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      profile: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to register user',
    });
  }
});

// POST /api/auth/login
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

    const user = await db.getUser(cleanPhone);
    if (!user) {
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

    res.status(200).json({
      success: true,
      message: 'Login successful',
      profile: updated || user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to login',
    });
  }
});

// GET /api/auth/check/:phone
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
