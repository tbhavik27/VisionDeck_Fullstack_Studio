import { Router } from 'express';
import Blog from '../models/Blog.js';
import { protect, requireRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js';

const router = Router();

// GET /api/blogs — public, published only unless authenticated
router.get('/', async (req, res, next) => {
  try {
    const filter = req.user?.role === 'admin' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).populate('author', 'name');
    res.json(blogs);
  } catch (err) { next(err); }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Post not found' });
    res.json(blog);
  } catch (err) { next(err); }
});

// POST /api/blogs (admin/editor, multipart with optional coverImage)
router.post('/', protect, requireRole('admin', 'editor'), upload.single('coverImage'), async (req, res, next) => {
  try {
    const payload = { ...req.body, author: req.user._id };
    if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(t => t.trim());
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'visiondeck/blog');
      payload.coverImage = result.secure_url;
    }
    const blog = await Blog.create(payload);
    res.status(201).json(blog);
  } catch (err) { next(err); }
});

// PUT /api/blogs/:id (admin/editor)
router.put('/:id', protect, requireRole('admin', 'editor'), upload.single('coverImage'), async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(t => t.trim());
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'visiondeck/blog');
      payload.coverImage = result.secure_url;
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) { next(err); }
});

// DELETE /api/blogs/:id (admin)
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
