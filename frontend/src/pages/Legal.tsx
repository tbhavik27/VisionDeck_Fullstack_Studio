import PageHeader from '@/components/ui/PageHeader';

export function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="container-x py-20 max-w-3xl text-sm text-slate-600 leading-relaxed space-y-4">
        <p>This is placeholder legal copy for the VisionDeck demo project. Replace with your actual privacy policy before deploying to production.</p>
        <p>We collect only the information necessary to respond to contact form submissions and do not sell user data to third parties.</p>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="container-x py-20 max-w-3xl text-sm text-slate-600 leading-relaxed space-y-4">
        <p>This is placeholder legal copy for the VisionDeck demo project. Replace with your actual terms before deploying to production.</p>
      </section>
    </>
  );
}
