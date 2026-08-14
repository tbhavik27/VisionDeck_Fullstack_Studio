import PageHeader from '@/components/ui/PageHeader';
import Industries from '@/components/sections/Industries';
import Testimonials from '@/components/sections/Testimonials';

export default function IndustriesPage() {
  return (
    <>
      <PageHeader eyebrow="Industries" title="Domain depth across eight verticals." description="Compliance, data sensitivity, and user expectations differ by industry — our teams come in already knowing the terrain." />
      <Industries />
      <Testimonials />
    </>
  );
}
