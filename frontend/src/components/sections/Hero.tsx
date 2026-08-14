import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from '@/lib/icons';

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

const stats = [
  { label: 'Projects Delivered', value: 240, suffix: '+' },
  { label: 'Client Retention', value: 96, suffix: '%' },
  { label: 'Engineers on Team', value: 38, suffix: '' },
];

function StatCounter({ value, suffix, label, inView, delay }: { value: number; suffix: string; label: string; inView: boolean; delay: number }) {
  const val = useCountUp(value, inView, 1200 + delay);
  return (
    <div>
      <div className="font-heading font-bold text-3xl text-white">{val}{suffix}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-[color:var(--color-dark)] overflow-hidden pt-40 pb-28">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full bg-[color:var(--color-primary)]/25 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[480px] h-[480px] rounded-full bg-[color:var(--color-secondary)]/30 blur-[120px] pointer-events-none" />

      <div className="container-x relative grid lg:grid-cols-[1.05fr_.95fr] gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[color:var(--color-accent)] glass rounded-full px-4 py-2"
          >
            Full-Stack Software Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-white leading-[1.06] text-[clamp(38px,5vw,60px)] mt-6"
          >
            Technology That Works.<br />
            <span className="text-gradient">Growth That Lasts.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg mt-6 max-w-lg leading-relaxed"
          >
            We design, build, and ship production software — web, mobile, and AI-powered — for startups and enterprise teams who need it done right the first time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link to="/contact" className="group flex items-center gap-2 btn-gradient text-white font-semibold px-7 py-3.5 rounded-full shadow-[var(--shadow-glow)] hover:brightness-110 transition-all">
              Start Your Project <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/portfolio" className="flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors">
              View Our Work
            </Link>
          </motion.div>

          <div ref={ref} className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 max-w-md">
            {stats.map((s, i) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} inView={inView} delay={i * 200} />
            ))}
          </div>
        </div>

        <div className="relative h-[420px] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute top-6 left-0 w-64 glass rounded-2xl p-5 shadow-[var(--shadow-glow)]"
          >
            <div className="text-xs text-slate-400 mb-2">Deployment Status</div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Production — Healthy
            </div>
            <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[92%] btn-gradient rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="absolute top-40 right-4 w-60 glass rounded-2xl p-5 shadow-[var(--shadow-glow)]"
          >
            <div className="text-xs text-slate-400 mb-3">Sprint Velocity</div>
            <div className="flex items-end gap-2 h-16">
              {[40, 65, 50, 85, 70, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t btn-gradient" style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute bottom-2 left-10 w-56 glass rounded-2xl p-5 shadow-[var(--shadow-glow)]"
          >
            <div className="text-xs text-slate-400 mb-2">Client Satisfaction</div>
            <div className="font-heading font-bold text-2xl text-white">4.9<span className="text-sm text-slate-400">/5.0</span></div>
            <div className="text-xs text-slate-500 mt-1">from 180+ reviews</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
