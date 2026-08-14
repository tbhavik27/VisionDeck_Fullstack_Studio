import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from '@/lib/icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production this posts to POST /api/newsletter
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[color:var(--color-dark)] text-slate-300 pt-20 pb-8">
      <div className="container-x">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-14 border-b border-white/10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-heading font-extrabold text-xl text-white mb-4">
              <span className="w-9 h-9 rounded-lg btn-gradient flex items-center justify-center text-white text-sm">VD</span>
              VisionDeck
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              A full-stack software studio building web, mobile, and AI products for teams who need to ship and scale.
            </p>
            <div className="flex gap-3 mt-6">
              {[FiLinkedin, FiTwitter, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Company</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Resources</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Stay Updated</h5>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[color:var(--color-accent)] placeholder:text-slate-500"
              />
              <button type="submit" className="btn-gradient rounded-lg px-3.5 flex items-center justify-center shrink-0">
                <FiSend size={15} className="text-white" />
              </button>
            </form>
            {subscribed && <p className="text-xs text-emerald-400 mb-3">Subscribed — thanks!</p>}
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2"><FiMail size={14} /> hello@visiondeck.dev</li>
              <li className="flex items-center gap-2"><FiPhone size={14} /> +1 (555) 210-4488</li>
              <li className="flex items-center gap-2"><FiMapPin size={14} /> Austin, TX</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} VisionDeck. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
