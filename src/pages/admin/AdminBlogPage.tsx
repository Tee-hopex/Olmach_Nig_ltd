import { useState } from 'react';
import { Plus, Pencil, Trash2, FileText, X, Loader } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminBlog } from '../../hooks/admin/useAdminDashboard';
import { adminApi } from '../../lib/api';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  title: string;
  slug: string;
  author: string;
  category?: string;
  published: boolean;
  createdAt: string;
  tags: string[];
}

interface FormState {
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  tags: string;
}

const empty: FormState = { title: '', author: 'Olmach Team', category: '', excerpt: '', content: '', image: '', published: false, tags: '' };

export default function AdminBlogPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useAdminBlog();
  const posts: Post[] = data?.posts ?? [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  function openCreate() { setEditing(null); setForm(empty); setModalOpen(true); }
  function openEdit(p: Post) {
    setEditing(p);
    setModalOpen(true);
    adminApi.get(`/blog/${p.slug}`).then(r => {
      const d = r.data;
      setForm({ title: d.title, author: d.author, category: d.category ?? '', excerpt: d.excerpt, content: d.content, image: d.image ?? '', published: d.published, tags: d.tags?.join(', ') ?? '' });
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editing) {
        await adminApi.patch(`/blog/${editing.id}`, payload);
        toast.success('Post updated');
      } else {
        await adminApi.post('/blog', payload);
        toast.success('Post created');
      }
      qc.invalidateQueries({ queryKey: ['admin-blog'] });
      setModalOpen(false);
    } catch {
      toast.error('Failed to save post');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await adminApi.delete(`/blog/${id}`);
      qc.invalidateQueries({ queryKey: ['admin-blog'] });
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  }

  return (
    <AdminLayout
      title="Blog"
      subtitle={`${data?.total ?? 0} posts`}
      actions={
        <button onClick={openCreate} className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <FileText className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No blog posts yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Author</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((p: Post) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-navy-900 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-400 font-mono">{p.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{p.author}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{p.category ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.title)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-navy-900">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Author *</label>
                  <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500"
                    placeholder="e.g. Tips & Tricks" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Excerpt *</label>
                  <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 resize-none"
                    placeholder="Brief summary shown in listings..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Content *</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={8} required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 resize-none font-mono"
                    placeholder="Full post content (HTML supported)..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cover Image URL</label>
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} type="url"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500"
                    placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tags</label>
                  <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500"
                    placeholder="sewing, tips, beginner" />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                      className="w-4 h-4 rounded accent-red-600" />
                    <span className="text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gold-600 text-white rounded-lg text-sm font-medium disabled:opacity-60">
                  {saving && <Loader className="w-3.5 h-3.5 animate-spin" />}
                  {editing ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
