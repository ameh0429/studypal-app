import { Router } from 'express';
import * as sessionController from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';
import { sendReminders } from '../services/cronService.js';

const router = Router();
router.use(authenticate);
router.get('/today', sessionController.getTodaySessions);
router.get('/upcoming', sessionController.getUpcomingSessions);
router.get('/stats', sessionController.getStats);
router.get('/date/:date', sessionController.getSessionsByDate);
router.patch('/:id/toggle', sessionController.markComplete);

// Manual trigger for testing reminders (admin use)
router.post('/send-reminders', async (req, res) => {
  try {
    await sendReminders();
    res.json({ message: 'Reminders sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;