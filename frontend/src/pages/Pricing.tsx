import PageHeader from '@/components/ui/PageHeader';
import Pricing from '@/components/sections/Pricing';
import Faq from '@/components/sections/Faq';

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Fixed-scope pricing, no surprise invoices." description="Every proposal comes with a locked scope and timeline before you sign anything." />
      <Pricing />
      <Faq />
    </>
  );
}
