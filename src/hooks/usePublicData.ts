import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Product, BlogPost, Category } from '../types';

// Normalise API product (category is an object) → our Product type (category is a string slug)
export function normalizeProduct(p: Record<string, unknown>): Product {
  const cat = p.category as { slug?: string } | string | null;
  return {
    ...(p as unknown as Product),
    category: typeof cat === 'object' && cat !== null ? (cat.slug ?? '') : (cat as string ?? ''),
  };
}

// ── Products ─────────────────────────────────────────────────────────────────

export function useProducts(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get('/products', { params });
      return {
        ...data,
        products: (data.products as Record<string, unknown>[]).map(normalizeProduct),
      } as { products: Product[]; total: number; page: number; totalPages: number };
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products-featured'],
    queryFn: async () => {
      const { data } = await api.get('/products/featured');
      return (data as Record<string, unknown>[]).map(normalizeProduct) as Product[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBestSellers() {
  return useQuery({
    queryKey: ['products-bestsellers'],
    queryFn: async () => {
      const { data } = await api.get('/products', { params: { bestseller: 'true', limit: 8 } });
      return (data.products as Record<string, unknown>[]).map(normalizeProduct) as Product[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/${slug}`);
      return normalizeProduct(data as Record<string, unknown>) as Product;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products-search', query],
    queryFn: async () => {
      const { data } = await api.get('/products', { params: { search: query, limit: 5 } });
      return (data.products as Record<string, unknown>[]).map(normalizeProduct) as Product[];
    },
    enabled: query.length > 1,
    staleTime: 1000 * 30,
  });
}

// ── Brands ────────────────────────────────────────────────────────────────────

export function usePublicBrands() {
  return useQuery({
    queryKey: ['brands-public'],
    queryFn: async () => {
      const { data } = await api.get('/brands');
      return data as { id: string; name: string; logo: string | null; description: string | null; productCount: number }[];
    },
    staleTime: 1000 * 60 * 10,
  });
}

// ── Categories ────────────────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return (data as (Category & { _count?: { products: number } })[]).map(c => ({
        ...c,
        productCount: c._count?.products ?? 0,
      })) as (Category & { productCount: number })[];
    },
    staleTime: 1000 * 60 * 10,
  });
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export function useBlogPosts(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['blog', params],
    queryFn: async () => {
      const { data } = await api.get('/blog', { params });
      return data as { posts: BlogPost[]; total: number; totalPages: number };
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data } = await api.get(`/blog/${slug}`);
      return data as BlogPost;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

// ── Settings (bank details + delivery) ────────────────────────────────────────

export function useSiteSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data } = await api.get('/settings');
      return data as {
        bankName: string;
        bankAccountName: string;
        bankAccountNumber: string;
        whatsappNumber: string;
        deliveryFee: number;
        freeDeliveryThreshold: number;
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}
