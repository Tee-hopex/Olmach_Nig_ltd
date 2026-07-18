import { useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { Save, Loader, Settings, Lock, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminSettings } from '../../hooks/admin/useAdminDashboard';
import { adminApi } from '../../lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { useAdminStore } from '../../store/adminStore';
import toast from 'react-hot-toast';

const schema = z.object({
  bankName: z.string().optional(),
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  deliveryFee: z.coerce.number().min(0).optional(),
  freeDeliveryThreshold: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

const credSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newUsername: z.string().min(3, 'Username must be at least 3 characters').optional().or(z.literal('')),
  newPassword: z.string().min(8, 'New password must be at least 8 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine(d => !d.newPassword || d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type CredFormData = z.infer<typeof credSchema>;

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useAdminSettings();
  const qc = useQueryClient();
  const { admin, login: storeLogin } = useAdminStore();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: standardSchemaResolver(schema) as unknown as Resolver<FormData>,
  });

  const {
    register: regCred,
    handleSubmit: handleCredSubmit,
    reset: resetCred,
    formState: { isSubmitting: credSubmitting, errors: credErrors },
  } = useForm<CredFormData>({
    resolver: standardSchemaResolver(credSchema) as unknown as Resolver<CredFormData>,
  });

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  async function onSubmit(data: FormData) {
    try {
      await adminApi.patch('/admin/settings', data);
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    }
  }

  async function onCredSubmit(data: CredFormData) {
    try {
      const payload: Record<string, string> = { currentPassword: data.currentPassword };
      if (data.newUsername) payload.newUsername = data.newUsername;
      if (data.newPassword) payload.newPassword = data.newPassword;
      const res = await adminApi.patch('/auth/credentials', payload);
      if (res.data.username && admin) {
        storeLogin(useAdminStore.getState().token!, { ...admin, username: res.data.username });
      }
      toast.success('Login credentials updated');
      resetCred();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      toast.error(msg ?? 'Failed to update credentials');
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings" subtitle="Manage business and store settings">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        {/* Bank details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gold-600" />
            Bank Transfer Details
          </h3>
          <p className="text-xs text-gray-500">Customers see these details when paying via bank transfer.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Bank Name</label>
              <input {...register('bankName')} className="setting-input" placeholder="e.g. First Bank Nigeria" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Number</label>
              <input {...register('bankAccountNumber')} className="setting-input" placeholder="0000000000" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Name</label>
              <input {...register('bankAccountName')} className="setting-input" placeholder="Olmach Nig Ltd" />
            </div>
          </div>
        </div>

        {/* Delivery settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gold-600" />
            Delivery Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Delivery Fee (₦)</label>
              <input {...register('deliveryFee')} type="number" min="0" className="setting-input" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Free Delivery Above (₦)</label>
              <input {...register('freeDeliveryThreshold')} type="number" min="0" className="setting-input" />
            </div>
          </div>
          <p className="text-xs text-gray-500">Orders above the threshold get free delivery.</p>
        </div>

        {/* Contact / WhatsApp */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gold-600" />
            Contact Settings
          </h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">WhatsApp Number</label>
            <input {...register('whatsappNumber')} className="setting-input" placeholder="2349021627280 (with country code, no +)" />
            <p className="text-xs text-gray-400 mt-1">Used for the WhatsApp chat button. Include country code without +.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>

      {/* Account Security — separate form */}
      <form onSubmit={handleCredSubmit(onCredSubmit)} className="max-w-2xl mt-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-navy-900 text-sm border-b border-gray-100 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold-600" />
            Account Security
          </h3>
          <p className="text-xs text-gray-500">
            Change your admin username or password. Current password is always required.
          </p>

          {/* Current password */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Current Password *</label>
            <div className="relative">
              <input
                {...regCred('currentPassword')}
                type={showCurrent ? 'text' : 'password'}
                className="setting-input pr-10"
                placeholder="Enter current password"
              />
              <button type="button" onClick={() => setShowCurrent(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {credErrors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">{credErrors.currentPassword.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New username */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">New Username</label>
              <input
                {...regCred('newUsername')}
                className="setting-input"
                placeholder={`Current: ${admin?.username ?? '—'}`}
              />
              {credErrors.newUsername && (
                <p className="text-xs text-red-500 mt-1">{credErrors.newUsername.message}</p>
              )}
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  {...regCred('newPassword')}
                  type={showNew ? 'text' : 'password'}
                  className="setting-input pr-10"
                  placeholder="Min 8 characters"
                />
                <button type="button" onClick={() => setShowNew(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {credErrors.newPassword && (
                <p className="text-xs text-red-500 mt-1">{credErrors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm password */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm New Password</label>
              <input
                {...regCred('confirmPassword')}
                type="password"
                className="setting-input"
                placeholder="Re-enter new password"
              />
              {credErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{credErrors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={credSubmitting}
            className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            {credSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {credSubmitting ? 'Updating...' : 'Update Login Credentials'}
          </button>
        </div>
      </form>

      <style>{`
        .setting-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .setting-input:focus {
          border-color: #EF4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
      `}</style>
    </AdminLayout>
  );
}
