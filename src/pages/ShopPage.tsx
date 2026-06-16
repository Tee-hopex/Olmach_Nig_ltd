import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { useProducts, useCategories } from '../hooks/usePublicData';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Best Sellers', value: 'bestseller' },
];

const PAGE_SIZE = 12;

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="flex justify-between mt-3">
          <div className="h-5 bg-gray-100 rounded w-1/4" />
          <div className="h-7 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const activeCategory = searchParams.get('category') ?? '';
  const searchQuery = searchParams.get('search') ?? '';

  const { data: categoriesData = [] } = useCategories();

  const queryParams: Record<string, string | number> = { limit: PAGE_SIZE, page, sort };
  if (activeCategory) queryParams.category = activeCategory;
  if (searchQuery) queryParams.search = searchQuery;

  const { data, isLoading, isError } = useProducts(queryParams);
  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const activeCategoryName = categoriesData.find(c => c.slug === activeCategory)?.name;

  const setCategory = (slug: string) => {
    const p = new URLSearchParams(searchParams);
    if (slug) p.set('category', slug);
    else p.delete('category');
    setSearchParams(p);
    setPage(1);
  };

  const clearCategory = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('category');
    setSearchParams(p);
    setPage(1);
  };

  const clearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('search');
    setSearchParams(p);
    setPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="bg-navy-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-1">
            {activeCategoryName ?? (searchQuery ? `Results for "${searchQuery}"` : 'All Products')}
          </h1>
          <p className="text-white/60 text-sm">
            {isLoading ? 'Loading...' : `${total} product${total !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`w-60 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <button type="button" onClick={() => setCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!activeCategory ? 'bg-navy-900 text-white font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                    All Products
                  </button>
                </li>
                {categoriesData.map(cat => (
                  <li key={cat.id}>
                    <button type="button" onClick={() => setCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.slug ? 'bg-navy-900 text-white font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                      {cat.name}
                      {cat.productCount > 0 && <span className="ml-1 text-xs opacity-60">({cat.productCount})</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl text-sm text-navy-900 hover:border-gold-400 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                {activeCategory && (
                  <span className="flex items-center gap-1.5 bg-gray-100 text-navy-900 text-xs font-medium px-3 py-1.5 rounded-full">
                    {activeCategoryName}
                    <button type="button" title="Clear category filter" onClick={clearCategory} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-gray-100 text-navy-900 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Search className="w-3 h-3" /> "{searchQuery}"
                    <button type="button" title="Clear search" onClick={clearSearch} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              <select value={sort} onChange={e => handleSort(e.target.value)} aria-label="Sort products"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-navy-900 focus:outline-none focus:border-gold-500 bg-white">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : isError ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <p className="text-gray-500">Failed to load products. Please try again.</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium mb-2">No products found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1}
                      className="p-2 rounded-xl border border-gray-200 text-navy-900 hover:border-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === '...'
                          ? <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                          : <button key={p} type="button" onClick={() => goToPage(p as number)}
                              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${page === p ? 'bg-navy-900 text-white' : 'border border-gray-200 text-navy-900 hover:border-gold-400'}`}>
                              {p}
                            </button>
                      )}

                    <button type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages}
                      className="p-2 rounded-xl border border-gray-200 text-navy-900 hover:border-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <p className="text-center text-xs text-gray-400 mt-3">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} products
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
