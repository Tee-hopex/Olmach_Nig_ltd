import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { Eye, EyeOff, Loader } from 'lucide-react';
import logoFull from '../../assets/logo-full.png';
import { adminApi } from '../../lib/api';
import { useAdminStore } from '../../store/adminStore';
import toast from 'react-hot-toast';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: standardSchemaResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const res = await adminApi.post('/auth/login', data);
      login(res.data.token, res.data.admin);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Invalid credentials';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-navy-800 rounded-2xl shadow-2xl border border-white/5 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src={logoFull} alt="Olmach Nig Ltd" className="h-20 w-auto brightness-0 invert mb-3" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Sewing Hub · Management</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                autoComplete="username"
                autoFocus
                className={`w-full px-4 py-3 bg-navy-900 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-gold-500 focus:ring-gold-500/20'
                }`}
                placeholder="admin"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-11 bg-navy-900 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-gold-500 focus:ring-gold-500/20'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-gold-600/25 mt-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Protected admin area · Olmach Nig Ltd
        </p>
      </div>
    </div>
  );
}
