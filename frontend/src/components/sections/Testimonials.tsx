import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { testimonials as fallbackTestimonials } from '@/data/content';
import { fetchTestimonials } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { FiStar } from '@/lib/icons';
import { key } from '@/lib/utils';
import type { Testimonial } from '@/types';

export default function Testimonials() {
  const { data: testimonials } = useApiData<Testimonial[]>(fetchTestimonials, fallbackTestimonials);
  const [index, setIndex] = useState(0);
  const t = testimonials[Math.min(index, testimonials.length - 1)];

  if (!t) return null;

  return (
    <section className="py-24 bg-[color:var(--color-gray)]">
      <div className="container-x">
        <SectionHeading eyebrow="Client Voices" title="Trusted by teams who ship." center />
        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={key(t)}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex justify-center gap-1 mb-5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} fill="currentColor" size={16} />)}
              </div>
              <p className="font-heading text-xl md:text-2xl text-[color:var(--color-dark)] leading-snug mb-8">
                "{t.quote}"
              </p>
              <div className="font-semibold text-[color:var(--color-dark)]">{t.name}</div>
              <div className="text-sm text-[color:var(--color-muted)]">{t.role}, {t.company}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((item, i) => (
              <button
                key={key(item)} type="button" onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? 'w-8 bg-[color:var(--color-primary)]' : 'w-2 bg-slate-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
