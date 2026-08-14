import { Router } from 'express';
import { getAnalytics } from '../controllers/adminController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/analytics', protect, requireRole('admin', 'editor'), getAnalytics);

export default router;
