import { useState } from 'react';
import { Plus, Pencil, Trash2, Bookmark, X, Loader } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  useAdminBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from '../../hooks/admin/useAdminBrands';

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

interface FormState {
  name: string;
  description: string;
  logo: string;
}

const empty: FormState = { name: '', description: '', logo: '' };

export default function AdminBrandsPage() {
  const { data: brands = [], isLoading } = useAdminBrands();
  const create = useCreateBrand();
  const update = useUpdateBrand();
  const del = useDeleteBrand();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true); }
  function openEdit(b: Brand) {
    setEditing(b);
    setForm({ name: b.name, description: b.description ?? '', logo: b.logo ?? '' });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await update.mutateAsync({ id: editing.id, ...form });
    } else {
      await create.mutateAsync(form);
    }
    setModalOpen(false);
  }

  const saving = create.isPending || update.isPending;

  return (
    <AdminLayout
      title="Brands"
      subtitle={`${brands.length} brands`}
      actions={
        <button onClick={openCreate} className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : brands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Bookmark className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No brands yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Brand</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Slug</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Description</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {brands.map((b: Brand) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {b.logo ? (
                        <img src={b.logo} alt={b.name} className="w-10 h-8 object-contain rounded border border-gray-100" />
                      ) : (
                        <div className="w-10 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <Bookmark className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <p className="text-sm font-medium text-navy-900">{b.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-mono text-gray-500">{b.slug}</td>
                  <td className="px-5 py-3 text-sm text-gray-500 max-w-xs line-clamp-1">{b.description ?? '—'}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(b)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => del.mutate(b.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-navy-900">{editing ? 'Edit Brand' : 'Add Brand'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Logo URL</label>
                <input value={form.logo} onChange={e => setForm(f => ({ ...f, logo: e.target.value }))} type="url"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500"
                  placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gold-600 text-white rounded-lg text-sm font-medium disabled:opacity-60">
                  {saving && <Loader className="w-3.5 h-3.5 animate-spin" />}
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
