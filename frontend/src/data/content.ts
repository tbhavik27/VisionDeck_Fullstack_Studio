import type {
  Service, Industry, TechCategory, TechnologyItem, Project, Award, TeamMember, Testimonial, PricingPlan, FaqItem,
  ServiceDetail, BlogPost,
} from '@/types';

const techLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database',
  cloud: 'Cloud',
  ai: 'AI',
};

export function groupTechnologies(flat: TechnologyItem[]): TechCategory[] {
  const byCategory = new Map<string, TechnologyItem[]>();
  flat.forEach(t => {
    const list = byCategory.get(t.category) ?? [];
    list.push(t);
    byCategory.set(t.category, list);
  });
  return Array.from(byCategory.entries()).map(([id, items]) => ({
    id,
    label: techLabels[id] ?? id,
    items: items.map(i => ({ name: i.name, icon: i.icon ?? id })),
  }));
}

export const services: Service[] = [
  { id: 'web', title: 'Web Development', summary: 'Fast, scalable web apps built on modern frameworks with clean, maintainable architecture.', icon: 'code' },
  { id: 'mobile', title: 'Mobile Apps', summary: 'Native-feel iOS and Android apps that ship on time and hold up under real usage.', icon: 'mobile' },
  { id: 'cloud', title: 'Cloud & DevOps', summary: 'CI/CD pipelines, containerized infra, and cloud architecture that scales with you.', icon: 'cloud' },
  { id: 'ai', title: 'AI & Automation', summary: 'Practical machine learning and automation that removes real bottlenecks, not demos.', icon: 'ai' },
  { id: 'design', title: 'UI/UX Design', summary: 'Interfaces designed around how people actually work, backed by research and testing.', icon: 'design' },
  { id: 'consulting', title: 'Tech Consulting', summary: 'Architecture reviews, technology roadmaps, and hands-on guidance for engineering teams.', icon: 'consult' },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'web',
    title: 'Web Development',
    icon: 'code',
    summary: 'We design and build responsive web products that are fast, maintainable, and ready for real users.',
    description: 'Production-grade websites, SaaS dashboards, portals, and web apps built with clear architecture and practical delivery discipline.',
    highlights: ['React and Next.js builds', 'API integration', 'Admin dashboards', 'Performance tuning'],
    deliverables: ['Responsive UI', 'Backend-ready data flows', 'Testing checklist', 'Deployment handoff'],
    outcomes: ['Cleaner user journeys', 'Faster page loads', 'Lower maintenance cost', 'Launch-ready codebase'],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    icon: 'mobile',
    summary: 'We create mobile experiences that feel natural, sync reliably, and keep working outside perfect network conditions.',
    description: 'iOS and Android app development for teams that need dependable mobile workflows, offline states, and polished product UX.',
    highlights: ['React Native apps', 'Offline-first sync', 'Push notifications', 'App store readiness'],
    deliverables: ['Mobile UI kit', 'API-connected screens', 'Release builds', 'Store submission checklist'],
    outcomes: ['Smoother onboarding', 'Reliable field usage', 'Faster iteration cycles', 'Lower duplicate development'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    summary: 'We set up cloud infrastructure and delivery pipelines that make shipping safer and operations easier.',
    description: 'Cloud architecture, CI/CD, observability, and deployment systems for teams moving from manual releases to repeatable delivery.',
    highlights: ['CI/CD pipelines', 'Containerized services', 'Cloud cost reviews', 'Monitoring setup'],
    deliverables: ['Infrastructure plan', 'Deployment pipeline', 'Rollback process', 'Operational runbook'],
    outcomes: ['More reliable releases', 'Better uptime visibility', 'Reduced cloud waste', 'Stronger security posture'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'ai',
    summary: 'We turn repetitive business workflows into practical automations backed by measurable outcomes.',
    description: 'Applied AI, data workflows, and automation systems built around real bottlenecks instead of novelty demos.',
    highlights: ['Workflow automation', 'AI assistants', 'Document processing', 'Prediction workflows'],
    deliverables: ['Automation map', 'Prototype workflow', 'Human review controls', 'Integration notes'],
    outcomes: ['Less manual work', 'Faster response times', 'Better data quality', 'Clearer team handoffs'],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: 'design',
    summary: 'We design practical interfaces around the tasks people repeat every day.',
    description: 'Research-backed product design, design systems, and interaction work for apps that need to be easy to learn and efficient to use.',
    highlights: ['UX audits', 'Wireframes', 'Design systems', 'Usability testing'],
    deliverables: ['Clickable prototype', 'Component library', 'User journey map', 'Implementation specs'],
    outcomes: ['Fewer confusing flows', 'Better conversion', 'More consistent UI', 'Faster engineering handoff'],
  },
  {
    id: 'consulting',
    title: 'Tech Consulting',
    icon: 'consult',
    summary: 'We help teams make grounded architecture, roadmap, and delivery decisions before code gets expensive.',
    description: 'Technical reviews and product engineering guidance for founders and teams that need clarity before building or scaling.',
    highlights: ['Architecture review', 'Roadmap planning', 'Security review', 'Team process audit'],
    deliverables: ['Findings report', 'Prioritized roadmap', 'Risk register', 'Decision brief'],
    outcomes: ['Clearer tradeoffs', 'Reduced rework', 'Better vendor choices', 'More confident execution'],
  },
];

export const industries: Industry[] = [
  { id: 'health', title: 'Healthcare', icon: 'health' },
  { id: 'finance', title: 'Finance', icon: 'finance' },
  { id: 'education', title: 'Education', icon: 'education' },
  { id: 'retail', title: 'Retail', icon: 'retail' },
  { id: 'realestate', title: 'Real Estate', icon: 'realestate' },
  { id: 'travel', title: 'Travel', icon: 'travel' },
  { id: 'manufacturing', title: 'Manufacturing', icon: 'manufacturing' },
  { id: 'gov', title: 'Government', icon: 'gov' },
];

export const techCategories: TechCategory[] = [
  {
    id: 'frontend', label: 'Frontend',
    items: [
      { name: 'React', icon: 'react' }, { name: 'TypeScript', icon: 'ts' },
      { name: 'Next.js', icon: 'next' }, { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    id: 'backend', label: 'Backend',
    items: [
      { name: 'Node.js', icon: 'node' }, { name: 'Express', icon: 'express' },
      { name: 'Python', icon: 'python' }, { name: 'Java', icon: 'java' },
    ],
  },
  {
    id: 'mobile', label: 'Mobile',
    items: [
      { name: 'React Native', icon: 'react' }, { name: 'Swift', icon: 'swift' },
      { name: 'Kotlin', icon: 'kotlin' }, { name: 'Flutter', icon: 'flutter' },
    ],
  },
  {
    id: 'database', label: 'Database',
    items: [
      { name: 'MongoDB', icon: 'mongo' }, { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'Redis', icon: 'redis' }, { name: 'MySQL', icon: 'mysql' },
    ],
  },
  {
    id: 'cloud', label: 'Cloud',
    items: [
      { name: 'AWS', icon: 'aws' }, { name: 'Docker', icon: 'docker' },
      { name: 'Kubernetes', icon: 'k8s' }, { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    id: 'ai', label: 'AI',
    items: [
      { name: 'TensorFlow', icon: 'tensorflow' }, { name: 'PyTorch', icon: 'pytorch' },
      { name: 'OpenAI API', icon: 'openai' }, { name: 'LangChain', icon: 'langchain' },
    ],
  },
];

export const projects: Project[] = [
  { id: 'p1', title: 'FinTrack - Personal Finance Platform', category: 'Web App', description: 'A budgeting and investment tracking platform serving 40k+ monthly active users with real-time sync.', stack: ['React', 'Node.js', 'MongoDB'], image: '/images/projects/fintrack.svg', github: 'https://github.com', demo: 'https://example.com' },
  { id: 'p2', title: 'MedQueue - Patient Scheduling', category: 'Healthcare', description: 'Appointment and queue management system deployed across a 12-clinic healthcare network.', stack: ['Next.js', 'PostgreSQL', 'AWS'], image: '/images/projects/medqueue.svg', github: 'https://github.com', demo: 'https://example.com' },
  { id: 'p3', title: 'ShelfSense - Retail Inventory AI', category: 'AI & Automation', description: 'Computer-vision-assisted inventory forecasting that cut stockouts by 31% in pilot stores.', stack: ['Python', 'TensorFlow', 'Docker'], image: '/images/projects/shelfsense.svg', github: 'https://github.com', demo: 'https://example.com' },
  { id: 'p4', title: 'RoutePilot - Fleet Logistics', category: 'Mobile App', description: 'Driver-facing route optimization app with offline-first sync for fleets operating in low-connectivity areas.', stack: ['React Native', 'Express', 'Redis'], image: '/images/projects/routepilot.svg', github: 'https://github.com', demo: 'https://example.com' },
  { id: 'p5', title: 'CampusHub - Education Portal', category: 'Education', description: 'A unified student portal consolidating grades, messaging, and course registration for a 20k-student university.', stack: ['React', 'Java', 'MySQL'], image: '/images/projects/campushub.svg', github: 'https://github.com', demo: 'https://example.com' },
  { id: 'p6', title: 'NestList - Real Estate Marketplace', category: 'Web App', description: 'Property listing and virtual tour marketplace with map-based search and saved-search alerts.', stack: ['Next.js', 'MongoDB', 'Cloudinary'], image: '/images/projects/nestlist.svg', github: 'https://github.com', demo: 'https://example.com' },
];

export const projectFilters = ['All', 'Web App', 'Mobile App', 'Healthcare', 'AI & Automation', 'Education'];

export const awards: Award[] = [
  { id: 'a1', title: 'Top Software Development Company', issuer: 'Clutch', year: '2025' },
  { id: 'a2', title: 'Best Digital Transformation Partner', issuer: 'GoodFirms', year: '2025' },
  { id: 'a3', title: 'Rising Star - Enterprise Software', issuer: 'TechReview Awards', year: '2024' },
  { id: 'a4', title: 'Excellence in Cloud Architecture', issuer: 'AWS Partner Network', year: '2024' },
];

export const team: TeamMember[] = [
  { id: 't1', name: 'Ariana Cole', role: 'Chief Executive Officer', initials: 'AC' },
  { id: 't2', name: 'Marcus Webb', role: 'Lead Full-Stack Engineer', initials: 'MW' },
  { id: 't3', name: 'Priya Nathan', role: 'Head of Product Design', initials: 'PN' },
  { id: 't4', name: 'Diego Fuentes', role: 'DevOps & Cloud Architect', initials: 'DF' },
  { id: 't5', name: 'Hana Kobayashi', role: 'AI/ML Engineer', initials: 'HK' },
  { id: 't6', name: 'Owen Baptiste', role: 'Growth & Marketing Lead', initials: 'OB' },
];

export const testimonials: Testimonial[] = [
  { id: 'r1', name: 'Sarah Lindqvist', role: 'VP Engineering', company: 'Northline Health', quote: 'VisionDeck rebuilt our scheduling system in eight weeks. Zero downtime migration, and support has been responsive ever since.', rating: 5 },
  { id: 'r2', name: 'Tom Ackerman', role: 'Founder', company: 'RouteWorks Logistics', quote: "They did not just write code. They pushed back on our spec when it did not make sense, which saved us months.", rating: 5 },
  { id: 'r3', name: 'Jenna Osei', role: 'Director of Product', company: 'CampusHub', quote: "The team's cloud architecture work cut our infra costs by 40% while improving uptime. Genuinely excellent engineers.", rating: 5 },
];

export const pricingPlans: PricingPlan[] = [
  { id: 'starter', name: 'Starter', price: '$2,500', cadence: '/ project', features: ['Single web or mobile app', 'Up to 3 core features', 'Basic QA & deployment', '30 days post-launch support'] },
  { id: 'pro', name: 'Professional', price: '$8,900', cadence: '/ project', featured: true, features: ['Full-stack web + mobile', 'Custom backend & database', 'CI/CD pipeline setup', '90 days post-launch support', 'Dedicated project manager'] },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', cadence: 'quote', features: ['Multi-team engagement', 'Architecture & security review', 'SLA-backed support', 'Ongoing retainer available'] },
];

export const faqs: FaqItem[] = [
  { id: 'f1', question: 'How long does a typical project take?', answer: 'Most web or mobile builds run 6-12 weeks depending on scope. We give you a fixed timeline after a scoping call, not a rough guess.' },
  { id: 'f2', question: 'Do you work with early-stage startups?', answer: 'Yes. About a third of our engagements are pre-seed to Series A teams building their first production product.' },
  { id: 'f3', question: 'What does post-launch support include?', answer: 'Bug fixes, security patches, and monitoring are included in every plan. Feature work after launch is billed separately or covered under a retainer.' },
  { id: 'f4', question: 'Can you take over an existing codebase?', answer: "Yes. We start with a technical audit before quoting so you know what you are getting into before we touch anything." },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Launch Checklist for Production Web Apps',
    slug: 'launch-checklist-production-web-apps',
    excerpt: 'A practical checklist for performance, accessibility, deployment, observability, and rollback planning before launch day.',
    content: 'A launch-ready web app needs more than a finished UI. Before release, verify every critical user journey, empty state, validation message, and failure state on mobile and desktop.\n\nPerformance checks should include image sizes, lazy loading, API latency, and bundle size. Accessibility checks should include keyboard navigation, labels, color contrast, and readable focus states.\n\nFinally, make deployment reversible. A clear rollback process, basic monitoring, and a tested contact path make launch day calmer for the whole team.',
    coverImage: '/images/blog/launch-checklist.svg',
    tags: ['Launch', 'Web App', 'QA'],
    readTime: '5 min read',
    createdAt: '2026-08-02T10:00:00.000Z',
    author: { name: 'VisionDeck Team' },
  },
  {
    id: 'b2',
    title: 'Where AI Automation Actually Pays Off',
    slug: 'where-ai-automation-pays-off',
    excerpt: 'How to find the repetitive workflows where automation creates real savings without creating fragile black boxes.',
    content: 'The best AI automation projects start with a repetitive workflow, clear success criteria, and a human review point. If a team cannot describe the current manual process, automation usually adds confusion.\n\nGood candidates include document triage, customer request routing, internal knowledge lookup, quote generation, and data cleanup. Each workflow should have guardrails for confidence, escalation, and audit history.\n\nStart with one measurable bottleneck. A focused automation that saves twenty minutes a day for ten people is more valuable than a broad assistant nobody trusts.',
    coverImage: '/images/blog/ai-automation.svg',
    tags: ['AI', 'Automation', 'Operations'],
    readTime: '4 min read',
    createdAt: '2026-08-05T10:00:00.000Z',
    author: { name: 'VisionDeck Team' },
  },
  {
    id: 'b3',
    title: 'Cutting Cloud Costs Without Slowing Teams Down',
    slug: 'cutting-cloud-costs-without-slowing-teams',
    excerpt: 'A simple operating rhythm for finding cloud waste, improving reliability, and keeping developers moving.',
    content: 'Cloud cost work is most effective when it is tied to usage visibility. Start by tagging environments, services, and owners so spend has context.\n\nNext, review idle resources, over-provisioned databases, storage lifecycle rules, and logging volume. These areas often reduce spend without touching the product experience.\n\nThe goal is not to make teams afraid of infrastructure. The goal is to create defaults, alerts, and review habits that keep spend predictable while releases keep moving.',
    coverImage: '/images/blog/cloud-costs.svg',
    tags: ['Cloud', 'DevOps', 'Cost'],
    readTime: '6 min read',
    createdAt: '2026-08-08T10:00:00.000Z',
    author: { name: 'VisionDeck Team' },
  },
];
