import { Router } from 'express';
import * as examController from '../controllers/examController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
router.get('/', examController.getExams);
router.post('/', examController.createExam);
router.get('/:id', examController.getExam);
router.delete('/:id', examController.deleteExam);
router.post('/:id/subjects', examController.addSubject);
router.delete('/:examId/subjects/:subjectId', examController.deleteSubject);

export default router;