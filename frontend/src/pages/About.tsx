import PageHeader from '@/components/ui/PageHeader';
import About from '@/components/sections/About';
import Team from '@/components/sections/Team';
import Awards from '@/components/sections/Awards';

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="Nine years of shipping software that lasts." description="We're a remote-first studio of senior engineers, designers, and strategists building production software for teams who can't afford to get it wrong." />
      <About />
      <Team />
      <Awards />
    </>
  );
}
