import { Router } from 'express';
import { createMessage, getMessages, updateMessageStatus } from '../controllers/messageController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', createMessage); // public — the contact form on the frontend hits this
router.get('/', protect, requireRole('admin', 'editor'), getMessages);
router.patch('/:id/status', protect, requireRole('admin', 'editor'), updateMessageStatus);

export default router;
