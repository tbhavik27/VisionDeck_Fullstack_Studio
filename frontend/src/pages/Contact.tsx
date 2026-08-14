import PageHeader from '@/components/ui/PageHeader';
import Contact from '@/components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk about your project." description="Most calls happen within 24 hours of your message landing in our inbox." />
      <Contact />
    </>
  );
}
