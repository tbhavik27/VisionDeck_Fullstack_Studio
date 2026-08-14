import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import careerApplicationRoutes from './routes/careerApplicationRoutes.js';
import {
  serviceRoutes, technologyRoutes, testimonialRoutes, awardRoutes, faqRoutes, careerRoutes, categoryRoutes, industryRoutes,
} from './routes/contentRoutes.js';

const app = express();

// --- Core middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// --- Health check ---
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/applications', careerApplicationRoutes);

app.use('/api/services', serviceRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/industries', industryRoutes);

// --- Errors ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`VisionDeck API listening on port ${PORT}`));
});
