import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[color:var(--color-dark)]">
      <span className="font-heading font-extrabold text-[color:var(--color-primary)] text-7xl mb-4">404</span>
      <h1 className="font-heading font-bold text-white text-2xl mb-3">Page not found</h1>
      <p className="text-slate-400 mb-8 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-gradient text-white font-semibold px-6 py-3 rounded-full">Back to Home</Link>
    </section>
  );
}
