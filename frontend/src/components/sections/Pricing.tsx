import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { pricingPlans } from '@/data/content';
import { FiCheck } from '@/lib/icons';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Pricing" title="Straightforward pricing, no surprise scope." center />
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col border transition-all ${
                  plan.featured
                    ? 'bg-[color:var(--color-dark)] text-white border-[color:var(--color-dark)] shadow-[var(--shadow-glow)] lg:-translate-y-3'
                    : 'bg-white border-[color:var(--color-border)] shadow-[var(--shadow-card)]'
                }`}
              >
                {plan.featured && (
                  <span className="self-start text-[11px] font-semibold uppercase tracking-wide btn-gradient text-white px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-heading font-semibold text-lg ${plan.featured ? 'text-white' : 'text-[color:var(--color-dark)]'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-3 mb-6">
                  <span className="font-heading font-bold text-4xl">{plan.price}</span>
                  <span className={`text-sm ${plan.featured ? 'text-slate-400' : 'text-[color:var(--color-muted)]'}`}>{plan.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <FiCheck className={`mt-0.5 shrink-0 ${plan.featured ? 'text-[color:var(--color-accent)]' : 'text-[color:var(--color-primary)]'}`} size={15} />
                      <span className={plan.featured ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/checkout?plan=${encodeURIComponent(plan.name)}`}
                  className={`text-center font-semibold text-sm px-5 py-3 rounded-full transition-all ${
                    plan.featured ? 'btn-gradient text-white hover:brightness-110' : 'border border-[color:var(--color-dark)] text-[color:var(--color-dark)] hover:bg-[color:var(--color-dark)] hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
