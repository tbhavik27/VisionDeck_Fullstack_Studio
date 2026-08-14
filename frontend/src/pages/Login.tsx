import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>();
  const [serverError, setServerError] = useState<string | null>(null);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/';

  const onSubmit = async (values: LoginValues) => {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(redirectTo, { replace: true });
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
      <PageHeader eyebrow="Account" title="Log in" description="Team members and admins sign in here to manage site content." />
      <section className="py-20">
        <div className="container-x max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-[color:var(--color-border)] shadow-[var(--shadow-card)] p-8 space-y-5">
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
                {...register('password', { required: 'Password is required' })}
                className="w-full border border-[color:var(--color-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {serverError && <p className="text-sm text-red-500 text-center">{serverError}</p>}

            <button
              type="submit" disabled={isSubmitting}
              className="w-full btn-gradient text-white font-semibold px-6 py-3.5 rounded-full disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Log In'}
            </button>

            <p className="text-sm text-center text-[color:var(--color-muted)]">
              Don't have an account? <Link to="/register" className="text-[color:var(--color-primary)] font-medium">Register</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
