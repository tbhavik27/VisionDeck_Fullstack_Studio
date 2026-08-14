import { Link, useParams } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { serviceDetails } from '@/data/content';
import { serviceIcons, FiArrowRight, FiCheck } from '@/lib/icons';
import { slugify } from '@/lib/utils';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceDetails.find(item => slugify(item.title) === slug);

  if (!service) {
    return (
      <>
        <PageHeader eyebrow="Service" title="Service not found." description="That service page may have moved." />
        <section className="py-20">
          <div className="container-x text-center">
            <Link to="/services" className="btn-gradient text-white font-semibold px-6 py-3 rounded-full">
              View all services
            </Link>
          </div>
        </section>
      </>
    );
  }

  const Icon = serviceIcons[service.icon] ?? serviceIcons.code;

  return (
    <>
      <PageHeader eyebrow="Service" title={service.title} description={service.description} />
      <section className="py-24 bg-[color:var(--color-gray)]">
        <div className="container-x grid lg:grid-cols-[.85fr_1.15fr] gap-10 items-start">
          <Reveal>
            <div className="bg-white border border-[color:var(--color-border)] rounded-2xl p-8 shadow-[var(--shadow-card)]">
              <div className="w-14 h-14 rounded-xl btn-gradient flex items-center justify-center text-white mb-5">
                <Icon size={24} />
              </div>
              <h2 className="font-heading font-bold text-2xl text-[color:var(--color-dark)] mb-4">
                How we help
              </h2>
              <p className="text-sm text-[color:var(--color-muted)] leading-relaxed mb-8">
                {service.summary}
              </p>
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="group inline-flex items-center gap-2 btn-gradient text-white font-semibold px-6 py-3 rounded-full"
              >
                Request this service <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Focus Areas', items: service.highlights },
              { title: 'Deliverables', items: service.deliverables },
              { title: 'Outcomes', items: service.outcomes },
            ].map((group, index) => (
              <Reveal key={group.title} delay={index * 0.08}>
                <div className="bg-white border border-[color:var(--color-border)] rounded-2xl p-6 shadow-[var(--shadow-card)] h-full">
                  <h3 className="font-heading font-semibold text-[color:var(--color-dark)] mb-4">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map(item => (
                      <li key={item} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                        <FiCheck size={15} className="mt-0.5 shrink-0 text-[color:var(--color-primary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
