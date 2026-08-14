import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { team } from '@/data/content';
import { FiLinkedin, FiTwitter } from '@/lib/icons';

export default function Team() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Our Team" title="The people behind the code." center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <div className="group bg-white rounded-2xl p-7 border border-[color:var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-secondary)] flex items-center justify-center text-white font-heading font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
                  {m.initials}
                </div>
                <h4 className="font-heading font-semibold text-[color:var(--color-dark)]">{m.name}</h4>
                <p className="text-sm text-[color:var(--color-muted)] mt-1 mb-4">{m.role}</p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-slate-400 hover:text-[color:var(--color-primary)]"><FiLinkedin size={16} /></a>
                  <a href="#" className="text-slate-400 hover:text-[color:var(--color-primary)]"><FiTwitter size={16} /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
