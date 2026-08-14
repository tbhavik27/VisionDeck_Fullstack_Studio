import { Router } from 'express';
import Application from '../models/Application.js';
import { protect, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js';

const router = Router();

// POST /api/applications — public, candidate submits with resume (PDF)
router.post('/', upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'A resume file is required' });
    const result = await uploadBufferToCloudinary(req.file.buffer, 'visiondeck/resumes');
    const application = await Application.create({
      ...req.body,
      resumeUrl: result.secure_url,
    });
    res.status(201).json({ message: 'Application received', id: application._id });
  } catch (err) { next(err); }
});

// GET /api/applications (admin)
router.get('/', protect, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 }).populate('career', 'title');
    res.json(applications);
  } catch (err) { next(err); }
});

// PATCH /api/applications/:id/status (admin)
router.patch('/:id/status', protect, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!application) return res.status(404).json({ message: 'Not found' });
    res.json(application);
  } catch (err) { next(err); }
});

export default router;
