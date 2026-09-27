import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const usersRouter = Router();

// GET /api/users - List all learners and aggregate stats
usersRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.listUsers();
    const stats = {
      totalUsers: users.length,
      languages: {
        hi: users.filter((u) => u.language === 'hi').length,
        mr: users.filter((u) => u.language === 'mr').length,
        en: users.filter((u) => u.language === 'en').length,
      },
      totalCompletedLessons: users.reduce((acc, u) => acc + u.completedLessons.length, 0),
      totalCompletedPractices: users.reduce((acc, u) => acc + u.completedPractices.length, 0),
    };

    res.status(200).json({
      success: true,
      stats,
      users: users.map((u) => ({
        name: u.name,
        phone: u.phone.replace(/(\d{2})\d{4}(\d{4})/, '$1****$2'), // Masked for privacy
        rawPhone: u.phone,
        language: u.language,
        practiceScore: u.practiceScore,
        lessonsCount: u.completedLessons.length,
        practicesCount: u.completedPractices.length,
        lastLoginAt: u.lastLoginAt,
      })),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users/:phone - Get user profile
usersRouter.get('/:phone', async (req: Request, res: Response): Promise<void> => {
  try {
    const cleanPhone = (req.params.phone || '').replace(/\D/g, '').slice(-10);
    const user = await db.getUser(cleanPhone);

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/users/:phone - Update user profile
usersRouter.put('/:phone', async (req: Request, res: Response): Promise<void> => {
  try {
    const cleanPhone = (req.params.phone || '').replace(/\D/g, '').slice(-10);
    const existing = await db.getUser(cleanPhone);

    if (!existing) {
      // If user doesn't exist yet, we can create it
      const { name, language, voiceRate, fontSize } = req.body;
      const created = await db.createUser({
        phone: cleanPhone,
        name: name || 'Learner',
        language: language || 'hi',
        voiceRate,
        fontSize,
      });
      res.status(200).json({ success: true, profile: created });
      return;
    }

    const { name, language, voiceRate, fontSize, completedLessons, completedPractices, practiceScore } = req.body;
    const updated = await db.updateUser(cleanPhone, {
      ...(name && { name }),
      ...(language && { language }),
      ...(voiceRate !== undefined && { voiceRate }),
      ...(fontSize && { fontSize }),
      ...(completedLessons && { completedLessons }),
      ...(completedPractices && { completedPractices }),
      ...(practiceScore !== undefined && { practiceScore }),
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users/:phone/progress - Record lesson or practice progress
usersRouter.post('/:phone/progress', async (req: Request, res: Response): Promise<void> => {
  try {
    const cleanPhone = (req.params.phone || '').replace(/\D/g, '').slice(-10);
    const { lessonId, practiceId, practiceScore, addScore } = req.body;

    const user = await db.getUser(cleanPhone);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const updated = await db.recordProgress(cleanPhone, {
      lessonId,
      practiceId,
      practiceScore,
      addScore,
    });

    res.status(200).json({
      success: true,
      message: 'Progress recorded successfully',
      profile: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/users/:phone - Delete user profile
usersRouter.delete('/:phone', async (req: Request, res: Response): Promise<void> => {
  try {
    const cleanPhone = (req.params.phone || '').replace(/\D/g, '').slice(-10);
    const deleted = await db.deleteUser(cleanPhone);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User profile deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
