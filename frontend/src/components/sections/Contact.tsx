import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { FiMail, FiPhone, FiMapPin, FiSend } from '@/lib/icons';
import { submitContactMessage } from '@/lib/api';

interface ContactFormValues {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormValues>();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Prefill the message when arriving via a Service, Industry, or Pricing plan link.
  useEffect(() => {
    const service = searchParams.get('service');
    const interest = searchParams.get('interest');
    const plan = searchParams.get('plan');
    if (service) setValue('message', `I'd like to talk about your ${service} service. `);
    else if (interest) setValue('message', `I'm interested in working with you on a project in the ${interest} industry. `);
    else if (plan) setValue('message', `I'd like to get started on the ${plan} plan. `);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle');
    try {
      await submitContactMessage(values);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container-x grid lg:grid-cols-[.85fr_1.15fr] gap-14">
        <div>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Tell us what you're building."
            description="Fill out the form and a lead engineer — not a salesperson — will follow up within one business day."
          />
          <div className="space-y-5">
            {[
              { icon: FiMail, label: 'hello@visiondeck.dev' },
              { icon: FiPhone, label: '+1 (555) 210-4488' },
              { icon: FiMapPin, label: 'Austin, TX — remote-first team' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="w-10 h-10 rounded-full bg-blue-50 text-[color:var(--color-primary)] flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-[color:var(--color-border)] shadow-[var(--shadow-card)] p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Name</label>
                <input
                  {...register('name', { required: 'Your name is required' })}
                  className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                  placeholder="Ada Lovelace"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
                  className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company (optional)</label>
              <input
                {...register('company')}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Project details</label>
              <textarea
                {...register('message', { required: 'Tell us a bit about the project' })}
                rows={5}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)] resize-none"
                placeholder="What are you trying to build?"
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 btn-gradient text-white font-semibold px-6 py-3.5 rounded-full disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : <>Send Message <FiSend size={15} /></>}
            </button>

            {status === 'success' && <p className="text-sm text-emerald-600 text-center">Message sent — we'll be in touch shortly.</p>}
            {status === 'error' && <p className="text-sm text-red-500 text-center">Couldn't reach the server. Is the API running?</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
