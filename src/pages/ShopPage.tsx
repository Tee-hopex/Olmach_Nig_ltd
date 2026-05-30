import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ui/ProductCard';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Best Sellers', value: 'bestseller' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('featured');

  const activeCategory = searchParams.get('category') ?? '';
  const searchQuery = searchParams.get('search') ?? '';

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        result.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sort]);

  const clearCategory = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('category');
    setSearchParams(p);
  };

  const clearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('search');
    setSearchParams(p);
  };

  const setCategory = (slug: string) => {
    const p = new URLSearchParams(searchParams);
    if (slug) p.set('category', slug);
    else p.delete('category');
    setSearchParams(p);
  };

  const activeCategoryName = categories.find(c => c.slug === activeCategory)?.name;

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Page header */}
      <div className="bg-navy-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-1">
            {activeCategoryName ?? (searchQuery ? `Results for "${searchQuery}"` : 'All Products')}
          </h1>
          <p className="text-white/60 text-sm">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar – desktop */}
          <aside className={`w-60 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !activeCategory
                        ? 'bg-navy-900 text-white font-medium'
                        : 'text-gray-600 hover:bg-cream-100'
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.slug
                          ? 'bg-navy-900 text-white font-medium'
                          : 'text-gray-600 hover:bg-cream-100'
                      }`}
                    >
                      {cat.name} ({cat.productCount})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl text-sm text-navy-900 hover:border-gold-400 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>

                {/* Active filters */}
                {activeCategory && (
                  <span className="flex items-center gap-1.5 bg-navy-100 text-navy-900 text-xs font-medium px-3 py-1.5 rounded-full">
                    {activeCategoryName}
                    <button onClick={clearCategory} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-navy-100 text-navy-900 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Search className="w-3 h-3" /> "{searchQuery}"
                    <button onClick={clearSearch} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-navy-900 focus:outline-none focus:border-gold-500 bg-white"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium mb-2">No products found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
