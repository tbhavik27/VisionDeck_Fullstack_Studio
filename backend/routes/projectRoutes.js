import { Router } from 'express';
import {
  getProjects, getProject, createProject, updateProject, deleteProject,
} from '../controllers/projectController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, requireRole('admin', 'editor'), upload.single('image'), createProject);
router.put('/:id', protect, requireRole('admin', 'editor'), upload.single('image'), updateProject);
router.delete('/:id', protect, requireRole('admin'), deleteProject);

export default router;
