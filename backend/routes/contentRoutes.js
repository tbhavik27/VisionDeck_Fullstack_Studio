// Wires the generic crudFactory onto Express routers for every simple content
// collection: services, technologies, testimonials, awards, faqs, careers, categories.
// Public GETs, admin-protected writes.
import { Router } from 'express';
import { crudFactory } from '../controllers/crudFactory.js';
import { protect, requireRole } from '../middleware/auth.js';

import Service from '../models/Service.js';
import Technology from '../models/Technology.js';
import Testimonial from '../models/Testimonial.js';
import Award from '../models/Award.js';
import Faq from '../models/Faq.js';
import Career from '../models/Career.js';
import Category from '../models/Category.js';
import Industry from '../models/Industry.js';

function buildCrudRouter(Model) {
  const router = Router();
  const c = crudFactory(Model);
  router.get('/', c.getAll);
  router.get('/:id', c.getOne);
  router.post('/', protect, requireRole('admin', 'editor'), c.create);
  router.put('/:id', protect, requireRole('admin', 'editor'), c.update);
  router.delete('/:id', protect, requireRole('admin'), c.remove);
  return router;
}

export const serviceRoutes = buildCrudRouter(Service);
export const technologyRoutes = buildCrudRouter(Technology);
export const testimonialRoutes = buildCrudRouter(Testimonial);
export const awardRoutes = buildCrudRouter(Award);
export const faqRoutes = buildCrudRouter(Faq);
export const careerRoutes = buildCrudRouter(Career);
export const categoryRoutes = buildCrudRouter(Category);
export const industryRoutes = buildCrudRouter(Industry);
