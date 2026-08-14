import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow, title, description, center = false,
}: { eyebrow: string; title: React.ReactNode; description?: string; center?: boolean }) {
  return (
    <Reveal className={`max-w-2xl mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-primary)] bg-blue-50 px-3 py-1.5 rounded-full">
        {eyebrow}
      </span>
      <h2 className="font-heading font-bold text-[clamp(28px,3.4vw,40px)] text-[color:var(--color-dark)] mt-4 leading-tight">
        {title}
      </h2>
      {description && <p className="text-[color:var(--color-muted)] mt-4 leading-relaxed">{description}</p>}
    </Reveal>
  );
}
