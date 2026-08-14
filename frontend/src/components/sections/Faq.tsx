import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqs as fallbackFaqs } from '@/data/content';
import { fetchFaqs } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { FiChevronDown } from '@/lib/icons';
import { key } from '@/lib/utils';
import type { FaqItem } from '@/types';

export default function Faq() {
  const { data: faqs } = useApiData<FaqItem[]>(fetchFaqs, fallbackFaqs);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (faqs.length && open === null) setOpen(key(faqs[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqs]);

  return (
    <section id="faq" className="py-24 bg-[color:var(--color-gray)]">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions we get before kickoff." center />
        <div className="space-y-3">
          {faqs.map(f => {
            const k = key(f);
            const isOpen = open === k;
            return (
              <div key={k} className="bg-white rounded-2xl border border-[color:var(--color-border)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : k)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-heading font-semibold text-[color:var(--color-dark)]">{f.question}</span>
                  <FiChevronDown className={`shrink-0 text-[color:var(--color-primary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[color:var(--color-muted)] leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
