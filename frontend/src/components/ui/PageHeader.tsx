import Reveal from './Reveal';

export default function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="relative bg-[color:var(--color-dark)] pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-[color:var(--color-primary)]/25 blur-[110px] pointer-events-none" />
      <div className="container-x relative">
        <Reveal>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] glass rounded-full px-4 py-2">
            {eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-white text-[clamp(32px,4.2vw,48px)] mt-5">{title}</h1>
          {description && <p className="text-slate-400 mt-4 max-w-xl leading-relaxed">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
