// Every model has both `id` (used by the static demo data in src/data/content.ts)
// and an optional `_id` (what MongoDB actually returns from the live API).
// Use the `key()` helper from src/lib/utils.ts to read whichever is present.

export interface Service {
  id: string;
  _id?: string;
  title: string;
  summary: string;
  icon: string;
}

export interface ServiceDetail extends Service {
  description: string;
  highlights: string[];
  deliverables: string[];
  outcomes: string[];
}

export interface Industry {
  id: string;
  _id?: string;
  title: string;
  icon: string;
}

export interface TechCategory {
  id: string;
  label: string;
  items: { name: string; icon: string }[];
}

export interface TechnologyItem {
  _id?: string;
  category: string;
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  _id?: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image?: string;
  github?: string;
  demo?: string;
}

export interface Award {
  id: string;
  _id?: string;
  title: string;
  issuer: string;
  year: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface Testimonial {
  id: string;
  _id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  featured?: boolean;
  features: string[];
}

export interface FaqItem {
  id: string;
  _id?: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime?: string;
  createdAt?: string;
  author?: string | { name: string };
}
