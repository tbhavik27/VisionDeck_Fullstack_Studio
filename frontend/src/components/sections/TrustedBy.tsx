const logos = ['Northline', 'RouteWorks', 'CampusHub', 'NestList', 'ShelfSense', 'MedQueue', 'FinTrack', 'Berkshire Partners'];

export default function TrustedBy() {
  const loop = [...logos, ...logos];
  return (
    <section className="bg-[color:var(--color-gray)] py-10 border-y border-[color:var(--color-border)] overflow-hidden">
      <div className="container-x mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[color:var(--color-muted)]">
          Trusted by teams building the future
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-16 animate-[marquee_28s_linear_infinite] w-max">
          {loop.map((name, i) => (
            <span key={i} className="font-heading font-bold text-xl text-slate-400 whitespace-nowrap select-none">
              {name}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
