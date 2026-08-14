import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);
    try {
      await doRegister(values.name, values.email, values.password);
      navigate('/', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Couldn't reach the server. Is the backend running?");
      }
    }
  };

  return (
    <>
      <PageHeader eyebrow="Account" title="Create an account" description="New team accounts are created as editors — an admin can upgrade access later." />
      <section className="py-20">
        <div className="container-x max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-[color:var(--color-border)] shadow-[var(--shadow-card)] p-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                placeholder="Ada Lovelace"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                placeholder="you@company.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'At least 8 characters' } })}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                placeholder="At least 8 characters"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {serverError && <p className="text-sm text-red-500 text-center">{serverError}</p>}

            <button
              type="submit" disabled={isSubmitting}
              className="w-full btn-gradient text-white font-semibold px-6 py-3.5 rounded-full disabled:opacity-60"
            >
              {isSubmitting ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="text-sm text-center text-[color:var(--color-muted)]">
              Already have an account? <Link to="/login" className="text-[color:var(--color-primary)] font-medium">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
