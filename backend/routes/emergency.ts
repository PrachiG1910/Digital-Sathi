import { Router, Request, Response } from 'express';
import { db } from '../db/database';

export const emergencyRouter = Router();

// POST /api/help/alert - Record assistance or emergency alert
emergencyRouter.post('/alert', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, name, alertType = 'family_help', message } = req.body;

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    const cleanName = (name || 'Digital Sathi Learner').trim();

    const alert = await db.recordAlert({
      phone: cleanPhone || 'NotProvided',
      name: cleanName,
      alertType: alertType === 'emergency' ? 'emergency' : 'family_help',
      message: message || (alertType === 'emergency' ? 'Senior requested emergency assistance' : 'Senior requested help from family'),
    });

    res.status(200).json({
      success: true,
      message: 'Help alert registered successfully',
      alert,
      helplineNumbers: [
        { label: 'National Emergency Helpline', number: '112' },
        { label: 'Senior Citizen Helpline (Elder Line)', number: '14567' },
        { label: 'Cyber Financial Fraud Helpline', number: '1930' },
      ],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/help/alerts
emergencyRouter.get('/alerts', async (req: Request, res: Response): Promise<void> => {
  try {
    const phone = req.query.phone as string | undefined;
    const alerts = await db.getAlerts(phone);
    res.status(200).json({ success: true, count: alerts.length, alerts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
