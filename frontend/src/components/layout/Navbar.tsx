import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiUser, FiLogOut } from '@/lib/icons';
import { services } from '@/data/content';
import { useAuth } from '@/context/AuthContext';
import { slugify } from '@/lib/utils';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Industries', to: '/industries' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,23,42,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-extrabold text-xl">
          <span className="w-9 h-9 rounded-lg btn-gradient flex items-center justify-center text-white text-sm">VD</span>
          <span className={scrolled ? 'text-[color:var(--color-dark)]' : 'text-white'}>VisionDeck</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium ${scrolled ? 'text-slate-700' : 'text-white/90'} hover:text-[color:var(--color-primary)] transition-colors`}>
              Services <FiChevronDown className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white rounded-2xl shadow-[var(--shadow-card-hover)] border border-[color:var(--color-border)] p-6 grid grid-cols-2 gap-2"
                >
                  {services.map(s => (
                    <Link
                      key={s.id} to={`/services/${slugify(s.title)}`}
                      className="flex flex-col gap-1 p-3 rounded-xl hover:bg-[color:var(--color-gray)] transition-colors"
                      onClick={() => setMegaOpen(false)}
                    >
                      <span className="font-heading font-semibold text-sm text-[color:var(--color-dark)]">{s.title}</span>
                      <span className="text-xs text-[color:var(--color-muted)] leading-relaxed">{s.summary}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[color:var(--color-primary)] ${
                  isActive ? 'text-[color:var(--color-primary)]' : scrolled ? 'text-slate-700' : 'text-white/90'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1.5 text-sm font-medium ${scrolled ? 'text-slate-700' : 'text-white/90'}`}>
                <FiUser size={15} /> {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-1.5 text-sm font-medium hover:text-[color:var(--color-primary)] transition-colors ${scrolled ? 'text-slate-700' : 'text-white/90'}`}
              >
                <FiLogOut size={15} /> Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-medium hover:text-[color:var(--color-primary)] transition-colors ${scrolled ? 'text-slate-700' : 'text-white/90'}`}
            >
              Log in
            </Link>
          )}
          <Link to="/contact" className="group flex items-center gap-2 btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[var(--shadow-glow)] hover:brightness-110 transition-all">
            Get a Quote <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-800' : 'text-white'}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-[color:var(--color-border)] overflow-hidden"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              <Link to="/services" className="py-3 text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>Services</Link>
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="py-3 text-sm font-medium text-slate-700 border-t border-[color:var(--color-border)]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="py-3 text-sm font-medium text-slate-700 border-t border-[color:var(--color-border)] text-left flex items-center gap-1.5"
                >
                  <FiLogOut size={14} /> Log out ({user.name.split(' ')[0]})
                </button>
              ) : (
                <Link to="/login" className="py-3 text-sm font-medium text-slate-700 border-t border-[color:var(--color-border)]" onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
              )}
              <Link to="/contact" className="mt-2 btn-gradient text-white text-sm font-semibold px-5 py-3 rounded-full text-center" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
