import { Link } from 'react-router-dom';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { industries as fallbackIndustries } from '@/data/content';
import { fetchIndustries } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { industryIcons } from '@/lib/icons';
import { key } from '@/lib/utils';
import type { Industry } from '@/types';

export default function Industries() {
  const { data: industries } = useApiData<Industry[]>(fetchIndustries, fallbackIndustries);

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Industries" title="Domain experience that shortens the learning curve." center />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {industries.map((ind, i) => {
            const Icon = industryIcons[ind.icon] ?? industryIcons.health;
            return (
              <Reveal key={key(ind)} delay={i * 0.05}>
                <Link
                  to={`/contact?interest=${encodeURIComponent(ind.title)}`}
                  className="group flex flex-col items-center text-center gap-3 p-7 rounded-2xl border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:bg-blue-50/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-gray)] group-hover:bg-white flex items-center justify-center text-[color:var(--color-primary)]">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium text-[color:var(--color-dark)]">{ind.title}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
