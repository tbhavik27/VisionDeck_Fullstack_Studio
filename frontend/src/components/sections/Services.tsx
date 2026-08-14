import { Link } from 'react-router-dom';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { services as fallbackServices } from '@/data/content';
import { fetchServices } from '@/lib/api';
import { useApiData } from '@/hooks/useApiData';
import { serviceIcons, FiArrowRight } from '@/lib/icons';
import { key, slugify } from '@/lib/utils';
import type { Service } from '@/types';

export default function Services() {
  const { data: services } = useApiData<Service[]>(fetchServices, fallbackServices);

  return (
    <section id="services" className="py-24 bg-[color:var(--color-gray)]">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title="Services built around shipping, not slides."
          description="Every engagement pairs a dedicated engineering lead with the specialists your project actually needs."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon] ?? serviceIcons.code;
            return (
              <Reveal key={key(s)} delay={i * 0.06}>
                <div className="group bg-white rounded-2xl p-7 border border-[color:var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[color:var(--color-dark)] mb-2">{s.title}</h3>
                  <p className="text-sm text-[color:var(--color-muted)] leading-relaxed flex-1">{s.summary}</p>
                  <Link
                    to={`/services/${slugify(s.title)}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-primary)] mt-5 hover:gap-2.5 transition-all"
                  >
                    Learn more <FiArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
