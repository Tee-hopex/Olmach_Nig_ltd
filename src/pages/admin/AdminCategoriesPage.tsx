import { useCallback, useState } from 'react';
import { Plus, Pencil, Trash2, Tag, X, Loader, Upload, Link as LinkIcon } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../hooks/admin/useAdminCategories';
import { useUploadImage } from '../../hooks/admin/useAdminProducts';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: { products: number };
}

interface FormState {
  name: string;
  description: string;
  image: string;
}

const empty: FormState = { name: '', description: '', image: '' };

export default function AdminCategoriesPage() {
  const { data: categories = [], isLoading } = useAdminCategories();
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const del = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [dragging, setDragging] = useState(false);
  const { mutateAsync: uploadImage, isPending: uploading } = useUploadImage();

  function openCreate() {
    setEditing(null);
    setForm(empty);
    setImageMode('upload');
    setModalOpen(true);
  }

  function openEdit(c: Category) {
    setEditing(c);
    setForm({ name: c.name, description: c.description ?? '', image: c.image ?? '' });
    setImageMode(c.image ? 'url' : 'upload');
    setModalOpen(true);
  }

  const handleImageFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const result = await uploadImage(files[0]);
    setForm(f => ({ ...f, image: result.url }));
  }, [uploadImage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await update.mutateAsync({ id: editing.id, ...form });
    } else {
      await create.mutateAsync(form);
    }
    setModalOpen(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    await del.mutateAsync(id);
  }

  const saving = create.isPending || update.isPending;

  return (
    <AdminLayout
      title="Categories"
      subtitle={`${categories.length} categories`}
      actions={
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Tag className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No categories yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Slug</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Products</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((c: Category) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Tag className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-navy-900">{c.name}</p>
                        {c.description && <p className="text-xs text-gray-400 line-clamp-1">{c.description}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-mono text-gray-500">{c.slug}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{c._count?.products ?? 0}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-navy-900">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Image</label>

                {/* Mode toggle */}
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3">
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      imageMode === 'upload' ? 'bg-white text-navy-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" /> Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      imageMode === 'url' ? 'bg-white text-navy-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> Paste URL
                  </button>
                </div>

                {imageMode === 'upload' ? (
                  <label
                    className={`relative flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      dragging ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gold-400 hover:bg-gray-50'
                    } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => { e.preventDefault(); setDragging(false); handleImageFile(e.dataTransfer.files); }}
                  >
                    <input type="file" accept="image/*" className="sr-only" onChange={e => handleImageFile(e.target.files)} />
                    {uploading ? (
                      <Loader className="w-7 h-7 text-gold-500 animate-spin" />
                    ) : (
                      <Upload className="w-7 h-7 text-gray-400" />
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                  </label>
                ) : (
                  <input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
                    placeholder="https://..."
                  />
                )}

                {/* Preview */}
                {form.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={form.image} alt="preview" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 truncate">{form.image}</p>
                    </div>
                    <button type="button" title="Remove image" onClick={() => setForm(f => ({ ...f, image: '' }))}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60">
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
