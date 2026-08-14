import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories as fallbackCategories, groupTechnologies } from '@/data/content';
import { fetchTechnologies } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import type { TechnologyItem } from '@/types';

export default function Technologies() {
  const { data: flatTechnologies } = useApiData<TechnologyItem[]>(fetchTechnologies, []);
  const categories = useMemo(
    () => (flatTechnologies.length ? groupTechnologies(flatTechnologies) : fallbackCategories),
    [flatTechnologies]
  );

  const [active, setActive] = useState(categories[0]?.id);
  const current = categories.find(c => c.id === active) ?? categories[0];

  useEffect(() => {
    if (!categories.some(cat => cat.id === active)) {
      setActive(categories[0]?.id);
    }
  }, [active, categories]);

  if (!current) return null;

  return (
    <section className="py-24 bg-[color:var(--color-dark)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="container-x relative">
        <div className="mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] bg-white/5 px-3 py-1.5 rounded-full">
            Our Stack
          </span>
          <h2 className="font-heading font-bold text-[clamp(28px,3.4vw,40px)] text-white mt-4">
            Mastering every layer of the stack.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                active === cat.id ? 'btn-gradient text-white' : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {current.items.map(item => (
              <div key={item.name} className="glass rounded-xl p-6 flex items-center justify-center text-center">
                <span className="font-heading font-semibold text-white text-sm">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
