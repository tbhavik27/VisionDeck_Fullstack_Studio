import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

import User from '../models/User.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';
import Award from '../models/Award.js';
import Faq from '../models/Faq.js';
import Industry from '../models/Industry.js';
import Technology from '../models/Technology.js';
import Blog from '../models/Blog.js';

const services = [
  { title: 'Web Development', summary: 'Fast, scalable web apps built on modern frameworks with clean, maintainable architecture.', icon: 'code' },
  { title: 'Mobile Apps', summary: 'Native-feel iOS and Android apps that ship on time and hold up under real usage.', icon: 'mobile' },
  { title: 'Cloud & DevOps', summary: 'CI/CD pipelines, containerized infra, and cloud architecture that scales with you.', icon: 'cloud' },
  { title: 'AI & Automation', summary: 'Practical machine learning and automation that removes real bottlenecks, not demos.', icon: 'ai' },
  { title: 'UI/UX Design', summary: 'Interfaces designed around how people actually work, backed by research and testing.', icon: 'design' },
  { title: 'Tech Consulting', summary: 'Architecture reviews, technology roadmaps, and hands-on guidance for engineering teams.', icon: 'consult' },
];

const industries = [
  { title: 'Healthcare', icon: 'health', order: 1 },
  { title: 'Finance', icon: 'finance', order: 2 },
  { title: 'Education', icon: 'education', order: 3 },
  { title: 'Retail', icon: 'retail', order: 4 },
  { title: 'Real Estate', icon: 'realestate', order: 5 },
  { title: 'Travel', icon: 'travel', order: 6 },
  { title: 'Manufacturing', icon: 'manufacturing', order: 7 },
  { title: 'Government', icon: 'gov', order: 8 },
];

const technologies = [
  { category: 'frontend', name: 'React' }, { category: 'frontend', name: 'TypeScript' },
  { category: 'frontend', name: 'Next.js' }, { category: 'frontend', name: 'Tailwind CSS' },
  { category: 'backend', name: 'Node.js' }, { category: 'backend', name: 'Express' },
  { category: 'backend', name: 'Python' }, { category: 'backend', name: 'Java' },
  { category: 'mobile', name: 'React Native' }, { category: 'mobile', name: 'Swift' },
  { category: 'mobile', name: 'Kotlin' }, { category: 'mobile', name: 'Flutter' },
  { category: 'database', name: 'MongoDB' }, { category: 'database', name: 'PostgreSQL' },
  { category: 'database', name: 'Redis' }, { category: 'database', name: 'MySQL' },
  { category: 'cloud', name: 'AWS' }, { category: 'cloud', name: 'Docker' },
  { category: 'cloud', name: 'Kubernetes' }, { category: 'cloud', name: 'Vercel' },
  { category: 'ai', name: 'TensorFlow' }, { category: 'ai', name: 'PyTorch' },
  { category: 'ai', name: 'OpenAI API' }, { category: 'ai', name: 'LangChain' },
];

const projects = [
  { title: 'FinTrack - Personal Finance Platform', category: 'Web App', description: 'A budgeting and investment tracking platform serving 40k+ monthly active users with real-time sync.', stack: ['React', 'Node.js', 'MongoDB'], image: '/images/projects/fintrack.svg', github: 'https://github.com', demo: 'https://example.com' },
  { title: 'MedQueue - Patient Scheduling', category: 'Healthcare', description: 'Appointment and queue management system deployed across a 12-clinic healthcare network.', stack: ['Next.js', 'PostgreSQL', 'AWS'], image: '/images/projects/medqueue.svg', github: 'https://github.com', demo: 'https://example.com' },
  { title: 'ShelfSense - Retail Inventory AI', category: 'AI & Automation', description: 'Computer-vision-assisted inventory forecasting that cut stockouts by 31% in pilot stores.', stack: ['Python', 'TensorFlow', 'Docker'], image: '/images/projects/shelfsense.svg', github: 'https://github.com', demo: 'https://example.com' },
  { title: 'RoutePilot - Fleet Logistics', category: 'Mobile App', description: 'Driver-facing route optimization app with offline-first sync for fleets operating in low-connectivity areas.', stack: ['React Native', 'Express', 'Redis'], image: '/images/projects/routepilot.svg', github: 'https://github.com', demo: 'https://example.com' },
  { title: 'CampusHub - Education Portal', category: 'Education', description: 'A unified student portal consolidating grades, messaging, and course registration for a 20k-student university.', stack: ['React', 'Java', 'MySQL'], image: '/images/projects/campushub.svg', github: 'https://github.com', demo: 'https://example.com' },
  { title: 'NestList - Real Estate Marketplace', category: 'Web App', description: 'Property listing and virtual tour marketplace with map-based search and saved-search alerts.', stack: ['Next.js', 'MongoDB', 'Cloudinary'], image: '/images/projects/nestlist.svg', github: 'https://github.com', demo: 'https://example.com' },
];

const blogs = [
  {
    title: 'Launch Checklist for Production Web Apps',
    slug: 'launch-checklist-production-web-apps',
    excerpt: 'A practical checklist for performance, accessibility, deployment, observability, and rollback planning before launch day.',
    content: 'A launch-ready web app needs more than a finished UI. Before release, verify every critical user journey, empty state, validation message, and failure state on mobile and desktop.\n\nPerformance checks should include image sizes, lazy loading, API latency, and bundle size. Accessibility checks should include keyboard navigation, labels, color contrast, and readable focus states.\n\nFinally, make deployment reversible. A clear rollback process, basic monitoring, and a tested contact path make launch day calmer for the whole team.',
    coverImage: '/images/blog/launch-checklist.svg',
    tags: ['Launch', 'Web App', 'QA'],
    published: true,
  },
  {
    title: 'Where AI Automation Actually Pays Off',
    slug: 'where-ai-automation-pays-off',
    excerpt: 'How to find the repetitive workflows where automation creates real savings without creating fragile black boxes.',
    content: 'The best AI automation projects start with a repetitive workflow, clear success criteria, and a human review point. If a team cannot describe the current manual process, automation usually adds confusion.\n\nGood candidates include document triage, customer request routing, internal knowledge lookup, quote generation, and data cleanup. Each workflow should have guardrails for confidence, escalation, and audit history.\n\nStart with one measurable bottleneck. A focused automation that saves twenty minutes a day for ten people is more valuable than a broad assistant nobody trusts.',
    coverImage: '/images/blog/ai-automation.svg',
    tags: ['AI', 'Automation', 'Operations'],
    published: true,
  },
  {
    title: 'Cutting Cloud Costs Without Slowing Teams Down',
    slug: 'cutting-cloud-costs-without-slowing-teams',
    excerpt: 'A simple operating rhythm for finding cloud waste, improving reliability, and keeping developers moving.',
    content: 'Cloud cost work is most effective when it is tied to usage visibility. Start by tagging environments, services, and owners so spend has context.\n\nNext, review idle resources, over-provisioned databases, storage lifecycle rules, and logging volume. These areas often reduce spend without touching the product experience.\n\nThe goal is not to make teams afraid of infrastructure. The goal is to create defaults, alerts, and review habits that keep spend predictable while releases keep moving.',
    coverImage: '/images/blog/cloud-costs.svg',
    tags: ['Cloud', 'DevOps', 'Cost'],
    published: true,
  },
];

const testimonials = [
  { name: 'Sarah Lindqvist', role: 'VP Engineering', company: 'Northline Health', quote: 'VisionDeck rebuilt our scheduling system in eight weeks. Zero downtime migration, and support has been responsive ever since.', rating: 5 },
  { name: 'Tom Ackerman', role: 'Founder', company: 'RouteWorks Logistics', quote: 'They did not just write code. They pushed back on our spec when it did not make sense, which saved us months.', rating: 5 },
];

const awards = [
  { title: 'Top Software Development Company', issuer: 'Clutch', year: '2025' },
  { title: 'Best Digital Transformation Partner', issuer: 'GoodFirms', year: '2025' },
];

const faqs = [
  { question: 'How long does a typical project take?', answer: 'Most web or mobile builds run 6-12 weeks depending on scope. We give you a fixed timeline after a scoping call, not a rough guess.', order: 1 },
  { question: 'Do you work with early-stage startups?', answer: 'Yes. About a third of our engagements are pre-seed to Series A teams building their first production product.', order: 2 },
];

async function seed() {
  await connectDB();
  console.log('Seeding VisionDeck database...');

  await Promise.all([
    Service.deleteMany(), Project.deleteMany(), Testimonial.deleteMany(),
    Award.deleteMany(), Faq.deleteMany(), Industry.deleteMany(), Technology.deleteMany(),
    Blog.deleteMany(),
  ]);

  await Service.insertMany(services);
  await Project.insertMany(projects);
  await Testimonial.insertMany(testimonials);
  await Award.insertMany(awards);
  await Faq.insertMany(faqs);
  await Industry.insertMany(industries);
  await Technology.insertMany(technologies);
  await Blog.insertMany(blogs);

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@visiondeck.dev';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'ChangeThisPassword123', 12);
    await User.create({
      name: process.env.SEED_ADMIN_NAME || 'VisionDeck Admin',
      email: adminEmail,
      password: hashed,
      role: 'admin',
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists - skipped.');
  }

  console.log('Seed complete. Collections populated: services, projects, blogs, testimonials, awards, faqs, industries, technologies, users.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
