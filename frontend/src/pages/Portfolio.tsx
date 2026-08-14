import PageHeader from '@/components/ui/PageHeader';
import Portfolio from '@/components/sections/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Selected work, shipped to production." description="A sample of platforms we've designed, built, and continue to support." />
      <Portfolio />
    </>
  );
}
