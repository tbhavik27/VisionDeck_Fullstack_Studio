import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/ui/PageHeader';
import { pricingPlans } from '@/data/content';
import { FiCheck, FiCreditCard, FiShield, FiSend } from '@/lib/icons';

interface CheckoutFormValues {
  name: string;
  email: string;
  company?: string;
  paymentMethod: 'card' | 'bank' | 'call';
}

const paymentMethods = [
  { id: 'card', title: 'Card payment', description: 'Request a secure Stripe/Razorpay payment link.' },
  { id: 'bank', title: 'Bank transfer', description: 'Receive an invoice and bank transfer details.' },
  { id: 'call', title: 'Schedule first', description: 'Confirm scope on a call before any payment.' },
] as const;

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get('plan') ?? 'Professional';
  const plan = useMemo(
    () => pricingPlans.find(item => item.name.toLowerCase() === planName.toLowerCase()) ?? pricingPlans[1],
    [planName]
  );
  const [complete, setComplete] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<CheckoutFormValues>({
    defaultValues: { paymentMethod: 'card' },
  });
  const selectedMethod = watch('paymentMethod');

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setComplete(true);
  };

  return (
    <>
      <PageHeader eyebrow="Payment" title={`Start the ${plan.name} plan.`} description="Choose how you want to begin. This demo flow is ready for a real payment gateway when your merchant keys are added." />
      <section className="py-24 bg-[color:var(--color-gray)]">
        <div className="container-x grid lg:grid-cols-[.85fr_1.15fr] gap-8 items-start">
          <aside className="bg-white border border-[color:var(--color-border)] rounded-2xl p-7 shadow-[var(--shadow-card)]">
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-primary)]">Selected Plan</span>
            <h2 className="font-heading font-bold text-3xl mt-3 text-[color:var(--color-dark)]">{plan.name}</h2>
            <div className="flex items-baseline gap-1 mt-3 mb-6">
              <span className="font-heading font-bold text-4xl">{plan.price}</span>
              <span className="text-sm text-[color:var(--color-muted)]">{plan.cadence}</span>
            </div>
            <ul className="space-y-3">
              {plan.features.map(feature => (
                <li key={feature} className="flex gap-2.5 text-sm text-slate-600">
                  <FiCheck size={15} className="mt-0.5 shrink-0 text-[color:var(--color-primary)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="inline-block text-sm font-semibold text-[color:var(--color-primary)] mt-7">
              Change plan
            </Link>
          </aside>

          <div className="bg-white border border-[color:var(--color-border)] rounded-2xl p-7 md:p-8 shadow-[var(--shadow-card)]">
            {complete ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                  <FiCheck size={26} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-[color:var(--color-dark)] mb-3">Request received</h2>
                <p className="text-sm text-[color:var(--color-muted)] max-w-md mx-auto leading-relaxed">
                  Your selected method is saved for this request. Add Stripe, Razorpay, or PayPal keys before launch to collect real payments automatically.
                </p>
                <Link to="/contact" className="inline-flex items-center justify-center btn-gradient text-white font-semibold px-6 py-3 rounded-full mt-8">
                  Continue to contact
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-50 text-[color:var(--color-primary)] flex items-center justify-center shrink-0">
                    <FiShield size={18} />
                  </span>
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-[color:var(--color-dark)]">Payment method</h2>
                    <p className="text-sm text-[color:var(--color-muted)] mt-1">This working demo captures the chosen start method and can be connected to a live gateway.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                        selectedMethod === method.id ? 'border-[color:var(--color-primary)] bg-blue-50' : 'border-[color:var(--color-border)] hover:border-[color:var(--color-primary)]'
                      }`}
                    >
                      <input type="radio" value={method.id} className="sr-only" {...register('paymentMethod', { required: true })} />
                      <FiCreditCard className="text-[color:var(--color-primary)] mb-3" size={20} />
                      <span className="font-heading font-semibold text-sm block text-[color:var(--color-dark)]">{method.title}</span>
                      <span className="text-xs text-[color:var(--color-muted)] leading-relaxed block mt-1">{method.description}</span>
                    </label>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Name</label>
                    <input {...register('name', { required: 'Your name is required' })} className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]" placeholder="Ada Lovelace" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                    <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]" placeholder="you@company.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company (optional)</label>
                  <input {...register('company')} className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]" placeholder="Acme Inc." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 btn-gradient text-white font-semibold px-6 py-3.5 rounded-full disabled:opacity-60">
                  {isSubmitting ? 'Processing...' : <>Submit payment request <FiSend size={15} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
