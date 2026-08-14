import Project from '../models/Project.js';
import { uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js';
import cloudinary from '../config/cloudinary.js';

// GET /api/projects?category=&search=&page=&limit=
export async function getProjects(req, res, next) {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Project.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
}

// GET /api/projects/:id
export async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
}

// POST /api/projects  (admin, multipart/form-data with optional "image" file)
export async function createProject(req, res, next) {
  try {
    const payload = { ...req.body };
    if (typeof payload.stack === 'string') payload.stack = payload.stack.split(',').map(s => s.trim());

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'visiondeck/projects');
      payload.image = result.secure_url;
      payload.imagePublicId = result.public_id;
    }

    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (err) { next(err); }
}

// PUT /api/projects/:id (admin)
export async function updateProject(req, res, next) {
  try {
    const payload = { ...req.body };
    if (typeof payload.stack === 'string') payload.stack = payload.stack.split(',').map(s => s.trim());

    if (req.file) {
      const existing = await Project.findById(req.params.id);
      if (existing?.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
      }
      const result = await uploadBufferToCloudinary(req.file.buffer, 'visiondeck/projects');
      payload.image = result.secure_url;
      payload.imagePublicId = result.public_id;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
}

// DELETE /api/projects/:id (admin)
export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {});
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
}
