import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Blog from '../models/Blog.js';
import Application from '../models/Application.js';
import Testimonial from '../models/Testimonial.js';

// GET /api/admin/analytics — dashboard summary counts
export async function getAnalytics(req, res, next) {
  try {
    const [projects, messages, newMessages, blogs, applications, testimonials] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: 'new' }),
      Blog.countDocuments(),
      Application.countDocuments(),
      Testimonial.countDocuments(),
    ]);
    res.json({ projects, messages, newMessages, blogs, applications, testimonials });
  } catch (err) { next(err); }
}
