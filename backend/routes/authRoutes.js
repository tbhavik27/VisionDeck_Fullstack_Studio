import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', register); // in production, protect this behind an invite/admin-only flow
router.post('/login', login);
router.get('/me', protect, me);

export default router;
