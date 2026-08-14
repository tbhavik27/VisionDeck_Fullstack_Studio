import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects as fallbackProjects, projectFilters } from '@/data/content';
import { fetchProjects } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { FiGithub, FiExternalLink } from '@/lib/icons';
import { key, slugify } from '@/lib/utils';
import type { Project } from '@/types';

function projectSignature(title: string) {
  return slugify(title).split('-')[0];
}

function withFallbackProjectAssets(project: Project): Project {
  const fallback = fallbackProjects.find(item =>
    item.id === project.id || projectSignature(item.title) === projectSignature(project.title)
  );

  return {
    ...project,
    image: project.image ?? fallback?.image,
    github: project.github ?? fallback?.github,
    demo: project.demo ?? fallback?.demo,
    stack: project.stack?.length ? project.stack : fallback?.stack ?? [],
  };
}

export default function Portfolio() {
  const { data: allProjects } = useApiData<Project[]>(() => fetchProjects(), fallbackProjects);
  const hydratedProjects = useMemo(() => allProjects.map(withFallbackProjectAssets), [allProjects]);
  const [filter, setFilter] = useState('All');
  const visible = useMemo(
    () => (filter === 'All' ? hydratedProjects : hydratedProjects.filter(p => p.category === filter)),
    [hydratedProjects, filter]
  );

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products we've taken from spec to production."
          description="A sample of recent engagements across web, mobile, and applied AI."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {projectFilters.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-[color:var(--color-dark)] text-white border-[color:var(--color-dark)]'
                  : 'text-slate-600 border-[color:var(--color-border)] hover:border-[color:var(--color-dark)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map(p => (
              <motion.div
                layout key={key(p)}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-2xl border border-[color:var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-[color:var(--color-secondary)] to-[color:var(--color-primary)]">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 bg-grid opacity-30" />
                  )}
                  <span className="absolute top-4 left-4 text-xs font-semibold bg-white/15 text-white px-2.5 py-1 rounded-full backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-[color:var(--color-dark)] mb-2">{p.title}</h3>
                  <p className="text-sm text-[color:var(--color-muted)] leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.map(s => (
                      <span key={s} className="text-[11px] font-medium bg-blue-50 text-[color:var(--color-primary)] px-2 py-1 rounded-md">{s}</span>
                    ))}
                  </div>
                  {(p.github || p.demo) && (
                    <div className="flex items-center gap-4 pt-4 border-t border-[color:var(--color-border)] text-sm font-medium">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-[color:var(--color-dark)]">
                          <FiGithub size={14} /> Code
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)]">
                          <FiExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="text-center text-sm text-[color:var(--color-muted)] py-12">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
