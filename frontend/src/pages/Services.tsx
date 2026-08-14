import PageHeader from '@/components/ui/PageHeader';
import Services from '@/components/sections/Services';
import Technologies from '@/components/sections/Technologies';
import Faq from '@/components/sections/Faq';

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Every discipline a production launch needs." description="From first sketch to on-call rotation — we don't hand off, we ship alongside you." />
      <Services />
      <Technologies />
      <Faq />
    </>
  );
}
