import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Package, Star } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminProducts, useDeleteProduct } from '../../hooks/admin/useAdminProducts';

const BADGE_COLORS: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  'Best Seller': 'bg-orange-100 text-orange-700',
  Sale: 'bg-red-100 text-red-700',
  Popular: 'bg-purple-100 text-purple-700',
};

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data, isLoading } = useAdminProducts({ page, limit: 15, ...(search ? { search } : {}), ...(category ? { category } : {}) });
  const deleteProduct = useDeleteProduct();

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteProduct.mutateAsync(id);
  }

  return (
    <AdminLayout
      title="Products"
      subtitle={`${data?.total ?? 0} products total`}
      actions={
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      }
    >
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Package className="w-10 h-10 text-gray-300" />
            <p className="text-gray-400 text-sm">No products found</p>
            <Link to="/admin/products/new" className="text-gold-600 text-sm font-medium hover:underline">
              Add your first product
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Product</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Brand</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Price</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Stock</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p: {
                    id: string; name: string; images: string[]; brand: string; price: number;
                    salePrice?: number; stockCount: number; inStock: boolean; badge?: string;
                    isFeatured: boolean; isBestSeller: boolean; rating: number;
                  }) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            {p.images?.[0] ? (
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-5 h-5 text-gray-400 m-auto mt-2.5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-navy-900 leading-snug line-clamp-1">{p.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-400">{p.rating.toFixed(1)}</span>
                              {p.badge && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${BADGE_COLORS[p.badge] ?? 'bg-gray-100 text-gray-600'}`}>
                                  {p.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.brand}</td>
                      <td className="px-4 py-3">
                        <div>
                          {p.salePrice ? (
                            <>
                              <p className="text-sm font-semibold text-gold-600">₦{p.salePrice.toLocaleString()}</p>
                              <p className="text-xs text-gray-400 line-through">₦{p.price.toLocaleString()}</p>
                            </>
                          ) : (
                            <p className="text-sm font-semibold text-navy-900">₦{p.price.toLocaleString()}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.stockCount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={deleteProduct.isPending}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
