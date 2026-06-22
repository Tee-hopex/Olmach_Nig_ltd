import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { z } from 'zod';
import { Save, Loader, Settings } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminSettings } from '../../hooks/admin/useAdminDashboard';
import { adminApi } from '../../lib/api';
import { useQueryClient } from '@tanstack/react-query';
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

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useAdminSettings();
  const qc = useQueryClient();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: standardSchemaResolver(schema) as unknown as Resolver<FormData>,
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
            <input {...register('whatsappNumber')} className="setting-input" placeholder="2348012345678 (with country code, no +)" />
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
