import { Router } from 'express';
import * as sessionController from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
router.get('/today', sessionController.getTodaySessions);
router.get('/upcoming', sessionController.getUpcomingSessions);
router.get('/stats', sessionController.getStats);
router.get('/date/:date', sessionController.getSessionsByDate);
router.patch('/:id/toggle', sessionController.markComplete);

export default router;