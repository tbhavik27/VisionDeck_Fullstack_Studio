import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { FiCheck } from '@/lib/icons';
import aboutIllustration from '@/assets/about-illustration.svg';

const points = [
  'Senior engineers only — no bait-and-switch juniors after the sales call',
  'Fixed-scope proposals with real timelines, not open-ended retainers',
  'You own 100% of the code and infrastructure, always',
];

export default function About() {
  return (
    <section className="py-24">
      <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-[var(--shadow-card-hover)] overflow-hidden">
              <img
                src={aboutIllustration}
                alt="VisionDeck team dashboard illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-[var(--shadow-card-hover)] p-6 w-48 border border-[color:var(--color-border)]">
              <div className="font-heading font-bold text-3xl text-[color:var(--color-primary)]">9 yrs</div>
              <div className="text-xs text-[color:var(--color-muted)] mt-1">Building production software</div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="About VisionDeck"
            title={<>We build software the way we'd want to buy it.</>}
            description="Founded in 2017, VisionDeck grew from a three-person freelance team into a 38-person studio without losing the thing that made clients stay: senior engineers who actually own outcomes, not just tickets."
          />
          <ul className="space-y-4">
            {points.map(p => (
              <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-[color:var(--color-primary)] flex items-center justify-center shrink-0">
                  <FiCheck size={12} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
