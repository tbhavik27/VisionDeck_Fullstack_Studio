import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { awards as fallbackAwards } from '@/data/content';
import { fetchAwards } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { key } from '@/lib/utils';
import type { Award } from '@/types';

export default function Awards() {
  const { data: awards } = useApiData<Award[]>(fetchAwards, fallbackAwards);

  return (
    <section className="py-24 bg-[color:var(--color-gray)]">
      <div className="container-x">
        <SectionHeading eyebrow="Recognition" title="Awards & certifications." center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((a, i) => (
            <Reveal key={key(a)} delay={i * 0.06}>
              <div className="bg-white rounded-2xl p-7 text-center border border-[color:var(--color-border)] shadow-[var(--shadow-card)] h-full flex flex-col items-center">
                <div className="w-14 h-14 rounded-full btn-gradient flex items-center justify-center text-white font-heading font-bold mb-4">
                  {a.year.slice(-2)}
                </div>
                <h4 className="font-heading font-semibold text-sm text-[color:var(--color-dark)] leading-snug mb-1.5">{a.title}</h4>
                <span className="text-xs text-[color:var(--color-muted)]">{a.issuer} · {a.year}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
