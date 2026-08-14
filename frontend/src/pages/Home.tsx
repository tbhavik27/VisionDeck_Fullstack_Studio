import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Industries from '@/components/sections/Industries';
import Technologies from '@/components/sections/Technologies';
import Portfolio from '@/components/sections/Portfolio';
import Awards from '@/components/sections/Awards';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Industries />
      <Technologies />
      <Portfolio />
      <Awards />
      <Team />
      <Testimonials />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
