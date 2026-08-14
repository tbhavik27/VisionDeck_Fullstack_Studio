import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// --- Auth ---
export interface AuthUser { id: string; name: string; email: string; role: 'admin' | 'editor' }
export interface AuthResponse { token: string; user: AuthUser }

export async function loginUser(payload: { email: string; password: string }): Promise<AuthResponse> {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function registerUser(payload: { name: string; email: string; password: string }): Promise<AuthResponse> {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function fetchMe(token: string): Promise<{ user: AuthUser }> {
  const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  return data;
}

// --- Contact ---
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function submitContactMessage(payload: ContactPayload) {
  const { data } = await api.post('/messages', payload);
  return data;
}

// --- Content collections ---
// Each of these hits a live backend route. All are used with the useApiData hook,
// which falls back to the static demo content in src/data/content.ts if the
// backend isn't running, so the site never breaks just because the API is down.

export async function fetchServices() {
  const { data } = await api.get('/services');
  return data;
}

export async function fetchIndustries() {
  const { data } = await api.get('/industries');
  return data;
}

export async function fetchTechnologies() {
  const { data } = await api.get('/technologies');
  return data;
}

export async function fetchProjects(params?: { category?: string; search?: string }) {
  const { data } = await api.get('/projects', { params });
  return data.items ?? data; // route returns { items, total, page, pages }
}

export async function fetchTestimonials() {
  const { data } = await api.get('/testimonials');
  return data;
}

export async function fetchAwards() {
  const { data } = await api.get('/awards');
  return data;
}

export async function fetchFaqs() {
  const { data } = await api.get('/faqs');
  return data;
}

export async function fetchBlogs() {
  const { data } = await api.get('/blogs');
  return data;
}

export async function fetchBlogBySlug(slug: string) {
  const { data } = await api.get(`/blogs/${slug}`);
  return data;
}
